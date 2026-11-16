export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'A chave GEMINI_API_KEY não está configurada na Vercel.' });
  }

  try {
    const { messages, context, prefs, image } = req.body || {};

    let systemInstruction = "Você é a Elo, a assistente virtual vegana do aplicativo Elograin. Responda de forma acolhedora, prestativa e objetiva, focando em culinária vegana, substituições de ingredientes, leitura de rótulos e apoio à comunidade. Você pode ensinar receitas veganas normalmente, mas nunca invente endereços de restaurantes ou estabelecimentos reais que não estejam no contexto fornecido.";
    
    if (prefs) {
      if (prefs.diet) systemInstruction += " Preferência alimentar do usuário: " + prefs.diet + ".";
      if (prefs.budget) systemInstruction += " Orçamento: " + prefs.budget + ".";
      if (prefs.allergies) systemInstruction += " Alergias ou restrições: " + prefs.allergies + ".";
    }

    if (context) {
      systemInstruction += " Dados atuais do Elograin (use apenas estes se precisar citar lugares ou receitas cadastradas no app):\n" + JSON.stringify(context);
    }

    let contents = [];
    if (messages && Array.isArray(messages)) {
      messages.forEach(m => {
        if (m.role === 'user' || m.role === 'assistant') {
          contents.push({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }]
          });
        }
      });
    }

    if (image) {
      const match = image.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
      if (match) {
        contents.push({
          role: 'user',
          parts: [
            { inlineData: { mimeType: match[1], data: match[2] } },
            { text: "Por favor, analise os ingredientes deste rótulo e aponte se há algum componente de origem animal." }
          ]
        });
      }
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents: contents,
          generationConfig: {
            temperature: 0.7,
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Erro na API do Gemini:', data);
      return res.status(500).json({ error: data?.error?.message || 'Erro ao processar a resposta da IA.' });
    }

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Não consegui formular uma resposta agora.';
    return res.status(200).json({ reply });

  } catch (err) {
    console.error('Erro na API do Gemini:', err);
    return res.status(500).json({ error: err.message || 'Erro ao processar a resposta da IA.' });
  }
}
