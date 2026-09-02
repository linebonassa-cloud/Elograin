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
  if (state.darkMode) document.documentElement.setAttribute('data-theme', 'dark');
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

function toast(msg) {
  const container = document.getElementById('toastContainer');
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(function() { el.remove(); }, 3000);
}

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

function simulateLoading(view, callback, delay) {
  delay = delay || 1400;
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
  success.classList.remove('active');
}

function initSwipeEvents() {
  var track = document.getElementById('swipeTrack');
  var handle = document.getElementById('swipeHandle');

  function onStart(e) {
    swipeState.isDragging = true;
    swipeState.trackWidth = track.offsetWidth;
    swipeState.maxDrag = swipeState.trackWidth - swipeState.handleWidth - 8;
    var clientX = e.touches ? e.touches[0].clientX : e.clientX;
    swipeState.startX = clientX;
    handle.style.transition = 'none';
    document.getElementById('swipeProgress').style.transition = 'none';
  }

  function onMove(e) {
    if (!swipeState.isDragging) return;
    e.preventDefault();
    var clientX = e.touches ? e.touches[0].clientX : e.clientX;
    var delta = clientX - swipeState.startX;
    if (delta < 0) delta = 0;
    if (delta > swipeState.maxDrag) delta = swipeState.maxDrag;
    swipeState.currentX = delta;
    var pct = (delta / swipeState.maxDrag) * 100;
    handle.style.left = (4 + delta) + 'px';
    document.getElementById('swipeProgress').style.width = pct + '%';

    if (pct > 50) {
      document.getElementById('swipeLabel').classList.add('hidden');
    } else {
      document.getElementById('swipeLabel').classList.remove('hidden');
    }

    if (pct >= swipeState.threshold * 100) {
      handle.classList.add('completed');
    } else {
      handle.classList.remove('completed');
    }
  }

  function onEnd(e) {
    if (!swipeState.isDragging) return;
    swipeState.isDragging = false;
    var pct = (swipeState.currentX / swipeState.maxDrag) * 100;

    if (pct >= swipeState.threshold * 100) {
      // Confirmed!
      handle.style.transition = 'left 0.2s ease';
      document.getElementById('swipeProgress').style.transition = 'width 0.2s ease';
      handle.style.left = (swipeState.maxDrag + 4) + 'px';
      document.getElementById('swipeProgress').style.width = '100%';
      document.getElementById('swipeProgress').classList.add('complete');
      document.getElementById('swipeSuccess').classList.add('active');

      setTimeout(function() {
        confirmDelete();
      }, 400);
    } else {
      // Reset
      handle.style.transition = 'left 0.3s ease';
      document.getElementById('swipeProgress').style.transition = 'width 0.3s ease';
      resetSwipe();
    }
  }

  handle.addEventListener('touchstart', onStart, { passive: false });
  handle.addEventListener('mousedown', onStart);
  document.addEventListener('touchmove', onMove, { passive: false });
  document.addEventListener('mousemove', onMove);
  document.addEventListener('touchend', onEnd);
  document.addEventListener('mouseup', onEnd);
}

function confirmDelete() {
  if (state.deleteTargetId !== null) {
    var idx = state.posts.findIndex(function(p) { return p.id === state.deleteTargetId; });
    if (idx > -1) {
      state.posts.splice(idx, 1);
      saveState();
      toast('Post excluido! 🗑️');
      renderFeed();
      renderProfile();
    }
    state.deleteTargetId = null;
  }
  closeSwipeModal();
}

// ===== GOOGLE MAPS + OSM =====
async function fetchGooglePlacesVegan() {
  if (!GOOGLE_API_KEY) return null;
  try {
    const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_API_KEY,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.types,places.editorialSummary'
      },
      body: JSON.stringify({ textQuery: "restaurante vegano Sao Paulo", languageCode: "pt-BR", maxResultCount: 10 })
    });
    if (!response.ok) throw new Error('API Error');
    const data = await response.json();
    if (data.places && data.places.length > 0) {
      return data.places.map(function(p, idx) {
        return {
          id: 100 + idx,
          name: (p.displayName && p.displayName.text) ? p.displayName.text : (p.displayName || 'Restaurante Vegano'),
          type: (p.types && p.types.includes('vegan_restaurant')) ? "100% Vegano" : "Vegan Friendly",
          category: "restaurante", rating: p.rating || 4.5, reviews: p.userRatingCount || 10,
          address: p.formattedAddress || 'Sao Paulo, SP',
          lat: (p.location && p.location.latitude) ? p.location.latitude : -23.5505,
          lng: (p.location && p.location.longitude) ? p.location.longitude : -46.6512,
          icon: "🍽️", badge: (p.types && p.types.includes('vegan_restaurant')) ? "vegan" : "friendly",
          description: (p.editorialSummary && p.editorialSummary.text) ? p.editorialSummary.text : ''
        };
      });
    }
    return null;
  } catch (err) { return null; }
}

async function loadPlacesWithGoogle() {
  if (state.googlePlacesLoaded) return;
  const googlePlaces = await fetchGooglePlacesVegan();
  if (googlePlaces && googlePlaces.length > 0) {
    state.places = googlePlaces.concat(MOCK_PLACES);
    state.googlePlacesLoaded = true;
    toast('Dados reais do Google Maps carregados!');
  } else {
    state.places = [...MOCK_PLACES];
  }
}

function initOSMMap() {
  if (state.osmMap) { state.osmMap.invalidateSize(); return; }
  var mapContainer = document.createElement('div');
  mapContainer.id = 'osmMap';
  mapContainer.style.cssText = 'width:100%;height:100%;border-radius:16px;';
  var wrapper = document.createElement('div');
  wrapper.className = 'map-container-osm';
  wrapper.appendChild(mapContainer);
  var realContent = document.getElementById('exploreRealContent');
  if (!realContent) return;
  realContent.insertBefore(wrapper, realContent.firstChild);
  state.osmMap = L.map('osmMap', { zoomControl: false, attributionControl: false }).setView([-23.5505, -46.6512], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: 'OpenStreetMap' }).addTo(state.osmMap);
  addMarkersToMap();
}

function addMarkersToMap() {
  if (!state.osmMap) return;
  state.osmMarkers.forEach(function(m) { state.osmMap.removeLayer(m); });
  state.osmMarkers = [];
  state.places.forEach(function(place) {
    var color = place.badge === 'vegan' ? '#81B29A' : '#E07A5F';
    var marker = L.circleMarker([place.lat, place.lng], {
      radius: 10, fillColor: color, color: '#fff', weight: 2, opacity: 1, fillOpacity: 0.9
    }).addTo(state.osmMap);
    var popupContent = '<div style="font-family:Inter,sans-serif;min-width:180px">' +
      '<div style="font-weight:800;font-size:1rem;margin-bottom:4px">' + place.icon + ' ' + place.name + '</div>' +
      '<div style="font-size:0.8rem;color:#666;margin-bottom:4px">' + place.type + '</div>' +
      '<div style="font-size:0.8rem;margin-bottom:4px">⭐ ' + place.rating + ' (' + place.reviews + ' avaliacoes)</div>' +
      '<div style="font-size:0.75rem;color:#888">📍 ' + place.address + '</div>' +
      (place.description ? '<div style="font-size:0.75rem;color:#666;margin-top:6px;font-style:italic">' + place.description + '</div>' : '') +
      '</div>';
    marker.bindPopup(popupContent);
    marker.on('click', function() { showPlaceDetail(place.id); });
    state.osmMarkers.push(marker);
  });
  if (state.osmMarkers.length > 0) {
    var group = new L.featureGroup(state.osmMarkers);
    state.osmMap.fitBounds(group.getBounds().pad(0.1));
  }
}

// ===== NAVIGATION =====
function showView(viewName) {
  state.currentView = viewName;
  document.querySelectorAll('.view').forEach(function(v) { v.classList.remove('active'); });
  document.getElementById(viewName + 'View').classList.add('active');
  document.querySelectorAll('.nav-item').forEach(function(n) { n.classList.remove('active'); });
  document.querySelector('.nav-item[data-view="' + viewName + '"]').classList.add('active');
  window.scrollTo(0, 0);
  renderCurrentView();
}

function renderCurrentView() {
  if (state.currentView === 'feed') simulateLoading('feed', function() { renderFeed(); });
  if (state.currentView === 'recipes') simulateLoading('recipes', function() { renderRecipes(); });
  if (state.currentView === 'explore') simulateLoading('explore', function() { renderExplore(); });
  if (state.currentView === 'consume') renderConsume();
  if (state.currentView === 'connect') renderConnect();
  if (state.currentView === 'profile') renderProfile();
}

// ===== FEED (with delete button) =====
function renderFeed(filterTag) {
  filterTag = filterTag || 'todos';
  var container = document.getElementById('feedPosts');
  var searchEl = document.getElementById('feedSearch');
  var search = searchEl ? searchEl.value.toLowerCase() : '';
  var posts = state.posts;
  if (filterTag !== 'todos') posts = posts.filter(function(p) { return p.tag === filterTag; });
  if (search) posts = posts.filter(function(p) { return p.content.toLowerCase().includes(search) || p.author.toLowerCase().includes(search); });

  container.innerHTML = posts.map(function(post) {
    var badgeClass = post.tag === 'dica' ? 'vegan' : (post.tag === 'experiencia' ? 'friendly' : 'econ');
    return '<article class="card" data-id="' + post.id + '">' +
      '<button class="delete-btn" onclick="openSwipeModal(' + post.id + ')" aria-label="Excluir post">🗑️</button>' +
      '<div class="card-header"><div class="avatar">' + post.avatar + '</div>' +
      '<div class="card-meta"><div class="name">' + post.author + '</div>' +
      '<div class="time">' + post.time + ' • <span class="badge badge-' + badgeClass + '">' + post.tag + '</span></div></div></div>' +
      '<p class="card-text">' + post.content + '</p>' +
      '<div class="card-actions">' +
      '<button class="action-btn ' + (post.liked ? 'liked' : '') + '" onclick="toggleLike(' + post.id + ')">' +
      '<span>' + (post.liked ? '❤️' : '🤍') + '</span> ' + post.likes + '</button>' +
      '<button class="action-btn" onclick="showComments(' + post.id + ')"><span>💬</span> ' + post.comments + '</button>' +
      '<button class="action-btn" onclick="sharePost(' + post.id + ')"><span>🔗</span> Compartilhar</button>' +
      '</div></article>';
  }).join('');
  if (posts.length === 0) container.innerHTML = emptyState('Nenhum post encontrado', '🔍');
}

function toggleLike(postId) {
  var post = state.posts.find(function(p) { return p.id === postId; });
  if (post) {
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    saveState();
    renderFeed();
  }
}

function showComments(postId) {
  var post = state.posts.find(function(p) { return p.id === postId; });
  if (!post) return;
  openDetailModal('💬 Comentarios',
    '<div class="card" style="margin-bottom:16px"><div class="card-header"><div class="avatar">' + post.avatar + '</div>' +
    '<div class="card-meta"><div class="name">' + post.author + '</div><div class="time">' + post.time + '</div></div></div>' +
    '<p class="card-text">' + post.content + '</p></div>' +
    '<div style="display:flex;flex-direction:column;gap:12px">' +
    '<div class="card" style="padding:12px"><div style="font-weight:700;font-size:0.85rem;margin-bottom:4px">🌱 Ana Verde</div>' +
    '<div style="font-size:0.85rem;color:var(--text-light)">Amei essa dica! Vou testar hoje mesmo 😍</div></div>' +
    '<div class="card" style="padding:12px"><div style="font-weight:700;font-size:0.85rem;margin-bottom:4px">🦁 Carlos Lima</div>' +
    '<div style="font-size:0.85rem;color:var(--text-light)">Onde voce comprou? Nao acho em lugar nenhum!</div></div>' +
    '<div class="card" style="padding:12px"><div style="font-weight:700;font-size:0.85rem;margin-bottom:4px">🦋 Mariana Souza</div>' +
    '<div style="font-size:0.85rem;color:var(--text-light)">Salvando essa dica! Obrigada por compartilhar 🙏</div></div></div>',
    '<button class="btn btn-primary" onclick="toast(\'Comentario adicionado!\')">💬 Comentar</button>');
}

function sharePost(postId) {
  toast('Link copiado para a area de transferencia!');
}

// ===== RECIPES =====
function renderRecipes() {
  var container = document.getElementById('recipesList');
  var searchEl = document.getElementById('recipeSearch');
  var search = searchEl ? searchEl.value.toLowerCase() : '';
  var activeTabEl = document.querySelector('#recipeTabs .tab.active');
  var activeTab = activeTabEl ? activeTabEl.dataset.tab : 'todas';
  var recipes = state.recipes.concat(state.myRecipes);
  if (activeTab !== 'todas') recipes = recipes.filter(function(r) { return r.category === activeTab; });
  if (search) recipes = recipes.filter(function(r) { return r.title.toLowerCase().includes(search) || r.author.toLowerCase().includes(search); });

  container.innerHTML = recipes.map(function(r) {
    return '<article class="recipe-card" onclick="showRecipeDetail(' + r.id + ')">' +
      '<div class="recipe-thumb">' + (r.image || '🍽️') + '</div>' +
      '<div class="recipe-info"><h3>' + r.title + '</h3>' +
      '<div class="recipe-meta"><div class="rating"><span class="stars">⭐</span> ' + r.rating + ' (' + r.reviews + ')</div>' +
      '<div style="margin-top:4px">⏱️ ' + r.time + ' • 👤 ' + r.author + '</div>' +
      '<div class="tag-list" style="margin-top:6px">' + r.tags.map(function(t) { return '<span class="tag" style="padding:2px 8px;font-size:0.7rem">' + t + '</span>'; }).join('') + '</div></div></div></article>';
  }).join('');
  if (recipes.length === 0) container.innerHTML = emptyState('Nenhuma receita encontrada', '🍽️');
}

function showRecipeDetail(recipeId) {
  var all = state.recipes.concat(state.myRecipes);
  var r = all.find(function(x) { return x.id === recipeId; });
  if (!r) return;
  openDetailModal(r.title,
    '<div style="text-align:center;font-size:4rem;margin-bottom:12px">' + r.image + '</div>' +
    '<div style="display:flex;gap:12px;justify-content:center;margin-bottom:16px;flex-wrap:wrap">' +
    '<span class="badge badge-vegan">⭐ ' + r.rating + '</span>' +
    '<span class="badge badge-friendly">⏱️ ' + r.time + '</span>' +
    '<span class="badge badge-econ">📊 ' + r.difficulty + '</span></div>' +
    '<div style="margin-bottom:16px"><label>Ingredientes</label>' +
    '<ul style="padding-left:20px;color:var(--text-light);font-size:0.9rem;line-height:1.8">' + r.ingredients.map(function(i) { return '<li>' + i + '</li>'; }).join('') + '</ul></div>' +
    '<div><label>Modo de Preparo</label>' +
    '<ol style="padding-left:20px;color:var(--text-light);font-size:0.9rem;line-height:1.8">' + r.steps.map(function(s) { return '<li>' + s + '</li>'; }).join('') + '</ol></div>' +
    '<div style="margin-top:16px;padding-top:16px;border-top:1px solid var(--border)">' +
    '<div style="font-size:0.85rem;color:var(--text-light)">Por ' + r.author + '</div></div>',
    '<button class="btn btn-primary" onclick="rateRecipe(' + r.id + ')">⭐ Avaliar</button>' +
    '<button class="btn btn-secondary" onclick="toast(\'Salvo nos favoritos!\')">💾 Salvar</button>');
}

function rateRecipe(id) {
  toast('Obrigado pela avaliacao! ⭐');
  closeDetailModal();
}

// ===== EXPLORE =====
function renderExplore() {
  var content = document.getElementById('exploreRealContent');
  if (state.exploreTab === 'mapa') renderMap(content);
  else if (state.exploreTab === 'eventos') renderEvents(content);
  else if (state.exploreTab === 'avaliacoes') renderReviews(content);
}

function renderMap(container) {
  loadPlacesWithGoogle().then(function() {
    var apiBtn = !GOOGLE_API_KEY ? '<button class="section-link" onclick="promptApiKey()">🔑 Configurar API</button>' : '';
    container.innerHTML = '<div class="map-legend">' +
      '<div class="map-legend-item"><div class="legend-dot" style="background:var(--sprout)"></div> 100% Vegano</div>' +
      '<div class="map-legend-item"><div class="legend-dot" style="background:var(--secondary)"></div> Vegan Friendly</div></div>' +
      '<div class="section-header"><h3 class="section-title">Proximos a Voce</h3>' + apiBtn + '</div>' +
      '<div>' + state.places.map(function(p) {
        return '<div class="place-card" onclick="showPlaceDetail(' + p.id + ')">' +
          '<div class="place-img">' + p.icon + '</div>' +
          '<div class="place-info"><h4>' + p.name + '</h4>' +
          '<div class="place-type"><span class="badge badge-' + (p.badge === 'vegan' ? 'vegan' : 'friendly') + '">' + p.type + '</span></div>' +
          '<div class="rating">⭐ ' + p.rating + ' • ' + p.reviews + ' avaliacoes</div>' +
          '<div style="font-size:0.8rem;color:var(--text-light);margin-top:2px">📍 ' + p.address + '</div>' +
          (p.description ? '<div style="font-size:0.75rem;color:var(--text-light);margin-top:4px;font-style:italic">' + p.description + '</div>' : '') +
          '</div></div>';
      }).join('') + '</div>';
    setTimeout(function() { initOSMMap(); }, 100);
  });
}

function promptApiKey() {
  var key = prompt('Insira sua Google Places API Key (New):\n\n1. Acesse console.cloud.google.com\n2. Crie um projeto e ative "Places API (New)"\n3. Gere uma API Key\n4. Cole aqui:');
  if (key) { localStorage.setItem('elograin_google_api_key', key); location.reload(); }
}

function showPlaceDetail(placeId) {
  var p = state.places.find(function(x) { return x.id === placeId; });
  if (!p) return;
  var descBlock = p.description ? '<div style="background:var(--cream);padding:12px;border-radius:12px;margin-bottom:16px;font-size:0.9rem;color:var(--text-light);font-style:italic">' + p.description + '</div>' : '';
  openDetailModal(p.name,
    '<div style="text-align:center;font-size:4rem;margin-bottom:12px">' + p.icon + '</div>' +
    '<div style="text-align:center;margin-bottom:16px"><span class="badge badge-' + (p.badge === 'vegan' ? 'vegan' : 'friendly') + '">' + p.type + '</span></div>' +
    '<div class="rating" style="justify-content:center;margin-bottom:12px;font-size:1.1rem">⭐ ' + p.rating + ' <span style="color:var(--text-light);font-size:0.85rem">(' + p.reviews + ' avaliacoes)</span></div>' +
    '<div style="text-align:center;color:var(--text-light);margin-bottom:16px">📍 ' + p.address + '</div>' + descBlock +
    '<div style="display:flex;gap:8px;justify-content:center;margin-bottom:16px;flex-wrap:wrap">' +
    '<span class="tag">🍽️ Restaurante</span><span class="tag">♿ Acessivel</span><span class="tag">💳 Cartao</span></div>' +
    '<div style="background:var(--cream);padding:12px;border-radius:12px">' +
    '<div style="font-size:0.8rem;font-weight:700;margin-bottom:4px">📍 Coordenadas</div>' +
    '<div style="font-size:0.8rem;color:var(--text-light);font-family:monospace">Lat: ' + p.lat.toFixed(6) + ' | Lng: ' + p.lng.toFixed(6) + '</div></div>',
    '<button class="btn btn-primary" onclick="openReviewModal(\'' + p.name.replace(/'/g, "\\'") + '\')">⭐ Avaliar</button>' +
    '<button class="btn btn-secondary" onclick="window.open(\'https://www.google.com/maps/search/?api=1&query=' + p.lat + ',' + p.lng + '\', \'_blank\')">🗺️ Abrir no Maps</button>');
}

function renderEvents(container) {
  container.innerHTML = '<div class="section-header"><h3 class="section-title">Eventos Proximos</h3></div>' +
    state.events.map(function(e) {
      return '<div class="card" style="cursor:pointer" onclick="showEventDetail(' + e.id + ')">' +
        '<div class="card-header"><div class="avatar" style="font-size:1.8rem">' + e.icon + '</div>' +
        '<div class="card-meta"><div class="name">' + e.title + '</div><div class="time">' + e.date + ' • ' + e.location + '</div></div></div>' +
        '<div style="display:flex;gap:8px;margin-top:8px"><span class="badge badge-econ">' + e.type + '</span>' +
        '<span class="badge badge-vegan">👥 ' + e.attendees + ' confirmados</span></div></div>';
    }).join('');
}

function showEventDetail(eventId) {
  var e = state.events.find(function(x) { return x.id === eventId; });
  if (!e) return;
  openDetailModal(e.title,
    '<div style="text-align:center;font-size:4rem;margin-bottom:12px">' + e.icon + '</div>' +
    '<div style="text-align:center;margin-bottom:16px"><span class="badge badge-econ">' + e.type + '</span></div>' +
    '<div style="margin-bottom:12px"><strong>📅 Data:</strong> ' + e.date + '</div>' +
    '<div style="margin-bottom:12px"><strong>📍 Local:</strong> ' + e.location + '</div>' +
    '<div style="margin-bottom:12px"><strong>👥 Confirmados:</strong> ' + e.attendees + ' pessoas</div>' +
    '<div style="padding:12px;background:var(--cream);border-radius:12px;margin-top:12px">' +
    '<div style="font-size:0.85rem;color:var(--text-light)">Vai participar? Confirme sua presenca!</div></div>',
    '<button class="btn btn-primary" onclick="toast(\'Presenca confirmada! 🎉\')">✅ Confirmar</button>' +
    '<button class="btn btn-secondary" onclick="toast(\'Evento salvo!\')">💾 Salvar</button>');
}

function renderReviews(container) {
  var allReviews = state.reviews.concat(state.myReviews);
  container.innerHTML = '<div class="section-header"><h3 class="section-title">Avaliacoes Recentes</h3></div>' +
    allReviews.map(function(r) {
      return '<div class="card"><div class="card-header"><div class="avatar">' + r.avatar + '</div>' +
        '<div class="card-meta"><div class="name">' + r.author + '</div><div class="time">' + r.place + ' • ' + (r.date || 'Agora') + '</div></div></div>' +
        '<div class="rating" style="margin-bottom:8px">' + '⭐'.repeat(r.rating) + '</div>' +
        '<p class="card-text">' + r.text + '</p>' +
        '<div class="card-actions"><button class="action-btn" onclick="toast(\'Util marcado!\')">👍 Util (' + (r.likes || 0) + ')</button></div></div>';
    }).join('');
}

// ===== CONSUME =====
function renderConsume() {
  var content = document.getElementById('consumeContent');
  if (state.consumeTab === 'mercado') renderMarket(content);
  else renderBeauty(content);
}

function renderMarket(container) {
  container.innerHTML = '<div class="search-bar"><span class="search-icon">🔍</span>' +
    '<input type="text" placeholder="Buscar produtos no mercado..." oninput="filterProducts(this.value, \'market\')"></div>' +
    '<div id="marketList">' + state.productsMarket.map(function(p) { return productCard(p); }).join('') + '</div>';
}

function renderBeauty(container) {
  container.innerHTML = '<div class="search-bar"><span class="search-icon">🔍</span>' +
    '<input type="text" placeholder="Buscar produtos de beleza..." oninput="filterProducts(this.value, \'beauty\')"></div>' +
    '<div id="beautyList">' + state.productsBeauty.map(function(p) { return productCard(p, true); }).join('') + '</div>';
}

function productCard(p, isBeauty) {
  isBeauty = isBeauty || false;
  var cf = isBeauty ? '<span class="badge badge-friendly">🐰 Cruelty Free</span>' : '';
  return '<div class="product-card"><div class="product-img">' + p.icon + '</div>' +
    '<div style="flex:1;min-width:0"><div style="font-weight:700;font-size:0.95rem;margin-bottom:2px">' + p.name + '</div>' +
    '<div style="font-size:0.8rem;color:var(--text-light);margin-bottom:4px">' + p.brand + ' • ' + p.category + '</div>' +
    '<div style="display:flex;gap:6px;flex-wrap:wrap"><span class="badge badge-vegan">🌿 Vegano</span>' + cf + '</div>' +
    '<div style="font-size:0.8rem;color:var(--text-light);margin-top:6px">🏪 ' + p.stores.slice(0, 2).join(', ') + (p.stores.length > 2 ? '...' : '') + '</div></div>' +
    '<div style="font-weight:800;color:var(--primary);font-size:1rem;white-space:nowrap">' + p.price + '</div></div>';
}

function filterProducts(query, type) {
  query = query.toLowerCase();
  var list = type === 'market' ? state.productsMarket : state.productsBeauty;
  var filtered = list.filter(function(p) { return p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query); });
  var container = document.getElementById(type === 'market' ? 'marketList' : 'beautyList');
  container.innerHTML = filtered.map(function(p) { return productCard(p, type === 'beauty'); }).join('');
  if (filtered.length === 0) container.innerHTML = emptyState('Nenhum produto encontrado', '🔍');
}

// ===== CONNECT =====
function renderConnect() {
  var content = document.getElementById('connectContent');
  if (state.connectTab === 'encontros') renderDating(content);
  else renderFriendships(content);
}

function renderDating(container) {
  var profiles = state.profiles.filter(function(p) { return p.type === 'encontros'; });
  container.innerHTML = profiles.map(function(p) { return matchCard(p); }).join('');
}

function renderFriendships(container) {
  var profiles = state.profiles.filter(function(p) { return p.type === 'amizades'; });
  container.innerHTML = profiles.map(function(p) { return matchCard(p); }).join('');
}

function matchCard(p) {
  return '<div class="match-card"><div class="match-img">' + p.avatar + '</div>' +
    '<div class="match-body"><h3 style="font-size:1.2rem;margin-bottom:4px">' + p.name + ', ' + p.age + '</h3>' +
    '<p style="color:var(--text-light);font-size:0.9rem;margin-bottom:8px">' + p.bio + '</p>' +
    '<div class="tag-list">' + p.interests.map(function(i) { return '<span class="tag" style="padding:4px 10px;font-size:0.75rem">' + i + '</span>'; }).join('') + '</div></div>' +
    '<div class="match-actions">' +
    '<button class="match-btn match-btn-secondary" onclick="toast(\'Passado 👋\')">👋 Pular</button>' +
    '<button class="match-btn match-btn-primary" onclick="toast(\'Match! 💕 Inicie uma conversa.\')">💕 Curtir</button></div></div>';
}

// ===== PROFILE =====
function renderProfile() {
  document.getElementById('profileName').textContent = state.user.name;
  document.getElementById('profileAvatar').textContent = state.user.avatar;
  document.getElementById('profileBio').textContent = state.user.bio;
  document.getElementById('statPosts').textContent = state.posts.filter(function(p) { return p.author === state.user.name; }).length;
  document.getElementById('statRecipes').textContent = state.myRecipes.length;
  document.getElementById('statLikes').textContent = state.posts.reduce(function(a, p) { return a + (p.author === state.user.name ? p.likes : 0); }, 0);

  var myRecipesContainer = document.getElementById('myRecipes');
  if (state.myRecipes.length === 0) {
    myRecipesContainer.innerHTML = emptyState('Voce ainda nao criou receitas', '🍽️');
  } else {
    myRecipesContainer.innerHTML = state.myRecipes.map(function(r) {
      return '<div class="recipe-card" onclick="showRecipeDetail(' + r.id + ')"><div class="recipe-thumb">' + r.image + '</div>' +
        '<div class="recipe-info"><h3>' + r.title + '</h3><div class="recipe-meta">⭐ ' + r.rating + ' • ⏱️ ' + r.time + '</div></div></div>';
    }).join('');
  }

  var myReviewsContainer = document.getElementById('myReviews');
  if (state.myReviews.length === 0) {
    myReviewsContainer.innerHTML = emptyState('Voce ainda nao fez avaliacoes', '⭐');
  } else {
    myReviewsContainer.innerHTML = state.myReviews.map(function(r) {
      return '<div class="card"><div style="font-weight:700;margin-bottom:4px">' + r.place + '</div>' +
        '<div class="rating" style="margin-bottom:6px">' + '⭐'.repeat(r.rating) + '</div>' +
        '<p style="font-size:0.85rem;color:var(--text-light)">' + r.text + '</p></div>';
    }).join('');
  }
}

// ===== MODALS =====
function openDetailModal(title, body, footer) {
  footer = footer || '';
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
  var form = document.getElementById('createForm');
  if (state.createType === 'post') {
    form.innerHTML = '<label>O que voce quer compartilhar?</label>' +
      '<textarea id="postContent" placeholder="Conte sua experiencia, dica ou duvida..."></textarea>' +
      '<label>Categoria</label><select id="postTag"><option value="dica">💡 Dica</option><option value="experiencia">✨ Experiencia</option><option value="duvida">❓ Duvida</option></select>' +
      '<button class="btn btn-primary w-full" onclick="submitPost()">Publicar</button>';
  } else if (state.createType === 'recipe') {
    form.innerHTML = '<label>Nome da Receita</label><input type="text" id="recipeTitle" placeholder="Ex: Strogonoff de Grao-de-Bico">' +
      '<label>Tempo de Preparo</label><input type="text" id="recipeTime" placeholder="Ex: 45 min">' +
      '<label>Dificuldade</label><select id="recipeDiff"><option>Facil</option><option>Medio</option><option>Dificil</option></select>' +
      '<label>Categoria</label><select id="recipeCategory"><option value="economica">💰 Economica</option><option value="rapida">⚡ Rapida</option><option value="sobremesa">🍰 Sobremesa</option></select>' +
      '<label>Ingredientes (um por linha)</label><textarea id="recipeIngredients" placeholder="2 xicaras grao-de-bico\n1 cebola picada..."></textarea>' +
      '<label>Modo de Preparo (um passo por linha)</label><textarea id="recipeSteps" placeholder="Refogue a cebola...\nAdicione o grao-de-bico..."></textarea>' +
      '<button class="btn btn-primary w-full" onclick="submitRecipe()">Publicar Receita</button>';
  } else if (state.createType === 'review') {
    form.innerHTML = '<label>Estabelecimento</label><input type="text" id="reviewPlace" placeholder="Nome do restaurante/lugar">' +
      '<label>Nota</label><select id="reviewRating"><option value="5">⭐⭐⭐⭐⭐ (5)</option><option value="4">⭐⭐⭐⭐ (4)</option><option value="3">⭐⭐⭐ (3)</option><option value="2">⭐⭐ (2)</option><option value="1">⭐ (1)</option></select>' +
      '<label>Sua Experiencia</label><textarea id="reviewText" placeholder="Conte como foi sua visita..."></textarea>' +
      '<button class="btn btn-primary w-full" onclick="submitReview()">Publicar Avaliacao</button>';
  }
}

function submitPost() {
  var content = document.getElementById('postContent').value.trim();
  var tag = document.getElementById('postTag').value;
  if (!content) { toast('Escreva algo antes de publicar!'); return; }
  var newPost = { id: Date.now(), author: state.user.name, avatar: state.user.avatar, time: "Agora", content: content, tag: tag, likes: 0, comments: 0, liked: false, image: null };
  state.posts.unshift(newPost);
  saveState();
  closeCreateModal();
  toast('Post publicado! 🎉');
  if (state.currentView === 'feed') renderFeed();
  if (state.currentView === 'profile') renderProfile();
}

function submitRecipe() {
  var title = document.getElementById('recipeTitle').value.trim();
  var time = document.getElementById('recipeTime').value.trim();
  var difficulty = document.getElementById('recipeDiff').value;
  var category = document.getElementById('recipeCategory').value;
  var ingredients = document.getElementById('recipeIngredients').value.split('\n').filter(function(l) { return l.trim(); });
  var steps = document.getElementById('recipeSteps').value.split('\n').filter(function(l) { return l.trim(); });
  if (!title || !time || ingredients.length === 0 || steps.length === 0) { toast('Preencha todos os campos!'); return; }
  var tagMap = { economica: '💰 Economica', rapida: '⚡ Rapida', sobremesa: '🍰 Sobremesa' };
  var newRecipe = { id: Date.now(), title: title, author: state.user.name, avatar: state.user.avatar, time: time, difficulty: difficulty, rating: 0, reviews: 0, category: category, tags: [tagMap[category], '🆕 Nova'], image: '🍽️', ingredients: ingredients, steps: steps };
  state.myRecipes.unshift(newRecipe);
  saveState();
  closeCreateModal();
  toast('Receita publicada! 🍽️');
  if (state.currentView === 'recipes') renderRecipes();
  if (state.currentView === 'profile') renderProfile();
}

function submitReview() {
  var place = document.getElementById('reviewPlace').value.trim();
  var rating = parseInt(document.getElementById('reviewRating').value);
  var text = document.getElementById('reviewText').value.trim();
  if (!place || !text) { toast('Preencha todos os campos!'); return; }
  var newReview = { id: Date.now(), place: place, author: state.user.name, avatar: state.user.avatar, rating: rating, text: text, date: 'Agora', likes: 0 };
  state.myReviews.unshift(newReview);
  saveState();
  closeCreateModal();
  toast('Avaliacao publicada! ⭐');
  if (state.currentView === 'explore') renderExplore();
  if (state.currentView === 'profile') renderProfile();
}

function openReviewModal(placeName) {
  closeDetailModal();
  state.createType = 'review';
  openCreateModal();
  setTimeout(function() {
    var input = document.getElementById('reviewPlace');
    if (input) input.value = placeName;
  }, 100);
}

function emptyState(text, icon) {
  return '<div class="empty-state"><div class="empty-icon">' + icon + '</div><h3>' + text + '</h3><p style="font-size:0.85rem">Nada por aqui ainda. Seja o primeiro!</p></div>';
}

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', function() {
  loadState();

  document.querySelectorAll('.nav-item').forEach(function(btn) {
    btn.addEventListener('click', function() { showView(btn.dataset.view); });
  });

  document.getElementById('fabBtn').addEventListener('click', function() {
    if (state.currentView === 'explore') state.createType = 'review';
    else if (state.currentView === 'recipes') state.createType = 'recipe';
    else state.createType = 'post';
    openCreateModal();
  });

  document.getElementById('closeCreateModal').addEventListener('click', closeCreateModal);
  document.getElementById('closeDetailModal').addEventListener('click', closeDetailModal);
  document.getElementById('createModal').addEventListener('click', function(e) {
    if (e.target === document.getElementById('createModal')) closeCreateModal();
  });
  document.getElementById('detailModal').addEventListener('click', function(e) {
    if (e.target === document.getElementById('detailModal')) closeDetailModal();
  });

  document.querySelectorAll('#createTabs .tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      document.querySelectorAll('#createTabs .tab').forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      state.createType = tab.dataset.create;
      renderCreateForm();
    });
  });

  document.querySelectorAll('#exploreTabs .tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      document.querySelectorAll('#exploreTabs .tab').forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      state.exploreTab = tab.dataset.tab;
      renderExplore();
    });
  });

  document.querySelectorAll('#consumeTabs .tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      document.querySelectorAll('#consumeTabs .tab').forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      state.consumeTab = tab.dataset.tab;
      renderConsume();
    });
  });

  document.querySelectorAll('#connectTabs .tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      document.querySelectorAll('#connectTabs .tab').forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      state.connectTab = tab.dataset.tab;
      renderConnect();
    });
  });

  document.querySelectorAll('#feedTags .tag').forEach(function(tag) {
    tag.addEventListener('click', function() {
      document.querySelectorAll('#feedTags .tag').forEach(function(t) { t.classList.remove('active'); });
      tag.classList.add('active');
      renderFeed(tag.dataset.tag);
    });
  });

  document.querySelectorAll('#recipeTabs .tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      document.querySelectorAll('#recipeTabs .tab').forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      renderRecipes();
    });
  });

  var feedSearch = document.getElementById('feedSearch');
  if (feedSearch) feedSearch.addEventListener('input', function() { renderFeed(); });
  var recipeSearch = document.getElementById('recipeSearch');
  if (recipeSearch) recipeSearch.addEventListener('input', function() { renderRecipes(); });

  var themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', function() {
    state.darkMode = !state.darkMode;
    if (state.darkMode) document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
    themeToggle.textContent = state.darkMode ? '☀️' : '🌙';
    saveState();
  });
  themeToggle.textContent = state.darkMode ? '☀️' : '🌙';

  document.getElementById('notifBtn').addEventListener('click', function() {
    toast('🔔 Voce tem 3 notificacoes novas!');
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(function() {});
  }

  initSwipeEvents();
  renderCurrentView();
});
