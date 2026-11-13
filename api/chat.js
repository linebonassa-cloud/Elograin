// Função do servidor (Vercel): conversa com o Google Gemini em nome do app Elograin.
// A chave GEMINI_API_KEY fica nas variáveis de ambiente do Vercel, nunca no código.

const SUPABASE_URL = 'https://lkbuejiqkjocmcdqcyxv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ecUzPh2z2oBWsOQm6HIC8g_nDOFPnqL';   // chave pública
const MODEL = 'gemini-1.5-flash'; // Modelo padrão rápido e gratuito do Google
const LIMIT = 24;                 // "pontos" por pessoa...
const WINDOW_MS = 10 * 60 * 1000; // ...a cada 10 minutos (foto custa 3 pontos)
const MAX_IMAGE_CHARS = 1500000;
const hits = new Map();

const SYSTEM_PROMPT = `Você é a Elo, a assistente de IA do Elograin, um app brasileiro para a comunidade vegana. Você fala português do Brasil, com tom acolhedor, direto e sem julgamento. Responda de forma clara, priorizando quem lê no celular. Use medidas e nomes brasileiros (xícara, colher, ml, g, mandioca/aipim).`;

module.exports = async function handler(req, res) {
  if (req.method === 'GET') return res.status(200).json({ funcao: 'ativa', chave_gemini: process.env.GEMINI_API_KEY ? 'configurada' : 'AUSENTE' });
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
  
  let incomingMsgs = Array.isArray(body.messages) ? body.messages : [];
  if (!incomingMsgs.length) return res.status(400).json({ error: 'Mensagem inválida.' });

  // Formata o histórico de conversas para o padrão exigido pelo Gemini
  let geminiContents = [];
  
  // Adiciona o prompt de sistema como a primeira instrução para o Gemini
  geminiContents.push({
    role: 'user',
    parts: [{ text: `[INSTRUÇÃO DO SISTEMA]: ${SYSTEM_PROMPT}` }]
  });
  geminiContents.push({
    role: 'model',
    parts: [{ text: 'Entendido. Sou a Elo, assistente do Elograin.' }]
  });

  for (let m of incomingMsgs.slice(-10)) {
    if (m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim()) {
      geminiContents.push({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content.slice(0, 2000) }]
      });
    }
  }

  // Tratamento de imagem se houver
  let imageData = null;
  if (typeof body.image === 'string' && body.image) {
    const match = body.image.match(/^data:image\/jpeg;base64,([A-Za-z0-9+/=]+)$/);
    if (match && body.image.length <= MAX_IMAGE_CHARS) {
      imageData = match[1];
    }
  }

  if (imageData && geminiContents.length > 0) {
    const lastUserMsg = geminiContents.reverse().find(c => c.role === 'user');
    if (lastUserMsg) {
      lastUserMsg.parts.push({
        inline_data: { mime_type: 'image/jpeg', data: imageData }
      });
    }
    geminiContents.reverse();
  }

  // 3) Limite de uso por pessoa
  const cost = imageData ? 3 : 1;
  const now = Date.now();
  const recent = (hits.get(user.id) || []).filter(h => now - h.t < WINDOW_MS);
  if (recent.reduce((a, h) => a + h.c, 0) + cost > LIMIT) {
    return res.status(429).json({ error: 'Muitas mensagens seguidas. Espere alguns minutos e tente de novo.' });
  }
  recent.push({ t: now, c: cost }); hits.set(user.id, recent);

  // 4) Chamada oficial para a API do Google Gemini
  try {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 28000);
    
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    const r = await fetch(geminiUrl, {
      method: 'POST',
      signal: ctl.signal,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        contents: geminiContents,
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
