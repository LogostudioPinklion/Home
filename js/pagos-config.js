/* =========================================================
   CONFIGURACIÓN DE PAGOS EN LÍNEA — Logostudio.Pinklion
   Pega aquí tus enlaces de pago. Lo que dejes vacío ('') no se muestra.

   PayPal: escribe solo tu usuario de PayPal.me (ej. 'logostudiopinklion').
     El sitio arma el enlace con el monto del primer pago automáticamente.

   Mercado Pago y Stripe: crea DOS "Links de pago" por paquete y pega cada uno:
     - mercadopago / stripe: monto del primer pago (50 %)
     - mercadopagoCompleto / stripeCompleto: precio con 10 % de descuento (pago completo)
     - Mercado Pago: Tu negocio > Link de pago
     - Stripe: Payment Links > Crear enlace
   ========================================================= */
window.PINKLION_PAGOS = {
  paypalUsuario: '',            // ej. 'logostudiopinklion'
  anticipo: 0.5,                // primer pago: 50 % del precio
  descuentoPagoCompleto: 0.1,   // 10 % de descuento si paga el 100 % en el primer pago

  enlaces: {
    'Solo mi logo':                    { mercadopago: '', stripe: '', mercadopagoCompleto: '', stripeCompleto: '' },
    'Branding':                        { mercadopago: '', stripe: '', mercadopagoCompleto: '', stripeCompleto: '' },
    'Cafecito Negro':                  { mercadopago: '', stripe: '', mercadopagoCompleto: '', stripeCompleto: '' },
    'Capuchino':                       { mercadopago: '', stripe: '', mercadopagoCompleto: '', stripeCompleto: '' },
    'Mi Cafecito':                     { mercadopago: '', stripe: '', mercadopagoCompleto: '', stripeCompleto: '' },
    'Logo + identidad para Instagram': { mercadopago: '', stripe: '', mercadopagoCompleto: '', stripeCompleto: '' }
  }
};
