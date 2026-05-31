# 🚀 Guía de inicio — arqenriquez-web

Esta guía te lleva desde **descargar el proyecto** hasta **verlo en internet con GitHub Pages**, paso a paso.

---

## 📋 Antes de empezar — instala lo que necesitas

### 1. Visual Studio Code (editor de código)
Descárgalo gratis: https://code.visualstudio.com/

### 2. Git (control de versiones)
- **Windows:** https://git-scm.com/download/win
- **Mac:** ya viene instalado, o `brew install git`
- Verifica con: `git --version` en la terminal

### 3. Cuenta de GitHub
Si no tienes: https://github.com/signup

---

## 🪜 PASO 1 — Mover el proyecto a una carpeta tuya

1. Descarga el `.zip` que te pasé
2. Descomprímelo
3. Muévelo a una carpeta donde guardes proyectos. Sugerencias:
   - **Windows:** `C:\Users\TuNombre\Documents\Proyectos\arqenriquez-web`
   - **Mac:** `~/Documents/Proyectos/arqenriquez-web`

---

## 🪜 PASO 2 — Abrir el proyecto en VS Code

1. Abre **VS Code**
2. `File → Open Folder` (o `Cmd/Ctrl + O`)
3. Selecciona la carpeta `arqenriquez-web`
4. Verás en el panel izquierdo:
   ```
   ARQENRIQUEZ-WEB
   ├── assets/
   ├── css/
   ├── js/
   ├── .gitignore
   ├── GUIA-INICIO.md  ← este archivo
   ├── index.html
   └── README.md
   ```

---

## 🪜 PASO 3 — Instalar Live Server (extensión clave)

Esta extensión te permite ver tu sitio en vivo y refrescarse automáticamente al guardar.

1. En VS Code, click en el ícono de **extensiones** (4 cuadritos en el panel izquierdo) o `Ctrl/Cmd + Shift + X`
2. Busca: **`Live Server`** (de Ritwick Dey)
3. Click en **Install**
4. Click derecho sobre `index.html` → **"Open with Live Server"**
5. Tu sitio se abrirá en `http://127.0.0.1:5500/index.html` 🎉

> 🧠 **Lección:** Live Server simula un servidor web local. Sin él, abrir el HTML directamente puede causar problemas con rutas, fuentes y JavaScript.

---

## 🪜 PASO 4 — Otras extensiones recomendadas (opcionales)

Búscalas e instálalas igual que Live Server:

| Extensión | Para qué sirve |
|---|---|
| **Prettier - Code formatter** | Auto-formatea HTML/CSS/JS al guardar |
| **Auto Rename Tag** | Si renombras `<div>` por `<section>`, el cierre se renombra solo |
| **CSS Peek** | Ctrl+click en una clase del HTML te lleva a la regla CSS |
| **HTML CSS Support** | Autocompletado de clases CSS en HTML |
| **Color Highlight** | Te muestra el color real al lado de cada `#hex` en el código |
| **GitHub Copilot** *(de paga)* | IA que te ayuda a escribir código |

---

## 🪜 PASO 5 — Inicializar Git y subir a GitHub

### A) Inicializar el repositorio local

Abre la **terminal integrada** en VS Code: `View → Terminal` (o `` Ctrl + ` ``)

```bash
git init
git add .
git commit -m "Primer commit: estructura inicial del sitio"
```

### B) Crear el repositorio en GitHub

1. Ve a https://github.com/new
2. Repository name: **`arqenriquez-web`**
3. Description: "Sitio personal de Jorge Enríquez"
4. **Visibilidad:** Public (para usar GitHub Pages gratis) o Private (si quieres ocultarlo)
5. **NO marques** "Add README" ni ".gitignore" (ya los tienes)
6. Click en **Create repository**

### C) Conectar tu repo local con GitHub

GitHub te dará 3 comandos. Cópialos. Algo así:

```bash
git remote add origin https://github.com/TU-USUARIO/arqenriquez-web.git
git branch -M main
git push -u origin main
```

Pégalos en la terminal de VS Code y ejecútalos. Listo, tu código está en GitHub. 🎊

---

## 🪜 PASO 6 — Activar GitHub Pages (sitio en vivo gratis)

1. En tu repo de GitHub, ve a **Settings → Pages**
2. En "Source", selecciona: `Deploy from a branch`
3. Branch: `main` / `/ (root)` → **Save**
4. Espera 1-3 minutos
5. Tu sitio estará en: `https://TU-USUARIO.github.io/arqenriquez-web/`

> Esta URL es **temporal** — cuando compres `arqenriquez.com`, lo apuntas aquí.

---

## 🪜 PASO 7 — Flujo de trabajo diario

Cada vez que hagas cambios al sitio:

```bash
# 1. Ver qué cambió
git status

# 2. Agregar todos los cambios
git add .

# 3. Hacer commit con un mensaje descriptivo
git commit -m "Añadí foto de perfil y bio actualizada"

# 4. Subir a GitHub
git push
```

GitHub Pages se actualiza solo en 1-2 minutos. ✨

> 💡 **Buenos mensajes de commit:**
> - ✅ "Corregí el espaciado del hero en móvil"
> - ✅ "Añadí 2 artículos nuevos al blog"
> - ❌ "cambios"
> - ❌ "asdfg"

---

## 🪜 PASO 8 — Comprar dominio y conectar (cuando esté listo)

### A) Comprar `arqenriquez.com`
Recomendados:
- **Namecheap** (~$10-15 USD/año)
- **Porkbun** (~$10 USD/año, mi favorito)
- **Google Domains / Squarespace Domains**

### B) Conectar al sitio
1. **Si usas GitHub Pages:** Settings → Pages → Custom domain → `arqenriquez.com`
   - Luego en tu proveedor de dominio, configura los registros DNS según indique GitHub
2. **Si usas Netlify/Vercel** (recomendado a futuro): Settings → Domains → Add custom domain
   - Sigue las instrucciones de DNS

⏱ Los DNS pueden tardar de 5 minutos a 24 horas en propagarse.

---

## 🆘 Problemas comunes

### Live Server no abre el sitio
- Asegúrate de tener `index.html` en la raíz, no dentro de otra carpeta
- Reinicia VS Code

### Las fuentes no cargan
- Verifica tu conexión a internet (Bricolage e Inter vienen de Google Fonts)
- Si necesitas ofline, podemos descargar las fuentes a `/assets/fonts/`

### Git pide usuario y password
- Ya no se puede usar password en GitHub. Crea un **Personal Access Token**:
  https://github.com/settings/tokens → Generate new token (classic) → marca `repo` → cópialo y úsalo como password

### El modo oscuro no se guarda al recargar
- Verifica que tu navegador permita `localStorage`. En modo incógnito a veces se desactiva.

---

## 🎓 Conceptos clave que aprendiste

1. **HTML semántico** — `<nav>`, `<main>`, `<section>`, `<article>` no son arbitrarios; le dicen al navegador y a Google qué es cada cosa.
2. **CSS Variables (`--var`)** — definir colores y tamaños una sola vez en `:root` y reutilizarlos. Cambias 1 línea, cambia todo el sitio.
3. **Mobile-first vs desktop-first** — usamos `@media (max-width: ...)` (desktop-first), pero también puedes hacer `@media (min-width: ...)` (mobile-first). Ambas funcionan.
4. **Toggle de tema con `data-theme`** — un atributo en el `<html>` que cambia toda la paleta vía CSS variables.
5. **`localStorage`** — la memoria del navegador donde guardamos preferencias (como el tema elegido).
6. **Git/GitHub workflow** — `add → commit → push`. Repite hasta que muera el universo.

---

¿Dudas? Vuelve a este chat y pregúntame. 🎯
