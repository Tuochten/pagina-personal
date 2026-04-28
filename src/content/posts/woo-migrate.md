---
title: "Migrar órdenes WooCommerce entre ambientes sin morir en el intento"
description: "Cómo migrar pedidos de producción a QA usando SQL directo y phpMyAdmin, sin romper nada en el camino."
date: 2025-04-20
tags: [Dev, WooCommerce, SQL]
glyph: "▣"
accent: gold
featured: true
readTime: "8 min lectura"
---

Migrar pedidos entre producción y QA parece simple hasta que lo intentas. WooCommerce guarda una orden en al menos cuatro tablas distintas y romper una FK en producción es la clase de error que termina con tu domingo. Esta es la receta que terminamos usando en Bigbuda — SQL directo, `INSERT IGNORE`, y cero puntos de drama.

## El contexto

En Bigbuda necesitábamos replicar pedidos reales en QA para testear una migración importante. La opción "exportar todo desde el panel de WordPress" simplemente no existe — las herramientas oficiales no incluyen pedidos completos con sus metas e items. Y los plugins comerciales que sí lo hacen cuestan más de lo que queríamos justificar para un script que íbamos a usar tres veces.

<Callout kind="warn">
**Antes de empezar:** haz un backup completo de la base de datos de destino. Un `mysqldump` de cinco minutos te puede salvar horas de rollback más adelante. No es opcional.
</Callout>

## Las tablas involucradas

WooCommerce distribuye una orden en al menos cuatro tablas principales. Necesitas exportarlas en el orden correcto para respetar las foreign keys, o el destino va a rechazar todo en silencio:

- `wp_posts` — la orden como tipo `shop_order`
- `wp_postmeta` — datos del cliente, totales, dirección
- `wp_woocommerce_order_items` — productos del pedido
- `wp_woocommerce_order_itemmeta` — variaciones, atributos

```sql
-- 1. Orden principal
SELECT * FROM wp_posts
  WHERE post_type = 'shop_order'
  AND post_date > '2025-04-13';

-- 2. Meta de la orden
SELECT * FROM wp_postmeta
  WHERE post_id IN (...ids...);

-- 3. Items de la orden
SELECT * FROM wp_woocommerce_order_items
  WHERE order_id IN (...ids...);
```

### Generar el listado de IDs

El truco está en armar el `IN (...ids...)` a partir del primer query. phpMyAdmin tiene un export rápido que ya lo formatea como lista comaseparada — copia, pega, sigue.

## El approach: INSERT IGNORE

Para evitar errores por IDs duplicados en QA usamos `INSERT IGNORE` en lugar del `INSERT` estándar. Si el registro ya existe lo salta, sin reventar el resto del script. Para una migración idempotente esto es oro.

<Callout kind="tip">
**Pro tip:** en phpMyAdmin, Export → Custom → activa "INSERT IGNORE" en las opciones de generación. Te ahorras editar el archivo manualmente con un `sed -i` después.
</Callout>

## Resultado final

Con este método migramos 340 órdenes en menos de 10 minutos, sin conflictos de FK y con todos los metadatos intactos. El ambiente QA quedó listo para testear el flujo completo — y nosotros volvimos a almorzar a una hora razonable.

Herramientas que usé: phpMyAdmin en ambos ambientes, un editor de texto para ajustar los `IN (...)` y nada más. Sin plugins, sin scripts de Python, sin dependencias externas. A veces SQL directo es la mejor opción.
