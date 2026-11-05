// Datos de la web prep · Agencia de Viajes SiempreLab
// Todo lo que cambia (precios, horarios, montos) vive aquí.
// Los precios de los vuelos se actualizan solos dos veces al día (precios.json, lo escribe GitHub Actions).
// Lo demás (autos, alojamiento, tours) se edita aquí a mano.

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
  version: 4,

  // Fecha de despegue para la cuenta regresiva (primero la Austral: dom 13 dic, hora de Chile)
  despegue: '2026-12-13T14:30:00-03:00',

  // La junta: viernes 6 en la noche. Cada uno presenta su propuesta (Agus la Austral, la Jo Guatemala) y compramos todo
  junta: '2026-11-06T21:00:00-03:00',

  // Dónde comprar cada aerolínea
  compra: {
    Copa: 'https://www.copaair.com/es-cl/',
    Avianca: 'https://www.avianca.com/es/',
    LATAM: 'https://www.latamairlines.com/cl/es',
    SKY: 'https://www.skyairline.com/es/chile'
  },

  // Lo que hay que reservar además de pasajes y auto (esos salen de lo elegido en la página). Cotizado el 4 nov.
  reservas: [
    { id: 'res-acatenango', que: 'Acatenango con noche en el volcán · Lava Trails', detalle: 'Elegir el lun 28 dic, o el jue 31 si recibimos el Año Nuevo en el volcán. Ojo: el 4 nov la web salía agotada todo diciembre, hay que escribirles por WhatsApp. Abono de USD 50 que devuelven hasta 48 h antes.', precio: 'USD 102 c/u + Q100', link: 'https://lavatrails.rezdy.com/573187/acatenango-overnight-hike' },
    { id: 'res-antigua', que: 'Hostal en Antigua para Año Nuevo', detalle: 'Del 30 dic al 1 ene. Es lo primero que se llena: con cancelación gratis.', precio: '≈ $45 mil la noche', link: 'https://www.google.com/travel/search?q=hostal%20Antigua%20Guatemala%2030%20de%20diciembre%202026&hl=es&gl=CL&curr=CLP', boton: 'buscar' },
    { id: 'res-anio-nuevo', que: 'Año Nuevo · lo que elijamos', detalle: 'Acatenango el 31 (arriba), mesa en El Tenedor del Cerro (+502 7820-1220) o La Casa del Mundo en Atitlán, que es chica y se llena.', precio: 'según la opción', link: 'https://hotels.cloudbeds.com/reservation/EbWilf', boton: 'Casa del Mundo' },
    { id: 'res-shuttle-flores', que: 'Shuttle Lanquín → Flores', detalle: 'Sale 08:00, unas 8 h. También se compra en el hostal de Lanquín.', precio: 'USD 40 a 45 c/u', link: 'https://turisteando.wetravel.com/trips/shuttle-shuttle-from-lanquin-to-flores-turisteando-7470215393' },
    { id: 'res-tikal', que: 'Entrada a Tikal con amanecer', detalle: 'Con pasaporte, en la web oficial.', precio: 'Q250 c/u', link: 'https://boletos.culturaguate.com/', boton: 'comprar' },
    { id: 'res-exploradores', que: 'Glaciar Exploradores sobre el hielo · Viajero Austral', detalle: 'Día completo desde Río Tranquilo, solo mayores de 18. Preguntar por WhatsApp si salen en diciembre (Huente-Có es la otra opción al mismo precio).', precio: '$150 mil c/u', link: 'https://www.viajeroaustral.com/tour-glaciar-exploradores' },
    { id: 'res-ohiggins', que: 'Navegación al Glaciar O\'Higgins', detalle: 'No sale todos los días: preguntar por el 20 o el 21 dic.', precio: 'consultar', link: 'https://www.tur.com/es/villa-ohiggins-286/navegacion-villa-ohiggins-a-candelario-mancilla-1-1-1-1-1-26362-1995', boton: 'consultar' },
    { id: 'res-dormir-ohiggins', que: 'Alojamiento en Villa O\'Higgins', detalle: '20 al 22 dic. Hay poco: Hostal Puesto Canogas (4,6).', precio: '$116.834 la noche', link: 'https://www.google.com/travel/search?q=alojamiento%20Villa%20O%27Higgins%2020%20al%2022%20de%20diciembre%202026&hl=es&gl=CL&curr=CLP', boton: 'buscar' },
    { id: 'res-dormir-tranquilo', que: 'Alojamiento en Puerto Río Tranquilo', detalle: '14 al 17 dic. Rimaya Hostel (4,7) o cabañas que se reservan directo.', precio: '$93.424 la noche', link: 'https://www.google.com/travel/search?q=alojamiento%20Puerto%20R%C3%ADo%20Tranquilo%2014%20al%2017%20de%20diciembre%202026&hl=es&gl=CL&curr=CLP', boton: 'buscar' }
  ],

  // Logos (en la carpeta logos/)
  logos: {
    LATAM: 'logos/LA.png', SKY: 'logos/H2.png', Copa: 'logos/CM.png', Avianca: 'logos/AV.png', TAG: 'logos/5U.png',
    Salfa: 'logos/salfarent.png', Sixt: 'logos/sixt.png', Lucano: 'logos/lucano.png', Budget: 'logos/budget.png'
  },

  // Fecha en que se vieron los precios
  precioVisto: '5 nov',

  // Tipo de cambio implícito de Avianca el 4 nov ($549.350 = USD 565,60). Lo usa "recotizar" si se anota en dólares.
  usd: 971,

  // ---------- Vuelos a Guatemala (ida y vuelta, por persona, CLP) ----------
  // precio: tarifa más barata (Copa Basic ya incluye mochila de mano de 10 kg).
  // extraMano / extraBodega: lo que se suma por equipaje en todo el viaje. estimado: true = no salió directo de la búsqueda.
  // Los que tienen id en precios.json se actualizan solos.
  vuelosCA: [
    {
      id: 'avianca-25',
      noches: 14,
      recomendado: true,
      aerolinea: 'Avianca',
      destino: 'GUA',
      ida: { dia: 'vie 25', detalle: '16:15 → 00:55 (+1)', dur: '11 h 40 min', escalas: '1 escala en Bogotá' },
      vuelta: { dia: 'sáb 9 ene', detalle: '09:20 → 01:05 (+1)', dur: '12 h 45 min', escalas: '1 escala en Bogotá' },
      precio: 555419,
      // Visto en avianca.com el 5 nov: Light USD 519 + 300,60 (trae mano de 10 kg); Classic USD 599 + 380,60 (suma bodega de 23 kg).
      // Classic cuesta USD 160 más ida y vuelta ≈ $155 mil.
      extraMano: 0,
      extraBodega: { monto: 155000 },
      nota: 'Salimos el 25 después del almuerzo de Navidad y llegamos 00:55. Volvemos el sáb 9 y llegamos el dom 10 a la 01:05, así la Jo tiene el domingo entero para preparar sus cosas y dormir bien antes del internado. La tarifa Light ya trae mochila de mano de 10 kg; para la mochila scout en bodega va Classic (USD 160 más ida y vuelta, visto en avianca.com). El 5 nov la ida ya había subido de USD 265 a USD 519 en Light y quedaba 1 asiento a ese precio.',
      link: 'https://booking.avianca.com/av/booking/avail?departureDate=2026-12-25&tripType=round-trip&platform=WEBB2C&from=SCL&to=GUA&nbAdults=1&nbYoungs=0&nbChildren=0&nbInfants=0&language=ES&pointOfSale=CL&returnDate=2027-01-09&promoCode=&selectedCabin=ECO&accessMethod=default&backend=PRD'
    },
    {
      id: 'copa-26',
      noches: 14,
      aerolinea: 'Copa',
      destino: 'GUA',
      ida: { dia: 'noche vie 25', detalle: 'sáb 26 · 01:07 → 09:40', dur: '11 h 33 min', escalas: '1 escala en Panamá (2 h 16 min)' },
      vuelta: { dia: 'sáb 9 ene', detalle: '07:19 → 20:18 o 10:43 → 23:40', dur: '≈ 10 h', escalas: '1 escala en Panamá' },
      precio: 820958,
      extraMano: 0,
      extraBodega: { monto: 168640, estimado: true },
      nota: 'La más barata del 26: salimos después de la cena de Navidad y llegamos a media mañana.',
      link: 'https://www.google.com/travel/flights?q=Flights%20from%20SCL%20to%20GUA%20on%202026-12-26%20through%202027-01-09&curr=CLP&hl=es&gl=CL'
    },
    {
      id: 'copa-26-0845',
      noches: 14,
      aerolinea: 'Copa',
      destino: 'GUA',
      ida: { dia: 'noche vie 25', detalle: 'sáb 26 · 01:07 → 08:45', dur: '10 h 38 min', escalas: '1 escala en Panamá (1 h 25 min)' },
      vuelta: { dia: 'sáb 9 ene', detalle: 'a elegir', dur: '≈ 10 h', escalas: '1 escala en Panamá' },
      precio: 919147,
      extraMano: 0,
      extraBodega: { monto: 168640, estimado: true },
      antes: { monto: 766492, fecha: '3 nov' },
      nota: 'La que mirábamos: llega una hora antes, pero subió harto en un día.',
      link: 'https://www.google.com/travel/flights?q=Flights%20from%20SCL%20to%20GUA%20on%202026-12-26%20through%202027-01-09&curr=CLP&hl=es&gl=CL'
    },
    {
      id: 'copa-27',
      noches: 13,
      aerolinea: 'Copa',
      destino: 'GUA',
      ida: { dia: 'noche sáb 26', detalle: 'dom 27 · 01:31 → 08:45', dur: '10 h 14 min', escalas: '1 escala en Panamá' },
      vuelta: { dia: 'sáb 9 ene', detalle: 'a elegir', dur: '≈ 10 h', escalas: '1 escala en Panamá' },
      precio: 820958,
      extraMano: 0,
      extraBodega: { monto: 168640, estimado: true },
      antes: { monto: 820883, fecha: '3 nov' },
      nota: 'Mismo precio que el 26 y Navidad sin apuro, pero una noche menos allá.',
      link: 'https://www.google.com/travel/flights?q=Flights%20from%20SCL%20to%20GUA%20on%202026-12-27%20through%202027-01-09&curr=CLP&hl=es&gl=CL'
    },
    {
      id: 'avianca-26',
      noches: 13,
      aerolinea: 'Avianca',
      destino: 'GUA',
      ida: { dia: 'sáb 26', detalle: '16:15 → 00:55 (+1)', dur: '11 h 40 min', escalas: '1 escala en Bogotá' },
      vuelta: { dia: 'sáb 9 ene', detalle: '09:20 → 01:05 (+1)', dur: '12 h 45 min', escalas: '1 escala en Bogotá' },
      precio: 883308,
      extraMano: 0,
      extraBodega: { monto: 155000, estimado: true },
      nota: 'El mismo vuelo que el del 25, pero un día después cuesta $330 mil más.',
      link: 'https://www.google.com/travel/flights?q=Flights%20from%20SCL%20to%20GUA%20on%202026-12-26%20through%202027-01-09&curr=CLP&hl=es&gl=CL'
    }
  ],

  // Vuelo interno Guatemala ↔ Flores (Tikal), precio por tramo
  // Flores → Guatemala (la vuelta desde Petén). Visto en avianca.com: Basic USD 90 (solo bolso chico), Classic USD 102,30 con bodega de 23 kg.
  // TAG es parecido de precio, pero su maleta en vuelos nacionales es de 9 kg: no sirve para la mochila scout.
  vueloFlores: {
    id: 'flores',
    precio: 87414,
    extraBodega: 12000,
    detalle: 'Avianca · 07:40, 19:55 o 23:10 · 45 min. Con la mochila en bodega va la tarifa Classic (USD 12 más).',
    link: 'https://booking.avianca.com/av/booking/avail?departureDate=2027-01-08&tripType=one-way&platform=WEBB2C&from=FRS&to=GUA&nbAdults=1&nbYoungs=0&nbChildren=0&nbInfants=0&language=ES&pointOfSale=CL&promoCode=&selectedCabin=ECO&accessMethod=default&backend=PRD'
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
        { dias: 'D1 a D2 · sáb 26 y dom 27', lugar: 'antigua', titulo: 'Antigua', detalle: 'Llegamos 00:55 y shuttle a Antigua (1 h) a dormir. Cerro de la Cruz, mercados y rooftops con el Volcán de Agua.' },
        { dias: 'D3 a D4 · lun 28 y mar 29', lugar: 'acatenango', titulo: 'Acatenango', detalle: 'Trekking con noche frente al Volcán de Fuego en erupción. Bajamos el 29 a Antigua.' },
        { dias: 'D5 a D6 · mié 30 y jue 31', lugar: 'antigua', titulo: 'Año Nuevo en Antigua', detalle: 'Piernas de descanso y fuegos artificiales en la plaza con los volcanes de fondo.' },
        { dias: 'D7 a D9 · 1 al 3 ene', lugar: 'atitlan', titulo: 'Lago Atitlán', detalle: 'San Pedro, San Marcos, kayak entre pueblos.' },
        { dias: 'D10 a D11 · 4 y 5 ene', lugar: 'semuc-champey', titulo: 'Semuc Champey', detalle: 'Shuttle largo a Lanquín. Pozas turquesa, mirador y cueva con velas.' },
        { dias: 'D12 a D13 · 6 y 7 ene', lugar: 'tikal', titulo: 'Flores y Tikal', detalle: 'Shuttle por tierra a Flores (7 a 8 h) y amanecer en el Templo IV con monos aulladores.' },
        { dias: 'D14 · vie 8', lugar: 'flores', titulo: 'Flores → Guatemala', detalle: 'Mañana en la isla y vuelo a la capital (45 min). Noche cerca del aeropuerto.' },
        { dias: 'D15 · sáb 9', lugar: null, titulo: 'Vuelta', detalle: 'Avianca 09:20 y llegamos a Santiago el dom 10 a la 01:05. El domingo queda para preparar el internado.' }
      ],
      extra: 'Un vuelo interno (Flores → Guatemala, ~$100 mil con la mochila en bodega). De Semuc a Flores se va en shuttle. Fin de año es temporada alta: reservar Acatenango y hostales en Antigua apenas compremos.',
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
        { dias: 'D15 · sáb 9', lugar: null, titulo: 'Vuelta', detalle: 'Avianca 09:20 y a Santiago (llegamos el dom 10, 01:05).' }
      ],
      extra: 'Dos vuelos internos (~$100 mil c/u con bodega). Salida de Belice por tierra: USD 20 (BZ$40) en efectivo. Caye Caulker en Año Nuevo se llena: reservar luego.',
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
        { dias: 'D15 · sáb 9', lugar: null, titulo: 'Vuelta', detalle: 'Shuttle al aeropuerto (1 h) y Avianca 09:20.' }
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
        { dias: 'D15 · sáb 9', lugar: null, titulo: 'Vuelta', detalle: 'Avianca 09:20 y a Santiago (llegamos el dom 10, 01:05).' }
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
      { id: 'acatenango', nombre: 'Acatenango', sugeridas: '1 noche (tour de 2 días)', activ: 115000, activNota: 'Lava Trails USD 102 + Q100 de entrada. Incluye cama, comida y guía',
        dispo: { estado: 'agotado', texto: 'Lava Trails sale agotado online todo diciembre (visto el 4 nov); OX no recibe reservas del 21 dic al 4 ene' },
        aloj: [{ n: 'Incluido en el tour', p: 0, r: '' }], base: 0,
        nota: 'Sale de Antigua y vuelve al otro día. Frío bajo cero: arrendar ropa de abrigo.', busca: '' },
      { id: 'atitlan', nombre: 'Lago Atitlán', sugeridas: '3 a 5 noches', activ: 25000, activNota: 'Lanchas entre pueblos Q25 a 35 · Nariz del Indio ≈ Q100',
        aloj: [{ n: 'AHAU', p: 21946, r: '4,5' }, { n: 'Casa Jaguar Tree House', p: 31499, r: '4,7' }, { n: 'Maya Moon Lodge', p: 58908, r: '4,6' }, { n: 'Sababa Resort', p: 109760, r: '4,2' }], base: 1,
        nota: 'San Marcos es tranquilo; San Pedro, más carrete.', busca: 'hoteles San Marcos La Laguna Atitlán' },
      { id: 'semuc-champey', nombre: 'Semuc Champey', sugeridas: '2 noches', activ: 32000, activNota: 'Tour con pozas, cuevas y tubing Q175 a 250',
        aloj: [{ n: 'Yaxlik River Lodge', p: 24034, r: '4,6' }, { n: 'Casa Mary Lanquín', p: 27705, r: '4,8' }, { n: 'Utopia Eco Hotel', p: 40533, r: '4,2' }], base: 1,
        nota: 'No hay cajeros en Lanquín: llegar con quetzales.', busca: 'hoteles Lanquín Semuc Champey' },
      { id: 'flores', nombre: 'Flores y Tikal', sugeridas: '2 a 3 noches', activ: 55000, activNota: 'Tikal Q150 + amanecer Q100 + guía y shuttle',
        dispo: { estado: 'ok', texto: 'Tikal sale todos los días: boleto en línea antes' },
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
    // Traslados por persona. vuelo: true suma un vuelo interno (Guatemala ↔ Flores), que en p viene a vueloBase.
    vueloBase: 88362,
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
      { dias: 'D10 · mar 22', lugar: 'carretera-austral', titulo: 'De vuelta al norte', detalle: 'El día más largo: barcaza de vuelta y hasta Puerto Guadal.', manejo: '320 km + barcaza · 7 a 8 h' }
    ],
    // Los últimos días cambian según si volvemos el 23 o el 24
    finales: {
      23: [
        { dias: 'D11 · mié 23', lugar: null, titulo: 'Vuelta', detalle: 'Salir 08:00 de Guadal, devolver el auto y vuelo 15:00. Navidad en Santiago.', manejo: '290 km · 5,5 h' }
      ],
      24: [
        { dias: 'D11 · mié 23', lugar: 'general-carrera', titulo: 'Día de colchón', detalle: 'Guadal → Cerro Castillo sin apuro, parando donde dé ganas. Última noche de carpa.', manejo: '195 km · 4 h · ripio y pavimento' },
        { dias: 'D12 · jue 24', lugar: null, titulo: 'Vuelta', detalle: 'Cerro Castillo → Balmaceda, devolver el auto y vuelo 15:00. Nochebuena en Santiago.', manejo: '95 km · 1,5 h · pavimento' }
      ]
    },
    extra: "Son ~1.450 km. Si se recorta Villa O'Higgins, se ganan dos días para Tortel y el General Carrera, y el día 10 deja de ser eterno."
  },

  // ---------- Auto en Balmaceda (Kayak, 3 nov: retiro dom 13 dic 17:00, devolución el 23 o el 24 a las 13:00) ----------
  // total: 10 días (vuelta el 23) · total24: 11 días (vuelta el 24). Ficha aprox. del modelo: "o similar" puede cambiar.
  // consumo en km/l mixto, con ripio y carga. Sirve para estimar la bencina.
  autos: {
    link: {
      23: 'https://www.kayak.cl/cars/BBA/2026-12-13-17h/2026-12-23-13h?sort=price_a',
      24: 'https://www.kayak.cl/cars/BBA/2026-12-13-17h/2026-12-24-13h?sort=price_a'
    },
    km: 1450,
    litro: { bencina: 1400, diesel: 1100 }, // precio aprox. en Aysén
    opciones: [
      { id: 'sixt-sonet', agencia: 'Sixt', modelo: 'Kia Sonet o similar', tipo: 'SUV chico · automático', recogida: 'en el terminal', total: 261650, total24: 287705, recomendado: true, sello: 'la mejor opción',
        traccion: '4x2', despeje: 190, maletero: 392, consumo: 15, combustible: 'bencina',
        foto: { src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/31/Kia_Sonet_IMG001.jpg/960px-Kia_Sonet_IMG001.jpg', credito: 'Zotyefan · CC0' },
        nota: 'Automático, el que menos gasta (≈ 15 km/l) y 19 cm de despeje. En diciembre el ripio hasta O\'Higgins se hace bien en 4x2. Maletero de 392 L: más grande que el del Crosstrek. Ir sin apuro en el ripio y revisar la rueda de repuesto al retirarlo.' },
      { id: 'salfa-crosstrek', agencia: 'Salfa', modelo: 'Subaru Crosstrek o similar', tipo: 'SUV compacto · automático', recogida: 'en el terminal', total: 414700, total24: 441012, sello: 'más holgado',
        traccion: 'integral', despeje: 220, maletero: 315, consumo: 13, combustible: 'bencina',
        foto: { src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/Subaru_Crosstrek_%28GU%29_1X7A2484.jpg/960px-Subaru_Crosstrek_%28GU%29_1X7A2484.jpg', credito: 'Alexander-93 · CC BY-SA 4.0' },
        nota: 'Tracción integral y 3 cm más de despeje: más margen en el ripio, pero en verano no hace falta y sale $153 mil más (más $21 mil de bencina). Misma empresa de la Tracker de 2025.' },
      { id: 'sixt-cx5', agencia: 'Sixt', modelo: 'Mazda CX-5 o similar', tipo: 'SUV mediano · automático', recogida: 'en el terminal', total: 327950, total24: 360635,
        traccion: '4x2 (probable)', despeje: 193, maletero: 442, consumo: 12, combustible: 'bencina',
        foto: { src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f8/Mazda_CX-5_%28KF%29_Facelift_1X7A0331_%282%29.jpg/960px-Mazda_CX-5_%28KF%29_Facelift_1X7A0331_%282%29.jpg', credito: 'Alexander Migl · CC BY-SA 4.0' },
        nota: 'Punto medio: el maletero más grande de los SUV por poco más que el Sonet.' },
      { id: 'lucano-tucson', agencia: 'Lucano', modelo: 'Hyundai Tucson o similar', tipo: 'SUV compacto · automático', recogida: 'coordinar por teléfono', total: 372643, total24: 410124,
        traccion: '4x2', despeje: 170, maletero: 539, consumo: 11, combustible: 'bencina',
        foto: { src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Hyundai_Tucson_%28NX4%29_1X7A0424.jpg/960px-Hyundai_Tucson_%28NX4%29_1X7A0424.jpg', credito: 'Alexander Migl · CC BY-SA 4.0' },
        nota: 'Empresa local con buena nota y mucho maletero, pero el más bajo de todos. Hay que coordinar la entrega.' },
      { id: 'salfa-4runner', agencia: 'Salfa', modelo: 'Toyota 4Runner o similar', tipo: 'SUV 4x4 grande · automático', recogida: 'en el terminal', total: 741790, total24: { monto: 816000, estimado: true },
        traccion: '4x4', despeje: 244, maletero: 1300, consumo: 8, combustible: 'bencina',
        foto: { src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ef/Toyota_4Runner_%28N210%29_1X7A0418.jpg/960px-Toyota_4Runner_%28N210%29_1X7A0418.jpg', credito: 'Alexander Migl · CC BY-SA 4.0' },
        nota: '4x4 de verdad y cabe todo, pero cuesta el doble y gasta harta más bencina.' },
      { id: 'salfa-navara', agencia: 'Salfa', modelo: 'Nissan Navara o similar', tipo: 'camioneta 4x4 · automática', recogida: 'en el terminal', total: 819510, total24: { monto: 901000, estimado: true },
        traccion: '4x4', despeje: 228, maletero: null, consumo: 11, combustible: 'diesel',
        foto: { src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4f/Nissan_Navara_%28D23%29_2.5_VE_Calibre_4x2_2022.jpg/960px-Nissan_Navara_%28D23%29_2.5_VE_Calibre_4x2_2022.jpg', credito: 'Ethan Llamas · CC BY-SA 4.0' },
        nota: 'El equipo va en la pickup: sin cubierta se moja con la lluvia. Diésel.' }
    ],
    ojo: 'En Kayak aparece una Toyota 4Runner de Budget a $242.241 vendida por un intermediario (VIP Cars). El mismo auto en Booking.com sale $835.710: lo más probable es que sea un error o que no traiga el seguro. No la tomaría sin confirmar.'
  },

  // ---------- Dónde dormir en la Austral (pieza doble por noche, Google Hoteles 3 nov) ----------
  dormirAustral: [
    { noche: 'dom 13', donde: 'Villa Cerro Castillo', camping: 10000, techo: [{ n: 'Refugio Casa Piedra', p: 39585, r: '4,2' }, { n: 'Vientos del Sur', p: 46988, r: '4,9' }], busca: 'alojamiento Villa Cerro Castillo 13 al 14 de diciembre 2026' },
    { noche: 'lun 14 a mié 16', donde: 'Puerto Río Tranquilo (3 noches)', camping: 10000, techo: [{ n: 'Rimaya Hostel', p: 93424, r: '4,7' }, { n: 'Patagonia Acres Lodge', p: 147270, r: '4,7' }], extra: 'Muchas cabañas no publican precio: Siempre Verde (4,8) y La Vasca (4,8) se reservan directo.', busca: 'alojamiento Puerto Río Tranquilo 14 al 17 de diciembre 2026' },
    { noche: 'jue 17', donde: 'Valle Chacabuco (Parque Patagonia)', camping: 10000, campingNota: 'Camping West Winds', techo: [{ n: 'Cabañas Buena Vista (Bertrand)', p: 122097, r: '4,3' }, { n: 'Green Baker Lodge', p: 239254, r: '4,4' }], busca: 'alojamiento Puerto Bertrand 17 al 18 de diciembre 2026' },
    { noche: 'vie 18', donde: 'Cochrane', camping: 8000, techo: [{ n: 'SURí refugios', p: 39566, r: '5,0' }, { n: 'Mate Sur Hostel', p: 63242, r: '4,4' }], busca: 'alojamiento Cochrane Aysén 18 al 19 de diciembre 2026' },
    { noche: 'sáb 19', donde: 'Caleta Tortel', camping: 8000, techo: [], extra: 'Nada publica precio en línea: hospedajes familiares (~$40 a 60 mil) por teléfono o WhatsApp.', busca: 'alojamiento Caleta Tortel 19 al 20 de diciembre 2026' },
    { noche: 'dom 20 y lun 21', donde: "Villa O'Higgins (2 noches)", camping: 10000, techo: [{ n: 'Hostal Puesto Canogas', p: 116834, r: '4,6' }, { n: 'Rumbo Sur Hotel', p: 257032, r: '4,6' }], extra: 'Hay poco y se llena: reservar apenas compremos.', busca: "alojamiento Villa O'Higgins 20 al 22 de diciembre 2026" },
    { noche: 'mar 22', donde: 'Puerto Guadal', camping: 10000, techo: [{ n: 'Cabañas Buena Vista', p: 122097, r: '4,3' }, { n: 'Parador Austral Lodge', p: 161136, r: '4,1' }], busca: 'alojamiento Puerto Guadal 22 al 23 de diciembre 2026' },
    { noche: 'mié 23', soloSi: 24, donde: 'Villa Cerro Castillo (si volvemos el 24)', camping: 10000, techo: [{ n: 'Refugio Casa Piedra', p: 39585, r: '4,2' }, { n: 'Vientos del Sur', p: 46988, r: '4,9' }], extra: 'Precio de la noche del 13: confirmar para el 23.', busca: 'alojamiento Villa Cerro Castillo 23 al 24 de diciembre 2026' }
  ],

  // ---------- Qué hacer y cuánto cuesta (por persona) ----------
  // dispo: estado 'ok' (sale siempre), 'ojo' (reservar o confirmar), 'agotado'. Revisado el 3 nov (Acatenango, el 4 nov).
  // id: llave de las fotos en fotos-panoramas.js (o en lugares.js; fotos: otra llave si no calza). resumen, consta, incluye, llevar, ojo y operadores van en "todo el detalle".
  actividadesAustral: [
    { id: 'capillas-lancha', nombre: 'Capillas de Mármol en lancha', donde: 'Río Tranquilo', precio: '$18 mil (1,5 h) · $35 mil el Full Mármol con Puerto Sánchez', nota: 'Salir temprano: en la tarde el lago se pone bravo.',
      resumen: 'Cuevas y columnas de mármol que el Lago General Carrera fue tallando por miles de años. Con el lago calmo la lancha se mete a las cavernas y el agua se ve turquesa con las vetas azules y blancas de la roca.',
      consta: ['Se compra en la costanera de Río Tranquilo, sin reserva', 'Unos 15 min de navegación hasta la Capilla, la Catedral y las Cavernas', 'Si el lago está calmo, la lancha entra a las cuevas', 'El Full Mármol sale de Puerto Sánchez, al otro lado del lago, y suma más islas y cavernas que casi nadie ve'],
      incluye: ['Lancha con chalecos salvavidas', 'Explicación del lanchero'],
      llevar: ['Cortaviento: en el lago corre frío', 'Celular con correa o bolsa estanca'],
      ojo: ['Con viento no salen: si amanece calmo, ir altiro', 'Puerto Sánchez queda a ~2 h de Tranquilo en auto por ripio'],
      dispo: { estado: 'ok', texto: 'Salen todo el día desde la costanera. No hace falta reservar.' } },
    { id: 'capillas-kayak', nombre: 'Capillas de Mármol en kayak', donde: 'Río Tranquilo', precio: '$60 a 66 mil', nota: '3 a 4 h con guía. Más lento y más cerca de la roca.',
      resumen: 'Las mismas capillas pero remando: se entra a cuevas donde la lancha no cabe y se puede tocar el mármol. Es más tranquilo y mucho más íntimo que la lancha.',
      consta: ['Salida desde Bahía Mansa, en Río Tranquilo', 'Charla de seguridad y ~20 min remando hasta las capillas', 'Recorrido entre las cavernas, la Capilla y la Catedral de Mármol', 'Vuelta remando: en total 3 a 4 h'],
      incluye: ['Kayak doble y remos', 'Chaleco y faldón (cubrebañera)', 'Guía'],
      llevar: ['Ropa que se pueda mojar y una muda seca', 'Bloqueador y lentes de sol', 'Bolsa estanca para el celular'],
      ojo: ['Temporada de septiembre a abril', 'Con viento se suspende: reservar para la primera mañana en Tranquilo y tener la segunda de respaldo'],
      operadores: [{ n: 'Nomades', precio: '$60 a 66 mil', link: 'https://www.nomades.com/puerto-rio-tranquilo/kayak-capillas-marmol-id1276' }, { n: 'Varias en tur.com', precio: 'comparar', link: 'https://chile.tur.com/en/tour/tours-a-las-capillas-de-marmol-en-kayak-25339' }],
      dispo: { estado: 'ojo', texto: 'Grupos chicos: reservar uno o dos días antes.' },
      link: 'https://www.nomades.com/puerto-rio-tranquilo/kayak-capillas-marmol-id1276' },
    { id: 'exploradores-hielo', nombre: 'Glaciar Exploradores caminando sobre el hielo', donde: 'Río Tranquilo', precio: '$150 mil', nota: 'Día completo (06:00 a 18:00). Solo mayores de 18 y nivel exigente.', reservar: true,
      resumen: 'Es el glaciar de la Austral donde se camina encima con crampones, entre grietas, cuevas de hielo azul y lagunitas. Desde 2024 se entra por una ruta nueva (la antigua se cerró por un derrumbe de hielo) que es más larga: 7 a 8 h caminando, y de eso 1 a 2 h sobre hielo limpio.',
      consta: ['06:00 · salida en van desde Río Tranquilo: 1,5 h por el Valle Exploradores, entre lagos y una cascada', 'Entrada al sector con CONAF y caminata por la morrena frontal', '~2 h por roca y sedimento hasta el borde del glaciar', 'Crampones, arnés y casco: 1 a 2 h sobre el hielo, entre grietas, cuevas y lagunas', 'Vuelta por la misma ruta y llegada a Tranquilo entre 17:30 y 18:30'],
      incluye: ['Transporte ida y vuelta', 'Entrada al sector (CONAF)', 'Crampones, arnés, casco, polainas y guantes', 'Guías certificados y seguro', 'Colación (en Huente-Có)'],
      llevar: ['Zapatos de trekking semirrígidos: es obligatorio', 'Primera capa, polar y chaqueta impermeable', 'Gorro, guantes, lentes de sol y bloqueador', 'Botella de 1 L y snacks', 'Muda de ropa para la vuelta'],
      ojo: ['Edad mínima 18 años y dificultad alta: es la regla de CONAF para la ruta nueva', 'Nomades dejó de hacerlo. Los que lo están haciendo son Viajero Austral y Huente-Có', 'Sus páginas hablan de la temporada 2025-26: preguntar por WhatsApp si salen en diciembre 2026', 'Grupos de 3 a 12. Se reserva con un abono de ~$20 mil', 'Con lluvia fuerte o viento lo suspenden: dejarlo para el primer día bueno en Tranquilo'],
      operadores: [
        { n: 'Viajero Austral', precio: '$150.000', link: 'https://www.viajeroaustral.com/tour-glaciar-exploradores' },
        { n: 'Huente-Có', precio: '$150.000 · $190.000 con kayak en las Capillas', link: 'https://carretera-austral.cl/producto/excursion-al-glaciar-exploradores/' }
      ],
      dispo: { estado: 'ojo', texto: 'Ruta nueva desde 2024, solo mayores de 18. Viajero Austral y Huente-Có lo hacen a $150 mil: confirmar que salen en diciembre y reservar apenas cerremos la fecha.' },
      link: 'https://www.viajeroaustral.com/tour-glaciar-exploradores' },
    { id: 'exploradores-miradores', nombre: 'Glaciar Exploradores, solo miradores', donde: 'Valle Exploradores', precio: '$55 a 60 mil con guía', nota: 'O por nuestra cuenta en el auto, pagando la entrada del sendero.',
      resumen: 'La versión corta: sendero por bosque hasta miradores con el glaciar enfrente y el Monte San Valentín (el más alto de la Patagonia) de fondo, sin pisar el hielo.',
      consta: ['1,5 h en auto por el Valle Exploradores (el camino ya es un panorama)', 'Sendero corto entre bosque hasta los miradores', 'Vuelta a Tranquilo a almorzar'],
      llevar: ['Zapatillas de trekking', 'Cortaviento'],
      ojo: ['Sirve de plan B si el del hielo no sale o si queremos un día más suave'],
      dispo: { estado: 'ok', texto: 'Por nuestra cuenta, cualquier día.' },
      link: 'https://chile.tur.com/en/tour/trekking-a-los-miradores-del-glaciar-exploradores-25340' },
    { id: 'confluencia-baker', nombre: 'Confluencia del Baker y rafting en Bertrand', donde: 'Puerto Bertrand', precio: 'mirador sin entrada publicada · rafting ≈ $28 a 37 mil', nota: 'El mirador es una parada corta en el camino. El rafting es de 2 a 2,5 h.',
      resumen: 'El Baker, el río más caudaloso de Chile, sale turquesa del Lago Bertrand y más abajo choca con el Nef, que viene gris del glaciar: se ven los dos colores juntos sin mezclarse. En Bertrand se puede bajar el Baker en balsa.',
      consta: ['Mirador de la Confluencia: sendero corto y fácil, a 37 km al norte de Cochrane', 'Rafting: sale del Lago Bertrand y baja el Baker unas 2 h', 'Snack al final y vuelta al pueblo'],
      incluye: ['Rafting: traje de neopreno, botines, casco, remo, chaleco y cortaviento', 'Snack'],
      llevar: ['Traje de baño y ropa seca para después', 'Bloqueador'],
      ojo: ['El rafting se reserva directo con Baker Patagonia Aventura (contacto@bakerpatagonia.com)', 'Los precios del rafting son de páginas viejas: confirmar'],
      operadores: [{ n: 'Rafting Baker (tur.com)', precio: 'consultar', link: 'https://chile.tur.com/en/tour/rafting-baker-buena-vista-32584' }],
      dispo: { estado: 'ok', texto: 'El mirador, cualquier día. El rafting, reservar un día antes.' } },
    { id: 'parque-patagonia', nombre: 'Parque Patagonia', donde: 'Valle Chacabuco', precio: 'entrada ≈ $13 mil (extranjeros)', nota: 'Para chilenos debería ser menos: confirmar en CONAF.',
      resumen: 'Valle abierto de estepa con guanacos por todas partes, lagunas y cumbres nevadas. Es el parque que armó Tompkins y hoy es uno de los más lindos de Chile.',
      consta: ['Entrada por el Valle Chacabuco, al norte de Cochrane', 'Sendero Lagunas Altas (~6 h) o miradores cortos', 'Noche en el camping West Winds'],
      llevar: ['Equipo de camping completo', 'Comida: adentro no hay dónde comprar'],
      ojo: ['El camping West Winds tiene ~60 sitios'],
      dispo: { estado: 'ojo', texto: 'Preguntar a CONAF (aysen.oirs@conaf.cl) si hay que reservar el camping.' } },
    { id: 'tortel', nombre: 'Caleta Tortel e Isla de los Muertos', donde: 'Caleta Tortel', precio: 'pueblo gratis · Isla de los Muertos $36 mil', nota: 'El auto queda arriba en el estacionamiento y se baja caminando.',
      resumen: 'Un pueblo sin calles: todo se recorre por pasarelas de ciprés colgadas sobre el fiordo, entre casas de madera y el agua verde del Baker. En lancha se llega a la Isla de los Muertos, monumento histórico con una historia rara de los trabajadores que murieron ahí en 1906.',
      consta: ['Bajar por las pasarelas desde el estacionamiento hasta la plaza', 'Recorrer los sectores del pueblo y los miradores', 'Lancha a la Isla de los Muertos: 30 min de navegación, 2,5 h en total, sale a las 09:00'],
      incluye: ['Isla de los Muertos: lancha y guía'],
      llevar: ['Zapatos con buena suela: las pasarelas resbalan con lluvia', 'Ropa impermeable'],
      ojo: ['La lancha sale con mínimo 5 personas, de septiembre a abril', 'Son 23 km de ripio desde la Carretera'],
      operadores: [{ n: 'Nomades', precio: '$36.000', link: 'https://www.nomades.com/caleta-tortel/isla-de-los-muertos-id2441' }],
      dispo: { estado: 'ojo', texto: 'El pueblo, cualquier día. La lancha a la isla, reservar el día antes.' },
      link: 'https://www.nomades.com/caleta-tortel/isla-de-los-muertos-id2441' },
    { id: 'ohiggins', nombre: "Glaciar O'Higgins en barco", donde: "Villa O'Higgins", precio: 'consultar (lago desde ≈ $60 mil)', nota: 'Unas 8 h de navegación, depende del clima.', reservar: true,
      resumen: "Navegación por el Lago O'Higgins hasta la pared del glaciar, que cae directo al agua desde el Campo de Hielo Sur. Es el final de la Carretera Austral y el premio de llegar hasta abajo.",
      consta: ["Salida desde Bahía Bahamondez, a 7 km de Villa O'Higgins", 'Navegación por el lago entre fiordos', "Parada frente al frente del glaciar O'Higgins", 'Vuelta a la bahía en la tarde'],
      llevar: ['Ropa abrigada: en cubierta hace mucho frío', 'Colación por si no venden a bordo'],
      ojo: ['Lo opera Robinson Crusoe con un barco de 60 a 80 personas', 'No sale todos los días y depende del viento'],
      dispo: { estado: 'ojo', texto: 'Escribir antes a Robinson Crusoe o Turismo Las Ruedas con las fechas 20 y 21.' },
      link: 'https://www.tur.com/es/villa-ohiggins-286/navegacion-villa-ohiggins-a-candelario-mancilla-1-1-1-1-1-26362-1995' },
    { id: 'barcaza', nombre: 'Barcaza Yungay ↔ Río Bravo', donde: "camino a O'Higgins", precio: 'gratis', nota: 'Subvencionada, 45 min.',
      resumen: 'El único cruce para seguir al sur: 45 min por el fiordo Mitchell con el auto arriba.',
      dispo: { estado: 'ok', texto: 'Sin reserva, por orden de llegada.' } }
  ],

  // Qué llevamos a la Austral (vamos con mochila scout y equipo de camping)
  equipo: {
    bodega: ['Carpa', 'Sacos de dormir para bajo 0 °C', 'Colchonetas o aislantes', 'Cocinilla y ollas, limpias y sin gas', 'Cortaplumas y servicio', 'Frontales', 'Ropa impermeable y primera capa térmica', 'Toalla de secado rápido', 'Bolsas para la basura: se baja todo'],
    mano: ['Carnet, pasajes y efectivo', 'Batería externa y cargadores (las baterías nunca van en bodega)', 'Un encendedor por persona', 'Remedios', 'Botella de agua vacía'],
    alla: ['Cartuchos de gas: no se pueden llevar en el avión. Comprar en Coyhaique o en la bomba de Balmaceda', 'Comida para los primeros días en el súper de Coyhaique: más al sur hay poco y caro', 'Llenar el estanque en cada bomba: entre Cochrane y Villa O\'Higgins no hay'],
    nota: 'Cada mochila scout va en bodega (hasta 23 kg). Con la carpa y la cocinilla repartidas, cabe en una por persona.'
  },

  // Tours en Guatemala y cómo están de cupos (revisado el 3 nov)
  actividadesCA: [
    { id: 'acatenango', nombre: 'Acatenango con noche en el volcán', donde: 'Antigua', precio: 'USD 102 a 119 + Q100 de entrada', nota: 'Sale temprano de Antigua y vuelve al otro día. Guardan la mochila grande gratis.', reservar: true,
      resumen: 'Se sube al Acatenango (3.976 m) y se duerme en un campamento frente al Volcán de Fuego, que tira lava cada 15 a 30 minutos. En la noche se ve rojo contra las estrellas y al amanecer se sube a la cumbre con Antigua, el Agua y el lago abajo.',
      consta: ['Nos buscan en Antigua temprano y vamos a la base (~1 h)', 'Subida de 4 a 6 h hasta el campamento (~3.600 m)', 'Opcional: caminata a la cresta del Fuego para verlo de cerca (se paga aparte)', 'Cena, fogata y el Fuego en erupción toda la noche', '~04:00 subida a la cumbre para el amanecer', 'Bajada y de vuelta en Antigua a almorzar'],
      incluye: ['Transporte desde Antigua', 'Guía', 'Cama en cabaña o carpa en el campamento', 'Comidas en el volcán', 'Bodega para la mochila grande'],
      llevar: ['Ropa de nieve de verdad: en la cumbre baja de 0 °C (arriendan en la base)', 'Frontal', 'Unos 4 L de agua por persona', 'Zapatos de trekking'],
      ojo: ['Es exigente: mucha subida en arena volcánica', 'OX Expeditions no recibe reservas online del 21 dic al 4 ene'],
      operadores: [{ n: 'Lava Trails', precio: 'USD 102 + Q100', link: 'https://lavatrails.rezdy.com/573187/acatenango-overnight-hike' }],
      dispo: { estado: 'agotado', texto: 'El 4 nov Lava Trails salía agotado online todo diciembre, incluidos el 28 y el 31 (enero sí tiene cupo). Hay que escribirles por WhatsApp por si liberan camas o buscar otra agencia. OX Expeditions no recibe reservas online del 21 dic al 4 ene.' },
      link: 'https://lavatrails.rezdy.com/573187/acatenango-overnight-hike' },
    { id: 'tikal', nombre: 'Tikal al amanecer', donde: 'Flores', precio: 'Q150 + Q100 el amanecer', nota: 'Shuttle a las 03:00 desde Flores.',
      resumen: 'La ciudad maya más grande, perdida en la selva. Se sube al Templo IV de noche y se espera el amanecer con las puntas de los templos saliendo entre la neblina y los monos aulladores gritando.',
      consta: ['03:00 shuttle desde Flores (~1 h 15)', 'Entrada ~04:00 con guía (obligatorio para el amanecer)', 'Amanecer arriba del Templo IV', 'Recorrido por la Gran Plaza, el Mundo Perdido y la selva', 'Vuelta a Flores a mediodía'],
      incluye: ['Shuttle y guía si se compra como tour'],
      llevar: ['Pasaporte (con él se compra el boleto)', 'Efectivo en quetzales', 'Frontal, repelente y algo de abrigo para la espera'],
      ojo: ['El boleto se compra antes en culturaguate.com. El del amanecer a veces lo cobran en efectivo en la entrada'],
      dispo: { estado: 'ok', texto: 'Todos los días. Comprar el boleto antes en boletos.culturaguate.com (con pasaporte).' },
      link: 'https://boletos.culturaguate.com/' },
    { id: 'semuc', nombre: 'Semuc Champey: pozas, cueva y tubing', donde: 'Lanquín', precio: 'Q150 a 250 el tour + Q100 de entrada', nota: 'Llevar efectivo: no hay cajeros en Lanquín.',
      resumen: 'Un puente natural de piedra sobre el río Cahabón con pozas turquesa una tras otra. El tour del día suma una cueva que se recorre nadando con una vela en la mano y bajar el río en neumático.',
      consta: ['Nos buscan en el hostal en camioneta (~45 min de camino malo)', "Cueva K'anba con velas, nadando y trepando", 'Tubing por el río', 'Subida al mirador (20 a 40 min) para la foto de las pozas', 'Tarde nadando en las pozas'],
      incluye: ['Transporte desde Lanquín', 'Guía en la cueva y neumático', 'Almuerzo en algunos hostales'],
      llevar: ['Traje de baño y zapatos que se puedan mojar', 'Efectivo para la entrada (Q100)', 'Bolsa estanca'],
      ojo: ['No hay cajeros en Lanquín: sacar plata antes', 'El camino a Lanquín es largo (8 a 9 h desde Antigua)'],
      dispo: { estado: 'ok', texto: 'Todos los días. Se reserva en el hostal la noche antes.' } },
    { id: 'hol-chan', nombre: 'Snorkel en Hol Chan', donde: 'Caye Caulker', precio: 'USD 90 a 115 + 15 del parque', nota: 'Con tiburones nodriza y mantarrayas.',
      resumen: 'Snorkel en la segunda barrera de coral más grande del mundo. En Shark Ray Alley se nada al lado de tiburones nodriza (son tranquilos) y mantarrayas, y en Hol Chan aparecen tortugas.',
      consta: ['Salida en bote desde Caye Caulker en la mañana', 'Reserva marina Hol Chan: corales, peces y tortugas', 'Shark Ray Alley: tiburones nodriza y mantarrayas', 'Almuerzo o fruta en el bote y vuelta en la tarde'],
      incluye: ['Bote, guía y equipo de snorkel'],
      llevar: ['Bloqueador que no dañe el coral', 'Polera para el sol en el agua', 'Efectivo para la entrada al parque (USD 15)'],
      dispo: { estado: 'ok', texto: 'Salidas diarias. Reservar en la isla un día antes.' } },
    { id: 'pacaya', nombre: 'Volcán Pacaya', donde: 'Antigua', precio: 'USD 25 a 35 con guía', nota: 'Medio día, fácil. Buen plan B si no hay cupo en Acatenango.',
      resumen: 'Un volcán activo y fácil a 80 min de Antigua. Se camina sobre ríos de lava ya fría y se tuestan malvaviscos en las grietas que todavía están calientes.',
      consta: ['Salida desde Antigua (en la mañana o a las 14:00 para el atardecer)', 'Subida de ~1,5 h (se puede arrendar caballo, ≈ Q300)', 'Campo de lava y malvaviscos en las rocas calientes', 'Vuelta a Antigua: 6 a 8 h en total'],
      incluye: ['Transporte y guía'],
      llevar: ['Efectivo para la entrada al parque', 'Malvaviscos', 'Cortaviento'],
      dispo: { estado: 'ok', texto: 'Todos los días desde Antigua.' } },
    { id: 'nariz-del-indio', fotos: 'atitlan', nombre: 'Amanecer en la Nariz del Indio', donde: 'Lago Atitlán', precio: '≈ Q100 con guía local (≈ $13 mil)', nota: 'Salida ~04:00 desde San Pedro o San Juan. 45 min de subida.',
      resumen: 'El mirador más famoso del lago: se sube de noche y el sol sale detrás de los volcanes con el lago y la neblina abajo. Es corto y vale cada minuto de madrugar.',
      consta: ['~04:00 nos buscan en San Pedro o San Juan en pickup', '45 min de subida con frontal', 'Amanecer arriba con café', 'Bajada y desayuno en el pueblo'],
      incluye: ['Transporte y guía de la comunidad'],
      llevar: ['Frontal y algo de abrigo', 'Efectivo en quetzales: no hay cajeros en Santa Clara ni San Juan'],
      ojo: ['Por internet lo venden a USD 40 o más: con una agencia de San Pedro sale ~Q100'],
      dispo: { estado: 'ok', texto: 'Todos los días. Se reserva en el pueblo la tarde antes.' },
      link: 'https://livinginguatemala.com/hiking/indian-nose/' },
    { id: 'chichi', nombre: 'Mercado de Chichicastenango', donde: 'cerca de Atitlán', precio: 'gratis (shuttle ≈ USD 15)', nota: 'El más grande de Centroamérica.',
      resumen: 'Mercado maya enorme con textiles, máscaras y flores, y en las escaleras de la iglesia de Santo Tomás se hacen ceremonias con incienso que mezclan lo católico y lo maya.',
      consta: ['Shuttle desde Panajachel o Antigua temprano', 'Mañana en el mercado y la iglesia de Santo Tomás', 'Cementerio de colores', 'Vuelta en la tarde'],
      llevar: ['Efectivo en billetes chicos para regatear', 'Bolsa grande'],
      ojo: ['No sacar fotos en la iglesia sin preguntar'],
      dispo: { estado: 'ojo', texto: 'Solo jueves y domingos: el dom 3 ene calza.' } }
  ],

  // ---------- Noche de Año Nuevo (jueves 31 dic) ----------
  // fotos: llaves de fotos-panoramas.js. noche: [hora, qué]. Revisado el 4 nov.
  anioNuevo: [
    { id: 'ny-acatenango', sello: 'el más memorable', titulo: 'Recibir el 2027 frente al Volcán de Fuego', donde: 'Acatenango · 3.600 m', fotos: ['acatenango'],
      precio: 'USD 102 + Q100 ≈ $112 mil c/u',
      resumen: 'La noche del 31 en el campamento del Acatenango, con el Fuego explotando lava al frente cada 15 a 30 minutos, y el 1 de enero subir a la cumbre para ver el primer amanecer del año sobre los volcanes. Algo que no vamos a repetir nunca.',
      noche: [
        ['mañana 31', 'Nos buscan en Antigua y empezamos a subir'],
        ['tarde', 'Llegamos al campamento. Si hay ganas, la cresta del Fuego para verlo de cerca'],
        ['noche', 'Cena caliente y fogata, con el Fuego tirando lava en la oscuridad'],
        ['00:00', 'Brindis frente al volcán. Con cielo despejado se ven luces y fuegos artificiales de los pueblos abajo'],
        ['04:00 · 1 ene', 'Subida a la cumbre (3.976 m) para el primer amanecer del año'],
        ['mediodía', 'De vuelta en Antigua a almorzar y dormir']
      ],
      ojo: ['Hay que correr el Acatenango del 28 al 31 en la ruta (el 28 y 29 quedan para Antigua)', 'El 4 nov Lava Trails salía agotado online el 31 (y todo diciembre): preguntarles por WhatsApp o buscar otra agencia', 'Hace frío de verdad: bajo 0 °C en la cumbre', 'Los fuegos artificiales desde arriba dependen de las nubes: no está asegurado', 'El 1 ene hay pocos shuttles: mejor dormir esa noche en Antigua y seguir el 2'],
      costo: [['tour con carpa y comida', 99000], ['entrada al parque (Q100)', 13000], ['espumante chico para arriba', 5000]],
      cena: ['La cena caliente la da el tour en el campamento', 'Subir chocolate, maní y algo dulce para la medianoche', 'Un espumante chico (el alcohol pega más a 3.600 m: uno para los dos)', '12 uvas en una bolsa'],
      llevar: ['Ropa de nieve: bajo 0 °C en la cumbre', 'Frontal con pilas nuevas', 'Bastones (se arriendan en Antigua)', '4 L de agua cada uno'],
      siFalla: 'Si sigue agotado o el volcán está cerrado, el plan de respaldo es la cena en el cerro y la Plaza Mayor de Antigua.',
      links: [{ t: 'Reservar en Lava Trails', url: 'https://lavatrails.rezdy.com/573187/acatenango-overnight-hike' }],
      calza: 'Calza en todas las rutas cambiando el orden de los días en Antigua.' },
    { id: 'ny-antigua', sello: 'el más fiestero', titulo: 'Cena en el cerro y fuegos en la Plaza Mayor', donde: 'Antigua Guatemala', fotos: ['ny-cerro', 'ny-plaza'],
      precio: 'cena ≈ Q180 c/u (≈ $23 mil) · la plaza es gratis',
      resumen: 'Cenar en El Tenedor del Cerro, en la ladera del Cerro de la Cruz, con Antigua iluminada abajo y el Volcán de Agua al frente, y después bajar a la Plaza Mayor a la fiesta con fuegos artificiales sobre la Catedral. Toda la ciudad sale a la calle.',
      noche: [
        ['tarde', 'Siesta y arreglarse. Antigua ya está de fiesta'],
        ['19:30', 'Cena en El Tenedor del Cerro, con la vista de la ciudad y el volcán'],
        ['22:00', 'Bajar caminando por la Calle del Arco, bajo el Arco de Santa Catalina'],
        ['23:00', 'Fiesta gratis en la Plaza Mayor con DJ (así fue para recibir el 2026)'],
        ['00:00', 'Fuegos artificiales sobre la Catedral con los volcanes de fondo, y cohetes en cada esquina'],
        ['después', 'A la casa caminando: Antigua es chica']
      ],
      ojo: ['El programa de la muni para el 2027 todavía no sale: revisarlo en diciembre', 'Reservar mesa con tiempo y preguntar si el 31 hacen menú especial (+502 7820-1220)', 'El shuttle del hotel solo corre de viernes a domingo y el 31 es jueves: subir en tuk-tuk o Uber', 'La plaza se repleta: llevar poco en los bolsillos'],
      costo: [['cena en El Tenedor del Cerro', 23000], ['tuk-tuk o Uber de ida', 3000], ['vino en la plaza', 5000]],
      cena: ['Menú del 31 en El Tenedor del Cerro (preguntar si hay menú especial)', 'Para la plaza: una botella chica y 12 uvas compradas en el mercado'],
      llevar: ['Chaqueta liviana: en Antigua refresca de noche', 'Poco en los bolsillos', 'Zapatillas: las calles son de piedra'],
      siFalla: 'Si llueve, la fiesta igual sigue bajo los portales de la plaza.',
      links: [{ t: 'El Tenedor del Cerro', url: 'https://www.degusta.com.gt/antigua/restaurante/el-tenedor-del-cerro_100559_fecha_3_todos.html' }, { t: 'Año Nuevo en Guatemala', url: 'https://livinginguatemala.com/events/new-years-eve-in-guatemala/' }],
      calza: 'Es el plan de la ruta Clásica + Semuc: ya estamos en Antigua el 30 y 31.' },
    { id: 'ny-atitlan', sello: 'el más romántico', titulo: 'Una pieza colgada en el acantilado del lago', donde: 'La Casa del Mundo · Lago Atitlán', fotos: ['ny-lago'],
      precio: 'Standard USD 118 la noche (≈ $57 mil c/u) · Suite con balcón USD 145 (≈ $70 mil c/u)',
      resumen: 'Un hotel construido en la roca sobre el lago, en Jaibalito, al que solo se llega en lancha. Cena familiar en mesa compartida, el lago con los tres volcanes al frente y a medianoche los fuegos de San Pedro y los pueblos de la orilla reflejados en el agua.',
      noche: [
        ['tarde 31', 'Lancha desde Panajachel o San Pedro a Jaibalito, con luz'],
        ['atardecer', 'En el balcón mirando los volcanes Atitlán, Tolimán y San Pedro'],
        ['cena', 'Comida casera en mesa compartida con los otros huéspedes'],
        ['00:00', 'Brindis en la terraza con los fuegos de los pueblos sobre el lago'],
        ['1 ene', 'Desayuno con el lago quieto y lancha a San Marcos o San Pedro']
      ],
      ojo: ['Solo se llega en lancha. La última pública sale 19:30 de Panajachel y 17:30 de San Pedro', 'Lo mejor es llegar el 30 y quedarse dos noches', 'La económica (USD 65) es con baño compartido', 'Es chico y se llena: reservar ya (casamundo@gmail.com)'],
      costo: [['pieza Standard, la mitad', 57000], ['cena familiar', 20000, true], ['lancha ida y vuelta', 5000]],
      cena: ['Cena familiar del hotel en mesa compartida (reservarla al llegar)', 'Llevar espumante y 12 uvas desde Panajachel'],
      llevar: ['Linterna para las escaleras del hotel', 'Traje de baño: se nada en el lago', 'Efectivo en quetzales para las lanchas'],
      siFalla: 'Si el lago se pone bravo en la tarde (el Xocomil), tomar la lancha antes de las 15:00.',
      links: [{ t: 'Reservar en La Casa del Mundo', url: 'https://hotels.cloudbeds.com/reservation/EbWilf' }, { t: 'Cómo es el hotel', url: 'https://www.islands.com/1853329/la-casa-del-mundo-guatemala-most-magical-hotel-breathtaking-hideaway-scenic-lakeside-cliff' }],
      calza: 'Es el plan de la ruta Guatemala + Belice (Año Nuevo en Atitlán). En la Clásica habría que cambiar Antigua por Atitlán el 30 y 31.' }
  ],

  // Barcaza Puerto Yungay ↔ Río Bravo (temporada media: oct, nov, dic, mar · actualizado oct 2026)
  barcaza: {
    ida: ['08:00', '10:00', '12:00', '13:00', '15:00', '16:00', '17:00', '18:00'],
    vuelta: ['09:00', '11:00', '13:00', '14:00', '16:00', '17:00', '18:00', '19:00'],
    nota: 'Los viernes sale una extra a las 08:10 desde Yungay. Sin reserva: se embarca por orden de llegada. Fuente: carretera-austral.cl.'
  },

  // ---------- Austral 2.0: vuelos por tramo (por persona, CLP) ----------
  // Se compran por separado: se elige una ida y una vuelta (el 23 o el 24).
  // manual: true = SKY no publica precio en Google Vuelos; se revisó a mano en skyairline.com.
  // maleta: lo que sube la tarifa por tramo con una maleta de 23 kg (SKY Standard vs Basic: real).
  // LATAM: gratis, los dos tenemos WorldMember Santander (1 maleta de 23 kg al titular, vigente hasta el 31 dic 2026).
  vuelosAustral: {
    maleta: { LATAM: { monto: 0 }, SKY: { monto: 40000 } },
    idas: [
      { id: 'au-ida-1430', aerolinea: 'LATAM', dia: 'dom 13 dic', sale: '14:30', llega: '16:49', dur: '2 h 19 min', escalas: 'directo', precio: 190972, recomendado: true, sello: 'después de almuerzo' },
      { id: 'au-ida-1257', aerolinea: 'LATAM', dia: 'dom 13 dic', sale: '12:57', llega: '15:15', dur: '2 h 18 min', escalas: 'directo', precio: 182116, nota: 'Almuerzo al paso, pero llegamos con más luz.' },
      { id: 'au-ida-sky-0829', aerolinea: 'SKY', dia: 'dom 13 dic', sale: '08:29', llega: '12:00', dur: '3 h 31 min', escalas: '1 escala', precio: 160990, manual: true, nota: 'La más barata, pero a las 08:29 después del matrimonio.' }
    ],
    vueltas: [
      { id: 'au-v24-1500', fecha: 24, aerolinea: 'LATAM', dia: 'jue 24 dic', sale: '15:00', llega: '18:30', dur: '3 h 30 min', escalas: '1 escala', precio: 122059, recomendado: true, sello: 'volver el 24', nota: 'Llegamos a la cena de Nochebuena y el 23 no es un día de 290 km apurados.' },
      { id: 'au-v24-1418', fecha: 24, aerolinea: 'LATAM', dia: 'jue 24 dic', sale: '14:18', llega: '16:38', dur: '2 h 20 min', escalas: 'directo', precio: 152239 },
      { id: 'au-v24-sky', fecha: 24, aerolinea: 'SKY', dia: 'jue 24 dic', sale: '13:31', llega: '20:00', dur: '6 h 29 min', escalas: '1 escala', precio: 86181, manual: true, nota: 'Escala larga: llegamos justo a la cena. Más barato sin maleta, pero con la mochila en bodega sale más caro que LATAM.' },
      { id: 'au-v23-1500', fecha: 23, aerolinea: 'LATAM', dia: 'mié 23 dic', sale: '15:00', llega: '18:41', dur: '3 h 41 min', escalas: '1 escala', precio: 162059 },
      { id: 'au-v23-1525', fecha: 23, aerolinea: 'LATAM', dia: 'mié 23 dic', sale: '15:25', llega: '17:45', dur: '2 h 20 min', escalas: 'directo', precio: 220059 },
      { id: 'au-v23-sky', fecha: 23, aerolinea: 'SKY', dia: 'mié 23 dic', sale: '12:59', llega: '16:31', dur: '3 h 32 min', escalas: '1 escala', precio: 178059, manual: true }
    ]
  },
  linkAustral: {
    23: 'https://www.google.com/travel/flights?q=Flights%20from%20SCL%20to%20BBA%20on%202026-12-13%20through%202026-12-23&curr=CLP&hl=es&gl=CL',
    24: 'https://www.google.com/travel/flights?q=Flights%20from%20SCL%20to%20BBA%20on%202026-12-13%20through%202026-12-24&curr=CLP&hl=es&gl=CL',
    sky: 'https://initial-sale.skyairline.com/es/chile?origin=SCL&destination=BBA&departureDate=2026-12-13&arrivalDate=2026-12-24&flightType=RT&ADT=1'
  },

  // ---------- Calculadora ----------
  // tipo 'cada' = cada uno paga eso · tipo 'mitad' = es un total que se divide a la mitad
  presupuesto: {
    // La idea: que ronde entre $2,6 y $3,1 M por persona (no es un tope duro)
    tope: { min: 2600000, max: 3100000 },
    centroamerica: [
      { id: 'ca-aloj', nombre: 'Alojamiento (pieza doble, temporada alta)', unitario: 45000, cantidad: 14, unidad: 'noches', tipo: 'mitad' },
      { id: 'ca-comida', nombre: 'Comida', unitario: 15000, cantidad: 15, unidad: 'días', tipo: 'cada' },
      { id: 'ca-transp', nombre: 'Transporte interno (shuttles, lanchas)', unitario: 150000, cantidad: 1, unidad: 'total', tipo: 'cada' },
      { id: 'ca-activ', nombre: 'Tours y entradas (Acatenango, Tikal, Semuc y lo de cada lugar)', unitario: 240000, cantidad: 1, unidad: 'total', tipo: 'cada' },
      { id: 'ca-extras', nombre: 'Extras e imprevistos (Año Nuevo incluido)', unitario: 80000, cantidad: 1, unidad: 'total', tipo: 'cada' }
    ],
    // Arriendo, bencina y cantidad de días se recalculan al elegir el auto o la vuelta (el 23 o el 24)
    austral: [
      { id: 'au-auto', nombre: 'Arriendo de auto (sale del auto elegido)', unitario: 26155, cantidad: 11, unidad: 'días', tipo: 'mitad' },
      { id: 'au-bencina', nombre: 'Bencina (~1.450 km, según el auto)', unitario: 135000, cantidad: 1, unidad: 'total', tipo: 'mitad' },
      { id: 'au-aloj', nombre: 'Alojamiento (casi todo carpa, 3 noches con techo)', unitario: 28000, cantidad: 11, unidad: 'noches', tipo: 'mitad' },
      { id: 'au-comida', nombre: 'Comida (cocinamos casi siempre)', unitario: 10000, cantidad: 12, unidad: 'días', tipo: 'cada' },
      { id: 'au-equipo', nombre: 'Gas y lo que falte del equipo (se compra allá)', unitario: 30000, cantidad: 1, unidad: 'total', tipo: 'mitad' },
      { id: 'au-activ', nombre: 'Tours y entradas (Capillas, Exploradores)', unitario: 190000, cantidad: 1, unidad: 'total', tipo: 'cada' }
    ],
    seguro: 39700 // ~USD 40 por persona, si la tarjeta no lo cubre
  }
};
