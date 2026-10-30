// Plan del día · Agencia de Viajes SiempreLab
// Muestra el itinerario del sábado como tramos de un vuelo
// y destaca el tramo en curso según la hora de Chile.

// ---------- Datos del itinerario ----------
// inicio y fin en formato 'HH:MM' (hora de Santiago, sábado 31 oct)
const TRAMOS = [
  {
    codigo: 'SL 3110-0',
    hora: 'mañana',
    inicio: '00:00',
    fin: '13:00',
    titulo: 'Pre-embarque libre',
    detalle: 'Gym y desayuno tranquilos. Calentamiento opcional, ya sabemos dónde nos conocimos.'
  },
  {
    codigo: 'SL 3110-1',
    hora: '13:00',
    inicio: '13:00',
    fin: '14:00',
    titulo: 'Embarque y cocina a bordo',
    detalle: 'La tripulación somos tú y yo. Hoy se cocina.'
  },
  {
    codigo: 'SL 3110-2',
    hora: '14:00',
    inicio: '14:00',
    fin: '15:00',
    titulo: 'Servicio a bordo',
    detalle: 'Almuerzo. Se aceptan combinaciones raras.'
  },
  {
    codigo: 'SL 3110-3',
    hora: '15:00',
    inicio: '15:00',
    fin: '17:30',
    titulo: 'Sesión con tu agente de viajes',
    detalle: 'Café incluido. Trae ganas de soñar en grande.'
  },
  {
    codigo: 'SL 3110-4',
    hora: '17:30',
    inicio: '17:30',
    fin: '19:00',
    titulo: 'Siesta reglamentaria',
    detalle: 'Obligatoria según la normativa de la aerolínea.'
  },
  {
    codigo: 'SL 3110-5',
    hora: '19:00',
    inicio: '19:00',
    fin: '21:00',
    titulo: 'Cambio de identidad',
    detalle: 'Disfraces. Nadie sale de la cabina sin el suyo.'
  },
  {
    codigo: 'SL 3110-6',
    hora: 'noche',
    inicio: '21:00',
    fin: '23:59',
    titulo: 'Destino final: Halloween',
    detalle: 'Carrete con amigxs. Aterrizaje sin hora fija.'
  }
];

// Fecha del vuelo
const FECHA_VUELO = '2026-10-31';

// ---------- Utilidades de hora (siempre en hora de Santiago) ----------
function ahoraEnSantiago() {
  const partes = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Santiago',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
  }).formatToParts(new Date());
  const get = (tipo) => partes.find((p) => p.type === tipo).value;
  return {
    fecha: `${get('year')}-${get('month')}-${get('day')}`,
    minutos: Number(get('hour')) * 60 + Number(get('minute'))
  };
}

function aMinutos(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

// ---------- Pintar el itinerario ----------
function pintarTramos() {
  const lista = document.getElementById('tramos');
  lista.innerHTML = TRAMOS.map((t) => `
    <li class="tramo aparece">
      <span class="hora">${t.hora}</span>
      <div>
        <span class="codigo-tramo">${t.codigo}</span>
        <h2>${t.titulo}</h2>
        <p class="detalle">${t.detalle}</p>
      </div>
    </li>
  `).join('');
}

// ---------- Estado del vuelo según la hora ----------
function actualizarEstado() {
  const { fecha, minutos } = ahoraEnSantiago();
  const estado = document.getElementById('estado');
  const items = document.querySelectorAll('.tramo');

  items.forEach((li) => li.classList.remove('pasado', 'ahora'));
  estado.classList.remove('en-curso');

  if (fecha < FECHA_VUELO) {
    estado.textContent = 'confirmado';
    return;
  }
  if (fecha > FECHA_VUELO) {
    estado.textContent = 'aterrizado';
    items.forEach((li) => li.classList.add('pasado'));
    return;
  }

  // Es el día del vuelo
  TRAMOS.forEach((t, i) => {
    if (minutos >= aMinutos(t.fin)) items[i].classList.add('pasado');
    else if (minutos >= aMinutos(t.inicio)) items[i].classList.add('ahora');
  });

  if (minutos < aMinutos('13:00')) {
    estado.textContent = 'embarque 13:00';
  } else {
    estado.textContent = 'en vuelo';
    estado.classList.add('en-curso');
  }
}

// ---------- Entrada con blurFadeUp escalonado ----------
function animarEntrada() {
  document.querySelectorAll('.aparece').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 120 + i * 90);
  });
}

pintarTramos();
actualizarEstado();
animarEntrada();
setInterval(actualizarEstado, 60 * 1000);
