// Função do servidor (Vercel): conversa com o Google Gemini em nome do app Elograin.

const SUPABASE_URL = 'https://lkbuejiqkjocmcdqcyxv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ecUzPh2z2oBWsOQm6HIC8g_nDOFPnqL';   // chave pública
const LIMIT = 24;                 
const WINDOW_MS = 10 * 60 * 1000; 
const hits = new Map();

const SYSTEM_PROMPT = `Você é a Elo, a assistente de IA do Elograin, um app brasileiro para a comunidade vegana. Você fala português do Brasil, com tom acolhedor, direto e sem julgamento. Responda de forma clara, priorizando quem lê no celular. Use medidas e nomes brasileiros (xícara, colher, ml, g, mandioca/aipim).`;

module.exports = async function handler(req, res) {
  // CORS Headers para evitar bloqueios
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') return res.status(200).json({ funcao: 'ativa', status: 'ok' });
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido.' });
  if (!process.env.GEMINI_API_KEY) return res.status(500).json({ error: 'Servidor não configurado (falta GEMINI_API_KEY).' });

  // 1) Valida usuário logado no Supabase
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ error: 'Entre na sua conta para conversar com a Elo.' });
  
  try {
    const r = await fetch(SUPABASE_URL + '/auth/v1/user', { headers: { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + token } });
    if (!r.ok) return res.status(401).json({ error: 'Sua sessão expirou. Saia e entre de novo.' });
  } catch (e) {
    return res.status(502).json({ error: 'Não foi possível verificar sua conta agora.' });
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
  if (recent.length >= LIMIT) {
    return res.status(429).json({ error: 'Muitas mensagens seguidas. Espere alguns minutos.' });
  }
  recent.push({ t: now }); hits.set('user_hit', recent);

  // 4) Chamada direta e limpa para a API do Gemini (usando gemini-1.5-flash)
  try {
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: `${SYSTEM_PROMPT}\n\nUsuário: ${ultimaMensagem}` }] }
        ]
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Erro Gemini:', data);
      return res.status(502).json({ error: 'A Elo não conseguiu falar com o Gemini.' });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'Olá! Como posso ajudar você hoje?';
    return res.status(200).json({ reply });

  } catch (e) {
    console.error('Erro interno:', e);
    return res.status(502).json({ error: 'Erro de conexão com a IA.' });
  }
};
