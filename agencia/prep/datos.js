// Datos de la web prep · Agencia de Viajes SiempreLab
// Todo lo que cambia (precios, horarios, montos) vive aquí.
// Para actualizar precios el sábado, se edita solo este archivo.

const DATOS = {
  // Fecha en que se vieron los precios
  precioVisto: '30 oct',

  // Tipo de cambio implícito en la tarifa de Copa (646.490 CLP = USD 652)
  usd: 992,

  // ---------- Vuelos Centroamérica (ida y vuelta, por persona, CLP) ----------
  // sin: sin equipaje · mano: con mochila de mano · bodega: con maleta facturada
  // estimado: true marca precios que no salieron directo de la búsqueda
  vuelosCA: [
    {
      id: 'copa-22',
      recomendado: true,
      aerolinea: 'Copa',
      destino: 'GUA',
      ida: { dia: 'noche dom 13', detalle: 'lun 14 · 03:48 → 11:51', escalas: '1 escala en Panamá' },
      vuelta: { dia: 'mar 22', detalle: '10:38 → 23:35', escalas: '1 escala en Panamá' },
      sin: 646490,
      mano: 646490,
      bodega: { monto: 755490, estimado: true },
      nota: 'Mochila de mano incluida. Google lo marca como precio bajo.',
      link: 'https://www.google.com/travel/flights?q=Flights%20from%20SCL%20to%20GUA%20on%202026-12-14%20through%202026-12-22&curr=CLP&hl=es&gl=CL'
    },
    {
      id: 'copa-23',
      aerolinea: 'Copa',
      destino: 'GUA',
      ida: { dia: 'noche dom 13', detalle: 'lun 14 · 03:48 → 11:51', escalas: '1 escala en Panamá' },
      vuelta: { dia: 'mié 23', detalle: '10:38 → 23:35', escalas: '1 escala en Panamá' },
      sin: 646490,
      mano: 646490,
      bodega: { monto: 755490, estimado: true },
      nota: 'Un día más de viaje y llega el 23 en la noche. Precio de la tabla de fechas: confirmar.',
      link: 'https://www.google.com/travel/flights?q=Flights%20from%20SCL%20to%20GUA%20on%202026-12-14%20through%202026-12-23&curr=CLP&hl=es&gl=CL'
    },
    {
      id: 'avianca-13',
      aerolinea: 'Avianca',
      destino: 'GUA',
      ida: { dia: 'dom 13', detalle: '16:15 → 00:55 (+1)', escalas: '1 escala en Bogotá' },
      vuelta: { dia: 'mar 22', detalle: '09:20 → 01:05 (llega el 23)', escalas: '1 escala' },
      sin: 561596,
      mano: { monto: 622164, estimado: true },
      bodega: null,
      nota: 'La más barata sin equipaje. Con mochila de mano sube unos 60 mil.',
      link: 'https://www.google.com/travel/flights?q=Flights%20from%20SCL%20to%20GUA%20on%202026-12-13%20through%202026-12-22&curr=CLP&hl=es&gl=CL'
    },
    {
      id: 'avianca-14',
      aerolinea: 'Avianca',
      destino: 'GUA',
      ida: { dia: 'lun 14', detalle: '16:15 → 00:55 (+1)', escalas: '1 escala en Bogotá' },
      vuelta: { dia: 'mar 22', detalle: '09:20 → 01:05 (llega el 23)', escalas: '1 escala' },
      sin: 594362,
      mano: 654930,
      bodega: null,
      nota: 'Pierde casi un día entero de viaje.',
      link: 'https://www.google.com/travel/flights?q=Flights%20from%20SCL%20to%20GUA%20on%202026-12-14%20through%202026-12-22&curr=CLP&hl=es&gl=CL'
    },
    {
      id: 'copa-0131',
      aerolinea: 'Copa',
      destino: 'GUA',
      ida: { dia: 'noche dom 13', detalle: 'lun 14 · 01:31 → 09:40', escalas: '1 escala en Panamá' },
      vuelta: { dia: 'mar 22', detalle: 'a elegir', escalas: '' },
      sin: 686207,
      mano: 686207,
      bodega: { monto: 795207, estimado: true },
      nota: 'Llega más temprano a Guatemala, pero cuesta 40 mil más.',
      link: 'https://www.google.com/travel/flights?q=Flights%20from%20SCL%20to%20GUA%20on%202026-12-14%20through%202026-12-22&curr=CLP&hl=es&gl=CL'
    }
  ],

  // Vuelo interno para volver desde Flores (Tikal) a Ciudad de Guatemala
  vueloFlores: {
    precio: 89363,
    detalle: 'Avianca · 07:40, 19:55 o 23:10 · 45 min. TAG: 99.640 (07:20, 18:05).',
    link: 'https://www.google.com/travel/flights?q=One%20way%20flights%20from%20FRS%20to%20GUA%20on%202026-12-21&curr=CLP&hl=es&gl=CL'
  },

  // ---------- Comparación con otros destinos ----------
  comparacion: [
    { destino: 'Guatemala', codigo: 'GUA', precio: 646490, nota: 'Copa, 1 escala. Precio bajo.' },
    { destino: 'Panamá (San Blas)', codigo: 'PTY', precio: 649866, nota: 'Copa directo, 7 h.' },
    { destino: 'Cancún (Yucatán)', codigo: 'CUN', precio: 827699, nota: 'LATAM, 1 escala. Precio alto.' },
    { destino: 'Salir desde Belice', codigo: 'BZE', precio: 1566272, nota: 'Solo ida, vía EE.UU. con ESTA. No conviene.', malo: true }
  ],

  // ---------- Rutas de 10 días ----------
  rutas: [
    {
      id: 'guatemala',
      nombre: 'Solo Guatemala',
      resumen: 'Volcanes, lago y Tikal. Cero fronteras.',
      paradas: [
        { dias: 'D1 · 14 dic', lugar: 'Antigua', detalle: 'Llegamos 11:51 y shuttle a Antigua (1 h). Primera noche colonial.' },
        { dias: 'D2', lugar: 'Antigua', detalle: 'Cerro de la Cruz, mercados, rooftops con el Volcán de Agua.' },
        { dias: 'D3 a D4', lugar: 'Acatenango', detalle: 'Trekking con noche frente al Volcán de Fuego en erupción.' },
        { dias: 'D5 a D6', lugar: 'Lago Atitlán', detalle: 'San Pedro, San Marcos, kayak entre pueblos.' },
        { dias: 'D7', lugar: 'Vuelo a Flores', detalle: 'Volver a Ciudad de Guatemala y volar a Flores.' },
        { dias: 'D8', lugar: 'Tikal', detalle: 'Amanecer en el Templo IV con monos aulladores.' },
        { dias: 'D9', lugar: 'Flores → Guatemala', detalle: 'Mañana libre en la isla y vuelo de vuelta a la capital.' },
        { dias: 'D10 · 22 o 23 dic', lugar: 'Vuelta', detalle: 'Copa 10:38, llegamos a Santiago 23:35.' }
      ],
      extra: 'Vuelos internos Guatemala ↔ Flores: ~89 mil cada tramo.'
    },
    {
      id: 'belice',
      nombre: 'Guatemala + Belice',
      resumen: 'Lo mismo, cambiando el volcán por el Caribe.',
      paradas: [
        { dias: 'D1 a D2', lugar: 'Antigua', detalle: 'Llegada, ciudad colonial y Cerro de la Cruz.' },
        { dias: 'D3 a D4', lugar: 'Lago Atitlán', detalle: 'Pueblos mayas y kayak.' },
        { dias: 'D5', lugar: 'Vuelo a Flores', detalle: 'Guatemala → Flores, 45 min.' },
        { dias: 'D6', lugar: 'Tikal', detalle: 'Ruinas al amanecer.' },
        { dias: 'D7', lugar: 'Caye Caulker', detalle: 'Shuttle a Belice + lancha (5 a 6 h). Vibe "go slow".' },
        { dias: 'D8', lugar: 'Caye Caulker', detalle: 'Snorkel en el arrecife: tiburones nodriza y mantarrayas.' },
        { dias: 'D9', lugar: 'Vuelta a Flores', detalle: 'Lancha + shuttle y vuelo Flores → Guatemala 19:55.' },
        { dias: 'D10 · 22 o 23 dic', lugar: 'Vuelta', detalle: 'Copa 10:38, llegamos a Santiago 23:35.' }
      ],
      extra: 'No entra el Acatenango. Salida de Belice por tierra: BZ$40 (≈ USD 20) en efectivo.'
    }
  ],

  // ---------- Austral 2.0 (ida y vuelta por persona) ----------
  vuelosAustral: [
    { id: 'latam-0529', aerolinea: 'LATAM', ida: '26 dic · 05:29 → 09:17', escalas: '1 escala', precio: 220171, recomendado: true },
    { id: 'latam-1432', aerolinea: 'LATAM', ida: '26 dic · 14:32 → 16:50', escalas: 'Directo', precio: 279171 },
    { id: 'latam-0741', aerolinea: 'LATAM', ida: '26 dic · 07:41 → 10:00', escalas: 'Directo', precio: 318171 }
  ],
  linkAustral: 'https://www.google.com/travel/flights?q=Flights%20from%20SCL%20to%20BBA%20on%202026-12-26%20through%202027-01-10&curr=CLP&hl=es&gl=CL',

  // ---------- Calculadora ----------
  // tipo 'cada' = cada uno paga eso · tipo 'mitad' = es un total que se divide a la mitad
  presupuesto: {
    tope: { min: 1500000, max: 2500000 },
    centroamerica: [
      { id: 'ca-aloj', nombre: 'Alojamiento (pieza doble)', unitario: 35000, cantidad: 9, unidad: 'noches', tipo: 'mitad' },
      { id: 'ca-comida', nombre: 'Comida', unitario: 15000, cantidad: 10, unidad: 'días', tipo: 'cada' },
      { id: 'ca-transp', nombre: 'Transporte interno (shuttles, lanchas)', unitario: 120000, cantidad: 1, unidad: 'total', tipo: 'cada' },
      { id: 'ca-activ', nombre: 'Actividades (Tikal, Acatenango, snorkel)', unitario: 110000, cantidad: 1, unidad: 'total', tipo: 'cada' },
      { id: 'ca-extras', nombre: 'Extras e imprevistos', unitario: 60000, cantidad: 1, unidad: 'total', tipo: 'cada' }
    ],
    austral: [
      { id: 'au-auto', nombre: 'Arriendo de auto', unitario: 84000, cantidad: 15, unidad: 'días', tipo: 'mitad' },
      { id: 'au-bencina', nombre: 'Bencina', unitario: 230000, cantidad: 1, unidad: 'total', tipo: 'mitad' },
      { id: 'au-aloj', nombre: 'Alojamiento (camping u hostal)', unitario: 35000, cantidad: 14, unidad: 'noches', tipo: 'mitad' },
      { id: 'au-comida', nombre: 'Comida', unitario: 15000, cantidad: 15, unidad: 'días', tipo: 'cada' },
      { id: 'au-barcazas', nombre: 'Barcazas y entradas', unitario: 60000, cantidad: 1, unidad: 'total', tipo: 'mitad' }
    ],
    seguro: 39700 // ~USD 40 por persona, si la tarjeta no lo cubre
  }
};
