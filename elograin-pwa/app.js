// ============================================
// ELOGRAIN - SuperApp Vegano
// ============================================

// ----- Dados Mockados -----
const MOCK_POSTS = [
  {
    id: 1, author: "Ana Verde", avatar: "🌱", time: "2h",
    content: "Finalmente encontrei um queijo vegano que derrete igual o original! 🧀 Testei na lasanha e ficou perfeito. Alguém mais já experimentou a marca Natureza?",
    tag: "dica", likes: 24, comments: 8, liked: false,
    image: null
  },
  {
    id: 2, author: "Carlos Lima", avatar: "🦁", time: "4h",
    content: "Hoje visitei o restaurante Raízes em SP e simplesmente incrível! O strogonoff de palmito é de outro mundo. Super recomendo para quem está levando amigos não-veganos! 🍄",
    tag: "experiencia", likes: 45, comments: 12, liked: true,
    image: null
  },
  {
    id: 3, author: "Mariana Souza", avatar: "🦋", time: "6h",
    content: "Gente, preciso de ajuda! Estou tentando fazer um pão de queijo vegano mas fica borrachudo. Alguém tem uma receita infalível? 🥺",
    tag: "duvida", likes: 8, comments: 15, liked: false,
    image: null
  },
  {
    id: 4, author: "Pedro Alves", avatar: "🐻", time: "8h",
    content: "Dica de supermercado: o Extra da Paulista tem uma seção enorme de produtos veganos agora! Até nuggets de grão-de-bico encontrei. 🛒✨",
    tag: "dica", likes: 32, comments: 5, liked: false,
    image: null
  },
  {
    id: 5, author: "Julia Costa", avatar: "🌸", time: "12h",
    content: "Fui no Festival Vegano de Curitiba no fim de semana e foi mágico! Tantas opções, música boa e energia incrível. Quem vai no próximo? 🎉🌿",
    tag: "experiencia", likes: 67, comments: 20, liked: false,
    image: null
  },
  {
    id: 6, author: "Rafael Mendes", avatar: "🌵", time: "1d",
    content: "Acabei de fazer um bolo de chocolate vegano para o aniversário da minha mãe e ela nem percebeu! A receita é daqui do app, da @AnaVerde. Obrigado pela dica! 🎂",
    tag: "experiencia", likes: 56, comments: 9, liked: true,
    image: null
  }
];

const MOCK_RECIPES = [
  {
    id: 1, title: "Strogonoff de Grão-de-Bico", author: "Ana Verde", avatar: "🌱",
    time: "45 min", difficulty: "Fácil", rating: 4.8, reviews: 34,
    category: "economica", tags: ["💰 Econômica", "🥘 Principal"],
    image: "🍛",
    ingredients: ["2 xícaras grão-de-bico cozido", "1 cebola picada", "2 dentes alho", "200ml creme de castanha", "1 colher ketchup", "1 colher mostarda", "Sal e pimenta"],
    steps: ["Refogue cebola e alho até dourar.", "Adicione o grão-de-bico e tempere.", "Misture ketchup, mostarda e creme de castanha.", "Cozinhe por 10 min e sirva com arroz."]
  },
  {
    id: 2, title: "Bolo de Chocolate Vegano", author: "Julia Costa", avatar: "🌸",
    time: "50 min", difficulty: "Médio", rating: 4.9, reviews: 52,
    category: "sobremesa", tags: ["🍰 Sobremesa", "🎉 Festa"],
    image: "🍫",
    ingredients: ["2 xícaras farinha", "1 xícara cacau", "1 xícara açúcar", "1 xícara leite vegetal", "1/2 xícara óleo", "1 colher fermento", "1 colher vinagre"],
    steps: ["Misture secos em uma tigela.", "Adicione úmidos e mexa até homogeneizar.", "Leve ao forno a 180°C por 35 min.", "Decore com ganache de chocolate vegano."]
  },
  {
    id: 3, title: "Tofu Mexido de Café da Manhã", author: "Carlos Lima", avatar: "🦁",
    time: "15 min", difficulty: "Fácil", rating: 4.5, reviews: 18,
    category: "rapida", tags: ["⚡ Rápida", "🌅 Café"],
    image: "🍳",
    ingredients: ["200g tofu firme", "1/2 colher cúrcuma", "2 colheres levedura nutricional", "Sal, pimenta e azeite", "Vegetais a gosto"],
    steps: ["Escorra e esfarele o tofu.", "Refogue com azeite e vegetais.", "Adicione cúrcuma e levedura.", "Cozinhe por 5 min e sirva quente."]
  },
  {
    id: 4, title: "Lasanha de Berinjela", author: "Mariana Souza", avatar: "🦋",
    time: "60 min", difficulty: "Médio", rating: 4.7, reviews: 28,
    category: "economica", tags: ["💰 Econômica", "🥘 Principal"],
    image: "🍲",
    ingredients: ["2 berinjelas em rodelas", "Molho de tomate caseiro", "Creme de castanha", "Queijo vegano ralado", "Manjericão fresco"],
    steps: ["Grelhe as rodelas de berinjela.", "Monte camadas: molho, berinjela, creme.", "Finalize com queijo vegano.", "Asse a 200°C por 25 min."]
  },
  {
    id: 5, title: "Sorvete de Banana e Peanut", author: "Pedro Alves", avatar: "🐻",
    time: "5 min", difficulty: "Fácil", rating: 4.6, reviews: 41,
    category: "sobremesa", tags: ["🍰 Sobremesa", "❄️ Gelado"],
    image: "🍦",
    ingredients: ["3 bananas congeladas", "2 colheres pasta de amendoim", "1 colher cacau (opcional)", "Granola para decorar"],
    steps: ["Bata as bananas congeladas no processador.", "Adicione pasta de amendoim e bata mais.", "Sirva imediatamente com granola."]
  },
  {
    id: 6, title: "Hambúrguer de Lentilha", author: "Rafael Mendes", avatar: "🌵",
    time: "30 min", difficulty: "Fácil", rating: 4.4, reviews: 22,
    category: "economica", tags: ["💰 Econômica", "🍔 Lanche"],
    image: "🍔",
    ingredients: ["1 xícara lentilha cozida", "1/2 xícara aveia em flocos", "1 cebola caramelizada", "Alho e cominho", "Sal e pimenta"],
    steps: ["Processe lentilha e aveia.", "Misture temperos e cebola.", "Modele hambúrgueres.", "Grelhe 4 min de cada lado."]
  },
  {
    id: 7, title: "Smoothie Bowl Verde", author: "Ana Verde", avatar: "🌱",
    time: "10 min", difficulty: "Fácil", rating: 4.3, reviews: 15,
    category: "rapida", tags: ["⚡ Rápida", "💚 Saudável"],
    image: "🥣",
    ingredients: ["1 banana congelada", "1 xícara espinafre", "1/2 xícara leite de coco", "1/2 abacate", "Toppings: semente, frutas"],
    steps: ["Bata banana, espinafre, leite e abacate.", "Coloque em uma tigela.", "Decore com sementes e frutas.", "Aproveite imediatamente!"]
  },
  {
    id: 8, title: "Brigadeiro Vegano", author: "Julia Costa", avatar: "🌸",
    time: "20 min", difficulty: "Fácil", rating: 4.9, reviews: 63,
    category: "sobremesa", tags: ["🍰 Sobremesa", "🎉 Festa"],
    image: "🍬",
    ingredients: ["1 xícara leite condensado de aveia", "1/2 xícara cacau em pó", "1 colher manteiga vegetal", "Granulado vegano"],
    steps: ["Misture leite condensado e cacau.", "Cozinhe em fogo baixo até desgrudar.", "Adicione manteiga e misture.", "Enrole e passe no granulado."]
  }
];

const MOCK_PLACES = [
  { id: 1, name: "Raízes Restaurante", type: "100% Vegano", category: "restaurante", rating: 4.9, reviews: 120, address: "R. Augusta, 500 - SP", x: 30, y: 40, icon: "🍽️", badge: "vegan" },
  { id: 2, name: "Sorveteria Verde", type: "100% Vegano", category: "sorveteria", rating: 4.7, reviews: 85, address: "Av. Paulista, 1000 - SP", x: 55, y: 25, icon: "🍦", badge: "vegan" },
  { id: 3, name: "Padaria Flor", type: "Vegan Friendly", category: "padaria", rating: 4.3, reviews: 45, address: "R. Oscar Freire, 200 - SP", x: 70, y: 55, icon: "🥐", badge: "friendly" },
  { id: 4, name: "Burger Plant", type: "100% Vegano", category: "lanchonete", rating: 4.6, reviews: 92, address: "R. Fidalga, 80 - SP", x: 45, y: 70, icon: "🍔", badge: "vegan" },
  { id: 5, name: "Café Moka", type: "Vegan Friendly", category: "cafe", rating: 4.2, reviews: 38, address: "R. Harmonia, 150 - SP", x: 20, y: 60, icon: "☕", badge: "friendly" },
  { id: 6, name: "Empório Natural", type: "100% Vegano", category: "restaurante", rating: 4.8, reviews: 67, address: "Av. Brasil, 300 - SP", x: 80, y: 30, icon: "🥗", badge: "vegan" },
  { id: 7, name: "Gelato Amor", type: "Vegan Friendly", category: "sorveteria", rating: 4.4, reviews: 52, address: "R. dos Pinheiros, 90 - SP", x: 35, y: 85, icon: "🍨", badge: "friendly" },
  { id: 8, name: "Lanchonete Sol", type: "Vegan Friendly", category: "lanchonete", rating: 4.1, reviews: 29, address: "Av. Rebouças, 400 - SP", x: 60, y: 45, icon: "🥪", badge: "friendly" }
];

const MOCK_EVENTS = [
  { id: 1, title: "Festival Vegano de SP", date: "25 Ago 2026", location: "Parque Ibirapuera", type: "Festival", icon: "🎪", attendees: 340 },
  { id: 2, title: "Feira de Produtos Naturais", date: "30 Ago 2026", location: "Expo Center Norte", type: "Feira", icon: "🛍️", attendees: 120 },
  { id: 3, title: "Encontro Vegano de Curitiba", date: "05 Set 2026", location: "Praça Osório", type: "Encontro", icon: "🤝", attendees: 85 },
  { id: 4, title: "Workshop de Culinária Vegana", date: "10 Set 2026", location: "Casa Natural - SP", type: "Workshop", icon: "👨‍🍳", attendees: 25 },
  { id: 5, title: "Marcha Animal Rights", date: "15 Set 2026", location: "Av. Paulista", type: "Marcha", icon: "🐾", attendees: 500 }
];

const MOCK_REVIEWS = [
  { id: 1, place: "Raízes Restaurante", author: "Carlos Lima", avatar: "🦁", rating: 5, text: "Simplesmente o melhor strogonoff que já comi! O atendimento é impecável e o ambiente é super aconchegante. Levei meus pais não-veganos e eles amaram!", date: "2 dias atrás", likes: 18 },
  { id: 2, place: "Sorveteria Verde", author: "Ana Verde", avatar: "🌱", rating: 5, text: "O sabor de pistache é surreal! Textura cremosa e nenhum gosto artificial. Preço justo para a qualidade.", date: "1 semana atrás", likes: 12 },
  { id: 3, place: "Burger Plant", author: "Pedro Alves", avatar: "🐻", rating: 4, text: "Hambúrguer muito bom, mas o tempo de espera foi longo. Recomendo ir em dia de semana. O milkshake de ovomaltine é must-try!", date: "3 dias atrás", likes: 8 },
  { id: 4, place: "Padaria Flor", author: "Mariana Souza", avatar: "🦋", rating: 4, text: "Bom para encontrar opções, mas ainda tem poucas variedades doces. O pão de fermentação natural é excelente!", date: "5 dias atrás", likes: 5 },
  { id: 5, place: "Empório Natural", author: "Julia Costa", avatar: "🌸", rating: 5, text: "Buffet por quilo com dezenas de opções! Tudo muito fresco e saboroso. O suco detox é maravilhoso.", date: "1 dia atrás", likes: 22 }
];

const MOCK_PRODUCTS_MARKET = [
  { id: 1, name: "Leite de Aveita Orgânico", brand: "Aveita", category: "Bebidas", price: "R$ 12,90", icon: "🥛", vegan: true, stores: ["Carrefour", "Extra", "Mundo Verde"] },
  { id: 2, name: "Nuggets de Grão-de-Bico", brand: "Fazenda Futuro", category: "Congelados", price: "R$ 24,50", icon: "🍗", vegan: true, stores: ["Carrefour", "Pão de Açúcar"] },
  { id: 3, name: "Queijo Cheddar Vegano", brand: "New Roots", category: "Frios", price: "R$ 32,00", icon: "🧀", vegan: true, stores: ["Mundo Verde", "Empório Alto dos Pinheiros"] },
  { id: 4, name: "Iogurte de Coco Natural", brand: "CocoVeg", category: "Laticínios", price: "R$ 8,90", icon: "🥣", vegan: true, stores: ["Extra", "Carrefour"] },
  { id: 5, name: "Hambúrguer de Soja", brand: "Seara Veg", category: "Congelados", price: "R$ 19,90", icon: "🍔", vegan: true, stores: ["Carrefour", "Extra", "Pão de Açúcar"] },
  { id: 6, name: "Barra de Chocolate 70%", brand: "Mendoá", category: "Doces", price: "R$ 14,50", icon: "🍫", vegan: true, stores: ["Mundo Verde", "Carrefour"] },
  { id: 7, name: "Requeijão de Castanha", brand: "Veggs", category: "Frios", price: "R$ 18,90", icon: "🧈", vegan: true, stores: ["Empório Natural", "Mundo Verde"] },
  { id: 8, name: "Granola Sem Mel", brand: "Kölln", category: "Cereais", price: "R$ 16,90", icon: "🥣", vegan: true, stores: ["Carrefour", "Extra"] }
];

const MOCK_PRODUCTS_BEAUTY = [
  { id: 1, name: "Shampoo Sólido Lavanda", brand: "Lush", category: "Cabelo", price: "R$ 45,00", icon: "🧴", vegan: true, crueltyFree: true, stores: ["Lush Online", "Sephora"] },
  { id: 2, name: "Hidratante Facial Chia", brand: "B.A.E.", category: "Skincare", price: "R$ 29,90", icon: "🧴", vegan: true, crueltyFree: true, stores: ["O Boticário"] },
  { id: 3, name: "Batom Líquido Matte", brand: "Vizzela", category: "Maquiagem", price: "R$ 19,90", icon: "💄", vegan: true, crueltyFree: true, stores: ["Beleza Na Web", "Magalu"] },
  { id: 4, name: "Sabonete Artesanal Argila", brand: "Terra Brasil", category: "Corpo", price: "R$ 12,00", icon: "🧼", vegan: true, crueltyFree: true, stores: ["Mundo Verde", "Loja Natural"] },
  { id: 5, name: "Protetor Solar Mineral", brand: "Simple Organic", category: "Skincare", price: "R$ 68,00", icon: "☀️", vegan: true, crueltyFree: true, stores: ["Simple Organic Online"] },
  { id: 6, name: "Desodorante Natural", brand: "Biossance", category: "Corpo", price: "R$ 35,00", icon: "🌸", vegan: true, crueltyFree: true, stores: ["Sephora Online"] }
];

const MOCK_PROFILES = [
  { id: 1, name: "Luna Silva", age: 26, avatar: "🌙", bio: "Chef vegana em transição. Amo trilhas e café da manhã! ☕🌿", interests: ["Culinária", "Natureza", "Yoga"], type: "encontros" },
  { id: 2, name: "Gabriel Costa", age: 29, avatar: "🎸", bio: "Músico e ativista. Procurando alguém para ir a festivais veganos! 🎶", interests: ["Música", "Ativismo", "Cinema"], type: "encontros" },
  { id: 3, name: "Isabela Ferreira", age: 24, avatar: "🎨", bio: "Ilustradora e amante de animais. Adoro experimentar receitas novas! 🐱", interests: ["Arte", "Animais", "Receitas"], type: "encontros" },
  { id: 4, name: "Thiago Mendes", age: 31, avatar: "🏃", bio: "Corredor e nutricionista esportivo vegano. Vamos correr no parque? 🏃‍♂️", interests: ["Esportes", "Nutrição", "Viagens"], type: "amizades" },
  { id: 5, name: "Camila Rocha", age: 27, avatar: "📚", bio: "Escritora e bookaholic. Procurando amigos para clubes do livro vegano! 📖", interests: ["Leitura", "Escrita", "Cafés"], type: "amizades" },
  { id: 6, name: "Bruno Alves", age: 33, avatar: "🌵", bio: "Engenheiro e pai de plantas. Adoro compartilhar dicas de jardinagem! 🌱", interests: ["Plantas", "Tecnologia", "Board Games"], type: "amizades" }
];

// ----- Estado -----
let state = {
  currentView: 'feed',
  darkMode: false,
  posts: [...MOCK_POSTS],
  recipes: [...MOCK_RECIPES],
  places: [...MOCK_PLACES],
  events: [...MOCK_EVENTS],
  reviews: [...MOCK_REVIEWS],
  productsMarket: [...MOCK_PRODUCTS_MARKET],
  productsBeauty: [...MOCK_PRODUCTS_BEAUTY],
  profiles: [...MOCK_PROFILES],
  myRecipes: [],
  myReviews: [],
  user: { name: "Você", avatar: "🦁", bio: "Membro da comunidade Elograin" },
  exploreTab: 'mapa',
  consumeTab: 'mercado',
  connectTab: 'encontros',
  createType: 'post'
};

// ----- LocalStorage -----
function loadState() {
  try {
    const saved = localStorage.getItem('elograin_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      state = { ...state, ...parsed };
    }
  } catch (e) {}
  if (state.darkMode) document.documentElement.setAttribute('data-theme', 'dark');
}

function saveState() {
  try {
    localStorage.setItem('elograin_state', JSON.stringify({
      darkMode: state.darkMode,
      myRecipes: state.myRecipes,
      myReviews: state.myReviews,
      posts: state.posts,
      recipes: state.recipes,
      user: state.user
    }));
  } catch (e) {}
}

// ----- Toast -----
function toast(msg) {
  const container = document.getElementById('toastContainer');
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

// ----- Navigation -----
function showView(viewName) {
  state.currentView = viewName;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(viewName + 'View').classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelector(`.nav-item[data-view="${viewName}"]`).classList.add('active');
  window.scrollTo(0, 0);
  renderCurrentView();
}

function renderCurrentView() {
  if (state.currentView === 'feed') renderFeed();
  if (state.currentView === 'recipes') renderRecipes();
  if (state.currentView === 'explore') renderExplore();
  if (state.currentView === 'consume') renderConsume();
  if (state.currentView === 'connect') renderConnect();
  if (state.currentView === 'profile') renderProfile();
}

// ----- Feed -----
function renderFeed(filterTag = 'todos') {
  const container = document.getElementById('feedPosts');
  const search = document.getElementById('feedSearch')?.value.toLowerCase() || '';
  let posts = state.posts;
  if (filterTag !== 'todos') posts = posts.filter(p => p.tag === filterTag);
  if (search) posts = posts.filter(p => p.content.toLowerCase().includes(search) || p.author.toLowerCase().includes(search));

  container.innerHTML = posts.map(post => `
    <article class="card" data-id="${post.id}">
      <div class="card-header">
        <div class="avatar">${post.avatar}</div>
        <div class="card-meta">
          <div class="name">${post.author}</div>
          <div class="time">${post.time} • <span class="badge badge-${post.tag === 'dica' ? 'vegan' : post.tag === 'experiencia' ? 'friendly' : 'econ'}">${post.tag}</span></div>
        </div>
      </div>
      <p class="card-text">${post.content}</p>
      <div class="card-actions">
        <button class="action-btn ${post.liked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
          <span>${post.liked ? '❤️' : '🤍'}</span> ${post.likes}
        </button>
        <button class="action-btn" onclick="showComments(${post.id})">
          <span>💬</span> ${post.comments}
        </button>
        <button class="action-btn" onclick="sharePost(${post.id})">
          <span>🔗</span> Compartilhar
        </button>
      </div>
    </article>
  `).join('');
  if (posts.length === 0) container.innerHTML = emptyState('Nenhum post encontrado', '🔍');
}

function toggleLike(postId) {
  const post = state.posts.find(p => p.id === postId);
  if (post) {
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    saveState();
    renderFeed();
  }
}

function showComments(postId) {
  const post = state.posts.find(p => p.id === postId);
  if (!post) return;
  openDetailModal('💬 Comentários', `
    <div class="card" style="margin-bottom:16px">
      <div class="card-header">
        <div class="avatar">${post.avatar}</div>
        <div class="card-meta">
          <div class="name">${post.author}</div>
          <div class="time">${post.time}</div>
        </div>
      </div>
      <p class="card-text">${post.content}</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px">
      <div class="card" style="padding:12px">
        <div style="font-weight:700;font-size:0.85rem;margin-bottom:4px">🌱 Ana Verde</div>
        <div style="font-size:0.85rem;color:var(--text-light)">Amei essa dica! Vou testar hoje mesmo 😍</div>
      </div>
      <div class="card" style="padding:12px">
        <div style="font-weight:700;font-size:0.85rem;margin-bottom:4px">🦁 Carlos Lima</div>
        <div style="font-size:0.85rem;color:var(--text-light)">Onde você comprou? Não acho em lugar nenhum!</div>
      </div>
      <div class="card" style="padding:12px">
        <div style="font-weight:700;font-size:0.85rem;margin-bottom:4px">🦋 Mariana Souza</div>
        <div style="font-size:0.85rem;color:var(--text-light)">Salvando essa dica! Obrigada por compartilhar 🙏</div>
      </div>
    </div>
  `, '<button class="btn btn-primary" onclick="toast("Comentário adicionado!")">💬 Comentar</button>');
}

function sharePost(postId) {
  toast('Link copiado para a área de transferência!');
}

// ----- Recipes -----
function renderRecipes() {
  const container = document.getElementById('recipesList');
  const search = document.getElementById('recipeSearch')?.value.toLowerCase() || '';
  const activeTab = document.querySelector('#recipeTabs .tab.active')?.dataset.tab || 'todas';
  let recipes = [...state.recipes, ...state.myRecipes];
  if (activeTab !== 'todas') recipes = recipes.filter(r => r.category === activeTab);
  if (search) recipes = recipes.filter(r => r.title.toLowerCase().includes(search) || r.author.toLowerCase().includes(search));

  container.innerHTML = recipes.map(r => `
    <article class="recipe-card" onclick="showRecipeDetail(${r.id})">
      <div class="recipe-thumb">${r.image || '🍽️'}</div>
      <div class="recipe-info">
        <h3>${r.title}</h3>
        <div class="recipe-meta">
          <div class="rating"><span class="stars">⭐</span> ${r.rating} (${r.reviews})</div>
          <div style="margin-top:4px">⏱️ ${r.time} • 👤 ${r.author}</div>
          <div class="tag-list" style="margin-top:6px">
            ${r.tags.map(t => `<span class="tag" style="padding:2px 8px;font-size:0.7rem">${t}</span>`).join('')}
          </div>
        </div>
      </div>
    </article>
  `).join('');
  if (recipes.length === 0) container.innerHTML = emptyState('Nenhuma receita encontrada', '🍽️');
}

function showRecipeDetail(recipeId) {
  const all = [...state.recipes, ...state.myRecipes];
  const r = all.find(x => x.id === recipeId);
  if (!r) return;
  openDetailModal(r.title, `
    <div style="text-align:center;font-size:4rem;margin-bottom:12px">${r.image}</div>
    <div style="display:flex;gap:12px;justify-content:center;margin-bottom:16px;flex-wrap:wrap">
      <span class="badge badge-vegan">⭐ ${r.rating}</span>
      <span class="badge badge-friendly">⏱️ ${r.time}</span>
      <span class="badge badge-econ">📊 ${r.difficulty}</span>
    </div>
    <div style="margin-bottom:16px">
      <label>Ingredientes</label>
      <ul style="padding-left:20px;color:var(--text-light);font-size:0.9rem;line-height:1.8">
        ${r.ingredients.map(i => `<li>${i}</li>`).join('')}
      </ul>
    </div>
    <div>
      <label>Modo de Preparo</label>
      <ol style="padding-left:20px;color:var(--text-light);font-size:0.9rem;line-height:1.8">
        ${r.steps.map(s => `<li>${s}</li>`).join('')}
      </ol>
    </div>
    <div style="margin-top:16px;padding-top:16px;border-top:1px solid var(--border)">
      <div style="font-size:0.85rem;color:var(--text-light)">Por ${r.author}</div>
    </div>
  `, `
    <button class="btn btn-primary" onclick="rateRecipe(${r.id})">⭐ Avaliar</button>
    <button class="btn btn-secondary" onclick="toast('Salvo nos favoritos!')">💾 Salvar</button>
  `);
}

function rateRecipe(id) {
  toast('Obrigado pela avaliação! ⭐');
  closeDetailModal();
}

// ----- Explore (Map + Events + Reviews) -----
function renderExplore() {
  const content = document.getElementById('exploreContent');
  if (state.exploreTab === 'mapa') renderMap(content);
  else if (state.exploreTab === 'eventos') renderEvents(content);
  else if (state.exploreTab === 'avaliacoes') renderReviews(content);
}

function renderMap(container) {
  const pins = state.places.map(p => `
    <div class="map-pin" style="left:${p.x}%;top:${p.y}%" onclick="showPlaceDetail(${p.id})">
      <div class="pin-icon pin-${p.badge}"><span>${p.icon}</span></div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="map-container">
      <div class="map-grid"></div>
      ${pins}
    </div>
    <div class="map-legend">
      <div class="map-legend-item"><div class="legend-dot" style="background:var(--sprout)"></div> 100% Vegano</div>
      <div class="map-legend-item"><div class="legend-dot" style="background:var(--secondary)"></div> Vegan Friendly</div>
    </div>
    <div class="section-header">
      <h3 class="section-title">Próximos a Você</h3>
    </div>
    <div>
      ${state.places.map(p => `
        <div class="place-card" onclick="showPlaceDetail(${p.id})">
          <div class="place-img">${p.icon}</div>
          <div class="place-info">
            <h4>${p.name}</h4>
            <div class="place-type">
              <span class="badge badge-${p.badge === 'vegan' ? 'vegan' : 'friendly'}">${p.type}</span>
            </div>
            <div class="rating">⭐ ${p.rating} • ${p.reviews} avaliações</div>
            <div style="font-size:0.8rem;color:var(--text-light);margin-top:2px">📍 ${p.address}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function showPlaceDetail(placeId) {
  const p = state.places.find(x => x.id === placeId);
  if (!p) return;
  openDetailModal(p.name, `
    <div style="text-align:center;font-size:4rem;margin-bottom:12px">${p.icon}</div>
    <div style="text-align:center;margin-bottom:16px">
      <span class="badge badge-${p.badge === 'vegan' ? 'vegan' : 'friendly'}">${p.type}</span>
    </div>
    <div class="rating" style="justify-content:center;margin-bottom:12px;font-size:1.1rem">⭐ ${p.rating} <span style="color:var(--text-light);font-size:0.85rem">(${p.reviews} avaliações)</span></div>
    <div style="text-align:center;color:var(--text-light);margin-bottom:16px">📍 ${p.address}</div>
    <div style="display:flex;gap:8px;justify-content:center;margin-bottom:16px">
      <span class="tag">🍽️ Restaurante</span>
      <span class="tag">♿ Acessível</span>
      <span class="tag">💳 Cartão</span>
    </div>
  `, `
    <button class="btn btn-primary" onclick="openReviewModal('${p.name}')">⭐ Avaliar</button>
    <button class="btn btn-secondary" onclick="toast('Rota iniciada no mapa!')">🗺️ Traçar Rota</button>
  `);
}

function renderEvents(container) {
  container.innerHTML = `
    <div class="section-header">
      <h3 class="section-title">Eventos Próximos</h3>
    </div>
    ${state.events.map(e => `
      <div class="card" style="cursor:pointer" onclick="showEventDetail(${e.id})">
        <div class="card-header">
          <div class="avatar" style="font-size:1.8rem">${e.icon}</div>
          <div class="card-meta">
            <div class="name">${e.title}</div>
            <div class="time">${e.date} • ${e.location}</div>
          </div>
        </div>
        <div style="display:flex;gap:8px;margin-top:8px">
          <span class="badge badge-econ">${e.type}</span>
          <span class="badge badge-vegan">👥 ${e.attendees} confirmados</span>
        </div>
      </div>
    `).join('')}
  `;
}

function showEventDetail(eventId) {
  const e = state.events.find(x => x.id === eventId);
  if (!e) return;
  openDetailModal(e.title, `
    <div style="text-align:center;font-size:4rem;margin-bottom:12px">${e.icon}</div>
    <div style="text-align:center;margin-bottom:16px">
      <span class="badge badge-econ">${e.type}</span>
    </div>
    <div style="margin-bottom:12px"><strong>📅 Data:</strong> ${e.date}</div>
    <div style="margin-bottom:12px"><strong>📍 Local:</strong> ${e.location}</div>
    <div style="margin-bottom:12px"><strong>👥 Confirmados:</strong> ${e.attendees} pessoas</div>
    <div style="padding:12px;background:var(--cream);border-radius:12px;margin-top:12px">
      <div style="font-size:0.85rem;color:var(--text-light)">Vai participar? Confirme sua presença!</div>
    </div>
  `, `
    <button class="btn btn-primary" onclick="toast('Presença confirmada! 🎉')">✅ Confirmar</button>
    <button class="btn btn-secondary" onclick="toast('Evento salvo!')">💾 Salvar</button>
  `);
}

function renderReviews(container) {
  const allReviews = [...state.reviews, ...state.myReviews];
  container.innerHTML = `
    <div class="section-header">
      <h3 class="section-title">Avaliações Recentes</h3>
    </div>
    ${allReviews.map(r => `
      <div class="card">
        <div class="card-header">
          <div class="avatar">${r.avatar}</div>
          <div class="card-meta">
            <div class="name">${r.author}</div>
            <div class="time">${r.place} • ${r.date || 'Agora'}</div>
          </div>
        </div>
        <div class="rating" style="margin-bottom:8px">${'⭐'.repeat(r.rating)}</div>
        <p class="card-text">${r.text}</p>
        <div class="card-actions">
          <button class="action-btn" onclick="toast('Útil marcado!')">👍 Útil (${r.likes || 0})</button>
        </div>
      </div>
    `).join('')}
  `;
}

// ----- Consume -----
function renderConsume() {
  const content = document.getElementById('consumeContent');
  if (state.consumeTab === 'mercado') renderMarket(content);
  else renderBeauty(content);
}

function renderMarket(container) {
  container.innerHTML = `
    <div class="search-bar">
      <span class="search-icon">🔍</span>
      <input type="text" placeholder="Buscar produtos no mercado..." oninput="filterProducts(this.value, 'market')">
    </div>
    <div id="marketList">
      ${state.productsMarket.map(p => productCard(p)).join('')}
    </div>
  `;
}

function renderBeauty(container) {
  container.innerHTML = `
    <div class="search-bar">
      <span class="search-icon">🔍</span>
      <input type="text" placeholder="Buscar produtos de beleza..." oninput="filterProducts(this.value, 'beauty')">
    </div>
    <div id="beautyList">
      ${state.productsBeauty.map(p => productCard(p, true)).join('')}
    </div>
  `;
}

function productCard(p, isBeauty = false) {
  return `
    <div class="product-card">
      <div class="product-img">${p.icon}</div>
      <div style="flex:1;min-width:0">
        <div style="font-weight:700;font-size:0.95rem;margin-bottom:2px">${p.name}</div>
        <div style="font-size:0.8rem;color:var(--text-light);margin-bottom:4px">${p.brand} • ${p.category}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <span class="badge badge-vegan">🌿 Vegano</span>
          ${isBeauty ? '<span class="badge badge-friendly">🐰 Cruelty Free</span>' : ''}
        </div>
        <div style="font-size:0.8rem;color:var(--text-light);margin-top:6px">🏪 ${p.stores.slice(0, 2).join(', ')}${p.stores.length > 2 ? '...' : ''}</div>
      </div>
      <div style="font-weight:800;color:var(--primary);font-size:1rem;white-space:nowrap">${p.price}</div>
    </div>
  `;
}

function filterProducts(query, type) {
  query = query.toLowerCase();
  const list = type === 'market' ? state.productsMarket : state.productsBeauty;
  const filtered = list.filter(p => p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query));
  const container = document.getElementById(type === 'market' ? 'marketList' : 'beautyList');
  container.innerHTML = filtered.map(p => productCard(p, type === 'beauty')).join('');
  if (filtered.length === 0) container.innerHTML = emptyState('Nenhum produto encontrado', '🔍');
}

// ----- Connect -----
function renderConnect() {
  const content = document.getElementById('connectContent');
  if (state.connectTab === 'encontros') renderDating(content);
  else renderFriendships(content);
}

function renderDating(container) {
  const profiles = state.profiles.filter(p => p.type === 'encontros');
  container.innerHTML = profiles.map(p => matchCard(p)).join('');
}

function renderFriendships(container) {
  const profiles = state.profiles.filter(p => p.type === 'amizades');
  container.innerHTML = profiles.map(p => matchCard(p)).join('');
}

function matchCard(p) {
  return `
    <div class="match-card">
      <div class="match-img">${p.avatar}</div>
      <div class="match-body">
        <h3 style="font-size:1.2rem;margin-bottom:4px">${p.name}, ${p.age}</h3>
        <p style="color:var(--text-light);font-size:0.9rem;margin-bottom:8px">${p.bio}</p>
        <div class="tag-list">
          ${p.interests.map(i => `<span class="tag" style="padding:4px 10px;font-size:0.75rem">${i}</span>`).join('')}
        </div>
      </div>
      <div class="match-actions">
        <button class="match-btn match-btn-secondary" onclick="toast('Passado 👋')">👋 Pular</button>
        <button class="match-btn match-btn-primary" onclick="toast('Match! 💕 Inicie uma conversa.')">💕 Curtir</button>
      </div>
    </div>
  `;
}

// ----- Profile -----
function renderProfile() {
  document.getElementById('profileName').textContent = state.user.name;
  document.getElementById('profileAvatar').textContent = state.user.avatar;
  document.getElementById('profileBio').textContent = state.user.bio;
  document.getElementById('statPosts').textContent = state.posts.filter(p => p.author === state.user.name).length;
  document.getElementById('statRecipes').textContent = state.myRecipes.length;
  document.getElementById('statLikes').textContent = state.posts.reduce((a, p) => a + (p.author === state.user.name ? p.likes : 0), 0);

  const myRecipesContainer = document.getElementById('myRecipes');
  if (state.myRecipes.length === 0) {
    myRecipesContainer.innerHTML = emptyState('Você ainda não criou receitas', '🍽️');
  } else {
    myRecipesContainer.innerHTML = state.myRecipes.map(r => `
      <div class="recipe-card" onclick="showRecipeDetail(${r.id})">
        <div class="recipe-thumb">${r.image}</div>
        <div class="recipe-info">
          <h3>${r.title}</h3>
          <div class="recipe-meta">⭐ ${r.rating} • ⏱️ ${r.time}</div>
        </div>
      </div>
    `).join('');
  }

  const myReviewsContainer = document.getElementById('myReviews');
  if (state.myReviews.length === 0) {
    myReviewsContainer.innerHTML = emptyState('Você ainda não fez avaliações', '⭐');
  } else {
    myReviewsContainer.innerHTML = state.myReviews.map(r => `
      <div class="card">
        <div style="font-weight:700;margin-bottom:4px">${r.place}</div>
        <div class="rating" style="margin-bottom:6px">${'⭐'.repeat(r.rating)}</div>
        <p style="font-size:0.85rem;color:var(--text-light)">${r.text}</p>
      </div>
    `).join('');
  }
}

// ----- Modal System -----
function openDetailModal(title, body, footer = '') {
  document.getElementById('detailTitle').textContent = title;
  document.getElementById('detailBody').innerHTML = body;
  document.getElementById('detailFooter').innerHTML = footer;
  document.getElementById('detailModal').classList.add('active');
}

function closeDetailModal() {
  document.getElementById('detailModal').classList.remove('active');
}

function openCreateModal() {
  document.getElementById('createModal').classList.add('active');
  renderCreateForm();
}

function closeCreateModal() {
  document.getElementById('createModal').classList.remove('active');
}

function renderCreateForm() {
  const form = document.getElementById('createForm');
  if (state.createType === 'post') {
    form.innerHTML = `
      <label>O que você quer compartilhar?</label>
      <textarea id="postContent" placeholder="Conte sua experiência, dica ou dúvida..."></textarea>
      <label>Categoria</label>
      <select id="postTag">
        <option value="dica">💡 Dica</option>
        <option value="experiencia">✨ Experiência</option>
        <option value="duvida">❓ Dúvida</option>
      </select>
      <button class="btn btn-primary w-full" onclick="submitPost()">Publicar</button>
    `;
  } else if (state.createType === 'recipe') {
    form.innerHTML = `
      <label>Nome da Receita</label>
      <input type="text" id="recipeTitle" placeholder="Ex: Strogonoff de Grão-de-Bico">
      <label>Tempo de Preparo</label>
      <input type="text" id="recipeTime" placeholder="Ex: 45 min">
      <label>Dificuldade</label>
      <select id="recipeDiff">
        <option>Fácil</option>
        <option>Médio</option>
        <option>Difícil</option>
      </select>
      <label>Categoria</label>
      <select id="recipeCategory">
        <option value="economica">💰 Econômica</option>
        <option value="rapida">⚡ Rápida</option>
        <option value="sobremesa">🍰 Sobremesa</option>
      </select>
      <label>Ingredientes (um por linha)</label>
      <textarea id="recipeIngredients" placeholder="2 xícaras grão-de-bico
1 cebola picada..."></textarea>
      <label>Modo de Preparo (um passo por linha)</label>
      <textarea id="recipeSteps" placeholder="Refogue a cebola...
Adicione o grão-de-bico..."></textarea>
      <button class="btn btn-primary w-full" onclick="submitRecipe()">Publicar Receita</button>
    `;
  } else if (state.createType === 'review') {
    form.innerHTML = `
      <label>Estabelecimento</label>
      <input type="text" id="reviewPlace" placeholder="Nome do restaurante/lugar">
      <label>Nota</label>
      <select id="reviewRating">
        <option value="5">⭐⭐⭐⭐⭐ (5)</option>
        <option value="4">⭐⭐⭐⭐ (4)</option>
        <option value="3">⭐⭐⭐ (3)</option>
        <option value="2">⭐⭐ (2)</option>
        <option value="1">⭐ (1)</option>
      </select>
      <label>Sua Experiência</label>
      <textarea id="reviewText" placeholder="Conte como foi sua visita..."></textarea>
      <button class="btn btn-primary w-full" onclick="submitReview()">Publicar Avaliação</button>
    `;
  }
}

function submitPost() {
  const content = document.getElementById('postContent').value.trim();
  const tag = document.getElementById('postTag').value;
  if (!content) { toast('Escreva algo antes de publicar!'); return; }
  const newPost = {
    id: Date.now(), author: state.user.name, avatar: state.user.avatar,
    time: "Agora", content, tag, likes: 0, comments: 0, liked: false, image: null
  };
  state.posts.unshift(newPost);
  saveState();
  closeCreateModal();
  toast('Post publicado! 🎉');
  if (state.currentView === 'feed') renderFeed();
  if (state.currentView === 'profile') renderProfile();
}

function submitRecipe() {
  const title = document.getElementById('recipeTitle').value.trim();
  const time = document.getElementById('recipeTime').value.trim();
  const difficulty = document.getElementById('recipeDiff').value;
  const category = document.getElementById('recipeCategory').value;
  const ingredients = document.getElementById('recipeIngredients').value.split('\n').filter(l => l.trim());
  const steps = document.getElementById('recipeSteps').value.split('\n').filter(l => l.trim());
  if (!title || !time || ingredients.length === 0 || steps.length === 0) {
    toast('Preencha todos os campos!'); return;
  }
  const tagMap = { economica: '💰 Econômica', rapida: '⚡ Rápida', sobremesa: '🍰 Sobremesa' };
  const newRecipe = {
    id: Date.now(), title, author: state.user.name, avatar: state.user.avatar,
    time, difficulty, rating: 0, reviews: 0, category,
    tags: [tagMap[category], '🆕 Nova'],
    image: '🍽️', ingredients, steps
  };
  state.myRecipes.unshift(newRecipe);
  saveState();
  closeCreateModal();
  toast('Receita publicada! 🍽️');
  if (state.currentView === 'recipes') renderRecipes();
  if (state.currentView === 'profile') renderProfile();
}

function submitReview() {
  const place = document.getElementById('reviewPlace').value.trim();
  const rating = parseInt(document.getElementById('reviewRating').value);
  const text = document.getElementById('reviewText').value.trim();
  if (!place || !text) { toast('Preencha todos os campos!'); return; }
  const newReview = {
    id: Date.now(), place, author: state.user.name, avatar: state.user.avatar,
    rating, text, date: 'Agora', likes: 0
  };
  state.myReviews.unshift(newReview);
  saveState();
  closeCreateModal();
  toast('Avaliação publicada! ⭐');
  if (state.currentView === 'explore') renderExplore();
  if (state.currentView === 'profile') renderProfile();
}

function openReviewModal(placeName) {
  closeDetailModal();
  state.createType = 'review';
  openCreateModal();
  setTimeout(() => {
    const input = document.getElementById('reviewPlace');
    if (input) input.value = placeName;
  }, 100);
}

function emptyState(text, icon) {
  return `<div class="empty-state"><div class="empty-icon">${icon}</div><h3>${text}</h3><p style="font-size:0.85rem">Nada por aqui ainda. Seja o primeiro!</p></div>`;
}

// ----- Event Listeners -----
document.addEventListener('DOMContentLoaded', () => {
  loadState();

  // Bottom nav
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => showView(btn.dataset.view));
  });

  // FAB
  document.getElementById('fabBtn').addEventListener('click', () => {
    if (state.currentView === 'explore') {
      state.createType = 'review';
    } else if (state.currentView === 'recipes') {
      state.createType = 'recipe';
    } else {
      state.createType = 'post';
    }
    openCreateModal();
  });

  // Close modals
  document.getElementById('closeCreateModal').addEventListener('click', closeCreateModal);
  document.getElementById('closeDetailModal').addEventListener('click', closeDetailModal);
  document.getElementById('createModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('createModal')) closeCreateModal();
  });
  document.getElementById('detailModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('detailModal')) closeDetailModal();
  });

  // Create tabs
  document.querySelectorAll('#createTabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#createTabs .tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.createType = tab.dataset.create;
      renderCreateForm();
    });
  });

  // Explore tabs
  document.querySelectorAll('#exploreTabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#exploreTabs .tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.exploreTab = tab.dataset.tab;
      renderExplore();
    });
  });

  // Consume tabs
  document.querySelectorAll('#consumeTabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#consumeTabs .tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.consumeTab = tab.dataset.tab;
      renderConsume();
    });
  });

  // Connect tabs
  document.querySelectorAll('#connectTabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#connectTabs .tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.connectTab = tab.dataset.tab;
      renderConnect();
    });
  });

  // Feed tags
  document.querySelectorAll('#feedTags .tag').forEach(tag => {
    tag.addEventListener('click', () => {
      document.querySelectorAll('#feedTags .tag').forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
      renderFeed(tag.dataset.tag);
    });
  });

  // Recipe tabs
  document.querySelectorAll('#recipeTabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#recipeTabs .tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderRecipes();
    });
  });

  // Search inputs
  document.getElementById('feedSearch')?.addEventListener('input', () => renderFeed());
  document.getElementById('recipeSearch')?.addEventListener('input', () => renderRecipes());

  // Theme toggle
  document.getElementById('themeToggle').addEventListener('click', () => {
    state.darkMode = !state.darkMode;
    if (state.darkMode) document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
    document.getElementById('themeToggle').textContent = state.darkMode ? '☀️' : '🌙';
    saveState();
  });
  document.getElementById('themeToggle').textContent = state.darkMode ? '☀️' : '🌙';

  // Notifications
  document.getElementById('notifBtn').addEventListener('click', () => {
    toast('🔔 Você tem 3 notificações novas!');
  });

  // Register SW
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }

  // Initial render
  renderCurrentView();
});
