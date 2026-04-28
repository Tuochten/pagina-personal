---
title: "DNS, Hosting y todo lo que falla en silencio"
description: "Por qué tu sitio Webflow se cae los domingos a las 3 AM y nadie te avisa hasta el lunes."
date: 2025-01-14
tags: [Webflow, DNS, Hosting]
glyph: "◐"
accent: green
featured: false
readTime: "6 min"
---

El peor tipo de fallo en producción no es el que te avisa. Es el que simplemente... deja de funcionar, en silencio, mientras tú duermes. Y el cliente lo descubre el lunes a las 9 AM cuando va a mostrarle el sitio a un proveedor.

Este post es sobre ese tipo de fallos. Los que viven en la capa de DNS y hosting, que son invisibles hasta que no lo son.

## Cómo funciona el ciclo de fallo típico

Un cliente cambia el plan de hosting. O renueva el dominio en el registrar equivocado. O el CDN del proveedor de Webflow tiene un incidente regional. En cualquiera de esos casos, el sitio puede dejar de responder y nadie recibe notificación porque nadie configuró alertas.

El patrón que veo repetirse: sitio desplegado en Webflow, dominio en Namecheap, sin monitoreo activo, sin fallback. Todo bien hasta que algo cambia en alguno de los tres.

## El problema con los TTLs largos

Cuando cambias un registro DNS, el cambio no es instantáneo. El TTL (Time To Live) del registro anterior determina cuánto tiempo los resolvers en caché siguen apuntando a la dirección vieja. Si el TTL era de 24 horas y lo bajaste recién cuando necesitabas hacer el cambio, ya es tarde.

```
; Configuración defensiva: bajar TTL antes de cualquier cambio planeado
wladi.dev.    300   IN  A    104.18.x.x
www.wladi.dev 300   IN  CNAME proxy-ssl.webflow.com.
```

<Callout kind="warn">
Baja el TTL a 300 segundos al menos 48 horas antes de cualquier migración. Así, si algo sale mal, la propagación del rollback es rápida.
</Callout>

## Monitoreo mínimo viable

No necesitas una solución enterprise. Con UptimeRobot (free tier) puedes tener alertas por email o Slack cuando el sitio no responde. Cinco minutos de configuración que pueden salvarte la relación con el cliente.

## El real problema

Técnicamente todo esto es solucionable y relativamente simple. El problema real es que nadie quiere pagar por "que el sitio siga funcionando". Solo por "que el sitio exista". Esa conversación es el verdadero trabajo.
