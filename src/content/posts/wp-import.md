---
title: "Importar productos WooCommerce con WP All Import PRO"
description: "Mapeo de campos, imágenes destacadas y galerías. La guía que hubiera querido encontrar."
date: 2025-01-08
tags: [Dev, WordPress, WooCommerce]
glyph: "◇"
accent: gold
featured: false
readTime: "11 min"
---

WP All Import PRO es probablemente la herramienta de importación más potente que existe para WordPress. También es la que tiene la documentación más confusa. Esta es la guía que hubiera querido tener la primera vez que importé un catálogo de 3.000 productos con variaciones.

## Por qué WP All Import y no el importador nativo de WooCommerce

El importador nativo de WooCommerce hace el trabajo para catálogos simples: productos simples, un CSV limpio, sin imágenes complicadas. Pero en cuanto necesitas importar variaciones, galerías de imágenes, campos personalizados o lógica condicional, el importador nativo no alcanza.

WP All Import tiene un drag & drop mapper visual, soporte para XPath, funciones PHP personalizadas en el mapeo, y el plugin de WooCommerce Add-On que mapea directamente a los campos de producto.

## Preparar el archivo de datos

El formato más confiable es XML. CSV puede funcionar pero los problemas de encoding con caracteres españoles y comillas dentro de campos son frecuentes. Si recibes el catálogo en CSV, conviértelo a XML primero.

```xml
<productos>
  <producto>
    <sku>PROD-001</sku>
    <nombre>Nombre del producto</nombre>
    <precio>29900</precio>
    <stock>15</stock>
    <imagen>https://cdn.ejemplo.com/img/prod-001.jpg</imagen>
    <galeria>img1.jpg,img2.jpg,img3.jpg</galeria>
  </producto>
</productos>
```

<Callout kind="info">
WP All Import puede leer archivos de hasta 50MB directamente. Para archivos más grandes, usa la función de "split" del plugin que divide automáticamente el XML en chunks procesables.
</Callout>

## El mapeo de imágenes es donde todo falla

Las imágenes son el punto de dolor principal. WP All Import puede descargar imágenes desde URLs externas durante la importación, pero hay tres configuraciones que tienes que revisar:

- **Timeout**: sube el timeout de descarga a 60 segundos si las imágenes son pesadas
- **Cache**: activa "Download images only once" para re-importaciones
- **Galería**: el campo de galería de WooCommerce espera IDs de attachment, no URLs

Para la galería, el approach más confiable es importar primero solo las imágenes adicionales como attachments y luego asignarlas. O usar la función de PHP personalizado en el mapper.

## Variaciones: el caso más complejo

Los productos variables en WooCommerce son la parte más complicada de importar. La estructura requiere importar primero el producto padre y luego cada variación como entrada separada con `_variation_parent_id`.

La documentación oficial de WP All Import tiene un ejemplo para esto, pero está desactualizada para WooCommerce 8.x. Lo que funciona ahora es configurar el "parent identifier" en el Add-On usando el SKU del producto padre.

## Validar antes de publicar

Siempre importa en modo "draft" primero. Revisa 10-15 productos manualmente: precio, stock, imágenes, variaciones. Solo cuando estás seguro, cambia al modo "publish" y re-importa.

El tiempo que se "pierde" validando es el mismo tiempo que te ahorras explicándole al cliente por qué 3.000 productos tienen el precio en cero.
