// La propuesta · Agencia de Viajes SiempreLab
// Presentación para el viernes 6 nov: lo que vi y avancé, lámina por lámina.
// Los datos salen de la prep (datos.js, lugares.js, fotos-panoramas.js y precios.json),
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

// Lo que vamos decidiendo durante la presentación
const decisiones = Object.assign(
  { vuelta: '24', glaciar: 'hielo', capillas: 'lancha', auto: 'sixt-sonet', techo: [1], anioNuevo: null, ruta: 'guatemala', compradas: {}, aprobado: false },
  guardado.leer('decisiones', {})
);
const guardarDecisiones = () => guardado.escribir('decisiones', decisiones);

// Atajos a los datos de la prep
const AU = DATOS.vuelosAustral;
const actividad = (id) => [...DATOS.actividadesAustral, ...DATOS.actividadesCA].find((a) => a.id === id);
const reserva = (id) => DATOS.reservas.find((r) => r.id === id);
const fotosDe = (llave) => (typeof FOTOS_PANORAMAS !== 'undefined' && FOTOS_PANORAMAS[llave]) || (LUGARES[llave] ? LUGARES[llave].fotos : []);
const idaElegida = () => AU.idas.find((v) => v.recomendado) || AU.idas[0];
const vueltaElegida = () => AU.vueltas.find((v) => String(v.fecha) === decisiones.vuelta && v.aerolinea === 'LATAM' && v.sale === '15:00') || AU.vueltas.find((v) => String(v.fecha) === decisiones.vuelta);
const autoElegido = () => DATOS.autos.opciones.find((a) => a.id === decisiones.auto) || DATOS.autos.opciones[0];
const totalAuto = (a) => precioDe(decisiones.vuelta === '24' ? a.total24 : a.total);
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
  const valor = decisiones[caja.dataset.decision];
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
  repintar();
});

// ---------- 1. Portada ----------
function pintarPortada() {
  const fotos = DATOS.hero.map((h) => LUGARES[h.lugar] && LUGARES[h.lugar].fotos[h.foto]).filter(Boolean);
  fondoRotativo($('#portada-fotos'), $('#portada-credito'), fotos, 5500);
  const cuenta = () => {
    const ms = new Date(DATOS.despegue) - new Date();
    if (ms <= 0) { $('#cuenta').textContent = '¡ya!'; return; }
    const d = Math.floor(ms / 86400000);
    const h = Math.floor((ms % 86400000) / 3600000);
    $('#cuenta').textContent = `${d} d ${h} h`;
  };
  cuenta();
  setInterval(cuenta, 60000);
}

// ---------- 2. Calendario del verano ----------
const INICIO = new Date('2026-12-01T00:00:00-03:00');
const DIAS_CAL = 42; // 1 dic al 11 ene
const diaDe = (iso, hora = 0) => (new Date(iso + 'T00:00:00-03:00') - INICIO) / 86400000 + hora / 24;
const TRAMOS = [
  { desde: diaDe('2026-12-04'), hasta: diaDe('2026-12-11'), clase: 'gris', t: 'Brasil', s: 'tú con tu papá', d: '<b>Brasil.</b> Tú con tu papá, vuelves el 10 u 11. Yo ando en mi viaje sorpresa.' },
  { desde: diaDe('2026-12-13', 14.5), hasta: diaDe('2026-12-24', 18.5), clase: 'acento', t: 'Austral 2.0', s: '13 al 24 dic', d: '<b>Austral 2.0.</b> Salimos el domingo 13 después de almuerzo (el matrimonio es la noche antes) y volvemos el 24 para la Nochebuena.' },
  { desde: diaDe('2026-12-25', 16.25), hasta: diaDe('2027-01-10', 1), clase: 'negro', t: 'Guatemala', s: '25 dic al 10 ene', d: '<b>Guatemala.</b> Almorzamos en Navidad y partimos a las 16:15. Volvemos el sábado 9 y llegamos el domingo 10 a la 01:05.' }
];
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
      ${TRAMOS.map((t, i) => `<button class="cal-tramo ${t.clase}" data-tramo="${i}" style="left:${pct(t.desde)}%;width:${pct(t.hasta - t.desde)}%;transition-delay:${0.3 + i * 0.25}s"><b>${t.t}</b><small>${t.s}</small></button>`).join('')}
      ${HITOS.map((h, i) => `<button class="cal-hito ${h.clase || ''}" data-hito="${i}" style="left:${pct(h.dia)}%">${h.t}</button>`).join('')}
    </div>`;
}
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-tramo], [data-hito]');
  if (!t) return;
  const dato = t.dataset.tramo !== undefined ? TRAMOS[t.dataset.tramo] : HITOS[t.dataset.hito];
  $$('.cal-tramo').forEach((x) => x.classList.toggle('elegido', x === t));
  $('#detalle-cal').innerHTML = dato.d;
});

// ---------- 3. Mapa de la Austral ----------
// Coordenadas reales (lat, lon). viejo: lo que hicimos en 2025.
const PUNTOS = {
  coyhaique: { lat: -45.57, lon: -72.07, n: 'Coyhaique', viejo: true, lado: 'der' },
  balmaceda: { lat: -45.92, lon: -71.69, n: 'Balmaceda ✈', lado: 'der', lugar: 'carretera-austral', d: 'Llegamos el 13 a las 16:49, sacamos el auto en el aeropuerto y partimos al sur.' },
  castillo: { lat: -46.12, lon: -72.16, n: 'Cerro Castillo', lado: 'der', lugar: 'cerro-castillo', d: 'Donde terminamos el 2025. Primera noche y de aquí para abajo todo es nuevo.' },
  tranquilo: { lat: -46.62, lon: -72.67, n: 'Río Tranquilo', lado: 'izq', lugar: 'capillas-marmol', d: 'Tres noches: Capillas de Mármol y el Glaciar Exploradores.' },
  guadal: { lat: -46.84, lon: -72.70, n: 'Puerto Guadal', lado: 'der', lugar: 'general-carrera', d: 'La última noche antes de volver, a la orilla del General Carrera.' },
  bertrand: { lat: -47.02, lon: -72.83, n: 'Puerto Bertrand', lado: 'izq', lugar: 'confluencia-baker', d: 'El Baker turquesa y la confluencia con el Nef.' },
  chacabuco: { lat: -47.13, lon: -72.48, n: 'Parque Patagonia', lado: 'der', lugar: 'parque-patagonia', d: 'Valle Chacabuco: guanacos, Lagunas Altas y camping.' },
  cochrane: { lat: -47.25, lon: -72.57, n: 'Cochrane', lado: 'der', abajo: true, lugar: 'parque-patagonia', d: 'El último pueblo grande: estanque lleno y súper antes de seguir.' },
  tortel: { lat: -47.80, lon: -73.54, n: 'Caleta Tortel', lado: 'izq', lugar: 'tortel', d: 'El pueblo sin calles: todo por pasarelas sobre el agua.' },
  yungay: { lat: -47.97, lon: -73.39, n: 'Barcaza', lado: 'der', abajo: true, lugar: 'carretera-austral', d: 'Puerto Yungay → Río Bravo: 45 min de barcaza, gratis.' },
  ohiggins: { lat: -48.47, lon: -72.56, n: "Villa O'Higgins", lado: 'der', lugar: 'villa-ohiggins', d: 'El fin de la Carretera Austral. Dos noches y el glaciar si hay cupo.' }
};
// Por dónde va el camino (algunos quiebres para que siga la carretera)
const CAMINO_2025 = [[-44.9, -72.6], [-45.25, -72.25], 'coyhaique', [-45.75, -72.0], 'castillo'];
const CAMINO_2026 = ['balmaceda', [-46.0, -71.95], 'castillo', [-46.35, -72.35], [-46.5, -72.62], 'tranquilo', [-46.85, -72.66], 'bertrand', [-47.08, -72.66], 'chacabuco', 'cochrane', [-47.55, -72.85], [-47.75, -73.15], 'yungay', [-48.05, -73.2], [-48.2, -72.95], 'ohiggins'];
const RAMAL_TORTEL = [[-47.75, -73.15], [-47.78, -73.35], 'tortel'];
const RAMAL_GUADAL = [[-46.85, -72.66], 'guadal'];

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
  const puntos = Object.entries(PUNTOS).map(([id, pt]) => {
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
    <text x="${Number(bx) + 8}" y="14" fill="rgba(255,255,255,.45)" font-family="Space Mono" font-size="9">desde Santiago</text>
    ${puntos}`;
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
  const f = fotosDe(pt.lugar)[0];
  $('#parada-tocada').innerHTML = `${f ? `<img src="${f.src}" alt="${pt.n}">` : ''}<div><b>${pt.n}</b>${pt.d}</div>`;
}
document.addEventListener('click', (e) => { const g = e.target.closest('[data-punto]'); if (g) tocarPunto(g.dataset.punto); });

// ---------- 4. Día a día ----------
function pintarDias() {
  const R = DATOS.rutaAustral;
  const paradas = [...R.paradas, ...R.finales[decisiones.vuelta]];
  $('#titulo-dias').textContent = decisiones.vuelta === '24' ? 'Doce días hacia el sur' : 'Once días hacia el sur';
  $('#dias').innerHTML = paradas.map((p, i) => {
    const f = p.lugar ? fotosDe(p.lugar)[0] : null;
    const esFinal = i >= R.paradas.length;
    return `<article class="dia${esFinal ? ' nuevo-final' : ''}">
      <div class="dia-foto${f ? '' : ' sin-foto'}">${f ? `<img src="${f.src}" alt="${p.titulo}" loading="lazy">` : '✈'}<span class="num">${p.dias.split(' · ')[0]}</span></div>
      <div class="dia-texto">
        <span class="cuando">${p.dias.split(' · ').slice(1).join(' · ') || p.dias}</span>
        <b>${p.titulo}</b>
        <p>${p.detalle}</p>
        <span class="manejo">${p.manejo}</span>
      </div>
    </article>`;
  }).join('');
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
function pintarMosaico() {
  const ids = [decisiones.capillas === 'kayak' ? 'capillas-kayak' : 'capillas-lancha', 'confluencia-baker', 'parque-patagonia', 'tortel', 'ohiggins', 'barcaza'];
  $('#mosaico').innerHTML = ids.map((id) => {
    const a = actividad(id);
    if (!a) return '';
    const f = fotosDe(id)[0] || fotosDe(a.lugar || '')[0];
    // En la foto va solo lo corto; el precio entero queda atrás
    const precioCorto = { 'confluencia-baker': 'mirador gratis', ohiggins: 'consultar' }[id] || a.precio.split(' · ')[0];
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
        </div>
      </div>
    </button>`;
  }).join('');
}
document.addEventListener('click', (e) => { const f = e.target.closest('.ficha'); if (f) f.classList.toggle('vuelta'); });

// ---------- 7. Vuelos y auto ----------
function tramoVuelo(v, de, a, titulo) {
  return `<div class="tramo-vuelo">
    <div class="tv-cuerpo">
      <div class="tv-cabeza"><span>${titulo} · ${v.dia}</span><span>${v.aerolinea} · ${v.escalas}</span></div>
      <div class="tv-horas"><b>${v.sale}</b><i></i><b>${v.llega}</b></div>
      <div class="tv-codigos"><span>${de}</span><span>${v.dur}</span><span>${a}</span></div>
      ${v.nota || v.sello ? `<p class="tv-nota">${v.id === 'au-ida-1430' ? 'Almorzamos tranquilos y partimos.' : (v.nota || v.sello)}</p>` : ''}
    </div>
    <div class="tv-precio"><span>c/u</span><b>${milCLP(v.precio)}</b></div>
  </div>`;
}
function pintarTransporte() {
  $('#vuelos-au').innerHTML = tramoVuelo(idaElegida(), 'SCL', 'BBA', 'ida') + tramoVuelo(vueltaElegida(), 'BBA', 'SCL', 'vuelta') +
    '<p class="nota-maleta">La mochila scout va gratis en bodega con la WorldMember de LATAM (una por titular).</p>';
  const a = autoElegido();
  const otro = DATOS.autos.opciones.find((x) => x.id === (a.id === 'sixt-sonet' ? 'salfa-crosstrek' : 'sixt-sonet'));
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
    <p class="auto-nota">${a.id === 'sixt-sonet'
      ? `Automático, el que menos gasta y con 19 cm de despeje: en diciembre el ripio hasta O'Higgins se hace bien en 4x2. Son ${decisiones.vuelta === '24' ? 11 : 10} días por ${CLP(pA)} entre los dos.`
      : `Tracción integral y más despeje, como la Tracker del año pasado. Pero en verano no hace falta y sale ${milCLP((pA - pO) / 2)} más cada uno.`}</p>`;
}

// ---------- 8. Dónde dormimos ----------
const ICONO_CARPA = '<svg class="icono" viewBox="0 0 34 34"><path d="M3 28 L17 6 L31 28 Z M17 6 L17 28 M12 28 L17 19 L22 28"/></svg>';
const ICONO_TECHO = '<svg class="icono" viewBox="0 0 34 34"><path d="M5 15 L17 5 L29 15 M8 13 L8 29 L26 29 L26 13 M14 29 L14 20 L20 20 L20 29"/></svg>';
const nochesDe = (n) => DATOS.dormirAustral.filter((x) => !x.soloSi || String(x.soloSi) === decisiones.vuelta);
const cuantasNoches = (x) => Number((x.donde.match(/\((\d+) noches\)/) || [0, 1])[1]);
function pintarNoches() {
  const lista = nochesDe();
  let carpa = 0, techo = 0;
  $('#noches').innerHTML = lista.map((x, i) => {
    const conTecho = decisiones.techo.includes(i);
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
  decisiones.techo = decisiones.techo.includes(i) ? decisiones.techo.filter((x) => x !== i) : [...decisiones.techo, i];
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
  const ops = DATOS.anioNuevo;
  $('#opciones-ny').classList.toggle('hay-eleccion', !!decisiones.anioNuevo);
  $('#opciones-ny').innerHTML = ops.map((n) => {
    const f = fotosDe(n.fotos[n.id === 'ny-antigua' ? 1 : 0])[n.id === 'ny-acatenango' ? 2 : 0] || fotosDe(n.fotos[0])[0];
    return `<button class="ny${decisiones.anioNuevo === n.id ? ' elegida' : ''}" data-ny="${n.id}">
      ${f ? `<img src="${f.src}" alt="${n.titulo}" loading="lazy">` : ''}
      <span class="check">${decisiones.anioNuevo === n.id ? '✓' : ''}</span>
      <div class="ny-texto"><span class="sello">${n.sello}</span><b>${n.titulo}</b><span>${n.donde}</span></div>
    </button>`;
  }).join('');
  const n = ops.find((x) => x.id === decisiones.anioNuevo);
  $('#noche-elegida').innerHTML = n
    ? `<div class="ne-cabeza"><b>Así sería la noche</b><span>${n.precio}</span></div>
       <ol class="horas">${n.noche.map(([h, q], i) => `<li style="animation-delay:${i * 80}ms"><span>${h}</span><p>${q}</p></li>`).join('')}</ol>
       <p class="ne-pie">${n.calza}</p>`
    : '<p class="vacio">Elige una y te muestro cómo sería la noche, hora por hora.</p>';
}
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-ny]');
  if (!b) return;
  decisiones.anioNuevo = decisiones.anioNuevo === b.dataset.ny ? null : b.dataset.ny;
  guardarDecisiones();
  pintarAnioNuevo();
});

// ---------- 11. La plata ----------
// Si la prep se abrió en este navegador, usa su último cálculo. Si no, los números del 5 nov.
const RESPALDO = { persona: 2826167, pasajes: 1125814, austral: 690353, guatemala: 1010000, seguro: 0, visto: '2026-11-05T12:00:00-03:00' };
const resumenPlata = () => guardado.leer('resumen', null, 'prep-') || RESPALDO;
function pintarPlata(animar) {
  const r = resumenPlata();
  const partes = [
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
  $('#veredicto').innerHTML = v;
  const f = new Date(r.visto);
  $('#plata-fuente').textContent = `Sale de la calculadora de la prep (${f.getDate()} de ${['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sept', 'oct', 'nov', 'dic'][f.getMonth()]}). Ahí se puede mover cualquier número.`;
}

// ---------- 12. Lo que compramos hoy ----------
function itemsCompra() {
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
  $('#compras-total').textContent = `${hechos} de ${items.length} listos. Si pago todo con mi tarjeta, lo tuyo de pasajes es ${CLP(resumenPlata().pasajes)} y me lo transfieres después.`;
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
  const ny = DATOS.anioNuevo.find((x) => x.id === decisiones.anioNuevo);
  const lista = nochesDe();
  const techo = lista.reduce((s, x, i) => s + (decisiones.techo.includes(i) ? cuantasNoches(x) : 0), 0);
  const total = lista.reduce((s, x) => s + cuantasNoches(x), 0);
  const items = itemsCompra();
  const filas = [
    ['vuelta del sur', decisiones.vuelta === '24' ? 'jueves 24, para la Nochebuena' : 'miércoles 23'],
    ['glaciar', decisiones.glaciar === 'hielo' ? 'caminando sobre el hielo' : 'solo los miradores'],
    ['capillas de mármol', decisiones.capillas === 'kayak' ? 'en kayak' : 'en lancha'],
    ['auto', autoElegido().modelo.replace(' o similar', '')],
    ['noches', `${total - techo} en carpa · ${techo} con techo`],
    ['guatemala', 'la armas tú'],
    ['año nuevo', ny ? ny.titulo : 'por elegir'],
    ['por persona', CLP(resumenPlata().persona)],
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

// Empezar de cero: borra lo elegido y vuelve a la portada
$('#reiniciar').addEventListener('click', () => {
  try { localStorage.removeItem('propuesta-decisiones'); } catch (e) { /* sin guardado */ }
  location.hash = '#1';
  location.reload();
});

// ---------- Repintar lo que depende de las elecciones ----------
function repintar() {
  pintarDias();
  pintarGlaciar();
  pintarMosaico();
  pintarTransporte();
  pintarNoches();
  pintarCompras();
  pintarActa();
}
// ---------- Navegación entre láminas ----------
const laminas = $$('.lamina');
let actual = 0;
laminas.forEach((l) => $$('[data-a]', l).forEach((el, i) => el.style.setProperty('--i', i)));
$('#avance').innerHTML = laminas.map((l, i) => `<button data-ir="${i}" aria-label="${l.dataset.nombre}" title="${l.dataset.nombre}"></button>`).join('');

// Lo que pasa al entrar a cada lámina
const alEntrar = {
  'austral 2.0': () => { dibujarRuta(); if (!$('#mapa .tocado')) tocarPunto('castillo'); },
  'día a día': () => { $('#dias').scrollLeft = 0; },
  'cómo nos movemos': pintarTransporte,
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
  document.body.style.background = l.classList.contains('clara') ? 'var(--fondo)' : 'var(--noche)';
}

document.addEventListener('click', (e) => { const b = e.target.closest('[data-ir]'); if (b) ir(Number(b.dataset.ir)); });
$('#anterior').addEventListener('click', () => ir(actual - 1));
$('#siguiente').addEventListener('click', () => ir(actual + 1));
$('#pantalla').addEventListener('click', pantallaCompleta);
function pantallaCompleta() {
  if (document.fullscreenElement) document.exitFullscreen();
  else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {});
}
document.addEventListener('keydown', (e) => {
  if (e.target.matches('input, textarea')) return;
  if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); ir(actual + 1); }
  else if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); ir(actual - 1); }
  else if (e.key === 'Home') ir(0);
  else if (e.key === 'End') ir(laminas.length - 1);
  else if (e.key === 'f' || e.key === 'F') pantallaCompleta();
});

// Deslizar con el dedo (menos dentro de lo que ya se desliza solo)
let toque = null;
$('#pres').addEventListener('touchstart', (e) => {
  if (e.target.closest('.carril, .horas')) { toque = null; return; }
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
pintarPlata(false);
repintar();
ir(Math.max(0, (parseInt(location.hash.slice(1), 10) || 1) - 1));

// Precios al día de la prep (los mismos que actualiza GitHub dos veces al día)
fetch('../prep/precios.json', { cache: 'no-store' })
  .then((r) => (r.ok ? r.json() : null))
  .then((pv) => {
    if (!pv || !pv.vuelos) return;
    [...DATOS.vuelosCA, ...AU.idas, ...AU.vueltas, DATOS.vueloFlores].forEach((v) => {
      const x = pv.vuelos[v.id];
      if (x && x.precio) v.precio = x.precio;
    });
    pintarGuatemala();
    repintar();
  })
  .catch(() => { /* sin precios al día: quedan los de datos.js */ });
