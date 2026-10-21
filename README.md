# Logostudio.Pinklion

Sitio web de **Logostudio.Pinklion**, estudio de branding de Susana Cortés en Guadalajara, Jalisco, México.

Es un sitio estático (HTML, CSS y JavaScript) listo para publicarse con **GitHub Pages**. No necesita servidor ni base de datos.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub, por ejemplo `pinklion`. Hazlo **público** (GitHub Pages gratis requiere repositorio público).
2. Sube **todo el contenido** de esta carpeta a la raíz del repositorio (`index.html` debe quedar en la raíz, no dentro de otra carpeta). Incluye el archivo oculto `.nojekyll`.
3. En el repositorio ve a **Settings → Pages**.
4. En *Build and deployment* elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`. Guarda.
5. En unos minutos el sitio queda en `https://TU-USUARIO.github.io/pinklion/`.
6. Marca **Enforce HTTPS** en la misma pantalla.

### Usar tu propio dominio

1. En **Settings → Pages → Custom domain** escribe tu dominio (por ejemplo `logostudiopinklion.com`) y guarda. GitHub crea un archivo `CNAME`.
2. En el panel de tu dominio, agrega estos registros DNS:
   - Para el dominio raíz: cuatro registros **A** que apunten a `185.199.108.153`, `185.199.109.153`, `185.199.110.153` y `185.199.111.153`.
   - Para `www`: un registro **CNAME** que apunte a `TU-USUARIO.github.io`.
3. Cuando GitHub confirme el dominio, marca **Enforce HTTPS**.

## Qué editar

| Archivo | Para qué |
| --- | --- |
| `js/pagos-config.js` | Tus enlaces de PayPal, Mercado Pago y Stripe, el anticipo (50 %) y el descuento por pago completo (10 %). |
| `js/agenda-config.js` | Tu enlace de Calendly o Google Calendar para agendar citas (opcional). |
| `aviso-de-privacidad.html` | Completa tu domicilio y la fecha donde están los corchetes. |
| `plantilla-caso.html` | Plantilla para documentar un caso de portafolio. Duplícala por cada proyecto. |
| `img/trabajos/` | Portadas de los proyectos de portafolio. |

## Estructura

```
index.html              Inicio
trabajos.html           Portafolio
paquetes.html           Paquetes, precios, garantía y preguntas frecuentes
pagar.html              Pago en línea del paquete elegido
servicios.html          Más servicios y envíos
como-trabajamos.html    Proceso, pagos y preguntas frecuentes
estudio.html            Biografía
contacto.html           Cotización y agenda de citas (por WhatsApp)
factura.html            Solicitud de factura CFDI 4.0
aviso-de-privacidad.html
404.html
css/estilos.css
js/sitio.js
```

## Notas

- Los formularios no envían datos a ningún servidor: arman un mensaje y lo abren en WhatsApp.
- Los pagos con tarjeta se procesan en PayPal, Mercado Pago o Stripe; ningún dato de tarjeta pasa por este sitio.
- Algunas portadas de la página de Trabajos se cargan desde Behance. Para que no dependan de Behance, guárdalas en `img/trabajos/`.

© Logostudio.Pinklion by Susana Cortés 2026
