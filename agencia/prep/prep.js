// Web prep · Agencia de Viajes SiempreLab
// Pinta vuelos, rutas, comparación y Austral desde datos.js,
// y maneja la calculadora de presupuesto y el checklist de compra.

// ---------- Utilidades ----------
const CLP = (n) => '$' + Math.round(n).toLocaleString('es-CL');
const millones = (n) => '$' + (n / 1000000).toLocaleString('es-CL', { minimumFractionDigits: 1, maximumFractionDigits: 2 }) + ' M';

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

// Estado compartido entre la sección de vuelos y la calculadora
let equipaje = guardado.leer('equipaje', 'mano');

// ---------- Textos sueltos ----------
document.querySelectorAll('[data-precio-visto]').forEach((el) => { el.textContent = DATOS.precioVisto; });
document.querySelectorAll('[data-vuelo-flores]').forEach((el) => { el.textContent = CLP(DATOS.vueloFlores.precio); });
document.querySelectorAll('[data-vuelo-flores-detalle]').forEach((el) => { el.textContent = DATOS.vueloFlores.detalle; });
document.querySelectorAll('[data-link-austral]').forEach((el) => { el.href = DATOS.linkAustral; });

// ---------- 1. Vuelos Centroamérica ----------
function pintarVuelos() {
  const cont = document.getElementById('lista-vuelos');
  cont.innerHTML = DATOS.vuelosCA.map((v) => {
    const p = leerPrecio(v[equipaje]);
    const precio = p
      ? `<p class="precio">${p.estimado ? '<span class="aprox">≈</span>' : ''}${CLP(p.monto)}</p>`
      : `<p class="precio no-disponible">consultar en la aerolínea</p>`;
    return `
      <article class="vuelo${v.recomendado ? ' recomendado' : ''}">
        ${v.recomendado ? '<span class="sello">recomendado</span>' : ''}
        <div class="vuelo-cabeza">
          <span class="aerolinea">${v.aerolinea} · SCL ↔ ${v.destino}</span>
          <span class="etiqueta">por persona</span>
        </div>
        ${precio}
        <div class="tramo-vuelo">
          <span class="etiqueta">ida</span>
          <div><strong>${v.ida.dia}</strong>${v.ida.detalle}<br><small>${v.ida.escalas}</small></div>
        </div>
        <div class="tramo-vuelo">
          <span class="etiqueta">vuelta</span>
          <div><strong>${v.vuelta.dia}</strong>${v.vuelta.detalle}${v.vuelta.escalas ? `<br><small>${v.vuelta.escalas}</small>` : ''}</div>
        </div>
        <p class="nota-vuelo">${v.nota}</p>
        <a class="link" href="${v.link}" target="_blank" rel="noopener">recotizar en vivo →</a>
      </article>`;
  }).join('');
}

function marcarSelector() {
  document.querySelectorAll('.selector button').forEach((b) => {
    b.setAttribute('aria-pressed', String(b.dataset.equipaje === equipaje));
  });
  const sel = document.getElementById('calc-equipaje');
  if (sel) sel.value = equipaje;
}

function cambiarEquipaje(valor) {
  equipaje = valor;
  guardado.escribir('equipaje', equipaje);
  marcarSelector();
  pintarVuelos();
  calcular();
}

document.querySelectorAll('.selector button').forEach((b) => {
  b.addEventListener('click', () => cambiarEquipaje(b.dataset.equipaje));
});

// ---------- 2. Rutas ----------
function pintarRutas() {
  document.getElementById('lista-rutas').innerHTML = DATOS.rutas.map((r) => `
    <article class="ruta">
      <h3>${r.nombre}</h3>
      <p class="resumen-ruta">${r.resumen}</p>
      <ol class="paradas">
        ${r.paradas.map((p) => `
          <li class="parada">
            <span class="dias">${p.dias}</span>
            <strong>${p.lugar}</strong>
            <p>${p.detalle}</p>
          </li>`).join('')}
      </ol>
      <p class="extra">${r.extra}</p>
    </article>
  `).join('');
}

// ---------- 3. Comparación ----------
function pintarComparacion() {
  const max = Math.max(...DATOS.comparacion.map((c) => c.precio));
  document.getElementById('lista-comparar').innerHTML = DATOS.comparacion.map((c, i) => `
    <div class="barra-fila${c.malo ? ' malo' : ''}${i === 0 ? ' elegido' : ''}">
      <div class="nombre">${c.destino}<small>${c.nota}</small></div>
      <div class="barra-pista">
        <div class="barra-relleno" style="width:${Math.max(18, (c.precio / max) * 100)}%">${CLP(c.precio)}</div>
      </div>
    </div>
  `).join('');
}

// ---------- 4. Austral ----------
function pintarAustral() {
  document.getElementById('lista-austral').innerHTML = DATOS.vuelosAustral.map((v) => `
    <article class="vuelo${v.recomendado ? ' recomendado' : ''}">
      ${v.recomendado ? '<span class="sello">más barato</span>' : ''}
      <div class="vuelo-cabeza">
        <span class="aerolinea">${v.aerolinea} · SCL ↔ BBA</span>
        <span class="etiqueta">por persona</span>
      </div>
      <p class="precio">${CLP(v.precio)}</p>
      <div class="tramo-vuelo">
        <span class="etiqueta">ida</span>
        <div><strong>${v.ida}</strong><small>${v.escalas} · vuelta 10 ene</small></div>
      </div>
    </article>
  `).join('');
}

// ---------- 5. Calculadora ----------
const P = DATOS.presupuesto;

// Valores editables: se parte de datos.js y se pisan con lo guardado
function valoresIniciales() {
  const v = {};
  [...P.centroamerica, ...P.austral].forEach((l) => { v[l.id] = { unitario: l.unitario, cantidad: l.cantidad }; });
  return v;
}
let valores = Object.assign(valoresIniciales(), guardado.leer('valores', {}));
let opciones = Object.assign(
  { vueloCA: DATOS.vuelosCA.find((v) => v.recomendado).id, vueloAU: DATOS.vuelosAustral[0].id, flores: false, seguro: false },
  guardado.leer('opciones', {})
);

function llenarSelects() {
  const selCA = document.getElementById('calc-vuelo-ca');
  selCA.innerHTML = DATOS.vuelosCA.map((v) =>
    `<option value="${v.id}">${v.aerolinea} · ${v.ida.dia} → ${v.vuelta.dia}</option>`).join('');
  selCA.value = opciones.vueloCA;

  const selAU = document.getElementById('calc-vuelo-au');
  selAU.innerHTML = DATOS.vuelosAustral.map((v) =>
    `<option value="${v.id}">${v.aerolinea} · ${v.ida.split(' · ')[1]} · ${CLP(v.precio)}</option>`).join('');
  selAU.value = opciones.vueloAU;

  document.getElementById('calc-flores').checked = opciones.flores;
  document.getElementById('calc-seguro').checked = opciones.seguro;
}

function pintarLineas(contenedorId, lineas) {
  document.getElementById(contenedorId).innerHTML = lineas.map((l) => `
    <div class="linea" data-id="${l.id}">
      <div class="nombre-linea">${l.nombre}<small>${l.tipo === 'mitad' ? 'a la mitad' : 'cada uno'}</small></div>
      <span class="subtotal" data-subtotal></span>
      <input type="number" inputmode="numeric" min="0" step="1000" data-campo="unitario" aria-label="${l.nombre}: monto" value="${valores[l.id].unitario}">
      <div>
        <span class="unidad">${l.unidad === 'total' ? 'veces' : l.unidad}</span>
        <input type="number" inputmode="numeric" min="0" step="1" data-campo="cantidad" aria-label="${l.nombre}: cantidad" value="${valores[l.id].cantidad}">
      </div>
    </div>
  `).join('');
}

// Precio del vuelo de Centroamérica según el equipaje elegido.
// Si esa combinación no tiene precio (ej. Avianca con bodega), usa el de mano.
function precioVueloCA() {
  const v = DATOS.vuelosCA.find((x) => x.id === opciones.vueloCA);
  const p = leerPrecio(v[equipaje]) || leerPrecio(v.mano) || leerPrecio(v.sin);
  return p.monto;
}

function calcular() {
  if (!document.getElementById('res-persona')) return;

  // Pasajes de una persona
  const vueloCA = precioVueloCA();
  const flores = opciones.flores ? DATOS.vueloFlores.precio : 0;
  const vueloAU = DATOS.vuelosAustral.find((x) => x.id === opciones.vueloAU).precio;
  const seguro = opciones.seguro ? P.seguro : 0;
  const pasajes = vueloCA + flores + vueloAU;

  // Gastos en destino, por persona
  const porPersona = (lineas) => lineas.reduce((suma, l) => {
    const total = (Number(valores[l.id].unitario) || 0) * (Number(valores[l.id].cantidad) || 0);
    const parte = l.tipo === 'mitad' ? total / 2 : total;
    // Subtotal visible en cada línea
    const fila = document.querySelector(`.linea[data-id="${l.id}"] [data-subtotal]`);
    if (fila) fila.textContent = `${CLP(parte)} c/u`;
    return suma + parte;
  }, 0);

  const enCA = porPersona(P.centroamerica);
  const enAU = porPersona(P.austral);
  const persona = pasajes + seguro + enCA + enAU;

  document.getElementById('res-persona').textContent = CLP(persona);
  document.getElementById('res-total').textContent = CLP(persona * 2);

  // Medidor de 0 a 3,5 M
  const pct = Math.min(100, (persona / 3500000) * 100);
  document.getElementById('res-marca').style.left = pct + '%';

  // Veredicto contra el tope
  let veredicto;
  if (persona <= P.tope.min) veredicto = '<strong>Holgado.</strong> Queda margen para darse un gusto.';
  else if (persona <= 2000000) veredicto = '<strong>Bien.</strong> Dentro del tope con espacio.';
  else if (persona <= P.tope.max) veredicto = '<strong>Justo.</strong> Dentro del tope, pero sin mucho margen.';
  else veredicto = `<strong>Nos pasamos por ${CLP(persona - P.tope.max)}.</strong> Lo primero que se puede bajar: días de auto, camping en vez de hostal.`;
  document.getElementById('res-veredicto').innerHTML = veredicto;

  document.getElementById('res-desglose').innerHTML = `
    <div><dt>pasajes</dt><dd>${CLP(pasajes)}</dd></div>
    <div><dt>en centroamérica</dt><dd>${CLP(enCA)}</dd></div>
    <div><dt>en la austral</dt><dd>${CLP(enAU)}</dd></div>
    ${seguro ? `<div><dt>seguro</dt><dd>${CLP(seguro)}</dd></div>` : ''}
  `;

  // Monto que la Jo transfiere después de comprar con una sola tarjeta
  const transfer = document.getElementById('monto-transfer');
  if (transfer) transfer.textContent = CLP(pasajes);
}

function conectarCalculadora() {
  llenarSelects();
  pintarLineas('calc-ca', P.centroamerica);
  pintarLineas('calc-au', P.austral);

  document.getElementById('calc-vuelo-ca').addEventListener('change', (e) => {
    opciones.vueloCA = e.target.value; guardado.escribir('opciones', opciones); calcular();
  });
  document.getElementById('calc-vuelo-au').addEventListener('change', (e) => {
    opciones.vueloAU = e.target.value; guardado.escribir('opciones', opciones); calcular();
  });
  document.getElementById('calc-equipaje').addEventListener('change', (e) => cambiarEquipaje(e.target.value));
  document.getElementById('calc-flores').addEventListener('change', (e) => {
    opciones.flores = e.target.checked; guardado.escribir('opciones', opciones); calcular();
  });
  document.getElementById('calc-seguro').addEventListener('change', (e) => {
    opciones.seguro = e.target.checked; guardado.escribir('opciones', opciones); calcular();
  });

  // Cualquier cambio en las líneas recalcula
  document.querySelector('.calc').addEventListener('input', (e) => {
    const fila = e.target.closest('.linea');
    if (!fila) return;
    valores[fila.dataset.id][e.target.dataset.campo] = Number(e.target.value) || 0;
    guardado.escribir('valores', valores);
    calcular();
  });

  document.getElementById('calc-reset').addEventListener('click', () => {
    guardado.borrar('valores');
    guardado.borrar('opciones');
    valores = valoresIniciales();
    opciones = { vueloCA: DATOS.vuelosCA.find((v) => v.recomendado).id, vueloAU: DATOS.vuelosAustral[0].id, flores: false, seguro: false };
    llenarSelects();
    pintarLineas('calc-ca', P.centroamerica);
    pintarLineas('calc-au', P.austral);
    calcular();
  });
}

// ---------- 7. Checklist de compra ----------
function conectarChecklist() {
  const marcados = guardado.leer('compra', {});
  document.querySelectorAll('[data-check]').forEach((c) => {
    c.checked = !!marcados[c.dataset.check];
    c.addEventListener('change', () => {
      marcados[c.dataset.check] = c.checked;
      guardado.escribir('compra', marcados);
    });
  });
}

// ---------- Navegación: marca la sección visible ----------
function conectarNav() {
  const links = [...document.querySelectorAll('.nav a')];
  if (!('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => a.classList.toggle('activo', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('.seccion').forEach((s) => obs.observe(s));
}

// ---------- Inicio ----------
pintarVuelos();
pintarRutas();
pintarComparacion();
pintarAustral();
conectarCalculadora();
conectarChecklist();
conectarNav();
marcarSelector();
calcular();
