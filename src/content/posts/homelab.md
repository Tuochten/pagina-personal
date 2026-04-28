---
title: "Pi-hole + Nextcloud + VPN en Docker: mi stack personal"
description: "Tres contenedores que reemplazan medio Google sin pagar suscripciones ni rendir tus datos."
date: 2025-03-12
tags: [Homelab, Docker, Self-hosted]
glyph: "◈"
accent: green
featured: false
readTime: "8 min"
---

Llevar un homelab no tiene que ser complicado. Con un SBC de 50 dólares, Docker y tres archivos `compose.yml`, puedes recuperar el control de bastantes servicios que hoy le regalas a Google o Apple. Este es el stack que tengo corriendo hace un año, sin downtime relevante y sin mover un dedo en mantenimiento.

## Por qué self-hosted

La respuesta corta: privacidad + costo. La larga: cuando eres CTO de una empresa chica, tienes cierta mentalidad de "si puedo entenderlo, puedo correrlo yo mismo". No es para todos — requiere tiempo de setup inicial y algo de tolerancia al debugging.

## Pi-hole: bloqueo de ads a nivel de red

Pi-hole actúa como DNS resolver para toda la red. Cualquier request a un dominio de anuncios o tracking simplemente no resuelve. No necesitas configurar nada por dispositivo.

```yaml
services:
  pihole:
    image: pihole/pihole:latest
    ports:
      - "53:53/tcp"
      - "53:53/udp"
      - "80:80/tcp"
    environment:
      TZ: America/Santiago
      WEBPASSWORD: ${PIHOLE_PASSWORD}
    volumes:
      - ./pihole/etc:/etc/pihole
    restart: unless-stopped
```

<Callout kind="info">
El puerto 53 en Linux puede estar ocupado por `systemd-resolved`. Si `docker compose up` falla con "address already in use", desactiva el servicio: `sudo systemctl disable systemd-resolved`.
</Callout>

## Nextcloud: reemplazo de Google Drive/Photos

Nextcloud es pesado comparado con Pi-hole, pero es el reemplazo más completo para Drive + Photos + Contacts + Calendar. Con una instancia bien configurada tienes sync automático desde el celular.

El punto de dolor es el performance en hardware limitado. La solución es usar Redis para caché de sesiones y PostgreSQL en vez de SQLite — hace una diferencia enorme.

## WireGuard: VPN para acceder desde fuera

La VPN te permite acceder a todos tus servicios locales de forma segura cuando estás fuera de casa. WireGuard es la opción moderna: más rápido que OpenVPN, configuración más simple.

## Resultado después de un año

Lo que funciona bien: Pi-hole es set-and-forget, Nextcloud sync es confiable, WireGuard nunca me ha fallado. Lo que requiere atención: los updates de Nextcloud a veces rompen plugins, hay que leer los changelogs antes de actualizar. En balance, vale la pena.
