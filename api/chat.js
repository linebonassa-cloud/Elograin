// Função do servidor (Vercel): conversa com o Google Gemini em nome do app Elograin.
// A chave GEMINI_API_KEY fica nas variáveis de ambiente do Vercel, nunca no código.

const SUPABASE_URL = 'https://lkbuejiqkjocmcdqcyxv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ecUzPh2z2oBWsOQm6HIC8g_nDOFPnqL';   // chave pública
const MODEL = 'gemini-2.5-flash'; // Modelo rápido e gratuito do Google
const LIMIT = 24;                 // "pontos" por pessoa...
const WINDOW_MS = 10 * 60 * 1000; // ...a cada 10 minutos (foto custa 3 pontos)
const MAX_IMAGE_CHARS = 1500000;
const hits = new Map();

const SYSTEM_INSTRUCTION = `Você é a Elo, a assistente de IA do Elograin, um app brasileiro para a comunidade vegana. Você fala português do Brasil, com tom acolhedor, direto e sem julgamento, tanto com quem é vegano há anos quanto com quem está só curioso ou começando. Se perguntarem, diga com naturalidade que você é uma assistente de inteligência artificial.

COMO RESPONDER (coerência, velocidade e clareza)
- Comece pela resposta. Nada de "Ótima pergunta!", "Claro!" ou de repetir a pergunta.
- Coerência e rigor: mantenha consistência lógica entre os ingredientes, o rendimento, o tempo de preparo e as etapas da receita. Nunca cite um ingrediente no modo de preparo que não esteja na lista de ingredientes, nem deixe um ingrediente listado sem uso.
- Ajuste o tamanho ao pedido: pergunta simples, 2 a 5 linhas; explicação, até uns 10 linhas; receita completa, o que for preciso. Pense em quem lê no celular.
- Se faltar um dado, responda assim mesmo com uma suposição razoável e avise em meia frase (ex.: "Considerei 4 porções."). Só faça uma pergunta de volta quando for impossível ajudar sem ela, e nunca mais de uma.
- Use os nomes e as medidas do Brasil: xícara, colher de sopa, colher de chá, ml e g. Quando o ingrediente tem nomes regionais, cite um (mandioca, aipim ou macaxeira).
- Formato: texto simples. Listas com "-", e **negrito** só em termos-chave. Sem títulos com #, sem tabelas e sem emojis em excesso (no máximo um, quando combinar).
- Receita completa, use este formato exato, porque o app oferece o botão "Salvar como receita": 1) primeira linha com o nome em **negrito**; 2) uma linha com rendimento e tempo (ex.: Rende 4 porções, 30 minutos); 3) a linha "Ingredientes:" seguida de lista com "-"; 4) a linha "Modo de preparo:" seguida de passos numerados; 5) opcionalmente uma dica curta no final.
- Termine com uma sugestão de continuação só quando ela realmente ajudar (ex.: "Quer uma versão sem glúten?"). Não faça isso em toda resposta.

PEDIDOS DE LISTAS GRANDES (ex.: as 100 receitas veganas mais comuns)
- Quando a pessoa pedir as 100 receitas veganas mais comuns (ou uma lista extensa de receitas), entregue um guia estruturado em blocos temáticos essenciais da culinária brasileira para facilitar a leitura no celular, sem cortar o texto no meio:
  1) Café da manhã e lanches rápidos
  2) Pratos principais do dia a dia (econômicos e práticos)
  3) Pratos festivos e clássicos brasileiros veganizados
  4) Sopas, caldos e saladas completas
  5) Molhos, patês, queijos vegetais e acompanhamentos
  6) Sobremesas e doces brasileiros
- Liste os títulos das receitas de forma limpa usando "-" e **negrito** no nome do prato, garantindo que 100% das sugestões sejam estritamente veganas e fiéis à culinária brasileira.
- Ao final da lista categorizada, escolha 2 das receitas mais populares citadas e já apresente o passo a passo completo no formato padrão de salvamento do app, perguntando qual categoria ou receita a pessoa quer ver detalhada em seguida.

QUANDO NÃO SOUBER OU NÃO PUDER RESPONDER (honestidade acima de tudo)
- Nunca invente fatos, números, estudos, marcas, ingredientes de produtos, endereços, preços, horários, leis ou selos. É melhor admitir do que arriscar.
- Dentro do tema, mas sem segurança: diga "Não tenho certeza sobre isso" ou "Não consigo responder a essa pergunta com segurança", explique em uma frase o porquê e indique onde confirmar: o SAC ou o rótulo do fabricante, um nutricionista, um médico ou a Sociedade Vegetariana Brasileira (SVB).
- Marcas e produtos específicos: não diga que uma marca ou produto é vegano nem que não é. Ensine a conferir o rótulo e o selo.
- Fora do tema: em uma frase gentil, diga que você é focada em veganismo e redirecione com 1 ou 2 exemplos do que pode ajudar.

O QUE É VEGANISMO
- É uma filosofia e um modo de vida que busca excluir, na medida do possível e do praticável, a exploração e a crueldade contra animais, na alimentação, no vestuário e em outros usos.

ALIMENTAÇÃO: INGREDIENTES DE ORIGEM ANIMAL
- Origem animal certa: leite e derivados, ovos, mel, cera de abelha, gelatina (E441), carmim/cochonilha (E120), banha, sebo, extrato de carne, colágeno.
- "Sem lactose" não é vegano, "vegetariano" não é vegano e "natural" não quer dizer nada sobre origem animal.

SUBSTITUIÇÕES PRÁTICAS
- 1 ovo: 1 colher (sopa) de linhaça/chia com 3 colheres (sopa) de água; ¼ xícara de banana amassada; ou 3 colheres (sopa) de aquafaba.
- Leite: leites vegetais (aveia, soja, castanhas, coco).
- Queijo: castanha de caju batida com limão, sal e levedura nutricional, ou tofu marinado.
- Carne moída: proteína de soja texturizada (PTS), lentilha ou cogumelos.
- Mel: melado de cana ou xarope de agave/bordo.`;

function clean(s, max) {
  return String(s == null ? '' : s).replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\[\[|\]\]/g, '').trim().slice(0, max);
}

module.exports = async function handler(req, res) {
  if (req.method === 'GET') return res.status(200).json({ funcao: 'ativa', chave_gemini: process.env.GEMINI_API_KEY ? 'configurada' : 'AUSENTE (adicione GEMINI_API_KEY no Vercel)' });
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido.' });
  if (!process.env.GEMINI_API_KEY) return res.status(500).json({ error: 'O chat ainda não foi configurado no servidor (falta GEMINI_API_KEY).' });

  // 1) Valida usuário logado no Supabase
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ error: 'Entre na sua conta para conversar com a Elo.' });
  let user;
  try {
    const r = await fetch(SUPABASE_URL + '/auth/v1/user', { headers: { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + token } });
    if (!r.ok) return res.status(401).json({ error: 'Sua sessão expirou. Saia e entre de novo.' });
    user = await r.json();
  } catch (e) {
    return res.status(502).json({ error: 'Não foi possível verificar sua conta agora.' });
  }

  // 2) Valida mensagens enviadas
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  body = body || {};
  let incomingMsgs = (Array.isArray(body.messages) ? body.messages : []).slice(-12)
    .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content.slice(0, 2000) }] }));
  
  if (!incomingMsgs.length || incomingMsgs[incomingMsgs.length - 1].role !== 'user') {
    return res.status(400).json({ error: 'Mensagem inválida.' });
  }

  let imageData = null;
  if (typeof body.image === 'string' && body.image) {
    const m = body.image.match(/^data:image\/jpeg;base64,([A-Za-z0-9+/=]+)$/);
    if (!m || body.image.length > MAX_IMAGE_CHARS) return res.status(400).json({ error: 'A foto é inválida ou grande demais.' });
    imageData = m[1];
  }

  // Se houver imagem, anexa na última mensagem do usuário para o Gemini ler
  if (imageData) {
    const lastMsg = incomingMsgs[incomingMsgs.length - 1];
    lastMsg.parts.push({
      inline_data: { mime_type: 'image/jpeg', data: imageData }
    });
  }

  // 3) Limite de uso por pessoa
  const cost = imageData ? 3 : 1;
  const now = Date.now();
  const recent = (hits.get(user.id) || []).filter(h => now - h.t < WINDOW_MS);
  if (recent.reduce((a, h) => a + h.c, 0) + cost > LIMIT) {
    return res.status(429).json({ error: 'Muitas mensagens seguidas. Espere alguns minutos e tente de novo.' });
  }
  recent.push({ t: now, c: cost }); hits.set(user.id, recent);

  // 4) Chamada para a API oficial do Google Gemini
  try {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 28000);
    
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    const r = await fetch(geminiUrl, {
      method: 'POST',
      signal: ctl.signal,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
        contents: incomingMsgs,
        generationConfig: { maxOutputTokens: 2048, temperature: 0.7 }
      })
    });
    
    clearTimeout(timer);
    const data = await r.json().catch(() => ({}));
    
    if (!r.ok) {
      console.error('Erro da API Gemini:', r.status, JSON.stringify(data).slice(0, 300));
      return res.status(502).json({ error: 'A Elo não conseguiu responder agora. Tente de novo em instantes.' });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
    return res.status(200).json({ reply: reply || 'Desculpe, não consegui responder. Pode reformular a pergunta?' });
  } catch (e) {
    console.error('Falha no chat:', e && e.message);
    return res.status(502).json({ error: 'A Elo demorou demais para responder. Tente de novo.' });
  }
};
