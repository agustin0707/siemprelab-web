// La propuesta · Agencia de Viajes SiempreLab
// Presentación para el viernes 6 nov: lo que vi y avancé, lámina por lámina.
// Tiene dos planes: A (Austral 2.0 + Guatemala) y B (playa + Austral larga), elegibles en la portada.
// Los datos salen de la prep (datos.js, datos-b.js, lugares.js, fotos-panoramas.js y precios.json),
// así que si se recotiza allá, acá se ve igual. Lo que se elige se guarda en este navegador.

// ---------- Utilidades ----------
const $ = (sel, raiz = document) => raiz.querySelector(sel);
const $$ = (sel, raiz = document) => [...raiz.querySelectorAll(sel)];
const CLP = (n) => '$' + Math.round(n).toLocaleString('es-CL');
const milCLP = (n) => '$' + Math.round(n / 1000).toLocaleString('es-CL') + ' mil';
const M1 = (n) => '$' + (n / 1000000).toLocaleString('es-CL', { maximumFractionDigits: 1 }) + ' M';
const precioDe = (p) => (p && typeof p === 'object' ? p.monto : p) || 0;

// localStorage envuelto: si falla (modo privado), la presentación igual funciona
const guardado = {
  leer(clave, porDefecto, prefijo = 'propuesta-') {
    try {
      const v = localStorage.getItem(prefijo + clave);
      return v === null ? porDefecto : JSON.parse(v);
    } catch (e) { return porDefecto; }
  },
  escribir(clave, valor) {
    try { localStorage.setItem('propuesta-' + clave, JSON.stringify(valor)); } catch (e) { /* sin guardado */ }
  }
};

// Lo que vamos decidiendo durante la presentación.
// El plan parte en el último que se miró en la prep (o en el B, que es la idea nueva); ?plan=a o ?plan=b manda.
const B = DATOS_B;
const resumenB = () => guardado.leer('resumen-b', null, 'prep-');
const decisiones = Object.assign(
  { plan: guardado.leer('plan', 'b', 'prep-') === 'a' ? 'a' : 'b',
    vuelta: '24', glaciar: 'hielo', capillas: 'lancha', auto: 'sixt-sonet', techo: [1], anioNuevo: null, ruta: 'guatemala', compradas: {}, aprobado: false,
    playa: (resumenB() || {}).playaId || B.playa.opciones[0].id, autoB: 'b-tucson', techoB: [1, 8], anioNuevoB: null },
  guardado.leer('decisiones', {})
);
const planUrl = new URLSearchParams(location.search).get('plan');
if (planUrl === 'a' || planUrl === 'b') decisiones.plan = planUrl;
const esB = () => decisiones.plan === 'b';
document.documentElement.dataset.plan = decisiones.plan;
const guardarDecisiones = () => guardado.escribir('decisiones', decisiones);
// Las elecciones que cada plan guarda por separado
const claveTecho = () => (esB() ? 'techoB' : 'techo');
const claveNY = () => (esB() ? 'anioNuevoB' : 'anioNuevo');

// Atajos a los datos de la prep
const AU = DATOS.vuelosAustral;
const actividad = (id) => [...DATOS.actividadesAustral, ...DATOS.actividadesCA, ...B.actividades].find((a) => a.id === id);
const reserva = (id) => DATOS.reservas.find((r) => r.id === id);
const fotosDe = (llave) => (typeof FOTOS_PANORAMAS !== 'undefined' && FOTOS_PANORAMAS[llave]) || (LUGARES[llave] ? LUGARES[llave].fotos : []);
// En el plan B los vuelos al sur son los que quedaron elegidos en la prep
const idaElegida = () => (esB()
  ? B.vuelosAU.idas.find((v) => v.id === (resumenB() || {}).ida) || B.vuelosAU.idas.find((v) => v.recomendado)
  : AU.idas.find((v) => v.recomendado) || AU.idas[0]);
const vueltaElegida = () => (esB()
  ? B.vuelosAU.vueltas.find((v) => v.id === (resumenB() || {}).vuelta) || B.vuelosAU.vueltas.find((v) => v.recomendado)
  : AU.vueltas.find((v) => String(v.fecha) === decisiones.vuelta && v.aerolinea === 'LATAM' && v.sale === '15:00') || AU.vueltas.find((v) => String(v.fecha) === decisiones.vuelta));
const autoElegido = () => (esB()
  ? B.autos.opciones.find((a) => a.id === decisiones.autoB) || B.autos.opciones[0]
  : DATOS.autos.opciones.find((a) => a.id === decisiones.auto) || DATOS.autos.opciones[0]);
const totalAuto = (a) => precioDe(esB() ? a.total : decisiones.vuelta === '24' ? a.total24 : a.total);

// La playa del plan B: el hotel y las noches son los de la prep si se eligió la misma playa
const playaElegida = () => B.playa.opciones.find((o) => o.id === decisiones.playa) || B.playa.opciones[0];
const nombreCorto = (o) => o.nombre.replace(' todo incluido', '').replace('Caribe en ', '');
const nochesPlaya = () => Number(decisiones.nochesPlaya) || (resumenB() && resumenB().noches) || B.playa.noches;
function hotelPlaya(o) {
  const r = resumenB();
  return (r && r.playaId === o.id && o.hoteles.find((h) => h.n === r.hotel)) || o.hoteles[o.base];
}
// Por persona: vuelo (con la maleta si es low cost) + la mitad del hotel + traslados. base = lo que entra en el tope.
function costoPlaya(o, noches = nochesPlaya()) {
  const h = hotelPlaya(o);
  const vuelo = o.vuelo.precio + precioDe(o.vuelo.extraMano);
  const hotel = (h.p * noches) / 2;
  return { h, vuelo, hotel, traslado: o.traslado.p, base: vuelo + hotel + o.traslado.p, comida: h.todoIncluido ? 0 : o.comida * noches };
}
const diaSemana = (d) => ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'][new Date(2026, 11, d).getDay()];
const linkVueloPlaya = (o) => `https://www.google.com/travel/flights?q=Flights%20from%20SCL%20to%20${o.vuelo.codigo}%20on%202026-12-14%20through%202026-12-${14 + nochesPlaya()}&curr=CLP&hl=es&gl=CL`;
const busquedaHoteles = (q) => `https://www.google.com/travel/search?q=${encodeURIComponent(q)}&hl=es&gl=CL&curr=CLP`;
const avianca = () => DATOS.vuelosCA.find((v) => v.id === 'avianca-25') || DATOS.vuelosCA[0];

// Cuenta de un número hacia arriba
function contar(el, hasta, formato = (n) => Math.round(n), ms = 1400) {
  const t0 = performance.now();
  const paso = (t) => {
    const k = Math.min(1, (t - t0) / ms);
    el.textContent = formato(hasta * (1 - Math.pow(1 - k, 3)));
    if (k < 1) requestAnimationFrame(paso);
  };
  requestAnimationFrame(paso);
}

// Fondo de fotos que se van turnando, con su crédito
function fondoRotativo(caja, credito, fotos, cada = 6000) {
  if (!caja || !fotos.length) return;
  caja.innerHTML = fotos.map((f) => `<img src="${f.grande || f.src}" alt="" loading="lazy">`).join('');
  const imgs = $$('img', caja);
  let n = 0;
  const mostrar = () => {
    imgs.forEach((img, i) => img.classList.toggle('vista', i === n));
    if (credito) credito.innerHTML = `foto: <a href="${fotos[n].pagina}" target="_blank" rel="noopener">${fotos[n].credito} · ${fotos[n].licencia}</a>`;
  };
  imgs[0].loading = 'eager';
  mostrar();
  if (imgs.length > 1) setInterval(() => { n = (n + 1) % imgs.length; mostrar(); }, cada);
}

// Interruptores de dos opciones (la píldora se mueve a la elegida)
function pintarInterruptor(caja) {
  // Las noches de playa parten en las de la prep aunque aún no se toquen acá
  const valor = caja.dataset.decision === 'nochesPlaya' ? String(nochesPlaya()) : decisiones[caja.dataset.decision];
  let pildora = $('.pildora', caja);
  if (!pildora) { pildora = document.createElement('i'); pildora.className = 'pildora'; caja.prepend(pildora); }
  $$('button', caja).forEach((b) => {
    const si = b.dataset.valor === valor;
    b.classList.toggle('si', si);
    if (si) { pildora.style.left = b.offsetLeft + 'px'; pildora.style.width = b.offsetWidth + 'px'; }
  });
}
document.addEventListener('click', (e) => {
  const b = e.target.closest('.interruptor button');
  if (!b) return;
  const caja = b.closest('.interruptor');
  decisiones[caja.dataset.decision] = b.dataset.valor;
  guardarDecisiones();
  $$(`.interruptor[data-decision="${caja.dataset.decision}"]`).forEach(pintarInterruptor);
  if (caja.dataset.decision === 'plan') aplicarPlan(); else repintar();
});

// ---------- 1. Portada ----------
// Primer despegue: el 13 a la Austral (plan A) o el 14 a la playa (plan B)
const despegue = () => (esB() ? `2026-12-14T${playaElegida().vuelo.ida.slice(0, 5)}:00-03:00` : DATOS.despegue);
function pintarPase() {
  $('#pase-destinos').textContent = esB() ? `${playaElegida().vuelo.codigo} · BBA` : 'BBA · GUA';
  $('#pase-salida').textContent = esB() ? '14 dic' : '13 dic';
}
function pintarPortada() {
  const fotos = DATOS.hero.map((h) => LUGARES[h.lugar] && LUGARES[h.lugar].fotos[h.foto]).filter(Boolean);
  fondoRotativo($('#portada-fotos'), $('#portada-credito'), fotos, 5500);
  const cuenta = () => {
    const ms = new Date(despegue()) - new Date();
    if (ms <= 0) { $('#cuenta').textContent = '¡ya!'; return; }
    const d = Math.floor(ms / 86400000);
    const h = Math.floor((ms % 86400000) / 3600000);
    $('#cuenta').textContent = `${d} d ${h} h`;
  };
  cuenta();
  setInterval(cuenta, 60000);
  pintarPase();
}

// ---------- 2. Calendario del verano ----------
const INICIO = new Date('2026-12-01T00:00:00-03:00');
const DIAS_CAL = 42; // 1 dic al 11 ene
const diaDe = (iso, hora = 0) => (new Date(iso + 'T00:00:00-03:00') - INICIO) / 86400000 + hora / 24;
// Plan A: la Austral termina el 23 o el 24 según lo que elijamos. Plan B: playa antes y Austral larga después.
const BRASIL = { desde: diaDe('2026-12-04'), hasta: diaDe('2026-12-11'), clase: 'gris', t: 'Brasil', s: 'tú con tu papá', d: '<b>Brasil.</b> Tú con tu papá, vuelves el 10 u 11. Yo ando en mi viaje sorpresa.' };
const hora = (hhmm) => Number(hhmm.slice(0, 2)) + Number(hhmm.slice(3, 5)) / 60;
function tramosB() {
  const o = playaElegida();
  const vuelta = 14 + nochesPlaya();
  const ida = idaElegida(), v = vueltaElegida();
  return [
    BRASIL,
    { desde: diaDe('2026-12-14', hora(o.vuelo.ida)), hasta: diaDe(`2026-12-${vuelta}`, 20), clase: 'negro', t: nombreCorto(o), s: `14 al ${vuelta} dic`, d: `<b>${o.nombre}.</b> Salimos el lunes 14 (el matrimonio ya pasó) y volvemos el ${diaSemana(vuelta)} ${vuelta}, con días de colchón antes de Navidad.` },
    { desde: diaDe('2026-12-26', hora(ida.sale)), hasta: diaDe('2027-01-09', hora(v.llega)), clase: 'acento', t: 'Austral larga', s: '26 dic al 9 ene', d: `<b>Austral larga.</b> Pasamos Navidad en Santiago y partimos el sábado 26 a las ${ida.sale}. Volvemos el sábado 9 a las ${v.llega}: te quedan el sábado y el domingo antes del internado.` }
  ];
}
const tramos = () => (esB() ? tramosB() : [
  BRASIL,
  decisiones.vuelta === '24'
    ? { desde: diaDe('2026-12-13', 14.5), hasta: diaDe('2026-12-24', 18.5), clase: 'acento', t: 'Austral 2.0', s: '13 al 24 dic', d: '<b>Austral 2.0.</b> Salimos el domingo 13 después de almuerzo (el matrimonio es la noche antes) y volvemos el 24 para la Nochebuena.' }
    : { desde: diaDe('2026-12-13', 14.5), hasta: diaDe('2026-12-23', 18.7), clase: 'acento', t: 'Austral 2.0', s: '13 al 23 dic', d: '<b>Austral 2.0.</b> Salimos el domingo 13 después de almuerzo (el matrimonio es la noche antes) y volvemos el miércoles 23.' },
  { desde: diaDe('2026-12-25', 16.25), hasta: diaDe('2027-01-10', 1), clase: 'negro', t: 'Guatemala', s: '25 dic al 10 ene', d: '<b>Guatemala.</b> Almorzamos en Navidad y partimos a las 16:15. Volvemos el sábado 9 y llegamos el domingo 10 a la 01:05.' }
]);
const HITOS = [
  { dia: diaDe('2026-12-12', 20), t: 'matrimonio', d: '<b>Sábado 12:</b> el matrimonio. Por eso no volamos ese día ni el 13 temprano.' },
  { dia: diaDe('2026-12-24', 21), t: 'nochebuena', d: '<b>24 y 25:</b> Navidad en Santiago, con las familias.' },
  { dia: diaDe('2027-01-11', 8), t: 'internado', clase: 'acento', d: '<b>Lunes 11:</b> empiezas el internado. Tienes el domingo 10 entero para preparar tus cosas y dormir bien.' }
];
function pintarCalendario() {
  const pct = (d) => (d / DIAS_CAL) * 100;
  const dias = Array.from({ length: DIAS_CAL }, (_, i) => {
    const f = new Date(INICIO.getTime() + i * 86400000);
    return `<i class="${f.getDay() === 0 ? 'domingo' : ''}"></i>`;
  }).join('');
  $('#calendario').innerHTML = `
    <div class="cal-meses"><span style="left:0">diciembre</span><span style="left:${pct(31)}%">enero</span></div>
    <div class="cal-dias">${dias}</div>
    <div class="cal-pista">
      ${tramos().map((t, i) => `<button class="cal-tramo ${t.clase}" data-tramo="${i}" style="left:${pct(t.desde)}%;width:${pct(t.hasta - t.desde)}%;transition-delay:${0.3 + i * 0.25}s"><b>${t.t}</b><small>${t.s}</small></button>`).join('')}
      ${HITOS.map((h, i) => `<button class="cal-hito ${h.clase || ''}" data-hito="${i}" style="left:${pct(h.dia)}%">${h.t}</button>`).join('')}
    </div>`;
  const cifras = esB()
    ? [[nochesPlaya(), 'noches de playa'], [14, 'noches en el sur'], ['1,5', 'días libres antes del internado']]
    : [[decisiones.vuelta === '24' ? 11 : 10, 'noches en el sur'], [14, 'noches en Guatemala'], [1, 'día libre antes del internado']];
  $('#cifras-verano').innerHTML = cifras.map(([n, t]) => `<div><b>${n}</b><span>${t}</span></div>`).join('');
}

// ---------- Fotos que se abren en grande ----------
// Miniatura liviana de Commons (330 px es un ancho estándar que Wikimedia sí sirve)
const miniatura = (src) => String(src).replace(/\/(1280|1920)px-/, '/330px-');
const comillas = (t) => String(t || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
// Las fotos de los hoteles no son libres: se abren en Google Imágenes
const fotosHotel = (h, o) => `https://www.google.com/search?tbm=isch&hl=es&q=${encodeURIComponent(`${h.n} ${LUGARES[o.lugar].nombre} hotel`)}`;
function tiraFotos(llaves, titulo, max = 5) {
  const lista = [].concat(llaves).flatMap((k) => fotosDe(k));
  if (!lista.length) return '';
  const resto = lista.length - max;
  return `<div class="tira-fotos">${lista.slice(0, max).map((f, i) =>
    `<button type="button" data-visor-lugar="${[].concat(llaves).join(',')}" data-visor-i="${i}" data-visor-titulo="${comillas(titulo)}" aria-label="Ver foto ${i + 1}">
      <img src="${miniatura(f.src)}" alt="" loading="lazy">${i === max - 1 && resto > 0 ? `<span>+${resto}</span>` : ''}</button>`).join('')}</div>`;
}

// ---------- 2b. La playa (plan B) ----------
function pintarPlaya() {
  const n = nochesPlaya();
  $('#opciones-playa').innerHTML = B.playa.opciones.map((o) => {
    const c = costoPlaya(o, n);
    const f = fotosDe(o.lugar)[0];
    const si = decisiones.playa === o.id;
    return `<button class="ny${si ? ' elegida' : ''}" data-playa="${o.id}">
      ${f ? `<img src="${f.src}" alt="${o.nombre}" loading="lazy">` : ''}
      <span class="check">${si ? '✓' : ''}</span>
      <div class="ny-texto"><span class="sello">${o.sello}</span><b>${nombreCorto(o)}</b><span${c.base > B.topePlaya ? ' class="fuera"' : ''}>${milCLP(c.base)} c/u${c.base > B.topePlaya ? ' · se pasa' : ''}</span></div>
    </button>`;
  }).join('');
  const o = playaElegida();
  const c = costoPlaya(o, n);
  const dentro = c.base <= B.topePlaya;
  const filas = [
    ['vuelo', `${o.vuelo.aerolinea} ${o.vuelo.ida} · ${o.vuelo.escalas} · ${milCLP(c.vuelo)} c/u${precioDe(o.vuelo.extraMano) ? ' con la maleta' : ''}`],
    ['hotel', `${c.h.n} · ★ ${c.h.r} · ${milCLP(c.h.p)} la noche para los dos`],
    ['noches', `${n}, del lun 14 al ${diaSemana(14 + n)} ${14 + n} de diciembre`],
    ['traslado', `${o.traslado.texto} · ${milCLP(c.traslado)} c/u`],
    ['comida', c.h.todoIncluido ? 'incluida en el hotel, con tragos' : `≈ ${milCLP(o.comida)} al día cada uno`]
  ];
  $('#playa-elegida').innerHTML = `
    <div class="ne-cabeza"><b>${o.nombre} · ${milCLP(c.base)} c/u</b><span>${dentro ? `dentro de los $800 mil: sobran ${milCLP(B.topePlaya - c.base)}` : `se pasa de los $800 mil por ${milCLP(c.base - B.topePlaya)}`}</span></div>
    <ol class="horas">${filas.map(([h, q], i) => `<li style="animation-delay:${i * 80}ms"><span>${h}</span><p>${q}</p></li>`).join('')}</ol>
    <p class="ne-pie">${o.resumen}</p>
    ${tiraFotos(o.lugar, o.nombre, 6)}
    <a class="link-claro" href="${fotosHotel(c.h, o)}" target="_blank" rel="noopener">las fotos de ${c.h.n} (piezas, piscina y comida) ↗</a>`;
  const objetivo = Math.round((c.base * (1 - B.blackFriday.descuento / 100)) / 1000) * 1000;
  $('#playa-cuando').innerHTML = `¿Ahora o en el Black Friday (vie 27 al lun 30 nov)? Si aparece vuelo + hotel bajo <b>${milCLP(objetivo)}</b> c/u, se compra. Si no, se compra igual el lunes 30. <button class="link-claro" data-ir-nombre="black friday">ver el plan →</button>`;
}
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-playa]');
  if (!b) return;
  decisiones.playa = b.dataset.playa;
  guardarDecisiones();
  repintar();
});
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-tramo], [data-hito]');
  if (!t) return;
  const dato = t.dataset.tramo !== undefined ? tramos()[t.dataset.tramo] : HITOS[t.dataset.hito];
  $$('.cal-tramo').forEach((x) => x.classList.toggle('elegido', x === t));
  $('#detalle-cal').innerHTML = dato.d;
});

// ---------- 2c. Black Friday (plan B) ----------
const BF = B.blackFriday;
function pintarBlackFriday() {
  const rango = $('#bf-rango');
  const pct = Number(rango.value);
  $('#bf-pct').textContent = `${pct} %`;
  rango.style.setProperty('--lleno', `${(pct / 40) * 100}%`);
  const n = nochesPlaya();
  const max = 1600000; // la barra va de $0 a $1,6 M: el tope queda al medio
  $('#bf-barras').innerHTML = B.playa.opciones.map((o) => {
    const c = costoPlaya(o, n);
    const con = Math.round((c.base * (1 - pct / 100)) / 1000) * 1000;
    const entra = con <= B.topePlaya;
    return `<div class="bf-fila${entra ? ' entra' : ''}${decisiones.playa === o.id ? ' es-la' : ''}">
      <span class="bf-nombre">${nombreCorto(o)}</span>
      <div class="bf-barra"><i style="width:${Math.min(100, (con / max) * 100)}%"></i><b style="left:${(B.topePlaya / max) * 100}%"></b></div>
      <span class="bf-monto">${milCLP(con)}${pct ? `<s>${milCLP(c.base)}</s>` : ''}</span>
      <span class="bf-sello">${entra ? 'entra ✓' : `faltan ${milCLP(con - B.topePlaya)}`}</span>
    </div>`;
  }).join('');
}
$('#bf-rango').addEventListener('input', pintarBlackFriday);
function pintarPasosBF() {
  $('#bf-pasos').innerHTML = BF.plan.map(([cuando, que]) => `<li><span>${cuando}</span><p>${que}</p></li>`).join('');
}
// Cuenta regresiva (una vez por segundo, solo cuando la lámina está a la vista)
function relojBF() {
  const caja = $('#bf-reloj');
  if (!caja.closest('.lamina').classList.contains('activa')) return;
  const ini = new Date(BF.inicio).getTime(), fin = new Date(BF.fin).getTime(), ahora = Date.now();
  if (ahora >= fin) { caja.innerHTML = '<p>ya pasó</p>'; return; }
  if (ahora >= ini) { caja.innerHTML = '<p>está pasando ahora</p>'; return; }
  let s = Math.floor((ini - ahora) / 1000);
  const d = Math.floor(s / 86400); s %= 86400;
  const h = Math.floor(s / 3600); s %= 3600;
  const m = Math.floor(s / 60); s %= 60;
  const dos = (x) => String(x).padStart(2, '0');
  caja.innerHTML = [[d, 'días'], [dos(h), 'horas'], [dos(m), 'min'], [dos(s), 'seg']].map(([x, t]) => `<div><b>${x}</b><span>${t}</span></div>`).join('');
}
setInterval(relojBF, 1000);

// ---------- 3. Mapa de la Austral ----------
// Coordenadas reales (lat, lon). viejo: lo que hicimos en 2025. soloB: solo en la Austral larga; dB: el texto en el plan B.
const PUNTOS = {
  coyhaique: { lat: -45.57, lon: -72.07, n: 'Coyhaique', viejo: true, lado: 'der' },
  balmaceda: { lat: -45.92, lon: -71.69, n: 'Balmaceda ✈', lado: 'der', lugar: 'carretera-austral', d: 'Llegamos el 13 a las 16:49, sacamos el auto en el aeropuerto y partimos al sur.', dB: 'Llegamos el 26 a las 16:15, sacamos el auto y partimos al sur. El 9 volamos de vuelta desde acá.' },
  castillo: { lat: -46.12, lon: -72.16, n: 'Cerro Castillo', lado: 'der', lugar: 'cerro-castillo', d: 'Donde terminamos el 2025. Primera noche y de aquí para abajo todo es nuevo.' },
  tranquilo: { lat: -46.62, lon: -72.67, n: 'Río Tranquilo', lado: 'izq', lugar: 'capillas-marmol', d: 'Tres noches: Capillas de Mármol y el Glaciar Exploradores.' },
  guadal: { lat: -46.84, lon: -72.70, n: 'Puerto Guadal', lado: 'der', lugar: 'general-carrera', d: 'La última noche antes de volver, a la orilla del General Carrera.', dB: 'De acá sale el Paso Las Llaves, el camino colgado sobre el lago hasta Chile Chico.' },
  bertrand: { lat: -47.02, lon: -72.83, n: 'Puerto Bertrand', lado: 'izq', lugar: 'confluencia-baker', d: 'El Baker turquesa y la confluencia con el Nef.' },
  chacabuco: { lat: -47.13, lon: -72.48, n: 'Parque Patagonia', lado: 'der', lugar: 'parque-patagonia', d: 'Valle Chacabuco: guanacos, Lagunas Altas y camping.', dB: 'Valle Chacabuco: guanacos, Lagunas Altas y Año Nuevo bajo las estrellas.' },
  cochrane: { lat: -47.25, lon: -72.57, n: 'Cochrane', lado: 'der', abajo: true, lugar: 'parque-patagonia', d: 'El último pueblo grande: estanque lleno y súper antes de seguir.' },
  tortel: { lat: -47.80, lon: -73.54, n: 'Caleta Tortel', lado: 'izq', lugar: 'tortel', d: 'El pueblo sin calles: todo por pasarelas sobre el agua.' },
  yungay: { lat: -47.97, lon: -73.39, n: 'Barcaza', lado: 'der', abajo: true, lugar: 'carretera-austral', d: 'Puerto Yungay → Río Bravo: 45 min de barcaza, gratis.' },
  ohiggins: { lat: -48.47, lon: -72.56, n: "Villa O'Higgins", lado: 'der', lugar: 'villa-ohiggins', d: 'El fin de la Carretera Austral. Dos noches y el glaciar si hay cupo.' },
  chilechico: { lat: -46.54, lon: -71.73, n: 'Chile Chico', lado: 'der', soloB: true, lugar: 'chile-chico', d: 'El pueblo del sol, al otro lado del lago. Dos noches: Jeinimeni y la Piedra Clavada.' },
  ibanez: { lat: -46.29, lon: -71.94, n: 'Puerto Ibáñez', lado: 'der', soloB: true, lugar: 'general-carrera', d: 'Cruzamos el lago en barcaza desde Chile Chico (2 h, con el auto) y quedamos a una hora de Balmaceda.' }
};
// Por dónde va el camino (algunos quiebres para que siga la carretera)
const CAMINO_2025 = [[-44.9, -72.6], [-45.25, -72.25], 'coyhaique', [-45.75, -72.0], 'castillo'];
const CAMINO_2026 = ['balmaceda', [-46.0, -71.95], 'castillo', [-46.35, -72.35], [-46.5, -72.62], 'tranquilo', [-46.85, -72.66], 'bertrand', [-47.08, -72.66], 'chacabuco', 'cochrane', [-47.55, -72.85], [-47.75, -73.15], 'yungay', [-48.05, -73.2], [-48.2, -72.95], 'ohiggins'];
const RAMAL_TORTEL = [[-47.75, -73.15], [-47.78, -73.35], 'tortel'];
const RAMAL_GUADAL = [[-46.85, -72.66], 'guadal'];
// Austral larga: la vuelta por el sur del lago, la barcaza y de Ibáñez al aeropuerto
const LLAVES = ['guadal', [-46.74, -72.45], [-46.63, -72.2], [-46.56, -71.95], 'chilechico'];
const BARCAZA_LAGO = ['chilechico', [-46.42, -71.86], 'ibanez'];
const IBANEZ_BALMACEDA = ['ibanez', [-46.1, -71.86], 'balmaceda'];

function pintarMapa() {
  const svg = $('#mapa');
  const lat0 = -45.0, lat1 = -48.75, lon0 = -74.6, lon1 = -70.6;
  const k = 150; // px por grado
  const cx = Math.cos(47 * Math.PI / 180);
  const W = (lon1 - lon0) * cx * k, H = (lat0 - lat1) * k;
  const xy = (lat, lon) => [((lon - lon0) * cx * k).toFixed(1), ((lat0 - lat) * k).toFixed(1)];
  const p = (x) => (typeof x === 'string' ? xy(PUNTOS[x].lat, PUNTOS[x].lon) : xy(x[0], x[1]));
  const linea = (pts) => 'M' + pts.map((x) => p(x).join(',')).join(' L');
  svg.setAttribute('viewBox', `0 0 ${W.toFixed(0)} ${H.toFixed(0)}`);

  const grilla = [-46, -47, -48].map((lat) => {
    const [, y] = xy(lat, lon0);
    return `<line x1="0" x2="${W}" y1="${y}" y2="${y}"/><text x="4" y="${y - 4}">${-lat}° S</text>`;
  }).join('');
  const puntos = Object.entries(PUNTOS).filter(([, pt]) => esB() || !pt.soloB).map(([id, pt]) => {
    const [x, y] = xy(pt.lat, pt.lon);
    const dx = pt.lado === 'izq' ? -10 : 10;
    return `<g class="punto ${pt.viejo ? 'viejo' : ''}" data-punto="${id}" tabindex="0">
      <circle cx="${x}" cy="${y}" r="${pt.viejo ? 4 : 6}"/>
      <text x="${Number(x) + dx}" y="${Number(y) + (pt.abajo ? 16 : 4)}" text-anchor="${pt.lado === 'izq' ? 'end' : 'start'}">${pt.n}</text>
    </g>`;
  }).join('');
  const [bx, by] = xy(PUNTOS.balmaceda.lat, PUNTOS.balmaceda.lon);
  svg.innerHTML = `
    <g class="grilla">${grilla}</g>
    <path class="vuelo" d="M${bx},0 Q${Number(bx) + 30},${by / 2} ${bx},${by}"/>
    <path class="ruta-2025" d="${linea(CAMINO_2025)}"/>
    <path class="ruta-2026 dibujar" d="${linea(CAMINO_2026)}"/>
    <path class="ruta-2026 dibujar" d="${linea(RAMAL_TORTEL)}"/>
    <path class="ruta-2026 dibujar" d="${linea(RAMAL_GUADAL)}"/>
    ${esB() ? `<path class="ruta-2026 dibujar" d="${linea(LLAVES)}"/><path class="barcaza" d="${linea(BARCAZA_LAGO)}"/><path class="ruta-2026 dibujar" d="${linea(IBANEZ_BALMACEDA)}"/>` : ''}
    <text x="${Number(bx) + 8}" y="14" fill="rgba(255,255,255,.45)" font-family="Space Mono" font-size="9">desde Santiago</text>
    ${puntos}`;
  const cifras = esB() ? [['~2.100', 'km de ruta'], ['8', 'pueblos nuevos'], ['2', 'barcazas']] : [['~1.450', 'km de ruta'], ['6', 'pueblos nuevos'], ['1', 'barcaza']];
  $('#cifras-austral').innerHTML = cifras.map(([n, t]) => `<div><b>${n}</b><span>${t}</span></div>`).join('');
}
function dibujarRuta() {
  $$('#mapa .dibujar').forEach((path, i) => {
    const largo = path.getTotalLength();
    path.style.transition = 'none';
    path.style.strokeDasharray = largo;
    path.style.strokeDashoffset = largo;
    path.getBoundingClientRect();
    path.style.transition = `stroke-dashoffset ${i === 0 ? 2.6 : 0.8}s cubic-bezier(.4,0,.2,1) ${i === 0 ? 0.5 : 2.4}s`;
    path.style.strokeDashoffset = 0;
  });
}
function tocarPunto(id) {
  const pt = PUNTOS[id];
  if (!pt || pt.viejo) return;
  $$('#mapa .punto').forEach((g) => g.classList.toggle('tocado', g.dataset.punto === id));
  const fotos = fotosDe(pt.lugar);
  const f = fotos[0];
  $('#parada-tocada').innerHTML = `${f ? `<button type="button" class="foto-grande" data-visor-lugar="${pt.lugar}" data-visor-titulo="${comillas(pt.n)}" aria-label="Ver las fotos de ${comillas(pt.n)}"><img src="${f.src}" alt="${pt.n}"><span>⤢ ${fotos.length}</span></button>` : ''}<div><b>${pt.n}</b>${(esB() && pt.dB) || pt.d}</div>`;
}
document.addEventListener('click', (e) => { const g = e.target.closest('[data-punto]'); if (g) tocarPunto(g.dataset.punto); });

// ---------- 4. Día a día ----------
function pintarDias() {
  const R = DATOS.rutaAustral;
  const paradas = esB() ? B.ruta.paradas : [...R.paradas, ...R.finales[decisiones.vuelta]];
  $('#titulo-dias').textContent = esB() ? 'Quince días hacia el sur' : decisiones.vuelta === '24' ? 'Doce días hacia el sur' : 'Once días hacia el sur';
  $('#dias').innerHTML = paradas.map((p, i) => {
    const fotos = p.lugar ? fotosDe(p.lugar) : [];
    const f = fotos[0];
    const esFinal = !esB() && i >= R.paradas.length;
    const foto = f
      ? `<button type="button" class="dia-foto" data-visor-lugar="${p.lugar}" data-visor-titulo="${comillas(p.titulo)}" aria-label="Ver las fotos de ${comillas(p.titulo)}"><img src="${f.src}" alt="${p.titulo}" loading="lazy"><span class="num">${p.dias.split(' · ')[0]}</span>${fotos.length > 1 ? `<span class="mas-fotos">⤢ ${fotos.length}</span>` : ''}</button>`
      : `<div class="dia-foto sin-foto">✈<span class="num">${p.dias.split(' · ')[0]}</span></div>`;
    return `<article class="dia${esFinal ? ' nuevo-final' : ''}">
      ${foto}
      <div class="dia-texto">
        <span class="cuando">${p.dias.split(' · ').slice(1).join(' · ') || p.dias}</span>
        <b>${p.titulo}</b>
        <p>${p.detalle}</p>
        <span class="manejo">${p.manejo || ''}</span>
      </div>
    </article>`;
  }).join('');
  if (esB()) {
    $('#nota-vuelta').textContent = 'Sin días eternos: el tramo más largo es de 5 horas. Ida hasta Villa O\'Higgins y vuelta por el otro lado del lago, por Chile Chico y la barcaza.';
    return;
  }
  const v24 = AU.vueltas.find((v) => v.id === 'au-v24-1500');
  const v23 = AU.vueltas.find((v) => v.id === 'au-v23-1500');
  const dif = v23 && v24 ? v23.precio - v24.precio : 0;
  $('#nota-vuelta').innerHTML = decisiones.vuelta === '24'
    ? `Volviendo el 24 llegamos a la cena de Nochebuena, ganamos un día y el último tramo no es apurado.${dif > 0 ? ` Además el vuelo sale ${milCLP(dif)} más barato.` : ''}`
    : `Volviendo el 23 tenemos un día más en Santiago antes de Navidad, pero el último día son 290 km para alcanzar el vuelo${dif > 0 ? ` y el pasaje sale ${milCLP(dif)} más caro` : ''}.`;
}
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-carril]');
  if (!b) return;
  const c = $('.carril', b.closest('.carril-caja'));
  c.scrollBy({ left: Number(b.dataset.carril) * (c.clientWidth * 0.8), behavior: 'smooth' });
});

// ---------- 5. Glaciar Exploradores ----------
function pintarGlaciar() {
  const hielo = actividad('exploradores-hielo');
  $('#glaciar-resumen').textContent = 'Es el glaciar de la Austral donde te pones crampones y caminas encima, entre grietas y cuevas de hielo azul.';
  const precio = (hielo.precio.match(/\$\s?\d+\s?mil/) || ['$150 mil'])[0];
  const cifras = $$('.cifras b', $('#glaciar-resumen').closest('.contenido'));
  const pasos = decisiones.glaciar === 'hielo'
    ? ['06:00 salimos de Río Tranquilo en van', 'Caminata por la morrena hasta el borde del hielo', 'Crampones, casco y 1 a 2 h arriba del glaciar', 'De vuelta en Tranquilo como a las 18:00']
    : ['Vamos por nuestra cuenta en el auto (1,5 h)', 'Sendero corto hasta los miradores', 'Vemos el glaciar y el San Valentín de frente', 'De vuelta a almorzar a Tranquilo'];
  $('#glaciar-pasos').innerHTML = pasos.map((p) => `<li>${p}</li>`).join('');
  if (decisiones.glaciar === 'hielo') {
    [cifras[0].textContent, cifras[1].textContent, cifras[2].textContent] = ['12 h', '1 a 2 h', precio];
    $$('.cifras span', cifras[0].closest('.cifras'))[1].textContent = 'sobre el hielo';
    $('#nota-glaciar').textContent = 'Ojo: desde 2024 la ruta es nueva y más larga (7 a 8 h caminando) y es solo para mayores de 18. Hay que confirmar que salen en diciembre.';
  } else {
    [cifras[0].textContent, cifras[1].textContent, cifras[2].textContent] = ['medio día', '0 h', '≈ $10 mil'];
    $$('.cifras span', cifras[0].closest('.cifras'))[1].textContent = 'sobre el hielo';
    $('#nota-glaciar').textContent = 'Más tranquilo y sale como $140 mil menos cada uno, pero lo vemos de lejos. Si el día sale malo, es el plan B igual.';
  }
}

// ---------- 6. Lo que hay en el camino ----------
// El lugar de cada actividad, para sumar sus fotos en el visor
const LUGAR_DE = { 'capillas-lancha': 'capillas-marmol', 'capillas-kayak': 'capillas-marmol', ohiggins: 'villa-ohiggins', barcaza: 'villa-ohiggins' };
function pintarMosaico() {
  const capillas = decisiones.capillas === 'kayak' ? 'capillas-kayak' : 'capillas-lancha';
  const ids = esB()
    ? [capillas, 'parque-patagonia', 'tortel', 'ohiggins', 'paso-las-llaves', 'jeinimeni']
    : [capillas, 'confluencia-baker', 'parque-patagonia', 'tortel', 'ohiggins', 'barcaza'];
  $('#mosaico').innerHTML = ids.map((id) => {
    const a = actividad(id);
    if (!a) return '';
    const f = fotosDe(id)[0] || fotosDe(a.lugar || '')[0] || fotosDe([].concat(a.fotos || [])[0] || '')[0];
    // Todas las fotos que hay de la actividad y su lugar (sin repetir llaves)
    const llaves = [...new Set([id, ...[].concat(a.fotos || []), a.lugar, LUGAR_DE[id]].filter((k) => k && fotosDe(k).length))].slice(0, 2);
    // En la foto va solo lo corto; el precio entero queda atrás
    const precioCorto = { 'confluencia-baker': 'mirador gratis', ohiggins: 'consultar', jeinimeni: 'entrada CONAF' }[id] || a.precio.split(' · ')[0];
    return `<button class="ficha" type="button">
      <div class="ficha-giro">
        <div class="ficha-cara frente">
          ${f ? `<img src="${f.src}" alt="${a.nombre}" loading="lazy">` : ''}
          <span class="precio-chip">${precioCorto}</span>
          <div class="rotulo"><b>${a.nombre}</b><span>${a.donde}</span></div>
        </div>
        <div class="ficha-cara dorso">
          <span class="precio">${a.precio}</span>
          <b>${a.nombre}</b>
          <p>${a.resumen || a.nota}</p>
          <p>${a.nota}</p>
          ${llaves.length ? `<span class="ver-fotos" role="button" tabindex="0" data-visor-lugar="${llaves.join(',')}" data-visor-titulo="${comillas(a.nombre)}">ver ${llaves.flatMap((k) => fotosDe(k)).length} fotos ⤢</span>` : ''}
        </div>
      </div>
    </button>`;
  }).join('');
}
document.addEventListener('click', (e) => {
  if (e.target.closest('[data-visor-lugar]')) return; // "ver fotos" abre el visor sin dar vuelta la ficha
  const f = e.target.closest('.ficha');
  if (f) f.classList.toggle('vuelta');
});

// ---------- 7. Vuelos y auto ----------
function tramoVuelo(v, de, a, titulo) {
  return `<div class="tramo-vuelo">
    <div class="tv-cuerpo">
      <div class="tv-cabeza"><span>${titulo} · ${v.dia}</span><span>${v.aerolinea} · ${v.escalas}</span></div>
      <div class="tv-horas"><b>${v.sale}</b><i></i><b>${v.llega}</b></div>
      <div class="tv-codigos"><span>${de}</span><span>${v.dur}</span><span>${a}</span></div>
      ${v.nota || v.sello ? `<p class="tv-nota">${{ 'au-ida-1430': 'Almorzamos tranquilos y partimos.', 'au2-v9-1017': 'Llegamos a mediodía: te quedan el sábado y el domingo antes del internado.' }[v.id] || v.nota || v.sello}</p>` : ''}
    </div>
    <div class="tv-precio"><span>c/u</span><b>${milCLP(v.precio)}</b></div>
  </div>`;
}
function pintarTransporte() {
  $('#vuelos-au').innerHTML = tramoVuelo(idaElegida(), 'SCL', 'BBA', 'ida') + tramoVuelo(vueltaElegida(), 'BBA', 'SCL', 'vuelta') +
    '<p class="nota-maleta">La mochila scout va gratis en bodega con la WorldMember de LATAM (una por titular).</p>';
  const a = autoElegido();
  const otro = esB()
    ? B.autos.opciones.find((x) => x.id === (a.id === 'b-tucson' ? 'b-virtus' : 'b-tucson'))
    : DATOS.autos.opciones.find((x) => x.id === (a.id === 'sixt-sonet' ? 'salfa-crosstrek' : 'sixt-sonet'));
  // Barras comparando los dos autos: más largo = mejor (menos en el precio)
  const dato = (etq, v, w, unidad, mejor) => `<div class="barra-dato${mejor ? ' mejor' : ''}"><span>${etq}</span><i><em style="width:${w}%"></em></i><b>${v}${unidad}</b></div>`;
  const pct = (x, y) => Math.round((x / Math.max(x, y)) * 100);
  const pA = totalAuto(a), pO = totalAuto(otro);
  $('#auto').innerHTML = `
    <div class="auto-foto"><img src="${a.foto.src}" alt="${a.modelo}"></div>
    <div class="auto-cabeza"><b>${a.modelo.replace(' o similar', '')}</b>${a.sello ? `<span class="sello">${a.sello}</span>` : ''}</div>
    <p class="auto-tipo">${a.agencia} · ${a.tipo} · ${a.traccion}</p>
    <div class="barras">
      ${dato('rinde', a.consumo, pct(a.consumo, otro.consumo), ' km/l', a.consumo >= otro.consumo)}
      ${dato('despeje', a.despeje / 10, pct(a.despeje, otro.despeje), ' cm', a.despeje >= otro.despeje)}
      ${dato('maletero', a.maletero, pct(a.maletero, otro.maletero), ' L', a.maletero >= otro.maletero)}
      ${dato('precio', milCLP(pA / 2), pct(pO, pA), ' c/u', pA <= pO)}
    </div>
    <p class="auto-nota">${esB() ? `${a.nota} Son ${B.autos.dias} días por ${CLP(pA)} entre los dos.` : a.id === 'sixt-sonet'
      ? `Automático, el que menos gasta y con 19 cm de despeje: en diciembre el ripio hasta O'Higgins se hace bien en 4x2. Son ${decisiones.vuelta === '24' ? 11 : 10} días por ${CLP(pA)} entre los dos.`
      : `Tracción integral y más despeje, como la Tracker del año pasado. Pero en verano no hace falta y sale ${milCLP((pA - pO) / 2)} más cada uno.`}</p>`;
}

// ---------- 8. Dónde dormimos ----------
const ICONO_CARPA = '<svg class="icono" viewBox="0 0 34 34"><path d="M3 28 L17 6 L31 28 Z M17 6 L17 28 M12 28 L17 19 L22 28"/></svg>';
const ICONO_TECHO = '<svg class="icono" viewBox="0 0 34 34"><path d="M5 15 L17 5 L29 15 M8 13 L8 29 L26 29 L26 13 M14 29 L14 20 L20 20 L20 29"/></svg>';
const nochesDe = () => (esB() ? B.dormir : DATOS.dormirAustral.filter((x) => !x.soloSi || String(x.soloSi) === decisiones.vuelta));
const cuantasNoches = (x) => Number((x.donde.match(/\((\d+) noches\)/) || [0, 1])[1]);
function pintarNoches() {
  const lista = nochesDe();
  let carpa = 0, techo = 0;
  $('#noches').innerHTML = lista.map((x, i) => {
    const conTecho = decisiones[claveTecho()].includes(i);
    const n = cuantasNoches(x);
    if (conTecho) techo += n; else carpa += n;
    const mejor = x.techo && x.techo[0];
    const lugar = x.donde.replace(/\s*\(.*\)/, '');
    const abajo = conTecho
      ? (mejor ? `${mejor.n} · ${milCLP(mejor.p)} la noche` : 'hospedaje familiar por WhatsApp')
      : `${x.campingNota || 'camping'} · ${milCLP(x.camping)}`;
    return `<button class="noche${conTecho ? ' techo' : ''}" data-noche="${i}">
      ${n > 1 ? `<span class="x-noches">${n} noches</span>` : ''}
      ${conTecho ? ICONO_TECHO : ICONO_CARPA}
      <span class="cuando">${x.noche}</span>
      <b>${lugar}</b>
      <small>${abajo}</small>
    </button>`;
  }).join('');
  $('#resumen-noches').innerHTML = `<b>${carpa}</b> noches en carpa · <b>${techo}</b> con techo`;
}
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-noche]');
  if (!b) return;
  const i = Number(b.dataset.noche);
  const techo = decisiones[claveTecho()];
  decisiones[claveTecho()] = techo.includes(i) ? techo.filter((x) => x !== i) : [...techo, i];
  guardarDecisiones();
  pintarNoches();
});

// ---------- 9. Guatemala ----------
function pintarGuatemala() {
  const v = avianca();
  const bodega = precioDe(v.extraBodega);
  $('#vuelo-gua').innerHTML = `
    <div class="pase-cuerpo">
      <div><span>ida · ${v.ida.dia} dic</span><b>${v.ida.detalle.replace(' (+1)', '')}</b><small>${v.ida.escalas}</small></div>
      <div><span>vuelta · ${v.vuelta.dia}</span><b>${v.vuelta.detalle.replace(' (+1)', '')}</b><small>llegamos el dom 10</small></div>
    </div>
    <div class="pase-talon"><span>${v.aerolinea} · c/u</span><b>${milCLP(v.precio)}</b><small>+ ${milCLP(bodega)} con bodega</small></div>`;
  pintarRutas();
}
function pintarRutas() {
  const r = DATOS.rutas.find((x) => x.id === decisiones.ruta) || DATOS.rutas[0];
  $('#rutas').innerHTML = DATOS.rutas.map((x) => `<button class="ruta-chip${x.id === r.id ? ' si' : ''}" data-ruta="${x.id}">${x.nombre}</button>`).join('') +
    `<p class="ruta-detalle">${r.resumen}<span class="paradas-ruta">${r.mapaRuta.map((m) => m.split(',')[0]).join(' → ')}</span></p>`;
}
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-ruta]');
  if (!b) return;
  decisiones.ruta = b.dataset.ruta;
  guardarDecisiones();
  pintarRutas();
});

// ---------- 10. Año Nuevo ----------
function pintarAnioNuevo() {
  const ops = esB() ? B.anioNuevo : DATOS.anioNuevo;
  const elegida = decisiones[claveNY()];
  $('#opciones-ny').classList.toggle('hay-eleccion', !!elegida);
  $('#opciones-ny').innerHTML = ops.map((n) => {
    const f = fotosDe(n.fotos[n.id === 'ny-antigua' ? 1 : 0])[n.id === 'ny-acatenango' ? 2 : 0] || fotosDe(n.fotos[0])[0];
    return `<button class="ny${elegida === n.id ? ' elegida' : ''}" data-ny="${n.id}">
      ${f ? `<img src="${f.src}" alt="${n.titulo}" loading="lazy">` : ''}
      <span class="check">${elegida === n.id ? '✓' : ''}</span>
      <div class="ny-texto"><span class="sello">${n.sello}</span><b>${n.titulo}</b><span>${n.donde}</span></div>
    </button>`;
  }).join('');
  const n = ops.find((x) => x.id === elegida);
  if (!n) {
    $('#noche-elegida').innerHTML = '<p class="vacio">Elige una y te muestro cómo sería la noche, hora por hora.</p>';
  } else {
    const tabs = PESTANAS_NY.filter((t) => t.hay(n));
    if (!tabs.some((t) => t.id === pestanaNY)) pestanaNY = 'noche';
    $('#noche-elegida').innerHTML = `
      <div class="ne-cabeza"><b>${n.titulo}</b><span>${n.precio}</span>
        <button type="button" class="link-claro" data-visor-lugar="${n.fotos.join(',')}" data-visor-titulo="${comillas(n.titulo)}">ver fotos ⤢</button></div>
      <div class="ne-pestanas" role="tablist">${tabs.map((t) =>
        `<button type="button" role="tab" data-pestana-ny="${t.id}" aria-selected="${t.id === pestanaNY}">${t.t}</button>`).join('')}</div>
      <div class="ne-panel" role="tabpanel">${PESTANAS_NY.find((t) => t.id === pestanaNY).pinta(n)}</div>`;
  }
  pintarRituales();
}
// Lo que muestra cada pestaña de la noche elegida
let pestanaNY = 'noche';
const listaNY = (items) => `<ul class="ne-lista">${items.map((x, i) => `<li style="animation-delay:${i * 60}ms">${x}</li>`).join('')}</ul>`;
const PESTANAS_NY = [
  { id: 'noche', t: 'la noche', hay: () => true, pinta: (n) =>
    `<ol class="horas">${n.noche.map(([h, q], i) => `<li style="animation-delay:${i * 80}ms"><span>${h}</span><p>${q}</p></li>`).join('')}</ol><p class="ne-pie">${n.calza}</p>` },
  { id: 'cena', t: 'la cena', hay: (n) => n.cena, pinta: (n) =>
    listaNY(n.cena) + (n.mejora ? `<p class="ne-mejora"><b>Para darse un gusto:</b> ${n.mejora}</p>` : '') },
  { id: 'llevar', t: 'qué llevar', hay: (n) => n.llevar, pinta: (n) => listaNY(n.llevar) },
  { id: 'falla', t: 'si llueve', hay: (n) => n.siFalla, pinta: (n) => `<p class="ne-texto">${n.siFalla}</p>${listaNY(n.ojo || [])}` },
  { id: 'costo', t: 'cuánto sale', hay: (n) => n.costo, pinta: (n) => {
    const total = n.costo.reduce((t, c) => t + c[1], 0);
    const aprox = n.costo.some((c) => c[2]) ? '≈ ' : '';
    return `<div class="ne-costo">${n.costo.map(([q, m, a], i) => `<div style="animation-delay:${i * 70}ms"><span>${q}</span><b>${a ? '≈ ' : ''}${milCLP(m)}</b></div>`).join('')}
      <div class="total"><span>cada uno</span><b>${aprox}${milCLP(total)}</b></div></div>`;
  } }
];
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-pestana-ny]');
  if (!b) return;
  pestanaNY = b.dataset.pestanaNy;
  pintarAnioNuevo();
});
// Lo que hacemos a las 12 elijamos lo que elijamos: cartas que se dan vuelta
function pintarRituales() {
  const caja = $('#rituales');
  if (caja.dataset.listo) return;
  caja.dataset.listo = '1';
  caja.innerHTML = `<span class="etiqueta">pase lo que pase, a las 12 · toca una</span>
    <div class="rituales-fila">${B.rituales.map(([t, q], i) => `
      <button type="button" class="ritual">
        <div class="ritual-giro">
          <div class="ritual-cara frente"><span>${String(i + 1).padStart(2, '0')}</span><b>${t}</b></div>
          <div class="ritual-cara dorso"><p>${q}</p></div>
        </div>
      </button>`).join('')}</div>`;
}
document.addEventListener('click', (e) => { const r = e.target.closest('.ritual'); if (r) r.classList.toggle('vuelta'); });
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-ny]');
  if (!b) return;
  decisiones[claveNY()] = decisiones[claveNY()] === b.dataset.ny ? null : b.dataset.ny;
  guardarDecisiones();
  pintarAnioNuevo();
});

// ---------- 11. La plata ----------
// Si la prep se abrió en este navegador, usa su último cálculo. Si no, los números del 4 nov.
const RESPALDO = { persona: 2826167, pasajes: 1125814, austral: 690353, guatemala: 1010000, seguro: 0, auto: 'sixt-sonet', vueltaAU: 'au-v24-1500', visto: '2026-11-04T17:00:00-03:00' };
const RESPALDO_B = { persona: 2287598, pasajes: 663216, playa: 533233, austral: 1091149, playaId: 'florianopolis', hotel: 'Pousada Casa Campeche', noches: 7, auto: 'b-tucson', ida: 'au2-ida-1357', vuelta: 'au2-v9-1017', visto: '2026-11-05T00:00:00-03:00' };
const resumenA = () => guardado.leer('resumen', null, 'prep-') || RESPALDO;
const resumenPlata = () => (esB() ? resumenB() || RESPALDO_B : resumenA());
const modelo = (a) => a.modelo.replace(' o similar', '');
const bencina = (a) => Math.round(((esB() ? B.autos.km : DATOS.autos.km) / a.consumo) * DATOS.autos.litro[a.combustible] / 1000) * 1000;
// Noches con techo que ya cuenta la prep (A: las de Tranquilo; B: Tranquilo y la última en Cerro Castillo)
const TECHO_PREP = { techo: [1], techoB: [1, 8] };

// Lo que cambia la plata con lo que elegimos en la presentación, contra lo que calculó la prep.
// La prep guarda con qué auto y qué vuelta sacó la cuenta; lo demás se compara con su presupuesto base.
// Plan B: la playa y el auto contra lo que eligió la prep
function cambiosB() {
  const r = resumenPlata();
  const lista = [];
  const oPrep = B.playa.opciones.find((o) => o.id === r.playaId) || B.playa.opciones[0];
  const oHoy = playaElegida();
  const nHoy = nochesPlaya(), nPrep = r.noches || B.playa.noches;
  if (oHoy.id !== oPrep.id || nHoy !== nPrep) {
    const cp = costoPlaya(oPrep, nPrep), ch = costoPlaya(oHoy, nHoy);
    const dVuelo = ch.vuelo - cp.vuelo;
    const dPlaya = ch.hotel + ch.traslado + ch.comida - (cp.hotel + cp.traslado + cp.comida);
    const t = oHoy.id !== oPrep.id
      ? `${nombreCorto(oHoy)} en vez de ${nombreCorto(oPrep)}${nHoy !== nPrep ? `, ${nHoy} noches` : ''}`
      : `${nHoy} noches de playa en vez de ${nPrep}`;
    lista.push({ t, d: dVuelo + dPlaya, partes: { pasajes: dVuelo, playa: dPlaya }, aprox: true });
  }
  const aPrep = B.autos.opciones.find((a) => a.id === r.auto) || B.autos.opciones[0];
  const aHoy = autoElegido();
  if (aHoy.id !== aPrep.id) lista.push({ t: `${modelo(aHoy)} en vez del ${modelo(aPrep)}`, d: (precioDe(aHoy.total) + bencina(aHoy) - precioDe(aPrep.total) - bencina(aPrep)) / 2, parte: 'austral' });
  return lista;
}
function cambiosDeHoy() {
  const r = resumenPlata();
  const lista = esB() ? cambiosB() : cambiosA(r);
  if (decisiones.glaciar === 'miradores') lista.push({ t: 'Exploradores solo por los miradores', d: -140000, parte: 'austral', aprox: true });
  if (decisiones.capillas === 'kayak') {
    const k = actividad('capillas-kayak'), l = actividad('capillas-lancha');
    const num = (a, def) => Number(((a && a.precio.match(/\$(\d+) mil/)) || [0, def])[1]) * 1000;
    lista.push({ t: 'Capillas en kayak en vez de lancha', d: num(k, 66) - num(l, 18), parte: 'austral', aprox: true });
  }
  // Noches con techo: cada noche distinta a lo de la prep suma o resta la diferencia con el camping
  const noches = nochesDe();
  const enPrep = TECHO_PREP[claveTecho()];
  let dTecho = 0, nTecho = 0;
  noches.forEach((x, i) => {
    const ahora = decisiones[claveTecho()].includes(i), antes = enPrep.includes(i);
    if (ahora === antes) return;
    const p = x.techo && x.techo[0] ? x.techo[0].p : 50000;
    const n = cuantasNoches(x);
    dTecho += (ahora ? 1 : -1) * n * (p - x.camping) / 2;
    nTecho += (ahora ? 1 : -1) * n;
  });
  if (nTecho || Math.abs(dTecho) >= 1000) lista.push({ t: nTecho >= 0 ? `${nTecho} ${nTecho === 1 ? 'noche más' : 'noches más'} con techo` : `${-nTecho} ${nTecho === -1 ? 'noche menos' : 'noches menos'} con techo`, d: dTecho, parte: 'austral', aprox: true });
  // Año Nuevo en La Casa del Mundo: dos noches de pieza Standard en vez de un hostal en Antigua
  if (!esB() && decisiones.anioNuevo === 'ny-atitlan') lista.push({ t: 'Año Nuevo en La Casa del Mundo', d: (118 * DATOS.usd - 45000), parte: 'guatemala', aprox: true });
  return lista;
}
// Plan A: la vuelta y el auto contra lo que eligió la prep
function cambiosA(r) {
  const vPrep = AU.vueltas.find((v) => v.id === r.vueltaAU) || AU.vueltas.find((v) => v.recomendado);
  const diaPrep = String(vPrep.fecha);
  const aPrep = DATOS.autos.opciones.find((a) => a.id === r.auto) || DATOS.autos.opciones.find((a) => a.recomendado);
  const aHoy = autoElegido(), vHoy = vueltaElegida();
  const arriendo = (a, dia) => precioDe(dia === '24' ? a.total24 : a.total);
  const lista = [];
  if (vHoy.id !== vPrep.id) lista.push({ t: `volver el ${decisiones.vuelta} en vez del ${diaPrep}`, d: vHoy.precio - vPrep.precio, parte: 'pasajes' });
  const dAuto = (arriendo(aHoy, decisiones.vuelta) + bencina(aHoy) - arriendo(aPrep, diaPrep) - bencina(aPrep)) / 2;
  if (Math.abs(dAuto) >= 1000) lista.push({ t: aHoy.id !== aPrep.id ? `${modelo(aHoy)} en vez del ${modelo(aPrep)}` : `auto por ${decisiones.vuelta === '24' ? 11 : 10} días`, d: dAuto, parte: 'austral' });
  if (decisiones.vuelta !== diaPrep) {
    // Un día más o menos: comida ($10 mil c/u) y una noche (≈ $28 mil la pieza, a la mitad)
    const n = decisiones.vuelta === '24' ? 1 : -1;
    lista.push({ t: n > 0 ? 'un día más en el sur' : 'un día menos en el sur', d: n * 24000, parte: 'austral', aprox: true });
  }
  return lista;
}
function plataDeHoy() {
  const r = Object.assign({}, resumenPlata());
  const cambios = cambiosDeHoy();
  cambios.forEach((c) => {
    if (c.partes) Object.entries(c.partes).forEach(([k, v]) => { r[k] += v; });
    else r[c.parte] += c.d;
    r.persona += c.d;
  });
  r.cambios = cambios;
  return r;
}
function pintarPlata(animar) {
  const r = plataDeHoy();
  const partes = esB()
    ? [
      { t: 'pasajes', v: r.pasajes, c: 'var(--negro)' },
      { t: 'en la playa', v: r.playa, c: '#9a9a9a' },
      { t: 'en la austral', v: r.austral, c: 'var(--acento)' }
    ]
    : [
      { t: 'pasajes', v: r.pasajes, c: 'var(--negro)' },
      { t: 'en la austral', v: r.austral, c: 'var(--acento)' },
      { t: 'en guatemala', v: r.guatemala, c: '#9a9a9a' },
      ...(r.seguro ? [{ t: 'seguro', v: r.seguro, c: '#cfcfcf' }] : [])
    ];
  const el = $('#plata-persona');
  if (animar) contar(el, r.persona, CLP); else el.textContent = CLP(r.persona);
  $('#plata-dos').textContent = `los dos: ${CLP(r.persona * 2)} · cada uno paga su pasaje y el resto va a la mitad`;
  $('#plata-barra').innerHTML = partes.map((p) => `<i style="background:${p.c}" data-w="${(p.v / r.persona) * 100}"></i>`).join('');
  $('#plata-leyenda').innerHTML = partes.map((p) => `<span><i style="background:${p.c}"></i>${p.t} <b>${CLP(p.v)}</b></span>`).join('');
  requestAnimationFrame(() => requestAnimationFrame(() => $$('#plata-barra i').forEach((i) => { i.style.width = i.dataset.w + '%'; })));
  const pos = Math.max(0, Math.min(100, ((r.persona - 2000000) / 1500000) * 100));
  $('#medidor-marca').style.left = '0%';
  setTimeout(() => { $('#medidor-marca').style.left = pos + '%'; }, animar ? 300 : 0);
  const P = DATOS.presupuesto.tope;
  let v;
  if (r.persona < P.min) v = `<b>Holgado.</b> Queda bajo lo que pensábamos: hay espacio para darnos algún gusto.`;
  else if (r.persona <= P.max) v = `<b>Nos alcanza.</b> Queda dentro de lo que conversamos, entre ${M1(P.min)} y ${M1(P.max)} cada uno.`;
  else v = `<b>Un poco arriba</b> de lo que conversamos, por ${milCLP(r.persona - P.max)}. En la prep hay cosas para mover.`;
  // Contra el otro plan, con lo que dejó calculado la prep
  const otro = esB() ? resumenA().persona : (resumenB() || RESPALDO_B).persona;
  const dif = r.persona - otro;
  if (Math.abs(dif) >= 1000) v += ` El plan ${esB() ? 'A' : 'B'} sale ${milCLP(Math.abs(dif))} ${dif < 0 ? 'más' : 'menos'}.`;
  $('#veredicto').innerHTML = v;
  const signo = (d) => (d >= 0 ? '+' : '−') + milCLP(Math.abs(d));
  $('#plata-cambios').innerHTML = r.cambios.length
    ? `<span class="etiqueta">con lo que elegimos hoy</span><ul>${r.cambios.map((c) => `<li><b>${c.aprox ? '≈ ' : ''}${signo(c.d)}</b>${c.t}</li>`).join('')}</ul>`
    : '';
  const f = new Date(r.visto);
  $('#plata-fuente').textContent = `Sale de la calculadora de la prep (${f.getDate()} de ${['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sept', 'oct', 'nov', 'dic'][f.getMonth()]}). Ahí se puede mover cualquier número.`;
}

// ---------- 12. Lo que compramos hoy ----------
// Plan B: lo del sur primero (es lo que se compra hoy) y la playa, que puede esperar al Black Friday
function itemsCompraB() {
  const o = playaElegida(), c = costoPlaya(o), ida = idaElegida(), vuelta = vueltaElegida(), a = autoElegido();
  const res = (id) => B.reservas.find((r) => r.id === id);
  const deReserva = (id, que, det) => { const r = res(id); return r ? { id, que: que || r.que, det: det || r.detalle, precio: r.precio, link: r.link } : null; };
  const ny = B.anioNuevo.find((n) => n.id === decisiones.anioNuevoB);
  const items = [
    { id: 'pasajes-au2', que: 'Pasajes a Balmaceda', det: `LATAM ${ida.dia} ${ida.sale} y ${vuelta.dia} ${vuelta.sale} · mochila en bodega gratis con la WorldMember`, precio: `${milCLP(ida.precio + vuelta.precio)} c/u`, link: B.vuelosAU.link },
    { id: 'auto-b', que: `Auto · ${modelo(a)}`, det: `${a.agencia} · ${B.autos.dias} días · elegir cancelación gratis`, precio: `${CLP(precioDe(a.total))} los dos`, link: B.autos.link },
    decisiones.glaciar === 'hielo' ? deReserva('rb-exploradores', 'Glaciar Exploradores') : null,
    deReserva('rb-ohiggins', "Alojamiento en Villa O'Higgins", 'Del 3 al 5 de enero. Hay poco y se llena.'),
    deReserva('rb-anio-nuevo', 'Año Nuevo', ny ? `Elegimos: ${ny.titulo.toLowerCase()}.` : 'Depende de lo que elijamos.'),
    deReserva('rb-barcaza', 'Barcaza Chile Chico → Puerto Ibáñez'),
    { id: 'playa-vuelo', que: `Vuelo a ${nombreCorto(o)}`, det: `${o.vuelo.aerolinea} lun 14 ${o.vuelo.ida.split(' ')[0]} · puede esperar al Black Friday (27 al 30 nov)`, precio: `${milCLP(c.vuelo)} c/u`, link: linkVueloPlaya(o) },
    { id: 'playa-hotel', que: c.h.n, det: `${nochesPlaya()} noches con cancelación gratis, así podemos esperar el Black Friday`, precio: `${milCLP(c.h.p)} la noche`, link: busquedaHoteles(`${c.h.n} 14 al ${14 + nochesPlaya()} de diciembre 2026`) }
  ];
  return items.filter(Boolean);
}
function itemsCompra() {
  if (esB()) return itemsCompraB();
  const ida = idaElegida(), vuelta = vueltaElegida(), a = autoElegido(), v = avianca();
  const ny = decisiones.anioNuevo;
  const items = [
    { id: 'pasajes-au', que: 'Pasajes a Balmaceda', det: `LATAM ${ida.dia} ${ida.sale} y ${vuelta.dia} ${vuelta.sale}`, precio: `${milCLP(ida.precio + vuelta.precio)} c/u`, link: DATOS.linkAustral[decisiones.vuelta] },
    { id: 'auto', que: `Auto · ${a.modelo.replace(' o similar', '')}`, det: `${a.agencia} en el aeropuerto · elegir cancelación gratis`, precio: `${CLP(totalAuto(a))} los dos`, link: DATOS.autos.link[decisiones.vuelta] },
    { id: 'avianca', que: 'Pasajes a Guatemala', det: `${v.aerolinea} ${v.ida.dia} dic ${v.ida.detalle.split(' ')[0]} · tarifa Classic si llevamos bodega`, precio: `${milCLP(v.precio + precioDe(v.extraBodega))} c/u`, link: v.link }
  ];
  const ruta = DATOS.rutas.find((x) => x.id === decisiones.ruta);
  if (!ruta || ruta.internos) items.push({ id: 'flores', que: 'Vuelo Flores → Guatemala', det: DATOS.vueloFlores.detalle.split(' · ').slice(0, 2).join(' · '), precio: `${milCLP(DATOS.vueloFlores.precio + (DATOS.vueloFlores.extraBodega || 0))} c/u`, link: DATOS.vueloFlores.link });
  const aca = reserva('res-acatenango');
  if (aca) items.push({ id: 'acatenango', que: 'Acatenango con Lava Trails', det: ny === 'ny-acatenango' ? 'Elegir el jue 31: Año Nuevo en el volcán. Abono de USD 50.' : 'Elegir el lun 28. Abono de USD 50 que devuelven.', precio: aca.precio, link: aca.link });
  if (decisiones.glaciar === 'hielo') { const r = reserva('res-exploradores'); if (r) items.push({ id: 'exploradores', que: 'Glaciar Exploradores', det: 'Viajero Austral: preguntar si salen en diciembre y dejar el abono', precio: r.precio, link: r.link }); }
  const oh = reserva('res-dormir-ohiggins');
  if (oh) items.push({ id: 'ohiggins', que: "Alojamiento en Villa O'Higgins", det: 'Hay poco y se llena', precio: oh.precio, link: oh.link });
  if (ny === 'ny-antigua') {
    const an = reserva('res-antigua');
    if (an) items.push({ id: 'antigua', que: 'Hostal en Antigua para Año Nuevo', det: 'Del 30 dic al 1 ene, con cancelación gratis', precio: an.precio, link: an.link });
    items.push({ id: 'tenedor', que: 'Mesa en El Tenedor del Cerro', det: 'Llamar al +502 7820-1220 y preguntar por el menú del 31', precio: '≈ Q180 c/u', link: DATOS.anioNuevo.find((x) => x.id === 'ny-antigua').links[0].url });
  } else if (ny === 'ny-atitlan') {
    items.push({ id: 'casa-mundo', que: 'La Casa del Mundo para Año Nuevo', det: 'Llegar el 30 y quedarse dos noches', precio: 'USD 118 a 145 la noche', link: DATOS.anioNuevo.find((x) => x.id === 'ny-atitlan').links[0].url });
  } else if (!ny) {
    const r = reserva('res-anio-nuevo');
    if (r) items.push({ id: 'anio-nuevo', que: 'Año Nuevo', det: 'Depende de lo que elijamos', precio: r.precio, link: r.link });
  }
  return items;
}
function pintarCompras() {
  const items = itemsCompra();
  $('#compras').innerHTML = items.map((x) => `
    <li class="compra${decisiones.compradas[x.id] ? ' lista' : ''}">
      <input type="checkbox" data-compra="${x.id}" ${decisiones.compradas[x.id] ? 'checked' : ''} aria-label="comprado">
      <div class="compra-que"><b>${x.que}</b><small>${x.det}</small></div>
      <span class="compra-precio">${x.precio}</span>
      <a href="${x.link}" target="_blank" rel="noopener">ir ↗</a>
    </li>`).join('');
  const hechos = items.filter((x) => decisiones.compradas[x.id]).length;
  $('#compras-total').textContent = `${hechos} de ${items.length} listos. Si pago todo con mi tarjeta, lo tuyo de pasajes es ${CLP(plataDeHoy().pasajes)} y me lo transfieres después.`;
}
document.addEventListener('change', (e) => {
  const c = e.target.closest('[data-compra]');
  if (!c) return;
  decisiones.compradas[c.dataset.compra] = c.checked;
  guardarDecisiones();
  pintarCompras();
});

// ---------- 13. El acta ----------
function pintarActa() {
  const ny = (esB() ? B.anioNuevo : DATOS.anioNuevo).find((x) => x.id === decisiones[claveNY()]);
  const lista = nochesDe();
  const techo = lista.reduce((s, x, i) => s + (decisiones[claveTecho()].includes(i) ? cuantasNoches(x) : 0), 0);
  const total = lista.reduce((s, x) => s + cuantasNoches(x), 0);
  const items = itemsCompra();
  const o = playaElegida();
  const filas = [
    ['plan', esB() ? 'B · playa + austral larga' : 'A · austral 2.0 + guatemala'],
    ...(esB()
      ? [['playa', `${o.nombre} · ${nochesPlaya()} noches desde el lun 14`], ['hotel', hotelPlaya(o).n], ['el sur', 'sábado 26 dic al sábado 9 ene']]
      : [['vuelta del sur', decisiones.vuelta === '24' ? 'jueves 24, para la Nochebuena' : 'miércoles 23']]),
    ['glaciar', decisiones.glaciar === 'hielo' ? 'caminando sobre el hielo' : 'solo los miradores'],
    ['capillas de mármol', decisiones.capillas === 'kayak' ? 'en kayak' : 'en lancha'],
    ['auto', autoElegido().modelo.replace(' o similar', '')],
    ['noches', `${total - techo} en carpa · ${techo} con techo`],
    ...(esB() ? [] : [['guatemala', 'la armas tú']]),
    ['año nuevo', ny ? ny.titulo : 'por elegir'],
    ['por persona', CLP(plataDeHoy().persona)],
    ['comprado', `${items.filter((x) => decisiones.compradas[x.id]).length} de ${items.length}`]
  ];
  $('#acta').innerHTML = filas.map(([a, b]) => `<li><span>${a}</span><b>${b}</b></li>`).join('');
  $('#timbre').classList.toggle('puesto', !!decisiones.aprobado);
}
function papelitos() {
  const colores = ['#c4552d', '#f4f1ea', '#ffffff', '#202020', '#e08a62'];
  for (let i = 0; i < 90; i++) {
    const p = document.createElement('i');
    p.className = 'papelito';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.background = colores[i % colores.length];
    p.style.setProperty('--dx', (Math.random() * 200 - 100) + 'px');
    p.style.setProperty('--giro', (Math.random() * 1080 - 540) + 'deg');
    p.style.animationDuration = (2.2 + Math.random() * 2) + 's';
    p.style.animationDelay = Math.random() * 0.5 + 's';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 5000);
  }
}
$('#aprobar').addEventListener('click', () => {
  decisiones.aprobado = true;
  guardarDecisiones();
  const t = $('#timbre');
  t.classList.remove('puesto');
  void t.offsetWidth;
  t.classList.add('puesto');
  setTimeout(papelitos, 250);
});

// Copiar el acta para mandarla por WhatsApp
$('#copiar-acta').addEventListener('click', () => {
  const texto = ['*Acta · Agencia SiempreLab* (6 nov 2026)', ...$$('#acta li').map((li) => `· ${li.querySelector('span').textContent}: ${li.querySelector('b').textContent}`), 'taxss agus'].join('\n');
  const listo = () => { $('#copiar-acta').textContent = 'copiada ✓'; setTimeout(() => { $('#copiar-acta').textContent = 'copiar el acta'; }, 2500); };
  // Si el navegador no deja usar el portapapeles moderno, se copia a la antigua
  const aLaAntigua = () => {
    const t = document.createElement('textarea');
    t.value = texto;
    t.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(t);
    t.select();
    try { if (document.execCommand('copy')) listo(); } catch (e) { /* no se pudo */ }
    t.remove();
  };
  if (navigator.clipboard) navigator.clipboard.writeText(texto).then(listo).catch(aLaAntigua);
  else aLaAntigua();
});

// Empezar de cero: borra lo elegido y vuelve a la portada
$('#reiniciar').addEventListener('click', () => {
  try { localStorage.removeItem('propuesta-decisiones'); } catch (e) { /* sin guardado */ }
  location.hash = '#1';
  location.reload();
});

// ---------- Repintar lo que depende de las elecciones ----------
function repintar() {
  pintarPase();
  pintarCalendario();
  pintarPlaya();
  pintarBlackFriday();
  pintarDias();
  pintarGlaciar();
  pintarMosaico();
  pintarTransporte();
  pintarNoches();
  pintarCompras();
  pintarActa();
}
// ---------- Navegación entre láminas ----------
const todas = $$('.lamina');
let laminas = [];
let actual = 0;
todas.forEach((l) => $$('[data-a]', l).forEach((el, i) => el.style.setProperty('--i', i)));
// Solo las láminas del plan elegido, numeradas en orden
function armarLaminas() {
  laminas = todas.filter((l) => !l.dataset.solo || l.dataset.solo === decisiones.plan);
  todas.forEach((l) => { if (!laminas.includes(l)) l.classList.remove('activa'); });
  const nombre = (l) => (esB() && l.dataset.nombreB) || l.dataset.nombre;
  $('#avance').innerHTML = laminas.map((l, i) => `<button data-ir="${i}" aria-label="${nombre(l)}" title="${nombre(l)}"></button>`).join('');
  laminas.forEach((l, i) => $$('.etiqueta', l).forEach((e) => {
    if (/^\d\d \//.test(e.textContent)) e.textContent = e.textContent.replace(/^\d\d/, String(i).padStart(2, '0'));
  }));
}
// Cambiar de plan: se rearma todo y se queda en la misma lámina si existe en el otro plan
function aplicarPlan() {
  document.documentElement.dataset.plan = decisiones.plan;
  // Si se abrió con ?plan=, se saca para que al recargar mande lo elegido
  if (location.search) history.replaceState(null, '', location.pathname + location.hash);
  const antes = laminas[actual];
  armarLaminas();
  pintarMapa();
  pintarAnioNuevo();
  pintarPlata(false);
  repintar();
  actual = 0;
  ir(Math.max(0, laminas.indexOf(antes)));
}

// Lo que pasa al entrar a cada lámina
const alEntrar = {
  'austral 2.0': () => { dibujarRuta(); if (!$('#mapa .tocado')) tocarPunto('castillo'); },
  'día a día': () => { $('#dias').scrollLeft = 0; },
  'cómo nos movemos': pintarTransporte,
  'black friday': relojBF,
  'la plata': () => pintarPlata(true),
  'hoy': pintarCompras,
  '¿partimos?': pintarActa
};

function ir(n) {
  n = Math.max(0, Math.min(laminas.length - 1, n));
  laminas[actual].classList.remove('activa');
  actual = n;
  const l = laminas[actual];
  l.classList.add('activa');
  l.scrollTop = 0;
  $$('#avance button').forEach((b, i) => { b.classList.toggle('actual', i === actual); b.classList.toggle('hecha', i < actual); });
  $('#contador').textContent = `${String(actual + 1).padStart(2, '0')} / ${laminas.length}`;
  $('#anterior').disabled = actual === 0;
  $('#siguiente').disabled = actual === laminas.length - 1;
  history.replaceState(null, '', '#' + (actual + 1));
  // Los interruptores necesitan la lámina visible para medir dónde va la píldora
  requestAnimationFrame(() => $$('.interruptor', l).forEach(pintarInterruptor));
  if (alEntrar[l.dataset.nombre]) alEntrar[l.dataset.nombre]();
  // Las fotos de esta lámina y de la que sigue se piden altiro, para que no aparezcan de a poco
  [l, laminas[actual + 1]].filter(Boolean).forEach((x) => $$('img[loading="lazy"]', x).forEach((img) => { img.loading = 'eager'; }));
  document.body.style.background = l.classList.contains('clara') ? 'var(--fondo)' : 'var(--noche)';
}

document.addEventListener('click', (e) => { const b = e.target.closest('[data-ir]'); if (b) ir(Number(b.dataset.ir)); });
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-ir-nombre]');
  if (!b) return;
  const i = laminas.findIndex((l) => l.dataset.nombre === b.dataset.irNombre);
  if (i >= 0) ir(i);
});
// Si se cambia el número a mano en la dirección (#5), se va a esa lámina
window.addEventListener('hashchange', () => {
  const n = (parseInt(location.hash.slice(1), 10) || 1) - 1;
  if (n !== actual) ir(n);
});
$('#anterior').addEventListener('click', () => ir(actual - 1));
$('#siguiente').addEventListener('click', () => ir(actual + 1));
$('#pantalla').addEventListener('click', pantallaCompleta);
function pantallaCompleta() {
  if (document.fullscreenElement) document.exitFullscreen();
  else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {});
}
document.addEventListener('keydown', (e) => {
  if (e.target.matches && e.target.matches('input, textarea')) return;
  if ($('.visor:not([hidden])')) return; // con las fotos abiertas, las flechas son del visor
  if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); ir(actual + 1); }
  else if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); ir(actual - 1); }
  else if (e.key === 'Home') ir(0);
  else if (e.key === 'End') ir(laminas.length - 1);
  else if (e.key === 'f' || e.key === 'F') pantallaCompleta();
});

// Deslizar con el dedo (menos dentro de lo que ya se desliza solo)
let toque = null;
$('#pres').addEventListener('touchstart', (e) => {
  if (e.target.closest('.carril, .horas, .tira-fotos, .ne-pestanas, input, .visor')) { toque = null; return; }
  toque = { x: e.touches[0].clientX, y: e.touches[0].clientY };
}, { passive: true });
$('#pres').addEventListener('touchend', (e) => {
  if (!toque) return;
  const dx = e.changedTouches[0].clientX - toque.x;
  const dy = e.changedTouches[0].clientY - toque.y;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) ir(actual + (dx < 0 ? 1 : -1));
  toque = null;
}, { passive: true });
window.addEventListener('resize', () => $$('.lamina.activa .interruptor').forEach(pintarInterruptor));

// ---------- Arranque ----------
pintarPortada();
// Fondos de fotos que rotan (una sola vez)
fondoRotativo($('#glaciar-fotos'), $('#glaciar-credito'), [...fotosDe('exploradores-hielo'), ...fotosDe('exploradores')], 5000);
fondoRotativo($('#gua-fotos'), $('#gua-credito'), [...fotosDe('atitlan'), ...fotosDe('antigua').slice(0, 2), ...fotosDe('tikal').slice(0, 1)], 6000);
fondoRotativo($('#cierre-fotos'), null, [...fotosDe('villa-ohiggins').slice(0, 1), ...fotosDe('acatenango').slice(1, 2)], 7000);
pintarCalendario();
pintarMapa();
pintarGuatemala();
pintarAnioNuevo();
pintarPasosBF();
pintarPlata(false);
repintar();
armarLaminas();
ir(Math.max(0, (parseInt(location.hash.slice(1), 10) || 1) - 1));

// Precios al día de la prep (los mismos que actualiza GitHub dos veces al día)
fetch('../prep/precios.json', { cache: 'no-store' })
  .then((r) => (r.ok ? r.json() : null))
  .then((pv) => {
    if (!pv || !pv.vuelos) return;
    [...DATOS.vuelosCA, ...AU.idas, ...AU.vueltas, DATOS.vueloFlores, ...B.playa.opciones.map((o) => o.vuelo), ...B.vuelosAU.idas, ...B.vuelosAU.vueltas].forEach((v) => {
      const x = pv.vuelos[v.id];
      if (x && x.precio) v.precio = x.precio;
    });
    pintarGuatemala();
    repintar();
  })
  .catch(() => { /* sin precios al día: quedan los de datos.js */ });
