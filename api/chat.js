module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'A chave GROQ_API_KEY não está configurada na Vercel.' });
  }

  try {
    const body = typeof req.body === 'string' && req.body.trim() !== ''
      ? JSON.parse(req.body)
      : (req.body || {});

    const { messages, context, prefs, image } = body;

    let systemInstruction = "Você é a Elo, a assistente virtual vegana do aplicativo Elograin. Responda sempre em português do Brasil, de forma acolhedora, prestativa e objetiva, focando em culinária vegana, substituições de ingredientes, leitura de rótulos e apoio à comunidade. Você pode ensinar receitas veganas normalmente, mas nunca invente endereços de restaurantes ou estabelecimentos reais que não estejam no contexto fornecido.";

    if (prefs) {
      if (prefs.diet) systemInstruction += " Preferência alimentar do usuário: " + prefs.diet + ".";
      if (prefs.budget) systemInstruction += " Orçamento: " + prefs.budget + ".";
      if (prefs.allergies) systemInstruction += " Alergias ou restrições: " + prefs.allergies + ".";
    }

    if (context) {
      systemInstruction += " Dados atuais do Elograin (use apenas estes se precisar citar lugares ou receitas cadastradas no app):\n" + JSON.stringify(context);
    }

    const groqMessages = [
      { role: 'system', content: systemInstruction }
    ];

    if (messages && Array.isArray(messages)) {
      messages.forEach(m => {
        if (m.role === 'user' || m.role === 'assistant') {
          groqMessages.push({
            role: m.role,
            content: String(m.content || '')
          });
        }
      });
    }

    let model = 'openai/gpt-oss-120b';

    if (image) {
      model = 'meta-llama/llama-4-scout-17b-16e-instruct';
      groqMessages.push({
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Por favor, analise os ingredientes deste rótulo e aponte se há algum componente de origem animal.'
          },
          {
            type: 'image_url',
            image_url: { url: image }
          }
        ]
      });
    }

    const host = ['api', 'groq', 'com'].join('.');
    const path = ['', 'openai', 'v1', 'chat', 'completions'].join('/');
    const groqUrl = 'https://' + host + path;

    const response = await fetch(groqUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey.trim()
      },
      body: JSON.stringify({
        model: model,
        messages: groqMessages,
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    const rawText = await response.text();
    let data = {};

    if (rawText) {
      try {
        data = JSON.parse(rawText);
      } catch (parseErr) {
        return res.status(502).json({
          error: 'Resposta inesperada da Groq (HTTP ' + response.status + ')'
        });
      }
    }

    if (!response.ok) {
      const errMsg = (data && data.error && data.error.message)
        ? data.error.message
        : 'Erro HTTP ' + response.status + ' na Groq.';
      return res.status(response.status).json({ error: errMsg });
    }

    const firstChoice = Array.isArray(data.choices) ? data.choices.at(0) : null;
    const reply = (firstChoice && firstChoice.message && firstChoice.message.content)
      ? firstChoice.message.content
      : 'Não consegui formular uma resposta agora.';

    return res.status(200).json({ reply });

  } catch (err) {
    return res.status(500).json({ error: 'Erro interno: ' + err.message });
  }
};
