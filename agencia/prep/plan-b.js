// Plan B · Agencia de Viajes SiempreLab
// Playa barata antes de Navidad (14 al 21 dic) y la Austral larga después (26 dic al 9 ene).
// Usa las piezas de prep.js (crearMedia, galeria, tarjetasActividades, recotizar...) con los datos de datos-b.js.
// Lo elegido se guarda aparte del plan A (prep-opciones-b, prep-valores-b), así los dos planes conviven.

const BP = DATOS_B.playa;
const BAU = DATOS_B.vuelosAU;
const BAUTO = DATOS_B.autos;
const PB = DATOS_B.presupuesto;

// ---------- Estado: lo elegido en el plan B ----------
const OPCIONES_B = {
  playa: BP.opciones[0].id,
  hoteles: {},          // hotel elegido en cada playa: { idPlaya: índice }
  noches: BP.noches,
  ida: BAU.idas.find((v) => v.recomendado).id,
  vuelta: BAU.vueltas.find((v) => v.recomendado).id,
  auto: BAUTO.opciones.find((a) => a.recomendado).id,
  anioNuevo: DATOS_B.anioNuevo[0].id,
  ruta: DATOS_B.rutas[0].id
};
let opcionesB = Object.assign({}, OPCIONES_B, guardado.leer('opciones-b', {}));
// Por si quedó guardado algo que ya no existe
if (!BP.opciones.some((o) => o.id === opcionesB.playa)) opcionesB.playa = OPCIONES_B.playa;
if (!BAU.idas.some((v) => v.id === opcionesB.ida)) opcionesB.ida = OPCIONES_B.ida;
if (!BAU.vueltas.some((v) => v.id === opcionesB.vuelta)) opcionesB.vuelta = OPCIONES_B.vuelta;
if (!BAUTO.opciones.some((a) => a.id === opcionesB.auto)) opcionesB.auto = OPCIONES_B.auto;
if (!DATOS_B.anioNuevo.some((n) => n.id === opcionesB.anioNuevo)) opcionesB.anioNuevo = OPCIONES_B.anioNuevo;
if (!DATOS_B.rutas.some((r) => r.id === opcionesB.ruta)) opcionesB.ruta = OPCIONES_B.ruta;
DATOS_B.rutaId = opcionesB.ruta; // desde acá, DATOS_B.ruta, .dormir y autos.km son los de la ruta elegida
if (![5, 6, 7, 8].includes(Number(opcionesB.noches))) opcionesB.noches = OPCIONES_B.noches;
if (!opcionesB.hoteles || typeof opcionesB.hoteles !== 'object') opcionesB.hoteles = {};
const guardarOpcionesB = () => guardado.escribir('opciones-b', opcionesB);

// Montos que se pueden cambiar a mano en la calculadora del plan B
const LINEAS_B = [...PB.playa, ...PB.austral];
function valoresInicialesB() {
  const v = {};
  LINEAS_B.forEach((l) => { v[l.id] = { unitario: l.unitario, cantidad: l.cantidad }; });
  return v;
}
let valoresB = Object.assign(valoresInicialesB(), guardado.leer('valores-b', {}));

// ---------- Lo elegido y lo que cuesta ----------
const playaElegida = () => BP.opciones.find((o) => o.id === opcionesB.playa);
const indiceHotel = (o) => (o.hoteles[opcionesB.hoteles[o.id]] ? opcionesB.hoteles[o.id] : o.base);
const hotelDe = (o) => o.hoteles[indiceHotel(o)];
const idaB = () => BAU.idas.find((v) => v.id === opcionesB.ida);
const vueltaB = () => BAU.vueltas.find((v) => v.id === opcionesB.vuelta);
const autoB = () => BAUTO.opciones.find((a) => a.id === opcionesB.auto);

// Lo recotizado a mano manda sobre lo de datos-b.js
const conRecotizado = (clave, base) => { const r = recotizadoDe(clave); return r && r.monto ? r.monto : base; };
const precioTramoB = (t) => conRecotizado(t.id, t.precio); // LATAM: la mochila en bodega va gratis con la WorldMember
const totalAutoB = (a) => conRecotizado(a.id, a.total);
const bencinaB = (a) => Math.round((BAUTO.km / a.consumo) * DATOS.autos.litro[a.combustible] / 1000) * 1000;

// Una playa por persona, con un hotel y unas noches. base = lo que entra en el tope de $800 mil.
function costoPlaya(o, h = hotelDe(o), noches = Number(opcionesB.noches)) {
  const vuelo = conRecotizado(o.vuelo.id, o.vuelo.precio);
  const mano = leerPrecio(o.vuelo.extraMano) || { monto: 0, estimado: false };
  const hotel = (h.p * noches) / 2;
  const base = vuelo + mano.monto + hotel + o.traslado.p;
  const comida = h.todoIncluido ? 0 : o.comida * noches;
  return { vuelo, mano, hotel, traslado: o.traslado.p, base, comida, estimado: mano.estimado && mano.monto > 0 };
}

// Las noches mueven el día de vuelta: del 19 al 22 de diciembre
const diaVueltaPlaya = () => 14 + Number(opcionesB.noches);
const diaSemana = (d) => ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'][new Date(2026, 11, d).getDay()];
const linkVueloPlaya = (o) => `https://www.google.com/travel/flights?q=Flights%20from%20SCL%20to%20${o.vuelo.codigo}%20on%202026-12-14%20through%202026-12-${diaVueltaPlaya()}&curr=CLP&hl=es&gl=CL`;
const linkHotel = (h) => busquedaHoteles(`${h.n} 14 al ${diaVueltaPlaya()} de diciembre 2026`);
const linkLatamB = (o, d, fecha) => `https://www.latamairlines.com/cl/es/ofertas-vuelos?origin=${o}&inbound=null&outbound=${fecha}T15%3A00%3A00.000Z&destination=${d}&adt=1&chd=0&inf=0&trip=OW&cabin=Economy&redemption=false&sort=RECOMMENDED`;
// Las fotos de los hoteles no son libres: se abren en Google Imágenes
const fotosHotel = (h, o) => `https://www.google.com/search?tbm=isch&hl=es&q=${encodeURIComponent(`${h.n} ${o.vuelo.ciudad || LUGARES[o.lugar].nombre} hotel`)}`;
const nombreCorto = (o) => o.nombre.replace(' todo incluido', '').replace('Caribe en ', '');

// ---------- Qué plan se ve ----------
function mostrarPlan(p) {
  document.documentElement.dataset.plan = p;
  guardado.escribir('plan', p);
  if (p === 'b') calcularB(); else calcular();
  pintarComparar();
}
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-plan-elegir]');
  if (!b) return;
  const antes = document.documentElement.dataset.plan;
  mostrarPlan(b.dataset.planElegir);
  // Desde la comparación, se baja al primer tramo del plan
  if (b.closest('#planes') && antes !== b.dataset.planElegir) {
    document.getElementById(b.dataset.planElegir === 'b' ? 'playa' : 'austral').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

// La comparación también se repinta cuando cambia algo del plan A
const calcularPlanA = calcular;
calcular = function () { calcularPlanA(); pintarComparar(); };

// ---------- A o B: los dos planes lado a lado ----------
// Calendario del 13 dic al 10 ene (28 días): cada tramo es una barra
const posDia = (d) => ((d - 13) / 28) * 100; // d en días desde el 1 dic (9 ene = 40)
function barraCal(desde, hasta, clase, texto) {
  return `<i class="${clase}" style="left:${posDia(desde)}%;width:${posDia(hasta) - posDia(desde)}%"><span>${texto}</span></i>`;
}
function pintarComparar() {
  const actual = document.documentElement.dataset.plan;
  const a = totalPersona;
  const b = totalB;
  const finAU = diaVuelta(); // 23 o 24 en el plan A
  const planes = [
    { id: 'a', titulo: 'Austral 2.0 + Guatemala', dias: `${finAU - 13} noches en el sur y 14 en Guatemala`, total: a,
      cal: barraCal(13, finAU, 'sur', 'austral') + barraCal(25, 40, 'otro', 'guatemala'), por: DATOS_B.porQue.a },
    { id: 'b', titulo: `Playa + Austral larga`, dias: `${opcionesB.noches} noches en ${nombreCorto(playaElegida())} y 14 en el sur`, total: b,
      cal: barraCal(14, diaVueltaPlaya(), 'otro', 'playa') + barraCal(26, 40, 'sur', 'austral larga'), por: DATOS_B.porQue.b }
  ];
  $('#planes').innerHTML = planes.map((p) => `
    <article class="plan${actual === p.id ? ' activo' : ''}">
      <div class="plan-cabeza">
        <span class="plan-letra">${p.id.toUpperCase()}</span>
        <div><strong>${p.titulo}</strong><small>${p.dias}</small></div>
      </div>
      <div class="plan-cal" aria-hidden="true">${p.cal}<b class="navidad" style="left:${posDia(24.5)}%"></b></div>
      <div class="plan-cal-fechas" aria-hidden="true"><span>13 dic</span><span style="left:${posDia(24.5)}%">navidad</span><span>9 ene</span></div>
      <p class="plan-total">${p.total ? CLP(p.total) : '…'}<small> c/u</small></p>
      <ul class="plan-por">${p.por.map((x) => `<li>${x}</li>`).join('')}</ul>
      <button type="button" class="boton${actual === p.id ? ' elegido' : ''}" data-plan-elegir="${p.id}" aria-pressed="${actual === p.id}">${actual === p.id ? 'viendo este plan ✓' : `ver el plan ${p.id.toUpperCase()}`}</button>
    </article>`).join('') + (a && b ? `
    <p class="planes-dif">Con lo elegido hoy, el plan B sale <strong>${CLP(Math.abs(a - b))} ${b < a ? 'menos' : 'más'}</strong> por persona que el A.</p>` : '');
  // El selector del hero
  $$('.plan-switch [data-plan-elegir]').forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.planElegir === actual)));
}

// ---------- B1. La playa ----------
const TOPE_BARRA = 1600000; // la barra de cada playa va de $0 a $1,6 M; el tope queda al medio
function pintarPlayas() {
  const noches = Number(opcionesB.noches);
  $$('[data-noches-playa]').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.nochesPlaya) === noches)));
  $('#lista-playas').innerHTML = BP.opciones.map((o) => {
    const h = hotelDe(o);
    const c = costoPlaya(o, h);
    const elegida = o.id === opcionesB.playa;
    const dentro = c.base <= DATOS_B.topePlaya;
    const ojo = [o.vuelo.nota, `Traslado: ${o.traslado.texto}, ≈ ${CLP(o.traslado.p)} c/u ida y vuelta.`, ...o.ojo];
    return `
      <article class="vuelo playa${elegida ? ' elegido' : ''}${dentro ? '' : ' fuera'}">
        <div class="sellos"><span class="sello">${o.sello}</span>${elegida ? '<span class="sello acento">elegida</span>' : ''}</div>
        ${galeria(o.lugar, o.nombre)}
        <div class="vuelo-cabeza"><h4 class="playa-nombre">${o.nombre}</h4><span class="etiqueta">${LUGARES[o.lugar].pais}</span></div>
        <p class="playa-resumen">${o.resumen}</p>
        <p class="playa-clima">${o.clima}</p>
        <div class="tramo-vuelo">
          <span class="etiqueta">vuelo</span>
          <div><strong>${logo(o.vuelo.aerolinea)}${o.vuelo.aerolinea} · ${o.vuelo.ida}</strong>
            <small>${o.vuelo.dur} · ${o.vuelo.escalas} · ${CLP(c.vuelo)} c/u${c.mano.monto ? ` + ≈ ${CLP(c.mano.monto)} de maleta` : ''}</small>
            ${tendencia(o.vuelo)}</div>
        </div>
        <div class="tramo-vuelo">
          <span class="etiqueta">hotel</span>
          <div>
            <div class="chips hoteles" role="group" aria-label="Hotel en ${o.nombre}">${o.hoteles.map((x, i) => `
              <button type="button" data-hotel="${o.id}:${i}" aria-selected="${i === indiceHotel(o)}">${x.n} <span class="mono">★ ${x.r}</span><b>${CLP(x.p)}</b></button>`).join('')}
            </div>
            <small>${h.tipo} · ${h.zona} · la noche para los dos</small>
            <a class="link fotos-hotel" href="${fotosHotel(h, o)}" target="_blank" rel="noopener">fotos de ${h.n}, piezas y piscina ↗</a>
          </div>
        </div>
        <div class="playa-cuenta">
          <span class="etiqueta">vuelo + hotel + traslados · ${noches} noches · por persona</span>
          <p class="precio">${c.estimado ? '<span class="aprox" title="estimado">≈</span>' : ''}${CLP(c.base)}</p>
          <div class="playa-barra" aria-hidden="true"><i style="width:${Math.min(100, (c.base / TOPE_BARRA) * 100)}%"></i><b style="left:${(DATOS_B.topePlaya / TOPE_BARRA) * 100}%"></b></div>
          <small>${dentro ? `Dentro de los $800 mil: sobran ${CLP(DATOS_B.topePlaya - c.base)}.` : `Se pasa de los $800 mil por ${CLP(c.base - DATOS_B.topePlaya)}.`} ${h.todoIncluido ? 'Comida y tragos incluidos.' : `Comida allá ≈ ${CLP(c.comida)} c/u.`}</small>
        </div>
        <details class="actividad-mas"><summary>lo que hay que saber</summary>${bloqueLista('ojo', ojo)}</details>
        <div class="acciones">
          <button type="button" class="boton${elegida ? ' elegido' : ''}" data-elegir-playa="${o.id}" aria-pressed="${elegida}">${elegida ? 'elegida ✓' : 'elegir esta'}</button>
          <span class="playa-links"><a class="link" href="${linkVueloPlaya(o)}" target="_blank" rel="noopener">vuelo ↗</a> <a class="link" href="${linkHotel(h)}" target="_blank" rel="noopener">hotel ↗</a></span>
        </div>
        ${recotizar(o.vuelo.id, linkVueloPlaya(o), { antes: c.vuelo })}
      </article>`;
  }).join('');
  $('[data-playa-descartados]').textContent = BP.descartados;
}

$('#lista-playas').addEventListener('click', (e) => {
  const chip = e.target.closest('[data-hotel]');
  const elegir = e.target.closest('[data-elegir-playa]');
  if (chip) {
    const [id, i] = chip.dataset.hotel.split(':');
    opcionesB.hoteles[id] = Number(i);
    // Tocar un hotel también elige esa playa
    opcionesB.playa = id;
  } else if (elegir) {
    opcionesB.playa = elegir.dataset.elegirPlaya;
  } else return;
  guardarOpcionesB();
  aplicarPlayaAlPresupuesto();
  repintarPlaya();
});
$('#noches-playa').addEventListener('click', (e) => {
  const b = e.target.closest('[data-noches-playa]');
  if (!b) return;
  opcionesB.noches = Number(b.dataset.nochesPlaya);
  guardarOpcionesB();
  aplicarPlayaAlPresupuesto();
  repintarPlaya();
});
function repintarPlaya() {
  pintarPlayas();
  pintarCuandoComprar();
  pintarBlackFriday();
  sincronizarSelectsB();
  calcularB();
}

// ¿Ahora o en el Black Friday?
function pintarCuandoComprar() {
  const dias = diasHasta(DATOS_B.blackFriday.inicio); // el mismo momento que la cuenta regresiva
  const o = playaElegida();
  const c = costoPlaya(o);
  const BF = DATOS_B.blackFriday;
  const objetivo = Math.round((c.base * (1 - BF.descuento / 100)) / 1000) * 1000;
  const cuando = dias > 1 ? `en ${dias} días` : dias === 1 ? 'mañana' : dias === 0 ? 'hoy' : 'ya pasó';
  $('#cuando-comprar').innerHTML = `
    <div class="aviso fuerte"><span class="etiqueta">la austral larga · el viernes</span>
      <p>Los vuelos del 26 dic y del 9 ene Google los marca <strong>caros</strong>: es temporada alta y no van a bajar. Del auto quedaban 4 en Kayak. <strong>Pasajes, auto y lo que se llena se compran el viernes.</strong></p></div>
    <div class="aviso"><span class="etiqueta">la playa · puede esperar</span>
      <p>El Black Friday es del vie 27 al lun 30 nov (${cuando}). Hoy los vuelos a Brasil están en precio normal. Si aparece un paquete de vuelo + hotel para ${nombreCorto(o)} bajo <strong>${CLP(objetivo)} c/u</strong> (${BF.descuento} % menos que hoy), se compra. Si no, se compra igual el lunes 30.</p></div>
    <div class="aviso"><span class="etiqueta">el riesgo de esperar</span>
      <p>Entre el Black Friday y el viaje quedan dos semanas y los hoteles chicos se llenan. Si hay uno que nos encanta, <strong>reservarlo ahora con cancelación gratis</strong> y dejar para el Black Friday solo el vuelo.</p></div>`;
}

// ---------- Black Friday: tabla de objetivos, plan y links ----------
function pintarBlackFriday() {
  const BF = DATOS_B.blackFriday;
  const tope = DATOS_B.topePlaya;
  const filas = BP.opciones.map((o) => {
    const h = hotelDe(o);
    const c = costoPlaya(o, h);
    const meta = Math.round((c.base * (1 - BF.descuento / 100)) / 1000) * 1000;
    const hoy = c.base <= tope;
    const conBF = meta <= tope;
    const estado = hoy ? '<span class="bf-si">ya entra</span>'
      : conBF ? '<span class="bf-quizas">entra si baja</span>'
      : `<span class="bf-no">no entra ni con ${BF.descuento} %</span>`;
    return `<tr${o.id === opcionesB.playa ? ' class="elegida"' : ''}>
      <td><strong>${nombreCorto(o)}</strong><small>${h.n}${h.todoIncluido ? ' · todo incluido' : ''}</small></td>
      <td class="mono">${CLP(c.base)}</td>
      <td class="mono">${CLP(meta)}</td>
      <td>${estado}</td></tr>`;
  }).join('');
  $('#bf-tabla').innerHTML = `<thead><tr><th>playa y hotel</th><th>hoy</th><th>objetivo (−${BF.descuento} %)</th><th>tope $800 mil</th></tr></thead><tbody>${filas}</tbody>`;
  $('#bf-plan').innerHTML = BF.plan.map(([cuando, que]) => `<li><span>${cuando}</span>${que}</li>`).join('');
  $('#bf-links').innerHTML = BF.donde.map((l) => `<a class="link" href="${l.url}" target="_blank" rel="noopener">${l.t} ↗</a>`).join('');
  $('#bf-ojo').innerHTML = BF.ojo.map((x) => `<li>${x}</li>`).join('');
}

// Cuenta regresiva al Black Friday (se actualiza cada segundo)
function pintarCuentaBF() {
  const BF = DATOS_B.blackFriday;
  const ahora = Date.now();
  const ini = new Date(BF.inicio).getTime();
  const fin = new Date(BF.fin).getTime();
  const caja = $('#bf-cuenta');
  if (!caja) return;
  if (ahora >= fin) { caja.innerHTML = '<p class="bf-estado">El Black Friday ya pasó.</p>'; return; }
  if (ahora >= ini) { caja.innerHTML = '<p class="bf-estado vivo">Está pasando ahora: hasta el lun 30 a las 23:59.</p>'; return; }
  let s = Math.floor((ini - ahora) / 1000);
  const d = Math.floor(s / 86400); s -= d * 86400;
  const h = Math.floor(s / 3600); s -= h * 3600;
  const m = Math.floor(s / 60); s -= m * 60;
  const dos = (n) => String(n).padStart(2, '0');
  caja.innerHTML = [[d, 'días'], [dos(h), 'horas'], [dos(m), 'min'], [dos(s), 'seg']]
    .map(([n, t]) => `<div><b>${n}</b><span>${t}</span></div>`).join('');
}
pintarCuentaBF();
setInterval(pintarCuentaBF, 1000);

// ---------- B2b. Tres rutas para la Austral larga ----------
const TRAMO_RUTA = {
  'fin-del-camino': "Cerro Castillo → Villa O'Higgins → Chile Chico",
  'sin-apuro': 'Cerro Castillo → Bertrand → Tortel → Guadal → Chile Chico',
  'dos-paises': 'Cerro Castillo → Paso Roballos → El Chaltén → Chile Chico'
};
// Lo que cambia la plata entre rutas, por persona: tours, alojamiento, barcaza, permiso y bencina
function costoRutaB(r, a = autoB()) {
  const bencina = Math.round((r.km / a.consumo) * DATOS.autos.litro[a.combustible]);
  return r.costos.actividades + (r.costos.aloj * 14 + r.costos.barcaza + r.costos.permiso + bencina) / 2;
}
const puntosGusto = (n) => '●'.repeat(n) + '○'.repeat(3 - n);
function pintarRutasB() {
  const base = costoRutaB(DATOS_B.rutas[0]);
  $('#b-rutas').innerHTML = DATOS_B.rutas.map((r) => {
    const elegida = r.id === opcionesB.ruta;
    const dif = Math.round((costoRutaB(r) - base) / 1000) * 1000;
    return `
      <article class="ruta-b${elegida ? ' elegida' : ''}" style="--color-ruta:${r.color}">
        <div class="sellos"><span class="sello">${r.sello}</span>${elegida ? '<span class="sello acento">elegida</span>' : ''}</div>
        ${galeria(r.fotos, r.nombre)}
        <h4>${r.nombre}</h4>
        <p class="ruta-gancho">${r.gancho}</p>
        <div class="ruta-cifras">
          <div><b>~${r.km.toLocaleString('es-CL')}</b><span>km</span></div>
          <div><b>${String(r.horasMax).replace('.', ',')} h</b><span>el día más largo</span></div>
          <div><b>${r.nochesTecho}</b><span>noches con techo</span></div>
          <div><b>${dif === 0 ? 'base' : (dif > 0 ? '+' : '−') + CLP(Math.abs(dif))}</b><span>c/u vs la completa</span></div>
        </div>
        <div class="ruta-listas">
          <div><span class="etiqueta">a favor</span><ul>${r.pros.map((x) => `<li>${x}</li>`).join('')}</ul></div>
          <div><span class="etiqueta">en contra</span><ul>${r.contras.map((x) => `<li>${x}</li>`).join('')}</ul></div>
        </div>
        <div class="acciones">
          <button type="button" class="boton${elegida ? ' elegido' : ''}" data-elegir-ruta-b="${r.id}" aria-pressed="${elegida}">${elegida ? 'elegida ✓' : 'elegir esta ruta'}</button>
        </div>
      </article>`;
  }).join('');
  // Tabla: qué tanto cumple cada ruta con cada gusto
  $('#b-rutas-tabla').innerHTML = `<thead><tr><th>lo que nos gusta</th>${DATOS_B.rutas.map((r) => `<th>${r.sello}</th>`).join('')}</tr></thead>
    <tbody>${DATOS_B.gustos.map((g) => `<tr><td>${g.t}</td>${DATOS_B.rutas.map((r) =>
      `<td class="mono puntos" title="${r.gustos[g.id]} de 3">${puntosGusto(r.gustos[g.id])}</td>`).join('')}</tr>`).join('')}</tbody>`;
}
// Al elegir ruta, sus tours, alojamiento, barcaza y permiso pasan al presupuesto
function aplicarRutaAlPresupuesto() {
  const c = DATOS_B.ruta.costos;
  valoresB['ab-activ'] = { unitario: c.actividades, cantidad: 1 };
  valoresB['ab-aloj'] = { unitario: c.aloj, cantidad: 14 };
  valoresB['ab-barcaza'] = { unitario: c.barcaza, cantidad: 1 };
  valoresB['ab-permiso'] = { unitario: c.permiso, cantidad: 1 };
  guardado.escribir('valores-b', valoresB);
  pintarLineasB('#b-calc-au', PB.austral);
}
$('#b-rutas').addEventListener('click', (e) => {
  const b = e.target.closest('[data-elegir-ruta-b]');
  if (!b) return;
  opcionesB.ruta = b.dataset.elegirRutaB;
  DATOS_B.rutaId = opcionesB.ruta;
  guardarOpcionesB();
  aplicarRutaAlPresupuesto();
  pintarRutasB();
  pintarRutasB();
pintarRutaB();
  pintarAnioNuevoB();
  repintarTodoB();
});

// ---------- B2. La Austral larga ----------
function tarjetaTramoB(t, tipo) {
  const elegido = (tipo === 'ida' ? opcionesB.ida : opcionesB.vuelta) === t.id;
  const precio = precioTramoB(t);
  const link = tipo === 'ida' ? linkLatamB('SCL', 'BBA', '2026-12-26') : linkLatamB('BBA', 'SCL', '2027-01-09');
  const sellos = [t.sello ? `<span class="sello">${t.sello}</span>` : '', elegido ? '<span class="sello acento">elegido</span>' : ''].join('');
  return `
    <article class="tramo${t.recomendado ? ' recomendado' : ''}${elegido ? ' elegido' : ''}">
      ${sellos ? `<div class="sellos">${sellos}</div>` : ''}
      <div class="tramo-fila">
        <span class="aerolinea">${logo(t.aerolinea)}${t.aerolinea}</span>
        <p class="tramo-precio">${CLP(precio)}</p>
      </div>
      <div class="tramo-horas"><strong>${t.sale} → ${t.llega}</strong><span>${t.dur} · ${t.escalas}</span></div>
      ${tendencia(t)}
      ${t.nota ? `<p class="nota-vuelo">${t.nota}</p>` : ''}
      <div class="acciones">
        <button type="button" class="boton${elegido ? ' elegido' : ''}" data-b-elegir-${tipo}="${t.id}" aria-pressed="${elegido}">${elegido ? 'elegido ✓' : 'elegir'}</button>
        <a class="link" href="${BAU.link}" target="_blank" rel="noopener">ver en vivo ↗</a>
      </div>
      ${recotizar(t.id, link, { antes: precio })}
    </article>`;
}
function pintarAustralB() {
  $('#b-lista-idas').innerHTML = BAU.idas.map((t) => tarjetaTramoB(t, 'ida')).join('');
  $('#b-lista-vueltas').innerHTML = BAU.vueltas.map((t) => tarjetaTramoB(t, 'vuelta')).join('');
  $$('[data-b-link-austral]').forEach((el) => { el.href = BAU.link; });
  $$('[data-b-link-sky]').forEach((el) => { el.href = BAU.sky; });
  $('[data-b-nota-vuelos]').textContent = BAU.nota;
}
$('#b-lista-idas').addEventListener('click', (e) => {
  const b = e.target.closest('[data-b-elegir-ida]');
  if (!b) return;
  opcionesB.ida = b.dataset.bElegirIda;
  guardarOpcionesB(); pintarAustralB(); sincronizarSelectsB(); calcularB();
});
$('#b-lista-vueltas').addEventListener('click', (e) => {
  const b = e.target.closest('[data-b-elegir-vuelta]');
  if (!b) return;
  opcionesB.vuelta = b.dataset.bElegirVuelta;
  guardarOpcionesB(); pintarAustralB(); sincronizarSelectsB(); calcularB();
});

function pintarAutosB() {
  $('#b-lista-autos').innerHTML = BAUTO.opciones.map((a) => {
    const elegido = opcionesB.auto === a.id;
    const total = totalAutoB(a);
    const sellos = [a.sello ? `<span class="sello">${a.sello}</span>` : '', elegido ? '<span class="sello acento">elegido</span>' : ''].join('');
    return `
      <article class="vuelo auto${a.recomendado ? ' recomendado' : ''}${elegido ? ' elegido' : ''}">
        ${sellos ? `<div class="sellos">${sellos}</div>` : ''}
        <figure class="auto-foto">
          <img src="${a.foto.src}" alt="${a.modelo}" loading="lazy" decoding="async">
          <figcaption>${a.foto.credito}</figcaption>
        </figure>
        <div class="vuelo-cabeza">
          <span class="aerolinea">${a.agencia} · coordinar la entrega</span>
          <span class="etiqueta">${BAUTO.dias} días</span>
        </div>
        <div class="precio-fila"><p class="precio">${CLP(total)}</p><span class="noches" title="a la mitad">${CLP(total / 2)} c/u</span></div>
        <div class="tramo-vuelo">
          <span class="etiqueta">auto</span>
          <div><strong>${a.modelo}</strong><small>${a.tipo}</small></div>
        </div>
        <ul class="ficha">
          <li><b>${a.traccion}</b> tracción</li>
          <li><b>${a.despeje / 10} cm</b> despeje</li>
          <li><b>${a.maletero} L</b> maletero</li>
          <li><b>≈ ${CLP(bencinaB(a))}</b> bencina</li>
        </ul>
        <p class="nota-vuelo">${a.nota}</p>
        <div class="acciones">
          <button type="button" class="boton${elegido ? ' elegido' : ''}" data-b-elegir-auto="${a.id}" aria-pressed="${elegido}">${elegido ? 'elegido ✓' : 'elegir este'}</button>
          <a class="link" href="${BAUTO.link}" target="_blank" rel="noopener">reservar ↗</a>
        </div>
        ${recotizar(a.id, BAUTO.link, { antes: total })}
      </article>`;
  }).join('');
  $('[data-b-ojo-autos]').textContent = BAUTO.ojo;
}
$('#b-lista-autos').addEventListener('click', (e) => {
  const b = e.target.closest('[data-b-elegir-auto]');
  if (!b) return;
  opcionesB.auto = b.dataset.bElegirAuto;
  guardarOpcionesB(); pintarAutosB(); sincronizarSelectsB(); calcularB();
});

// La ruta: lista de días + fotos y mapa (el mismo componente del plan A)
const exploradorB = $('#b-explorador-austral');
const mediaB = crearMedia($('[data-media]', exploradorB));
function pintarRutaB() {
  const r = DATOS_B.ruta;
  $('[data-b-ruta-titulo]').textContent = r.nombre;
  $('[data-b-ruta-tramo]').textContent = TRAMO_RUTA[r.id];
  $$('[data-b-km]').forEach((el) => { el.textContent = '~' + r.km.toLocaleString('es-CL'); });
  $('[data-ruta-resumen]', exploradorB).textContent = r.resumen;
  $('[data-ruta-extra]', exploradorB).textContent = r.extra;
  $('[data-paradas]', exploradorB).innerHTML = r.paradas.map((p, i) => `
    <li class="parada">
      <button type="button" data-parada="${i}" ${p.lugar ? '' : 'disabled'}>
        <span class="dias">${p.dias}</span>
        <strong>${p.titulo}</strong>
        <p>${p.detalle}</p>
        ${p.manejo ? `<span class="manejo">${p.manejo}</span>` : ''}
      </button>
      ${fotosParada(p)}
    </li>`).join('');
  mediaB.mostrarLugar('chile-chico', false);
  mediaB.definirRuta(r.mapaRuta, 'ruta: ' + r.nombre.toLowerCase(), r.extra);
}
$('[data-paradas]', exploradorB).addEventListener('click', (e) => {
  const b = e.target.closest('[data-parada]');
  if (!b) return;
  const i = Number(b.dataset.parada);
  $$('[data-paradas] button', exploradorB).forEach((x, n) => x.setAttribute('aria-current', String(n === i)));
  mediaB.mostrarLugar(DATOS_B.ruta.paradas[i].lugar, true);
  if (esAngosto()) $('[data-media]', exploradorB).scrollIntoView({ behavior: 'smooth', block: 'start' });
});

function pintarDormirB() {
  $('#b-tabla-dormir tbody').innerHTML = DATOS_B.dormir.map((d) => `
    <tr>
      <td class="mono" data-col="noche">${d.noche}</td>
      <td data-col="dónde"><strong>${d.donde}</strong>${d.extra ? `<small>${d.extra}</small>` : ''}</td>
      <td data-col="camping">${CLP(d.camping)} p/p${d.campingNota ? `<small>${d.campingNota}</small>` : ''}</td>
      <td data-col="con techo">${d.techo.length
        ? d.techo.map((t) => `<span class="opcion">${t.n}${t.r ? ` <span class="mono">★ ${t.r}</span>` : ''} <b>${t.estimado ? '≈ ' : ''}${CLP(t.p)}</b></span>`).join('')
        : '<span class="suave">sin precio en línea</span>'}</td>
      <td data-col=""><a class="link" href="${busquedaHoteles(d.busca)}" target="_blank" rel="noopener">ver más ↗</a>
        ${recotizar('dormir-b-' + d.noche, busquedaHoteles(d.busca), { clp: false })}</td>
    </tr>`).join('');
}

// Año Nuevo en la Patagonia: el mismo formato que el de Guatemala, con botón para elegir
function pintarAnioNuevoB() {
  if (!deLaRutaB(DATOS_B.anioNuevo.find((n) => n.id === opcionesB.anioNuevo))) opcionesB.anioNuevo = DATOS_B.anioNuevo[0].id;
  $('#b-anio-nuevo').innerHTML = DATOS_B.anioNuevo.map((n) => {
    const elegido = opcionesB.anioNuevo === n.id;
    const calza = deLaRutaB(n);
    return `
      <article class="noche-vieja${elegido ? ' destacada' : ''}${calza ? '' : ' no-calza'}">
        ${galeria(n.fotos, n.titulo)}
        <div class="noche-cuerpo">
          <div class="actividad-cabeza"><span class="etiqueta">${n.donde}</span><span class="sello-mini">${n.sello}</span></div>
          <h4>${n.titulo}</h4>
          <p class="actividad-precio">${n.precio}</p>
          <p>${n.resumen}</p>
          <ol class="noche-horas">${n.noche.map(([h, q]) => `<li><span>${h}</span>${q}</li>`).join('')}</ol>
          <p class="dispo-texto">${calza ? n.calza : `Solo calza con la ruta "${DATOS_B.rutas.find((r) => r.id === n.rutas[0]).nombre}".`}</p>
          ${costoNoche(n)}
          ${detalleNoche(n)}
          <div class="noche-links">
            <button type="button" class="boton${elegido ? ' elegido' : ''}" data-b-elegir-ny="${n.id}" aria-pressed="${elegido}"${calza ? '' : ' disabled'}>${elegido ? 'elegido ✓' : 'elegir'}</button>
            ${n.links.map((l) => `<a class="link" href="${l.url}" target="_blank" rel="noopener">${l.t} ↗</a>`).join('')}
          </div>
        </div>
      </article>`;
  }).join('');
  pintarRituales('rituales-b');
}
$('#b-anio-nuevo').addEventListener('click', (e) => {
  const b = e.target.closest('[data-b-elegir-ny]');
  if (!b) return;
  opcionesB.anioNuevo = b.dataset.bElegirNy;
  guardarOpcionesB(); pintarAnioNuevoB(); calcularB();
});

// Los panoramas del plan A sirven igual; solo cambian las fechas de lo que se reserva
const FECHAS_B = {
  'exploradores-hielo': 'Viajero Austral y Huente-Có lo hacen a $150 mil: confirmar que salen el 28 o 29 dic y reservar apenas cerremos.',
  ohiggins: 'Escribir antes a Robinson Crusoe o Turismo Las Ruedas con la fecha: lun 4 ene.'
};
// Las actividades del plan A que una ruta no visita
const SIN_ACTIVIDADES = { 'sin-apuro': ['ohiggins', 'barcaza'], 'dos-paises': ['tortel', 'ohiggins', 'barcaza'] };
function pintarActividadesB() {
  const deA = DATOS.actividadesAustral.map((a) => (FECHAS_B[a.id] ? { ...a, dispo: { ...a.dispo, texto: FECHAS_B[a.id] } } : a));
  const fuera = SIN_ACTIVIDADES[DATOS_B.rutaId] || [];
  $('#b-lista-actividades').innerHTML = tarjetasActividades([...deA.filter((a) => !fuera.includes(a.id)), ...DATOS_B.actividades.filter(deLaRutaB)]);
  const b = DATOS.barcaza;
  $('[data-b-barcaza]').innerHTML = `Desde Yungay: <strong>${b.ida.join(' · ')}</strong>. Desde Río Bravo: <strong>${b.vuelta.join(' · ')}</strong>. Son los horarios de diciembre: en enero es temporada alta y suelen sumar salidas.`;
}

// ---------- B3. Presupuesto ----------
function llenarSelectsB() {
  $('#b-calc-playa').innerHTML = BP.opciones.map((o) => `<option value="${o.id}">${o.nombre} · ${o.vuelo.aerolinea} ${CLP(conRecotizado(o.vuelo.id, o.vuelo.precio))}</option>`).join('');
  $('#b-calc-ida').innerHTML = BAU.idas.map((v) => `<option value="${v.id}">${v.aerolinea} ${v.sale} · ${CLP(precioTramoB(v))}</option>`).join('');
  $('#b-calc-vuelta').innerHTML = BAU.vueltas.map((v) => `<option value="${v.id}">${v.aerolinea} ${v.sale} · ${CLP(precioTramoB(v))}</option>`).join('');
  $('#b-calc-auto').innerHTML = BAUTO.opciones.map((a) => `<option value="${a.id}">${a.modelo.replace(' o similar', '')} · ${CLP(totalAutoB(a))}</option>`).join('');
  sincronizarSelectsB();
}
function sincronizarSelectsB() {
  const o = playaElegida();
  $('#b-calc-hotel').innerHTML = o.hoteles.map((h, i) => `<option value="${i}">${h.n} · ${CLP(h.p)} la noche</option>`).join('');
  $('#b-calc-playa').value = o.id;
  $('#b-calc-hotel').value = String(indiceHotel(o));
  $('#b-calc-noches').value = String(opcionesB.noches);
  $('#b-calc-ida').value = opcionesB.ida;
  $('#b-calc-vuelta').value = opcionesB.vuelta;
  $('#b-calc-auto').value = opcionesB.auto;
}

function pintarLineasB(contenedor, lineas) {
  $(contenedor).innerHTML = lineas.map((l) => `
    <div class="linea" data-id-b="${l.id}">
      <div class="nombre-linea">${l.nombre}<small>${l.tipo === 'mitad' ? 'a la mitad' : 'cada uno'}</small></div>
      <span class="subtotal" data-subtotal></span>
      <input type="number" inputmode="numeric" min="0" step="1000" data-campo="unitario" aria-label="${l.nombre}: monto" value="${valoresB[l.id].unitario}">
      <div class="x">
        <input type="number" inputmode="numeric" min="0" step="1" data-campo="cantidad" aria-label="${l.nombre}: cantidad" value="${valoresB[l.id].cantidad}">
        <span class="unidad">${l.unidad === 'total' ? 'x' : l.unidad}</span>
      </div>
    </div>`).join('');
}

// La playa y el hotel mandan en los días de comida (con todo incluido, la comida va en cero)
function aplicarPlayaAlPresupuesto() {
  const o = playaElegida();
  valoresB['pb-comida'] = { unitario: hotelDe(o).todoIncluido ? 0 : o.comida, cantidad: Number(opcionesB.noches) };
  guardado.escribir('valores-b', valoresB);
  pintarLineasB('#b-calc-playa-lineas', PB.playa);
}

let totalB = 0;
function calcularB() {
  const o = playaElegida();
  const h = hotelDe(o);
  const c = costoPlaya(o, h);
  const a = autoB();
  const auto = totalAutoB(a) / 2;
  const bencina = bencinaB(a) / 2;
  const ida = precioTramoB(idaB());
  const vuelta = precioTramoB(vueltaB());

  // Gastos editables, por persona
  const porPersona = (lineas) => lineas.reduce((suma, l) => {
    const total = (Number(valoresB[l.id].unitario) || 0) * (Number(valoresB[l.id].cantidad) || 0);
    const parte = l.tipo === 'mitad' ? total / 2 : total;
    const fila = $(`.linea[data-id-b="${l.id}"] [data-subtotal]`);
    if (fila) fila.textContent = `${CLP(parte)} c/u`;
    return suma + parte;
  }, 0);

  const pasajes = c.vuelo + c.mano.monto + ida + vuelta;
  const enPlaya = c.hotel + c.traslado + porPersona(PB.playa);
  const enAustral = auto + bencina + porPersona(PB.austral);
  const persona = pasajes + enPlaya + enAustral;
  totalB = persona;

  // Lo que sale de lo elegido (no se edita acá)
  const fila = (t, v, nota) => `<div><dt>${t}</dt><dd>${CLP(v)}<small>${nota}</small></dd></div>`;
  $('#b-fijos-playa').innerHTML =
    fila(`vuelo ${o.vuelo.aerolinea}${c.mano.monto ? ' + maleta' : ''}`, c.vuelo + c.mano.monto, 'cada uno') +
    fila(`${h.n} · ${opcionesB.noches} noches`, c.hotel, 'la mitad') +
    fila('traslados', c.traslado, 'cada uno');
  $('#b-fijos-au').innerHTML =
    fila(`pasajes ${idaB().sale} y ${vueltaB().sale}`, ida + vuelta, 'cada uno') +
    fila(`${a.modelo.replace(' o similar', '')} · ${BAUTO.dias} días`, auto, 'la mitad') +
    fila(`bencina ~${BAUTO.km.toLocaleString('es-CL')} km`, bencina, 'la mitad');

  $('#b-res-persona').textContent = CLP(persona);
  $('#b-res-total').textContent = CLP(persona * 2);
  $('#b-res-marca').style.left = Math.min(100, (persona / 4000000) * 100) + '%';
  $('#b-res-marca-a').style.left = Math.min(100, (totalPersona / 4000000) * 100) + '%';

  // Contra la misma idea del plan A (entre $2,6 y $3,1 M c/u) y contra el plan A
  let estado;
  let veredicto;
  const idea = `entre ${millones(P.tope.min)} y ${millones(P.tope.max)} c/u`;
  if (persona < P.tope.min) { estado = 'ok'; veredicto = `<strong>Holgado.</strong> Queda bajo la idea (${idea}).`; }
  else if (persona <= P.tope.max) { estado = 'ok'; veredicto = `<strong>Bien.</strong> Dentro de la idea: ${idea}.`; }
  else if (persona <= P.tope.max + 300000) { estado = 'justo'; veredicto = `<strong>Un poco arriba</strong> de la idea (${idea}), por ${CLP(persona - P.tope.max)}.`; }
  else { estado = 'pasado'; veredicto = `<strong>Arriba de la idea</strong> (${idea}) por ${CLP(persona - P.tope.max)}.`; }
  if (totalPersona) veredicto += ` Comparado con el plan A (raya gris): ${CLP(Math.abs(totalPersona - persona))} ${persona < totalPersona ? 'menos' : 'más'}.`;
  $('#b-res-veredicto').innerHTML = veredicto;
  $('#b-res-desglose').innerHTML = `
    <div><dt>pasajes</dt><dd>${CLP(pasajes)}</dd></div>
    <div><dt>en la playa</dt><dd>${CLP(enPlaya)}</dd></div>
    <div><dt>en la austral</dt><dd>${CLP(enAustral)}</dd></div>
    <div><dt>plan A</dt><dd>${totalPersona ? CLP(totalPersona) : '…'}</dd></div>`;

  $('#b-monto-transfer').textContent = CLP(pasajes);
  pintarTuViajeB(persona, estado);
  pintarTableroB();
  pintarReservasB();
  pintarComparar();
  $('#b-resumen-playa').textContent = `lun 14 → ${diaSemana(diaVueltaPlaya())} ${diaVueltaPlaya()} dic · ${nombreCorto(o)}`;
  // La presentación (/agencia/propuesta) lee este resumen
  guardado.escribir('resumen-b', {
    persona, pasajes, playa: enPlaya, austral: enAustral, playaId: o.id, hotel: h.n, noches: Number(opcionesB.noches),
    auto: a.id, ida: opcionesB.ida, vuelta: opcionesB.vuelta, anioNuevo: opcionesB.anioNuevo, ruta: opcionesB.ruta, visto: new Date().toISOString()
  });
}

function conectarCalculadoraB() {
  llenarSelectsB();
  pintarLineasB('#b-calc-playa-lineas', PB.playa);
  pintarLineasB('#b-calc-au', PB.austral);
  const cambio = (fn) => (e) => { fn(e.target.value); guardarOpcionesB(); repintarTodoB(); };
  $('#b-calc-playa').addEventListener('change', cambio((v) => { opcionesB.playa = v; aplicarPlayaAlPresupuesto(); }));
  $('#b-calc-hotel').addEventListener('change', cambio((v) => { opcionesB.hoteles[opcionesB.playa] = Number(v); aplicarPlayaAlPresupuesto(); }));
  $('#b-calc-noches').addEventListener('change', cambio((v) => { opcionesB.noches = Number(v); aplicarPlayaAlPresupuesto(); }));
  $('#b-calc-ida').addEventListener('change', cambio((v) => { opcionesB.ida = v; }));
  $('#b-calc-vuelta').addEventListener('change', cambio((v) => { opcionesB.vuelta = v; }));
  $('#b-calc-auto').addEventListener('change', cambio((v) => { opcionesB.auto = v; }));

  $('.calc-b').addEventListener('input', (e) => {
    const f = e.target.closest('.linea');
    if (!f) return;
    valoresB[f.dataset.idB][e.target.dataset.campo] = Number(e.target.value) || 0;
    guardado.escribir('valores-b', valoresB);
    calcularB();
  });
  $('#b-calc-reset').addEventListener('click', () => {
    guardado.borrar('valores-b');
    guardado.borrar('opciones-b');
    valoresB = valoresInicialesB();
    opcionesB = Object.assign({}, OPCIONES_B, { hoteles: {} });
    pintarLineasB('#b-calc-playa-lineas', PB.playa);
    pintarLineasB('#b-calc-au', PB.austral);
    repintarTodoB();
  });
}

// ---------- Barra "tu viaje" y tablero del hero ----------
function pintarTuViajeB(persona, estado) {
  if (document.documentElement.dataset.plan !== 'b') return;
  const o = playaElegida();
  const sep = '<span class="sep">·</span>';
  $('#tv-items').innerHTML = [
    `<b>${o.vuelo.aerolinea}</b> ${nombreCorto(o)} 14 → ${diaVueltaPlaya()} dic`,
    `<b>${idaB().aerolinea}</b> sur 26 dic → 9 ene`,
    `<b>${hotelDe(o).n}</b>`
  ].join(sep);
  $('#tv-total').textContent = millones(persona);
  $('#tv-punto').className = 'tv-punto ' + estado;
}
function pintarTableroB() {
  const o = playaElegida();
  const comprado = !!guardado.leer('compra-b', {}).foto;
  $('#t-b-codigo').textContent = o.vuelo.codigo;
  $('#t-b-playa').textContent = nombreCorto(o);
  [$('#t-b-estado-playa'), $('#t-b-estado-au')].forEach((el) => {
    el.textContent = comprado ? 'confirmado' : 'por comprar';
    el.classList.toggle('confirmado', comprado);
  });
  $('#tablero-pie-b').innerHTML = `playa: <b>${hotelDe(o).n} · ${opcionesB.noches} noches</b> · sur: <b>26 dic → 9 ene · ${autoB().modelo.replace(' o similar', '')}</b>`;
}

// ---------- B4. Papeles ----------
function pintarPapelesB() {
  $('#b-papeles').innerHTML = DATOS_B.papeles.map(([t, p]) => `<div class="papel"><span class="etiqueta">${t}</span><p>${p}</p></div>`).join('');
}

// ---------- B5. Junta: checklist y reservas ----------
function pintarReservasB() {
  const o = playaElegida();
  const h = hotelDe(o);
  const c = costoPlaya(o, h);
  const ida = idaB();
  const vuelta = vueltaB();
  const a = autoB();
  const ny = DATOS_B.anioNuevo.find((n) => n.id === opcionesB.anioNuevo);
  const elegidos = [
    { id: o.vuelo.id, antes: c.vuelo, que: `Vuelo a ${nombreCorto(o)} · ${o.vuelo.aerolinea}`, detalle: `lun 14 → ${diaSemana(diaVueltaPlaya())} ${diaVueltaPlaya()} dic · ${o.vuelo.ida}${c.mano.monto ? ' · sumar la maleta de mano' : ''}`, precio: CLP(c.vuelo) + ' c/u', link: linkVueloPlaya(o) },
    { id: 'hotel-' + o.id, clp: false, que: `${h.n} · ${opcionesB.noches} noches`, detalle: `${h.tipo} · con cancelación gratis si se puede`, precio: CLP(h.p) + ' la noche', link: linkHotel(h), boton: 'buscar' },
    { id: ida.id, antes: precioTramoB(ida), que: `Ida a Balmaceda · ${ida.aerolinea}`, detalle: `${ida.dia} · ${ida.sale} → ${ida.llega} · bodega gratis con la WorldMember`, precio: CLP(precioTramoB(ida)) + ' c/u', link: linkLatamB('SCL', 'BBA', '2026-12-26') },
    { id: vuelta.id, antes: precioTramoB(vuelta), que: `Vuelta de Balmaceda · ${vuelta.aerolinea}`, detalle: `${vuelta.dia} · ${vuelta.sale} → ${vuelta.llega}`, precio: CLP(precioTramoB(vuelta)) + ' c/u', link: linkLatamB('BBA', 'SCL', '2027-01-09') },
    { id: a.id, antes: totalAutoB(a), que: `Auto en Balmaceda · ${a.modelo}`, detalle: `${a.agencia} · ${BAUTO.dias} días · cancelación gratis`, precio: CLP(totalAutoB(a)) + ' los dos', link: BAUTO.link }
  ];
  const sueltas = DATOS_B.reservas.filter(deLaRutaB).map((r) => {
    const x = recotizadoDe(r.id);
    const detalle = r.id === 'rb-anio-nuevo' && ny ? `Elegido: ${ny.titulo.toLowerCase()}. ${r.detalle}` : r.detalle;
    return { ...r, detalle, clp: false, precio: x ? x.texto : r.precio };
  });
  $('#b-reservas').innerHTML = [...elegidos, ...sueltas].map((r) => `
    <li class="reserva">
      <div class="reserva-texto"><strong>${r.que}</strong><small>${r.detalle}</small></div>
      <span class="reserva-precio">${r.precio}</span>
      ${r.link ? `<a class="boton claro" href="${r.link}" target="_blank" rel="noopener">${r.boton || 'reservar'} ↗</a>` : ''}
      ${recotizar(r.id, r.link, { clp: r.clp !== false, antes: r.antes, conTexto: false })}
    </li>`).join('');
}

function conectarChecklistB() {
  const marcados = guardado.leer('compra-b', {});
  const checks = $$('[data-check-b]');
  const progreso = () => {
    $('#b-progreso-compra').style.width = (checks.filter((c) => c.checked).length / checks.length) * 100 + '%';
  };
  checks.forEach((c) => {
    c.checked = !!marcados[c.dataset.checkB];
    c.addEventListener('change', () => {
      marcados[c.dataset.checkB] = c.checked;
      guardado.escribir('compra-b', marcados);
      progreso();
      pintarTableroB();
    });
  });
  progreso();
}

// ---------- Precios al día y recotizados ----------
// prep.js avisa cuando llegan los precios de precios.json (los vuelos del plan B tienen su id ahí)
document.addEventListener('precios-vivos', (e) => {
  const pv = e.detail;
  [...BP.opciones.map((o) => o.vuelo), ...BAU.idas, ...BAU.vueltas].forEach((v) => {
    const x = pv.vuelos && pv.vuelos[v.id];
    if (!x || !x.precio) return;
    v.precio = x.precio;
    v.vivo = x;
    if (x.dur) v.dur = x.dur;
  });
  repintarTodoB();
});
document.addEventListener('repintar-precios', () => repintarTodoB());

function repintarTodoB() {
  pintarPlayas();
  pintarRutasB();
  pintarCuandoComprar();
  pintarBlackFriday();
  pintarAustralB();
  pintarAutosB();
  pintarDormirB();
  pintarActividadesB();
  llenarSelectsB();
  calcularB();
}

// ---------- Inicio ----------
pintarPlayas();
pintarCuandoComprar();
pintarBlackFriday();
pintarAustralB();
pintarAutosB();
pintarRutaB();
pintarDormirB();
pintarAnioNuevoB();
pintarActividadesB();
pintarPapelesB();
conectarCalculadoraB();
conectarChecklistB();
calcularB();
mostrarPlan(document.documentElement.dataset.plan === 'b' ? 'b' : 'a');
