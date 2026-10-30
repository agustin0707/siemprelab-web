// Datos de la web prep · Agencia de Viajes SiempreLab
// Todo lo que cambia (precios, horarios, montos) vive aquí.
// Para actualizar precios el sábado, se edita solo este archivo.

const DATOS = {
  // Fotos que rotan en el hero
  hero: [
    { lugar: 'acatenango', foto: 0 },
    { lugar: 'caye-caulker', foto: 0 },
    { lugar: 'atitlan', foto: 1 },
    { lugar: 'capillas-marmol', foto: 0 },
    { lugar: 'villa-ohiggins', foto: 0 },
    { lugar: 'carretera-austral', foto: 0 }
  ],

  // Fecha de despegue para la cuenta regresiva (noche del 13, hora de Chile)
  despegue: '2026-12-14T03:48:00-03:00',

  // Dónde comprar cada aerolínea
  compra: {
    Copa: 'https://www.copaair.com/es-cl/',
    Avianca: 'https://www.avianca.com/es/',
    LATAM: 'https://www.latamairlines.com/cl/es'
  },

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
      noches: 8,
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
      noches: 9,
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
      noches: 8,
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
      noches: 7,
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
      noches: 8,
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

  // Vuelo interno Guatemala ↔ Flores (Tikal), precio por tramo
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
  // lugar: id en lugares.js (fotos + mapa) · mapaRuta: paradas para el mapa de la ruta completa
  rutas: [
    {
      id: 'guatemala',
      nombre: 'Solo Guatemala',
      resumen: 'Volcanes, lago y Tikal. Cero fronteras.',
      mapaRuta: ['Antigua Guatemala', 'Volcán de Acatenango', 'Lago de Atitlán', 'Flores, Petén', 'Parque Nacional Tikal'],
      paradas: [
        { dias: 'D1 · lun 14', lugar: 'antigua', titulo: 'Antigua', detalle: 'Llegamos 11:51 y shuttle a Antigua (1 h). Primera noche colonial.' },
        { dias: 'D2 · mar 15', lugar: 'antigua', titulo: 'Antigua', detalle: 'Cerro de la Cruz, mercados, rooftops con el Volcán de Agua.' },
        { dias: 'D3 a D4 · mié 16 y jue 17', lugar: 'acatenango', titulo: 'Acatenango', detalle: 'Trekking con noche frente al Volcán de Fuego en erupción.' },
        { dias: 'D5 a D6 · vie 18 y sáb 19', lugar: 'atitlan', titulo: 'Lago Atitlán', detalle: 'San Pedro, San Marcos, kayak entre pueblos.' },
        { dias: 'D7 · dom 20', lugar: 'flores', titulo: 'Vuelo a Flores', detalle: 'Volver a Ciudad de Guatemala y volar a Flores (45 min).' },
        { dias: 'D8 · lun 21', lugar: 'tikal', titulo: 'Tikal', detalle: 'Amanecer en el Templo IV con monos aulladores.' },
        { dias: 'D9 · mar 22', lugar: 'flores', titulo: 'Flores → Guatemala', detalle: 'Mañana en la isla y vuelo a la capital. Con vuelta el 23, día extra acá.' },
        { dias: 'D10 · mié 23', lugar: null, titulo: 'Vuelta', detalle: 'Copa 10:38, llegamos a Santiago 23:35. Si volvemos el 22, se corre todo un día.' }
      ],
      extra: 'Dos vuelos internos (Guatemala → Flores y vuelta): ~89 mil cada tramo.',
      internos: 2
    },
    {
      id: 'belice',
      nombre: 'Guatemala + Belice',
      resumen: 'Lo mismo, cambiando el volcán por el Caribe.',
      mapaRuta: ['Antigua Guatemala', 'Lago de Atitlán', 'Flores, Petén', 'Parque Nacional Tikal', 'Caye Caulker, Belize'],
      paradas: [
        { dias: 'D1 a D2 · lun 14 y mar 15', lugar: 'antigua', titulo: 'Antigua', detalle: 'Llegada, ciudad colonial y Cerro de la Cruz.' },
        { dias: 'D3 a D4 · mié 16 y jue 17', lugar: 'atitlan', titulo: 'Lago Atitlán', detalle: 'Pueblos mayas y kayak.' },
        { dias: 'D5 · vie 18', lugar: 'flores', titulo: 'Vuelo a Flores', detalle: 'Guatemala → Flores, 45 min.' },
        { dias: 'D6 · sáb 19', lugar: 'tikal', titulo: 'Tikal', detalle: 'Ruinas al amanecer.' },
        { dias: 'D7 · dom 20', lugar: 'caye-caulker', titulo: 'Caye Caulker', detalle: 'Shuttle a Belice + lancha (5 a 6 h). Vibe "go slow".' },
        { dias: 'D8 · lun 21', lugar: 'caye-caulker', titulo: 'Caye Caulker', detalle: 'Snorkel en el arrecife: tiburones nodriza y mantarrayas.' },
        { dias: 'D9 · mar 22', lugar: 'flores', titulo: 'Vuelta a Flores', detalle: 'Lancha + shuttle y vuelo Flores → Guatemala 19:55.' },
        { dias: 'D10 · mié 23', lugar: null, titulo: 'Vuelta', detalle: 'Copa 10:38, llegamos a Santiago 23:35.' }
      ],
      extra: 'No entra el Acatenango. Dos vuelos internos (~89 mil c/u). Salida de Belice por tierra: BZ$40 (≈ USD 20) en efectivo.',
      internos: 2
    }
  ],

  // ---------- Austral 2.0: de Cerro Castillo hacia el sur ----------
  // En 2025 hicimos Puerto Montt → Cerro Castillo. Esta vez, todo lo que viene después.
  rutaAustral: {
    nombre: 'Austral 2.0',
    resumen: 'De donde quedamos en 2025 hasta el fin del camino. Base para recortar en el kraft.',
    hecho2025: 'Puerto Montt → Cerro Castillo',
    mapaRuta: ['Aeropuerto Balmaceda', 'Villa Cerro Castillo', 'Puerto Río Tranquilo', 'Puerto Bertrand', 'Cochrane', 'Caleta Tortel', "Villa O'Higgins"],
    paradas: [
      { dias: 'D1 · sáb 26 dic', lugar: 'cerro-castillo', titulo: 'Balmaceda → Cerro Castillo', detalle: 'Auto en el aeropuerto y 1,5 h al sur. Retomamos donde quedamos.' },
      { dias: 'D2 · dom 27', lugar: 'general-carrera', titulo: 'Rumbo a Río Tranquilo', detalle: 'Primer tramo nuevo, bordeando el General Carrera.' },
      { dias: 'D3 · lun 28', lugar: 'capillas-marmol', titulo: 'Capillas de Mármol', detalle: 'Lancha o kayak temprano, cuando el lago está quieto.' },
      { dias: 'D4 · mar 29', lugar: 'exploradores', titulo: 'Glaciar Exploradores', detalle: 'Trekking sobre el hielo con guía.' },
      { dias: 'D5 · mié 30', lugar: 'confluencia-baker', titulo: 'Puerto Bertrand y el Baker', detalle: 'La confluencia Baker y Neff, el agua más turquesa del viaje.' },
      { dias: 'D6 a D7 · 31 dic y 1 ene', lugar: 'parque-patagonia', titulo: 'Parque Patagonia', detalle: 'Año Nuevo en el Valle Chacabuco, con guanacos de testigos.' },
      { dias: 'D8 a D9 · 2 y 3 ene', lugar: 'tortel', titulo: 'Caleta Tortel', detalle: 'Pasarelas, ciprés y la Isla de los Muertos.' },
      { dias: 'D10 a D11 · 4 y 5 ene', lugar: 'villa-ohiggins', titulo: "Villa O'Higgins", detalle: "Barcaza Yungay → Río Bravo y el fin de la Carretera. Glaciar O'Higgins si hay cupo." },
      { dias: 'D12 a D14 · 6 al 8 ene', lugar: 'carretera-austral', titulo: 'De vuelta al norte', detalle: 'Cochrane, Puerto Guadal y la orilla sur del General Carrera, sin apuro.' },
      { dias: 'D15 · 9 ene', lugar: null, titulo: 'Coyhaique', detalle: 'Último día cerca del aeropuerto.' },
      { dias: 'D16 · 10 ene', lugar: null, titulo: 'Vuelta', detalle: 'Devolver el auto y vuelo a Santiago.' }
    ],
    extra: "Barcaza Puerto Yungay ↔ Río Bravo para llegar a O'Higgins: confirmar horarios y reserva con el operador. Bencineras escasas al sur de Cochrane: llenar siempre."
  },

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
      { id: 'au-aloj', nombre: 'Alojamiento (camping u hostal)', unitario: 35000, cantidad: 15, unidad: 'noches', tipo: 'mitad' },
      { id: 'au-comida', nombre: 'Comida', unitario: 15000, cantidad: 15, unidad: 'días', tipo: 'cada' },
      { id: 'au-barcazas', nombre: 'Barcazas y entradas', unitario: 60000, cantidad: 1, unidad: 'total', tipo: 'mitad' }
    ],
    seguro: 39700 // ~USD 40 por persona, si la tarjeta no lo cubre
  }
};
