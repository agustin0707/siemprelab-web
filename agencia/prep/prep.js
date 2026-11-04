// Web prep · Agencia de Viajes SiempreLab
// Pinta la Austral (vuelos, auto, ruta, alojamiento), Guatemala (vuelos, rutas y armador)
// y el presupuesto desde datos.js y lugares.js.
// Lo que se elige (vuelos, auto, ruta, armador) alimenta la calculadora y la barra "tu viaje".

// ---------- Utilidades ----------
const CLP = (n) => '$' + Math.round(n).toLocaleString('es-CL');
const millones = (n) => '$' + (n / 1000000).toLocaleString('es-CL', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' M';
const $ = (sel, raiz = document) => raiz.querySelector(sel);
const $$ = (sel, raiz = document) => [...raiz.querySelectorAll(sel)];
const esAngosto = () => window.matchMedia('(max-width: 899px)').matches;

// Un precio puede venir como número, como { monto, estimado } o como null
function leerPrecio(p) {
  if (p === null || p === undefined) return null;
  if (typeof p === 'number') return { monto: p, estimado: false };
  return { monto: p.monto, estimado: !!p.estimado };
}

// localStorage envuelto: si falla (modo privado), la página igual funciona
const guardado = {
  leer(clave, porDefecto) {
    try {
      const v = localStorage.getItem('prep-' + clave);
      return v === null ? porDefecto : JSON.parse(v);
    } catch (e) { return porDefecto; }
  },
  escribir(clave, valor) {
    try { localStorage.setItem('prep-' + clave, JSON.stringify(valor)); } catch (e) { /* sin guardado */ }
  },
  borrar(clave) {
    try { localStorage.removeItem('prep-' + clave); } catch (e) { /* nada */ }
  }
};

// ---------- Estado: lo que se ha elegido ----------
// Si los datos cambiaron de estructura (otra versión), lo guardado ya no sirve
if (guardado.leer('version', null) !== DATOS.version) {
  guardado.borrar('opciones');
  guardado.borrar('valores');
  guardado.escribir('version', DATOS.version);
}
const P = DATOS.presupuesto;
const AU = DATOS.vuelosAustral;
const OPCIONES_INICIALES = {
  vueloCA: DATOS.vuelosCA.find((v) => v.recomendado).id,
  idaAU: AU.idas.find((v) => v.recomendado).id,
  vueltaAU: AU.vueltas.find((v) => v.recomendado).id,
  auto: DATOS.autos.opciones.find((a) => a.recomendado).id,
  ruta: null,       // id de ruta elegida (null = sin elegir)
  internos: 2,      // tramos Guatemala ↔ Flores
  seguro: false
};
// Equipaje para los dos viajes: con mochila scout va en bodega
let equipaje = guardado.leer('equipaje', 'bodega');
if (!['mano', 'bodega'].includes(equipaje)) equipaje = 'bodega';
let opciones = Object.assign({}, OPCIONES_INICIALES, guardado.leer('opciones', {}));
// Por si quedó guardado un vuelo que ya no existe
if (!DATOS.vuelosCA.some((v) => v.id === opciones.vueloCA)) opciones.vueloCA = OPCIONES_INICIALES.vueloCA;
if (!AU.idas.some((v) => v.id === opciones.idaAU)) opciones.idaAU = OPCIONES_INICIALES.idaAU;
if (!AU.vueltas.some((v) => v.id === opciones.vueltaAU)) opciones.vueltaAU = OPCIONES_INICIALES.vueltaAU;
if (!DATOS.autos.opciones.some((a) => a.id === opciones.auto)) opciones.auto = OPCIONES_INICIALES.auto;
if (opciones.ruta && !DATOS.rutas.some((r) => r.id === opciones.ruta)) opciones.ruta = null;
const guardarOpciones = () => guardado.escribir('opciones', opciones);

// Lo elegido para la Austral: el día de vuelta (23 o 24) cambia días de auto, noches y ruta
const idaAU = () => AU.idas.find((v) => v.id === opciones.idaAU);
const vueltaAU = () => AU.vueltas.find((v) => v.id === opciones.vueltaAU);
const diaVuelta = () => vueltaAU().fecha;
const diasAuto = () => (diaVuelta() === 24 ? 11 : 10);
const autoElegido = () => DATOS.autos.opciones.find((a) => a.id === opciones.auto);
const totalAuto = (a) => leerPrecio(diaVuelta() === 24 ? a.total24 : a.total);

// ---------- Precios con equipaje ----------
// Guatemala: tarifa + lo que suma el equipaje (null si no hay dato para esa combinación)
function precioCA(v, eq = equipaje) {
  const extra = leerPrecio(eq === 'bodega' ? v.extraBodega : v.extraMano);
  if (eq === 'bodega' && !extra) return null;
  return { monto: v.precio + (extra ? extra.monto : 0), estimado: !!(extra && extra.estimado && extra.monto) };
}
// Austral: cada tramo + la maleta de esa aerolínea si va en bodega
function precioTramoAU(t) {
  const m = equipaje === 'bodega' ? leerPrecio(AU.maleta[t.aerolinea]) : null;
  return { monto: t.precio + (m ? m.monto : 0), estimado: !!(m && m.estimado) };
}
function precioAU() {
  const a = precioTramoAU(idaAU());
  const b = precioTramoAU(vueltaAU());
  return { monto: a.monto + b.monto, estimado: a.estimado || b.estimado };
}
const conAprox = (p) => (p.estimado ? '<span class="aprox" title="estimado">≈</span>' : '') + CLP(p.monto);

// Logos de aerolíneas y arrendadoras
const logo = (nombre, clase = 'logo') => (DATOS.logos[nombre]
  ? `<img class="${clase}" src="${DATOS.logos[nombre]}" alt="" loading="lazy" decoding="async">` : '');

// ---------- Precios al día (precios.json lo escribe GitHub Actions dos veces al día) ----------
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sept', 'oct', 'nov', 'dic'];
const fechaCorta = (iso) => { const [, m, d] = iso.split('-'); return `${Number(d)} ${MESES[Number(m) - 1]}`; };
let preciosVivos = null;

function aplicarPreciosVivos(pv) {
  [...DATOS.vuelosCA, ...AU.idas, ...AU.vueltas, DATOS.vueloFlores].forEach((v) => {
    const x = pv.vuelos && pv.vuelos[v.id];
    if (!x || !x.precio) return;
    v.precio = x.precio;
    v.vivo = x;
    if (x.dur) { if (v.ida) v.ida.dur = x.dur; else v.dur = x.dur; }
  });
}

// "↑ $98.000 desde el 3 nov": contra lo que se vio la primera vez
function tendencia(v) {
  const h = v.vivo && v.vivo.historial;
  const base = v.antes || (h && h.length > 1 ? { monto: h[0][1], fecha: fechaCorta(h[0][0]) } : null);
  if (!base) return '';
  const d = v.precio - base.monto;
  if (Math.abs(d) < 1000) return '';
  return `<span class="tendencia ${d > 0 ? 'sube' : 'baja'}">${d > 0 ? '↑' : '↓'} ${CLP(Math.abs(d))} desde el ${base.fecha}</span>`;
}

function pintarPreciosVivos() {
  const el = $$('[data-precios-vivos]');
  if (!preciosVivos) {
    el.forEach((e) => { e.textContent = `Precios vistos el ${DATOS.precioVisto}.`; });
    return;
  }
  const horas = Math.max(0, Math.round((Date.now() - new Date(preciosVivos.actualizado)) / 3600000));
  const hace = horas < 1 ? 'hace menos de una hora' : horas === 1 ? 'hace 1 hora' : horas < 48 ? `hace ${horas} horas` : `hace ${Math.round(horas / 24)} días`;
  el.forEach((e) => { e.innerHTML = `<span class="vivo-punto"></span>Vuelos al día: ${hace}, en ${preciosVivos.fuente}. Se actualizan solos dos veces al día.`; });
  $$('[data-precio-banda]').forEach((e) => { e.textContent = `vuelos al día · ${hace}`; });
}

// ---------- Textos sueltos ----------
$$('[data-precio-visto]').forEach((el) => { el.textContent = DATOS.precioVisto; });
$$('[data-vuelo-flores]').forEach((el) => { el.textContent = CLP(DATOS.vueloFlores.precio); });
function pintarLinksAustral() {
  $$('[data-link-austral]').forEach((el) => { el.href = DATOS.linkAustral[diaVuelta()]; });
  $$('[data-link-sky]').forEach((el) => { el.href = DATOS.linkAustral.sky; });
  $$('[data-link-autos]').forEach((el) => { el.href = DATOS.autos.link[diaVuelta()]; });
  $$('[data-dia-vuelta]').forEach((el) => { el.textContent = diaVuelta() === 24 ? 'jue 24' : 'mié 23'; });
  $$('[data-dias-auto]').forEach((el) => { el.textContent = diasAuto(); });
}

// ---------- Hero: fotos que rotan + tablero de salidas ----------
const DURACION_FOTO = 6500;
let fotoHero = 0;
let temporizadorHero = null;

function pintarHero() {
  const cont = $('#hero-fotos');
  const ind = $('#hero-indicadores');
  cont.innerHTML = DATOS.hero.map((h, i) => {
    const f = LUGARES[h.lugar].fotos[h.foto];
    // La primera carga altiro; el resto se carga después para no frenar la portada
    return `<img ${i === 0 ? `src="${f.grande}" fetchpriority="high"` : `data-src="${f.grande}"`} alt="" decoding="async">`;
  }).join('');
  ind.innerHTML = DATOS.hero.map((h, i) => `
    <button type="button" aria-label="Ver ${LUGARES[h.lugar].nombre}" data-foto-hero="${i}">
      <span class="linea-progreso"><i></i></span>
      <span class="nombre-foto">${String(i + 1).padStart(2, '0')} ${LUGARES[h.lugar].nombre}</span>
    </button>`).join('');
  ind.style.setProperty('--duracion', DURACION_FOTO + 'ms');

  const primera = $('img', cont);
  const cargarResto = () => $$('img[data-src]', cont).forEach((img) => { img.src = img.dataset.src; });
  if (primera.complete) cargarResto(); else primera.addEventListener('load', cargarResto, { once: true });

  ind.addEventListener('click', (e) => {
    const b = e.target.closest('[data-foto-hero]');
    if (b) mostrarFotoHero(Number(b.dataset.fotoHero));
  });
  mostrarFotoHero(0);
}

function mostrarFotoHero(i) {
  fotoHero = (i + DATOS.hero.length) % DATOS.hero.length;
  $$('#hero-fotos img').forEach((img, n) => img.classList.toggle('activa', n === fotoHero));
  $$('#hero-indicadores button').forEach((b, n) => {
    b.classList.toggle('activa', n === fotoHero);
    b.classList.toggle('vista', n < fotoHero);
    // Reinicia la animación de la barra de progreso
    const barra = $('.linea-progreso i', b);
    barra.style.animation = 'none'; void barra.offsetWidth; barra.style.animation = '';
  });
  const h = DATOS.hero[fotoHero];
  const f = LUGARES[h.lugar].fotos[h.foto];
  $('#hero-credito').innerHTML = `${LUGARES[h.lugar].nombre} · foto: <a href="${f.pagina}" target="_blank" rel="noopener">${f.credito}</a> · ${f.licencia}`;
  clearTimeout(temporizadorHero);
  if (!document.hidden) temporizadorHero = setTimeout(() => mostrarFotoHero(fotoHero + 1), DURACION_FOTO);
}
document.addEventListener('visibilitychange', () => { if (!document.hidden) mostrarFotoHero(fotoHero); });

// Cuenta regresiva: primero hasta la junta, después hasta el despegue (en días de calendario)
function diasHasta(fecha) {
  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  const dia = new Date(fecha); dia.setHours(0, 0, 0, 0);
  return Math.round((dia - hoy) / 86400000);
}
function pintarCuentaRegresiva() {
  const junta = diasHasta(DATOS.junta);
  const vuelo = diasHasta(DATOS.despegue);
  let texto;
  if (junta > 1) texto = `junta en ${junta} días`;
  else if (junta === 1) texto = 'junta mañana';
  else if (junta === 0) texto = 'junta hoy';
  else if (vuelo > 1) texto = `faltan ${vuelo} días`;
  else if (vuelo === 1) texto = 'despegamos mañana';
  else if (vuelo === 0) texto = 'despegamos hoy';
  else texto = 'buen viaje';
  $('#cuenta-regresiva').textContent = texto;
}

// El tablero refleja lo elegido y si ya se compró (foto de confirmación marcada)
function pintarTablero() {
  const ca = DATOS.vuelosCA.find((v) => v.id === opciones.vueloCA);
  const ruta = DATOS.rutas.find((r) => r.id === opciones.ruta);
  const comprado = !!guardado.leer('compra', {}).foto;
  // El día real de salida: del detalle ("sáb 26 · 01:07") o del día ("dom 27")
  const dia = (ca.ida.detalle.match(/^\S+ (\d+) ·/) || ca.ida.dia.match(/(\d+)$/) || [])[1];
  $('#t-fecha-ca').textContent = dia ? dia + ' dic' : '';
  [$('#t-estado-ca'), $('#t-estado-au')].forEach((el) => {
    el.textContent = comprado ? 'confirmado' : 'por comprar';
    el.classList.toggle('confirmado', comprado);
  });
  $('#tablero-pie').innerHTML = `sur: <b>vuelve el ${diaVuelta()} dic</b> · guatemala: <b>${ca.aerolinea} · vuelve ${ca.vuelta.dia}</b> · ruta: <b>${ruta ? ruta.nombre : 'por elegir'}</b>`;
  $('#resumen-au').textContent = `dom 13 → ${diaVuelta() === 24 ? 'jue 24' : 'mié 23'} dic`;
}

// ---------- Componente: panel de fotos + mapa ----------
// Se usa en las rutas y en las ideas de la Austral.
function crearMedia(contenedor) {
  contenedor.innerHTML = `
    <div class="media-cabeza">
      <div><span class="pais" data-pais></span><h3 data-nombre></h3></div>
    </div>
    <div class="carrusel">
      <div class="carrusel-pista" tabindex="0" aria-label="Fotos" data-pista></div>
      <button type="button" class="carrusel-flecha prev" aria-label="Foto anterior" data-prev>‹</button>
      <button type="button" class="carrusel-flecha next" aria-label="Foto siguiente" data-next>›</button>
      <span class="carrusel-contador" data-contador></span>
    </div>
    <div class="carrusel-puntos" data-puntos></div>
    <p class="media-desc" data-desc></p>
    <div class="mapa">
      <div class="mapa-barra">
        <span class="etiqueta" data-mapa-titulo></span>
        <div class="botones">
          <button type="button" class="boton claro" data-ver-ruta>ruta completa</button>
          <a class="boton claro" target="_blank" rel="noopener" data-abrir>abrir en maps ↗</a>
        </div>
      </div>
      <div class="mapa-marco"><iframe title="Mapa" loading="lazy" referrerpolicy="no-referrer-when-downgrade" data-iframe></iframe></div>
      <p class="nota-mapa" data-nota-mapa></p>
    </div>`;

  const pista = $('[data-pista]', contenedor);
  const iframe = $('[data-iframe]', contenedor);
  let ruta = null;
  let indice = 0;

  // Cambia el src del mapa solo si es distinto (evita recargas)
  function ponerMapa(src, abrir, titulo, nota) {
    if (iframe.getAttribute('src') !== src) iframe.setAttribute('src', src);
    $('[data-abrir]', contenedor).href = abrir;
    $('[data-mapa-titulo]', contenedor).textContent = titulo;
    $('[data-nota-mapa]', contenedor).textContent = nota || '';
  }

  function actualizarCarrusel() {
    const total = pista.children.length;
    $('[data-contador]', contenedor).textContent = `${indice + 1} / ${total}`;
    $('[data-prev]', contenedor).disabled = indice === 0;
    $('[data-next]', contenedor).disabled = indice >= total - 1;
    $$('[data-puntos] button', contenedor).forEach((b, i) => b.setAttribute('aria-current', String(i === indice)));
  }

  function irA(i) {
    indice = Math.max(0, Math.min(i, pista.children.length - 1));
    pista.scrollTo({ left: indice * pista.clientWidth, behavior: 'smooth' });
    actualizarCarrusel();
  }

  // Al deslizar con el dedo, se actualiza el índice
  let rafId = null;
  pista.addEventListener('scroll', () => {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const i = Math.round(pista.scrollLeft / pista.clientWidth);
      if (i !== indice) { indice = i; actualizarCarrusel(); }
    });
  });
  pista.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); irA(indice + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); irA(indice - 1); }
  });
  $('[data-prev]', contenedor).addEventListener('click', () => irA(indice - 1));
  $('[data-next]', contenedor).addEventListener('click', () => irA(indice + 1));

  function mostrarRuta() {
    if (!ruta) return;
    const enc = ruta.paradas.map(encodeURIComponent);
    const src = `https://maps.google.com/maps?saddr=${enc[0]}&daddr=${enc.slice(1).join('+to:')}&hl=es&output=embed`;
    const abrir = 'https://www.google.com/maps/dir/' + enc.join('/');
    ponerMapa(src, abrir, ruta.titulo, ruta.nota);
    $('[data-ver-ruta]', contenedor).hidden = true;
  }
  $('[data-ver-ruta]', contenedor).addEventListener('click', mostrarRuta);

  return {
    // Muestra fotos y datos de un lugar. Con conMapa = true, también lo centra en el mapa.
    mostrarLugar(id, conMapa) {
      const l = LUGARES[id];
      if (!l) return;
      $('[data-pais]', contenedor).textContent = l.pais;
      $('[data-nombre]', contenedor).textContent = l.nombre;
      $('[data-desc]', contenedor).textContent = l.descripcion;
      pista.innerHTML = l.fotos.map((f, i) => `
        <figure>
          <img src="${f.src}" alt="${l.nombre}, foto ${i + 1}" loading="lazy" decoding="async">
          <figcaption class="carrusel-credito">foto: <a href="${f.pagina}" target="_blank" rel="noopener">${f.credito}</a> · ${f.licencia}</figcaption>
        </figure>`).join('');
      $('[data-puntos]', contenedor).innerHTML = l.fotos.map((_, i) =>
        `<button type="button" aria-label="Ir a la foto ${i + 1}"></button>`).join('');
      $$('[data-puntos] button', contenedor).forEach((b, i) => b.addEventListener('click', () => irA(i)));
      pista.scrollLeft = 0;
      indice = 0;
      actualizarCarrusel();

      if (conMapa) {
        const q = encodeURIComponent(l.mapa);
        ponerMapa(
          `https://maps.google.com/maps?q=${q}&t=p&z=${l.zoom}&hl=es&output=embed`,
          `https://www.google.com/maps/search/?api=1&query=${q}`,
          l.nombre,
          ''
        );
        $('[data-ver-ruta]', contenedor).hidden = !ruta;
      }
    },
    // Define la ruta completa del mapa y la muestra
    definirRuta(paradas, titulo, nota) {
      ruta = { paradas, titulo, nota };
      mostrarRuta();
    }
  };
}

// ---------- 2. Vuelos Centroamérica (segundo viaje) ----------
function pintarVuelos() {
  $('#lista-vuelos').innerHTML = DATOS.vuelosCA.map((v) => {
    const p = precioCA(v);
    const elegido = opciones.vueloCA === v.id;
    const precio = p
      ? `<p class="precio">${conAprox(p)}</p>`
      : `<p class="precio no-disponible">bodega: consultar en ${v.aerolinea}</p>`;
    const sellos = [
      v.recomendado ? '<span class="sello">recomendado</span>' : '',
      elegido ? '<span class="sello acento">elegido</span>' : ''
    ].join('');
    return `
      <article class="vuelo${v.recomendado ? ' recomendado' : ''}${elegido ? ' elegido' : ''}">
        ${sellos ? `<div class="sellos">${sellos}</div>` : ''}
        <div class="vuelo-cabeza">
          <span class="aerolinea">${logo(v.aerolinea)}${v.aerolinea} · SCL ↔ ${v.destino}</span>
          <span class="etiqueta">por persona</span>
        </div>
        <div class="precio-fila">${precio}<span class="noches${v.noches >= 14 ? ' mas' : ''}" title="noches en destino">${v.noches} noches allá</span></div>
        ${tendencia(v)}
        <div class="tramo-vuelo">
          <span class="etiqueta">ida</span>
          <div><strong>${v.ida.dia}</strong>${v.ida.detalle}<br><small>${v.ida.dur} · ${v.ida.escalas}</small></div>
        </div>
        <div class="tramo-vuelo">
          <span class="etiqueta">vuelta</span>
          <div><strong>${v.vuelta.dia}</strong>${v.vuelta.detalle}<br><small>${v.vuelta.dur} · ${v.vuelta.escalas}</small></div>
        </div>
        <p class="nota-vuelo">${v.nota}</p>
        <div class="acciones">
          <button type="button" class="boton${elegido ? ' elegido' : ''}" data-elegir-vuelo="${v.id}" aria-pressed="${elegido}">${elegido ? 'elegido ✓' : 'elegir este'}</button>
          <a class="link" href="${v.link}" target="_blank" rel="noopener">ver en vivo ↗</a>
        </div>
      </article>`;
  }).join('');
}

$('#lista-vuelos').addEventListener('click', (e) => {
  const b = e.target.closest('[data-elegir-vuelo]');
  if (!b) return;
  opciones.vueloCA = b.dataset.elegirVuelo;
  guardarOpciones();
  pintarVuelos();
  pintarArmador();
  sincronizarSelects();
  calcular();
});

function marcarSelector() {
  $$('.selector button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.equipaje === equipaje)));
  $('#calc-equipaje').value = equipaje;
}

function cambiarEquipaje(valor) {
  equipaje = valor;
  guardado.escribir('equipaje', equipaje);
  marcarSelector();
  pintarVuelos();
  pintarAustral();
  calcular();
}
$$('.selector button').forEach((b) => b.addEventListener('click', () => cambiarEquipaje(b.dataset.equipaje)));

// ---------- 2. Rutas: pestañas + paradas + fotos + mapa ----------
const exploradorRutas = $('#explorador-rutas');
const mediaRutas = crearMedia($('[data-media]', exploradorRutas));
let rutaVista = opciones.ruta || DATOS.rutas[0].id;

function pintarPestanas() {
  $('#pestanas-rutas').innerHTML = DATOS.rutas.map((r) => `
    <button type="button" role="tab" aria-selected="${r.id === rutaVista}" data-ruta="${r.id}">
      ${r.nombre}${opciones.ruta === r.id ? '<span class="marca-elegida" title="elegida"></span>' : ''}
    </button>`).join('');
}

function seleccionarParada(i, moverPantalla) {
  const ruta = DATOS.rutas.find((r) => r.id === rutaVista);
  const parada = ruta.paradas[i];
  if (!parada || !parada.lugar) return;
  $$('[data-paradas] button', exploradorRutas).forEach((b, n) => b.setAttribute('aria-current', String(n === i)));
  mediaRutas.mostrarLugar(parada.lugar, true);
  if (moverPantalla && esAngosto()) {
    $('[data-media]', exploradorRutas).scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function pintarRuta() {
  const ruta = DATOS.rutas.find((r) => r.id === rutaVista);
  $('[data-ruta-resumen]', exploradorRutas).textContent = ruta.resumen;
  $('[data-ruta-extra]', exploradorRutas).textContent = ruta.extra;
  $('[data-paradas]', exploradorRutas).innerHTML = ruta.paradas.map((p, i) => `
    <li class="parada">
      <button type="button" data-parada="${i}" ${p.lugar ? '' : 'disabled'}>
        <span class="dias">${p.dias}</span>
        <strong>${p.titulo}</strong>
        <p>${p.detalle}</p>
      </button>
    </li>`).join('');

  const elegida = opciones.ruta === ruta.id;
  const boton = $('[data-elegir-ruta]', exploradorRutas);
  boton.textContent = elegida ? 'ruta elegida ✓' : 'elegir esta ruta';
  boton.classList.toggle('elegido', elegida);
  boton.setAttribute('aria-pressed', String(elegida));

  // Fotos de la primera parada y mapa de la ruta completa
  const primera = ruta.paradas.findIndex((p) => p.lugar);
  $$('[data-paradas] button', exploradorRutas).forEach((b) => b.setAttribute('aria-current', 'false'));
  mediaRutas.mostrarLugar(ruta.paradas[primera].lugar, false);
  mediaRutas.definirRuta(ruta.mapaRuta, `ruta: ${ruta.nombre.toLowerCase()}`, 'El mapa calcula todo en auto; Guatemala ↔ Flores se hace en avión.');
}

$('#pestanas-rutas').addEventListener('click', (e) => {
  const b = e.target.closest('[data-ruta]');
  if (!b) return;
  rutaVista = b.dataset.ruta;
  pintarPestanas();
  pintarRuta();
});
$('[data-paradas]', exploradorRutas).addEventListener('click', (e) => {
  const b = e.target.closest('[data-parada]');
  if (b) seleccionarParada(Number(b.dataset.parada), true);
});
$('[data-cargar-ruta]', exploradorRutas).addEventListener('click', () => {
  cargarEnArmador(DATOS.rutas.find((r) => r.id === rutaVista));
  $('#armar').scrollIntoView({ behavior: 'smooth', block: 'start' });
});
$('[data-elegir-ruta]', exploradorRutas).addEventListener('click', () => {
  const ruta = DATOS.rutas.find((r) => r.id === rutaVista);
  opciones.ruta = ruta.id;
  opciones.internos = ruta.internos;
  guardarOpciones();
  pintarPestanas();
  pintarRuta();
  sincronizarSelects();
  calcular();
});

// ---------- 1. Austral (primer viaje): vuelos + ruta con fotos y mapa ----------
function tarjetaTramo(t, tipo, elegido) {
  const p = precioTramoAU(t);
  const sellos = [
    t.sello ? `<span class="sello">${t.sello}</span>` : '',
    elegido ? '<span class="sello acento">elegido</span>' : ''
  ].join('');
  const link = t.manual ? DATOS.linkAustral.sky : DATOS.linkAustral[t.fecha || diaVuelta()];
  return `
    <article class="tramo${t.recomendado ? ' recomendado' : ''}${elegido ? ' elegido' : ''}">
      ${sellos ? `<div class="sellos">${sellos}</div>` : ''}
      <div class="tramo-fila">
        <span class="aerolinea">${logo(t.aerolinea)}${t.aerolinea}</span>
        <p class="tramo-precio">${conAprox(p)}</p>
      </div>
      <div class="tramo-horas"><strong>${t.sale} → ${t.llega}</strong><span>${t.dur} · ${t.escalas}</span></div>
      ${tendencia(t)}
      ${t.nota ? `<p class="nota-vuelo">${t.nota}</p>` : ''}
      <div class="acciones">
        <button type="button" class="boton${elegido ? ' elegido' : ''}" data-elegir-${tipo}="${t.id}" aria-pressed="${elegido}">${elegido ? 'elegido ✓' : 'elegir'}</button>
        <a class="link" href="${link}" target="_blank" rel="noopener">${t.manual ? 'ver en sky ↗' : 'ver en vivo ↗'}</a>
      </div>
    </article>`;
}

function pintarAustral() {
  $('#lista-idas').innerHTML = AU.idas.map((t) => tarjetaTramo(t, 'ida', opciones.idaAU === t.id)).join('');
  $('#lista-vueltas').innerHTML = [24, 23].map((dia) => `
    <p class="tramos-dia">${dia === 24 ? 'jue 24 dic' : 'mié 23 dic'}</p>
    ${AU.vueltas.filter((t) => t.fecha === dia).map((t) => tarjetaTramo(t, 'vuelta', opciones.vueltaAU === t.id)).join('')}`).join('');

  // Total de los pasajes al sur y cuánto cambia volver el 24
  const total = precioAU();
  const ida = precioTramoAU(idaAU()).monto;
  // Se compara LATAM con LATAM (SKY no se actualiza solo y su vuelta del 24 es otra cosa: 6 h con escala)
  const masBarata = (dia) => Math.min(...AU.vueltas.filter((t) => t.fecha === dia && !t.manual).map((t) => precioTramoAU(t).monto));
  const a = autoElegido();
  const autoExtra = (leerPrecio(a.total24).monto - leerPrecio(a.total).monto) / 2;
  const dif = {
    pasajes: masBarata(24) - masBarata(23),
    auto: autoExtra,
    noche: (Number(valores['au-aloj'].unitario) || 0) / 2 + (Number(valores['au-comida'].unitario) || 0)
  };
  const neto = dif.pasajes + dif.auto + dif.noche;
  const signo = (n) => (n > 0 ? '+' : '−') + CLP(Math.abs(n));
  $('#compara-vuelta').innerHTML = `
    <div class="compara-total">
      <span class="etiqueta">ida + vuelta elegidas, por persona${equipaje === 'bodega' ? ', con mochila en bodega' : ''}</span>
      <p class="monto chico">${conAprox(total)}</p>
      <small>${idaAU().aerolinea} ${idaAU().sale} · ${vueltaAU().aerolinea} ${vueltaAU().dia} ${vueltaAU().sale}. Ida ${CLP(ida)}.</small>
    </div>
    <div class="compara-dif">
      <span class="etiqueta">volver el 24 en vez del 23, por persona</span>
      <dl>
        <div><dt>pasaje LATAM más barato</dt><dd>${signo(dif.pasajes)}</dd></div>
        <div><dt>un día más de ${a.modelo.replace(' o similar', '')}</dt><dd>${signo(dif.auto)}</dd></div>
        <div><dt>una noche y un día más</dt><dd>${signo(dif.noche)}</dd></div>
        <div class="neto"><dt>en total</dt><dd>${signo(neto)}</dd></div>
      </dl>
      <small>${neto <= 0 ? 'Sale lo mismo o más barato y ganamos un día sin apuro.' : 'Sale un poco más, pero ganamos un día sin apuro.'} Llegamos a Santiago el 24 en la tarde, a tiempo para Nochebuena.</small>
    </div>`;
}

function elegirTramoAU(tipo, id) {
  const antes = diaVuelta();
  if (tipo === 'ida') opciones.idaAU = id; else opciones.vueltaAU = id;
  guardarOpciones();
  // Si cambió el día de vuelta, cambian los días de auto, noches y el final de la ruta
  if (diaVuelta() !== antes) { aplicarAutoAlPresupuesto(); pintarLinksAustral(); pintarAutos(); pintarRutaAustral(); pintarDormir(); }
  pintarAustral();
  sincronizarSelects();
  calcular();
}
$('#lista-idas').addEventListener('click', (e) => {
  const b = e.target.closest('[data-elegir-ida]');
  if (b) elegirTramoAU('ida', b.dataset.elegirIda);
});
$('#lista-vueltas').addEventListener('click', (e) => {
  const b = e.target.closest('[data-elegir-vuelta]');
  if (b) elegirTramoAU('vuelta', b.dataset.elegirVuelta);
});

const exploradorAustral = $('#explorador-austral');
const mediaAustral = crearMedia($('[data-media]', exploradorAustral));

let paradasAustral = [];
function pintarRutaAustral() {
  const r = DATOS.rutaAustral;
  $('[data-hecho-2025]').textContent = r.hecho2025;
  $('[data-ruta-resumen]', exploradorAustral).textContent = r.resumen;
  $('[data-ruta-extra]', exploradorAustral).textContent = r.extra;
  paradasAustral = [...r.paradas, ...r.finales[diaVuelta()]];
  $('[data-paradas]', exploradorAustral).innerHTML = paradasAustral.map((p, i) => `
    <li class="parada">
      <button type="button" data-parada="${i}" ${p.lugar ? '' : 'disabled'}>
        <span class="dias">${p.dias}</span>
        <strong>${p.titulo}</strong>
        <p>${p.detalle}</p>
        ${p.manejo ? `<span class="manejo">${p.manejo}</span>` : ''}
      </button>
    </li>`).join('');
  mediaAustral.mostrarLugar(r.paradas[1].lugar, false);
  mediaAustral.definirRuta(r.mapaRuta, 'ruta: austral 2.0', 'Ida hasta Villa O\'Higgins; la vuelta al norte es por el mismo camino.');
}

$('[data-paradas]', exploradorAustral).addEventListener('click', (e) => {
  const b = e.target.closest('[data-parada]');
  if (!b) return;
  const i = Number(b.dataset.parada);
  $$('[data-paradas] button', exploradorAustral).forEach((x, n) => x.setAttribute('aria-current', String(n === i)));
  mediaAustral.mostrarLugar(paradasAustral[i].lugar, true);
  if (esAngosto()) $('[data-media]', exploradorAustral).scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// ---------- Austral: auto ----------
// Bencina estimada para el recorrido con el consumo del auto
const bencina = (a) => Math.round((DATOS.autos.km / a.consumo) * DATOS.autos.litro[a.combustible] / 1000) * 1000;

function pintarAutos() {
  const dias = diasAuto();
  $('#lista-autos').innerHTML = DATOS.autos.opciones.map((a) => {
    const elegido = opciones.auto === a.id;
    const total = totalAuto(a);
    const sellos = [
      a.sello ? `<span class="sello">${a.sello}</span>` : '',
      elegido ? '<span class="sello acento">elegido</span>' : ''
    ].join('');
    return `
      <article class="vuelo auto${a.recomendado ? ' recomendado' : ''}${elegido ? ' elegido' : ''}">
        ${sellos ? `<div class="sellos">${sellos}</div>` : ''}
        <figure class="auto-foto">
          <img src="${a.foto.src}" alt="${a.modelo}" loading="lazy" decoding="async">
          <figcaption>${a.foto.credito}</figcaption>
        </figure>
        <div class="vuelo-cabeza">
          <span class="aerolinea">${logo(a.agencia, 'logo-ancho')}<span class="visually-hidden">${a.agencia}</span>${a.recogida}</span>
          <span class="etiqueta">${dias} días</span>
        </div>
        <div class="precio-fila"><p class="precio">${conAprox(total)}</p><span class="noches" title="a la mitad">${CLP(total.monto / 2)} c/u</span></div>
        <div class="tramo-vuelo">
          <span class="etiqueta">auto</span>
          <div><strong>${a.modelo}</strong><small>${a.tipo}</small></div>
        </div>
        <ul class="ficha">
          <li><b>${a.traccion}</b> tracción</li>
          <li><b>${a.despeje / 10} cm</b> despeje</li>
          <li><b>${a.maletero ? a.maletero + ' L' : 'pickup'}</b> maletero</li>
          <li><b>≈ ${CLP(bencina(a))}</b> ${a.combustible === 'diesel' ? 'diésel' : 'bencina'}</li>
        </ul>
        <p class="nota-vuelo">${a.nota}</p>
        <div class="acciones">
          <button type="button" class="boton${elegido ? ' elegido' : ''}" data-elegir-auto="${a.id}" aria-pressed="${elegido}">${elegido ? 'elegido ✓' : 'elegir este'}</button>
          <a class="link" href="${DATOS.autos.link[diaVuelta()]}" target="_blank" rel="noopener">reservar ↗</a>
        </div>
      </article>`;
  }).join('');
  $('[data-ojo-autos]').textContent = DATOS.autos.ojo;
}

// El auto y el día de vuelta mandan en arriendo, bencina, noches y días de comida
function aplicarAutoAlPresupuesto() {
  const a = autoElegido();
  const dias = diasAuto();
  valores['au-auto'] = { unitario: Math.round(totalAuto(a).monto / dias), cantidad: dias };
  valores['au-bencina'] = { unitario: bencina(a), cantidad: 1 };
  valores['au-aloj'].cantidad = dias;
  valores['au-comida'].cantidad = dias + 1;
  guardado.escribir('valores', valores);
  pintarLineas('calc-au', P.austral);
}

$('#lista-autos').addEventListener('click', (e) => {
  const b = e.target.closest('[data-elegir-auto]');
  if (!b) return;
  opciones.auto = b.dataset.elegirAuto;
  guardarOpciones();
  aplicarAutoAlPresupuesto();
  pintarAutos();
  pintarAustral();
  calcular();
});

// ---------- Austral: dónde dormir, actividades y barcaza ----------
const busquedaHoteles = (q) => `https://www.google.com/travel/search?q=${encodeURIComponent(q)}&hl=es&gl=CL&curr=CLP`;

function pintarDormir() {
  $('#tabla-dormir tbody').innerHTML = DATOS.dormirAustral.filter((d) => !d.soloSi || d.soloSi === diaVuelta()).map((d) => `
    <tr>
      <td class="mono" data-col="noche">${d.noche}</td>
      <td data-col="dónde"><strong>${d.donde}</strong>${d.extra ? `<small>${d.extra}</small>` : ''}</td>
      <td data-col="camping">${CLP(d.camping)} p/p${d.campingNota ? `<small>${d.campingNota}</small>` : ''}</td>
      <td data-col="con techo">${d.techo.length
        ? d.techo.map((t) => `<span class="opcion">${t.n} <span class="mono">★ ${t.r}</span> <b>${CLP(t.p)}</b></span>`).join('')
        : '<span class="suave">sin precio en línea</span>'}</td>
      <td data-col=""><a class="link" href="${busquedaHoteles(d.busca)}" target="_blank" rel="noopener">ver más ↗</a></td>
    </tr>`).join('');
}

const ETIQUETA_DISPO = { ok: 'sale siempre', ojo: 'reservar o confirmar', agotado: 'agotado en esas fechas' };
const insigniaDispo = (d) => (d ? `<span class="dispo ${d.estado}">${ETIQUETA_DISPO[d.estado]}</span>` : '');

function tarjetasActividades(lista) {
  return lista.map((a) => `
    <div class="actividad${a.dispo && a.dispo.estado === 'agotado' ? ' agotada' : ''}">
      <div class="actividad-cabeza"><span class="etiqueta">${a.donde}</span>${insigniaDispo(a.dispo)}</div>
      <strong>${a.nombre}</strong>
      <p class="actividad-precio">${a.precio}</p>
      <p>${a.nota}</p>
      ${a.dispo ? `<p class="dispo-texto">${a.dispo.texto}</p>` : ''}
      ${a.link ? `<a class="link" href="${a.link}" target="_blank" rel="noopener">ver cupos ↗</a>` : ''}
    </div>`).join('');
}

function pintarActividadesAustral() {
  $('#lista-actividades-au').innerHTML = tarjetasActividades(DATOS.actividadesAustral);
  $('#lista-actividades-ca').innerHTML = tarjetasActividades(DATOS.actividadesCA);
  const aca = DATOS.actividadesCA.find((a) => a.dispo && a.dispo.estado === 'agotado');
  $('[data-aviso-tours]').innerHTML = aca ? `<strong>Ojo con ${aca.nombre.split(' ')[0]}:</strong> ${aca.dispo.texto}` : '';
  const b = DATOS.barcaza;
  $('[data-barcaza]').innerHTML = `Desde Yungay: <strong>${b.ida.join(' · ')}</strong>. Desde Río Bravo: <strong>${b.vuelta.join(' · ')}</strong>. ${b.nota}`;
  const eq = DATOS.equipo;
  const lista = (t, items) => `<div class="equipo-col"><span class="etiqueta">${t}</span><ul>${items.map((x) => `<li>${x}</li>`).join('')}</ul></div>`;
  $('#equipo-austral').innerHTML = lista('en la mochila scout (bodega)', eq.bodega) + lista('en la mano', eq.mano) + lista('se compra allá', eq.alla);
  $('[data-equipo-nota]').textContent = eq.nota;
}

// ---------- 4. Armador de ruta (Guatemala) ----------
const A = DATOS.armador;
const lugarArmador = (id) => A.lugares.find((l) => l.id === id);
const etapasDeRuta = (r) => r.etapas.map(([lugar, noches]) => ({ lugar, noches, aloj: lugarArmador(lugar).base }));
let etapas = (guardado.leer('armador', null) || etapasDeRuta(DATOS.rutas[0]))
  .filter((e) => lugarArmador(e.lugar)); // por si cambió algún lugar
const guardarEtapas = () => guardado.escribir('armador', etapas);

// Traslado entre dos puntos: busca a>b y si no, b>a. Mismo lugar: no hay traslado.
function traslado(a, b) {
  if (a === b) return null;
  return A.traslados[`${a}>${b}`] || A.traslados[`${b}>${a}`] ||
    { h: '?', modo: 'sin dato directo: conviene pasar por Antigua o Flores', p: 0, falta: true };
}

const nombrePunto = (id) => (id === 'gua' ? 'aeropuerto' : lugarArmador(id).nombre);
const fotoLugar = (id) => (LUGARES[id] ? LUGARES[id].fotos[0].src : '');

function pintarLugaresArmador() {
  $('#armador-lugares').innerHTML = A.lugares.map((l) => {
    const desde = Math.min(...l.aloj.map((o) => o.p));
    const foto = fotoLugar(l.id);
    return `
      <button type="button" class="lugar-chip" data-sumar="${l.id}">
        ${foto ? `<img src="${foto}" alt="" loading="lazy" decoding="async">` : '<span class="sin-foto">GUA</span>'}
        <span class="lugar-texto">
          <strong>${l.nombre}${l.dispo && l.dispo.estado === 'agotado' ? ' <span class="punto-dispo" title="' + l.dispo.texto + '"></span>' : ''}</strong>
          <small>${l.sugeridas}</small>
          <small>${desde ? 'desde ' + CLP(desde) + ' la noche' : 'alojamiento incluido'}</small>
        </span>
        <span class="mas" aria-hidden="true">+</span>
      </button>`;
  }).join('');
}

// Cálculo del armador (por persona)
function calcularArmador() {
  const puntos = ['gua', ...etapas.map((e) => e.lugar), 'gua'];
  const tramos = [];
  for (let i = 0; i < puntos.length - 1; i++) tramos.push(traslado(puntos[i], puntos[i + 1]));
  const noches = etapas.reduce((s, e) => s + e.noches, 0);
  const alojNoches = etapas.reduce((s, e) => s + e.noches * lugarArmador(e.lugar).aloj[e.aloj].p, 0); // para los dos
  const unicos = [...new Set(etapas.map((e) => e.lugar))];
  const activ = unicos.reduce((s, id) => s + lugarArmador(id).activ, 0);
  const vuelos = tramos.filter((t) => t && t.vuelo).length;
  const traslados = tramos.reduce((s, t) => s + (t ? t.p : 0), 0);
  const trasladosTierra = traslados - vuelos * DATOS.vueloFlores.precio;
  const comidaDia = Number(valores['ca-comida'].unitario) || 15000;
  const comida = (noches + 1) * comidaDia;
  const persona = alojNoches / 2 + activ + traslados + comida;
  const falta = tramos.some((t) => t && t.falta);
  return { tramos, noches, alojNoches, activ, vuelos, traslados, trasladosTierra, comida, persona, falta };
}

function filaTraslado(t, desde, hasta) {
  if (!t) return '';
  return `
    <li class="traslado${t.vuelo ? ' es-vuelo' : ''}${t.falta ? ' falta' : ''}">
      <span class="traslado-icono" aria-hidden="true">${t.vuelo ? '✈' : '↓'}</span>
      <span>${nombrePunto(desde)} → ${nombrePunto(hasta)} · ${t.h} · ${t.modo}${t.nota ? ` · ${t.nota}` : ''}</span>
      <b>${t.p ? (t.est ? '≈ ' : '') + CLP(t.p) : ''}</b>
    </li>`;
}

function pintarArmador() {
  const r = calcularArmador();
  const puntos = ['gua', ...etapas.map((e) => e.lugar), 'gua'];
  const filas = [];
  etapas.forEach((e, i) => {
    const l = lugarArmador(e.lugar);
    filas.push(filaTraslado(r.tramos[i], puntos[i], puntos[i + 1]));
    filas.push(`
      <li class="etapa" data-i="${i}">
        <div class="etapa-cabeza">
          <strong>${l.nombre}</strong>
          <div class="etapa-mover">
            <button type="button" data-accion="subir" aria-label="Subir" ${i === 0 ? 'disabled' : ''}>↑</button>
            <button type="button" data-accion="bajar" aria-label="Bajar" ${i === etapas.length - 1 ? 'disabled' : ''}>↓</button>
            <button type="button" data-accion="quitar" aria-label="Quitar">×</button>
          </div>
        </div>
        <div class="etapa-controles">
          <div class="pasos" role="group" aria-label="Noches en ${l.nombre}">
            <button type="button" data-accion="menos" aria-label="Una noche menos" ${e.noches <= 1 ? 'disabled' : ''}>−</button>
            <span>${e.noches} ${e.noches === 1 ? 'noche' : 'noches'}</span>
            <button type="button" data-accion="mas" aria-label="Una noche más">+</button>
          </div>
          ${l.aloj.length > 1 ? `
          <select data-accion="aloj" aria-label="Dónde dormir en ${l.nombre}">
            ${l.aloj.map((o, n) => `<option value="${n}" ${n === e.aloj ? 'selected' : ''}>${o.n} · ★ ${o.r} · ${CLP(o.p)}</option>`).join('')}
          </select>` : `<span class="suave">${l.aloj[0].n}</span>`}
        </div>
        <p class="etapa-nota">${l.dispo && l.dispo.estado !== 'ok' ? insigniaDispo(l.dispo) + ' ' + l.dispo.texto + '. ' : ''}${l.activNota}. ${l.nota}${l.busca ? ` <a class="link" href="${busquedaHoteles(l.busca)}" target="_blank" rel="noopener">más alojamiento ↗</a>` : ''}</p>
      </li>`);
  });
  if (etapas.length) filas.push(filaTraslado(r.tramos[etapas.length], puntos[etapas.length], 'gua'));
  $('#armador-etapas').innerHTML = etapas.length ? filas.join('') : '<li class="vacio">Toca un lugar para empezar.</li>';

  // Noches contra las del vuelo elegido
  const ca = DATOS.vuelosCA.find((v) => v.id === opciones.vueloCA);
  const disp = ca.noches;
  const estado = $('#armador-noches');
  estado.textContent = r.noches === disp ? `${r.noches} de ${disp} noches ✓` :
    r.noches < disp ? `${r.noches} de ${disp} noches · faltan ${disp - r.noches}` : `${r.noches} de ${disp} noches · sobran ${r.noches - disp}`;
  estado.className = 'noches-estado ' + (r.noches === disp ? 'ok' : 'mal');

  $('#armador-persona').textContent = CLP(r.persona);
  $('#armador-desglose').innerHTML = `
    <div><dt>alojamiento</dt><dd>${CLP(r.alojNoches / 2)}</dd></div>
    <div><dt>tours y entradas</dt><dd>${CLP(r.activ)}</dd></div>
    <div><dt>traslados${r.vuelos ? ` (${r.vuelos} ${r.vuelos === 1 ? 'vuelo' : 'vuelos'})` : ''}</dt><dd>${CLP(r.traslados)}</dd></div>
    <div><dt>comida</dt><dd>${CLP(r.comida)}</dd></div>`;
  $('#armador-aviso').textContent = r.falta ? 'Hay un tramo sin dato directo: conviene ordenar la ruta pasando por Antigua o Flores.' : 'Sin contar el vuelo Santiago ↔ Guatemala.';

  // Link al mapa con la ruta completa
  const paradas = ['Aeropuerto La Aurora, Guatemala', ...etapas.map((e) => (LUGARES[e.lugar] ? LUGARES[e.lugar].mapa : lugarArmador(e.lugar).nombre)), 'Aeropuerto La Aurora, Guatemala'];
  $('#armador-mapa').href = 'https://www.google.com/maps/dir/' + paradas.map(encodeURIComponent).join('/');
}

function cargarEnArmador(ruta) {
  etapas = etapasDeRuta(ruta);
  guardarEtapas();
  pintarArmador();
}

$('#armador-lugares').addEventListener('click', (e) => {
  const b = e.target.closest('[data-sumar]');
  if (!b) return;
  const l = lugarArmador(b.dataset.sumar);
  etapas.push({ lugar: l.id, noches: ['acatenango', 'ciudad'].includes(l.id) ? 1 : 2, aloj: l.base });
  guardarEtapas();
  pintarArmador();
});

$('#armador-etapas').addEventListener('click', (e) => {
  const b = e.target.closest('button[data-accion]');
  if (!b) return;
  const i = Number(b.closest('.etapa').dataset.i);
  const accion = b.dataset.accion;
  if (accion === 'mas') etapas[i].noches++;
  if (accion === 'menos') etapas[i].noches = Math.max(1, etapas[i].noches - 1);
  if (accion === 'quitar') etapas.splice(i, 1);
  if (accion === 'subir' && i > 0) [etapas[i - 1], etapas[i]] = [etapas[i], etapas[i - 1]];
  if (accion === 'bajar' && i < etapas.length - 1) [etapas[i + 1], etapas[i]] = [etapas[i], etapas[i + 1]];
  guardarEtapas();
  pintarArmador();
});
$('#armador-etapas').addEventListener('change', (e) => {
  if (e.target.dataset.accion !== 'aloj') return;
  etapas[Number(e.target.closest('.etapa').dataset.i)].aloj = Number(e.target.value);
  guardarEtapas();
  pintarArmador();
});
$('#armador-vaciar').addEventListener('click', () => { etapas = []; guardarEtapas(); pintarArmador(); });

// Lleva los números del armador a la calculadora
$('#armador-pasar').addEventListener('click', () => {
  const r = calcularArmador();
  if (!r.noches) return;
  valores['ca-aloj'] = { unitario: Math.round(r.alojNoches / r.noches / 100) * 100, cantidad: r.noches };
  valores['ca-comida'] = { unitario: Number(valores['ca-comida'].unitario) || 15000, cantidad: r.noches + 1 };
  valores['ca-transp'] = { unitario: Math.round(r.trasladosTierra / 100) * 100, cantidad: 1 };
  valores['ca-activ'] = { unitario: r.activ, cantidad: 1 };
  guardado.escribir('valores', valores);
  opciones.internos = Math.min(r.vuelos, 4);
  guardarOpciones();
  pintarLineas('calc-ca', P.centroamerica);
  sincronizarSelects();
  calcular();
  $('#armador-aviso').textContent = 'Listo: quedó en el presupuesto.';
  $('#presupuesto').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// ---------- 5. Calculadora ----------
function valoresIniciales() {
  const v = {};
  [...P.centroamerica, ...P.austral].forEach((l) => { v[l.id] = { unitario: l.unitario, cantidad: l.cantidad }; });
  return v;
}
let valores = Object.assign(valoresIniciales(), guardado.leer('valores', {}));

function llenarSelects() {
  $('#calc-vuelo-ca').innerHTML = DATOS.vuelosCA.map((v) =>
    `<option value="${v.id}">${v.aerolinea} · ${v.ida.dia} → ${v.vuelta.dia}</option>`).join('');
  $('#calc-ida-au').innerHTML = AU.idas.map((v) =>
    `<option value="${v.id}">${v.aerolinea} ${v.sale} · ${CLP(v.precio)}</option>`).join('');
  $('#calc-vuelta-au').innerHTML = AU.vueltas.map((v) =>
    `<option value="${v.id}">${v.dia.split(' ').slice(0, 2).join(' ')} · ${v.aerolinea} ${v.sale} · ${CLP(v.precio)}</option>`).join('');
  sincronizarSelects();
}

function sincronizarSelects() {
  $('#calc-vuelo-ca').value = opciones.vueloCA;
  $('#calc-ida-au').value = opciones.idaAU;
  $('#calc-vuelta-au').value = opciones.vueltaAU;
  $('#calc-internos').value = String(opciones.internos);
  $('#calc-seguro').checked = opciones.seguro;
  $('#calc-equipaje').value = equipaje;
}

function pintarLineas(contenedorId, lineas) {
  $('#' + contenedorId).innerHTML = lineas.map((l) => `
    <div class="linea" data-id="${l.id}">
      <div class="nombre-linea">${l.nombre}<small>${l.tipo === 'mitad' ? 'a la mitad' : 'cada uno'}</small></div>
      <span class="subtotal" data-subtotal></span>
      <input type="number" inputmode="numeric" min="0" step="1000" data-campo="unitario" aria-label="${l.nombre}: monto" value="${valores[l.id].unitario}">
      <div class="x">
        <input type="number" inputmode="numeric" min="0" step="1" data-campo="cantidad" aria-label="${l.nombre}: cantidad" value="${valores[l.id].cantidad}">
        <span class="unidad">${l.unidad === 'total' ? 'x' : l.unidad}</span>
      </div>
    </div>
  `).join('');
}

// Precio del vuelo según equipaje. Si esa combinación no tiene precio, usa el de mano.
function precioVueloCA() {
  const v = DATOS.vuelosCA.find((x) => x.id === opciones.vueloCA);
  return (precioCA(v) || precioCA(v, 'mano')).monto;
}

function calcular() {
  const vueloCA = precioVueloCA();
  const internos = (Number(opciones.internos) || 0) * DATOS.vueloFlores.precio;
  const seguro = opciones.seguro ? P.seguro : 0;
  const pasajes = vueloCA + internos + precioAU().monto;

  // Gastos en destino, por persona
  const porPersona = (lineas) => lineas.reduce((suma, l) => {
    const total = (Number(valores[l.id].unitario) || 0) * (Number(valores[l.id].cantidad) || 0);
    const parte = l.tipo === 'mitad' ? total / 2 : total;
    const fila = $(`.linea[data-id="${l.id}"] [data-subtotal]`);
    if (fila) fila.textContent = `${CLP(parte)} c/u`;
    return suma + parte;
  }, 0);

  const enCA = porPersona(P.centroamerica);
  const enAU = porPersona(P.austral);
  const persona = pasajes + seguro + enCA + enAU;

  $('#res-persona').textContent = CLP(persona);
  $('#res-total').textContent = CLP(persona * 2);
  $('#res-marca').style.left = Math.min(100, (persona / 3500000) * 100) + '%';

  // Veredicto contra el tope
  let estado;
  let veredicto;
  if (persona <= 2000000) { estado = 'ok'; veredicto = `<strong>Bien.</strong> Dentro del tope con espacio (${CLP(P.tope.max - persona)} de margen).`; }
  else if (persona <= P.tope.max) { estado = 'justo'; veredicto = `<strong>Justo.</strong> Dentro del tope, con ${CLP(P.tope.max - persona)} de margen.`; }
  else { estado = 'pasado'; veredicto = `<strong>Nos pasamos por ${CLP(persona - P.tope.max)}.</strong> Lo que más baja: hostales en Guatemala, un tour menos o el bus a Flores en vez del avión.`; }
  $('#res-veredicto').innerHTML = veredicto;

  $('#res-desglose').innerHTML = `
    <div><dt>pasajes</dt><dd>${CLP(pasajes)}</dd></div>
    <div><dt>en la austral</dt><dd>${CLP(enAU)}</dd></div>
    <div><dt>en guatemala</dt><dd>${CLP(enCA)}</dd></div>
    ${seguro ? `<div><dt>seguro</dt><dd>${CLP(seguro)}</dd></div>` : ''}
  `;

  // Lo que la Jo transfiere después de comprar con una sola tarjeta
  $('#monto-transfer').textContent = CLP(pasajes);

  pintarTuViaje(persona, estado);
  pintarTablero();
  pintarBotonesCompra();
}

function conectarCalculadora() {
  llenarSelects();
  pintarLineas('calc-ca', P.centroamerica);
  pintarLineas('calc-au', P.austral);

  $('#calc-vuelo-ca').addEventListener('change', (e) => { opciones.vueloCA = e.target.value; guardarOpciones(); pintarVuelos(); pintarArmador(); calcular(); });
  $('#calc-ida-au').addEventListener('change', (e) => elegirTramoAU('ida', e.target.value));
  $('#calc-vuelta-au').addEventListener('change', (e) => elegirTramoAU('vuelta', e.target.value));
  $('#calc-equipaje').addEventListener('change', (e) => cambiarEquipaje(e.target.value));
  $('#calc-internos').addEventListener('change', (e) => { opciones.internos = Number(e.target.value); guardarOpciones(); calcular(); });
  $('#calc-seguro').addEventListener('change', (e) => { opciones.seguro = e.target.checked; guardarOpciones(); calcular(); });

  $('.calc').addEventListener('input', (e) => {
    const fila = e.target.closest('.linea');
    if (!fila) return;
    valores[fila.dataset.id][e.target.dataset.campo] = Number(e.target.value) || 0;
    guardado.escribir('valores', valores);
    calcular();
  });

  $('#calc-reset').addEventListener('click', () => {
    guardado.borrar('valores');
    guardado.borrar('opciones');
    valores = valoresIniciales();
    opciones = Object.assign({}, OPCIONES_INICIALES);
    pintarLinksAustral();
    pintarAutos();
    pintarRutaAustral();
    pintarDormir();
    pintarArmador();
    pintarLineas('calc-ca', P.centroamerica);
    pintarLineas('calc-au', P.austral);
    sincronizarSelects();
    pintarVuelos();
    pintarAustral();
    pintarPestanas();
    pintarRuta();
    calcular();
  });
}

// ---------- Barra flotante "tu viaje" ----------
function pintarTuViaje(persona, estado) {
  const ca = DATOS.vuelosCA.find((v) => v.id === opciones.vueloCA);
  const ruta = DATOS.rutas.find((r) => r.id === opciones.ruta);
  const sep = '<span class="sep">·</span>';
  $('#tv-items').innerHTML = [
    `<b>${idaAU().aerolinea}</b> sur 13 → ${diaVuelta()} dic`,
    `<b>${ca.aerolinea}</b> ${ca.ida.dia.replace('noche ', '')} → ${ca.vuelta.dia}`,
    ruta ? `<b>${ruta.nombre}</b>` : 'ruta por elegir'
  ].join(sep);
  $('#tv-total').textContent = millones(persona);
  $('#tv-punto').className = 'tv-punto ' + estado;
}

// Se esconde en el hero (ahí está el tablero) y en el presupuesto (ahí está el total)
function conectarTuViaje() {
  if (!('IntersectionObserver' in window)) return;
  const barra = $('#tu-viaje');
  const visibles = new Set();
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((en) => { if (en.isIntersecting) visibles.add(en.target.id); else visibles.delete(en.target.id); });
    barra.classList.toggle('oculto', visibles.size > 0);
  }, { threshold: 0.15 });
  obs.observe($('#presupuesto'));
  obs.observe($('#hero'));
}

// ---------- 7. Compra: checklist + links ----------
function pintarBotonesCompra() {
  const ca = DATOS.vuelosCA.find((v) => v.id === opciones.vueloCA);
  const aerolineas = [...new Set([idaAU().aerolinea, vueltaAU().aerolinea, ca.aerolinea])];
  const links = aerolineas.map((a) => `<a class="boton" href="${DATOS.compra[a]}" target="_blank" rel="noopener">comprar ${a} ↗</a>`);
  if (opciones.internos > 0) {
    links.push(`<a class="boton claro" href="${DATOS.vueloFlores.link}" target="_blank" rel="noopener">vuelos Guatemala ↔ Flores ↗</a>`);
  }
  $('#botones-compra').innerHTML = links.join('');
}

function conectarChecklist() {
  const marcados = guardado.leer('compra', {});
  const checks = $$('[data-check]');
  const progreso = () => {
    const n = checks.filter((c) => c.checked).length;
    $('#progreso-compra').style.width = (n / checks.length) * 100 + '%';
  };
  checks.forEach((c) => {
    c.checked = !!marcados[c.dataset.check];
    c.addEventListener('change', () => {
      marcados[c.dataset.check] = c.checked;
      guardado.escribir('compra', marcados);
      progreso();
      pintarTablero();
    });
  });
  progreso();
}

// ---------- Navegación: marca la sección visible ----------
function conectarNav() {
  const nav = $('.nav');
  const links = $$('.nav a');
  if (!('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => {
        const activo = a.getAttribute('href') === '#' + en.target.id;
        a.classList.toggle('activo', activo);
        // Solo desliza la barra de navegación (no la página, para no cortar otros scrolls)
        if (activo) nav.scrollTo({ left: a.offsetLeft - 20, behavior: 'smooth' });
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('.seccion').forEach((s) => obs.observe(s));
}

// ---------- Inicio ----------
pintarHero();
pintarCuentaRegresiva();
pintarLinksAustral();
pintarPreciosVivos();
pintarVuelos();
pintarPestanas();
pintarRuta();
pintarAustral();
pintarAutos();
pintarRutaAustral();
pintarDormir();
pintarActividadesAustral();
pintarLugaresArmador();
pintarArmador();
conectarCalculadora();
conectarChecklist();
conectarNav();
conectarTuViaje();
marcarSelector();
calcular();

// Trae los precios al día; si no hay archivo (o falla), quedan los de datos.js
fetch('precios.json', { cache: 'no-store' })
  .then((r) => (r.ok ? r.json() : null))
  .then((pv) => {
    if (!pv) return;
    preciosVivos = pv;
    aplicarPreciosVivos(pv);
    pintarPreciosVivos();
    pintarVuelos();
    pintarAustral();
    llenarSelects();
    calcular();
  })
  .catch(() => { /* sin precios al día */ });
