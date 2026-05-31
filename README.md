# arqenriquez-web

Sitio web de marca personal de **Jorge Enríquez** — arquitecto, escritor, polímata.
Cuaderno digital donde conviven la arquitectura, la inteligencia artificial,
el project management, la filosofía y la teología.

🌐 **URL final:** [arqenriquez.com](https://arqenriquez.com)

---

## 🎨 Identidad de marca

| Elemento | Valor |
|---|---|
| **Concepto** | Cuaderno de pensamiento — polímata moderno |
| **Fondo claro** (default) | `#FFFFFF` blanco puro |
| **Fondo oscuro** | `#000000` negro puro |
| **Texto primario claro** | `#0A0A0A` |
| **Texto primario oscuro** | `#FFFFFF` |
| **Acento (claro)** | `#4A6FA5` azul cobalto |
| **Acento (oscuro)** | `#6B8DC0` azul claro |
| **Display font** | Bricolage Grotesque (700/600) |
| **Body font** | Inter (400/500) |
| **Mono font** | JetBrains Mono (400/500) |

---

## 📂 Estructura del proyecto

```
arqenriquez-web/
├── index.html              ← Página principal (home)
├── README.md               ← Esto que estás leyendo
├── .gitignore              ← Archivos que git debe ignorar
│
├── css/
│   └── styles.css          ← Todos los estilos del sitio
│
├── js/
│   └── script.js           ← Toggle de tema, animaciones, formulario
│
└── assets/
    ├── images/             ← Fotos, imágenes de proyectos, OG image
    ├── icons/              ← Favicon, íconos sociales (cuando los tengas)
    └── fonts/              ← Reservado por si alojamos fuentes locales
```

---

## 🚀 Cómo correrlo localmente

### Requisitos
- [Visual Studio Code](https://code.visualstudio.com/) (recomendado)
- Extensión **Live Server** de Ritwick Dey
- Un navegador moderno (Chrome, Firefox, Safari, Edge)

### Pasos
1. Abre el proyecto en VS Code: `File → Open Folder → arqenriquez-web`
2. Click derecho sobre `index.html` → **"Open with Live Server"**
3. El sitio se abrirá automáticamente en tu navegador en `http://127.0.0.1:5500`
4. Cualquier cambio que hagas se actualiza en tiempo real ✨

> **Nota:** No necesitas Node.js, npm, ni ningún build tool.
> Es HTML/CSS/JS puro, server-side rendering = 0, complejidad = 0.

---

## 🌐 Despliegue (cuando esté listo)

### Opción 1: GitHub Pages (gratis, ideal para empezar)
1. Sube el repo a GitHub
2. `Settings → Pages → Source: main / root`
3. En unos minutos tendrás `https://[tu-usuario].github.io/arqenriquez-web/`

### Opción 2: Netlify (gratis, recomendado)
1. Conecta tu repo de GitHub a Netlify
2. Build command: vacío. Publish directory: `/`
3. Conecta el dominio `arqenriquez.com` en Netlify → DNS

### Opción 3: Vercel (gratis, también excelente)
1. Importa el repo en vercel.com
2. Deploy automático
3. Conecta el dominio en Settings → Domains

---

## 📝 Plan de contenido pendiente

### Imágenes que necesitas conseguir/crear

| Archivo | Dimensiones | Uso |
|---|---|---|
| `assets/images/jorge-perfil.jpg` | 800×1000 px (4:5) | Foto sección "Sobre mí" |
| `assets/images/og-image.jpg` | 1200×630 px | Compartir en redes sociales |
| `assets/images/proj-01.jpg` | 1600×1000 px (16:10) | Casa Patio |
| `assets/images/proj-02.jpg` | 1600×1000 px (16:10) | Asistente AEC |
| `assets/images/proj-03.jpg` | 1600×1000 px (16:10) | Pabellón temporal |
| `favicon.ico` | 32×32 px | Pestaña del navegador |
| `apple-touch-icon.png` | 180×180 px | Ícono iOS al guardar |

> 💡 **Tip:** todas las imágenes JPG/PNG conviértelas a **WebP**.
> Pesan 30-40% menos sin perder calidad. Herramienta gratuita: [squoosh.app](https://squoosh.app)

### Contenido a redactar
- [ ] Bio definitiva en "Sobre mí"
- [ ] 3 artículos reales para reemplazar los placeholders del Blog
- [ ] Descripciones reales de proyectos del portafolio
- [ ] Página `/blog` con listado completo de artículos
- [ ] Página individual de cada artículo

---

## 🛠️ Roadmap técnico

### Fase 1 — MVP (estamos aquí)
- [x] Diseño y maquetación del home
- [x] Estructura de carpetas y archivos
- [x] Modo claro/oscuro funcional
- [x] Responsive 100% (móvil, tablet, desktop)
- [x] Animaciones básicas (fade-in, palabra rotativa)
- [ ] Reemplazar placeholders por contenido real
- [ ] Conseguir foto de perfil profesional

### Fase 2 — Blog funcional
- [ ] Crear sistema de artículos (puede ser carpeta `/blog/articulo-x/index.html`
      o usar un static site generator como **Astro** si crece mucho)
- [ ] Página de listado por categoría
- [ ] Reading time automático
- [ ] Botones de compartir

### Fase 3 — Pulido y producción
- [ ] Conectar formulario de cursos a Formspree o Mailerlite
- [ ] Configurar Google Analytics o Plausible
- [ ] Comprar dominio `arqenriquez.com`
- [ ] Desplegar en Netlify/Vercel y conectar DNS
- [ ] SEO: sitemap.xml, robots.txt, schema.org

### Fase 4 — Cursos (futuro)
- [ ] Plataforma de cursos (Hotmart, Teachable, propia con Stripe)
- [ ] Página de venta por curso
- [ ] Sistema de pagos

---

## 📜 Licencia

Todos los derechos reservados © Jorge Enríquez 2026.
El código de este sitio es personal y no se distribuye bajo licencia open-source.
