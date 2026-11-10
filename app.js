// ELOGRAIN - INTEGRAÇÃO DO SUPERAPP E DA ASSISTENTE ELO

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initThemeToggle();
  initMap();
  initCommunity();
  initChatbot();
});

// 1. NAVEGAÇÃO POR ABAS
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const tabContents = document.querySelectorAll('.tab-content');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.getAttribute('data-tab');

      navItems.forEach(i => i.classList.remove('active'));
      tabContents.forEach(t => t.classList.remove('active'));

      item.classList.add('active');
      document.getElementById(`tab-${targetTab}`).classList.add('active');
    });
  });
}

// 2. ALTERNÂNCIA DE TEMA
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle');
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const icon = themeBtn.querySelector('i');
    if (document.body.classList.contains('dark-theme')) {
      icon.className = 'fa-solid fa-sun';
    } else {
      icon.className = 'fa-solid fa-moon';
    }
  });
}

// 3. NAVEGAÇÃO DE MAPA (LEAFLET)
function initMap() {
  if (document.getElementById('map-container')) {
    const map = L.map('map-container').setView([-23.444, -46.918], 12);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([-23.444, -46.918]).addTo(map)
      .bindPopup('<b>Padoca Vegan</b><br>Padaria e Confeitaria 100% Vegetal 🌱')
      .openPopup();
  }
}

// 4. FEED E PUBLICAÇÕES
const posts = [
  { id: 1, author: 'Giovanna Duarte', tag: '#dicas', content: 'Dica de substituto para ovo em bolos: aquafaba de grão-de-bico fica excelente!' },
  { id: 2, author: 'Matheus Favero', tag: '#experiencias', content: 'Fui conhecer a nova opção vegana no centro da cidade, atendimento impecável.' }
];

function initCommunity() {
  renderFeed();

  const publishBtn = document.getElementById('publish-post-btn');
  if (publishBtn) {
    publishBtn.addEventListener('click', () => {
      const text = document.getElementById('new-post-text').value;
      const tag = document.getElementById('post-tag').value;

      if (text.trim() === '') return;

      posts.unshift({
        id: Date.now(),
        author: 'Aline Oliveira',
        tag: `#${tag}`,
        content: text
      });

      document.getElementById('new-post-text').value = '';
      renderFeed();
    });
  }
}

function renderFeed() {
  const homeFeed = document.getElementById('home-feed');
  const communityFeed = document.getElementById('community-feed');

  const html = posts.map(post => `
    <div class="post-card">
      <div style="font-weight: bold; margin-bottom: 4px;">${post.author} <span style="color: var(--primary-color); font-size: 12px;">${post.tag}</span></div>
      <p>${post.content}</p>
    </div>
  `).join('');

  if (homeFeed) homeFeed.innerHTML = html;
  if (communityFeed) communityFeed.innerHTML = html;
}

// 5. CHATBOT ELO INTEGRADO
function initChatbot() {
  const toggleBtn = document.getElementById('chatbot-toggle-btn');
  const closeBtn = document.getElementById('chatbot-close-btn');
  const chatWindow = document.getElementById('chatbot-window');
  const sendBtn = document.getElementById('chatbot-send-btn');
  const input = document.getElementById('chatbot-input');
  const messagesContainer = document.getElementById('chatbot-messages');

  toggleBtn.addEventListener('click', () => {
    chatWindow.classList.toggle('hidden');
  });

  closeBtn.addEventListener('click', () => {
    chatWindow.classList.add('hidden');
  });

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    appendMessage(text, 'user-msg');
    input.value = '';

    setTimeout(() => {
      const botReply = getEloResponse(text);
      appendMessage(botReply, 'bot-msg');
    }, 600);
  }

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

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
}
