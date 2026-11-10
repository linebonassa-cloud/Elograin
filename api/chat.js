const GEMINI_API_KEY = "SUA_CHAVE_AIZASY_AQUI";

async function enviarMensagemElo(mensagemUsuario) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Você é a Elo, assistente virtual do app Elograin. Responda de forma simples, objetiva e acolhedora em português. Pergunta: ${mensagemUsuario}`
            }]
          }]
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("Erro retornado pela API:", data.error);
      return `Erro na API: ${data.error.message || 'Verifique a chave da API.'}`;
    }

    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }

    return "Não consegui gerar uma resposta no momento. Tente novamente!";
  } catch (erro) {
    console.error("Erro na requisição:", erro);
    return "Erro de conexão ao conversar com a Elo.";
  }
}
