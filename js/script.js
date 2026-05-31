/* ============================================================================
   ARQENRIQUEZ.COM — JAVASCRIPT
   Marca personal de Jorge Enríquez
   ----------------------------------------------------------------------------
   FUNCIONALIDADES:
   1. Toggle de tema (claro/oscuro) con persistencia en localStorage
   2. Palabra rotativa en el Hero
   3. Menú hamburguesa móvil
   4. Año dinámico en el footer
   5. Manejo del formulario de cursos

   FILOSOFÍA: usamos vanilla JS (sin librerías) porque el sitio es ligero
   y no necesitamos React ni nada pesado. Esto carga súper rápido.
============================================================================ */

(function () {
  'use strict';   // modo estricto = JS más seguro y predecible

  /* ==========================================================================
     1. TOGGLE DE TEMA (CLARO / OSCURO)
     --------------------------------------------------------------------------
     Lógica:
     - Al cargar la página, leer la preferencia guardada en localStorage.
     - Si no hay preferencia, usar la del sistema operativo del usuario.
     - Al hacer click, alternar entre 'light' y 'dark' y guardar la elección.
  ========================================================================== */

  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const STORAGE_KEY = 'arqenriquez-theme';

  /**
   * Determina el tema inicial:
   * 1. Si el usuario eligió uno antes, lo respetamos (localStorage)
   * 2. Si no, miramos la preferencia del sistema (prefers-color-scheme)
   * 3. Si nada, usamos 'light' como default
   */
  function getInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;

    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPrefersDark ? 'dark' : 'light';
  }

  /**
   * Aplica el tema al <html> y actualiza el ícono del botón
   */
  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    const icon = themeToggle ? themeToggle.querySelector('.theme-icon') : null;
    if (icon) {
      icon.textContent = theme === 'dark' ? '☀' : '◐';
    }
  }

  // Aplicar tema inicial al cargar
  applyTheme(getInitialTheme());

  // Listener del botón
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const current = html.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }


  /* ==========================================================================
     2. PALABRA ROTATIVA EN EL HERO + SINCRONIZACIÓN CON EL CARRUSEL
     --------------------------------------------------------------------------
     - Cambia la palabra cada WORD_INTERVAL_MS (2.8s) con un fade.
     - El carrusel queda SINCRONIZADO con la rotación de palabras:
         · 6 palabras emparejadas con 3 slides (2 palabras por slide)
         · El estado inicial muestra "voz alta" sobre Hero 3
         · Cuando aparece la siguiente palabra ("Arquitectura"), el slide
           avanza a Hero 1. Por eso el slide cambia en ticks IMPARES (1,3,5).

     PAREJAS PALABRA ↔ SLIDE:
       Slide 3 (Hero 3) → "voz alta"   ─┐ inicial
       Slide 1 (Hero 1) → "Arquitectura" ┤
       Slide 1 (Hero 1) → "Sistemas"     ┘
       Slide 2 (Hero 2) → "Código"    ─┐
       Slide 2 (Hero 2) → "IA"          ┘
       Slide 3 (Hero 3) → "Fe en Dios"  ← cierra el ciclo y vuelve a "voz alta"
  ========================================================================== */

  const words = ['voz alta', 'Arquitectura', 'Sistemas', 'Código', 'IA', 'Fe en Dios'];
  const rotateEl = document.getElementById('rotateWord');
  const WORD_INTERVAL_MS = 2800;
  const WORDS_PER_SLIDE = 2;        // cada N cambios de palabra, avanza el slide
  let wordIndex = 0;
  let wordChangeCount = 0;          // contador de rotaciones de palabra

  // Hook que el carrusel asignará en el bloque 6. No-op por defecto.
  let advanceHeroCarousel = function () {};

  if (rotateEl) {
    setInterval(function () {
      // Avanzamos al siguiente índice (vuelve a 0 al final)
      wordIndex = (wordIndex + 1) % words.length;
      wordChangeCount++;

      // Fade out
      rotateEl.style.opacity = '0';

      // Después de 300ms cambiamos el texto y hacemos fade in
      setTimeout(function () {
        rotateEl.textContent = words[wordIndex];
        rotateEl.style.opacity = '1';
      }, 300);

      // El slide avanza en ticks IMPARES (1, 3, 5...) — esto sincroniza
      // el "voz alta" inicial con Hero 3 y al cambiar a "Arquitectura"
      // saltamos a Hero 1.
      if (wordChangeCount % WORDS_PER_SLIDE === 1) {
        advanceHeroCarousel();
      }
    }, WORD_INTERVAL_MS);
  }


  /* ==========================================================================
     3. MENÚ HAMBURGUESA (MÓVIL)
     --------------------------------------------------------------------------
     - Click en hamburguesa → abre/cierra menú
     - Click en un link del menú → cierra menú automáticamente
     - aria-expanded se actualiza para accesibilidad
  ========================================================================== */

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  function toggleMobileMenu() {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-active');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');

    // Bloquear scroll del body cuando el menú está abierto
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', toggleMobileMenu);

    // Cerrar el menú al hacer click en un link interno
    const internalLinks = navLinks.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (navLinks.classList.contains('is-open')) {
          toggleMobileMenu();
        }
      });
    });
  }


  /* ==========================================================================
     4. AÑO DINÁMICO EN EL FOOTER
     --------------------------------------------------------------------------
     Para que nunca tengas que actualizar el año manualmente.
  ========================================================================== */

  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }


  /* ==========================================================================
     4.1 HELPERS COMPARTIDOS PARA EL SISTEMA DE BLOG
     --------------------------------------------------------------------------
     Funciones usadas por TODO lo que renderiza artículos:
     - 4.2 grid de la portada (#blogGrid con data-limit="3")
     - 4.3 lista de la página de archivo (#archiveList)
     - 4.4 conteo dinámico en "Explorar por tema"
  ========================================================================== */

  const meses = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN',
                 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

  /**
   * Convierte "2026-05-13" en "13 MAY 2026" (formato display).
   * El sufijo T00:00:00 evita corrimientos de fecha por zona horaria.
   */
  function formatearFecha(iso) {
    const d = new Date(iso + 'T00:00:00');
    if (isNaN(d.getTime())) return iso;
    return d.getDate() + ' ' + meses[d.getMonth()] + ' ' + d.getFullYear();
  }

  /**
   * Escapa caracteres HTML para evitar XSS si en el futuro el contenido
   * de articulos.js viniera de una fuente externa.
   */
  function escaparHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /**
   * Normaliza un string para comparación de categorías:
   * - quita acentos (TEOLOGÍA → TEOLOGIA)
   * - reemplaza guiones por espacios (project-management → project management)
   * - lo deja en minúsculas
   * Permite comparar "?cat=teologia" del URL con "TEOLOGÍA" del JSON.
   */
  function normalizarCategoria(str) {
    const sinAcentos = { 'á':'a', 'é':'e', 'í':'i', 'ó':'o', 'ú':'u', 'ñ':'n',
                         'Á':'a', 'É':'e', 'Í':'i', 'Ó':'o', 'Ú':'u', 'Ñ':'n' };
    return String(str || '')
      .replace(/[áéíóúñÁÉÍÓÚÑ]/g, function (c) { return sinAcentos[c] || c; })
      .toLowerCase()
      .replace(/-/g, ' ')
      .trim();
  }

  /**
   * Devuelve los artículos ordenados por fecha descendente (los nuevos arriba).
   */
  function getArticulosOrdenados() {
    if (!Array.isArray(window.ARTICULOS)) return [];
    return window.ARTICULOS.slice().sort(function (a, b) {
      return (b.date || '').localeCompare(a.date || '');
    });
  }


  /* ==========================================================================
     4.2 GRID DE LA PORTADA (#blogGrid)
     --------------------------------------------------------------------------
     - Si #blogGrid tiene data-limit="N", solo mostramos los N más recientes
     - Sin data-limit, mostramos todos
  ========================================================================== */

  const blogGrid = document.getElementById('blogGrid');

  if (blogGrid && Array.isArray(window.ARTICULOS)) {
    const articulosOrdenados = getArticulosOrdenados();
    const limitAttr = parseInt(blogGrid.getAttribute('data-limit'), 10);
    const articulosAMostrar = limitAttr > 0
      ? articulosOrdenados.slice(0, limitAttr)
      : articulosOrdenados;

    blogGrid.innerHTML = articulosAMostrar.map(function (art) {
      const fecha = art.date ? formatearFecha(art.date) : '';
      const slug = escaparHTML(art.slug);
      const imageSrc = 'assets/images/articulos/' + slug + '.jpg';

      return ''
        + '<a class="article-card" href="articulos/' + slug + '.html">'
        +   '<div class="article-card-img-wrap">'
        +     '<img class="article-card-img" src="' + imageSrc + '" alt="" loading="lazy"'
        +       ' onerror="this.parentElement.style.display=\'none\'">'
        +   '</div>'
        +   '<div class="article-card-content">'
        +     '<div class="article-meta">'
        +       '<span class="article-cat">' + escaparHTML(art.category || '') + '</span>'
        +       '<span>· ' + escaparHTML(art.readTime || '') + '</span>'
        +       (fecha ? '<span>· ' + fecha + '</span>' : '')
        +     '</div>'
        +     '<h3>' + escaparHTML(art.title || '') + '</h3>'
        +     '<p>' + escaparHTML(art.excerpt || '') + '</p>'
        +   '</div>'
        + '</a>';
    }).join('');
  }


  /* ==========================================================================
     4.3 PÁGINA DE ARCHIVO (articulos.html) — TABS + LISTADO + FILTRO
     --------------------------------------------------------------------------
     Solo se ejecuta si encuentra los contenedores #archiveTabs y #archiveList.
     - Genera las pestañas DINÁMICAMENTE desde las categorías que existen
     - Renderiza la lista de artículos en formato fila (no grid)
     - Si la URL tiene ?cat=xxx, pre-activa esa pestaña al cargar
     - Click en una pestaña → filtra la lista en vivo
  ========================================================================== */

  const archiveTabs = document.getElementById('archiveTabs');
  const archiveList = document.getElementById('archiveList');
  const archiveEmpty = document.getElementById('archiveEmpty');

  if (archiveTabs && archiveList && Array.isArray(window.ARTICULOS)) {

    const articulosArchive = getArticulosOrdenados();

    // 1. Categorías para las pestañas:
    //    - Empezamos con la lista MAESTRA (window.CATEGORIAS) — todas
    //      aparecen aunque no tengan artículos. Si vacía, muestra el mensaje
    //      "No hay artículos en esta categoría todavía".
    //    - Añadimos cualquier categoría "huérfana" detectada en los artículos
    //      (defensivo: protege contra typos o cambios fuera de la lista).
    //    - Ordenamos alfabéticamente.
    const categoriasUnicas = Array.isArray(window.CATEGORIAS)
      ? window.CATEGORIAS.slice()
      : [];
    articulosArchive.forEach(function (art) {
      if (art.category && categoriasUnicas.indexOf(art.category) === -1) {
        categoriasUnicas.push(art.category);
      }
    });
    categoriasUnicas.sort();

    // 2. Generar pestañas (la primera "Todas" siempre)
    let tabsHTML = '<button class="tab is-active" data-cat="" type="button">Todas</button>';
    categoriasUnicas.forEach(function (cat) {
      tabsHTML += '<button class="tab" data-cat="' + escaparHTML(cat) + '" type="button">'
                + escaparHTML(cat) + '</button>';
    });
    archiveTabs.innerHTML = tabsHTML;

    // 3. Función que renderiza la lista filtrada
    function renderArchiveList(catFilter) {
      const filtrados = catFilter
        ? articulosArchive.filter(function (a) { return a.category === catFilter; })
        : articulosArchive;

      if (filtrados.length === 0) {
        archiveList.innerHTML = '';
        if (archiveEmpty) archiveEmpty.hidden = false;
        return;
      }
      if (archiveEmpty) archiveEmpty.hidden = true;

      archiveList.innerHTML = filtrados.map(function (art) {
        const fecha = art.date ? formatearFecha(art.date) : '';
        const slug = escaparHTML(art.slug);
        const imageSrc = 'assets/images/articulos/' + slug + '.jpg';

        return ''
          + '<a class="article-row" href="articulos/' + slug + '.html">'
          +   '<div class="article-row-img-wrap">'
          +     '<img class="article-row-img" src="' + imageSrc + '" alt="" loading="lazy"'
          +       ' onerror="this.parentElement.style.background=\'var(--surface-2)\';this.style.display=\'none\'">'
          +   '</div>'
          +   '<div class="article-row-content">'
          +     '<div class="article-meta">'
          +       '<span class="article-cat">' + escaparHTML(art.category || '') + '</span>'
          +       '<span>· ' + escaparHTML(art.readTime || '') + '</span>'
          +       (fecha ? '<span>· ' + fecha + '</span>' : '')
          +     '</div>'
          +     '<h3>' + escaparHTML(art.title || '') + '</h3>'
          +     '<p>' + escaparHTML(art.excerpt || '') + '</p>'
          +   '</div>'
          + '</a>';
      }).join('');
    }

    // 4. Activa una pestaña visualmente (sin renderizar — eso lo hace el caller)
    function activarTab(catValue) {
      const tabs = archiveTabs.querySelectorAll('.tab');
      tabs.forEach(function (t) {
        t.classList.toggle('is-active', t.getAttribute('data-cat') === catValue);
      });
    }

    // 5. Click en una pestaña → filtra y activa
    archiveTabs.addEventListener('click', function (e) {
      const tab = e.target.closest('.tab');
      if (!tab) return;
      const cat = tab.getAttribute('data-cat');
      activarTab(cat);
      renderArchiveList(cat);
    });

    // 6. Al cargar: leer ?cat=xxx del URL para pre-activar pestaña
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');

    if (catParam) {
      // Buscamos la categoría real (normalizando) entre las disponibles
      const catNormalizado = normalizarCategoria(catParam);
      const matchCategoria = categoriasUnicas.find(function (cat) {
        return normalizarCategoria(cat) === catNormalizado;
      });

      if (matchCategoria) {
        activarTab(matchCategoria);
        renderArchiveList(matchCategoria);
      } else {
        // El parámetro existe pero no coincide con ninguna categoría → mostrar todas
        renderArchiveList('');
      }
    } else {
      renderArchiveList('');   // sin parámetro: mostrar todas
    }
  }


  /* ==========================================================================
     4.4 CONTEOS DINÁMICOS EN "EXPLORAR POR TEMA"
     --------------------------------------------------------------------------
     Cada card .cat tiene un data-cat con el nombre EXACTO de la categoría.
     Aquí contamos cuántos artículos hay y reemplazamos el "00 escritos"
     hardcodeado por el conteo real.
  ========================================================================== */

  const catCards = document.querySelectorAll('.cat[data-cat]');

  if (catCards.length > 0 && Array.isArray(window.ARTICULOS)) {
    catCards.forEach(function (card) {
      const cat = card.getAttribute('data-cat');
      const count = window.ARTICULOS.filter(function (a) {
        return a.category === cat;
      }).length;

      const countEl = card.querySelector('.cat-count');
      if (countEl) {
        if (count === 0)        countEl.textContent = 'Próximamente';
        else if (count === 1)   countEl.textContent = '1 escrito';
        else                    countEl.textContent = count + ' escritos';
      }
    });
  }


  /* ==========================================================================
     4.5 BOTONES DE COMPARTIR EN REDES (PÁGINAS DE ARTÍCULO)
     --------------------------------------------------------------------------
     Solo se ejecuta en páginas de artículo (detecta .article-page + footer).
     - Construye los enlaces de compartir con la URL y título REALES de la
       página en tiempo de ejecución → funciona automáticamente para CUALQUIER
       artículo, presente o futuro, sin tocar el HTML.
     - El bloque se inserta justo ANTES del footer "ESCRITO POR".

     NOTA: los enlaces solo serán útiles cuando el sitio esté PUBLICADO online.
     Si abres el artículo con doble click (file://), compartirá la ruta local.

     ¿Quieres quitar una red? Borra su línea del array `redes`.
  ========================================================================== */

  const articlePage = document.querySelector('.article-page');
  const articleFooter = document.querySelector('.article-footer');

  if (articlePage && articleFooter) {
    const urlActual = window.location.href;
    const tituloEl = document.querySelector('.article-title');
    const tituloArticulo = tituloEl ? tituloEl.textContent.trim() : document.title;

    const u = encodeURIComponent(urlActual);       // URL codificada
    const t = encodeURIComponent(tituloArticulo);  // título codificado

    const redes = [
      { nombre: 'X',        url: 'https://x.com/intent/tweet?text=' + t + '&url=' + u },
      { nombre: 'Facebook', url: 'https://www.facebook.com/sharer/sharer.php?u=' + u },
      { nombre: 'LinkedIn', url: 'https://www.linkedin.com/sharing/share-offsite/?url=' + u },
      { nombre: 'WhatsApp', url: 'https://wa.me/?text=' + t + '%20' + u }
    ];

    const botonesHTML = redes.map(function (red) {
      return '<a class="share-btn" href="' + red.url + '"'
           + ' target="_blank" rel="noopener noreferrer">' + red.nombre + '</a>';
    }).join('');

    const shareHTML = ''
      + '<div class="article-share">'
      +   '<div class="container">'
      +     '<p class="article-share-label">COMPARTIR ESTE ARTÍCULO</p>'
      +     '<div class="article-share-buttons">' + botonesHTML + '</div>'
      +   '</div>'
      + '</div>';

    // Insertamos el bloque justo antes del footer del autor
    articleFooter.insertAdjacentHTML('beforebegin', shareHTML);
  }


  /* ==========================================================================
     5. FORMULARIO DE CURSOS
     --------------------------------------------------------------------------
     De momento solo simula el envío. Cuando montes el sitio, conecta esto
     a un servicio como Formspree, Netlify Forms, o tu propio backend.
  ========================================================================== */

  const emailForm = document.getElementById('emailForm');

  if (emailForm) {
    emailForm.addEventListener('submit', function (event) {
      event.preventDefault();   // evita que la página se recargue

      const input = emailForm.querySelector('input[type="email"]');
      const button = emailForm.querySelector('button');
      const email = input.value.trim();

      if (!email) return;

      // Aquí, en el futuro, harías el fetch() a tu endpoint:
      // fetch('https://formspree.io/f/TU_ID', { method: 'POST', body: JSON.stringify({ email }) })

      // Por ahora, simulamos éxito
      input.value = '';
      input.placeholder = '¡Gracias! Te avisaré.';
      button.textContent = '✓ Listo';
      button.disabled = true;

      setTimeout(function () {
        input.placeholder = 'tu@correo.com';
        button.textContent = 'Avisarme';
        button.disabled = false;
      }, 4000);
    });
  }


  /* ==========================================================================
     6. CARRUSEL DEL HERO
     --------------------------------------------------------------------------
     Lógica:
     - El carrusel NO tiene autoplay propio: lo dispara la rotación de
       palabras (sección 2) a través del hook `advanceHeroCarousel`.
     - Las flechas y los puntos siguen permitiendo navegar manualmente.
     - Esto garantiza que la palabra y la imagen estén siempre en cadencia.
  ========================================================================== */

  const carousel = document.getElementById('heroCarousel');

  if (carousel) {
    const slides = carousel.querySelectorAll('.slide');
    const dots = carousel.querySelectorAll('.dot');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');

    // Leemos cuál slide arranca activo desde el HTML (clase .is-active).
    // Así, si en el HTML cambias el slide inicial, este JS se ajusta solo.
    let currentSlide = 0;
    slides.forEach(function (slide, i) {
      if (slide.classList.contains('is-active')) currentSlide = i;
    });

    /**
     * Muestra el slide indicado por su índice y actualiza los puntos.
     */
    function goToSlide(index) {
      // Normalizamos el índice para que dé la vuelta (módulo)
      currentSlide = (index + slides.length) % slides.length;

      slides.forEach(function (slide, i) {
        slide.classList.toggle('is-active', i === currentSlide);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === currentSlide);
      });
    }

    function nextSlide() { goToSlide(currentSlide + 1); }
    function prevSlide() { goToSlide(currentSlide - 1); }

    // Conectamos el hook compartido para que la rotación de palabras
    // (sección 2) pueda avanzar el carrusel cada N palabras.
    advanceHeroCarousel = nextSlide;

    // Listeners de las flechas (navegación manual)
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Listeners de los puntos (navegación manual a un slide específico)
    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        const target = parseInt(dot.getAttribute('data-target'), 10);
        goToSlide(target);
      });
    });
  }


  /* ==========================================================================
     7. INTERSECTION OBSERVER — FADE-IN AL SCROLL (BONUS)
     --------------------------------------------------------------------------
     Cuando una sección entra en la pantalla, le añadimos la clase 'fade-in'
     para que aparezca con animación.
  ========================================================================== */

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);   // se anima una sola vez
        }
      });
    }, observerOptions);

    // Observamos los elementos con clase .article-card, .cat, .proj-card
    const animatedElements = document.querySelectorAll('.article-card, .cat, .proj-card');
    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  }

})();
