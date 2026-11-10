// Base de Conhecimento Local da Elo
const KNOWLEDGE_BASE = [
  {
    keywords: ['ovo', 'ovos', 'substituir', 'substituicao', 'bolo'],
    reply: 'Para substituir 1 ovo em receitas doces ou bolos, você pode usar:\n• 1 colher (sopa) de semente de linhaça moída + 3 colheres (sopa) de água (deixe hidratar por 5 min);\n• 1/2 banana madura amassada;\n• 1/4 de xícara de purê de maçã.'
  },
  {
    keywords: ['jantar', 'almoço', 'receita', 'rapida', 'rapido', 'facil'],
    reply: 'Uma opção super rápida e nutritiva é o **Strogonoff de Grão-de-Bico** ou um **Tofu Mexido com Cúrcuma**. Ambas ficam prontas em menos de 20 minutos!'
  },
  {
    keywords: ['rotulo', 'rotulos', 'ingredientes', 'origem animal', 'leite', 'mel'],
    reply: 'Fique atento a termos nos rótulos como: soro de leite, carmim/cochonilha (corante 120), colágeno, albumina, banha e gelatina. Preferir produtos com selo vegano facilita muito!'
  },
  {
    keywords: ['b12', 'vitamina', 'suplemento', 'nutricao'],
    reply: 'A vitamina B12 deve ser suplementada por todas as pessoas que seguem uma alimentação estritamente vegetal. É importante consultar um nutricionista ou médico para ajustar a dosagem correta.'
  }
];

const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, match => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[match]));
}

function formatText(text) {
  let escaped = escapeHTML(text);
  return escaped.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
}

function appendMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender}-message`;
  msgDiv.innerHTML = formatText(text);
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotReply(userText) {
  const textClean = userText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  for (const item of KNOWLEDGE_BASE) {
    if (item.keywords.some(kw => textClean.includes(kw))) {
      return item.reply;
    }
  }

  return "Posso te ajudar com dúvidas sobre receitas veganas, substituições de ingredientes ou dicas de alimentação baseada em plantas! Tente perguntar sobre substituição de ovos, receitas rápidas ou B12. 🌿";
}

function handleUserMessage(text) {
  if (!text.trim()) return;

  appendMessage(text, 'user');
  userInput.value = '';

  setTimeout(() => {
    const reply = getBotReply(text);
    appendMessage(reply, 'bot');
  }, 400);
}

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  handleUserMessage(userInput.value);
});

function sendSuggestion(text) {
  handleUserMessage(text);
}

// Controle de Abrir e Fechar o Chat Overlay
const chatOverlay = document.getElementById('chatOverlay');
const chatToggleBtn = document.getElementById('chatToggleBtn');
const closeChatBtn = document.getElementById('closeChatBtn');

function toggleChat() {
  chatOverlay.classList.toggle('hidden');
}

chatToggleBtn.addEventListener('click', toggleChat);
closeChatBtn.addEventListener('click', toggleChat);

// Fechar ao clicar fora da caixa do chat
chatOverlay.addEventListener('click', (e) => {
  if (e.target === chatOverlay) {
    toggleChat();
  }
});
