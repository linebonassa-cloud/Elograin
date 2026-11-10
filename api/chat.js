const GEMINI_API_KEY = "AQ.Ab8RN6IeTfbQ5Sfd63fw7yep5nCxoerp3EudzlASPtxI2WrkEg";

async function enviarMensagemElo(mensagemUsuario) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Você é a Elo, assistente virtual vegana do app Elograin. Responda de forma acolhedora, objetiva e útil em português sobre receitas veganas, substituição de ingredientes e produtos sem crueldade. Pergunta: ${mensagemUsuario}`
            }]
          }]
        })
      }
    );

    const data = await response.json();

    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      return "Não consegui gerar uma resposta no momento. Tente novamente!";
    }
  } catch (erro) {
    console.error("Erro na Elo:", erro);
    return "Ops! Ocorreu um problema ao conectar com a Elo.";
  }
}
