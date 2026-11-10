// ELOGRAIN - WIDGET ISOLADO DA ASSISTENTE ELO
(function() {
  // Cria e injeta o HTML do chatbot automaticamente na página
  const chatbotHTML = `
    <div id="chatbot-widget" class="chatbot-widget">
      <button id="chatbot-toggle-btn" class="chatbot-fab" title="Conversar com a Elo">
        <i class="fa-solid fa-robot"></i>
        <span class="chat-badge">Elo</span>
      </button>
      
      <div id="chatbot-window" class="chatbot-window hidden">
        <div class="chatbot-header">
          <div class="chatbot-title">
            <i class="fa-solid fa-seedling"></i>
            <span>Assistente Elo</span>
          </div>
          <button id="chatbot-close-btn" class="icon-btn-small">&times;</button>
        </div>
        <div id="chatbot-messages" class="chatbot-messages">
          <div class="chat-msg bot-msg">
            Olá! Sou a <strong>Elo</strong>, sua assistente virtual. Como posso ajudar com receitas, substituições ou dicas veganas hoje? 🌱
          </div>
        </div>
        <div class="chatbot-input-area">
          <input type="text" id="chatbot-input" placeholder="Pergunte à Elo...">
          <button id="chatbot-send-btn"><i class="fa-solid fa-paper-plane"></i></button>
        </div>
      </div>
    </div>
  `;

  // Insere o chat no corpo da página assim que o DOM carregar
  document.addEventListener('DOMContentLoaded', () => {
    const div = document.createElement('div');
    div.innerHTML = chatbotHTML;
    document.body.appendChild(div);

    // Lógica de funcionamento do chat
    const toggleBtn = document.getElementById('chatbot-toggle-btn');
    const closeBtn = document.getElementById('chatbot-close-btn');
    const chatWindow = document.getElementById('chatbot-window');
    const sendBtn = document.getElementById('chatbot-send-btn');
    const input = document.getElementById('chatbot-input');
    const messagesContainer = document.getElementById('chatbot-messages');

    if (toggleBtn && chatWindow) {
      toggleBtn.addEventListener('click', () => {
        chatWindow.classList.toggle('hidden');
      });
    }

    if (closeBtn && chatWindow) {
      closeBtn.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
      });
    }

    function sendMessage() {
      const text = input.value.trim();
      if (!text) return;

      appendMessage(text, 'user-msg');
      input.value = '';

      setTimeout(() => {
        const botReply = getEloResponse(text);
        appendMessage(botReply, 'bot-msg');
      }, 500);
    }

    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    if (input) {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
      });
    }

    function appendMessage(text, className) {
      const msgDiv = document.createElement('div');
      msgDiv.className = `chat-msg ${className}`;
      msgDiv.innerHTML = text;
      messagesContainer.appendChild(msgDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function getEloResponse(query) {
      const q = query.toLowerCase();
      if (q.includes('substituir') || q.includes('ovo')) {
        return 'Para substituir ovos em receitas doces, você pode usar 1/2 banana amassada, 1 colher de linhaça moída com água, ou aquafaba!';
      } else if (q.includes('leite')) {
        return 'Leites vegetais de aveia, castanha de caju ou amêndoas são ótimas opções para pratos doces e salgados.';
      } else if (q.includes('receita') || q.includes('almoço')) {
        return 'Que tal um delicioso estrogonofe de cogumelos com creme de castanha de caju? É rápido e proteico!';
      } else {
        return 'Estou aqui para ajudar com dicas veganas, receitas e substituição de ingredientes. Como posso ajudar mais? 🌱';
      }
    }
  });
})();
