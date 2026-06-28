/* ============================================================================
   ARQENRIQUEZ.COM — LISTADO DE ARTÍCULOS
   ----------------------------------------------------------------------------
   Esta es la "base de datos" de tus escritos. Es un archivo .js (no .json)
   por una razón muy práctica: si abres index.html con doble click (file://),
   el navegador BLOQUEA la carga de archivos .json por seguridad. Un archivo
   .js sí se carga sin problemas. La estructura interna es idéntica a JSON.

   ===========================================================================
   CÓMO AÑADIR UN ARTÍCULO NUEVO (4 pasos)
   ===========================================================================
   1. Duplica el archivo  /articulo-template.html
   2. Renómbralo a        /articulos/<slug>.html   (mismo slug que abajo)
   3. Edita ese HTML: título, fecha, contenido
   4. Añade un nuevo objeto { ... } al INICIO de este array (los más nuevos
      arriba — así aparecen primero en la portada)

   La portada se actualiza sola, no tocas index.html.

   ===========================================================================
   CAMPOS DE CADA ARTÍCULO
   ===========================================================================
     slug      → nombre del archivo HTML SIN extensión, en kebab-case
                 (sin espacios, sin acentos, sin mayúsculas, palabras-con-guiones)
     title     → título visible en la card y en la página del artículo
     excerpt   → 1-2 líneas de resumen, visible en la card
     category  → debe ser uno de los valores en window.CATEGORIAS (ver abajo).
                 Los valores van en MAYÚSCULAS, igual que en las secciones del index.
                 RANDOM se usa para artículos que no encajan en ninguna otra categoría.
     date      → "YYYY-MM-DD" — ej: "2026-05-13"
     readTime  → tiempo aproximado de lectura — ej: "8 MIN"
============================================================================ */


/* ============================================================================
   LISTA MAESTRA DE CATEGORÍAS
   ----------------------------------------------------------------------------
   Estas son TODAS las categorías que existen en el sitio, aparezcan o no en
   los artículos publicados. Las pestañas de la página de archivo se generan
   desde aquí, así que todas se muestran (incluso vacías) y mantienen
   consistencia con el grid de "Explorar por tema" del index.

   PARA AÑADIR UNA CATEGORÍA NUEVA:
     1. Añade el nombre EN MAYÚSCULAS aquí
     2. Añade la card correspondiente en index.html (sección "Por tema")
     3. Listo — la pestaña aparecerá en /articulos.html automáticamente
============================================================================ */

window.CATEGORIAS = [
  'ARQUITECTURA',
  'FILOSOFÍA',
  'IA',
  'MARKETING',
  'PROJECT MANAGEMENT',
  'RANDOM',
  'TEOLOGÍA'
];


window.ARTICULOS = [

  {
    slug: "last-planner-system",
    title: "¿Por qué la mitad de lo que prometes el lunes es mentira el viernes?",
    excerpt: "Last Planner® System: la revolución silenciosa que convierte la planificación de obra en compromisos reales y acaba con el caos, los retrabajos y los retrasos.",
    category: "PROJECT MANAGEMENT",
    date: "2026-06-27",
    readTime: "8 MIN"
  },

  {
    slug: "la-humilde-revolucion-de-la-checklist",
    title: "¿Por qué fallamos incluso cuando somos expertos?",
    excerpt: "La humilde revolución de la lista de comprobación: cómo una simple hoja de papel puede vencer al genio individual cuando la presión aumenta.",
    category: "PROJECT MANAGEMENT",
    date: "2026-06-23",
    readTime: "7 MIN"
  },

  {
    slug: "la-habilidad-de-concentrarse",
    title: "La Habilidad de concentrarse",
    excerpt: "La habilidad de concentrarse es fundamental en este mundo distraído.",
    category: "RANDOM",
    date: "2026-05-10",
    readTime: "5 MIN"
  },

  {
    slug: "aprendizaje-infinito",
    title: "Aprendizaje Infinito",
    excerpt: "¿Cuántas horas de tu vida le dedicaste este año al aprendizaje y a tu crecimiento?",
    category: "RANDOM",
    date: "2020-07-20",
    readTime: "7 MIN"
  },

  {
  slug: "meditacion-sobre-la-existencia-de-dios",
  title: "Meditación sobre la existencia de Dios",
  excerpt: "No hay tema que no haya sido más recurrente en mi cabeza que el de la existencia de Dios. Con Él, todo tiene sentido; sin Él, la existencia es absurda.",
  category: "TEOLOGÍA",
  date: "2026-05-15",
  readTime: "10 MIN"
},

  {
    slug: "la-madurez-humana-en-tiempos-de-ia",
    title: "La madurez humana en tiempos de IA",
    excerpt: "La Inteligencia Artifical amplifica lo que ya somos. ¿Estamos realmente preparados para convivir con una inteligencia artificial tan poderosa?.",
    category: "IA",
    date: "2026-05-14",
    readTime: "8 MIN"
  },
  {
    slug: "el-mito-del-columnista",
    title: "El mito del columnista",
    excerpt: "Si quieres hablar de ideas, probablemente tendrás que hacerlo gratis. Y si quieres vivir de ello, mejor dedícate a otra cosa.",
    category: "RANDOM",
    date: "2026-05-13",
    readTime: "7 MIN"
  }
];
