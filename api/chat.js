// Substitua "SUA_CHAVE_AIZASY_AQUI" pela chave que copiou do Google AI Studio
const GEMINI_API_KEY = "SUA_CHAVE_AIZASY_AQUI";

async function enviarMensagemElo(mensagemUsuario) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Você é a Elo, a assistente virtual inteligente e acolhedora do aplicativo Elograin. Responda de forma objetiva, empática e útil sobre receitas veganas, substituição de ingredientes e produtos sem crueldade animal. Pergunta do usuário: ${mensagemUsuario}`
            }]
          }]
        })
      }
    );

    const data = await response.json();
    
    if (data.candidates && data.candidates[0].content.parts[0].text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      return "Desculpe, não consegui processar a resposta agora. Tente novamente em instantes!";
    }
  } catch (erro) {
    console.error("Erro na Elo:", erro);
    return "Ops! Ocorreu um problema ao conectar com a Elo. Verifique sua conexão.";
  }
}
