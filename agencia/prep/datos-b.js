// Datos del plan B · Agencia de Viajes SiempreLab
// Plan B (conversado el 4 nov): playa barata antes de Navidad y la Austral larga después.
// Antes de Navidad (14 al 21 dic): una semana de playa, que vuelo + hotel no pase de $800 mil c/u.
// Después de Navidad (26 dic al 9 ene): la Austral con 14 noches, para hacerla entera y sin apuro.
// Precios vistos el 4 nov en Google Vuelos, Google Hoteles y Kayak. Lo que tiene id en precios.json se actualiza solo.

const DATOS_B = {
  // Lo que se le puede gastar a la playa, por persona (vuelo + maleta + hotel + traslados)
  topePlaya: 800000,

  // Black Friday en Chile (Cámara de Comercio de Santiago): vie 27 al lun 30 nov
  blackFriday: { desde: '2026-11-27', hasta: '2026-11-30' },

  // ---------- Antes de Navidad: la playa ----------
  // vuelo: ida y vuelta por persona, lun 14 → lun 21 dic (Google Vuelos, 4 nov).
  // extraMano: lo que suma la maleta de mano si la tarifa base no la trae (JetSMART). estimado: true = no salió de la búsqueda.
  // hoteles: pieza doble por noche para los dos (Google Hoteles, 14 al 21 dic). todoIncluido: no hay que pagar comida.
  // traslado: aeropuerto ↔ hotel, ida y vuelta por persona (estimado). comida: por persona y por día si no es todo incluido.
  playa: {
    noches: 7,
    ida: 'lun 14 dic',
    vuelta: 'lun 21 dic',
    opciones: [
      {
        id: 'florianopolis',
        lugar: 'florianopolis',
        nombre: 'Florianópolis',
        sello: 'la más barata',
        resumen: 'La isla de las 40 playas, a 3 h y media en vuelo directo. Antes de Navidad todavía está tranquila: la temporada alta parte el 26.',
        clima: 'Diciembre: 25 °C y el mar a 22 °C. Algún día puede llover.',
        vuelo: { id: 'playa-fln', aerolinea: 'JetSMART', codigo: 'FLN', ida: '16:34 → 19:55', dur: '3 h 21 min', escalas: 'directo', precio: 270787,
          extraMano: { monto: 50000, estimado: true }, nota: 'La tarifa base de JetSMART trae solo un bolso chico: la maleta de mano se paga aparte.' },
        hoteles: [
          { n: 'Pousada Casa Campeche', p: 86638, r: '4,9', tipo: 'con desayuno', zona: 'Campeche' },
          { n: 'Jurerê Beach Village', p: 158701, r: '4,6', tipo: 'con desayuno, frente al mar', zona: 'Jurerê' },
          { n: 'Hotel Costa Norte Ponta das Canas', p: 166181, r: '4,6', tipo: 'con desayuno', zona: 'Ponta das Canas' }
        ],
        base: 0,
        traslado: { p: 15000, texto: 'Uber del aeropuerto (30 a 45 min)' },
        comida: 25000,
        ojo: ['El agua es más fría que en el nordeste', 'Para cambiar de playa conviene Uber o arrendar un auto un par de días', 'Jurerê es lo más parecido a un resort: Campeche es más de pueblo y surf'],
        busca: 'hoteles Florianópolis 14 al 21 de diciembre 2026'
      },
      {
        id: 'buzios',
        lugar: 'buzios',
        nombre: 'Búzios',
        sello: 'la más linda',
        resumen: 'Veinte playas chicas en una península, a 2 h y media de Río. De día Geribá o João Fernandes y de noche la Rua das Pedras.',
        clima: 'Diciembre: 29 °C y el mar a 23 °C. Verano de Río: chubascos cortos en la tarde.',
        vuelo: { id: 'playa-gig', aerolinea: 'JetSMART', codigo: 'GIG', ida: '04:21 → 08:35', dur: '4 h 14 min', escalas: 'directo', precio: 322628,
          extraMano: { monto: 50000, estimado: true }, nota: 'Sale 04:21 (hay otro a las 20:58 con escala por $353 mil). Maleta de mano aparte.' },
        hoteles: [
          { n: 'Pousada Península de Búzios', p: 86774, r: '4,8', tipo: 'con desayuno', zona: 'centro' },
          { n: 'Atlântico Búzios', p: 99818, r: '4,5', tipo: 'con desayuno y piscina', zona: 'Praia Rasa' },
          { n: 'Pousada Byblos', p: 108434, r: '4,7', tipo: 'con desayuno, vista a la bahía', zona: 'centro' }
        ],
        base: 0,
        traslado: { p: 45000, texto: 'Bus 1001 o transfer desde el aeropuerto de Río (2,5 a 3 h)' },
        comida: 28000,
        ojo: ['Suma un traslado largo desde Río a la ida y a la vuelta', 'Las playas se recorren en taxi acuático o a pie'],
        busca: 'hoteles Búzios 14 al 21 de diciembre 2026'
      },
      {
        id: 'porto-de-galinhas',
        lugar: 'porto-de-galinhas',
        nombre: 'Porto de Galinhas',
        sello: 'el mar más tibio',
        resumen: 'Agua a 28 °C y piscinas naturales entre los arrecifes cuando baja la marea. Muro Alto, al lado, es como una laguna de mar.',
        clima: 'Diciembre es temporada seca: 29 °C y el mar a 28 °C.',
        vuelo: { id: 'playa-rec', aerolinea: 'LATAM', codigo: 'REC', ida: '20:35 → 10:30 (+1)', dur: '13 h 55 min', escalas: '1 escala en São Paulo', precio: 439533,
          extraMano: 0, nota: 'Sale de noche y llega a media mañana. Con la WorldMember la maleta en bodega va gratis.' },
        hoteles: [
          { n: 'Pousada Atlantic Porto de Galinhas', p: 79671, r: '4,7', tipo: 'con desayuno', zona: 'pueblo' },
          { n: 'Beira Mar Porto de Galinhas', p: 95598, r: '4,5', tipo: 'con desayuno, frente al mar', zona: 'pueblo' },
          { n: 'Hotel Armação', p: 159680, r: '4,7', tipo: 'con desayuno, resort chico', zona: 'Praia do Cupe' }
        ],
        base: 1,
        traslado: { p: 32000, texto: 'Transfer desde el aeropuerto de Recife (1 h)' },
        comida: 25000,
        ojo: ['Las piscinas naturales dependen de la marea: mirar la tabla y salir con marea baja', 'El primer día se va en el viaje: llegamos a media mañana del martes'],
        busca: 'hoteles Porto de Galinhas 14 al 21 de diciembre 2026'
      },
      {
        id: 'maceio',
        lugar: 'maceio',
        nombre: 'Maceió todo incluido',
        sello: 'todo incluido',
        resumen: 'El resort de verdad: Pratagy, con comida y tragos incluidos, piscinas y playa propia. Se pasa del tope, pero no hay que pagar nada más allá.',
        clima: 'Diciembre es temporada seca: 29 °C y el mar a 27 °C.',
        vuelo: { id: 'playa-mcz', aerolinea: 'LATAM', codigo: 'MCZ', ida: '20:35 → 10:35 (+1)', dur: '14 h', escalas: '1 escala en São Paulo', precio: 492416,
          extraMano: 0, nota: 'Sale de noche y llega a media mañana. Maleta en bodega gratis con la WorldMember.' },
        hoteles: [
          { n: 'Pratagy Beach All Inclusive Resort', p: 224869, r: '4,7', tipo: 'todo incluido', zona: 'Pratagy', todoIncluido: true },
          { n: 'Maceió Mar Hotel', p: 91639, r: '4,5', tipo: 'con desayuno', zona: 'Ponta Verde' }
        ],
        base: 0,
        traslado: { p: 20000, texto: 'Transfer desde el aeropuerto (40 min)' },
        comida: 25000,
        ojo: ['Es la única de la lista con todo incluido que se acerca al presupuesto', 'Maragogi queda a 2 h: el paseo a las galés se paga aparte'],
        busca: 'Pratagy Beach All Inclusive Resort 14 al 21 de diciembre 2026'
      },
      {
        id: 'cartagena',
        lugar: 'cartagena',
        nombre: 'Caribe en Cartagena',
        sello: 'el caribe',
        resumen: 'La referencia del Caribe: el Decameron todo incluido en Bocagrande, con la ciudad amurallada a 10 min. Con el vuelo, se pasa harto.',
        clima: 'Diciembre: 31 °C y el mar a 28 °C. Empieza la temporada seca.',
        vuelo: { id: 'playa-ctg', aerolinea: 'JetSMART', codigo: 'CTG', ida: '02:13 → 17:10', dur: '17 h', escalas: '1 escala en Lima', precio: 503916,
          extraMano: { monto: 50000, estimado: true }, nota: 'Sale de madrugada y llega en la tarde. Maleta de mano aparte.' },
        hoteles: [
          { n: 'Decameron Cartagena', p: 259604, r: '4,2', tipo: 'todo incluido', zona: 'El Laguito', todoIncluido: true },
          { n: 'Hotel Almirante Cartagena', p: 123142, r: '4,5', tipo: 'con desayuno', zona: 'Bocagrande' }
        ],
        base: 0,
        traslado: { p: 8000, texto: 'Taxi desde el aeropuerto (15 min)' },
        comida: 30000,
        ojo: ['Las playas lindas (Islas del Rosario, Barú) son en lancha, aparte', 'San Andrés todo incluido sale parecido o más: $280 a 415 mil la noche'],
        busca: 'Decameron Cartagena 14 al 21 de diciembre 2026'
      }
    ],
    descartados: 'Punta Cana y Cancún no entran: solo el vuelo pasa los $860 mil por persona. Todo incluido en Natal, Praia do Forte o San Andrés sale $225 a 415 mil la noche, más que el Pratagy.'
  },

  // ---------- Después de Navidad: la Austral larga ----------
  // Vuelos por tramo, por persona. LATAM: bodega gratis con la WorldMember (vigente hasta el 31 dic 2026: la vuelta del 9 ene queda fuera, ojo).
  vuelosAU: {
    idas: [
      { id: 'au2-ida-1357', aerolinea: 'LATAM', dia: 'sáb 26 dic', sale: '13:57', llega: '16:15', dur: '2 h 18 min', escalas: 'directo', precio: 221990, recomendado: true, sello: 'directo, después de Navidad' },
      { id: 'au2-ida-1432', aerolinea: 'LATAM', dia: 'sáb 26 dic', sale: '14:32', llega: '16:50', dur: '2 h 18 min', escalas: 'directo', precio: 221990 },
      { id: 'au2-ida-0529', aerolinea: 'LATAM', dia: 'sáb 26 dic', sale: '05:29', llega: '09:17', dur: '3 h 48 min', escalas: '1 escala', precio: 195990, nota: 'La más barata y ganamos la tarde, pero sale a las 05:29 después de la cena de Navidad.' }
    ],
    vueltas: [
      { id: 'au2-v9-1017', aerolinea: 'LATAM', dia: 'sáb 9 ene', sale: '10:17', llega: '12:37', dur: '2 h 20 min', escalas: 'directo', precio: 120439, recomendado: true, sello: 'directo', nota: 'Llegamos a mediodía del sábado: la Jo tiene el sábado y el domingo antes del internado.' },
      { id: 'au2-v9-0952', aerolinea: 'LATAM', dia: 'sáb 9 ene', sale: '09:52', llega: '14:44', dur: '4 h 52 min', escalas: '1 escala', precio: 127181 }
    ],
    nota: 'Google marca estas fechas como caras: es temporada alta y no van a bajar. SKY vuela el dom 27 a las 07:35 y el sáb 9 a las 11:43, pero no publica precio en Google: mirarlo en skyairline.com.',
    link: 'https://www.google.com/travel/flights?q=Flights%20from%20SCL%20to%20BBA%20on%202026-12-26%20through%202027-01-09&curr=CLP&hl=es&gl=CL',
    sky: 'https://initial-sale.skyairline.com/es/chile?origin=SCL&destination=BBA&departureDate=2026-12-27&arrivalDate=2027-01-09&flightType=RT&ADT=1'
  },

  // Auto en Balmaceda, sáb 26 dic 17:00 → sáb 9 ene 08:00 (14 días). Kayak, 4 nov: solo quedaban 4 autos y todos de Rentcars.
  autos: {
    dias: 14,
    km: 2100,
    link: 'https://www.kayak.cl/cars/BBA/2026-12-26-17h/2027-01-09-08h?sort=price_a',
    opciones: [
      { id: 'b-tucson', agencia: 'Rentcars', modelo: 'Hyundai Tucson o similar', tipo: 'SUV compacto · automático', total: 585298, consumo: 11, combustible: 'bencina', recomendado: true, sello: 'la mejor que queda',
        traccion: '4x2', despeje: 170, maletero: 539,
        foto: { src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Hyundai_Tucson_%28NX4%29_1X7A0424.jpg/960px-Hyundai_Tucson_%28NX4%29_1X7A0424.jpg', credito: 'Alexander Migl · CC BY-SA 4.0' },
        nota: 'SUV automático con harto maletero. Es bajo para el ripio (17 cm): ir sin apuro. Hay que llamar para coordinar la entrega en el aeropuerto.' },
      { id: 'b-virtus', agencia: 'Rentcars', modelo: 'Volkswagen Virtus o similar', tipo: 'sedán · automático', total: 525350, consumo: 15, combustible: 'bencina',
        traccion: '4x2', despeje: 150, maletero: 521,
        foto: { src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3a/Volkswagen_Virtus_1.6_MSi_Trendline_2023.jpg/960px-Volkswagen_Virtus_1.6_MSi_Trendline_2023.jpg', credito: 'RL GNZLZ · CC BY-SA 2.0' },
        nota: 'El más barato y el que menos gasta, pero es un sedán bajo: para 2.000 km con harto ripio no lo tomaría.' },
      { id: 'b-tiguan', agencia: 'Rentcars', modelo: 'Volkswagen Tiguan o similar', tipo: 'SUV mediano · automático', total: 1047494, consumo: 10, combustible: 'bencina',
        traccion: '4x2', despeje: 200, maletero: 615,
        foto: { src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/Volkswagen_Tiguan_Allspace_FL_1X7A0302.jpg/960px-Volkswagen_Tiguan_Allspace_FL_1X7A0302.jpg', credito: 'Alexander Migl · CC BY-SA 4.0' },
        nota: 'Más alto y más grande, pero cuesta casi el doble.' }
    ],
    ojo: 'Sixt y Salfa (los del plan A y de 2025) no aparecen en Kayak para estas fechas: escribirles directo antes de tomar el de Rentcars. En enero los autos en Balmaceda se acaban: si vamos con este plan, el auto se reserva el mismo viernes.'
  },

  // ---------- La ruta: 14 noches ----------
  ruta: {
    nombre: 'Austral larga',
    resumen: 'De Cerro Castillo al fin del camino y la vuelta por el otro lado del lago. Sin días eternos: el más largo es de 5 h.',
    mapaRuta: ['Aeropuerto Balmaceda', 'Villa Cerro Castillo', 'Puerto Río Tranquilo', 'Puerto Bertrand', 'Cochrane', 'Caleta Tortel', "Villa O'Higgins", 'Cochrane', 'Chile Chico', 'Puerto Ibáñez', 'Aeropuerto Balmaceda'],
    paradas: [
      { dias: 'D1 · sáb 26 dic', lugar: 'cerro-castillo', titulo: 'Balmaceda → Cerro Castillo', detalle: 'Llegamos 16:15 con la Navidad recién comida. Auto en el aeropuerto, súper en el camino y a la primera carpa.', manejo: '95 km · 1,5 h · pavimento' },
      { dias: 'D2 · dom 27', lugar: 'general-carrera', titulo: 'Rumbo a Río Tranquilo', detalle: 'El primer tramo nuevo, bordeando el General Carrera, con parada en Bahía Murta.', manejo: '125 km · 2,5 h · ripio' },
      { dias: 'D3 · lun 28', lugar: 'capillas-marmol', titulo: 'Capillas de Mármol', detalle: 'Kayak o lancha temprano, con el lago quieto. Tarde libre.', manejo: 'sin auto' },
      { dias: 'D4 · mar 29', lugar: 'exploradores', titulo: 'Glaciar Exploradores', detalle: 'Caminata sobre el hielo, día completo. Si amanece lloviendo, se cambia con el día de las Capillas.', manejo: '52 km por lado · ripio' },
      { dias: 'D5 · mié 30', lugar: 'confluencia-baker', titulo: 'Bertrand y el Baker', detalle: 'La confluencia, rafting si hay ganas y a dormir al Valle Chacabuco.', manejo: '140 km · 3 h · ripio' },
      { dias: 'D6 · jue 31', lugar: 'parque-patagonia', titulo: 'Año Nuevo en el Parque Patagonia', detalle: 'Lagunas Altas en la mañana, con guanacos. En la noche, lo que elijamos para recibir el 2027.', manejo: 'sin auto' },
      { dias: 'D7 · vie 1 ene', lugar: 'tortel', titulo: 'Rumbo a Caleta Tortel', detalle: 'El 1 de enero sin apuro: Cochrane a llenar el estanque y bajada a Tortel.', manejo: '145 km · 3 h · ripio' },
      { dias: 'D8 · sáb 2', lugar: 'tortel', titulo: 'Tortel e Isla de los Muertos', detalle: 'Lancha a la isla en la mañana y pasarelas en la tarde.', manejo: 'sin auto' },
      { dias: 'D9 · dom 3', lugar: 'villa-ohiggins', titulo: 'Al fin del camino', detalle: 'Barcaza Yungay → Río Bravo y los últimos 100 km de la Carretera.', manejo: '145 km + barcaza · 4 h' },
      { dias: 'D10 · lun 4', lugar: 'villa-ohiggins', titulo: "Glaciar O'Higgins", detalle: 'Navegación al glaciar si sale ese día. Si no, miradores y el hito del km 1.240.', manejo: 'sin auto' },
      { dias: 'D11 · mar 5', lugar: 'carretera-austral', titulo: 'De vuelta a Cochrane', detalle: 'Barcaza de vuelta y a Cochrane. Si queda energía, la Reserva Tamango en la tarde.', manejo: '230 km + barcaza · 5 h' },
      { dias: 'D12 · mié 6', lugar: 'chile-chico', titulo: 'Paso Las Llaves a Chile Chico', detalle: 'La vuelta por el otro lado del lago: un camino colgado sobre el General Carrera hasta el pueblo más soleado de Aysén.', manejo: '170 km · 4 h · ripio' },
      { dias: 'D13 · jue 7', lugar: 'chile-chico', titulo: 'Reserva Jeinimeni', detalle: 'Lagunas verdes, la Piedra Clavada y la Cueva de las Manos.', manejo: '60 km por lado · ripio' },
      { dias: 'D14 · vie 8', lugar: 'cerro-castillo', titulo: 'Cruce del lago y última noche', detalle: 'Barcaza Chile Chico → Puerto Ibáñez (2 h, por confirmar) y a Cerro Castillo. Si no sale, se vuelve por Guadal (6 h).', manejo: '~100 km + barcaza' },
      { dias: 'D15 · sáb 9', lugar: null, titulo: 'Vuelta', detalle: 'Salir 07:30, devolver el auto y vuelo 10:17. A mediodía en Santiago.', manejo: '95 km · 1,5 h' }
    ],
    extra: 'Son ~2.100 km. La única pieza por confirmar es la barcaza Chile Chico → Ibáñez: si no está andando, el último día es de 6 h por tierra.'
  },

  // Noche por noche (pieza doble por noche para los dos, Google Hoteles 4 nov; las de enero con fechas de enero)
  dormir: [
    { noche: 'sáb 26', donde: 'Villa Cerro Castillo', camping: 10000, techo: [{ n: 'Refugio Casa Piedra', p: 39585, r: '4,2' }, { n: 'Vientos del Sur', p: 46988, r: '4,9' }], extra: 'Precio visto para diciembre: confirmar.', busca: 'alojamiento Villa Cerro Castillo 26 al 27 de diciembre 2026' },
    { noche: 'dom 27 a lun 29', donde: 'Puerto Río Tranquilo (3 noches)', camping: 10000, techo: [{ n: 'Rimaya Hostel', p: 69360, r: '4,7' }, { n: 'Cabañas Siempre Verde', p: 98808, r: '4,8' }, { n: 'Patagonia Acres Lodge', p: 173790, r: '4,7' }], busca: 'alojamiento Puerto Río Tranquilo 27 al 30 de diciembre 2026' },
    { noche: 'mié 30', donde: 'Valle Chacabuco (Parque Patagonia)', camping: 10000, campingNota: 'Camping West Winds', techo: [{ n: 'Cabañas Buena Vista (Bertrand)', p: 122097, r: '4,3' }], busca: 'alojamiento Puerto Bertrand 30 al 31 de diciembre 2026' },
    { noche: 'jue 31 · Año Nuevo', donde: 'Según lo que elijamos', camping: 10000, campingNota: 'West Winds', techo: [{ n: 'Cabañas Sol de la Patagonia (Guadal)', p: 75829, r: '4,9' }, { n: 'Patagonia 47g', p: 129882, r: '4,7' }, { n: 'El Arrayán', p: 182676, r: '4,9' }], busca: 'alojamiento Puerto Bertrand 31 de diciembre 2026 al 1 de enero 2027' },
    { noche: 'vie 1 y sáb 2', donde: 'Caleta Tortel (2 noches)', camping: 8000, techo: [], extra: 'Nada publica precio en línea: hospedajes familiares (~$40 a 60 mil) por WhatsApp.', busca: 'alojamiento Caleta Tortel 1 al 3 de enero 2027' },
    { noche: 'dom 3 y lun 4', donde: "Villa O'Higgins (2 noches)", camping: 10000, techo: [{ n: 'Hostal Puesto Canogas', p: 116834, r: '4,6' }, { n: 'Rumbo Sur Hotel', p: 257032, r: '4,6' }], extra: 'Precio de diciembre. Hay poco y se llena.', busca: "alojamiento Villa O'Higgins 3 al 5 de enero 2027" },
    { noche: 'mar 5', donde: 'Cochrane', camping: 8000, techo: [{ n: 'SURí refugios', p: 39566, r: '5,0' }, { n: 'Mate Sur Hostel', p: 63242, r: '4,4' }], busca: 'alojamiento Cochrane 5 al 6 de enero 2027' },
    { noche: 'mié 6 y jue 7', donde: 'Chile Chico (2 noches)', camping: 10000, techo: [{ n: 'Hotel Austral', p: 65450, r: '4,0' }, { n: 'Cabañas Rincón Soleado', p: 67061, r: '4,9' }, { n: 'Casona Belga', p: 132123, r: '4,7' }], busca: 'alojamiento Chile Chico 6 al 8 de enero 2027' },
    { noche: 'vie 8', donde: 'Villa Cerro Castillo', camping: 10000, techo: [{ n: 'Refugio Casa Piedra', p: 39585, r: '4,2' }, { n: 'Vientos del Sur', p: 46988, r: '4,9' }], extra: 'La última, con techo para salir temprano al aeropuerto.', busca: 'alojamiento Villa Cerro Castillo 8 al 9 de enero 2027' }
  ],

  // ---------- Año Nuevo en la Austral (jueves 31 dic) ----------
  // fotos: llaves de fotos-panoramas.js o de lugares.js
  anioNuevo: [
    { id: 'nyb-chacabuco', sello: 'el más nuestro', titulo: 'En carpa bajo el cielo del Valle Chacabuco', donde: 'Parque Patagonia · camping West Winds', fotos: ['parque-patagonia'],
      precio: 'camping ≈ $10 mil c/u',
      resumen: 'Recibir el año en carpa, con guanacos alrededor y el valle abierto sin una luz. A fin de diciembre el sol se pone pasadas las 21:30 y a medianoche el cielo recién se está poniendo negro: después salen las estrellas del sur.',
      noche: [
        ['mañana 31', 'Lagunas Altas (6 h) o los miradores cortos si estamos cansados'],
        ['20:00', 'Cena especial en la cocinilla, comprada en Coyhaique, y un vino'],
        ['21:45', 'Se pone el sol detrás de los cerros'],
        ['00:00', 'Brindis afuera de la carpa'],
        ['después', 'Estrellas: el valle no tiene luz artificial'],
        ['1 ene', 'Desayuno con guanacos y bajada a Cochrane']
      ],
      ojo: ['Hace frío de noche: sacos para bajo 0 °C', 'En el parque no se vende nada: llevar todo desde Coyhaique', 'No se pueden hacer fogatas', 'Preguntar a CONAF (aysen.oirs@conaf.cl) si el camping se reserva para esa noche'],
      links: [{ t: 'Camping West Winds', url: 'https://www.google.com/search?q=camping+West+Winds+Parque+Nacional+Patagonia' }],
      calza: 'Es el plan del itinerario: el 30 y el 31 en el Valle Chacabuco.' },
    { id: 'nyb-tinaja', sello: 'el más romántico', titulo: 'Cabaña con el lago al frente', donde: 'Puerto Guadal o Bertrand', fotos: ['general-carrera'],
      precio: 'Sol de la Patagonia $75.829 la noche (≈ $38 mil c/u) · El Arrayán $182.676 (≈ $91 mil c/u)',
      resumen: 'Una noche con techo a mitad del viaje: el General Carrera turquesa al frente, ducha caliente, la cena en una cocina de verdad y, si se puede, tinaja al aire libre.',
      noche: [
        ['mañana 31', 'Lagunas Altas y bajada a Guadal (1,5 h)'],
        ['atardecer', 'Tinaja o terraza mirando el lago'],
        ['cena', 'Algo rico cocinado sin apuro'],
        ['00:00', 'Brindis con el lago y el cielo todavía claro'],
        ['1 ene', 'Desayuno y a Cochrane y Tortel (3,5 h)']
      ],
      ojo: ['Preguntar si la cabaña tiene tinaja y si se paga aparte', 'Cambia el orden: el 31 se duerme en Guadal en vez del valle', 'Es la noche más pedida: reservar apenas compremos'],
      links: [{ t: 'Ver cabañas para el 31', url: 'https://www.google.com/travel/search?q=alojamiento%20Puerto%20Guadal%2031%20de%20diciembre%202026&hl=es&gl=CL&curr=CLP' }],
      calza: 'Se baja a dormir a Guadal o Bertrand el 31 y el 1 se sigue a Tortel.' },
    { id: 'nyb-tortel', sello: 'el más distinto', titulo: 'Fin de año en Caleta Tortel', donde: 'Caleta Tortel', fotos: ['tortel'],
      precio: 'hospedaje familiar ~$40 a 60 mil la noche',
      resumen: 'Recibir el año en el pueblo de pasarelas sobre el fiordo, en una casa familiar. Es chico y tranquilo: no hay fiesta organizada publicada, es más de pueblo que de fuegos artificiales.',
      noche: [
        ['tarde 31', 'Llegamos desde el Valle Chacabuco (4 h)'],
        ['atardecer', 'Pasarelas hasta el mirador'],
        ['cena', 'Cena casera en el hospedaje'],
        ['00:00', 'Brindis sobre el agua'],
        ['1 ene', 'Isla de los Muertos si la lancha sale']
      ],
      ojo: ['Nada publica precio en línea: reservar por WhatsApp', 'En Tortel no hay bencina', 'Se corre un día: Valle Chacabuco el 30 y Tortel el 31'],
      links: [{ t: 'Buscar en Tortel', url: 'https://www.google.com/travel/search?q=alojamiento%20Caleta%20Tortel%2031%20de%20diciembre%202026&hl=es&gl=CL&curr=CLP' }],
      calza: 'Se adelanta Tortel un día y queda un día libre en O\'Higgins.' }
  ],

  // Panoramas que solo están en el plan B (los demás son los de la Austral del plan A)
  actividades: [
    { id: 'jeinimeni', fotos: 'chile-chico', nombre: 'Reserva Jeinimeni y la Cueva de las Manos', donde: 'Chile Chico', precio: 'entrada CONAF: confirmar', nota: 'Día completo desde Chile Chico, por nuestra cuenta en el auto.',
      resumen: 'Al sur de Chile Chico, un valle de estepa con lagunas verdes y turquesa. En el camino está la Piedra Clavada, una columna de roca enorme, y un sendero lleva a pinturas tehuelches de manos en un alero de roca.',
      consta: ['60 km de ripio al sur de Chile Chico, cruzando esteros', 'Laguna Verde y Lago Jeinimeni', 'Sendero a la Cueva de las Manos (Valle Lebrel)', 'Piedra Clavada a la vuelta'],
      llevar: ['Comida y agua para el día', 'Bloqueador: es la zona más soleada de Aysén'],
      ojo: ['El camino cruza esteros: preguntar en CONAF Chile Chico cómo está antes de entrar', 'Con el Tucson se pasa bien en verano, sin apuro'],
      dispo: { estado: 'ojo', texto: 'Por nuestra cuenta. Confirmar en CONAF el estado del camino.' } },
    { id: 'paso-las-llaves', fotos: 'chile-chico', nombre: 'Paso Las Llaves', donde: 'Guadal → Chile Chico', precio: 'gratis', nota: 'Se maneja de día y sin apuro: es angosto y de ripio.',
      resumen: 'El camino entre Guadal y Chile Chico va cortado en el cerro, muy arriba del General Carrera, con el lago turquesa abajo. Es uno de los tramos más lindos de la Patagonia para manejar.',
      dispo: { estado: 'ok', texto: 'Cualquier día. Es parte del viaje del D12.' } },
    { id: 'barcaza-ibanez', fotos: 'chile-chico', nombre: 'Barcaza Chile Chico → Puerto Ibáñez', donde: 'Lago General Carrera', precio: 'consultar', nota: 'Unas 2 h cruzando el lago con el auto arriba.',
      resumen: 'Cierra la vuelta al lago: en vez de volver 6 h por tierra, se cruza el General Carrera en barcaza y de Puerto Ibáñez quedan 1,5 h a Cerro Castillo.',
      ojo: ['No encontré horarios ni tarifas 2026-27 en línea: preguntar a la Seremi de Transportes de Aysén o en Chile Chico', 'Si no sale, la vuelta es por Guadal y Cerro Castillo (6 h)'],
      dispo: { estado: 'ojo', texto: 'Por confirmar. Si sale, reservar el cupo del auto.' } }
  ],

  // ---------- Presupuesto del plan B ----------
  // tipo 'cada' = cada uno paga eso · 'mitad' = total que se divide. Los pasajes, el hotel y el auto salen de lo elegido.
  presupuesto: {
    playa: [
      { id: 'pb-comida', nombre: 'Comida (si no es todo incluido)', unitario: 25000, cantidad: 7, unidad: 'días', tipo: 'cada' },
      { id: 'pb-extras', nombre: 'Paseos y extras (piscinas naturales, un tour)', unitario: 40000, cantidad: 1, unidad: 'total', tipo: 'cada' }
    ],
    austral: [
      { id: 'ab-aloj', nombre: 'Alojamiento (casi todo carpa, 4 noches con techo)', unitario: 30000, cantidad: 14, unidad: 'noches', tipo: 'mitad' },
      { id: 'ab-comida', nombre: 'Comida (cocinamos casi siempre)', unitario: 10000, cantidad: 15, unidad: 'días', tipo: 'cada' },
      { id: 'ab-equipo', nombre: 'Gas y lo que falte del equipo', unitario: 30000, cantidad: 1, unidad: 'total', tipo: 'mitad' },
      { id: 'ab-activ', nombre: "Tours y entradas (Capillas, Exploradores, Tortel, O'Higgins)", unitario: 270000, cantidad: 1, unidad: 'total', tipo: 'cada' },
      { id: 'ab-barcaza', nombre: 'Barcaza Chile Chico → Ibáñez con el auto (estimado)', unitario: 40000, cantidad: 1, unidad: 'total', tipo: 'mitad' }
    ]
  },

  // Lo que hay que reservar además de pasajes, hotel y auto
  reservas: [
    { id: 'rb-exploradores', que: 'Glaciar Exploradores sobre el hielo · Viajero Austral', detalle: 'El mar 29 dic, con el lun 28 de respaldo. Preguntar por WhatsApp si salen esos días.', precio: '$150 mil c/u', link: 'https://www.viajeroaustral.com/tour-glaciar-exploradores' },
    { id: 'rb-tranquilo', que: 'Alojamiento en Río Tranquilo', detalle: '27 al 30 dic. Fin de año es temporada alta.', precio: 'desde $69 mil la noche', link: 'https://www.google.com/travel/search?q=alojamiento%20Puerto%20R%C3%ADo%20Tranquilo%2027%20al%2030%20de%20diciembre%202026&hl=es&gl=CL&curr=CLP', boton: 'buscar' },
    { id: 'rb-anio-nuevo', que: 'Año Nuevo · lo que elijamos', detalle: 'Camping West Winds (preguntar a CONAF) o cabaña en Guadal o Bertrand.', precio: 'según la opción', link: 'https://www.google.com/travel/search?q=alojamiento%20Puerto%20Guadal%2031%20de%20diciembre%202026&hl=es&gl=CL&curr=CLP', boton: 'buscar' },
    { id: 'rb-ohiggins', que: "Alojamiento en Villa O'Higgins y navegación al glaciar", detalle: '3 al 5 ene. Preguntar por la navegación del lun 4.', precio: 'desde $117 mil la noche', link: "https://www.google.com/travel/search?q=alojamiento%20Villa%20O'Higgins%203%20al%205%20de%20enero%202027&hl=es&gl=CL&curr=CLP", boton: 'buscar' },
    { id: 'rb-barcaza', que: 'Barcaza Chile Chico → Puerto Ibáñez', detalle: 'Vie 8 ene en la mañana. Confirmar que esté andando y reservar el cupo del auto.', precio: 'consultar', link: 'https://www.google.com/search?q=barcaza+Chile+Chico+Puerto+Iba%C3%B1ez+horarios+2027', boton: 'consultar' }
  ],

  // Papeles y datos útiles del plan B
  papeles: [
    ['brasil', 'Chilenos entran con la <strong>cédula de identidad</strong> vigente (o pasaporte). Sin visa.'],
    ['colombia', 'Sin visa para chilenos. Llenar el formulario <strong>Check-MIG</strong> antes de volar.'],
    ['reales', '1 real ≈ <strong>$175</strong>. En Brasil todo se paga con tarjeta o Pix: casi no hace falta efectivo.'],
    ['seguro', 'Brasil no lo exige, pero es bueno tenerlo. La <strong>World Member</strong> puede darlo al pagar con ella.'],
    ['la worldmember', 'La maleta gratis en LATAM está vigente <strong>hasta el 31 dic 2026</strong>: la vuelta del 9 ene podría cobrarla. Preguntar al banco.'],
    ['austral en enero', '<strong>Temporada alta:</strong> más gente, todo más caro y los autos se acaban. Reservar alojamiento y auto apenas compremos.'],
    ['bencina', 'Hay en Tranquilo, Cochrane, O\'Higgins y Chile Chico. <strong>En Tortel no hay.</strong> Bidón de 20 litros.'],
    ['luz', 'En enero el sol se pone pasadas las 21:30 en Aysén: los días rinden harto.']
  ],

  // El plan A con el que se compara (de la calculadora, si ya se abrió en este navegador)
  porQue: {
    a: ['Dos culturas distintas en un verano', 'Año Nuevo en Antigua o frente a un volcán', 'La Austral queda corta: hasta O\'Higgins es apretado'],
    b: ['La Austral entera, sin días eternos y con la vuelta al lago', 'Una semana de descanso de verdad antes de Navidad', 'Menos trámites: nada de shuttles, quetzales ni vuelos internos', 'Año Nuevo en la Patagonia']
  }
};
