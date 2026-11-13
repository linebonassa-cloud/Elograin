// Função do servidor (Vercel): conversa com o Google Gemini em nome do app Elograin.

const SUPABASE_URL = 'https://lkbuejiqkjocmcdqcyxv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ecUzPh2z2oBWsOQm6HIC8g_nDOFPnqL';
const MODELS = ['gemini-2.5-flash', 'gemini-1.5-flash']; // Modelos oficiais válidos do Google
const LIMIT = 24;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_IMAGE_CHARS = 1500000;
const hits = new Map();

const SYSTEM_PROMPT = `Você é a Elo, a assistente de IA do Elograin, um app brasileiro para a comunidade vegana. Você fala português do Brasil, com tom acolhedor, direto e sem julgamento. Responda de forma clara, priorizando quem lê no celular. Use medidas e nomes brasileiros (xícara, colher, ml, g, mandioca/aipim).

COMO RESPONDER (coerência, velocidade e clareza)
- Comece pela resposta. Nada de "Ótima pergunta!", "Claro!" ou de repetir a pergunta.
- Coerência e rigor: mantenha consistência lógica entre os ingredientes, o rendimento, o tempo de preparo e as etapas da receita. Nunca cite um ingrediente no modo de preparo que não esteja na lista de ingredientes, nem deixe um ingrediente listado sem uso.
- Receita completa, use este formato exato, porque o app oferece o botão "Salvar como receita": 1) primeira linha com o nome em **negrito**; 2) uma linha com rendimento e tempo (ex.: Rende 4 porções, 30 minutos); 3) a linha "Ingredientes:" seguida de lista com "-"; 4) a linha "Modo de preparo:" seguida de passos numerados; 5) opcionalmente uma dica curta no final.`;

async function chamarGeminiComRetry(apiKey, payload) {
  let ultimoErro = '';

  for (const model of MODELS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

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

      if (response.status === 503 || response.status === 429) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        continue;
      }
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

  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ error: 'Entre na sua conta para conversar com a Elo.' });

  let user;
  try {
    const r = await fetch(SUPABASE_URL + '/auth/v1/user', {
      headers: { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + token }
    });
    if (!r.ok) return res.status(401).json({ error: 'Sua sessão expirou. Saia e entre de novo.' });
    user = await r
