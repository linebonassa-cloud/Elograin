module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'A chave GROQ_API_KEY não está configurada na Vercel.' });
  }

  try {
    const { messages, context, prefs, image } = req.body || {};

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

    let model = 'llama-3.3-70b-versatile';

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

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: groqMessages,
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Erro na API da Groq:', data);
      return res.status(response.status).json({
        error: data?.error?.message || 'Erro ao processar a resposta da IA.'
      });
    }

    const reply = data?.choices?.[0]?.message?.content || 'Não consegui formular uma resposta agora.';
    return res.status(200).json({ reply });

  } catch (err) {
    console.error('Erro na API da Groq:', err);
    return res.status(500).json({ error: 'Erro ao processar a resposta da IA.' });
  }
};
