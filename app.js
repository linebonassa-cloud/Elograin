// ===== DADOS DAS RECEITAS =====
const recipes = [
  {
    id: 1,
    title: "Strogonoff de Cogumelos",
    category: "almoço",
    time: "35 min",
    difficulty: "Médio",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop",
    ingredients: [
      "300g de cogumelos paris frescos",
      "1 cebola picada",
      "2 dentes de alho picados",
      "1 colher de sopa de azeite",
      "1 colher de sopa de mostarda",
      "2 colheres de sopa de ketchup",
      "1 lata de creme de leite de castanha-de-caju",
      "Sal e pimenta a gosto",
      "Salsinha picada para decorar"
    ],
    instructions: [
      "Lave bem os cogumelos e corte-os em fatias médias.",
      "Em uma panela, aqueça o azeite e refogue a cebola até ficar transparente.",
      "Adicione o alho e refogue por mais 1 minuto.",
      "Acrescente os cogumelos e cozinhe até soltarem água e dourarem levemente.",
      "Adicione a mostarda e o ketchup, misturando bem.",
      "Desligue o fogo e acrescente o creme de castanha-de-caju.",
      "Tempere com sal e pimenta, e finalize com salsinha.",
      "Sirva com arroz branco ou purê de batatas."
    ],
    tags: ["Sem Glúten", "Rico em Proteína", "Comfort Food"]
  },
  {
    id: 2,
    title: "Pancakes de Banana e Aveia",
    category: "café",
    time: "20 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=400&fit=crop",
    ingredients: [
      "2 bananas maduras",
      "1 xícara de aveia em flocos",
      "1/2 xícara de leite vegetal",
      "1 colher de chá de fermento em pó",
      "1 colher de chá de canela",
      "Óleo de coco para untar"
    ],
    instructions: [
      "Amasse as bananas em um bowl até formar um purê.",
      "Adicione a aveia, o leite vegetal, o fermento e a canela.",
      "Misture até obter uma massa homogênea.",
      "Aqueça uma frigideira antiaderente com um fio de óleo de coco.",
      "Coloque porções da massa e cozinhe em fogo médio.",
      "Vire quando borbulhar nas bordas e doure o outro lado.",
      "Sirva com frutas frescas, melado ou pasta de amendoim."
    ],
    tags: ["Sem Açúcar", "Sem Glúten", "Energético"]
  },
  {
    id: 3,
    title: "Lasanha de Berinjela",
    category: "jantar",
    time: "50 min",
    difficulty: "Médio",
    image: "https://images.unsplash.com/photo-1574868235872-1663edcb4569?w=400&h=400&fit=crop",
    ingredients: [
      "2 berinjelas grandes em fatias",
      "2 xícaras de molho de tomate caseiro",
      "200g de tofu amassado",
      "1/2 xícara de levedura nutricional",
      "2 colheres de sopa de azeite",
      "Orégano, sal e pimenta a gosto"
    ],
    instructions: [
      "Pré-aqueça o forno a 180°C.",
      "Grelhe as fatias de berinjela levemente untadas com azeite.",
      "Misture o tofu amassado com a levedura nutricional e temperos.",
      "Em um refratário, monte camadas alternando berinjela, molho e tofu.",
      "Finalize com uma camada de molho e levedura por cima.",
      "Leve ao forno por 30 minutos até dourar.",
      "Deixe descansar 10 minutos antes de servir."
    ],
    tags: ["Sem Lactose", "Low Carb", "Família"]
  },
  {
    id: 4,
    title: "Smoothie Bowl de Açaí",
    category: "café",
    time: "10 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1626078436812-e7218a8e7ac5?w=400&h=400&fit=crop",
    ingredients: [
      "2 pacotes de polpa de açaí sem açúcar",
      "1 banana congelada",
      "1/2 xícara de leite de coco",
      "Granola, frutas e sementes para topping"
    ],
    instructions: [
      "No liquidificador, bata o açaí, a banana e o leite de coco.",
      "A consistência deve ser espessa, tipo sorvete.",
      "Transfira para uma tigela.",
      "Decore com granola, fatias de banana, morangos e sementes de chia.",
      "Sirva imediatamente."
    ],
    tags: ["Antioxidante", "Refrescante", "Verão"]
  },
  {
    id: 5,
    title: "Hambúrguer de Grão-de-Bico",
    category: "lanche",
    time: "30 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=400&fit=crop",
    ingredients: [
      "2 xícaras de grão-de-bico cozido",
      "1/2 cebola picada",
      "2 colheres de sopa de farinha de aveia",
      "1 colher de chá de cominho",
      "1 colher de chá de páprica defumada",
      "Sal e pimenta a gosto",
      "Azeite para grelhar"
    ],
    instructions: [
      "No processador, triture o grão-de-bico até formar uma massa grossa.",
      "Transfira para um bowl e misture a cebola, aveia e temperos.",
      "Modele hambúrgueres com as mãos levemente molhadas.",
      "Aqueça uma frigideira com azeite em fogo médio.",
      "Grelhe os hambúrgueres por 4-5 minutos de cada lado até dourar.",
      "Sirva em pão vegano com alface, tomate e maionese de aquafaba."
    ],
    tags: ["Proteico", "Sem Soja", "Kids Friendly"]
  },
  {
    id: 6,
    title: "Curry de Lentilha",
    category: "almoço",
    time: "40 min",
    difficulty: "Médio",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=400&fit=crop",
    ingredients: [
      "1 xícara de lentilha vermelha",
      "1 cebola picada",
      "2 dentes de alho",
      "1 colher de sopa de gengibre ralado",
      "2 colheres de sopa de curry em pó",
      "1 lata de leite de coco",
      "2 xícaras de caldo de legumes",
      "Espinafre fresco a gosto"
    ],
    instructions: [
      "Refogue a cebola, alho e gengibre em um fio de óleo.",
      "Adicione o curry em pó e mexa por 1 minuto.",
      "Acrescente a lentilha, o caldo e o leite de coco.",
      "Cozinhe por 25 minutos em fogo baixo, mexendo ocasionalmente.",
      "Adicione o espinafre no final e cozinhe até murchar.",
      "Sirva com arroz basmati e pão naan."
    ],
    tags: ["Sem Glúten", "Rico em Ferro", "Aquecedor"]
  },
  {
    id: 7,
    title: "Torta de Chocolate Vegana",
    category: "sobremesa",
    time: "45 min",
    difficulty: "Médio",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=400&fit=crop",
    ingredients: [
      "1 1/2 xícara de farinha de trigo",
      "1 xícara de açúcar mascavo",
      "1/3 xícara de cacau em pó",
      "1 colher de chá de fermento",
      "1/2 colher de chá de bicarbonato",
      "1 xícara de leite vegetal",
      "1/3 xícara de óleo vegetal",
      "1 colher de sopa de vinagre de maçã"
    ],
    instructions: [
      "Pré-aqueça o forno a 180°C e unte uma forma redonda.",
      "Misture os ingredientes secos em um bowl.",
      "Em outro bowl, misture os ingredientes líquidos.",
      "Combine os dois e misture até ficar homogêneo.",
      "Despeje na forma e leve ao forno por 30-35 minutos.",
      "Faça o teste do palito antes de retirar.",
      "Decore com ganache de chocolate vegano."
    ],
    tags: ["Sem Ovos", "Sem Lactose", "Festivo"]
  },
  {
    id: 8,
    title: "Salada de Quinoa Mediterrânea",
    category: "almoço",
    time: "25 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop",
    ingredients: [
      "1 xícara de quinoa",
      "1 pepino em cubos",
      "1 xícara de tomate cereja",
      "1/2 cebola roxa em cubos",
      "Azeitonas pretas a gosto",
      "Suco de 1 limão",
      "3 colheres de sopa de azeite",
      "Manjericão fresco"
    ],
    instructions: [
      "Cozinhe a quinoa conforme instruções da embalagem.",
      "Deixe esfriar completamente.",
      "Em uma tigela grande, misture a quinoa com os vegetais.",
      "Tempere com azeite, limão, sal e pimenta.",
      "Finalize com manjericão fresco e azeitonas.",
      "Sirva gelada ou em temperatura ambiente."
    ],
    tags: ["Sem Glúten", "Refrescante", "Rico em Proteína"]
  },
  {
    id: 9,
    title: "Wrap de Falafel",
    category: "lanche",
    time: "20 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop",
    ingredients: [
      "4 falafels prontos (ou caseiros)",
      "4 wraps de trigo integral",
      "Hummus",
      "Alface, tomate e pepino",
      "Tahine",
      "Sumagre a gosto"
    ],
    instructions: [
      "Aqueça os falafels no forno ou air fryer até ficarem crocantes.",
      "Aqueça levemente os wraps.",
      "Espalhe hummus no centro de cada wrap.",
      "Adicione os falafels picados e os vegetais.",
      "Regue com tahine e sumagre.",
      "Enrole bem e sirva imediatamente."
    ],
    tags: ["Rápido", "Proteico", "Street Food"]
  },
  {
    id: 10,
    title: "Risoto de Abóbora",
    category: "jantar",
    time: "45 min",
    difficulty: "Médio",
    image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400&h=400&fit=crop",
    ingredients: [
      "1 1/2 xícara de arroz arbóreo",
      "2 xícaras de abóbora em cubos",
      "1 cebola picada",
      "1/2 xícara de vinho branco",
      "4 xícaras de caldo de legumes quente",
      "2 colheres de sopa de manteiga vegana",
      "1/2 xícara de queijo parmesão vegano",
      "Sálvia frita para decorar"
    ],
    instructions: [
      "Refogue a cebola na manteiga vegana até ficar transparente.",
      "Adicione o arroz e mexa por 2 minutos.",
      "Acrescente o vinho e deixe evaporar.",
      "Adicione o caldo aos poucos, mexendo sempre.",
      "Quando o arroz estiver al dente, misture a abóbora cozida.",
      "Desligue o fogo e acrescente o queijo vegano.",
      "Sirva com sálvia frita por cima."
    ],
    tags: ["Comfort Food", "Outono", "Especial"]
  },
  {
    id: 11,
    title: "Brownie de Batata-Doce",
    category: "sobremesa",
    time: "40 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=400&fit=crop",
    ingredients: [
      "2 xícaras de batata-doce cozida e amassada",
      "1/2 xícara de cacau em pó",
      "1/4 xícara de xarope de bordo",
      "1/2 xícara de farinha de amêndoa",
      "1 colher de chá de extrato de baunilha",
      "1/4 colher de chá de sal"
    ],
    instructions: [
      "Pré-aqueça o forno a 180°C.",
      "Misture todos os ingredientes em um processador.",
      "Processe até obter uma massa lisa.",
      "Despeje em uma forma untada.",
      "Asse por 25-30 minutos.",
      "Deixe esfriar antes de cortar em quadrados."
    ],
    tags: ["Sem Açúcar Refinado", "Sem Glúten", "Fit"]
  },
  {
    id: 12,
    title: "Tacos de Jackfruit",
    category: "jantar",
    time: "30 min",
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=400&fit=crop",
    ingredients: [
      "1 lata de jackfruit verde em água",
      "1 cebola em fatias",
      "2 dentes de alho",
      "2 colheres de sopa de molho barbecue",
      "1 colher de chá de cominho",
      "Tortilhas de milho",
      "Coleslaw para acompanhar"
    ],
    instructions: [
      "Escorra e desfie a jackfruit com um garfo.",
      "Refogue a cebola e o alho até dourar.",
      "Adicione a jackfruit, o barbecue e o cominho.",
      "Cozinhe por 15 minutos em fogo baixo.",
      "Aqueça as tortilhas.",
      "Monte os tacos com a jackfruit e coleslaw por cima."
    ],
    tags: ["Sem Soja", "Mexicano", "Picnic"]
  }
];

// ===== POSTS INICIAIS =====
let posts = JSON.parse(localStorage.getItem('veggie_posts')) || [
  {
    id: 1,
    author: "Ana Vegana",
    emoji: "🌿",
    content: "Acabei de fazer o Strogonoff de Cogumelos e ficou incrível! A dica é usar cogumelos shiitake junto com os paris para dar mais sabor. Meu marido nem percebeu que não tinha carne! 🍄✨",
    likes: 24,
    liked: false,
    time: "2 horas atrás"
  },
  {
    id: 2,
    author: "Carlos PlantBased",
    emoji: "🍕",
    content: "Dica de ouro: para fazer queijo vegano derretido perfeito, use levedura nutricional + amido de milho + leite de castanha. Fica idêntico ao queijo tradicional em pizzas! Quem mais tem truques para compartilhar?",
    likes: 47,
    liked: false,
    time: "5 horas atrás"
  },
  {
    id: 3,
    author: "Marina Verde",
    emoji: "🥗",
    content: "Hoje experimentei substituir o ovo em bolos por aquafaba (aquela água do grão-de-bico) e o resultado foi surpreendente! Ficou super fofo e nem dá para notar a diferença. Recomendo demais! 🎂",
    likes: 31,
    liked: false,
    time: "1 dia atrás"
  },
  {
    id: 4,
    author: "Pedro Nature",
    emoji: "🥤",
    content: "Alguém já fez leite de castanha-de-caju caseiro? É muito mais barato que comprar pronto e fica uma delícia! Só bater castanhas de molho + água + uma pitada de sal. Dura 3-4 dias na geladeira. 💚",
    likes: 18,
    liked: false,
    time: "2 dias atrás"
  }
];

// ===== ESTADO =====
let currentTab = 'recipes';
let currentFilter = 'all';
let selectedEmoji = '🌿';

// ===== DOM ELEMENTS =====
const splash = document.getElementById('splash');
const app = document.getElementById('app');
const recipesGrid = document.getElementById('recipes-grid');
const postsFeed = document.getElementById('posts-feed');
const recipeModal = document.getElementById('recipe-modal');
const recipeDetail = document.getElementById('recipe-detail');
const postModal = document.getElementById('post-modal');
const postForm = document.getElementById('post-form');
const fab = document.getElementById('fab');
const toast = document.getElementById('toast');
const searchOverlay = document.getElementById('search-overlay');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
  // Splash screen
  setTimeout(() => {
    splash.classList.add('fade-out');
    app.classList.remove('hidden');
    setTimeout(() => splash.remove(), 500);
  }, 2000);

  renderRecipes();
  renderPosts();
  setupEventListeners();
  setupServiceWorker();
});

// ===== RENDER RECIPES =====
function renderRecipes(filter = 'all') {
  const filtered = filter === 'all' 
    ? recipes 
    : recipes.filter(r => r.category === filter);

  if (filtered.length === 0) {
    recipesGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <div class="empty-state-icon">🍽️</div>
        <h3>Nenhuma receita encontrada</h3>
        <p>Tente outro filtro!</p>
      </div>
    `;
    return;
  }

  recipesGrid.innerHTML = filtered.map(recipe => `
    <button class="recipe-card" onclick="openRecipe(${recipe.id})" aria-label="${recipe.title}">
      <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image" loading="lazy">
      <div class="recipe-info">
        <div class="recipe-category">${recipe.category}</div>
        <div class="recipe-title">${recipe.title}</div>
        <div class="recipe-meta">
          <span class="recipe-time">${recipe.time}</span>
          <span class="recipe-difficulty">${recipe.difficulty}</span>
        </div>
      </div>
    </button>
  `).join('');
}

// ===== RENDER POSTS =====
function renderPosts() {
  if (posts.length === 0) {
    postsFeed.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">👥</div>
        <h3>Nenhuma postagem ainda</h3>
        <p>Seja o primeiro a compartilhar algo!</p>
      </div>
    `;
    return;
  }

  postsFeed.innerHTML = posts.map(post => `
    <article class="post-card">
      <div class="post-header">
        <div class="post-avatar">${post.emoji}</div>
        <div class="post-author-info">
          <div class="post-author-name">${escapeHtml(post.author)}</div>
          <div class="post-time">${post.time}</div>
        </div>
      </div>
      <div class="post-content">${escapeHtml(post.content)}</div>
      <div class="post-actions">
        <button class="post-action-btn ${post.liked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
          <span>${post.liked ? '❤️' : '🤍'}</span>
          <span>${post.likes}</span>
        </button>
        <button class="post-action-btn" onclick="sharePost(${post.id})">
          <span>📤</span>
          <span>Compartilhar</span>
        </button>
      </div>
    </article>
  `).join('');
}

// ===== OPEN RECIPE =====
function openRecipe(id) {
  const recipe = recipes.find(r => r.id === id);
  if (!recipe) return;

  recipeDetail.innerHTML = `
    <img src="${recipe.image}" alt="${recipe.title}" class="recipe-detail-img">
    <div class="recipe-detail-body">
      <h2>${recipe.title}</h2>
      <div class="recipe-detail-tags">
        ${recipe.tags.map(tag => `<span class="recipe-tag">${tag}</span>`).join('')}
        <span class="recipe-tag">⏱️ ${recipe.time}</span>
        <span class="recipe-tag">🔥 ${recipe.difficulty}</span>
      </div>

      <div class="recipe-section">
        <h3>📝 Ingredientes</h3>
        <ul>
          ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
      </div>

      <div class="recipe-section">
        <h3>👨‍🍳 Modo de Preparo</h3>
        <ol>
          ${recipe.instructions.map(step => `<li>${step}</li>`).join('')}
        </ol>
      </div>
    </div>
  `;

  recipeModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

// ===== CLOSE MODALS =====
function closeModals() {
  recipeModal.classList.add('hidden');
  postModal.classList.add('hidden');
  document.body.style.overflow = '';
}

// ===== TOGGLE LIKE =====
function toggleLike(id) {
  const post = posts.find(p => p.id === id);
  if (!post) return;

  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;

  localStorage.setItem('veggie_posts', JSON.stringify(posts));
  renderPosts();
}

// ===== SHARE POST =====
function sharePost(id) {
  const post = posts.find(p => p.id === id);
  if (!post) return;

  const text = `${post.author} no VeggieLife: "${post.content}"`;

  if (navigator.share) {
    navigator.share({
      title: 'VeggieLife',
      text: text,
      url: window.location.href
    });
  } else {
    navigator.clipboard.writeText(text).then(() => {
      showToast('📋 Copiado para a área de transferência!');
    });
  }
}

// ===== ADD POST =====
function addPost(author, content, emoji) {
  const newPost = {
    id: Date.now(),
    author: author,
    emoji: emoji,
    content: content,
    likes: 0,
    liked: false,
    time: "Agora mesmo"
  };

  posts.unshift(newPost);
  localStorage.setItem('veggie_posts', JSON.stringify(posts));
  renderPosts();
  showToast('✅ Postagem publicada com sucesso!');
}

// ===== SHOW TOAST =====
function showToast(message) {
  toast.textContent = message;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 3000);
}

// ===== ESCAPE HTML =====
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ===== SEARCH =====
function performSearch(query) {
  if (!query.trim()) {
    searchResults.innerHTML = '';
    return;
  }

  const q = query.toLowerCase();

  const recipeResults = recipes.filter(r => 
    r.title.toLowerCase().includes(q) || 
    r.category.toLowerCase().includes(q) ||
    r.ingredients.some(i => i.toLowerCase().includes(q))
  );

  const postResults = posts.filter(p => 
    p.content.toLowerCase().includes(q) || 
    p.author.toLowerCase().includes(q)
  );

  let html = '';

  if (recipeResults.length > 0) {
    html += `<h3 style="padding: 12px 0 8px; font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px;">🍽️ Receitas</h3>`;
    html += recipeResults.map(r => `
      <button class="recipe-card" style="display:flex; align-items:center; gap:12px; padding:12px; margin-bottom:8px; text-align:left; width:100%;" onclick="openRecipe(${r.id}); closeSearch();">
        <img src="${r.image}" style="width:60px; height:60px; border-radius:12px; object-fit:cover; flex-shrink:0;">
        <div>
          <div style="font-weight:600; font-size:0.95rem;">${r.title}</div>
          <div style="font-size:0.8rem; color:var(--text-secondary);">${r.category} • ${r.time}</div>
        </div>
      </button>
    `).join('');
  }

  if (postResults.length > 0) {
    html += `<h3 style="padding: 16px 0 8px; font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px;">👥 Comunidade</h3>`;
    html += postResults.map(p => `
      <div class="post-card" style="margin-bottom:8px;">
        <div class="post-header">
          <div class="post-avatar">${p.emoji}</div>
          <div class="post-author-info">
            <div class="post-author-name">${escapeHtml(p.author)}</div>
            <div class="post-time">${p.time}</div>
          </div>
        </div>
        <div class="post-content">${escapeHtml(p.content)}</div>
      </div>
    `).join('');
  }

  if (recipeResults.length === 0 && postResults.length === 0) {
    html = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <h3>Nenhum resultado</h3>
        <p>Tente buscar por "strogonoff", "doce", "cafe"...</p>
      </div>
    `;
  }

  searchResults.innerHTML = html;
}

function openSearch() {
  searchOverlay.classList.remove('hidden');
  searchInput.focus();
  document.body.style.overflow = 'hidden';
}

function closeSearch() {
  searchOverlay.classList.add('hidden');
  searchInput.value = '';
  searchResults.innerHTML = '';
  document.body.style.overflow = '';
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  // Bottom nav
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const tab = item.dataset.tab;
      switchTab(tab);
    });
  });

  // Filter chips
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentFilter = chip.dataset.filter;
      renderRecipes(currentFilter);
    });
  });

  // FAB
  fab.addEventListener('click', () => {
    if (currentTab === 'community') {
      postModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    } else {
      switchTab('community');
      setTimeout(() => {
        postModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }, 300);
    }
  });

  // Close modals
  document.getElementById('modal-close').addEventListener('click', closeModals);
  document.getElementById('post-modal-close').addEventListener('click', closeModals);

  recipeModal.addEventListener('click', (e) => {
    if (e.target === recipeModal) closeModals();
  });

  postModal.addEventListener('click', (e) => {
    if (e.target === postModal) closeModals();
  });

  // Post form
  postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const author = document.getElementById('post-author').value.trim();
    const content = document.getElementById('post-content').value.trim();

    if (author && content) {
      addPost(author, content, selectedEmoji);
      postForm.reset();
      selectedEmoji = '🌿';
      document.querySelectorAll('.emoji-option').forEach(e => e.classList.remove('selected'));
      document.querySelector('.emoji-option[data-emoji="🌿"]').classList.add('selected');
      closeModals();
    }
  });

  // Emoji picker
  document.querySelectorAll('.emoji-option').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.emoji-option').forEach(e => e.classList.remove('selected'));
      btn.classList.add('selected');
      selectedEmoji = btn.dataset.emoji;
    });
  });

  // Search
  document.getElementById('btn-search').addEventListener('click', openSearch);
  document.getElementById('search-back').addEventListener('click', closeSearch);
  document.getElementById('search-clear').addEventListener('click', () => {
    searchInput.value = '';
    searchResults.innerHTML = '';
    searchInput.focus();
  });

  searchInput.addEventListener('input', (e) => {
    performSearch(e.target.value);
  });

  // Keyboard handling
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModals();
      closeSearch();
    }
  });
}

// ===== SWITCH TAB =====
function switchTab(tab) {
  currentTab = tab;

  // Update nav
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.tab === tab);
  });

  // Update content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === `tab-${tab}`);
  });

  // Show/hide FAB
  if (tab === 'community') {
    fab.classList.remove('hidden-fab');
    fab.innerHTML = '<span>＋</span>';
  } else {
    fab.classList.remove('hidden-fab');
    fab.innerHTML = '<span>＋</span>';
  }

  // Scroll to top
  document.getElementById('main-content').scrollTop = 0;
}

// ===== SERVICE WORKER =====
function setupServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('SW registrado:', reg.scope))
      .catch(err => console.log('SW erro:', err));
  }
}
