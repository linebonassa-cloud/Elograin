# 🌿 Elograin v2 - SuperApp Vegano

Aplicativo PWA (Progressive Web App) para comunidade vegana com skeleton screens, integracao Google Maps e OpenStreetMap.

## ✨ Novidades da v2

- **🦴 Skeleton Screens** - Retangulos cinzas pulsantes simulam carregamento de cards antes dos dados reais aparecerem (feed, receitas, mapa)
- **🗺️ OpenStreetMap + Leaflet** - Mapa interativo real com pins de restaurantes veganos usando coordenadas lat/long
- **🔑 Google Places API (New)** - Busca restaurantes veganos reais do Google Maps (requer API key)

## 🚀 Deploy no Vercel

### Opcao 1: Drag & Drop
1. Baixe o `.zip` e extraia a pasta `elograin-pwa-v2`
2. Acesse [vercel.com](https://vercel.com) → Login
3. "Add New..." → "Project" → Arraste a pasta

### Opcao 2: CLI
```bash
cd elograin-pwa-v2
npx vercel
```

## 🔑 Configurar Google Places API (Opcional)

Para buscar restaurantes veganos REAIS do Google Maps:

1. Acesse [console.cloud.google.com](https://console.cloud.google.com)
2. Crie um novo projeto
3. Ative a API: **Places API (New)**
4. Va em "Credenciais" → "Criar credenciais" → "Chave de API"
5. No app, va em **Explorar → Mapa** e toque em **"🔑 Configurar API"**
6. Cole sua chave e recarregue o app

> Sem API key, o app funciona normalmente com dados mockados!

## 📱 Instalar no Celular

Apos o deploy, acesse o URL no Chrome/Safari do celular → "Adicionar a Tela Inicial" → Funciona como app nativo offline!

## 🎨 Design

- **Thumb-Friendly**: Navegacao inferior + FAB na parte inferior
- **Skeleton Loading**: Shimmer animation em cards de feed, receitas e mapa
- **Paleta**: Verde Botanico `#1B4D3E`, Terra Cota `#E07A5F`, Creme `#F4F1DE`
- **Dark Mode**: Toggle no header
- **Mapa OSM**: Leaflet.js com tiles OpenStreetMap

## 📂 Estrutura

```
elograin-pwa-v2/
├── index.html       # SPA com skeletons e Leaflet
├── style.css        # Estilos + animacoes skeleton
├── app.js           # Logica + Google Maps API + OSM
├── sw.js            # Service Worker
├── manifest.json    # Configuracao PWA
└── icons/           # Icones do app
```

## 🛠 Tecnologias

- HTML5, CSS3, JavaScript Vanilla
- Leaflet.js + OpenStreetMap
- Google Places API (New) REST
- Service Worker (offline)
- LocalStorage (persistencia)

---

Feito com 💚 para a comunidade vegana.
