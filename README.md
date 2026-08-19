# 🌿 Elograin - SuperApp Vegano

Aplicativo PWA (Progressive Web App) para comunidade vegana, centralizando receitas, mapa de estabelecimentos, guia de consumo, eventos e relacionamentos.

## ✨ Funcionalidades

- **🏠 Feed da Comunidade** - Posts, dicas, experiências e dúvidas
- **🍽️ Receitas Veganas** - Criação, avaliação e compartilhamento de receitas
- **🗺️ Mapa Interativo** - Restaurantes, lanchonetes, padarias e sorveterias veganas
- **🎉 Eventos** - Festivais, feiras, workshops e encontros
- **⭐ Avaliações** - Reviews detalhados de estabelecimentos
- **🛒 Guia de Consumo** - Produtos de supermercado e perfumaria veganos/cruelty-free
- **💕 Conexões** - Módulo de encontros e amizades
- **👤 Perfil** - Gerenciamento de receitas e avaliações

## 🚀 Deploy no Vercel

### Opção 1: Deploy via CLI

```bash
# Instale o Vercel CLI
npm i -g vercel

# Navegue até a pasta do projeto
cd elograin-pwa

# Deploy
vercel
```

### Opção 2: Deploy via Git

1. Crie um repositório no GitHub
2. Envie os arquivos:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/seu-usuario/elograin.git
git push -u origin main
```
3. Importe o repositório no [Vercel](https://vercel.com)
4. O deploy será automático!

### Opção 3: Deploy Manual (Drag & Drop)

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Add New..." → "Project"
3. Selecione "Import Git Repository" ou faça upload dos arquivos

## 📱 Instalação no Celular

Após o deploy:
1. Acesse o URL do app no navegador do celular
2. Toque em "Adicionar à Tela Inicial" (Chrome/Safari)
3. O app será instalado como um app nativo!

## 🎨 Design

- **Thumb-Friendly**: Navegação inferior e FAB posicionados para uso com uma mão
- **Paleta**: Verde Botânico (#1B4D3E), Terra Cota (#E07A5F), Creme (#F4F1DE)
- **Fontes**: Outfit (títulos) + Inter (corpo)
- **Dark Mode**: Suporte completo a tema escuro

## 🛠️ Tecnologias

- HTML5, CSS3, JavaScript Vanilla
- Service Worker para funcionamento offline
- LocalStorage para persistência de dados
- Manifest.json para instalação PWA

## 📂 Estrutura

```
elograin-pwa/
├── index.html      # Estrutura SPA
├── style.css       # Estilos e temas
├── app.js          # Lógica e dados
├── sw.js           # Service Worker
├── manifest.json   # Configuração PWA
└── icons/          # Ícones do app
```

## 📝 Notas

- Os dados são mockados para demonstração
- LocalStorage persiste receitas, posts e preferências do usuário
- O app é totalmente responsivo e otimizado para mobile

---

Feito com 💚 para a comunidade vegana.
