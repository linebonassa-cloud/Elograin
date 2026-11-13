// Função do servidor (Vercel): conversa com o Google Gemini em nome do app Elograin.

const SUPABASE_URL = 'https://lkbuejiqkjocmcdqcyxv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ecUzPh2z2oBWsOQm6HIC8g_nDOFPnqL';
const MODEL = 'gemini-3.8-flash'; // Modelo atual gratuito e rápido do Google
const LIMIT = 24;
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map();

const SYSTEM_PROMPT = `Você é a Elo, a assistente de IA do Elograin, um app brasileiro para a comunidade vegana. Você fala português do Brasil, com tom acolhedor, direto e sem julgamento. Responda de forma clara, priorizando quem lê no celular. Use medidas e nomes brasileiros (xícara, colher, ml, g, mandioca/aipim).

COMO RESPONDER (coerência, velocidade e clareza)
- Comece pela resposta. Nada de "Ótima pergunta!", "Claro!" ou de repetir a pergunta.
- Coerência e rigor: mantenha consistência lógica entre os ingredientes, o rendimento, o tempo de preparo e as etapas da receita. Nunca cite um ingrediente no modo de preparo que não esteja na lista de ingredientes, nem deixe um ingrediente listado sem uso.
- Receita completa, use este formato exato, porque o app oferece o botão "Salvar como receita": 1) primeira linha com o nome em **negrito**; 2) uma linha com rendimento e tempo (ex.: Rende 4 porções, 30 minutos); 3) a linha "Ingredientes:" seguida de lista com "-"; 4) a linha "Modo de preparo:" seguida de passos numerados; 5) opcionalmente uma dica curta no final.

PEDIDOS DE LISTAS GRANDES (ex.: as 100 receitas veganas mais comuns)
- Quando a pessoa pedir as 100 receitas veganas mais comuns (ou uma lista extensa de receitas), entregue um guia estruturado em 6 blocos temáticos da culinária brasileira (1. Café da manhã e lanches; 2. Dia a dia; 3. Pratos festivos; 4. Sopas e caldos; 5. Molhos e queijos vegetais; 6. Sobremesas) usando "-" e **negrito** no nome de cada prato. Ao final, entregue o passo a passo completo de 2 receitas populares da lista no formato padrão de salvamento.`;

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
  
  try {
    const r = await fetch(SUPABASE_URL + '/auth/v1/user', { headers: { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + token } });
    if (!r.ok) return res.status(401).json({ error: 'Sua sessão expirou. Saia e entre de novo.' });
  } catch (e) {
    return res.status(502).json({ error: 'Erro ao verificar sua conta no Supabase.' });
  }

  // 2) Pega a mensagem do usuário
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  body = body || {};
  
  let incomingMsgs = Array.isArray(body.messages) ? body.messages : [];
  const ultimaMensagem = incomingMsgs.length > 0 ? incomingMsgs[incomingMsgs.length - 1].content : 'Oi';

  // 3) Limite de uso
  const now = Date.now();
  const recent = (hits.get('user_hit') || []).filter(h => now - h.t < WINDOW_MS);
  if (recent.length >= LIMIT) return res.status(429).json({ error: 'Muitas mensagens seguidas. Espere alguns minutos.' });
  recent.push({ t: now }); hits.set('user_hit', recent);

  // 4) Chamada para o Gemini 2.5 Flash
  try {
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${process.env.GEMINI_API_KEY.trim()}`;
    
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: `${SYSTEM_PROMPT}\n\nUsuário: ${ultimaMensagem}` }] }
        ],
        generationConfig: { maxOutputTokens: 2048, temperature: 0.7 }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      const detalheGoogle = data?.error?.message || JSON.stringify(data);
      return res.status(502).json({ error: `Erro do Google (${response.status}): ${detalheGoogle}` });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'Olá! Como posso ajudar você hoje?';
    return res.status(200).json({ reply });

  } catch (e) {
    return res.status(502).json({ error: `Falha de rede: ${e.message}` });
  }
};
