/* Logostudio.Pinklion — comportamiento del sitio */
(function () {
  'use strict';
  var WHATSAPP = '523335594742';

  /* Menú móvil */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('menu');
  if (toggle && nav) {
    var close = function (focusBack) {
      nav.classList.remove('is-open');
      document.body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.querySelector('span').textContent = 'Menú';
      if (focusBack) toggle.focus();
    };
    toggle.addEventListener('click', function () {
      var open = !nav.classList.contains('is-open');
      if (!open) return close(false);
      nav.classList.add('is-open');
      document.body.classList.add('menu-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.querySelector('span').textContent = 'Cerrar';
      var first = nav.querySelector('a');
      if (first) first.focus();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) close(true);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) close(false);
    });
  }

  /* Botones de copiar */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      var done = function () {
        btn.textContent = 'Copiado';
        setTimeout(function () { btn.textContent = 'Copiar'; }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { btn.textContent = 'Cópialo a mano'; });
      } else {
        btn.textContent = 'Cópialo a mano';
      }
    });
  });

  /* Formulario de cotización: arma un mensaje y lo abre en WhatsApp */
  var form = document.getElementById('cotiza');
  if (!form) return;

  var params = new URLSearchParams(location.search);
  var interes = params.get('paquete') || params.get('servicio');
  if (interes) {
    var select = form.querySelector('#interes');
    Array.prototype.forEach.call(select.options, function (o) {
      if (o.value === interes) select.value = interes;
    });
  }

  var rules = {
    nombre: function (v) { return v.trim().length >= 2 ? '' : 'Falta tu nombre. Escribe cómo te llamas.'; },
    contacto: function (v) {
      var t = v.trim();
      if (!t) return 'Falta tu WhatsApp o correo. Escribe uno para poder responderte.';
      var digits = t.replace(/\D/g, '');
      var isMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
      if (!isMail && digits.length !== 10) return 'Revisa el dato. Escribe un WhatsApp de 10 dígitos (ej. 33 1234 5678) o un correo como nombre@correo.com.';
      return '';
    },
    negocio: function (v) { return v.trim() ? '' : 'Falta el tipo de negocio. Por ejemplo: cafetería, restaurante, tienda en línea.'; }
  };

  function check(id) {
    var input = form.querySelector('#' + id);
    var box = form.querySelector('#' + id + '-error');
    var msg = rules[id](input.value);
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    box.querySelector('span').textContent = msg;
    box.classList.toggle('is-visible', !!msg);
    return !msg;
  }

  Object.keys(rules).forEach(function (id) {
    form.querySelector('#' + id).addEventListener('blur', function () {
      if (this.value) check(id);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form.querySelector('#web').value) return; // campo trampa para bots
    var bad = Object.keys(rules).filter(function (id) { return !check(id); });
    if (bad.length) {
      form.querySelector('#' + bad[0]).focus();
      return;
    }
    var val = function (id) { return form.querySelector('#' + id).value.trim(); };
    var lines = [
      'Hola, quiero cotizar mi marca.',
      'Nombre: ' + val('nombre'),
      'Contacto: ' + val('contacto'),
      'Negocio: ' + val('negocio'),
      'Me interesa: ' + val('interes')
    ];
    if (val('mensaje')) lines.push('Mensaje: ' + val('mensaje'));
    var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(lines.join('\n'));

    var ok = document.getElementById('enviado');
    ok.querySelector('a').href = url;
    form.hidden = true;
    ok.hidden = false;
    ok.querySelector('h2').focus();
    window.open(url, '_blank', 'noopener');
  });
})();

/* Solicitud de factura: valida datos fiscales y los manda por WhatsApp */
(function () {
  'use strict';
  var form = document.getElementById('factura');
  if (!form) return;
  var rules = {
    razon: function (v) { return v.trim().length >= 3 ? '' : 'Falta tu nombre o razón social. Escríbelo como aparece en tu Constancia de Situación Fiscal.'; },
    rfc: function (v) {
      var t = v.trim().toUpperCase();
      if (!t) return 'Falta tu RFC.';
      return /^([A-ZÑ&]{3,4})\d{6}[A-Z0-9]{3}$/.test(t) ? '' : 'Revisa tu RFC. Debe tener 13 caracteres (persona física) o 12 (persona moral), por ejemplo GODE561231GR8.';
    },
    cp: function (v) { return /^\d{5}$/.test(v.trim()) ? '' : 'Revisa el código postal. Debe tener 5 dígitos, por ejemplo 44100.'; },
    correo: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Revisa el correo. Escríbelo como nombre@correo.com.'; }
  };
  function check(id) {
    var input = form.querySelector('#' + id), box = form.querySelector('#' + id + '-error');
    var msg = rules[id](input.value);
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    box.querySelector('span').textContent = msg;
    box.classList.toggle('is-visible', !!msg);
    return !msg;
  }
  Object.keys(rules).forEach(function (id) {
    form.querySelector('#' + id).addEventListener('blur', function () { if (this.value) check(id); });
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var bad = Object.keys(rules).filter(function (id) { return !check(id); });
    if (bad.length) { form.querySelector('#' + bad[0]).focus(); return; }
    var val = function (id) { return form.querySelector('#' + id).value.trim(); };
    var sel = function (id) { var s = form.querySelector('#' + id); return s.options[s.selectedIndex].text; };
    var lines = [
      'Hola, quiero solicitar mi factura.',
      'Nombre o razón social: ' + val('razon'),
      'RFC: ' + val('rfc').toUpperCase(),
      'Código postal fiscal: ' + val('cp'),
      'Régimen fiscal: ' + sel('regimen'),
      'Uso del CFDI: ' + sel('uso'),
      'Correo: ' + val('correo'),
      'Concepto: ' + val('concepto'),
      'Forma de pago: ' + val('formapago')
    ];
    if (val('notas')) lines.push('Notas: ' + val('notas'));
    var url = 'https://wa.me/523335594742?text=' + encodeURIComponent(lines.join('\n'));
    var ok = document.getElementById('factura-enviada');
    ok.querySelector('a').href = url;
    form.hidden = true; ok.hidden = false; ok.querySelector('h2').focus();
    window.open(url, '_blank', 'noopener');
  });
})();

/* Portadas externas: si no cargan, queda el nombre del proyecto */
(function () {
  document.querySelectorAll('.work-card__cover--behance img').forEach(function (img) {
    var fail = function () { img.remove(); };
    if (img.complete && img.naturalWidth === 0) fail();
    else img.addEventListener('error', fail);
  });
})();

/* Página de pago: resumen, plan de pago (50 % o completo con descuento) y enlaces */
(function () {
  'use strict';
  var dataEl = document.getElementById('paquetes-data');
  if (!dataEl) return;
  var cfg = window.PINKLION_PAGOS || {};
  var anticipo = cfg.anticipo || 0.5;
  var descuento = cfg.descuentoPagoCompleto != null ? cfg.descuentoPagoCompleto : 0.1;
  var pks = JSON.parse(dataEl.textContent);
  var sel = document.getElementById('pk');
  pks.forEach(function (p) {
    var o = document.createElement('option'); o.value = p.id; o.textContent = p.nombre; sel.appendChild(o);
  });
  var q = new URLSearchParams(location.search);
  var pedido = q.get('paquete');
  if (pedido && pks.some(function (p) { return p.id === pedido; })) sel.value = pedido;
  if (q.get('plan') === 'completo') document.getElementById('plan-completo').checked = true;

  var r2 = function (n) { return Math.round(n * 100) / 100; };
  var fmt = function (n) { var d = n % 1 ? 2 : 0; return '$' + n.toLocaleString('es-MX', { minimumFractionDigits: d, maximumFractionDigits: 2 }) + ' MXN'; };
  var wa = 'https://wa.me/523335594742?text=';
  var show = function (el, href) { if (href) { el.href = href; el.hidden = false; } else { el.hidden = true; el.removeAttribute('href'); } };
  document.getElementById('desc-pct').textContent = Math.round(descuento * 100) + ' %';

  function update() {
    var p = pks.filter(function (x) { return x.id === sel.value; })[0];
    var completo = document.getElementById('plan-completo').checked;
    var total = completo ? r2(p.precio * (1 - descuento)) : p.precio;
    var hoy = completo ? total : r2(p.precio * anticipo);
    document.getElementById('total').textContent = fmt(p.precio);
    document.getElementById('ahorro-row').hidden = !completo;
    document.getElementById('ahorro').textContent = '−' + fmt(r2(p.precio - total));
    document.getElementById('anticipo').textContent = fmt(hoy);
    document.getElementById('hoy-label').textContent = completo ? 'Pago único (hoy)' : 'Primer pago (hoy)';
    document.getElementById('resto-row').hidden = completo;
    document.getElementById('resto').textContent = fmt(r2(p.precio - hoy));
    document.getElementById('desc-precio').textContent = fmt(r2(p.precio * (1 - descuento)));
    document.getElementById('parcial').textContent = completo ? 'Pago completo con descuento.' : p.pago + '.';
    var links = (cfg.enlaces || {})[p.id] || {};
    var suf = completo ? 'Completo' : '';
    show(document.getElementById('pay-paypal'), cfg.paypalUsuario ? 'https://www.paypal.com/paypalme/' + encodeURIComponent(cfg.paypalUsuario) + '/' + hoy + 'MXN' : '');
    show(document.getElementById('pay-mercadopago'), links['mercadopago' + suf] || '');
    show(document.getElementById('pay-stripe'), links['stripe' + suf] || '');
    var any = ['pay-paypal', 'pay-mercadopago', 'pay-stripe'].some(function (id) { return !document.getElementById(id).hidden; });
    document.getElementById('pay-none').hidden = any;
    var plan = completo ? 'pago completo con ' + Math.round(descuento * 100) + ' % de descuento: ' : 'primer pago: ';
    document.getElementById('pay-wa').href = wa + encodeURIComponent('Hola, quiero pagar mi paquete por depósito o en efectivo. Paquete: ' + p.nombre + ' (' + plan + fmt(hoy) + ').');
    document.getElementById('pay-proof').href = wa + encodeURIComponent('Hola, ya pagué el paquete ' + p.nombre + ' (' + plan + fmt(hoy) + '). Te mando mi comprobante.');
  }
  sel.addEventListener('change', update);
  document.querySelectorAll('input[name="plan"]').forEach(function (r) { r.addEventListener('change', update); });
  update();
})();

/* Agenda una cita: con enlace de calendario o por WhatsApp */
(function () {
  'use strict';
  var form = document.getElementById('agenda');
  if (!form) return;
  var cfg = window.PINKLION_AGENDA || {};
  var direct = document.getElementById('agenda-directa');
  if (cfg.enlace) { direct.href = cfg.enlace; direct.hidden = false; }

  var fecha = form.querySelector('#cita-fecha');
  var t = new Date(); t.setDate(t.getDate() + 1);
  var iso = function (d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  fecha.min = iso(t);

  var rules = {
    'cita-nombre': function (v) { return v.trim().length >= 2 ? '' : 'Falta tu nombre. Escribe cómo te llamas.'; },
    'cita-fecha': function (v) {
      if (!v) return 'Falta la fecha. Elige el día que prefieres.';
      return v < fecha.min ? 'Elige una fecha a partir de mañana.' : '';
    }
  };
  function check(id) {
    var input = form.querySelector('#' + id), box = form.querySelector('#' + id + '-error');
    var msg = rules[id](input.value);
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    box.querySelector('span').textContent = msg;
    box.classList.toggle('is-visible', !!msg);
    return !msg;
  }
  Object.keys(rules).forEach(function (id) {
    form.querySelector('#' + id).addEventListener('blur', function () { if (this.value) check(id); });
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var bad = Object.keys(rules).filter(function (id) { return !check(id); });
    if (bad.length) { form.querySelector('#' + bad[0]).focus(); return; }
    var val = function (id) { return form.querySelector('#' + id).value.trim(); };
    var d = new Date(val('cita-fecha') + 'T12:00:00');
    var dia = d.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' });
    var lines = [
      'Hola, quiero agendar una cita para resolver dudas.',
      'Nombre: ' + val('cita-nombre'),
      'Fecha preferida: ' + dia,
      'Horario: ' + val('cita-horario'),
      'Modalidad: ' + val('cita-modo')
    ];
    if (val('cita-tema')) lines.push('Dudas: ' + val('cita-tema'));
    var url = 'https://wa.me/523335594742?text=' + encodeURIComponent(lines.join('\n'));
    var ok = document.getElementById('agenda-enviada');
    ok.querySelector('a').href = url;
    form.hidden = true; ok.hidden = false; ok.querySelector('h2').focus();
    window.open(url, '_blank', 'noopener');
  });
})();
