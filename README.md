# Pa' Donde Apunte la Moto — web estática inicial

Esta versión está hecha con HTML, CSS y JavaScript puro. No usa React, Vite, npm ni frameworks.

## Archivos
- `index.html`: página principal y catálogo de tres rodadas.
- `tour-manai.html`: ficha de Manai – Cascadas del Chupal.
- `tour-villa-de-leyva.html`: ficha de Villa de Leyva.
- `tour-tatacoa.html`: ficha del desierto de la Tatacoa.
- `styles.css`: diseño adaptable a computador y celular.
- `script.js`: menú móvil, filtros y formulario de consulta por WhatsApp.

## Abrir en su computador
1. Descomprima el ZIP.
2. Abra la carpeta en VS Code.
3. Abra `index.html` en su navegador. También puede instalar la extensión Live Server en VS Code para previsualizarla localmente.

## Antes de usar el formulario
En `script.js`, cambie:
`const WHATSAPP_NUMBER = "573000000000";`
por el número oficial de PDAM con indicativo de país, sin `+`, espacios ni guiones.

## Importante: esta es una maqueta de presentación, no una tienda lista para cobrar
- Los destinos que aparecen son ejemplos visuales; confirme rutas, fechas, inclusiones, cupos y precios antes de publicarlos como ofertas reales.
- Las fotos se cargan desde Unsplash y requieren conexión a internet. Sustitúyalas por fotografías propias cuando pueda.
- El formulario abre WhatsApp; no guarda solicitudes en una base de datos.
- No hay pago integrado ni reservas confirmadas.
- No ponga claves secretas de Wompi en `script.js`, HTML o CSS. Todo lo que se entrega al navegador es público.

## Para integrar Wompi de forma segura
Se necesita un backend (por ejemplo, Node.js) o un servicio backend confiable, una base de datos persistente, generación de firma de integridad en el servidor y validación de eventos/webhooks. La página estática puede seguir siendo HTML/CSS/JS; el backend se usa solamente para la lógica privada de pagos y reservas.

Documentación oficial: https://docs.wompi.co/


## Paleta visual
La versión actual usa una paleta inspirada en el logo de PDAM: rojo, negro, blanco y grises neutros. El color de acento principal es rojo (#B6242B).

La imagen panorámica de la portada está guardada en `assets/pdam-hero.png` y se carga localmente desde `styles.css`.


## Tres rutas de muestra
- Manai – Cascadas del Chupal: $299.000 tentativos, 7–8 de noviembre de 2026.
- Villa de Leyva por caminos alternos: $499.000 tentativos, 20–22 de noviembre de 2026.
- Desierto de la Tatacoa: $699.000 tentativos, 11–13 de diciembre de 2026.

Los botones actuales llevan a las fichas o al formulario de interés; no son enlaces de pago reales. Para cobrar en línea se debe configurar una pasarela como Wompi, con backend, firma de integridad y validación de pagos.
