// Fallback: se as animações não carregarem, o app continua funcionando (coração/estrela simples)
if (typeof Elo === 'undefined') { window.Elo = { heartHTML: function(id, l) { return '<span class="heart-wrap">' + (l ? '❤️' : '🤍') + '</span>'; }, setHeart: function(b, l) { b.querySelector('.heart-wrap').textContent = l ? '❤️' : '🤍'; }, mountRating: function(box) { if (box) box.innerHTML = '<p style="color:var(--text-light);font-size:.85rem">Avaliação indisponível no momento.</p>'; } }; }
// ============================================
// ELOGRAIN v3 - Swipe to Delete + Lixeira + OpenStreetMap
// ============================================

const GOOGLE_API_KEY = localStorage.getItem('elograin_google_api_key') || '';

const MOCK_POSTS = [
  { id: 1, author: "Ana Verde", avatar: "🌱", time: "2h", content: "Finalmente encontrei um queijo vegano que derrete igual o original! Testei na lasanha e ficou perfeito. Alguem mais ja experimentou a marca Natureza?", tag: "dica", likes: 24, comments: 8, liked: false, image: null },
  { id: 2, author: "Carlos Lima", avatar: "🦁", time: "4h", content: "Hoje visitei o restaurante Raizes em SP e simplesmente incrivel! O strogonoff de palmito e de outro mundo. Super recomendo para quem esta levando amigos nao-veganos!", tag: "experiencia", likes: 45, comments: 12, liked: true, image: null },
  { id: 3, author: "Mariana Souza", avatar: "🦋", time: "6h", content: "Gente, preciso de ajuda! Estou tentando fazer um pao de queijo vegano mas fica borrachudo. Alguem tem uma receita infalivel?", tag: "duvida", likes: 8, comments: 15, liked: false, image: null },
  { id: 4, author: "Pedro Alves", avatar: "🐻", time: "8h", content: "Dica de supermercado: o Extra da Paulista tem uma secao enorme de produtos veganos agora! Ate nuggets de grao-de-bico encontrei.", tag: "dica", likes: 32, comments: 5, liked: false, image: null },
  { id: 5, author: "Julia Costa", avatar: "🌸", time: "12h", content: "Fui no Festival Vegano de Curitiba no fim de semana e foi magico! Tantas opcoes, musica boa e energia incrivel. Quem vai no proximo?", tag: "experiencia", likes: 67, comments: 20, liked: false, image: null },
  { id: 6, author: "Rafael Mendes", avatar: "🌵", time: "1d", content: "Acabei de fazer um bolo de chocolate vegano para o aniversario da minha mae e ela nem percebeu! A receita e daqui do app, da @AnaVerde. Obrigado pela dica!", tag: "experiencia", likes: 56, comments: 9, liked: true, image: null }
];

const MOCK_RECIPES = [
  { id: 1, title: "Strogonoff de Grao-de-Bico", author: "Ana Verde", avatar: "🌱", time: "45 min", difficulty: "Facil", rating: 4.8, reviews: 34, category: "economica", tags: ["💰 Economica", "🥘 Principal"], image: "🍛", ingredients: ["2 xicaras grao-de-bico cozido", "1 cebola picada", "2 dentes alho", "200ml creme de castanha", "1 colher ketchup", "1 colher mostarda", "Sal e pimenta"], steps: ["Refogue cebola e alho ate dourar.", "Adicione o grao-de-bico e tempere.", "Misture ketchup, mostarda e creme de castanha.", "Cozinhe por 10 min e sirva com arroz."] },
  { id: 2, title: "Bolo de Chocolate Vegano", author: "Julia Costa", avatar: "🌸", time: "50 min", difficulty: "Medio", rating: 4.9, reviews: 52, category: "sobremesa", tags: ["🍰 Sobremesa", "🎉 Festa"], image: "🍫", ingredients: ["2 xicaras farinha", "1 xicara cacau", "1 xicara acucar", "1 xicara leite vegetal", "1/2 xicara oleo", "1 colher fermento", "1 colher vinagre"], steps: ["Misture secos em uma tigela.", "Adicione umidos e mexa ate homogeneizar.", "Leve ao forno a 180C por 35 min.", "Decore com ganache de chocolate vegano."] },
  { id: 3, title: "Tofu Mexido de Cafe da Manha", author: "Carlos Lima", avatar: "🦁", time: "15 min", difficulty: "Facil", rating: 4.5, reviews: 18, category: "rapida", tags: ["⚡ Rapida", "🌅 Cafe"], image: "🍳", ingredients: ["200g tofu firme", "1/2 colher curcuma", "2 colheres levedura nutricional", "Sal, pimenta e azeite", "Vegetais a gosto"], steps: ["Escorra e esfarele o tofu.", "Refogue com azeite e vegetais.", "Adicione curcuma e levedura.", "Cozinhe por 5 min e sirva quente."] },
  { id: 4, title: "Lasanha de Berinjela", author: "Mariana Souza", avatar: "🦋", time: "60 min", difficulty: "Medio", rating: 4.7, reviews: 28, category: "economica", tags: ["💰 Economica", "🥘 Principal"], image: "🍲", ingredients: ["2 berinjelas em rodelas", "Molho de tomate caseiro", "Creme de castanha", "Queijo vegano ralado", "Manjericao fresco"], steps: ["Grelhe as rodelas de berinjela.", "Monte camadas: molho, berinjela, creme.", "Finalize com queijo vegano.", "Asse a 200C por 25 min."] },
  { id: 5, title: "Sorvete de Banana e Peanut", author: "Pedro Alves", avatar: "🐻", time: "5 min", difficulty: "Facil", rating: 4.6, reviews: 41, category: "sobremesa", tags: ["🍰 Sobremesa", "❄️ Gelado"], image: "🍦", ingredients: ["3 bananas congeladas", "2 colheres pasta de amendoim", "1 colher cacau (opcional)", "Granola para decorar"], steps: ["Bata as bananas congeladas no processador.", "Adicione pasta de amendoim e bata mais.", "Sirva imediatamente com granola."] },
  { id: 6, title: "Hamburguer de Lentilha", author: "Rafael Mendes", avatar: "🌵", time: "30 min", difficulty: "Facil", rating: 4.4, reviews: 22, category: "economica", tags: ["💰 Economica", "🍔 Lanche"], image: "🍔", ingredients: ["1 xicara lentilha cozida", "1/2 xicara aveia em flocos", "1 cebola caramelizada", "Alho e cominho", "Sal e pimenta"], steps: ["Processe lentilha e aveia.", "Misture temperos e cebola.", "Modele hamburgueres.", "Grelhe 4 min de cada lado."] },
  { id: 7, title: "Smoothie Bowl Verde", author: "Ana Verde", avatar: "🌱", time: "10 min", difficulty: "Facil", rating: 4.3, reviews: 15, category: "rapida", tags: ["⚡ Rapida", "💚 Saudavel"], image: "🥣", ingredients: ["1 banana congelada", "1 xicara espinafre", "1/2 xicara leite de coco", "1/2 abacate", "Toppings: semente, frutas"], steps: ["Bata banana, espinafre, leite e abacate.", "Coloque em uma tigela.", "Decore com sementes e frutas.", "Aproveite imediatamente!"] },
  { id: 8, title: "Brigadeiro Vegano", author: "Julia Costa", avatar: "🌸", time: "20 min", difficulty: "Facil", rating: 4.9, reviews: 63, category: "sobremesa", tags: ["🍰 Sobremesa", "🎉 Festa"], image: "🍬", ingredients: ["1 xicara leite condensado de aveia", "1/2 xicara cacau em po", "1 colher manteiga vegetal", "Granulado vegano"], steps: ["Misture leite condensado e cacau.", "Cozinhe em fogo baixo ate desgrudar.", "Adicione manteiga e misture.", "Enrole e passe no granulado."] }
];

const MOCK_PLACES = [
  { id: 9, name: "Mont Zion Vegan", type: "100% Vegano", category: "restaurante", rating: 0, reviews: 0, address: "Rua Caio Graco, 393 - Vila Romana, São Paulo - SP", query: ["Rua Caio Graco, 393, Vila Romana, São Paulo, SP, Brasil", "Rua Caio Graco, Vila Romana, São Paulo, SP, Brasil"], hours: "Terça a sábado, das 10h às 17h", lat: null, lng: null, icon: "🍽️", badge: "vegan", real: true },
  { id: 10, name: "Amarama Vegan", type: "100% Vegano", category: "confeitaria", rating: 0, reviews: 0, address: "Rua Caio Graco, 745 - Vila Romana, São Paulo - SP", query: ["Rua Caio Graco, 745, Vila Romana, São Paulo, SP, Brasil", "Rua Caio Graco, Vila Romana, São Paulo, SP, Brasil"], hours: "", lat: null, lng: null, icon: "🥐", badge: "vegan", real: true, description: "Confeitaria vegana: refeições, pizzas, pães, doces e tortas." },
  { id: 1, name: "Raizes Restaurante", type: "100% Vegano", category: "restaurante", rating: 4.9, reviews: 120, address: "R. Augusta, 500 - SP", lat: -23.5505, lng: -46.6512, icon: "🍽️", badge: "vegan" },
  { id: 2, name: "Sorveteria Verde", type: "100% Vegano", category: "sorveteria", rating: 4.7, reviews: 85, address: "Av. Paulista, 1000 - SP", lat: -23.5629, lng: -46.6544, icon: "🍦", badge: "vegan" },
  { id: 3, name: "Padaria Flor", type: "Vegan Friendly", category: "padaria", rating: 4.3, reviews: 45, address: "R. Oscar Freire, 200 - SP", lat: -23.5615, lng: -46.6723, icon: "🥐", badge: "friendly" },
  { id: 4, name: "Burger Plant", type: "100% Vegano", category: "lanchonete", rating: 4.6, reviews: 92, address: "R. Fidalga, 80 - SP", lat: -23.5558, lng: -46.6878, icon: "🍔", badge: "vegan" },
  { id: 5, name: "Cafe Moka", type: "Vegan Friendly", category: "cafe", rating: 4.2, reviews: 38, address: "R. Harmonia, 150 - SP", lat: -23.5389, lng: -46.6890, icon: "☕", badge: "friendly" },
  { id: 6, name: "Emporio Natural", type: "100% Vegano", category: "restaurante", rating: 4.8, reviews: 67, address: "Av. Brasil, 300 - SP", lat: -23.5445, lng: -46.6361, icon: "🥗", badge: "vegan" },
  { id: 7, name: "Gelato Amor", type: "Vegan Friendly", category: "sorveteria", rating: 4.4, reviews: 52, address: "R. dos Pinheiros, 90 - SP", lat: -23.5650, lng: -46.6820, icon: "🍨", badge: "friendly" },
  { id: 8, name: "Lanchonete Sol", type: "Vegan Friendly", category: "lanchonete", rating: 4.1, reviews: 29, address: "Av. Reboucas, 400 - SP", lat: -23.5570, lng: -46.6600, icon: "🥪", badge: "friendly" }
];

const MOCK_EVENTS = [
  { id: 1, title: "Festival Vegano de SP", date: "25 Ago 2026", location: "Parque Ibirapuera", type: "Festival", icon: "🎪", attendees: 340 },
  { id: 2, title: "Feira de Produtos Naturais", date: "30 Ago 2026", location: "Expo Center Norte", type: "Feira", icon: "🛍️", attendees: 120 },
  { id: 3, title: "Encontro Vegano de Curitiba", date: "05 Set 2026", location: "Praca Osorio", type: "Encontro", icon: "🤝", attendees: 85 },
  { id: 4, title: "Workshop de Culinaria Vegana", date: "10 Set 2026", location: "Casa Natural - SP", type: "Workshop", icon: "👨‍🍳", attendees: 25 },
  { id: 5, title: "Marcha Animal Rights", date: "15 Set 2026", location: "Av. Paulista", type: "Marcha", icon: "🐾", attendees: 500 }
];

const MOCK_REVIEWS = [
  { id: 1, place: "Raizes Restaurante", author: "Carlos Lima", avatar: "🦁", rating: 5, text: "Simplesmente o melhor strogonoff que ja comi! O atendimento e impecavel e o ambiente e super aconchegante. Levei meus pais nao-veganos e eles amaram!", date: "2 dias atras", likes: 18 },
  { id: 2, place: "Sorveteria Verde", author: "Ana Verde", avatar: "🌱", rating: 5, text: "O sabor de pistache e surreal! Textura cremosa e nenhum gosto artificial. Preco justo para a qualidade.", date: "1 semana atras", likes: 12 },
  { id: 3, place: "Burger Plant", author: "Pedro Alves", avatar: "🐻", rating: 4, text: "Hamburguer muito bom, mas o tempo de espera foi longo. Recomendo ir em dia de semana. O milkshake de ovomaltine e must-try!", date: "3 dias atras", likes: 8 },
  { id: 4, place: "Padaria Flor", author: "Mariana Souza", avatar: "🦋", rating: 4, text: "Bom para encontrar opcoes, mas ainda tem poucas variedades doces. O pao de fermentacao natural e excelente!", date: "5 dias atras", likes: 5 },
  { id: 5, place: "Emporio Natural", author: "Julia Costa", avatar: "🌸", rating: 5, text: "Buffet por quilo com dezenas de opcoes! Tudo muito fresco e saboroso. O suco detox e maravilhoso.", date: "1 dia atras", likes: 22 }
];

const MOCK_PRODUCTS_MARKET = [
  { id: 1, name: "Leite de Aveita Organico", brand: "Aveita", category: "Bebidas", price: "R$ 12,90", icon: "🥛", vegan: true, stores: ["Carrefour", "Extra", "Mundo Verde"] },
  { id: 2, name: "Nuggets de Grao-de-Bico", brand: "Fazenda Futuro", category: "Congelados", price: "R$ 24,50", icon: "🍗", vegan: true, stores: ["Carrefour", "Pao de Acucar"] },
  { id: 3, name: "Queijo Cheddar Vegano", brand: "New Roots", category: "Frios", price: "R$ 32,00", icon: "🧀", vegan: true, stores: ["Mundo Verde", "Emporio Alto dos Pinheiros"] },
  { id: 4, name: "Iogurte de Coco Natural", brand: "CocoVeg", category: "Laticinios", price: "R$ 8,90", icon: "🥣", vegan: true, stores: ["Extra", "Carrefour"] },
  { id: 5, name: "Hamburguer de Soja", brand: "Seara Veg", category: "Congelados", price: "R$ 19,90", icon: "🍔", vegan: true, stores: ["Carrefour", "Extra", "Pao de Acucar"] },
  { id: 6, name: "Barra de Chocolate 70%", brand: "Mendoa", category: "Doces", price: "R$ 14,50", icon: "🍫", vegan: true, stores: ["Mundo Verde", "Carrefour"] },
  { id: 7, name: "Requeijao de Castanha", brand: "Veggs", category: "Frios", price: "R$ 18,90", icon: "🧈", vegan: true, stores: ["Emporio Natural", "Mundo Verde"] },
  { id: 8, name: "Granola Sem Mel", brand: "Kolln", category: "Cereais", price: "R$ 16,90", icon: "🥣", vegan: true, stores: ["Carrefour", "Extra"] }
];

const MOCK_PRODUCTS_BEAUTY = [
  { id: 1, name: "Shampoo Solido Lavanda", brand: "Lush", category: "Cabelo", price: "R$ 45,00", icon: "🧴", vegan: true, crueltyFree: true, stores: ["Lush Online", "Sephora"] },
  { id: 2, name: "Hidratante Facial Chia", brand: "B.A.E.", category: "Skincare", price: "R$ 29,90", icon: "🧴", vegan: true, crueltyFree: true, stores: ["O Boticario"] },
  { id: 3, name: "Batom Liquido Matte", brand: "Vizzela", category: "Maquiagem", price: "R$ 19,90", icon: "💄", vegan: true, crueltyFree: true, stores: ["Beleza Na Web", "Magalu"] },
  { id: 4, name: "Sabonete Artesanal Argila", brand: "Terra Brasil", category: "Corpo", price: "R$ 12,00", icon: "🧼", vegan: true, crueltyFree: true, stores: ["Mundo Verde", "Loja Natural"] },
  { id: 5, name: "Protetor Solar Mineral", brand: "Simple Organic", category: "Skincare", price: "R$ 68,00", icon: "☀️", vegan: true, crueltyFree: true, stores: ["Simple Organic Online"] },
  { id: 6, name: "Desodorante Natural", brand: "Biossance", category: "Corpo", price: "R$ 35,00", icon: "🌸", vegan: true, crueltyFree: true, stores: ["Sephora Online"] }
];

const MOCK_PROFILES = [
  { id: 1, name: "Luna Silva", age: 26, avatar: "🌙", bio: "Chef vegana em transicao. Amo trilhas e cafe da manha!", interests: ["Culinaria", "Natureza", "Yoga"], type: "encontros" },
  { id: 2, name: "Gabriel Costa", age: 29, avatar: "🎸", bio: "Musico e ativista. Procurando alguem para ir a festivais veganos!", interests: ["Musica", "Ativismo", "Cinema"], type: "encontros" },
  { id: 3, name: "Isabela Ferreira", age: 24, avatar: "🎨", bio: "Ilustradora e amante de animais. Adoro experimentar receitas novas!", interests: ["Arte", "Animais", "Receitas"], type: "encontros" },
  { id: 4, name: "Thiago Mendes", age: 31, avatar: "🏃", bio: "Corredor e nutricionista esportivo vegano. Vamos correr no parque?", interests: ["Esportes", "Nutricao", "Viagens"], type: "amizades" },
  { id: 5, name: "Camila Rocha", age: 27, avatar: "📚", bio: "Escritora e bookaholic. Procurando amigos para clubes do livro vegano!", interests: ["Leitura", "Escrita", "Cafes"], type: "amizades" },
  { id: 6, name: "Bruno Alves", age: 33, avatar: "🌵", bio: "Engenheiro e pai de plantas. Adoro compartilhar dicas de jardinagem!", interests: ["Plantas", "Tecnologia", "Board Games"], type: "amizades" }
];

let state = {
  currentView: 'home',
  darkMode: true,
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
  user: { name: "Voce", avatar: "🦁", bio: "Membro da comunidade Elograin" },
  exploreTab: 'mapa',
  consumeTab: 'mercado',
  connectTab: 'encontros',
  createType: 'post',
  osmMap: null,
  osmMarkers: [],
  googlePlacesLoaded: false,
  isLoading: { feed: false, recipes: false, explore: false },
  deleteTargetId: null
};

function loadState() {
  try {
    const saved = localStorage.getItem('elograin_state_v3');
    if (saved) {
      const parsed = JSON.parse(saved);
      state = Object.assign({}, state, parsed);
    }
  } catch (e) {}
  if (!localStorage.getItem('elograin_identity_v66')) { state.darkMode = true; localStorage.setItem('elograin_identity_v66', '1'); }   // nova identidade: abre no escuro uma vez
  if (state.darkMode) document.documentElement.setAttribute('data-theme', 'dark');
  else document.documentElement.removeAttribute('data-theme');
}

function saveState() {
  try {
    localStorage.setItem('elograin_state_v3', JSON.stringify({
      darkMode: state.darkMode,
      myRecipes: state.myRecipes,
      myReviews: state.myReviews,
      posts: state.posts,
      recipes: state.recipes,
      user: state.user
    }));
  } catch (e) {}
}

function toast(msg, actionLabel, action) {
  const container = document.getElementById('toastContainer');
  const el = document.createElement('div');
  el.className = 'toast';
  el.setAttribute('role', 'status');
  el.textContent = msg;
  if (actionLabel) {
    const b = document.createElement('button');
    b.className = 'toast-action';
    b.textContent = actionLabel;
    b.onclick = function() { action(); el.remove(); };
    el.appendChild(b);
  }
  container.appendChild(el);
  setTimeout(function() { el.remove(); }, actionLabel ? 5000 : 3000);
}

// Escapa HTML: texto digitado pelo usuário nunca pode virar código (evita XSS)
function esc(s) { return String(s).replace(/[&<>"']/g, function(c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
var TAG_LABEL = { dica: 'Dica', experiencia: 'Experiência', duvida: 'Dúvida' };
function activeFeedTag() { var t = document.querySelector('#feedTags .tag.active'); return t ? t.dataset.tag : 'todos'; }

// ===== SKELETON HELPERS =====
function showSkeleton(view) {
  if (view === 'recipes') {
    var sk = document.getElementById('recipesSkeleton');
    var list = document.getElementById('recipesList');
    if (sk) sk.classList.remove('hidden');
    if (list) list.classList.add('hidden');
    return;
  }
  if (view === 'explore') {
    var sk = document.getElementById('exploreSkeleton');
    var real = document.getElementById('exploreRealContent');
    if (sk) sk.classList.remove('hidden');
    if (real) real.classList.add('hidden');
    return;
  }
  var sk = document.getElementById(view + 'Skeleton');
  var content = document.getElementById(view + 'Posts');
  if (sk) sk.classList.remove('hidden');
  if (content) content.classList.add('hidden');
}

function hideSkeleton(view) {
  if (view === 'recipes') {
    var sk = document.getElementById('recipesSkeleton');
    var list = document.getElementById('recipesList');
    if (sk) sk.classList.add('hidden');
    if (list) list.classList.remove('hidden');
    return;
  }
  if (view === 'explore') {
    var sk = document.getElementById('exploreSkeleton');
    var real = document.getElementById('exploreRealContent');
    if (sk) sk.classList.add('hidden');
    if (real) real.classList.remove('hidden');
    return;
  }
  var sk = document.getElementById(view + 'Skeleton');
  var content = document.getElementById(view + 'Posts');
  if (sk) sk.classList.add('hidden');
  if (content) content.classList.remove('hidden');
}

var loadedViews = {};
function simulateLoading(view, callback, delay) {
  if (loadedViews[view]) { callback(); return; }   // já carregou antes: mostra na hora, sem skeleton
  loadedViews[view] = true;
  delay = delay || 450;
  showSkeleton(view);
  state.isLoading[view] = true;
  setTimeout(function() {
    callback();
    hideSkeleton(view);
    state.isLoading[view] = false;
  }, delay);
}

// ===== SWIPE TO DELETE LOGIC =====
var swipeState = {
  isDragging: false,
  startX: 0,
  currentX: 0,
  trackWidth: 0,
  handleWidth: 48,
  maxDrag: 0,
  threshold: 0.85
};

function openSwipeModal(postId) {
  state.deleteTargetId = postId;
  var post = state.posts.find(function(p) { return p.id === postId; });
  var title = post ? (post.content.substring(0, 50) + '...') : 'este post';
  document.getElementById('swipePostTitle').textContent = 'Voce esta excluindo: "' + title + '". Esta acao nao pode ser desfeita.';
  document.getElementById('swipeOverlay').classList.add('active');
  resetSwipe();
}

function closeSwipeModal() {
  document.getElementById('swipeOverlay').classList.remove('active');
  state.deleteTargetId = null;
  resetSwipe();
}

function resetSwipe() {
  swipeState.isDragging = false;
  var handle = document.getElementById('swipeHandle');
  var progress = document.getElementById('swipeProgress');
  var label = document.getElementById('swipeLabel');
  var success = document.getElementById('swipeSuccess');
  handle.style.left = '4px';
  handle.style.transform = 'translateY(-50%)';
  handle.classList.remove('completed');
  progress.style.width = '0%';
  progress.classList.remove('complete');
  label.classList.remove('hidden');
  success.classList.remove('active
