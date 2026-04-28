---
title: "Por qué reconstruí este blog en Astro (y casi vuelvo a WordPress)"
description: "Ganas en velocidad, pierdes en comodidad. El balance honesto después de tres meses."
date: 2024-12-20
tags: [Astro, Blog, Performance]
glyph: "✦"
accent: gold
featured: false
readTime: "7 min"
---

El blog anterior vivía en WordPress. Tema comprado, Elementor, un par de plugins de caché. Funcionaba. Nadie se quejaba. Hasta que me di cuenta de que cada vez que quería escribir un post terminaba peleando con el editor de bloques en vez de escribir.

La decisión de migrar a Astro fue parte pragmática y parte capricho de developer. Este post es el balance honesto, seis meses después.

## Lo que ganás

**Performance.** Sin discusión. El Time to First Byte de WordPress con caché decente era de ~300ms. En Astro estático en Netlify es de ~40ms. Para un blog personal sin mucho tráfico esto no cambia nada en la práctica, pero se siente bien.

**Control total.** Si quiero que el blog se vea exactamente de una manera, no tengo que pelear con el tema base. Escribo el HTML/CSS que quiero y eso es lo que existe.

**Markdown.** Escribir posts en Markdown con un editor de código es mucho más agradable que Gutenberg para mí. Puede que para otros sea al revés.

## Lo que perdés

**Comodidad.** WordPress tiene décadas de UX refinado para editors no técnicos. Astro no tiene CMS — tú editas archivos. Si el blog lo edita otra persona, esto es un problema real.

**Plugins.** Todo lo que en WordPress era "instalar plugin y listo" en Astro es "construir o integrar manualmente". Formulario de contacto, comentarios, newsletter — todo requiere trabajo.

**Tiempo inicial.** Montar el blog desde cero tomó mucho más de lo que esperaba. Cada detalle de diseño que WordPress daba gratis tuvo que ser construido.

<Callout kind="tip">
Si el blog es solo tuyo y te gusta escribir en código, Astro vale la pena. Si necesitas que otra persona lo edite o si quieres funcionalidad avanzada rápido, quédate en WordPress con un buen tema.
</Callout>

## El veredicto

No vuelvo a WordPress para este blog. Pero entiendo perfectamente por qué alguien elegiría no moverse. La mejor herramienta es la que te deja escribir sin obstáculos, y eso depende más de tu flujo de trabajo que de benchmarks de performance.
