// Função do servidor (Vercel): conversa com o Google Gemini em nome do app Elograin.

const SUPABASE_URL = 'https://lkbuejiqkjocmcdqcyxv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ecUzPh2z2oBWsOQm6HIC8g_nDOFPnqL';
const MODELS = ['gemini-3.8-flash', 'gemini-3.8-flash-lite']; // Tenta o principal e, se der 503, usa o reserva
const LIMIT = 24;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_IMAGE_CHARS = 1500000;
const hits = new Map();

const SYSTEM_PROMPT = `Você é a Elo, a assistente de IA do Elograin, um app brasileiro para a comunidade vegana. Você fala português do Brasil, com tom acolhedor, direto e sem julgamento. Responda de forma clara, priorizando quem lê no celular. Use medidas e nomes brasileiros (xícara, colher, ml, g, mandioca/aipim).

COMO RESPONDER (coerência, velocidade e clareza)
- Comece pela resposta. Nada de "Ótima pergunta!", "Claro!" ou de repetir a pergunta.
- Coerência e rigor: mantenha consistência lógica entre os ingredientes, o rendimento, o tempo de preparo e as etapas da receita. Nunca cite um ingrediente no modo de preparo que não esteja na lista de ingredientes, nem deixe um ingrediente listado sem uso.
- Receita completa, use este formato exato, porque o app oferece o botão "Salvar como receita": 1) primeira linha com o nome em **negrito**; 2) uma linha com rendimento e tempo (ex.: Rende 4 porções, 30 minutos); 3) a linha "Ingredientes:" seguida de lista com "-"; 4) a linha "Modo de preparo:" seguida de passos numerados; 5) opcionalmente uma dica curta no final.

PEDIDOS DE LISTAS GRANDES (ex.: as 100 receitas veganas mais comuns)
- Quando a pessoa pedir as 100 receitas veganas mais comuns (ou uma lista extensa de receitas), entregue um guia estruturado em 6 blocos temáticos da culinária brasileira (1. Café da manhã e lanches; 2. Dia a dia; 3. Pratos festivos; 4. Sopas e caldos; 5. Molhos e queijos vegetais; 6. Sobremesas) usando "-" e **negrito** no nome de cada prato. Ao final, entregue o passo a passo completo de 2 receitas populares da lista no formato padrão de salvamento.`;

async function chamarGeminiComRetry(apiKey, payload) {
  let ultimoErro = '';

  for (const model of MODELS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    // Faz até 2 tentativas por modelo caso dê pico de demanda (503)
    for (let tentativa = 1; tentativa <= 2; tentativa++) {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        return { ok: true, data };
      }

      ultimoErro = `Erro do Google (${response.status}): ${data?.error?.message || 'Falha na API'}`;

      // Se for sobrecarga (503) ou excesso temporário (429), espera 1,5s e tenta de novo
      if (response.status === 503 || response.status === 429) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        continue;
      }

      // Se for outro erro (ex: modelo inexistente), pula direto para o próximo modelo da lista
      break;
    }
  }

  return { ok: false, error: ultimoErro };
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method === 'GET') return res.status(200).json({ funcao: 'ativa', status: 'ok' });
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido.' });
  if (!process.env.GEMINI_API_KEY) return res.status(500).json({ error: 'Servidor sem GEMINI_API_KEY.' });

  // 1) Valida usuário logado no Supabase
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ error: 'Entre na sua conta para conversar com a Elo.' });

  let user;
  try {
    const r = await fetch(SUPABASE_URL + '/auth/v1/user', {
      headers: { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + token }
    });
    if (!r.ok) return res.status(401).json({ error: 'Sua sessão expirou. Saia e entre de novo.' });
    user = await r.json();
  } catch (e) {
    return res.status(502).json({ error: 'Erro ao verificar sua conta no Supabase.' });
  }

  // 2) Monta o histórico de mensagens e verifica imagem de rótulo
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  body = body || {};

  const incomingMsgs = Array.isArray(body.messages) ? body.messages : [];
  if (!incomingMsgs.length) return res.status(400).json({ error: 'Mensagem inválida.' });

  const contents = [];
  for (const m of incomingMsgs.slice(-10)) {
    if (m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim()) {
      contents.push({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content.slice(0, 2000) }]
      });
    }
  }

  let imageData = null;
  if (typeof body.image === 'string' && body.image) {
    const match = body.image.match(/^data:image\/jpeg;base64,([A-Za-z0-9+/=]+)$/);
    if (match && body.image.length <= MAX_IMAGE_CHARS) {
      imageData = match[1];
    }
  }

  if (imageData && contents.length > 0) {
    for (let i = contents.length - 1; i >= 0; i--) {
      if (contents[i].role === 'user') {
        contents[i].parts.push({
          inline_data: { mime_type: 'image/jpeg', data: imageData }
        });
        break;
      }
    }
  }

  // 3) Limite de uso por usuário
  const cost = imageData ? 3 : 1;
  const now = Date.now();
  const recent = (hits.get(user.id) || []).filter(h => now - h.t < WINDOW_MS);
  if (recent.reduce((a, h) => a + h.c, 0) + cost > LIMIT) {
    return res.status(429).json({ error: 'Muitas mensagens seguidas. Espere alguns minutos e tente de novo.' });
  }
  recent.push({ t: now, c: cost });
  hits.set(user.id, recent);

  // 4) Chama o Gemini com retentativa automática
  try {
    const payload = {
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: { maxOutputTokens: 2048, temperature: 0.7 }
    };

    const resultado = await chamarGeminiComRetry(process.env.GEMINI_API_KEY.trim(), payload);

    if (!resultado.ok) {
      return res.status(502).json({ error: resultado.error });
    }

    const reply = resultado.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
    return res.status(200).json({ reply: reply || 'Olá! Como posso ajudar você hoje?' });
  } catch (e) {
    return res.status(502).json({ error: `Falha de rede: ${e.message}` });
  }
};
