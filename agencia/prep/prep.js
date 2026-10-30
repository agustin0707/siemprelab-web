// Web prep · Agencia de Viajes SiempreLab
// Pinta vuelos, rutas (con fotos y mapa), comparación y Austral desde datos.js y lugares.js.
// Lo que se elige (vuelo, ruta, vuelo al sur) alimenta la calculadora y la barra "tu viaje".

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
const P = DATOS.presupuesto;
const OPCIONES_INICIALES = {
  vueloCA: DATOS.vuelosCA.find((v) => v.recomendado).id,
  vueloAU: DATOS.vuelosAustral[0].id,
  ruta: null,       // id de ruta elegida (null = sin elegir)
  internos: 2,      // tramos Guatemala ↔ Flores
  seguro: false
};
let equipaje = guardado.leer('equipaje', 'mano');
let opciones = Object.assign({}, OPCIONES_INICIALES, guardado.leer('opciones', {}));
const guardarOpciones = () => guardado.escribir('opciones', opciones);

// ---------- Textos sueltos ----------
$$('[data-precio-visto]').forEach((el) => { el.textContent = DATOS.precioVisto; });
$$('[data-vuelo-flores]').forEach((el) => { el.textContent = CLP(DATOS.vueloFlores.precio); });
$$('[data-link-austral]').forEach((el) => { el.href = DATOS.linkAustral; });

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

// Cuenta regresiva hasta el despegue
function pintarCuentaRegresiva() {
  const dias = Math.ceil((new Date(DATOS.despegue) - new Date()) / 86400000);
  $('#cuenta-regresiva').textContent = dias > 1 ? `faltan ${dias} días` : dias === 1 ? 'despegamos mañana' : 'buen viaje';
}

// El tablero refleja lo elegido y si ya se compró (foto de confirmación marcada)
function pintarTablero() {
  const ca = DATOS.vuelosCA.find((v) => v.id === opciones.vueloCA);
  const ruta = DATOS.rutas.find((r) => r.id === opciones.ruta);
  const comprado = !!guardado.leer('compra', {}).foto;
  $('#t-fecha-ca').textContent = ca.ida.dia.includes('noche') ? '13 dic' : ca.ida.dia.replace(/^\w+ /, '') + ' dic';
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

// ---------- 1. Vuelos Centroamérica ----------
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

// ---------- 3. Comparación ----------
function pintarComparacion() {
  const max = Math.max(...DATOS.comparacion.map((c) => c.precio));
  $('#lista-comparar').innerHTML = DATOS.comparacion.map((c, i) => `
    <div class="barra-fila${c.malo ? ' malo' : ''}${i === 0 ? ' elegido' : ''}">
      <div class="nombre">${c.destino}<small>${c.nota}</small></div>
      <div class="barra-pista">
        <div class="barra-relleno" style="width:${Math.max(20, (c.precio / max) * 100)}%">${CLP(c.precio)}</div>
      </div>
    </div>
  `).join('');
}

// ---------- 4. Austral: vuelos + ideas con fotos y mapa ----------
function pintarAustral() {
  $('#lista-austral').innerHTML = DATOS.vuelosAustral.map((v) => {
    const elegido = opciones.vueloAU === v.id;
    const sellos = [
      v.recomendado ? '<span class="sello">más barato</span>' : '',
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
          <div><strong>${v.ida}</strong><small>${v.escalas} · vuelta 10 ene</small></div>
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
  else { estado = 'pasado'; veredicto = `<strong>Nos pasamos por ${CLP(persona - P.tope.max)}.</strong> Lo primero que se puede bajar: días de auto o camping en vez de hostal.`; }
  $('#res-veredicto').innerHTML = veredicto;

  $('#res-desglose').innerHTML = `
    <div><dt>pasajes</dt><dd>${CLP(pasajes)}</dd></div>
    <div><dt>en centroamérica</dt><dd>${CLP(enCA)}</dd></div>
    <div><dt>en la austral</dt><dd>${CLP(enAU)}</dd></div>
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

  $('#calc-vuelo-ca').addEventListener('change', (e) => { opciones.vueloCA = e.target.value; guardarOpciones(); pintarVuelos(); calcular(); });
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
    `<b>${ca.aerolinea}</b> ${ca.ida.dia.replace('noche ', '')} → ${ca.vuelta.dia}`,
    ruta ? `<b>${ruta.nombre}</b>` : 'ruta por elegir',
    `<b>${au.aerolinea}</b> sur`
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
    `<a class="boton" href="${DATOS.compra[ca.aerolinea]}" target="_blank" rel="noopener">comprar ${ca.aerolinea} ↗</a>`,
    `<a class="boton" href="${DATOS.compra[au.aerolinea]}" target="_blank" rel="noopener">comprar ${au.aerolinea} ↗</a>`
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
pintarComparacion();
pintarAustral();
pintarRutaAustral();
conectarCalculadora();
conectarChecklist();
conectarNav();
conectarTuViaje();
marcarSelector();
calcular();
