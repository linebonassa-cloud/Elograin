import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'A chave GEMINI_API_KEY não está configurada na Vercel.' });
  }

  try {
    const { messages, context, prefs, image } = req.body;
    const ai = new GoogleGenAI({ apiKey: apiKey });

    let systemInstruction = "Você é a Elo, a assistente virtual vegana do aplicativo Elograin. Responda de forma acolhedora, prestativa e objetiva, focando em culinária vegana, substituições de ingredientes, leitura de rótulos e apoio à comunidade. Nunca invente endereços de restaurantes ou receitas que não estejam no contexto fornecido.";
    
    if (prefs) {
      if (prefs.diet) systemInstruction += " Preferência alimentar do usuário: " + prefs.diet + ".";
      if (prefs.budget) systemInstruction += " Orçamento: " + prefs.budget + ".";
      if (prefs.allergies) systemInstruction += " Alergias ou restrições: " + prefs.allergies + ".";
    }

    if (context) {
      systemInstruction += " Dados atuais do Elograin (use apenas estes se precisar citar lugares ou receitas reais):\n" + JSON.stringify(context);
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

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return res.status(200).json({ reply: response.text });

  } catch (err) {
    console.error('Erro na API do Gemini:', err);
    return res.status(500).json({ error: err.message || 'Erro ao processar a resposta da IA.' });
  }
}
