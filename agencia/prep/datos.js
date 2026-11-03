// Datos de la web prep · Agencia de Viajes SiempreLab
// Todo lo que cambia (precios, horarios, montos) vive aquí.
// Para actualizar precios el sábado, se edita solo este archivo.

const DATOS = {
  // Fotos que rotan en el hero
  hero: [
    { lugar: 'capillas-marmol', foto: 0 },
    { lugar: 'acatenango', foto: 0 },
    { lugar: 'villa-ohiggins', foto: 0 },
    { lugar: 'caye-caulker', foto: 0 },
    { lugar: 'carretera-austral', foto: 0 },
    { lugar: 'atitlan', foto: 1 }
  ],

  // Si cambia la estructura de los datos, se sube este número y se borra lo guardado en el navegador
  version: 2,

  // Fecha de despegue para la cuenta regresiva (primero la Austral: dom 13 dic, hora de Chile)
  despegue: '2026-12-13T14:30:00-03:00',

  // Dónde comprar cada aerolínea
  compra: {
    Copa: 'https://www.copaair.com/es-cl/',
    Avianca: 'https://www.avianca.com/es/',
    LATAM: 'https://www.latamairlines.com/cl/es'
  },

  // Fecha en que se vieron los precios
  precioVisto: '3 nov',

  // Tipo de cambio implícito en la tarifa de Copa del 30 oct (646.490 CLP = USD 652)
  usd: 992,

  // ---------- Vuelos Centroamérica (ida y vuelta, por persona, CLP) ----------
  // sin: sin equipaje · mano: con mochila de mano · bodega: con maleta facturada
  // estimado: true marca precios que no salieron directo de la búsqueda
  vuelosCA: [
    {
      id: 'copa-26',
      noches: 14,
      recomendado: true,
      aerolinea: 'Copa',
      destino: 'GUA',
      ida: { dia: 'noche vie 25', detalle: 'sáb 26 · 01:07 → 08:45', escalas: '1 escala en Panamá' },
      vuelta: { dia: 'sáb 9 ene', detalle: '10:43 → 00:28 (llega el 10)', escalas: '1 escala en Panamá' },
      sin: 766492,
      mano: 766492,
      bodega: { monto: 875492, estimado: true },
      nota: 'Salimos después de la cena de Navidad y llegamos a desayunar a Guatemala. Mochila de mano incluida.',
      link: 'https://www.google.com/travel/flights?q=Flights%20from%20SCL%20to%20GUA%20on%202026-12-26%20through%202027-01-09&curr=CLP&hl=es&gl=CL'
    },
    {
      id: 'copa-26-llega9',
      noches: 14,
      aerolinea: 'Copa',
      destino: 'GUA',
      ida: { dia: 'noche vie 25', detalle: 'sáb 26 · 01:07 → 08:45', escalas: '1 escala en Panamá' },
      vuelta: { dia: 'sáb 9 ene', detalle: '10:43 → 23:40', escalas: '1 escala en Panamá' },
      sin: 813210,
      mano: 813210,
      bodega: { monto: 922210, estimado: true },
      nota: 'Misma ida, pero llegamos el 9 antes de medianoche: un día entero de colchón antes del internado.',
      link: 'https://www.google.com/travel/flights?q=Flights%20from%20SCL%20to%20GUA%20on%202026-12-26%20through%202027-01-09&curr=CLP&hl=es&gl=CL'
    },
    {
      id: 'copa-27',
      noches: 13,
      aerolinea: 'Copa',
      destino: 'GUA',
      ida: { dia: 'noche sáb 26', detalle: 'dom 27 · 01:31 → 08:45', escalas: '1 escala en Panamá' },
      vuelta: { dia: 'sáb 9 ene', detalle: 'a elegir', escalas: '1 escala en Panamá' },
      sin: 820883,
      mano: 820883,
      bodega: { monto: 929883, estimado: true },
      nota: 'Navidad sin apuro: salimos la noche del 26. Precio "desde": confirmar con la vuelta.',
      link: 'https://www.google.com/travel/flights?q=Flights%20from%20SCL%20to%20GUA%20on%202026-12-27%20through%202027-01-09&curr=CLP&hl=es&gl=CL'
    },
    {
      id: 'avianca-27',
      noches: 12,
      aerolinea: 'Avianca',
      destino: 'GUA',
      ida: { dia: 'dom 27', detalle: '16:15 → 00:55 (+1)', escalas: '1 escala en Bogotá' },
      vuelta: { dia: 'sáb 9 ene', detalle: 'a elegir', escalas: '1 escala' },
      sin: 843955,
      mano: { monto: 904000, estimado: true },
      bodega: null,
      nota: 'En estas fechas sale más cara que Copa y no incluye mochila de mano.',
      link: 'https://www.google.com/travel/flights?q=Flights%20from%20SCL%20to%20GUA%20on%202026-12-27%20through%202027-01-09&curr=CLP&hl=es&gl=CL'
    }
  ],

  // Vuelo interno Guatemala ↔ Flores (Tikal), precio por tramo
  vueloFlores: {
    precio: 88362,
    detalle: 'Avianca · 07:40, 19:55 o 23:10 · 45 min. TAG: 98.524 (07:20, 14:20).',
    link: 'https://www.google.com/travel/flights?q=One%20way%20flights%20from%20FRS%20to%20GUA%20on%202027-01-08&curr=CLP&hl=es&gl=CL'
  },

  // ---------- Comparación con otros destinos ----------
  comparacion: [
    { destino: 'Guatemala', codigo: 'GUA', precio: 766492, nota: 'Copa, 1 escala. Fin de año sube ~80 mil.' },
    { destino: 'Panamá (San Blas)', codigo: 'PTY', precio: 642588, nota: 'Copa directo, 7 h.' },
    { destino: 'Cancún (Yucatán)', codigo: 'CUN', precio: 1057972, nota: 'Copa, 1 escala. En fin de año se dispara.' },
    { destino: 'Salir desde Belice', codigo: 'BZE', precio: 1566272, nota: 'Solo ida, vía EE.UU. con ESTA. No conviene.', malo: true }
  ],

  // ---------- Rutas de 14 días (26 dic a 9 ene) ----------
  // lugar: id en lugares.js (fotos + mapa) · mapaRuta: paradas para el mapa de la ruta completa
  rutas: [
    {
      id: 'guatemala',
      nombre: 'Solo Guatemala',
      resumen: 'Volcanes, lago, selva y Tikal. Cero fronteras y un solo vuelo interno.',
      mapaRuta: ['Antigua Guatemala', 'Volcán de Acatenango', 'Lago de Atitlán', 'Semuc Champey', 'Flores, Petén', 'Parque Nacional Tikal'],
      paradas: [
        { dias: 'D1 a D2 · sáb 26 y dom 27', lugar: 'antigua', titulo: 'Antigua', detalle: 'Llegamos 08:45 y shuttle a Antigua (1 h). Cerro de la Cruz, mercados y rooftops con el Volcán de Agua.' },
        { dias: 'D3 a D4 · lun 28 y mar 29', lugar: 'acatenango', titulo: 'Acatenango', detalle: 'Trekking con noche frente al Volcán de Fuego en erupción.' },
        { dias: 'D5 a D6 · mié 30 y jue 31', lugar: 'antigua', titulo: 'Año Nuevo en Antigua', detalle: 'Piernas de descanso y fuegos artificiales en la plaza con los volcanes de fondo.' },
        { dias: 'D7 a D9 · 1 al 3 ene', lugar: 'atitlan', titulo: 'Lago Atitlán', detalle: 'San Pedro, San Marcos, kayak entre pueblos.' },
        { dias: 'D10 a D11 · 4 y 5 ene', lugar: 'semuc-champey', titulo: 'Semuc Champey', detalle: 'Shuttle largo a Lanquín. Pozas turquesa, mirador y cueva con velas.' },
        { dias: 'D12 · mié 6', lugar: 'flores', titulo: 'Lanquín → Flores', detalle: 'Shuttle por tierra (7 a 8 h) a la islita del Petén Itzá.' },
        { dias: 'D13 · jue 7', lugar: 'tikal', titulo: 'Tikal', detalle: 'Amanecer en el Templo IV con monos aulladores.' },
        { dias: 'D14 · vie 8', lugar: 'flores', titulo: 'Flores → Guatemala', detalle: 'Mañana en la isla y vuelo a la capital (45 min).' },
        { dias: 'D15 · sáb 9', lugar: null, titulo: 'Vuelta', detalle: 'Copa 10:43 y a Santiago, a tiempo para el internado.' }
      ],
      extra: 'Un vuelo interno (Flores → Guatemala, ~88 mil). Fin de año es temporada alta: reservar Acatenango y hostales en Antigua apenas compremos.',
      internos: 1
    },
    {
      id: 'belice',
      nombre: 'Guatemala + Belice',
      resumen: 'Ahora sí cabe todo: volcán, lago, Tikal y el Caribe.',
      mapaRuta: ['Antigua Guatemala', 'Volcán de Acatenango', 'Lago de Atitlán', 'Flores, Petén', 'Parque Nacional Tikal', 'Caye Caulker, Belize'],
      paradas: [
        { dias: 'D1 a D2 · sáb 26 y dom 27', lugar: 'antigua', titulo: 'Antigua', detalle: 'Llegada, ciudad colonial y Cerro de la Cruz.' },
        { dias: 'D3 a D4 · lun 28 y mar 29', lugar: 'acatenango', titulo: 'Acatenango', detalle: 'Trekking con noche frente al Volcán de Fuego.' },
        { dias: 'D5 a D7 · 30 dic al 1 ene', lugar: 'atitlan', titulo: 'Año Nuevo en Atitlán', detalle: 'Pueblos mayas, kayak y el año nuevo frente al lago.' },
        { dias: 'D8 · sáb 2', lugar: 'flores', titulo: 'Vuelo a Flores', detalle: 'Volver a la capital y volar a Flores (45 min).' },
        { dias: 'D9 · dom 3', lugar: 'tikal', titulo: 'Tikal', detalle: 'Ruinas al amanecer.' },
        { dias: 'D10 · lun 4', lugar: 'caye-caulker', titulo: 'Rumbo a Caye Caulker', detalle: 'Shuttle a Belice + lancha (5 a 6 h). Vibe "go slow".' },
        { dias: 'D11 a D12 · 5 y 6 ene', lugar: 'caye-caulker', titulo: 'Caye Caulker', detalle: 'Snorkel en el arrecife: tiburones nodriza y mantarrayas.' },
        { dias: 'D13 · jue 7', lugar: 'flores', titulo: 'Vuelta a Flores', detalle: 'Lancha + shuttle de vuelta a la isla.' },
        { dias: 'D14 · vie 8', lugar: 'flores', titulo: 'Flores → Guatemala', detalle: 'Vuelo a la capital (07:40 o 19:55).' },
        { dias: 'D15 · sáb 9', lugar: null, titulo: 'Vuelta', detalle: 'Copa 10:43 y a Santiago.' }
      ],
      extra: 'Dos vuelos internos (~88 mil c/u). Salida de Belice por tierra: BZ$40 (≈ USD 20) en efectivo. Caye Caulker en Año Nuevo se llena: reservar luego.',
      internos: 2
    }
  ],

  // ---------- Austral 2.0: de Cerro Castillo hacia el sur ----------
  // En 2025 hicimos Puerto Montt → Cerro Castillo. Esta vez, todo lo que viene después.
  // Va primero: del dom 13 (después del matrimonio) al mié 23 dic (antes de Navidad).
  rutaAustral: {
    nombre: 'Austral 2.0',
    resumen: 'De donde quedamos en 2025 hasta el fin del camino, en 10 días. Base para recortar en el kraft.',
    hecho2025: 'Puerto Montt → Cerro Castillo',
    mapaRuta: ['Aeropuerto Balmaceda', 'Villa Cerro Castillo', 'Puerto Río Tranquilo', 'Puerto Bertrand', 'Cochrane', 'Caleta Tortel', "Villa O'Higgins"],
    paradas: [
      { dias: 'D1 · dom 13 dic', lugar: 'cerro-castillo', titulo: 'Balmaceda → Cerro Castillo', detalle: 'Llegamos 16:49, auto en el aeropuerto y 1,5 h al sur. Retomamos donde quedamos.' },
      { dias: 'D2 · lun 14', lugar: 'general-carrera', titulo: 'Rumbo a Río Tranquilo', detalle: 'Primer tramo nuevo, bordeando el General Carrera.' },
      { dias: 'D3 · mar 15', lugar: 'capillas-marmol', titulo: 'Capillas de Mármol', detalle: 'Lancha o kayak temprano, cuando el lago está quieto.' },
      { dias: 'D4 · mié 16', lugar: 'exploradores', titulo: 'Glaciar Exploradores', detalle: 'Trekking sobre el hielo con guía.' },
      { dias: 'D5 · jue 17', lugar: 'confluencia-baker', titulo: 'Puerto Bertrand y el Baker', detalle: 'La confluencia Baker y Neff, y a dormir al Valle Chacabuco.' },
      { dias: 'D6 · vie 18', lugar: 'parque-patagonia', titulo: 'Parque Patagonia', detalle: 'Senderos con guanacos y bajada a Cochrane.' },
      { dias: 'D7 · sáb 19', lugar: 'tortel', titulo: 'Caleta Tortel', detalle: 'Pasarelas de ciprés sobre el agua.' },
      { dias: 'D8 a D9 · 20 y 21', lugar: 'villa-ohiggins', titulo: "Villa O'Higgins", detalle: "Barcaza Yungay → Río Bravo y el fin de la Carretera. Glaciar O'Higgins si hay cupo." },
      { dias: 'D10 · mar 22', lugar: 'carretera-austral', titulo: 'De vuelta al norte', detalle: 'Día largo de ripio hasta Puerto Guadal, con la barcaza de vuelta.' },
      { dias: 'D11 · mié 23', lugar: null, titulo: 'Vuelta', detalle: 'Guadal → Balmaceda (5 h), devolver el auto y vuelo 15:00. Navidad en Santiago.' }
    ],
    extra: "Es apretado: si en el kraft se recorta Villa O'Higgins, se ganan dos días para Tortel y el General Carrera. Barcaza Yungay ↔ Río Bravo: confirmar horarios con el operador. Bencineras escasas al sur de Cochrane: llenar siempre."
  },

  // ---------- Austral 2.0 (ida y vuelta por persona) ----------
  vuelosAustral: [
    { id: 'latam-1430', aerolinea: 'LATAM', ida: 'dom 13 dic · 14:30 → 16:49', escalas: 'Directo', vuelta: 'mié 23 · 15:00 → 18:41, 1 escala', precio: 362049, recomendado: true, sello: 'después de almuerzo' },
    { id: 'latam-1257', aerolinea: 'LATAM', ida: 'dom 13 dic · 12:57 → 15:15', escalas: 'Directo', vuelta: 'mié 23 · 15:00 → 18:41, 1 escala', precio: 345049, sello: 'más barato' },
    { id: 'latam-1430-dir', aerolinea: 'LATAM', ida: 'dom 13 dic · 14:30 → 16:49', escalas: 'Directo', vuelta: 'mié 23 · 15:25 → 17:45, directo', precio: 420049 }
  ],
  linkAustral: 'https://www.google.com/travel/flights?q=Flights%20from%20SCL%20to%20BBA%20on%202026-12-13%20through%202026-12-23&curr=CLP&hl=es&gl=CL',

  // ---------- Calculadora ----------
  // tipo 'cada' = cada uno paga eso · tipo 'mitad' = es un total que se divide a la mitad
  presupuesto: {
    tope: { min: 1500000, max: 2500000 },
    centroamerica: [
      { id: 'ca-aloj', nombre: 'Alojamiento (pieza doble, temporada alta)', unitario: 42000, cantidad: 14, unidad: 'noches', tipo: 'mitad' },
      { id: 'ca-comida', nombre: 'Comida', unitario: 15000, cantidad: 15, unidad: 'días', tipo: 'cada' },
      { id: 'ca-transp', nombre: 'Transporte interno (shuttles, lanchas)', unitario: 150000, cantidad: 1, unidad: 'total', tipo: 'cada' },
      { id: 'ca-activ', nombre: 'Actividades (Tikal, Acatenango, Semuc o snorkel)', unitario: 140000, cantidad: 1, unidad: 'total', tipo: 'cada' },
      { id: 'ca-extras', nombre: 'Extras e imprevistos (Año Nuevo incluido)', unitario: 80000, cantidad: 1, unidad: 'total', tipo: 'cada' }
    ],
    austral: [
      { id: 'au-auto', nombre: 'Arriendo de auto (diciembre ~USD 74)', unitario: 73000, cantidad: 10, unidad: 'días', tipo: 'mitad' },
      { id: 'au-bencina', nombre: 'Bencina', unitario: 230000, cantidad: 1, unidad: 'total', tipo: 'mitad' },
      { id: 'au-aloj', nombre: 'Alojamiento (camping u hostal)', unitario: 35000, cantidad: 10, unidad: 'noches', tipo: 'mitad' },
      { id: 'au-comida', nombre: 'Comida', unitario: 15000, cantidad: 11, unidad: 'días', tipo: 'cada' },
      { id: 'au-barcazas', nombre: 'Barcazas y entradas', unitario: 60000, cantidad: 1, unidad: 'total', tipo: 'mitad' }
    ],
    seguro: 39700 // ~USD 40 por persona, si la tarjeta no lo cubre
  }
};
