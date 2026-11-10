// Substitua "SUA_CHAVE_AIZASY_AQUI" pela sua chave real do Google AI Studio
const GEMINI_API_KEY = AQ.Ab8RN6IeTfbQ5Sfd63fw7yep5nCxoerp3EudzlASPtxI2WrkEg;

async function enviarMensagemElo(mensagemUsuario) {
  try {
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const resposta = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `Você é a Elo, assistente virtual vegana do aplicativo Elograin. Responda de forma acolhedora, objetiva e útil em português sobre receitas veganas, substituições de ingredientes e vida sem crueldade. Pergunta: ${mensagemUsuario}` }]
          }
        ]
      })
    });

    const dados = await resposta.json();
    
    if (dados.candidates && dados.candidates[0].content.parts[0].text) {
      return dados.candidates[0].content.parts[0].text;
    } else if (dados.error) {
      console.error("Erro da API do Gemini:", dados.error);
      return `Erro da IA: ${dados.error.message}`;
    } else {
      return "Não consegui entender a resposta no momento.";
    }
  } catch (erro) {
    console.error("Erro de conexão:", erro);
    return "Ops! Ocorreu um erro de conexão com a Elo.";
  }
}
