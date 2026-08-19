# 🌿 VeggieLife - Receitas Veganas PWA

App mobile PWA de receitas veganas caseiras com comunidade.

## 📱 Funcionalidades

- **Receitas**: 12 receitas veganas caseiras com filtros por categoria
- **Comunidade**: Feed de posts onde usuários compartilham experiências
- **Busca**: Pesquisa em receitas e posts
- **PWA**: Instalável no celular, funciona offline
- **Thumb-Friendly**: Navegação e ações principais na parte inferior da tela

## 🚀 Deploy no Vercel

1. Faça upload desta pasta para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com) e importe o repositório
3. O deploy será automático!

Ou use o Vercel CLI:
```bash
npm i -g vercel
vercel
```

## 📂 Estrutura

```
├── index.html      # App principal
├── style.css       # Estilos (mobile-first, thumb-friendly)
├── app.js          # Lógica do app
├── manifest.json   # Configuração PWA
├── sw.js           # Service Worker (offline)
└── icons/          # Ícones do PWA
```

## 🎨 Design

- **Zona do Polegar**: Navegação inferior, FAB na parte de baixo
- **Cores**: Verde natural (#2E7D32) com laranja de destaque (#FF6F00)
- **Tipografia**: System font stack para performance nativa
- **Animações**: Suaves e responsivas ao toque
