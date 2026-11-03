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
  version: 3,

  // Fecha de despegue para la cuenta regresiva (primero la Austral: dom 13 dic, hora de Chile)
  despegue: '2026-12-13T14:30:00-03:00',

  // La junta: cada uno presenta su propuesta (Agus la Austral, la Jo Guatemala) y compramos todo
  junta: '2026-11-07T15:00:00-03:00',

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

  // ---------- Rutas de 14 días (26 dic a 9 ene) ----------
  // lugar: id en lugares.js (fotos + mapa) · mapaRuta: paradas para el mapa de la ruta completa
  // etapas: lugar del armador + noches (suman 14), para cargarla en "arma tu ruta"
  rutas: [
    {
      id: 'guatemala',
      nombre: 'Clásica + Semuc',
      resumen: 'Volcanes, lago, selva y Tikal. Cero fronteras y un solo vuelo interno.',
      mapaRuta: ['Antigua Guatemala', 'Volcán de Acatenango', 'Lago de Atitlán', 'Semuc Champey', 'Flores, Petén', 'Parque Nacional Tikal'],
      etapas: [['antigua', 2], ['acatenango', 1], ['antigua', 3], ['atitlan', 3], ['semuc-champey', 2], ['flores', 2], ['ciudad', 1]],
      paradas: [
        { dias: 'D1 a D2 · sáb 26 y dom 27', lugar: 'antigua', titulo: 'Antigua', detalle: 'Llegamos 08:45 y shuttle a Antigua (1 h). Cerro de la Cruz, mercados y rooftops con el Volcán de Agua.' },
        { dias: 'D3 a D4 · lun 28 y mar 29', lugar: 'acatenango', titulo: 'Acatenango', detalle: 'Trekking con noche frente al Volcán de Fuego en erupción. Bajamos el 29 a Antigua.' },
        { dias: 'D5 a D6 · mié 30 y jue 31', lugar: 'antigua', titulo: 'Año Nuevo en Antigua', detalle: 'Piernas de descanso y fuegos artificiales en la plaza con los volcanes de fondo.' },
        { dias: 'D7 a D9 · 1 al 3 ene', lugar: 'atitlan', titulo: 'Lago Atitlán', detalle: 'San Pedro, San Marcos, kayak entre pueblos.' },
        { dias: 'D10 a D11 · 4 y 5 ene', lugar: 'semuc-champey', titulo: 'Semuc Champey', detalle: 'Shuttle largo a Lanquín. Pozas turquesa, mirador y cueva con velas.' },
        { dias: 'D12 a D13 · 6 y 7 ene', lugar: 'tikal', titulo: 'Flores y Tikal', detalle: 'Shuttle por tierra a Flores (7 a 8 h) y amanecer en el Templo IV con monos aulladores.' },
        { dias: 'D14 · vie 8', lugar: 'flores', titulo: 'Flores → Guatemala', detalle: 'Mañana en la isla y vuelo a la capital (45 min). Noche cerca del aeropuerto.' },
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
      etapas: [['antigua', 2], ['acatenango', 1], ['antigua', 1], ['atitlan', 3], ['flores', 2], ['caye-caulker', 3], ['flores', 1], ['ciudad', 1]],
      paradas: [
        { dias: 'D1 a D2 · sáb 26 y dom 27', lugar: 'antigua', titulo: 'Antigua', detalle: 'Llegada, ciudad colonial y Cerro de la Cruz.' },
        { dias: 'D3 a D4 · lun 28 y mar 29', lugar: 'acatenango', titulo: 'Acatenango', detalle: 'Trekking con noche frente al Volcán de Fuego.' },
        { dias: 'D5 a D7 · 30 dic al 1 ene', lugar: 'atitlan', titulo: 'Año Nuevo en Atitlán', detalle: 'Pueblos mayas, kayak y el año nuevo frente al lago.' },
        { dias: 'D8 · sáb 2', lugar: 'flores', titulo: 'Vuelo a Flores', detalle: 'Volver a la capital y volar a Flores (45 min).' },
        { dias: 'D9 · dom 3', lugar: 'tikal', titulo: 'Tikal', detalle: 'Ruinas al amanecer.' },
        { dias: 'D10 · lun 4', lugar: 'caye-caulker', titulo: 'Rumbo a Caye Caulker', detalle: 'Shuttle a Belice + lancha (6 a 7 h). Vibe "go slow".' },
        { dias: 'D11 a D12 · 5 y 6 ene', lugar: 'caye-caulker', titulo: 'Caye Caulker', detalle: 'Snorkel en el arrecife: tiburones nodriza y mantarrayas.' },
        { dias: 'D13 · jue 7', lugar: 'flores', titulo: 'Vuelta a Flores', detalle: 'Lancha + shuttle de vuelta a la isla.' },
        { dias: 'D14 · vie 8', lugar: 'flores', titulo: 'Flores → Guatemala', detalle: 'Vuelo a la capital (07:40 o 19:55).' },
        { dias: 'D15 · sáb 9', lugar: null, titulo: 'Vuelta', detalle: 'Copa 10:43 y a Santiago.' }
      ],
      extra: 'Dos vuelos internos (~88 mil c/u). Salida de Belice por tierra: USD 20 (BZ$40) en efectivo. Caye Caulker en Año Nuevo se llena: reservar luego.',
      internos: 2
    },
    {
      id: 'volcanes-lago',
      nombre: 'Volcanes y lago, sin apuro',
      resumen: 'La más tranquila: sin vuelos internos y con seis días de lago. Para descansar después de la Austral.',
      mapaRuta: ['Antigua Guatemala', 'Volcán de Acatenango', 'Lago de Atitlán', 'Chichicastenango'],
      etapas: [['antigua', 3], ['acatenango', 1], ['antigua', 2], ['atitlan', 6], ['antigua', 2]],
      paradas: [
        { dias: 'D1 a D3 · 26 al 28 dic', lugar: 'antigua', titulo: 'Antigua', detalle: 'Llegada sin apuro, cafés, mercados y el Volcán Pacaya en una tarde (se tuestan malvaviscos en la lava).' },
        { dias: 'D4 a D5 · mar 29 y mié 30', lugar: 'acatenango', titulo: 'Acatenango', detalle: 'La noche frente al Fuego. Bajamos el 30.' },
        { dias: 'D6 · jue 31', lugar: 'antigua', titulo: 'Año Nuevo en Antigua', detalle: 'Fuegos artificiales en la plaza.' },
        { dias: 'D7 a D12 · 1 al 6 ene', lugar: 'atitlan', titulo: 'Seis días de lago', detalle: 'Un pueblo distinto cada día en lancha: San Marcos, San Juan, Santa Cruz. Nariz del Indio al amanecer.' },
        { dias: 'D10 · dom 3', lugar: 'atitlan', titulo: 'Mercado de Chichicastenango', detalle: 'El mercado maya más grande, solo jueves y domingo. Ida y vuelta en el día desde el lago (1,5 h).' },
        { dias: 'D13 a D14 · 7 y 8 ene', lugar: 'antigua', titulo: 'Cierre en Antigua', detalle: 'Compras, última comida y cerca del aeropuerto.' },
        { dias: 'D15 · sáb 9', lugar: null, titulo: 'Vuelta', detalle: 'Shuttle al aeropuerto (1 h) y Copa 10:43.' }
      ],
      extra: 'Sin vuelos internos: la más barata en traslados. No incluye Tikal; si se quiere, se cambian dos días de lago por Flores en el armador.',
      internos: 0
    },
    {
      id: 'caribe',
      nombre: 'Selva y Caribe guatemalteco',
      resumen: 'Volcán, Semuc, el río Dulce hasta Livingston y Tikal. La más aventurera.',
      mapaRuta: ['Antigua Guatemala', 'Volcán de Acatenango', 'Semuc Champey', 'Río Dulce, Izabal', 'Livingston, Izabal', 'Flores, Petén', 'Parque Nacional Tikal'],
      etapas: [['antigua', 2], ['acatenango', 1], ['antigua', 1], ['semuc-champey', 2], ['rio-dulce', 3], ['flores', 3], ['antigua', 2]],
      paradas: [
        { dias: 'D1 a D2 · sáb 26 y dom 27', lugar: 'antigua', titulo: 'Antigua', detalle: 'Llegada y ciudad colonial.' },
        { dias: 'D3 a D4 · lun 28 y mar 29', lugar: 'acatenango', titulo: 'Acatenango', detalle: 'Noche frente al Fuego y bajada a Antigua.' },
        { dias: 'D5 a D6 · mié 30 y jue 31', lugar: 'semuc-champey', titulo: 'Año Nuevo en la selva', detalle: 'Shuttle a Lanquín (8 a 9 h) y pozas de Semuc Champey.' },
        { dias: 'D7 a D9 · 1 al 3 ene', lugar: 'rio-dulce', titulo: 'Río Dulce y Livingston', detalle: 'Lancha por el cañón hasta Livingston, tapado garífuna y el Castillo de San Felipe.' },
        { dias: 'D10 a D12 · 4 al 6 ene', lugar: 'tikal', titulo: 'Flores y Tikal', detalle: 'Shuttle a Flores (4 h), Tikal al amanecer y la laguna.' },
        { dias: 'D13 a D14 · 7 y 8 ene', lugar: 'antigua', titulo: 'Vuelo y cierre en Antigua', detalle: 'Flores → Guatemala en avión y dos días tranquilos en Antigua.' },
        { dias: 'D15 · sáb 9', lugar: null, titulo: 'Vuelta', detalle: 'Copa 10:43 y a Santiago.' }
      ],
      extra: 'Un vuelo interno (Flores → Guatemala). Ojo: el 1 de enero algunos shuttles no corren; confirmar el Lanquín → Río Dulce. Repelente para la selva y el río.',
      internos: 1
    }
  ],

  // ---------- Arma tu ruta (Guatemala) ----------
  // Precios por noche de pieza doble vistos en Google Hoteles el 3 nov para esas fechas (para los dos).
  // activ: tours y entradas por persona. base: índice de la opción que usa el presupuesto.
  armador: {
    quetzal: 129, // CLP por quetzal (1 USD ≈ 7,7 Q)
    lugares: [
      { id: 'antigua', nombre: 'Antigua', sugeridas: '2 a 4 noches', activ: 15000, activNota: 'Cerro de la Cruz gratis · Pacaya ≈ USD 25 con guía',
        aloj: [{ n: 'Somos (hostal)', p: 34078, r: '4,7' }, { n: 'Flore Boutique Hostel', p: 52035, r: '4,8' }, { n: 'Casa Donya Boutique', p: 54981, r: '4,8' }, { n: 'Ojala Hotel', p: 82529, r: '4,7' }], base: 1,
        nota: 'Para Año Nuevo, reservar ya.', busca: 'hoteles Antigua Guatemala' },
      { id: 'acatenango', nombre: 'Acatenango', sugeridas: '1 noche (tour de 2 días)', activ: 130000, activNota: 'Tour USD 90 a 130 + entradas ≈ Q150. Incluye carpa, comida y guía',
        aloj: [{ n: 'Incluido en el tour', p: 0, r: '' }], base: 0,
        nota: 'Sale de Antigua y vuelve al otro día. Frío bajo cero: arrendar ropa de abrigo.', busca: '' },
      { id: 'atitlan', nombre: 'Lago Atitlán', sugeridas: '3 a 5 noches', activ: 25000, activNota: 'Lanchas entre pueblos Q25 a 35 · Nariz del Indio ≈ Q100',
        aloj: [{ n: 'AHAU', p: 21946, r: '4,5' }, { n: 'Casa Jaguar Tree House', p: 31499, r: '4,7' }, { n: 'Maya Moon Lodge', p: 58908, r: '4,6' }, { n: 'Sababa Resort', p: 109760, r: '4,2' }], base: 1,
        nota: 'San Marcos es tranquilo; San Pedro, más carrete.', busca: 'hoteles San Marcos La Laguna Atitlán' },
      { id: 'semuc-champey', nombre: 'Semuc Champey', sugeridas: '2 noches', activ: 32000, activNota: 'Tour con pozas, cuevas y tubing Q175 a 250',
        aloj: [{ n: 'Yaxlik River Lodge', p: 24034, r: '4,6' }, { n: 'Casa Mary Lanquín', p: 27705, r: '4,8' }, { n: 'Utopia Eco Hotel', p: 40533, r: '4,2' }], base: 1,
        nota: 'No hay cajeros en Lanquín: llegar con quetzales.', busca: 'hoteles Lanquín Semuc Champey' },
      { id: 'flores', nombre: 'Flores y Tikal', sugeridas: '2 a 3 noches', activ: 55000, activNota: 'Tikal Q150 + amanecer Q100 + guía y shuttle',
        aloj: [{ n: 'La Casa de Grethel', p: 25212, r: '4,2' }, { n: 'Hotel San Miguel', p: 27988, r: '4,3' }, { n: 'Zapote Tree Inn', p: 56429, r: '4,7' }, { n: 'B&B Del Lago', p: 59583, r: '5,0' }], base: 2,
        nota: 'Para el amanecer en Tikal se sale a las 03:00.', busca: 'hoteles Flores Petén' },
      { id: 'caye-caulker', nombre: 'Caye Caulker (Belice)', sugeridas: '2 a 3 noches', activ: 120000, activNota: 'Snorkel Hol Chan USD 90 a 115 + USD 15 del parque',
        aloj: [{ n: 'Caye Caulker Plaza', p: 46058, r: '4,0' }, { n: 'Sky Inn', p: 71010, r: '3,9' }, { n: 'Belizea Reef Inn', p: 83123, r: '4,7' }], base: 1,
        nota: 'Belice es más caro y todo es en dólares.', busca: 'hotels Caye Caulker Belize' },
      { id: 'rio-dulce', nombre: 'Río Dulce y Livingston', sugeridas: '2 a 3 noches', activ: 32000, activNota: 'Lancha a Livingston Q125 por tramo',
        aloj: [{ n: 'Hotel Casa Perico', p: 29005, r: '4,6' }, { n: 'Dreamcatcher Hotel', p: 36451, r: '4,3' }, { n: 'Boatique Hotel', p: 55308, r: '4,8' }, { n: 'Hacienda Tijax', p: 87879, r: '4,5' }], base: 1,
        nota: 'Última lancha pública a las 14:30.', busca: 'hoteles Río Dulce Izabal' },
      { id: 'ciudad', nombre: 'Ciudad de Guatemala', sugeridas: 'la última noche, si se llega en avión', activ: 0, activNota: 'Solo para dormir cerca del aeropuerto',
        aloj: [{ n: 'Hotel Citadin zona 10', p: 34652, r: '4,0' }, { n: 'Aurora Express', p: 53694, r: '4,5' }, { n: 'Barceló', p: 96489, r: '4,5' }], base: 1,
        nota: 'Moverse en Uber, no caminar de noche.', busca: 'hoteles cerca aeropuerto La Aurora' }
    ],
    // Traslados por persona. vuelo: true suma un vuelo interno (Guatemala ↔ Flores).
    // Se busca 'a>b' y si no está, 'b>a'. gua = aeropuerto (inicio y fin).
    traslados: {
      'gua>antigua': { h: '1 h', modo: 'shuttle', p: 15000, est: true },
      'gua>atitlan': { h: '3,5 h', modo: 'shuttle', p: 30000, est: true },
      'gua>semuc-champey': { h: '7 h', modo: 'shuttle', p: 36000, est: true },
      'gua>flores': { h: '45 min', modo: 'vuelo', p: 88362, vuelo: true },
      'gua>rio-dulce': { h: '6 h', modo: 'bus Litegua', p: 20000, est: true },
      'gua>ciudad': { h: '15 min', modo: 'Uber', p: 5000 },
      'gua>acatenango': { h: '2 h', modo: 'shuttle + tour', p: 15000, est: true },
      'antigua>acatenango': { h: '1,5 h', modo: 'incluido en el tour', p: 0 },
      'antigua>atitlan': { h: '3 h', modo: 'shuttle', p: 24000 },
      'antigua>semuc-champey': { h: '8 a 9 h', modo: 'shuttle', p: 36000 },
      'antigua>flores': { h: '1 h + 45 min', modo: 'shuttle + vuelo', p: 103362, vuelo: true },
      'antigua>rio-dulce': { h: '6 a 7 h', modo: 'shuttle', p: 40000, est: true },
      'antigua>caye-caulker': { h: 'un día entero', modo: 'vuelo a Flores + shuttle', p: 157362, vuelo: true },
      'antigua>ciudad': { h: '1 h', modo: 'shuttle', p: 15000, est: true },
      'acatenango>atitlan': { h: '1,5 h + 3 h', modo: 'tour + shuttle', p: 24000 },
      'acatenango>semuc-champey': { h: '1,5 h + 8 h', modo: 'tour + shuttle', p: 36000 },
      'acatenango>flores': { h: '1,5 h + vuelo', modo: 'tour + vuelo', p: 103362, vuelo: true },
      'acatenango>rio-dulce': { h: '1,5 h + 6 h', modo: 'tour + shuttle', p: 40000, est: true },
      'atitlan>semuc-champey': { h: '10 a 11 h', modo: 'shuttle', p: 50000 },
      'atitlan>flores': { h: '3,5 h + 45 min', modo: 'shuttle + vuelo', p: 118362, vuelo: true },
      'atitlan>rio-dulce': { h: '10 h', modo: 'shuttle por Antigua', p: 64000, est: true },
      'atitlan>caye-caulker': { h: 'un día entero', modo: 'shuttle + vuelo + shuttle', p: 172362, vuelo: true },
      'atitlan>ciudad': { h: '3,5 h', modo: 'shuttle', p: 30000, est: true },
      'semuc-champey>flores': { h: '7 a 8 h', modo: 'shuttle', p: 40000 },
      'semuc-champey>rio-dulce': { h: '7 a 8 h', modo: 'shuttle', p: 40000, est: true },
      'semuc-champey>ciudad': { h: '7 h', modo: 'shuttle', p: 36000, est: true },
      'flores>rio-dulce': { h: '4 h', modo: 'shuttle', p: 25000, est: true },
      'flores>caye-caulker': { h: '6 a 7 h', modo: 'shuttle + lancha', p: 54000 },
      'caye-caulker>flores': { h: '6 a 7 h', modo: 'lancha + shuttle', p: 74000, nota: 'incluye la salida de Belice (USD 20)' },
      'flores>ciudad': { h: '45 min', modo: 'vuelo', p: 88362, vuelo: true },
      'rio-dulce>ciudad': { h: '6 h', modo: 'bus Litegua', p: 20000, est: true },
      'caye-caulker>gua': { h: 'un día entero', modo: 'lancha + shuttle + vuelo', p: 162362, vuelo: true, nota: 'incluye la salida de Belice (USD 20)' },
      'caye-caulker>ciudad': { h: 'un día entero', modo: 'lancha + shuttle + vuelo', p: 162362, vuelo: true, nota: 'incluye la salida de Belice (USD 20)' }
    }
  },

  // ---------- Austral 2.0: de Cerro Castillo hacia el sur ----------
  // En 2025 hicimos Puerto Montt → Cerro Castillo. Esta vez, todo lo que viene después.
  // Va primero: del dom 13 (después del matrimonio) al mié 23 dic (antes de Navidad).
  rutaAustral: {
    nombre: 'Austral 2.0',
    resumen: 'De donde quedamos en 2025 hasta el fin del camino, en 10 días. Base para recortar en el kraft.',
    hecho2025: 'Puerto Montt → Cerro Castillo',
    mapaRuta: ['Aeropuerto Balmaceda', 'Villa Cerro Castillo', 'Puerto Río Tranquilo', 'Puerto Bertrand', 'Cochrane', 'Caleta Tortel', "Villa O'Higgins"],
    paradas: [
      { dias: 'D1 · dom 13 dic', lugar: 'cerro-castillo', titulo: 'Balmaceda → Cerro Castillo', detalle: 'Llegamos 16:49, auto en el aeropuerto y al sur. Retomamos donde quedamos.', manejo: '95 km · 1,5 h · pavimento' },
      { dias: 'D2 · lun 14', lugar: 'general-carrera', titulo: 'Rumbo a Río Tranquilo', detalle: 'Primer tramo nuevo, bordeando el General Carrera.', manejo: '125 km · 2,5 h · ripio' },
      { dias: 'D3 · mar 15', lugar: 'capillas-marmol', titulo: 'Capillas de Mármol', detalle: 'Lancha o kayak temprano, cuando el lago está quieto. Tarde libre en la costanera.', manejo: 'sin auto' },
      { dias: 'D4 · mié 16', lugar: 'exploradores', titulo: 'Glaciar Exploradores', detalle: 'Caminata sobre el hielo con guía, día completo.', manejo: '52 km por lado · 1,5 h · ripio' },
      { dias: 'D5 · jue 17', lugar: 'confluencia-baker', titulo: 'Puerto Bertrand y el Baker', detalle: 'La confluencia Baker y Neff, y a dormir al Valle Chacabuco.', manejo: '85 km · 2 h · ripio' },
      { dias: 'D6 · vie 18', lugar: 'parque-patagonia', titulo: 'Parque Patagonia', detalle: 'Sendero Lagunas Altas con guanacos y bajada a Cochrane.', manejo: '20 km · 30 min' },
      { dias: 'D7 · sáb 19', lugar: 'tortel', titulo: 'Caleta Tortel', detalle: 'Pasarelas de ciprés sobre el agua. Llenar el estanque en Cochrane antes de salir.', manejo: '125 km · 2,5 a 3 h · ripio' },
      { dias: 'D8 a D9 · 20 y 21', lugar: 'villa-ohiggins', titulo: "Villa O'Higgins", detalle: "Barcaza Yungay → Río Bravo y el fin de la Carretera. Glaciar O'Higgins si hay cupo.", manejo: '145 km + barcaza · 4 h' },
      { dias: 'D10 · mar 22', lugar: 'carretera-austral', titulo: 'De vuelta al norte', detalle: 'El día más largo: barcaza de vuelta y hasta Puerto Guadal.', manejo: '320 km + barcaza · 7 a 8 h' },
      { dias: 'D11 · mié 23', lugar: null, titulo: 'Vuelta', detalle: 'Salir 08:00, devolver el auto y vuelo 15:00. Navidad en Santiago.', manejo: '290 km · 5,5 h' }
    ],
    extra: "Son ~1.450 km en 10 días. Si se recorta Villa O'Higgins, se ganan dos días para Tortel y el General Carrera, y el día 10 deja de ser eterno."
  },

  // ---------- Auto en Balmaceda (Kayak, 13 dic 17:00 a 23 dic 13:00, total 10 días) ----------
  autos: {
    link: 'https://www.kayak.cl/cars/BBA/2026-12-13-17h/2026-12-23-13h?sort=price_a',
    opciones: [
      { id: 'salfa-crosstrek', agencia: 'Salfa', modelo: 'Subaru Crosstrek o similar', tipo: 'SUV compacto · automático', recogida: 'en el aeropuerto', total: 414700, recomendado: true, sello: 'la de 2025',
        nota: 'La misma empresa que nos funcionó con la Tracker. Esta es su categoría.' },
      { id: 'sixt-sonet', agencia: 'Sixt', modelo: 'Kia Sonet o similar', tipo: 'SUV chico · automático', recogida: 'en el aeropuerto', total: 261640, sello: 'más barato',
        nota: 'El SUV más barato. Más bajo y con menos maleta para el ripio largo.' },
      { id: 'sixt-cx5', agencia: 'Sixt', modelo: 'Mazda CX-5 o similar', tipo: 'SUV mediano · automático', recogida: 'en el aeropuerto', total: 327940,
        nota: 'Más espacio para la carpa y las mochilas por poco más.' },
      { id: 'lucano-tucson', agencia: 'Lucano', modelo: 'Hyundai Tucson o similar', tipo: 'SUV compacto · automático', recogida: 'coordinar por teléfono', total: 379170,
        nota: 'Empresa local, buena nota. Hay que coordinar la entrega.' },
      { id: 'salfa-4runner', agencia: 'Salfa', modelo: 'Toyota 4Runner o similar', tipo: 'SUV 4x4 grande · automático', recogida: 'en el aeropuerto', total: 741790,
        nota: '4x4 de verdad. Solo si queremos ir sobrados.' },
      { id: 'salfa-navara', agencia: 'Salfa', modelo: 'Nissan Navara o similar', tipo: 'camioneta 4x4 · automática', recogida: 'en el aeropuerto', total: 819510,
        nota: 'Cabe todo, pero gasta más bencina.' }
    ]
  },

  // ---------- Dónde dormir en la Austral (pieza doble por noche, Google Hoteles 3 nov) ----------
  dormirAustral: [
    { noche: 'dom 13', donde: 'Villa Cerro Castillo', camping: 10000, techo: [{ n: 'Refugio Casa Piedra', p: 39585, r: '4,2' }, { n: 'Vientos del Sur', p: 46988, r: '4,9' }], busca: 'alojamiento Villa Cerro Castillo 13 al 14 de diciembre 2026' },
    { noche: 'lun 14 a mié 16', donde: 'Puerto Río Tranquilo (3 noches)', camping: 10000, techo: [{ n: 'Rimaya Hostel', p: 93424, r: '4,7' }, { n: 'Patagonia Acres Lodge', p: 147270, r: '4,7' }], extra: 'Muchas cabañas no publican precio: Siempre Verde (4,8) y La Vasca (4,8) se reservan directo.', busca: 'alojamiento Puerto Río Tranquilo 14 al 17 de diciembre 2026' },
    { noche: 'jue 17', donde: 'Valle Chacabuco (Parque Patagonia)', camping: 10000, campingNota: 'Camping West Winds', techo: [{ n: 'Cabañas Buena Vista (Bertrand)', p: 122097, r: '4,3' }, { n: 'Green Baker Lodge', p: 239254, r: '4,4' }], busca: 'alojamiento Puerto Bertrand 17 al 18 de diciembre 2026' },
    { noche: 'vie 18', donde: 'Cochrane', camping: 8000, techo: [{ n: 'SURí refugios', p: 39566, r: '5,0' }, { n: 'Mate Sur Hostel', p: 63242, r: '4,4' }], busca: 'alojamiento Cochrane Aysén 18 al 19 de diciembre 2026' },
    { noche: 'sáb 19', donde: 'Caleta Tortel', camping: 8000, techo: [], extra: 'Nada publica precio en línea: hospedajes familiares (~$40 a 60 mil) por teléfono o WhatsApp.', busca: 'alojamiento Caleta Tortel 19 al 20 de diciembre 2026' },
    { noche: 'dom 20 y lun 21', donde: "Villa O'Higgins (2 noches)", camping: 10000, techo: [{ n: 'Hostal Puesto Canogas', p: 116834, r: '4,6' }, { n: 'Rumbo Sur Hotel', p: 257032, r: '4,6' }], extra: 'Hay poco y se llena: reservar apenas compremos.', busca: "alojamiento Villa O'Higgins 20 al 22 de diciembre 2026" },
    { noche: 'mar 22', donde: 'Puerto Guadal', camping: 10000, techo: [{ n: 'Cabañas Buena Vista', p: 122097, r: '4,3' }, { n: 'Parador Austral Lodge', p: 161136, r: '4,1' }], busca: 'alojamiento Puerto Guadal 22 al 23 de diciembre 2026' }
  ],

  // ---------- Qué hacer y cuánto cuesta (por persona) ----------
  actividadesAustral: [
    { nombre: 'Capillas de Mármol en lancha', donde: 'Río Tranquilo', precio: '$18 mil (1,5 h) · $28 mil con Puerto Sánchez', nota: 'Salir temprano: en la tarde el lago se pone bravo.' },
    { nombre: 'Capillas de Mármol en kayak', donde: 'Río Tranquilo', precio: '≈ $66 mil', nota: '3 h con guía. Más lento y más cerca de la roca.' },
    { nombre: 'Glaciar Exploradores sobre el hielo', donde: 'Río Tranquilo', precio: '$150 a 170 mil', nota: 'Día completo (07:00 a 18:00) con transporte, entrada y crampones. Cupos limitados: reservar.', reservar: true },
    { nombre: 'Glaciar Exploradores, solo miradores', donde: 'Valle Exploradores', precio: '$55 a 60 mil con guía', nota: 'O por nuestra cuenta en el auto, pagando la entrada del sendero.' },
    { nombre: 'Parque Patagonia', donde: 'Valle Chacabuco', precio: 'entrada ≈ $13 mil (extranjeros)', nota: 'Para chilenos debería ser menos: confirmar en CONAF.' },
    { nombre: "Glaciar O'Higgins en barco", donde: "Villa O'Higgins", precio: 'consultar (lago desde ≈ $60 mil)', nota: 'Depende del clima y del cupo. Preguntar antes de llegar.', reservar: true },
    { nombre: 'Barcaza Yungay ↔ Río Bravo', donde: "camino a O'Higgins", precio: 'gratis', nota: 'Subvencionada, por orden de llegada. 45 min.' }
  ],

  // Barcaza Puerto Yungay ↔ Río Bravo (temporada media: oct, nov, dic, mar · actualizado oct 2026)
  barcaza: {
    ida: ['08:00', '10:00', '12:00', '13:00', '15:00', '16:00', '17:00', '18:00'],
    vuelta: ['09:00', '11:00', '13:00', '14:00', '16:00', '17:00', '18:00', '19:00'],
    nota: 'Los viernes sale una extra a las 08:10 desde Yungay. Sin reserva: se embarca por orden de llegada. Fuente: carretera-austral.cl.'
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
      { id: 'ca-aloj', nombre: 'Alojamiento (pieza doble, temporada alta)', unitario: 45000, cantidad: 14, unidad: 'noches', tipo: 'mitad' },
      { id: 'ca-comida', nombre: 'Comida', unitario: 15000, cantidad: 15, unidad: 'días', tipo: 'cada' },
      { id: 'ca-transp', nombre: 'Transporte interno (shuttles, lanchas)', unitario: 150000, cantidad: 1, unidad: 'total', tipo: 'cada' },
      { id: 'ca-activ', nombre: 'Actividades (Tikal, Acatenango, Semuc o snorkel)', unitario: 140000, cantidad: 1, unidad: 'total', tipo: 'cada' },
      { id: 'ca-extras', nombre: 'Extras e imprevistos (Año Nuevo incluido)', unitario: 80000, cantidad: 1, unidad: 'total', tipo: 'cada' }
    ],
    austral: [
      { id: 'au-auto', nombre: 'Arriendo de auto (sale del auto elegido)', unitario: 41470, cantidad: 10, unidad: 'días', tipo: 'mitad' },
      { id: 'au-bencina', nombre: 'Bencina (~1.450 km)', unitario: 200000, cantidad: 1, unidad: 'total', tipo: 'mitad' },
      { id: 'au-aloj', nombre: 'Alojamiento (mitad camping, mitad techo)', unitario: 45000, cantidad: 10, unidad: 'noches', tipo: 'mitad' },
      { id: 'au-comida', nombre: 'Comida', unitario: 15000, cantidad: 11, unidad: 'días', tipo: 'cada' },
      { id: 'au-activ', nombre: 'Tours y entradas (Capillas, Exploradores)', unitario: 190000, cantidad: 1, unidad: 'total', tipo: 'cada' }
    ],
    seguro: 39700 // ~USD 40 por persona, si la tarjeta no lo cubre
  }
};
