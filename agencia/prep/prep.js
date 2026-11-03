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
const OPCIONES_INICIALES = {
  vueloCA: DATOS.vuelosCA.find((v) => v.recomendado).id,
  vueloAU: DATOS.vuelosAustral[0].id,
  auto: DATOS.autos.opciones.find((a) => a.recomendado).id,
  ruta: null,       // id de ruta elegida (null = sin elegir)
  internos: 2,      // tramos Guatemala ↔ Flores
  seguro: false
};
let equipaje = guardado.leer('equipaje', 'mano');
let opciones = Object.assign({}, OPCIONES_INICIALES, guardado.leer('opciones', {}));
// Por si quedó guardado un vuelo que ya no existe
if (!DATOS.vuelosCA.some((v) => v.id === opciones.vueloCA)) opciones.vueloCA = OPCIONES_INICIALES.vueloCA;
if (!DATOS.vuelosAustral.some((v) => v.id === opciones.vueloAU)) opciones.vueloAU = OPCIONES_INICIALES.vueloAU;
if (!DATOS.autos.opciones.some((a) => a.id === opciones.auto)) opciones.auto = OPCIONES_INICIALES.auto;
if (opciones.ruta && !DATOS.rutas.some((r) => r.id === opciones.ruta)) opciones.ruta = null;
const guardarOpciones = () => guardado.escribir('opciones', opciones);

// ---------- Textos sueltos ----------
$$('[data-precio-visto]').forEach((el) => { el.textContent = DATOS.precioVisto; });
$$('[data-vuelo-flores]').forEach((el) => { el.textContent = CLP(DATOS.vueloFlores.precio); });
$$('[data-link-austral]').forEach((el) => { el.href = DATOS.linkAustral; });
$$('[data-link-autos]').forEach((el) => { el.href = DATOS.autos.link; });

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
  $('#tablero-pie').innerHTML = `vuelo elegido: <b>${ca.aerolinea} · vuelve ${ca.vuelta.dia}</b> · ruta: <b>${ruta ? ruta.nombre : 'por elegir'}</b>`;
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
    const p = leerPrecio(v[equipaje]);
    const elegido = opciones.vueloCA === v.id;
    const precio = p
      ? `<p class="precio">${p.estimado ? '<span class="aprox" title="estimado">≈</span>' : ''}${CLP(p.monto)}</p>`
      : `<p class="precio no-disponible">bodega: consultar en ${v.aerolinea}</p>`;
    const sellos = [
      v.recomendado ? '<span class="sello">recomendado</span>' : '',
      elegido ? '<span class="sello acento">elegido</span>' : ''
    ].join('');
    return `
      <article class="vuelo${v.recomendado ? ' recomendado' : ''}${elegido ? ' elegido' : ''}">
        ${sellos ? `<div class="sellos">${sellos}</div>` : ''}
        <div class="vuelo-cabeza">
          <span class="aerolinea">${v.aerolinea} · SCL ↔ ${v.destino}</span>
          <span class="etiqueta">por persona</span>
        </div>
        <div class="precio-fila">${precio}<span class="noches${v.noches >= 9 ? ' mas' : ''}" title="noches en destino">${v.noches} noches allá</span></div>
        <div class="tramo-vuelo">
          <span class="etiqueta">ida</span>
          <div><strong>${v.ida.dia}</strong>${v.ida.detalle}<br><small>${v.ida.escalas}</small></div>
        </div>
        <div class="tramo-vuelo">
          <span class="etiqueta">vuelta</span>
          <div><strong>${v.vuelta.dia}</strong>${v.vuelta.detalle}${v.vuelta.escalas ? `<br><small>${v.vuelta.escalas}</small>` : ''}</div>
        </div>
        <p class="nota-vuelo">${v.nota}</p>
        <div class="acciones">
          <button type="button" class="boton${elegido ? ' elegido' : ''}" data-elegir-vuelo="${v.id}" aria-pressed="${elegido}">${elegido ? 'elegido ✓' : 'elegir este'}</button>
          <a class="link" href="${v.link}" target="_blank" rel="noopener">recotizar en vivo ↗</a>
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
function pintarAustral() {
  $('#lista-austral').innerHTML = DATOS.vuelosAustral.map((v) => {
    const elegido = opciones.vueloAU === v.id;
    const sellos = [
      v.sello ? `<span class="sello">${v.sello}</span>` : '',
      elegido ? '<span class="sello acento">elegido</span>' : ''
    ].join('');
    return `
      <article class="vuelo${v.recomendado ? ' recomendado' : ''}${elegido ? ' elegido' : ''}">
        ${sellos ? `<div class="sellos">${sellos}</div>` : ''}
        <div class="vuelo-cabeza">
          <span class="aerolinea">${v.aerolinea} · SCL ↔ BBA</span>
          <span class="etiqueta">por persona</span>
        </div>
        <p class="precio">${CLP(v.precio)}</p>
        <div class="tramo-vuelo">
          <span class="etiqueta">ida</span>
          <div><strong>${v.ida}</strong><small>${v.escalas}</small></div>
        </div>
        <div class="tramo-vuelo">
          <span class="etiqueta">vuelta</span>
          <div><strong>${v.vuelta}</strong></div>
        </div>
        <div class="acciones">
          <button type="button" class="boton${elegido ? ' elegido' : ''}" data-elegir-austral="${v.id}" aria-pressed="${elegido}">${elegido ? 'elegido ✓' : 'elegir este'}</button>
          <a class="link" href="${DATOS.linkAustral}" target="_blank" rel="noopener">recotizar ↗</a>
        </div>
      </article>`;
  }).join('');
}
$('#lista-austral').addEventListener('click', (e) => {
  const b = e.target.closest('[data-elegir-austral]');
  if (!b) return;
  opciones.vueloAU = b.dataset.elegirAustral;
  guardarOpciones();
  pintarAustral();
  sincronizarSelects();
  calcular();
});

const exploradorAustral = $('#explorador-austral');
const mediaAustral = crearMedia($('[data-media]', exploradorAustral));

function pintarRutaAustral() {
  const r = DATOS.rutaAustral;
  $('[data-hecho-2025]').textContent = r.hecho2025;
  $('[data-ruta-resumen]', exploradorAustral).textContent = r.resumen;
  $('[data-ruta-extra]', exploradorAustral).textContent = r.extra;
  $('[data-paradas]', exploradorAustral).innerHTML = r.paradas.map((p, i) => `
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
  mediaAustral.mostrarLugar(DATOS.rutaAustral.paradas[i].lugar, true);
  if (esAngosto()) $('[data-media]', exploradorAustral).scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// ---------- Austral: auto ----------
function pintarAutos() {
  $('#lista-autos').innerHTML = DATOS.autos.opciones.map((a) => {
    const elegido = opciones.auto === a.id;
    const sellos = [
      a.sello ? `<span class="sello">${a.sello}</span>` : '',
      elegido ? '<span class="sello acento">elegido</span>' : ''
    ].join('');
    return `
      <article class="vuelo${a.recomendado ? ' recomendado' : ''}${elegido ? ' elegido' : ''}">
        ${sellos ? `<div class="sellos">${sellos}</div>` : ''}
        <div class="vuelo-cabeza">
          <span class="aerolinea">${a.agencia} · ${a.recogida}</span>
          <span class="etiqueta">10 días</span>
        </div>
        <div class="precio-fila"><p class="precio">${CLP(a.total)}</p><span class="noches" title="a la mitad">${CLP(a.total / 2)} c/u</span></div>
        <div class="tramo-vuelo">
          <span class="etiqueta">auto</span>
          <div><strong>${a.modelo}</strong><small>${a.tipo}</small></div>
        </div>
        <p class="nota-vuelo">${a.nota}</p>
        <div class="acciones">
          <button type="button" class="boton${elegido ? ' elegido' : ''}" data-elegir-auto="${a.id}" aria-pressed="${elegido}">${elegido ? 'elegido ✓' : 'elegir este'}</button>
          <a class="link" href="${DATOS.autos.link}" target="_blank" rel="noopener">reservar ↗</a>
        </div>
      </article>`;
  }).join('');
}
$('#lista-autos').addEventListener('click', (e) => {
  const b = e.target.closest('[data-elegir-auto]');
  if (!b) return;
  const auto = DATOS.autos.opciones.find((a) => a.id === b.dataset.elegirAuto);
  opciones.auto = auto.id;
  guardarOpciones();
  // El arriendo del presupuesto pasa a ser el de este auto
  valores['au-auto'] = { unitario: Math.round(auto.total / 10), cantidad: 10 };
  guardado.escribir('valores', valores);
  pintarAutos();
  pintarLineas('calc-au', P.austral);
  calcular();
});

// ---------- Austral: dónde dormir, actividades y barcaza ----------
const busquedaHoteles = (q) => `https://www.google.com/travel/search?q=${encodeURIComponent(q)}&hl=es&gl=CL&curr=CLP`;

function pintarDormir() {
  $('#tabla-dormir tbody').innerHTML = DATOS.dormirAustral.map((d) => `
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

function pintarActividadesAustral() {
  $('#lista-actividades-au').innerHTML = DATOS.actividadesAustral.map((a) => `
    <div class="actividad">
      <div class="actividad-cabeza"><span class="etiqueta">${a.donde}</span>${a.reservar ? '<span class="sello-mini">reservar</span>' : ''}</div>
      <strong>${a.nombre}</strong>
      <p class="actividad-precio">${a.precio}</p>
      <p>${a.nota}</p>
    </div>`).join('');
  const b = DATOS.barcaza;
  $('[data-barcaza]').innerHTML = `Desde Yungay: <strong>${b.ida.join(' · ')}</strong>. Desde Río Bravo: <strong>${b.vuelta.join(' · ')}</strong>. ${b.nota}`;
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
          <strong>${l.nombre}</strong>
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
        <p class="etapa-nota">${l.activNota}. ${l.nota}${l.busca ? ` <a class="link" href="${busquedaHoteles(l.busca)}" target="_blank" rel="noopener">más alojamiento ↗</a>` : ''}</p>
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
  $('#calc-vuelo-au').innerHTML = DATOS.vuelosAustral.map((v) =>
    `<option value="${v.id}">${v.aerolinea} · ${v.ida.split(' · ')[1]} · ${CLP(v.precio)}</option>`).join('');
  sincronizarSelects();
}

function sincronizarSelects() {
  $('#calc-vuelo-ca').value = opciones.vueloCA;
  $('#calc-vuelo-au').value = opciones.vueloAU;
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
  return (leerPrecio(v[equipaje]) || leerPrecio(v.mano) || leerPrecio(v.sin)).monto;
}

function calcular() {
  const vueloCA = precioVueloCA();
  const internos = (Number(opciones.internos) || 0) * DATOS.vueloFlores.precio;
  const au = DATOS.vuelosAustral.find((x) => x.id === opciones.vueloAU);
  const seguro = opciones.seguro ? P.seguro : 0;
  const pasajes = vueloCA + internos + au.precio;

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
  else { estado = 'pasado'; veredicto = `<strong>Nos pasamos por ${CLP(persona - P.tope.max)}.</strong> Lo primero que se puede bajar: más camping en la Austral, hostales en Guatemala o un tour menos.`; }
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
  $('#calc-vuelo-au').addEventListener('change', (e) => { opciones.vueloAU = e.target.value; guardarOpciones(); pintarAustral(); calcular(); });
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
    pintarAutos();
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
  const au = DATOS.vuelosAustral.find((v) => v.id === opciones.vueloAU);
  const ruta = DATOS.rutas.find((r) => r.id === opciones.ruta);
  const sep = '<span class="sep">·</span>';
  $('#tv-items').innerHTML = [
    `<b>${au.aerolinea}</b> sur 13 → 23 dic`,
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
  const au = DATOS.vuelosAustral.find((v) => v.id === opciones.vueloAU);
  const links = [
    `<a class="boton" href="${DATOS.compra[au.aerolinea]}" target="_blank" rel="noopener">comprar ${au.aerolinea} ↗</a>`,
    `<a class="boton" href="${DATOS.compra[ca.aerolinea]}" target="_blank" rel="noopener">comprar ${ca.aerolinea} ↗</a>`
  ];
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
