// Lugares con fotos y mapa · Agencia de Viajes SiempreLab
// Fotos de Wikimedia Commons con licencia libre (el crédito se muestra en cada foto).
// src: 1280 px para carruseles · grande: 1920 px para el hero.
// Wikimedia solo sirve anchos estándar (960, 1280, 1920...): no usar otros.

const LUGARES = {
  "antigua": {
    "nombre": "Antigua",
    "pais": "Guatemala",
    "mapa": "Antigua Guatemala",
    "zoom": 14,
    "descripcion": "Ciudad colonial rodeada de volcanes. Calles de piedra, el arco de Santa Catalina y el Cerro de la Cruz con el Volcán de Agua al fondo.",
    "fotos": [
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e6/Antigua_Guatemala_2023-02-24_-_Volc%C3%A1n_de_Agua.jpg/1280px-Antigua_Guatemala_2023-02-24_-_Volc%C3%A1n_de_Agua.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e6/Antigua_Guatemala_2023-02-24_-_Volc%C3%A1n_de_Agua.jpg/1920px-Antigua_Guatemala_2023-02-24_-_Volc%C3%A1n_de_Agua.jpg",
        "credito": "amslerPIX",
        "licencia": "CC BY 2.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Antigua_Guatemala_2023-02-24_-_Volc%C3%A1n_de_Agua.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Volcan_de_Agua_desde_Cerro_de_la_Cruz.jpg/1280px-Volcan_de_Agua_desde_Cerro_de_la_Cruz.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Volcan_de_Agua_desde_Cerro_de_la_Cruz.jpg/1920px-Volcan_de_Agua_desde_Cerro_de_la_Cruz.jpg",
        "credito": "Erik Cleves Kristensen",
        "licencia": "CC BY 2.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Volcan_de_Agua_desde_Cerro_de_la_Cruz.jpg"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/d/d3/Volcan_de_Agua%2C_Antigua_%284137249125%29.jpg",
        "grande": "https://upload.wikimedia.org/wikipedia/commons/d/d3/Volcan_de_Agua%2C_Antigua_%284137249125%29.jpg",
        "credito": "Pedro Szekely from Los Angeles, USA",
        "licencia": "CC BY 2.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Volcan_de_Agua,_Antigua_(4137249125).jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/Antigua_Guatemala_-_Santa_Catalina_Arch_-_Old_Architecture.jpg/1280px-Antigua_Guatemala_-_Santa_Catalina_Arch_-_Old_Architecture.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/Antigua_Guatemala_-_Santa_Catalina_Arch_-_Old_Architecture.jpg/1920px-Antigua_Guatemala_-_Santa_Catalina_Arch_-_Old_Architecture.jpg",
        "credito": "Rene Hernandez",
        "licencia": "CC BY-SA 2.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Antigua_Guatemala_-_Santa_Catalina_Arch_-_Old_Architecture.jpg"
      }
    ]
  },
  "acatenango": {
    "nombre": "Acatenango",
    "pais": "Guatemala",
    "mapa": "Volcán de Acatenango",
    "zoom": 12,
    "descripcion": "Trekking de 2 días con noche en campamento frente al Volcán de Fuego, que erupciona cada 15 minutos.",
    "fotos": [
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a3/View_from_Volcano_Pacaya%2C_Guatemala.jpg/1280px-View_from_Volcano_Pacaya%2C_Guatemala.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a3/View_from_Volcano_Pacaya%2C_Guatemala.jpg/1920px-View_from_Volcano_Pacaya%2C_Guatemala.jpg",
        "credito": "Christopher Crouzet",
        "licencia": "CC BY-SA 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:View_from_Volcano_Pacaya,_Guatemala.jpg"
      },
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/9/9d/Volcan_de_fuego_aug_8th_2007.jpg",
        "grande": "https://upload.wikimedia.org/wikipedia/commons/9/9d/Volcan_de_fuego_aug_8th_2007.jpg",
        "credito": "Lcpons",
        "licencia": "Public domain",
        "pagina": "https://commons.wikimedia.org/wiki/File:Volcan_de_fuego_aug_8th_2007.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/In_Antigua_Guatemala-Volcan_de_Fuego_%286849909334%29.jpg/1280px-In_Antigua_Guatemala-Volcan_de_Fuego_%286849909334%29.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/In_Antigua_Guatemala-Volcan_de_Fuego_%286849909334%29.jpg/1920px-In_Antigua_Guatemala-Volcan_de_Fuego_%286849909334%29.jpg",
        "credito": "Murray Foubister",
        "licencia": "CC BY-SA 2.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:In_Antigua_Guatemala-Volcan_de_Fuego_(6849909334).jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3e/Antigua_Guatemala_February_2020_-_Volcan_de_Fuego.jpg/1280px-Antigua_Guatemala_February_2020_-_Volcan_de_Fuego.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3e/Antigua_Guatemala_February_2020_-_Volcan_de_Fuego.jpg/1920px-Antigua_Guatemala_February_2020_-_Volcan_de_Fuego.jpg",
        "credito": "Bruno Rijsman",
        "licencia": "CC BY-SA 2.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Antigua_Guatemala_February_2020_-_Volcan_de_Fuego.jpg"
      }
    ]
  },
  "atitlan": {
    "nombre": "Lago Atitlán",
    "pais": "Guatemala",
    "mapa": "Lago de Atitlán",
    "zoom": 11,
    "descripcion": "Lago entre tres volcanes con pueblos mayas en la orilla. Kayak, lanchas entre pueblos y atardeceres.",
    "fotos": [
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2e/Lake_Atitlan_%26_Volcanoes_from_the_East_%286849884554%29.jpg/1280px-Lake_Atitlan_%26_Volcanoes_from_the_East_%286849884554%29.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2e/Lake_Atitlan_%26_Volcanoes_from_the_East_%286849884554%29.jpg/1920px-Lake_Atitlan_%26_Volcanoes_from_the_East_%286849884554%29.jpg",
        "credito": "Murray Foubister",
        "licencia": "CC BY-SA 2.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Lake_Atitlan_%26_Volcanoes_from_the_East_(6849884554).jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/San_Pedro_volcano_-_panoramio.jpg/1280px-San_Pedro_volcano_-_panoramio.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/San_Pedro_volcano_-_panoramio.jpg/1920px-San_Pedro_volcano_-_panoramio.jpg",
        "credito": "Federico Mata",
        "licencia": "CC BY 3.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:San_Pedro_volcano_-_panoramio.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Lake_Atitl%C3%A1n_and_San_Pedro_%283747182120%29.jpg/1280px-Lake_Atitl%C3%A1n_and_San_Pedro_%283747182120%29.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Lake_Atitl%C3%A1n_and_San_Pedro_%283747182120%29.jpg/1920px-Lake_Atitl%C3%A1n_and_San_Pedro_%283747182120%29.jpg",
        "credito": "Francisco Anzola",
        "licencia": "CC BY 2.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Lake_Atitl%C3%A1n_and_San_Pedro_(3747182120).jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/48/Lake_Atitlan%2C_Volcan_San_Pedro_%2815339126093%29.jpg/1280px-Lake_Atitlan%2C_Volcan_San_Pedro_%2815339126093%29.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/48/Lake_Atitlan%2C_Volcan_San_Pedro_%2815339126093%29.jpg/1920px-Lake_Atitlan%2C_Volcan_San_Pedro_%2815339126093%29.jpg",
        "credito": "Arian Zwegers from Brussels, Belgium",
        "licencia": "CC BY 2.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Lake_Atitlan,_Volcan_San_Pedro_(15339126093).jpg"
      }
    ]
  },
  "tikal": {
    "nombre": "Tikal",
    "pais": "Guatemala",
    "mapa": "Parque Nacional Tikal",
    "zoom": 13,
    "descripcion": "Las ruinas mayas más grandes de la región, en plena selva. Amanecer desde el Templo IV.",
    "fotos": [
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ce/Tikal_Temple_II.jpg/1280px-Tikal_Temple_II.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ce/Tikal_Temple_II.jpg/1920px-Tikal_Temple_II.jpg",
        "credito": "Mike Vondran derivative work: MrPanyGoff",
        "licencia": "CC BY 2.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Tikal_Temple_II.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Gran_Jaguar_y_Plaza_Central_Tikal_-_Guatemala.jpg/1280px-Gran_Jaguar_y_Plaza_Central_Tikal_-_Guatemala.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Gran_Jaguar_y_Plaza_Central_Tikal_-_Guatemala.jpg/1920px-Gran_Jaguar_y_Plaza_Central_Tikal_-_Guatemala.jpg",
        "credito": "Rodrigo Campos",
        "licencia": "CC BY 2.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Gran_Jaguar_y_Plaza_Central_Tikal_-_Guatemala.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e7/Tikal_mayan_ruins_2009.jpg/1280px-Tikal_mayan_ruins_2009.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e7/Tikal_mayan_ruins_2009.jpg/1920px-Tikal_mayan_ruins_2009.jpg",
        "credito": "chensiyuan",
        "licencia": "CC BY-SA 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Tikal_mayan_ruins_2009.jpg"
      }
    ]
  },
  "semuc-champey": {
    "nombre": "Semuc Champey",
    "pais": "Guatemala",
    "mapa": "Semuc Champey, Lanquín, Guatemala",
    "zoom": 14,
    "descripcion": "Pozas turquesa escalonadas sobre un puente de piedra natural del río Cahabón, en plena selva. Mirador arriba, chapuzón abajo y cueva con velas en Lanquín.",
    "fotos": [
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Semuc_Champey%2C_Guatemala.jpg/1280px-Semuc_Champey%2C_Guatemala.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Semuc_Champey%2C_Guatemala.jpg/1920px-Semuc_Champey%2C_Guatemala.jpg",
        "credito": "Christopher Crouzet",
        "licencia": "CC BY-SA 3.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Semuc_Champey,_Guatemala.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Semuc_Champey_1.jpg/1280px-Semuc_Champey_1.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Semuc_Champey_1.jpg/1920px-Semuc_Champey_1.jpg",
        "credito": "Betipá",
        "licencia": "CC BY-SA 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Semuc_Champey_1.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Semuc_Champey%2C_AV_Guatemala.jpg/1280px-Semuc_Champey%2C_AV_Guatemala.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Semuc_Champey%2C_AV_Guatemala.jpg/1920px-Semuc_Champey%2C_AV_Guatemala.jpg",
        "credito": "Mario Bollini",
        "licencia": "CC BY 2.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Semuc_Champey,_AV_Guatemala.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2c/Semuc_Champey_4.jpg/1280px-Semuc_Champey_4.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2c/Semuc_Champey_4.jpg/1920px-Semuc_Champey_4.jpg",
        "credito": "Betipá",
        "licencia": "CC BY-SA 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Semuc_Champey_4.jpg"
      }
    ]
  },
  "rio-dulce": {
    "nombre": "Río Dulce y Livingston",
    "pais": "Guatemala",
    "mapa": "Río Dulce, Izabal, Guatemala",
    "zoom": 11,
    "descripcion": "El Caribe guatemalteco: lancha por un cañón de selva hasta Livingston, pueblo garífuna con tapado (sopa de mariscos) y el Castillo de San Felipe a la entrada del lago Izabal.",
    "fotos": [
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b3/Green_R%C3%ADo_Dulce_%28Unsplash%29.jpg/1280px-Green_R%C3%ADo_Dulce_%28Unsplash%29.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b3/Green_R%C3%ADo_Dulce_%28Unsplash%29.jpg/1920px-Green_R%C3%ADo_Dulce_%28Unsplash%29.jpg",
        "credito": "Lara Natalia Haenny",
        "licencia": "CC0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Green_R%C3%ADo_Dulce_(Unsplash).jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c6/Rio_Dulce_-_Guatemala_3.jpg/1280px-Rio_Dulce_-_Guatemala_3.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c6/Rio_Dulce_-_Guatemala_3.jpg/1920px-Rio_Dulce_-_Guatemala_3.jpg",
        "credito": "Jake Brown",
        "licencia": "CC BY 2.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Rio_Dulce_-_Guatemala_3.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dc/El_Castillo_de_San_Felipe_-_Near_Rio_Dulce_-_Izabal_-_Guatemala_%2815714176090%29.jpg/1280px-El_Castillo_de_San_Felipe_-_Near_Rio_Dulce_-_Izabal_-_Guatemala_%2815714176090%29.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dc/El_Castillo_de_San_Felipe_-_Near_Rio_Dulce_-_Izabal_-_Guatemala_%2815714176090%29.jpg/1920px-El_Castillo_de_San_Felipe_-_Near_Rio_Dulce_-_Izabal_-_Guatemala_%2815714176090%29.jpg",
        "credito": "Adam Jones",
        "licencia": "CC BY-SA 2.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:El_Castillo_de_San_Felipe_-_Near_Rio_Dulce_-_Izabal_-_Guatemala_(15714176090).jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/Panorama_of_Harbor_-_Livingston_-_Izabal_-_Guatemala_%2815713939658%29.jpg/1280px-Panorama_of_Harbor_-_Livingston_-_Izabal_-_Guatemala_%2815713939658%29.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/Panorama_of_Harbor_-_Livingston_-_Izabal_-_Guatemala_%2815713939658%29.jpg/1920px-Panorama_of_Harbor_-_Livingston_-_Izabal_-_Guatemala_%2815713939658%29.jpg",
        "credito": "Adam Jones",
        "licencia": "CC BY-SA 2.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Panorama_of_Harbor_-_Livingston_-_Izabal_-_Guatemala_(15713939658).jpg"
      }
    ]
  },
  "flores": {
    "nombre": "Flores",
    "pais": "Guatemala",
    "mapa": "Flores, Petén, Guatemala",
    "zoom": 14,
    "descripcion": "Islita de colores en el lago Petén Itzá. Base para Tikal y para cruzar a Belice.",
    "fotos": [
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/c/cd/Flores%2C_Pet%C3%A9n%2C_aerial_view_from_above_Santa_Elena.jpg",
        "grande": "https://upload.wikimedia.org/wikipedia/commons/c/cd/Flores%2C_Pet%C3%A9n%2C_aerial_view_from_above_Santa_Elena.jpg",
        "credito": "Rafael Amado Deras",
        "licencia": "CC BY 2.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Flores,_Pet%C3%A9n,_aerial_view_from_above_Santa_Elena.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a4/Isla_de_Flores_desde_el_Lago_Pet%C3%A9n_Itz%C3%A1.jpg/1280px-Isla_de_Flores_desde_el_Lago_Pet%C3%A9n_Itz%C3%A1.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a4/Isla_de_Flores_desde_el_Lago_Pet%C3%A9n_Itz%C3%A1.jpg/1920px-Isla_de_Flores_desde_el_Lago_Pet%C3%A9n_Itz%C3%A1.jpg",
        "credito": "Edgouno",
        "licencia": "CC BY-SA 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Isla_de_Flores_desde_el_Lago_Pet%C3%A9n_Itz%C3%A1.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/17/Colourful_houses_in_Isla_de_Flores_-_54974735378.jpg/1280px-Colourful_houses_in_Isla_de_Flores_-_54974735378.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/17/Colourful_houses_in_Isla_de_Flores_-_54974735378.jpg/1920px-Colourful_houses_in_Isla_de_Flores_-_54974735378.jpg",
        "credito": "Bex Walton",
        "licencia": "CC BY 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Colourful_houses_in_Isla_de_Flores_-_54974735378.jpg"
      }
    ]
  },
  "caye-caulker": {
    "nombre": "Caye Caulker",
    "pais": "Belice",
    "mapa": "Caye Caulker, Belize",
    "zoom": 11,
    "descripcion": "Isla caribeña sin autos, lema \"go slow\". Snorkel en el arrecife y, si da el bolsillo, vuelo o lancha al Gran Agujero Azul.",
    "fotos": [
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/Caye_Caulker_Belize_aerial_%2820688990128%29.jpg/1280px-Caye_Caulker_Belize_aerial_%2820688990128%29.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/Caye_Caulker_Belize_aerial_%2820688990128%29.jpg/1920px-Caye_Caulker_Belize_aerial_%2820688990128%29.jpg",
        "credito": "dronepicr",
        "licencia": "CC BY 2.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Caye_Caulker_Belize_aerial_(20688990128).jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3f/Caye_Caulker%2C_Belize_-_The_Split.jpg/1280px-Caye_Caulker%2C_Belize_-_The_Split.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3f/Caye_Caulker%2C_Belize_-_The_Split.jpg/1920px-Caye_Caulker%2C_Belize_-_The_Split.jpg",
        "credito": "James Willamor",
        "licencia": "CC BY-SA 2.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Caye_Caulker,_Belize_-_The_Split.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8e/Belize_Barrier_Reef_-_55446195890.jpg/1280px-Belize_Barrier_Reef_-_55446195890.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8e/Belize_Barrier_Reef_-_55446195890.jpg/1920px-Belize_Barrier_Reef_-_55446195890.jpg",
        "credito": "xiquinhosilva",
        "licencia": "CC BY 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Belize_Barrier_Reef_-_55446195890.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/Belize_Barrier_Reef_-_55445964784.jpg/1280px-Belize_Barrier_Reef_-_55445964784.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/Belize_Barrier_Reef_-_55445964784.jpg/1920px-Belize_Barrier_Reef_-_55445964784.jpg",
        "credito": "xiquinhosilva",
        "licencia": "CC BY 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Belize_Barrier_Reef_-_55445964784.jpg"
      }
    ]
  },
  "cerro-castillo": {
    "nombre": "Cerro Castillo",
    "pais": "Aysén · 2025 ✓",
    "mapa": "Villa Cerro Castillo, Aysén",
    "zoom": 11,
    "descripcion": "Donde terminamos en 2025. Esta vez es el punto de partida hacia el sur.",
    "fotos": [
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b2/Cerro_Castillo.jpg/1280px-Cerro_Castillo.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b2/Cerro_Castillo.jpg/1920px-Cerro_Castillo.jpg",
        "credito": "Ahti Heinla",
        "licencia": "CC BY-SA 3.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Cerro_Castillo.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1d/Villa_Cerro_Castillo%2C_Chile_%2810868278416%29.jpg/1280px-Villa_Cerro_Castillo%2C_Chile_%2810868278416%29.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1d/Villa_Cerro_Castillo%2C_Chile_%2810868278416%29.jpg/1920px-Villa_Cerro_Castillo%2C_Chile_%2810868278416%29.jpg",
        "credito": "M M from Switzerland",
        "licencia": "CC BY-SA 2.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Villa_Cerro_Castillo,_Chile_(10868278416).jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Cerro_Castillo%2C_Chile.jpg/1280px-Cerro_Castillo%2C_Chile.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Cerro_Castillo%2C_Chile.jpg/1920px-Cerro_Castillo%2C_Chile.jpg",
        "credito": "Chile28882",
        "licencia": "CC BY-SA 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Cerro_Castillo,_Chile.jpg"
      }
    ]
  },
  "capillas-marmol": {
    "nombre": "Capillas de Mármol",
    "pais": "Aysén",
    "mapa": "Capillas de Mármol, Puerto Río Tranquilo",
    "zoom": 12,
    "descripcion": "Cavernas de mármol en el lago General Carrera. Se recorren en lancha o kayak desde Puerto Río Tranquilo.",
    "fotos": [
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4f/Catedral_de_m%C3%A1rmol_-_Chile.jpg/1280px-Catedral_de_m%C3%A1rmol_-_Chile.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4f/Catedral_de_m%C3%A1rmol_-_Chile.jpg/1920px-Catedral_de_m%C3%A1rmol_-_Chile.jpg",
        "credito": "Dan Lundberg",
        "licencia": "CC BY-SA 2.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Catedral_de_m%C3%A1rmol_-_Chile.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/83/Lago_General_Carrera_-_Capillas_de_M%C3%A1rmol_2.jpg/1280px-Lago_General_Carrera_-_Capillas_de_M%C3%A1rmol_2.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/83/Lago_General_Carrera_-_Capillas_de_M%C3%A1rmol_2.jpg/1920px-Lago_General_Carrera_-_Capillas_de_M%C3%A1rmol_2.jpg",
        "credito": "Jpmorenosanchez",
        "licencia": "CC BY-SA 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Lago_General_Carrera_-_Capillas_de_M%C3%A1rmol_2.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Capilla_de_M%C3%A1rmol_06.jpg/1280px-Capilla_de_M%C3%A1rmol_06.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Capilla_de_M%C3%A1rmol_06.jpg/1920px-Capilla_de_M%C3%A1rmol_06.jpg",
        "credito": "LBM1948",
        "licencia": "CC BY-SA 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Capilla_de_M%C3%A1rmol_06.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dd/Cuevas_de_M%C3%A1rmol_%28Marble_Caves%29%2C_Patagonia%2C_Chile.jpg/1280px-Cuevas_de_M%C3%A1rmol_%28Marble_Caves%29%2C_Patagonia%2C_Chile.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dd/Cuevas_de_M%C3%A1rmol_%28Marble_Caves%29%2C_Patagonia%2C_Chile.jpg/1920px-Cuevas_de_M%C3%A1rmol_%28Marble_Caves%29%2C_Patagonia%2C_Chile.jpg",
        "credito": "Wescottm",
        "licencia": "CC BY 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Cuevas_de_M%C3%A1rmol_(Marble_Caves),_Patagonia,_Chile.jpg"
      }
    ]
  },
  "exploradores": {
    "nombre": "Glaciar Exploradores",
    "pais": "Aysén",
    "mapa": "Glaciar Exploradores",
    "zoom": 11,
    "descripcion": "Trekking sobre el hielo con crampones, a una hora de Río Tranquilo. Vista al Monte San Valentín, el más alto de la Patagonia.",
    "fotos": [
      {
        "src": "https://upload.wikimedia.org/wikipedia/commons/4/49/Glaciar_Exploradores.jpg",
        "grande": "https://upload.wikimedia.org/wikipedia/commons/4/49/Glaciar_Exploradores.jpg",
        "credito": "Felipe Cancino",
        "licencia": "CC BY-SA 2.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Glaciar_Exploradores.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/Glaciar_Exploradores_Parque_Nacional_Laguna_San_Rafael_02.jpg/1280px-Glaciar_Exploradores_Parque_Nacional_Laguna_San_Rafael_02.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/Glaciar_Exploradores_Parque_Nacional_Laguna_San_Rafael_02.jpg/1920px-Glaciar_Exploradores_Parque_Nacional_Laguna_San_Rafael_02.jpg",
        "credito": "Natalia Reyes Escobar",
        "licencia": "CC BY-SA 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Glaciar_Exploradores_Parque_Nacional_Laguna_San_Rafael_02.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3d/Glaciar_Exploradores_Parque_Nacional_Laguna_San_Rafael_01.jpg/1280px-Glaciar_Exploradores_Parque_Nacional_Laguna_San_Rafael_01.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3d/Glaciar_Exploradores_Parque_Nacional_Laguna_San_Rafael_01.jpg/1920px-Glaciar_Exploradores_Parque_Nacional_Laguna_San_Rafael_01.jpg",
        "credito": "Natalia Reyes Escobar",
        "licencia": "CC BY-SA 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Glaciar_Exploradores_Parque_Nacional_Laguna_San_Rafael_01.jpg"
      }
    ]
  },
  "confluencia-baker": {
    "nombre": "Río Baker",
    "pais": "Aysén",
    "mapa": "Confluencia Río Baker y Río Neff",
    "zoom": 12,
    "descripcion": "El río más caudaloso de Chile, turquesa a más no poder. Puerto Bertrand y la confluencia con el Neff.",
    "fotos": [
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5a/RIO_BAKER%2C_CARRETERA_AUSTRAL_-_panoramio_%281%29.jpg/1280px-RIO_BAKER%2C_CARRETERA_AUSTRAL_-_panoramio_%281%29.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5a/RIO_BAKER%2C_CARRETERA_AUSTRAL_-_panoramio_%281%29.jpg/1920px-RIO_BAKER%2C_CARRETERA_AUSTRAL_-_panoramio_%281%29.jpg",
        "credito": "Manuel Cañón P.",
        "licencia": "CC BY-SA 3.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:RIO_BAKER,_CARRETERA_AUSTRAL_-_panoramio_(1).jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/02/R%C3%ADo_Baker_-_Flickr_-_I%C3%B1i_Pi%C3%B1i.jpg/1280px-R%C3%ADo_Baker_-_Flickr_-_I%C3%B1i_Pi%C3%B1i.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/02/R%C3%ADo_Baker_-_Flickr_-_I%C3%B1i_Pi%C3%B1i.jpg/1920px-R%C3%ADo_Baker_-_Flickr_-_I%C3%B1i_Pi%C3%B1i.jpg",
        "credito": "Iñi Papi from Concepción, Chile",
        "licencia": "CC BY-SA 2.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:R%C3%ADo_Baker_-_Flickr_-_I%C3%B1i_Pi%C3%B1i.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/Desembocadura_R%C3%ADo_Baker.jpg/1280px-Desembocadura_R%C3%ADo_Baker.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/Desembocadura_R%C3%ADo_Baker.jpg/1920px-Desembocadura_R%C3%ADo_Baker.jpg",
        "credito": "betoscopio",
        "licencia": "CC BY-SA 2.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Desembocadura_R%C3%ADo_Baker.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/61/Puerto_Bertrand_%283260717864%29.jpg/1280px-Puerto_Bertrand_%283260717864%29.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/61/Puerto_Bertrand_%283260717864%29.jpg/1920px-Puerto_Bertrand_%283260717864%29.jpg",
        "credito": "Jason Hollinger",
        "licencia": "CC BY 2.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Puerto_Bertrand_(3260717864).jpg"
      }
    ]
  },
  "parque-patagonia": {
    "nombre": "Parque Patagonia",
    "pais": "Aysén",
    "mapa": "Parque Nacional Patagonia, Valle Chacabuco",
    "zoom": 10,
    "descripcion": "Valle Chacabuco: estepa, guanacos y lagunas. Uno de los parques de la Ruta de los Parques, cerca de Cochrane.",
    "fotos": [
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/22/Valle_de_Chacabuco%2C_Parque_Patagonia.jpg/1280px-Valle_de_Chacabuco%2C_Parque_Patagonia.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/22/Valle_de_Chacabuco%2C_Parque_Patagonia.jpg/1920px-Valle_de_Chacabuco%2C_Parque_Patagonia.jpg",
        "credito": "Gonzalo Lastra",
        "licencia": "CC BY-SA 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Valle_de_Chacabuco,_Parque_Patagonia.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/Guanacos_in_Chacabuco_valley_Chilean_Patagonia.jpg/1280px-Guanacos_in_Chacabuco_valley_Chilean_Patagonia.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/Guanacos_in_Chacabuco_valley_Chilean_Patagonia.jpg/1920px-Guanacos_in_Chacabuco_valley_Chilean_Patagonia.jpg",
        "credito": "ZedPlusIxe",
        "licencia": "CC BY-SA 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Guanacos_in_Chacabuco_valley_Chilean_Patagonia.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/64/R%C3%ADo_Cochrane_Reserva_Nacional_Lago_Cochrane_02.jpg/1280px-R%C3%ADo_Cochrane_Reserva_Nacional_Lago_Cochrane_02.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/64/R%C3%ADo_Cochrane_Reserva_Nacional_Lago_Cochrane_02.jpg/1920px-R%C3%ADo_Cochrane_Reserva_Nacional_Lago_Cochrane_02.jpg",
        "credito": "Natalia Reyes Escobar",
        "licencia": "CC BY-SA 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:R%C3%ADo_Cochrane_Reserva_Nacional_Lago_Cochrane_02.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/Laguna_La_Elefantita_Reserva_Nacional_Lago_Cochrane_10.jpg/1280px-Laguna_La_Elefantita_Reserva_Nacional_Lago_Cochrane_10.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/Laguna_La_Elefantita_Reserva_Nacional_Lago_Cochrane_10.jpg/1920px-Laguna_La_Elefantita_Reserva_Nacional_Lago_Cochrane_10.jpg",
        "credito": "Natalia Reyes Escobar",
        "licencia": "CC BY-SA 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Laguna_La_Elefantita_Reserva_Nacional_Lago_Cochrane_10.jpg"
      }
    ]
  },
  "tortel": {
    "nombre": "Caleta Tortel",
    "pais": "Aysén",
    "mapa": "Caleta Tortel",
    "zoom": 14,
    "descripcion": "Pueblo sin calles: todo se recorre por pasarelas de ciprés sobre el agua.",
    "fotos": [
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3f/Pasarelas_en_Caleta_Tortel_-_panoramio.jpg/1280px-Pasarelas_en_Caleta_Tortel_-_panoramio.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3f/Pasarelas_en_Caleta_Tortel_-_panoramio.jpg/1920px-Pasarelas_en_Caleta_Tortel_-_panoramio.jpg",
        "credito": "Manuel Cañón P.",
        "licencia": "CC BY-SA 3.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Pasarelas_en_Caleta_Tortel_-_panoramio.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/Sector_Base_Tortel_2.jpg/1280px-Sector_Base_Tortel_2.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/Sector_Base_Tortel_2.jpg/1920px-Sector_Base_Tortel_2.jpg",
        "credito": "Manxuc",
        "licencia": "CC BY-SA 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Sector_Base_Tortel_2.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ea/Sector_Junquillo_Tortel.jpg/1280px-Sector_Junquillo_Tortel.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ea/Sector_Junquillo_Tortel.jpg/1920px-Sector_Junquillo_Tortel.jpg",
        "credito": "Manxuc",
        "licencia": "CC BY-SA 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Sector_Junquillo_Tortel.jpg"
      }
    ]
  },
  "villa-ohiggins": {
    "nombre": "Villa O'Higgins",
    "pais": "Aysén",
    "mapa": "Villa O'Higgins",
    "zoom": 10,
    "descripcion": "El final de la Carretera Austral. Navegación al Glaciar O'Higgins y la sensación de haber llegado al fin del camino.",
    "fotos": [
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cd/Glaciar_O%27Higgins.JPG/1280px-Glaciar_O%27Higgins.JPG",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cd/Glaciar_O%27Higgins.JPG/1920px-Glaciar_O%27Higgins.JPG",
        "credito": "Roberto Araya Barckhahn",
        "licencia": "CC BY-SA 3.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Glaciar_O%27Higgins.JPG"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/Villa_O%27Higgins_3.jpg/1280px-Villa_O%27Higgins_3.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/Villa_O%27Higgins_3.jpg/1920px-Villa_O%27Higgins_3.jpg",
        "credito": "betoscopio",
        "licencia": "CC BY-SA 2.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Villa_O%27Higgins_3.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/Glaciar_O%27Higgins_o_Ventisquero_Grande.JPG/1280px-Glaciar_O%27Higgins_o_Ventisquero_Grande.JPG",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/Glaciar_O%27Higgins_o_Ventisquero_Grande.JPG/1920px-Glaciar_O%27Higgins_o_Ventisquero_Grande.JPG",
        "credito": "Roberto Araya Barckhahn",
        "licencia": "CC BY-SA 3.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Glaciar_O%27Higgins_o_Ventisquero_Grande.JPG"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Villa_O%27Higgins_.jpg/1280px-Villa_O%27Higgins_.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Villa_O%27Higgins_.jpg/1920px-Villa_O%27Higgins_.jpg",
        "credito": "betoscopio",
        "licencia": "CC BY-SA 2.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Villa_O%27Higgins_.jpg"
      }
    ]
  },
  "general-carrera": {
    "nombre": "Lago General Carrera",
    "pais": "Aysén",
    "mapa": "Puerto Guadal",
    "zoom": 10,
    "descripcion": "El lago más grande de Chile, turquesa. La orilla sur por Puerto Guadal es lo que no conocemos.",
    "fotos": [
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/General_Carrera_Lake_%28180269261%29.jpeg/1280px-General_Carrera_Lake_%28180269261%29.jpeg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/General_Carrera_Lake_%28180269261%29.jpeg/1920px-General_Carrera_Lake_%28180269261%29.jpeg",
        "credito": "Jose Cardenas Vejar",
        "licencia": "CC BY 3.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:General_Carrera_Lake_(180269261).jpeg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Lago_General_Carrera_1.jpg/1280px-Lago_General_Carrera_1.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Lago_General_Carrera_1.jpg/1920px-Lago_General_Carrera_1.jpg",
        "credito": "LBM1948",
        "licencia": "CC BY-SA 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Lago_General_Carrera_1.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Lago_General_Carrera_2.jpg/1280px-Lago_General_Carrera_2.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Lago_General_Carrera_2.jpg/1920px-Lago_General_Carrera_2.jpg",
        "credito": "LBM1948",
        "licencia": "CC BY-SA 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Lago_General_Carrera_2.jpg"
      }
    ]
  },
  "carretera-austral": {
    "nombre": "Carretera Austral",
    "pais": "Aysén",
    "mapa": "Cochrane, Aysén",
    "zoom": 7,
    "descripcion": "La ruta en sí: ripio, lagos, glaciares y paradas donde uno quiera.",
    "fotos": [
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/Carretera_Austral_%28255633637%29.jpeg/1280px-Carretera_Austral_%28255633637%29.jpeg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/Carretera_Austral_%28255633637%29.jpeg/1920px-Carretera_Austral_%28255633637%29.jpeg",
        "credito": "Camila Eyzaguirre",
        "licencia": "CC BY-SA 3.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Carretera_Austral_(255633637).jpeg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/76/Carretera_Austral_en_Bici.jpg/1280px-Carretera_Austral_en_Bici.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/76/Carretera_Austral_en_Bici.jpg/1920px-Carretera_Austral_en_Bici.jpg",
        "credito": "Nicolás Lara",
        "licencia": "CC BY-SA 3.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Carretera_Austral_en_Bici.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fe/Panorama_Carretera_Austral_Cerro_Castillo_%28141195183%29.jpeg/1280px-Panorama_Carretera_Austral_Cerro_Castillo_%28141195183%29.jpeg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fe/Panorama_Carretera_Austral_Cerro_Castillo_%28141195183%29.jpeg/1920px-Panorama_Carretera_Austral_Cerro_Castillo_%28141195183%29.jpeg",
        "credito": "Nicolás Navarrete Carrasco",
        "licencia": "CC BY 3.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Panorama_Carretera_Austral_Cerro_Castillo_(141195183).jpeg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a3/Carretera_Austral_-_Leones.JPG/1280px-Carretera_Austral_-_Leones.JPG",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a3/Carretera_Austral_-_Leones.JPG/1920px-Carretera_Austral_-_Leones.JPG",
        "credito": "Rakela",
        "licencia": "CC BY-SA 3.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Carretera_Austral_-_Leones.JPG"
      }
    ]
  },
  // ---------- Plan B (4 nov): playas antes de Navidad y Chile Chico ----------
  "florianopolis": {
    "nombre": "Florianópolis",
    "pais": "Brasil",
    "mapa": "Florianópolis, Santa Catarina",
    "zoom": 11,
    "descripcion": "Una isla con más de 40 playas: Jurerê de agua quieta, Mole y Joaquina para los surfistas, el Campeche turquesa y la Lagoa da Conceição para comer de noche. A 3 h y media en vuelo directo.",
    "fotos": [
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/Praia_de_Jurer%C3%AA_Internacional.JPG/1280px-Praia_de_Jurer%C3%AA_Internacional.JPG",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/Praia_de_Jurer%C3%AA_Internacional.JPG/1920px-Praia_de_Jurer%C3%AA_Internacional.JPG",
        "credito": "Rafael Bernardino Mattei",
        "licencia": "CC BY-SA 3.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Praia_de_Jurer%C3%AA_Internacional.JPG"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/06/Praia_Mole_Florian%C3%B3polis.jpg/1280px-Praia_Mole_Florian%C3%B3polis.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/06/Praia_Mole_Florian%C3%B3polis.jpg/1920px-Praia_Mole_Florian%C3%B3polis.jpg",
        "credito": "Chamuscajr",
        "licencia": "CC BY-SA 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Praia_Mole_Florian%C3%B3polis.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/73/DanielVianna_Praia_do_Campeche_Florianopolis_SC_%2841528477152%29.jpg/1280px-DanielVianna_Praia_do_Campeche_Florianopolis_SC_%2841528477152%29.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/73/DanielVianna_Praia_do_Campeche_Florianopolis_SC_%2841528477152%29.jpg/1920px-DanielVianna_Praia_do_Campeche_Florianopolis_SC_%2841528477152%29.jpg",
        "credito": "MTur Destinos",
        "licencia": "Public domain",
        "pagina": "https://commons.wikimedia.org/wiki/File:DanielVianna_Praia_do_Campeche_Florianopolis_SC_(41528477152).jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fd/ViewLagoadaConceicao-feb2015.JPG/1280px-ViewLagoadaConceicao-feb2015.JPG",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fd/ViewLagoadaConceicao-feb2015.JPG/1920px-ViewLagoadaConceicao-feb2015.JPG",
        "credito": "Ezarate",
        "licencia": "CC BY-SA 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:ViewLagoadaConceicao-feb2015.JPG"
      }
    ]
  },
  "buzios": {
    "nombre": "Búzios",
    "pais": "Brasil",
    "mapa": "Armação dos Búzios, Rio de Janeiro",
    "zoom": 13,
    "descripcion": "Una península con veinte playas chicas, cada una distinta, a 2 h y media de Río. La Rua das Pedras de noche, Geribá para el día largo y João Fernandes para el snorkel.",
    "fotos": [
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Gerib%C3%A1%2C_B%C3%BAzios_-_Fim_de_tarde.jpg/1280px-Gerib%C3%A1%2C_B%C3%BAzios_-_Fim_de_tarde.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Gerib%C3%A1%2C_B%C3%BAzios_-_Fim_de_tarde.jpg/1920px-Gerib%C3%A1%2C_B%C3%BAzios_-_Fim_de_tarde.jpg",
        "credito": "Professorcarlosgoes",
        "licencia": "CC BY-SA 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Gerib%C3%A1,_B%C3%BAzios_-_Fim_de_tarde.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/Praia_Brava_em_Arma%C3%A7%C3%A3o_dos_B%C3%BAzios_Rio_de_Janeiro.jpg/1280px-Praia_Brava_em_Arma%C3%A7%C3%A3o_dos_B%C3%BAzios_Rio_de_Janeiro.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/Praia_Brava_em_Arma%C3%A7%C3%A3o_dos_B%C3%BAzios_Rio_de_Janeiro.jpg/1920px-Praia_Brava_em_Arma%C3%A7%C3%A3o_dos_B%C3%BAzios_Rio_de_Janeiro.jpg",
        "credito": "Mabscoito",
        "licencia": "CC BY-SA 3.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Praia_Brava_em_Arma%C3%A7%C3%A3o_dos_B%C3%BAzios_Rio_de_Janeiro.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0b/Vista_da_Igreja_de_Sant%27Anna_%28Arma%C3%A7%C3%A3o_dos_B%C3%BAzios%29.jpg/1280px-Vista_da_Igreja_de_Sant%27Anna_%28Arma%C3%A7%C3%A3o_dos_B%C3%BAzios%29.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0b/Vista_da_Igreja_de_Sant%27Anna_%28Arma%C3%A7%C3%A3o_dos_B%C3%BAzios%29.jpg/1920px-Vista_da_Igreja_de_Sant%27Anna_%28Arma%C3%A7%C3%A3o_dos_B%C3%BAzios%29.jpg",
        "credito": "Arthur Bomfim",
        "licencia": "CC BY-SA 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Vista_da_Igreja_de_Sant%27Anna_(Arma%C3%A7%C3%A3o_dos_B%C3%BAzios).jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/Anoitecer_na_praia_de_Gerib%C3%A1.JPG/1280px-Anoitecer_na_praia_de_Gerib%C3%A1.JPG",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/Anoitecer_na_praia_de_Gerib%C3%A1.JPG/1920px-Anoitecer_na_praia_de_Gerib%C3%A1.JPG",
        "credito": "Pedro Perales Ramalho",
        "licencia": "CC BY-SA 3.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Anoitecer_na_praia_de_Gerib%C3%A1.JPG"
      }
    ]
  },
  "porto-de-galinhas": {
    "nombre": "Porto de Galinhas",
    "pais": "Brasil",
    "mapa": "Porto de Galinhas, Ipojuca, Pernambuco",
    "zoom": 13,
    "descripcion": "El agua más tibia de todas. Con marea baja se forman piscinas naturales entre los arrecifes y se llega en jangada a ver peces de colores. Muro Alto, al lado, es una laguna de mar quieto.",
    "fotos": [
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/99/Piscinas_Naturais_de_Porto_de_Galinhas_-_Pernambuco.jpg/1280px-Piscinas_Naturais_de_Porto_de_Galinhas_-_Pernambuco.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/99/Piscinas_Naturais_de_Porto_de_Galinhas_-_Pernambuco.jpg/1920px-Piscinas_Naturais_de_Porto_de_Galinhas_-_Pernambuco.jpg",
        "credito": "Beto Quissak",
        "licencia": "CC BY-SA 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Piscinas_Naturais_de_Porto_de_Galinhas_-_Pernambuco.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ea/BRUNO_LIMA_PISCINAS_NATURAIS_DE_PORTO_DE_GALINHAS_IPOJUCA_PE_%2827037766848%29.jpg/1280px-BRUNO_LIMA_PISCINAS_NATURAIS_DE_PORTO_DE_GALINHAS_IPOJUCA_PE_%2827037766848%29.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ea/BRUNO_LIMA_PISCINAS_NATURAIS_DE_PORTO_DE_GALINHAS_IPOJUCA_PE_%2827037766848%29.jpg/1920px-BRUNO_LIMA_PISCINAS_NATURAIS_DE_PORTO_DE_GALINHAS_IPOJUCA_PE_%2827037766848%29.jpg",
        "credito": "MTur Destinos",
        "licencia": "Public domain",
        "pagina": "https://commons.wikimedia.org/wiki/File:BRUNO_LIMA_PISCINAS_NATURAIS_DE_PORTO_DE_GALINHAS_IPOJUCA_PE_(27037766848).jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/Praia_de_Muro_Alto_-_Ipojuca%2C_Pernambuco%2C_Brasil.jpg/1280px-Praia_de_Muro_Alto_-_Ipojuca%2C_Pernambuco%2C_Brasil.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/Praia_de_Muro_Alto_-_Ipojuca%2C_Pernambuco%2C_Brasil.jpg/1920px-Praia_de_Muro_Alto_-_Ipojuca%2C_Pernambuco%2C_Brasil.jpg",
        "credito": "Eduardo Marquetti",
        "licencia": "CC BY-SA 2.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Praia_de_Muro_Alto_-_Ipojuca,_Pernambuco,_Brasil.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/BRUNO_LIMA_PRAIA_DE_MURO_ALTO_IPOJUCA_PE_%2840908731001%29.jpg/1280px-BRUNO_LIMA_PRAIA_DE_MURO_ALTO_IPOJUCA_PE_%2840908731001%29.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/BRUNO_LIMA_PRAIA_DE_MURO_ALTO_IPOJUCA_PE_%2840908731001%29.jpg/1920px-BRUNO_LIMA_PRAIA_DE_MURO_ALTO_IPOJUCA_PE_%2840908731001%29.jpg",
        "credito": "MTur Destinos",
        "licencia": "Public domain",
        "pagina": "https://commons.wikimedia.org/wiki/File:BRUNO_LIMA_PRAIA_DE_MURO_ALTO_IPOJUCA_PE_(40908731001).jpg"
      }
    ]
  },
  "maceio": {
    "nombre": "Maceió",
    "pais": "Brasil",
    "mapa": "Maceió, Alagoas",
    "zoom": 11,
    "descripcion": "Playas de agua verde y piscinas naturales en la Pajuçara, y a 2 h el mar de Maragogi, que le dicen el Caribe brasileño. Acá están los todo incluido más conocidos del nordeste.",
    "fotos": [
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/Maragogi_-_Alagoas_%2816364632559%29.jpg/1280px-Maragogi_-_Alagoas_%2816364632559%29.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/Maragogi_-_Alagoas_%2816364632559%29.jpg/1920px-Maragogi_-_Alagoas_%2816364632559%29.jpg",
        "credito": "Marinelson Almeida - Traveling through Brazil",
        "licencia": "CC BY 2.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Maragogi_-_Alagoas_(16364632559).jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/Praia_de_Paju%C3%A7ara_-_Macei%C3%B3_-_Alagoas_%2813125463894%29.jpg/1280px-Praia_de_Paju%C3%A7ara_-_Macei%C3%B3_-_Alagoas_%2813125463894%29.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/Praia_de_Paju%C3%A7ara_-_Macei%C3%B3_-_Alagoas_%2813125463894%29.jpg/1920px-Praia_de_Paju%C3%A7ara_-_Macei%C3%B3_-_Alagoas_%2813125463894%29.jpg",
        "credito": "Marinelson Almeida - Traveling through Brazil",
        "licencia": "CC BY 2.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Praia_de_Paju%C3%A7ara_-_Macei%C3%B3_-_Alagoas_(13125463894).jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/Maragogi_-_Alagoas_-_Brasil._%2816354731032%29.jpg/1280px-Maragogi_-_Alagoas_-_Brasil._%2816354731032%29.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/Maragogi_-_Alagoas_-_Brasil._%2816354731032%29.jpg/1920px-Maragogi_-_Alagoas_-_Brasil._%2816354731032%29.jpg",
        "credito": "Marinelson Almeida - Traveling through Brazil",
        "licencia": "CC BY 2.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Maragogi_-_Alagoas_-_Brasil._(16354731032).jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/95/Praia_Paju%C3%A7ara_Macei%C3%B3_04_2015_3249.JPG/1280px-Praia_Paju%C3%A7ara_Macei%C3%B3_04_2015_3249.JPG",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/95/Praia_Paju%C3%A7ara_Macei%C3%B3_04_2015_3249.JPG/1920px-Praia_Paju%C3%A7ara_Macei%C3%B3_04_2015_3249.JPG",
        "credito": "Mariordo (Mario Roberto Durán Ortiz)",
        "licencia": "CC BY-SA 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Praia_Paju%C3%A7ara_Macei%C3%B3_04_2015_3249.JPG"
      }
    ]
  },
  "cartagena": {
    "nombre": "Cartagena",
    "pais": "Colombia",
    "mapa": "Cartagena de Indias, Colombia",
    "zoom": 13,
    "descripcion": "La ciudad amurallada de colores, con balcones de flores y atardeceres en la muralla. Las playas lindas están afuera: Islas del Rosario y Barú, en lancha.",
    "fotos": [
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9f/View_of_Cartagena_from_Convento_de_Santa_Cruz_de_la_Popa_02.jpg/1280px-View_of_Cartagena_from_Convento_de_Santa_Cruz_de_la_Popa_02.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9f/View_of_Cartagena_from_Convento_de_Santa_Cruz_de_la_Popa_02.jpg/1920px-View_of_Cartagena_from_Convento_de_Santa_Cruz_de_la_Popa_02.jpg",
        "credito": "Bernard Gagnon",
        "licencia": "CC BY-SA 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:View_of_Cartagena_from_Convento_de_Santa_Cruz_de_la_Popa_02.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/da/Ciudad_Amurallada_Cartagena_de_Indias.jpg/1280px-Ciudad_Amurallada_Cartagena_de_Indias.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/da/Ciudad_Amurallada_Cartagena_de_Indias.jpg/1920px-Ciudad_Amurallada_Cartagena_de_Indias.jpg",
        "credito": "Angela bustosc91",
        "licencia": "CC BY-SA 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Ciudad_Amurallada_Cartagena_de_Indias.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/La_ciudad_amurallada_de_Cartagena_de_Indias.JPG/1280px-La_ciudad_amurallada_de_Cartagena_de_Indias.JPG",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/La_ciudad_amurallada_de_Cartagena_de_Indias.JPG/1920px-La_ciudad_amurallada_de_Cartagena_de_Indias.JPG",
        "credito": "Cinematicguy",
        "licencia": "CC BY-SA 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:La_ciudad_amurallada_de_Cartagena_de_Indias.JPG"
      }
    ]
  },
  "chile-chico": {
    "nombre": "Chile Chico y Jeinimeni",
    "pais": "Chile · Aysén",
    "mapa": "Chile Chico, Aysén",
    "zoom": 10,
    "descripcion": "El otro lado del General Carrera, el más soleado de Aysén. Se llega por el Paso Las Llaves, un camino tallado en el cerro sobre el lago, y al sur está la Reserva Jeinimeni, con lagunas verdes y la Cueva de las Manos.",
    "fotos": [
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Lago_Verde_Reserva_Jeinimeni.jpg/1280px-Lago_Verde_Reserva_Jeinimeni.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Lago_Verde_Reserva_Jeinimeni.jpg/1920px-Lago_Verde_Reserva_Jeinimeni.jpg",
        "credito": "Jclavero92",
        "licencia": "CC BY-SA 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Lago_Verde_Reserva_Jeinimeni.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/65/Laguna_Jeinimeni_desde_sendero_silencio_01.jpg/1280px-Laguna_Jeinimeni_desde_sendero_silencio_01.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/65/Laguna_Jeinimeni_desde_sendero_silencio_01.jpg/1920px-Laguna_Jeinimeni_desde_sendero_silencio_01.jpg",
        "credito": "Prii.isa",
        "licencia": "CC BY-SA 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Laguna_Jeinimeni_desde_sendero_silencio_01.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/Lago_General_Carrera_-_Chile_Chico.jpg/1280px-Lago_General_Carrera_-_Chile_Chico.jpg",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/Lago_General_Carrera_-_Chile_Chico.jpg/1920px-Lago_General_Carrera_-_Chile_Chico.jpg",
        "credito": "Jpmorenosanchez",
        "licencia": "CC BY-SA 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Lago_General_Carrera_-_Chile_Chico.jpg"
      },
      {
        "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Lago_General_Carrera_Camino_a_Chile_Chico.JPG/1280px-Lago_General_Carrera_Camino_a_Chile_Chico.JPG",
        "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Lago_General_Carrera_Camino_a_Chile_Chico.JPG/1920px-Lago_General_Carrera_Camino_a_Chile_Chico.JPG",
        "credito": "Felipedd",
        "licencia": "CC BY-SA 4.0",
        "pagina": "https://commons.wikimedia.org/wiki/File:Lago_General_Carrera_Camino_a_Chile_Chico.JPG"
      }
    ]
  }
};

// ---------- Más fotos (5 nov): playas, alrededores de los todo incluido y la ruta del plan B ----------
// nota: lo que sale en el visor de fotos. Ninguno de los resorts tiene fotos libres en Commons: las del hotel van con link.
LUGARES.cochrane = {
  nombre: 'Cochrane y el Tamango', pais: 'Chile · Aysén', mapa: 'Cochrane, Aysén', zoom: 11,
  descripcion: 'El último pueblo grande antes del fin del camino: bencina, súper y el río Cochrane de color turquesa. Al lado está la Reserva Tamango, con huemules si hay suerte.',
  fotos: [
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/R%C3%ADo_Cochrane.jpg/1280px-R%C3%ADo_Cochrane.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/R%C3%ADo_Cochrane.jpg/1920px-R%C3%ADo_Cochrane.jpg", "credito": "Manxuc", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:R%C3%ADo_Cochrane.jpg", "nota": "El río Cochrane"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/80/R%C3%ADo_Cochrane_Reserva_Nacional_Lago_Cochrane_01.jpg/1280px-R%C3%ADo_Cochrane_Reserva_Nacional_Lago_Cochrane_01.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/80/R%C3%ADo_Cochrane_Reserva_Nacional_Lago_Cochrane_01.jpg/1920px-R%C3%ADo_Cochrane_Reserva_Nacional_Lago_Cochrane_01.jpg", "credito": "Natalia Reyes Escobar", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:R%C3%ADo_Cochrane_Reserva_Nacional_Lago_Cochrane_01.jpg", "nota": "El río Cochrane en la reserva"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/Tamango_Reserve_descending_to_Cochrane.jpg/1280px-Tamango_Reserve_descending_to_Cochrane.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/Tamango_Reserve_descending_to_Cochrane.jpg/1920px-Tamango_Reserve_descending_to_Cochrane.jpg", "credito": "Jaymenna78734", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Tamango_Reserve_descending_to_Cochrane.jpg", "nota": "Bajando del Tamango a Cochrane"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/Cerro_Tamango_Reserva_Nacional_Lago_Cochrane_05.jpg/1280px-Cerro_Tamango_Reserva_Nacional_Lago_Cochrane_05.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/Cerro_Tamango_Reserva_Nacional_Lago_Cochrane_05.jpg/1920px-Cerro_Tamango_Reserva_Nacional_Lago_Cochrane_05.jpg", "credito": "Natalia Reyes Escobar", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Cerro_Tamango_Reserva_Nacional_Lago_Cochrane_05.jpg", "nota": "El Cerro Tamango"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/aa/Lago_Cochrane.jpg/1280px-Lago_Cochrane.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/aa/Lago_Cochrane.jpg/1920px-Lago_Cochrane.jpg", "credito": "betoscopio", "licencia": "CC BY-SA 2.0", "pagina": "https://commons.wikimedia.org/wiki/File:Lago_Cochrane.jpg", "nota": "Lago Cochrane"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/Reserva_Nacional_Lago_Cochrane_11.jpg/1280px-Reserva_Nacional_Lago_Cochrane_11.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/Reserva_Nacional_Lago_Cochrane_11.jpg/1920px-Reserva_Nacional_Lago_Cochrane_11.jpg", "credito": "Natalia Reyes Escobar", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Reserva_Nacional_Lago_Cochrane_11.jpg", "nota": "Reserva Lago Cochrane"}
  ]
};
LUGARES['puerto-ibanez'] = {
  nombre: 'Puerto Ingeniero Ibáñez', pais: 'Chile · Aysén', mapa: 'Puerto Ingeniero Ibáñez, Aysén', zoom: 12,
  descripcion: 'Donde llega la barcaza desde Chile Chico. Un pueblo chico de alfareros y huertos, a una hora y media de Balmaceda.',
  fotos: [
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/27/Puerto_Ingeniero_Ib%C3%A1%C3%B1ez_-_Flickr_-_adasinh.jpg/1280px-Puerto_Ingeniero_Ib%C3%A1%C3%B1ez_-_Flickr_-_adasinh.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/27/Puerto_Ingeniero_Ib%C3%A1%C3%B1ez_-_Flickr_-_adasinh.jpg/1920px-Puerto_Ingeniero_Ib%C3%A1%C3%B1ez_-_Flickr_-_adasinh.jpg", "credito": "Ada sin h", "licencia": "CC BY-SA 2.0", "pagina": "https://commons.wikimedia.org/wiki/File:Puerto_Ingeniero_Ib%C3%A1%C3%B1ez_-_Flickr_-_adasinh.jpg", "nota": "Puerto Ingeniero Ibáñez"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4f/Puerto_Ingeniero_Ib%C3%A1%C3%B1ez_-_Aisen_Region_-_Chile_%283582857885%29.jpg/1280px-Puerto_Ingeniero_Ib%C3%A1%C3%B1ez_-_Aisen_Region_-_Chile_%283582857885%29.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4f/Puerto_Ingeniero_Ib%C3%A1%C3%B1ez_-_Aisen_Region_-_Chile_%283582857885%29.jpg/1920px-Puerto_Ingeniero_Ib%C3%A1%C3%B1ez_-_Aisen_Region_-_Chile_%283582857885%29.jpg", "credito": "Daniel P. Gauer", "licencia": "CC BY 2.0", "pagina": "https://commons.wikimedia.org/wiki/File:Puerto_Ingeniero_Ib%C3%A1%C3%B1ez_-_Aisen_Region_-_Chile_(3582857885).jpg", "nota": "Puerto Ibáñez"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/Lago_General_Carrera_desde_Puerto_Ib%C3%A1%C3%B1ez.JPG/1280px-Lago_General_Carrera_desde_Puerto_Ib%C3%A1%C3%B1ez.JPG", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/Lago_General_Carrera_desde_Puerto_Ib%C3%A1%C3%B1ez.JPG/1920px-Lago_General_Carrera_desde_Puerto_Ib%C3%A1%C3%B1ez.JPG", "credito": "Lin linao", "licencia": "CC BY-SA 3.0", "pagina": "https://commons.wikimedia.org/wiki/File:Lago_General_Carrera_desde_Puerto_Ib%C3%A1%C3%B1ez.JPG", "nota": "El lago desde Ibáñez: de acá llega la barcaza"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/Cacharro_de_greda_de_Puerto_Ingeniero_Iba%C3%B1ez.jpg/1280px-Cacharro_de_greda_de_Puerto_Ingeniero_Iba%C3%B1ez.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/Cacharro_de_greda_de_Puerto_Ingeniero_Iba%C3%B1ez.jpg/1920px-Cacharro_de_greda_de_Puerto_Ingeniero_Iba%C3%B1ez.jpg", "credito": "Sfs90", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Cacharro_de_greda_de_Puerto_Ingeniero_Iba%C3%B1ez.jpg", "nota": "La greda de Ibáñez, típica del pueblo"}
  ]
};
const MAS_FOTOS = {
  'maceio': [
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f0/Ponta_Verde_Lighthouse_landscape_-_Macei%C3%B3%2C_Brazil_%28edited%29.jpg/1280px-Ponta_Verde_Lighthouse_landscape_-_Macei%C3%B3%2C_Brazil_%28edited%29.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f0/Ponta_Verde_Lighthouse_landscape_-_Macei%C3%B3%2C_Brazil_%28edited%29.jpg/1920px-Ponta_Verde_Lighthouse_landscape_-_Macei%C3%B3%2C_Brazil_%28edited%29.jpg", "credito": "André Lage Freitas", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Ponta_Verde_Lighthouse_landscape_-_Macei%C3%B3,_Brazil_(edited).jpg", "nota": "El faro de Ponta Verde, en la costanera de Maceió"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e7/Recreation_at_Ponta_Verde_beach_-_Macei%C3%B3%2C_Brazil.jpg/1280px-Recreation_at_Ponta_Verde_beach_-_Macei%C3%B3%2C_Brazil.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e7/Recreation_at_Ponta_Verde_beach_-_Macei%C3%B3%2C_Brazil.jpg/1920px-Recreation_at_Ponta_Verde_beach_-_Macei%C3%B3%2C_Brazil.jpg", "credito": "André Lage Freitas", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Recreation_at_Ponta_Verde_beach_-_Macei%C3%B3,_Brazil.jpg", "nota": "Ponta Verde con marea baja"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/Praia_da_Jati%C3%BAca%2C_Macei%C3%B3.jpg/1280px-Praia_da_Jati%C3%BAca%2C_Macei%C3%B3.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/Praia_da_Jati%C3%BAca%2C_Macei%C3%B3.jpg/1920px-Praia_da_Jati%C3%BAca%2C_Macei%C3%B3.jpg", "credito": "Luciano Marra", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Praia_da_Jati%C3%BAca,_Macei%C3%B3.jpg", "nota": "Jatiúca, la playa de los hoteles grandes"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/99/Marco_Ankosqui_Praia_Ipioca_Maceio-AL_%2841609477621%29.jpg/1280px-Marco_Ankosqui_Praia_Ipioca_Maceio-AL_%2841609477621%29.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/99/Marco_Ankosqui_Praia_Ipioca_Maceio-AL_%2841609477621%29.jpg/1920px-Marco_Ankosqui_Praia_Ipioca_Maceio-AL_%2841609477621%29.jpg", "credito": "MTur Destinos", "licencia": "Public domain", "pagina": "https://commons.wikimedia.org/wiki/File:Marco_Ankosqui_Praia_Ipioca_Maceio-AL_(41609477621).jpg", "nota": "Ipioca, en la costa norte: la zona del Pratagy"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/Marco_Ankosqui_Praia_Ipioca_Maceio-AL_%2839955592075%29.jpg/1280px-Marco_Ankosqui_Praia_Ipioca_Maceio-AL_%2839955592075%29.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/Marco_Ankosqui_Praia_Ipioca_Maceio-AL_%2839955592075%29.jpg/1920px-Marco_Ankosqui_Praia_Ipioca_Maceio-AL_%2839955592075%29.jpg", "credito": "MTur Destinos", "licencia": "Public domain", "pagina": "https://commons.wikimedia.org/wiki/File:Marco_Ankosqui_Praia_Ipioca_Maceio-AL_(39955592075).jpg", "nota": "Ipioca, cocos y mar verde"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Jangadas_na_Praia_de_Paju%C3%A7ara.jpg/1280px-Jangadas_na_Praia_de_Paju%C3%A7ara.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Jangadas_na_Praia_de_Paju%C3%A7ara.jpg/1920px-Jangadas_na_Praia_de_Paju%C3%A7ara.jpg", "credito": "Claudiorpmsousa", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Jangadas_na_Praia_de_Paju%C3%A7ara.jpg", "nota": "Las jangadas que llevan a las piscinas de Pajuçara"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2b/Praia_do_Gunga_140.jpg/1280px-Praia_do_Gunga_140.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2b/Praia_do_Gunga_140.jpg/1920px-Praia_do_Gunga_140.jpg", "credito": "Dario Sanches", "licencia": "CC BY-SA 2.0", "pagina": "https://commons.wikimedia.org/wiki/File:Praia_do_Gunga_140.jpg", "nota": "Praia do Gunga, el paseo clásico de un día"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/Praia-do-gunga-2012-09-22.JPG/1280px-Praia-do-gunga-2012-09-22.JPG", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/Praia-do-gunga-2012-09-22.JPG/1920px-Praia-do-gunga-2012-09-22.JPG", "credito": "André Lage Freitas", "licencia": "CC BY-SA 3.0", "pagina": "https://commons.wikimedia.org/wiki/File:Praia-do-gunga-2012-09-22.JPG", "nota": "Gunga: la punta entre el mar y la laguna"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Praia_do_Franc%C3%AAs%2C_Alagoas_%2851798272012%29.jpg/1280px-Praia_do_Franc%C3%AAs%2C_Alagoas_%2851798272012%29.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Praia_do_Franc%C3%AAs%2C_Alagoas_%2851798272012%29.jpg/1920px-Praia_do_Franc%C3%AAs%2C_Alagoas_%2851798272012%29.jpg", "credito": "Daniel Alves", "licencia": "Public domain", "pagina": "https://commons.wikimedia.org/wiki/File:Praia_do_Franc%C3%AAs,_Alagoas_(51798272012).jpg", "nota": "Praia do Francês, a 30 min al sur"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e0/Peixe_papagaio_-_Piscinas_naturais_de_maragogi_-_Alagoas.jpg/1280px-Peixe_papagaio_-_Piscinas_naturais_de_maragogi_-_Alagoas.jpg", "grande": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Peixe_papagaio_-_Piscinas_naturais_de_maragogi_-_Alagoas.jpg", "credito": "Beto Quissak", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Peixe_papagaio_-_Piscinas_naturais_de_maragogi_-_Alagoas.jpg", "nota": "Peces en las piscinas naturales de Maragogi"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Maragogi_beach_tourist.jpg/1280px-Maragogi_beach_tourist.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Maragogi_beach_tourist.jpg/1920px-Maragogi_beach_tourist.jpg", "credito": "Dario Sanches", "licencia": "CC BY-SA 2.0", "pagina": "https://commons.wikimedia.org/wiki/File:Maragogi_beach_tourist.jpg", "nota": "Maragogi, el \"Caribe brasileño\""}
  ],
  'cartagena': [
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0a/Playa_de_Bocagrande%2C_Cartagena%2C_Colombia.jpg/1280px-Playa_de_Bocagrande%2C_Cartagena%2C_Colombia.jpg", "grande": "https://upload.wikimedia.org/wikipedia/commons/0/0a/Playa_de_Bocagrande%2C_Cartagena%2C_Colombia.jpg", "credito": "Pedro Szekely", "licencia": "CC BY 2.0", "pagina": "https://commons.wikimedia.org/wiki/File:Playa_de_Bocagrande,_Cartagena,_Colombia.jpg", "nota": "Bocagrande: acá está el Decameron"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ef/Playa_Bocagrande_-_Cartagena%2C_Colombia_-_January_2016.jpg/1280px-Playa_Bocagrande_-_Cartagena%2C_Colombia_-_January_2016.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ef/Playa_Bocagrande_-_Cartagena%2C_Colombia_-_January_2016.jpg/1920px-Playa_Bocagrande_-_Cartagena%2C_Colombia_-_January_2016.jpg", "credito": "Joe Ross", "licencia": "CC BY-SA 2.0", "pagina": "https://commons.wikimedia.org/wiki/File:Playa_Bocagrande_-_Cartagena,_Colombia_-_January_2016.jpg", "nota": "La playa de Bocagrande en enero"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c0/Cocolise_Isla_Resort%2C_Islas_del_Rosario_%2823938738774%29.jpg/1280px-Cocolise_Isla_Resort%2C_Islas_del_Rosario_%2823938738774%29.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c0/Cocolise_Isla_Resort%2C_Islas_del_Rosario_%2823938738774%29.jpg/1920px-Cocolise_Isla_Resort%2C_Islas_del_Rosario_%2823938738774%29.jpg", "credito": "Joe Ross", "licencia": "CC BY-SA 2.0", "pagina": "https://commons.wikimedia.org/wiki/File:Cocolise_Isla_Resort,_Islas_del_Rosario_(23938738774).jpg", "nota": "Islas del Rosario, a una hora en lancha"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/65/Cocolise_Isla_Resort%2C_Islas_del_Rosario_%2823938769704%29.jpg/1280px-Cocolise_Isla_Resort%2C_Islas_del_Rosario_%2823938769704%29.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/65/Cocolise_Isla_Resort%2C_Islas_del_Rosario_%2823938769704%29.jpg/1920px-Cocolise_Isla_Resort%2C_Islas_del_Rosario_%2823938769704%29.jpg", "credito": "Joe Ross", "licencia": "CC BY-SA 2.0", "pagina": "https://commons.wikimedia.org/wiki/File:Cocolise_Isla_Resort,_Islas_del_Rosario_(23938769704).jpg", "nota": "Agua de Islas del Rosario"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4a/Playa_Blanca%2C_Bar%C3%BA.jpg/1280px-Playa_Blanca%2C_Bar%C3%BA.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4a/Playa_Blanca%2C_Bar%C3%BA.jpg/1920px-Playa_Blanca%2C_Bar%C3%BA.jpg", "credito": "Felipeortegag", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Playa_Blanca,_Bar%C3%BA.jpg", "nota": "Playa Blanca, en Barú"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/Atardecer_en_Playa_Blanca_-_Isla_Bar%C3%BA_2.jpg/1280px-Atardecer_en_Playa_Blanca_-_Isla_Bar%C3%BA_2.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/Atardecer_en_Playa_Blanca_-_Isla_Bar%C3%BA_2.jpg/1920px-Atardecer_en_Playa_Blanca_-_Isla_Bar%C3%BA_2.jpg", "credito": "TitiNicola", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Atardecer_en_Playa_Blanca_-_Isla_Bar%C3%BA_2.jpg", "nota": "Atardecer en Barú"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/85/Plaza_Santo_Domingo%2C_Cartagena.jpg/1280px-Plaza_Santo_Domingo%2C_Cartagena.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/85/Plaza_Santo_Domingo%2C_Cartagena.jpg/1920px-Plaza_Santo_Domingo%2C_Cartagena.jpg", "credito": "Bernard Gagnon", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Plaza_Santo_Domingo,_Cartagena.jpg", "nota": "Plaza Santo Domingo, en la ciudad amurallada"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ae/Balcones_de_cartagena_2.jpg/1280px-Balcones_de_cartagena_2.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ae/Balcones_de_cartagena_2.jpg/1920px-Balcones_de_cartagena_2.jpg", "credito": "Carlos David Machacon Blanquicett", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Balcones_de_cartagena_2.jpg", "nota": "Los balcones de flores"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8c/Graffiti_in_Getseman%C3%AD%2C_Cartagena_01.jpg/1280px-Graffiti_in_Getseman%C3%AD%2C_Cartagena_01.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8c/Graffiti_in_Getseman%C3%AD%2C_Cartagena_01.jpg/1920px-Graffiti_in_Getseman%C3%AD%2C_Cartagena_01.jpg", "credito": "Bernard Gagnon", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Graffiti_in_Getseman%C3%AD,_Cartagena_01.jpg", "nota": "Getsemaní, el barrio para salir de noche"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/Plazuela_del_Pozo%2C_Getseman%C3%AD%2C_Cartagena_01.jpg/1280px-Plazuela_del_Pozo%2C_Getseman%C3%AD%2C_Cartagena_01.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/Plazuela_del_Pozo%2C_Getseman%C3%AD%2C_Cartagena_01.jpg/1920px-Plazuela_del_Pozo%2C_Getseman%C3%AD%2C_Cartagena_01.jpg", "credito": "Bernard Gagnon", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Plazuela_del_Pozo,_Getseman%C3%AD,_Cartagena_01.jpg", "nota": "Plazuela del Pozo, Getsemaní"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/af/Castillo_San_Felipe_de_Barajas%2C_Cartagena_14.jpg/1280px-Castillo_San_Felipe_de_Barajas%2C_Cartagena_14.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/af/Castillo_San_Felipe_de_Barajas%2C_Cartagena_14.jpg/1920px-Castillo_San_Felipe_de_Barajas%2C_Cartagena_14.jpg", "credito": "Bernard Gagnon", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Castillo_San_Felipe_de_Barajas,_Cartagena_14.jpg", "nota": "Castillo San Felipe"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/35/Atardecer_CTG_11_2019_9832.jpg/1280px-Atardecer_CTG_11_2019_9832.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/35/Atardecer_CTG_11_2019_9832.jpg/1920px-Atardecer_CTG_11_2019_9832.jpg", "credito": "Mariordo (Mario Roberto Durán Ortiz)", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Atardecer_CTG_11_2019_9832.jpg", "nota": "Atardecer desde la muralla"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/Colonial_Postcards_Palenquera_Portrait_I_%28177664379%29.jpeg/1280px-Colonial_Postcards_Palenquera_Portrait_I_%28177664379%29.jpeg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/Colonial_Postcards_Palenquera_Portrait_I_%28177664379%29.jpeg/1920px-Colonial_Postcards_Palenquera_Portrait_I_%28177664379%29.jpeg", "credito": "Dave Gonzalez", "licencia": "CC BY 3.0", "pagina": "https://commons.wikimedia.org/wiki/File:Colonial_Postcards_Palenquera_Portrait_I_(177664379).jpeg", "nota": "Una palenquera con su fruta"}
  ],
  'florianopolis': [
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Dunas_da_Praia_de_Joaquina%2C_Florian%C3%B3polis%2C_SC.jpg/1280px-Dunas_da_Praia_de_Joaquina%2C_Florian%C3%B3polis%2C_SC.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Dunas_da_Praia_de_Joaquina%2C_Florian%C3%B3polis%2C_SC.jpg/1920px-Dunas_da_Praia_de_Joaquina%2C_Florian%C3%B3polis%2C_SC.jpg", "credito": "Amanda Likes", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Dunas_da_Praia_de_Joaquina,_Florian%C3%B3polis,_SC.jpg", "nota": "Las dunas de Joaquina (se baja en sandboard)"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f4/Lagoinha_do_Leste%2C_Floripa_-_SC.jpg/1280px-Lagoinha_do_Leste%2C_Floripa_-_SC.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f4/Lagoinha_do_Leste%2C_Floripa_-_SC.jpg/1920px-Lagoinha_do_Leste%2C_Floripa_-_SC.jpg", "credito": "Alexandre Pires Bernardes", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Lagoinha_do_Leste,_Floripa_-_SC.jpg", "nota": "Lagoinha do Leste: se llega caminando 1 h"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fb/Praia_da_Lagoinha_do_Leste%2C_Florian%C3%B3polis.jpg/1280px-Praia_da_Lagoinha_do_Leste%2C_Florian%C3%B3polis.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fb/Praia_da_Lagoinha_do_Leste%2C_Florian%C3%B3polis.jpg/1920px-Praia_da_Lagoinha_do_Leste%2C_Florian%C3%B3polis.jpg", "credito": "Papa Pic", "licencia": "CC0", "pagina": "https://commons.wikimedia.org/wiki/File:Praia_da_Lagoinha_do_Leste,_Florian%C3%B3polis.jpg", "nota": "Lagoinha do Leste desde el cerro"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/Ponte_Herc%C3%ADlio_Luz_Florian%C3%B3polis.jpg/1280px-Ponte_Herc%C3%ADlio_Luz_Florian%C3%B3polis.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/Ponte_Herc%C3%ADlio_Luz_Florian%C3%B3polis.jpg/1920px-Ponte_Herc%C3%ADlio_Luz_Florian%C3%B3polis.jpg", "credito": "Chamuscajr", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Ponte_Herc%C3%ADlio_Luz_Florian%C3%B3polis.jpg", "nota": "El puente Hercílio Luz, entrando a la isla"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8b/Santo_Ant%C3%B4nio_de_Lisboa_%28Floripa%29_by_K%C3%A1tiia_C._Oliveira_-_05.jpg/1280px-Santo_Ant%C3%B4nio_de_Lisboa_%28Floripa%29_by_K%C3%A1tiia_C._Oliveira_-_05.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8b/Santo_Ant%C3%B4nio_de_Lisboa_%28Floripa%29_by_K%C3%A1tiia_C._Oliveira_-_05.jpg/1920px-Santo_Ant%C3%B4nio_de_Lisboa_%28Floripa%29_by_K%C3%A1tiia_C._Oliveira_-_05.jpg", "credito": "Ajmcbarreto", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Santo_Ant%C3%B4nio_de_Lisboa_(Floripa)_by_K%C3%A1tiia_C._Oliveira_-_05.jpg", "nota": "Santo Antônio de Lisboa: ostras al atardecer"}
  ],
  'buzios': [
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Praia_de_Jo%C3%A3o_Fernandes_01.jpg/1280px-Praia_de_Jo%C3%A3o_Fernandes_01.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Praia_de_Jo%C3%A3o_Fernandes_01.jpg/1920px-Praia_de_Jo%C3%A3o_Fernandes_01.jpg", "credito": "Halley Pacheco de Oliveira", "licencia": "CC BY-SA 3.0", "pagina": "https://commons.wikimedia.org/wiki/File:Praia_de_Jo%C3%A3o_Fernandes_01.jpg", "nota": "João Fernandes, la del snorkel"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d3/Buzios-JoaoFernandes.jpg/1280px-Buzios-JoaoFernandes.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d3/Buzios-JoaoFernandes.jpg/1920px-Buzios-JoaoFernandes.jpg", "credito": "Fulviusbsas", "licencia": "CC BY-SA 3.0", "pagina": "https://commons.wikimedia.org/wiki/File:Buzios-JoaoFernandes.jpg", "nota": "João Fernandes desde arriba"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/05/Rua_das_pedras.JPG/1280px-Rua_das_pedras.JPG", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/05/Rua_das_pedras.JPG/1920px-Rua_das_pedras.JPG", "credito": "Isadoraacrd", "licencia": "CC BY-SA 3.0", "pagina": "https://commons.wikimedia.org/wiki/File:Rua_das_pedras.JPG", "nota": "Rua das Pedras, para comer de noche"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/Buzios-RuaPedras2.jpg/1280px-Buzios-RuaPedras2.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/Buzios-RuaPedras2.jpg/1920px-Buzios-RuaPedras2.jpg", "credito": "Fulviusbsas", "licencia": "CC BY-SA 3.0", "pagina": "https://commons.wikimedia.org/wiki/File:Buzios-RuaPedras2.jpg", "nota": "Rua das Pedras"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c3/Orla_Bardot%2C_B%C3%BAzios.jpg/1280px-Orla_Bardot%2C_B%C3%BAzios.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c3/Orla_Bardot%2C_B%C3%BAzios.jpg/1920px-Orla_Bardot%2C_B%C3%BAzios.jpg", "credito": "Viniciusmpv", "licencia": "CC BY-SA 3.0", "pagina": "https://commons.wikimedia.org/wiki/File:Orla_Bardot,_B%C3%BAzios.jpg", "nota": "La Orla Bardot, la costanera"}
  ],
  'porto-de-galinhas': [
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/18/Jangadas_em_Porto_de_Galinhas_-_Brasil_%287489903588%29.jpg/1280px-Jangadas_em_Porto_de_Galinhas_-_Brasil_%287489903588%29.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/18/Jangadas_em_Porto_de_Galinhas_-_Brasil_%287489903588%29.jpg/1920px-Jangadas_em_Porto_de_Galinhas_-_Brasil_%287489903588%29.jpg", "credito": "Marinelson Almeida", "licencia": "CC BY 2.0", "pagina": "https://commons.wikimedia.org/wiki/File:Jangadas_em_Porto_de_Galinhas_-_Brasil_(7489903588).jpg", "nota": "Las jangadas que llevan a las piscinas"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/db/Porto_de_Galinhas_praia.jpg/1280px-Porto_de_Galinhas_praia.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/db/Porto_de_Galinhas_praia.jpg/1920px-Porto_de_Galinhas_praia.jpg", "credito": "NELSON FILHO", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Porto_de_Galinhas_praia.jpg", "nota": "La playa del pueblo"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/14/Maraca%C3%ADpe-PE.jpg/1280px-Maraca%C3%ADpe-PE.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/14/Maraca%C3%ADpe-PE.jpg/1920px-Maraca%C3%ADpe-PE.jpg", "credito": "FWehby", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Maraca%C3%ADpe-PE.jpg", "nota": "Maracaípe, la playa de al lado"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/Pontal_de_Maraca%C3%ADpe.jpg/1280px-Pontal_de_Maraca%C3%ADpe.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/Pontal_de_Maraca%C3%ADpe.jpg/1920px-Pontal_de_Maraca%C3%ADpe.jpg", "credito": "Klíssia Gouveia", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Pontal_de_Maraca%C3%ADpe.jpg", "nota": "Pontal de Maracaípe: caballitos de mar en el manglar"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f4/Jangada_boat_at_Maraca%C3%ADpe_beach.jpg/1280px-Jangada_boat_at_Maraca%C3%ADpe_beach.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f4/Jangada_boat_at_Maraca%C3%ADpe_beach.jpg/1920px-Jangada_boat_at_Maraca%C3%ADpe_beach.jpg", "credito": "Boaventuravinicius", "licencia": "CC BY 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Jangada_boat_at_Maraca%C3%ADpe_beach.jpg", "nota": "Jangada en Maracaípe"}
  ],
  'cerro-castillo': [
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/46/Laguna_del_Castillo_Parque_Nacional_Cerro_Castillo_11.jpg/1280px-Laguna_del_Castillo_Parque_Nacional_Cerro_Castillo_11.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/46/Laguna_del_Castillo_Parque_Nacional_Cerro_Castillo_11.jpg/1920px-Laguna_del_Castillo_Parque_Nacional_Cerro_Castillo_11.jpg", "credito": "Natalia Reyes Escobar", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Laguna_del_Castillo_Parque_Nacional_Cerro_Castillo_11.jpg", "nota": "La laguna Cerro Castillo, al final del sendero"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3f/Laguna_Castillo.jpg/1280px-Laguna_Castillo.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3f/Laguna_Castillo.jpg/1920px-Laguna_Castillo.jpg", "credito": "Manxuc", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Laguna_Castillo.jpg", "nota": "Laguna Cerro Castillo"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/Monta%C3%B1as_alrededor_del_Cerro_Castillo.jpg/1280px-Monta%C3%B1as_alrededor_del_Cerro_Castillo.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/Monta%C3%B1as_alrededor_del_Cerro_Castillo.jpg/1920px-Monta%C3%B1as_alrededor_del_Cerro_Castillo.jpg", "credito": "Manxuc", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Monta%C3%B1as_alrededor_del_Cerro_Castillo.jpg", "nota": "Las agujas del Castillo"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/Paisaje_Cerro_Castillo.jpg/1280px-Paisaje_Cerro_Castillo.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/Paisaje_Cerro_Castillo.jpg/1920px-Paisaje_Cerro_Castillo.jpg", "credito": "Romina Uribe", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Paisaje_Cerro_Castillo.jpg", "nota": "El valle desde la villa"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Horses_at_Cerro_Castillo_%283260649386%29.jpg/1280px-Horses_at_Cerro_Castillo_%283260649386%29.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Horses_at_Cerro_Castillo_%283260649386%29.jpg/1920px-Horses_at_Cerro_Castillo_%283260649386%29.jpg", "credito": "Jason Hollinger", "licencia": "CC BY 2.0", "pagina": "https://commons.wikimedia.org/wiki/File:Horses_at_Cerro_Castillo_(3260649386).jpg", "nota": "Caballos en Cerro Castillo"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/R%C3%ADo_Ib%C3%A1%C3%B1ez_1.jpg/1280px-R%C3%ADo_Ib%C3%A1%C3%B1ez_1.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/R%C3%ADo_Ib%C3%A1%C3%B1ez_1.jpg/1920px-R%C3%ADo_Ib%C3%A1%C3%B1ez_1.jpg", "credito": "LBM1948", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:R%C3%ADo_Ib%C3%A1%C3%B1ez_1.jpg", "nota": "El río Ibáñez, bajando al lago"}
  ],
  'general-carrera': [
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b4/Bah%C3%ADa_Murta%2C_patagonia_Chilena.jpg/1280px-Bah%C3%ADa_Murta%2C_patagonia_Chilena.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b4/Bah%C3%ADa_Murta%2C_patagonia_Chilena.jpg/1920px-Bah%C3%ADa_Murta%2C_patagonia_Chilena.jpg", "credito": "Jorgetexier", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Bah%C3%ADa_Murta,_patagonia_Chilena.jpg", "nota": "Bahía Murta, la parada del D2"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/Lago_General_Carrera_-_Bahia_Murta_%283583676526%29.jpg/1280px-Lago_General_Carrera_-_Bahia_Murta_%283583676526%29.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/Lago_General_Carrera_-_Bahia_Murta_%283583676526%29.jpg/1920px-Lago_General_Carrera_-_Bahia_Murta_%283583676526%29.jpg", "credito": "Daniel P. Gauer", "licencia": "CC BY 2.0", "pagina": "https://commons.wikimedia.org/wiki/File:Lago_General_Carrera_-_Bahia_Murta_(3583676526).jpg", "nota": "El lago desde Bahía Murta"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cd/Lago_General_Carrera_Febrero_2017.jpg/1280px-Lago_General_Carrera_Febrero_2017.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cd/Lago_General_Carrera_Febrero_2017.jpg/1920px-Lago_General_Carrera_Febrero_2017.jpg", "credito": "Abbagliati", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Lago_General_Carrera_Febrero_2017.jpg", "nota": "El General Carrera en verano"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/Lago_Gral_Carrera%2C_Aysen%2C_Chile..JPG/1280px-Lago_Gral_Carrera%2C_Aysen%2C_Chile..JPG", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/Lago_Gral_Carrera%2C_Aysen%2C_Chile..JPG/1920px-Lago_Gral_Carrera%2C_Aysen%2C_Chile..JPG", "credito": "Felipe.Alarcon", "licencia": "CC BY-SA 3.0", "pagina": "https://commons.wikimedia.org/wiki/File:Lago_Gral_Carrera,_Aysen,_Chile..JPG", "nota": "El lago desde el camino"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c8/Puerto_Tranquilo_1.jpg/1280px-Puerto_Tranquilo_1.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c8/Puerto_Tranquilo_1.jpg/1920px-Puerto_Tranquilo_1.jpg", "credito": "LBM1948", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Puerto_Tranquilo_1.jpg", "nota": "Puerto Río Tranquilo"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5c/Puente_del_r%C3%ADo_Tranquilo.jpg/1280px-Puente_del_r%C3%ADo_Tranquilo.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5c/Puente_del_r%C3%ADo_Tranquilo.jpg/1920px-Puente_del_r%C3%ADo_Tranquilo.jpg", "credito": "Lin linao", "licencia": "CC BY-SA 3.0", "pagina": "https://commons.wikimedia.org/wiki/File:Puente_del_r%C3%ADo_Tranquilo.jpg", "nota": "El puente del río Tranquilo"}
  ],
  'capillas-marmol': [
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Cuevas_de_M%C3%A1rmol_-_Marble_Caves%2C_Blue_Water%2C_Patagonia%2C_Chile.jpg/1280px-Cuevas_de_M%C3%A1rmol_-_Marble_Caves%2C_Blue_Water%2C_Patagonia%2C_Chile.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Cuevas_de_M%C3%A1rmol_-_Marble_Caves%2C_Blue_Water%2C_Patagonia%2C_Chile.jpg/1920px-Cuevas_de_M%C3%A1rmol_-_Marble_Caves%2C_Blue_Water%2C_Patagonia%2C_Chile.jpg", "credito": "Wescottm", "licencia": "CC BY 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Cuevas_de_M%C3%A1rmol_-_Marble_Caves,_Blue_Water,_Patagonia,_Chile.jpg", "nota": "Adentro de las cuevas"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/Cuevas_de_M%C3%A1rmol_-_Marble_Caves%2C_Patagonia%2C_Chile.jpg/1280px-Cuevas_de_M%C3%A1rmol_-_Marble_Caves%2C_Patagonia%2C_Chile.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/Cuevas_de_M%C3%A1rmol_-_Marble_Caves%2C_Patagonia%2C_Chile.jpg/1920px-Cuevas_de_M%C3%A1rmol_-_Marble_Caves%2C_Patagonia%2C_Chile.jpg", "credito": "Wescottm", "licencia": "CC BY 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Cuevas_de_M%C3%A1rmol_-_Marble_Caves,_Patagonia,_Chile.jpg", "nota": "Las cavernas con el lago calmo"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1e/Catedral_de_M%C3%A1rmol_en_Lago_General_Carrera.jpg/1280px-Catedral_de_M%C3%A1rmol_en_Lago_General_Carrera.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1e/Catedral_de_M%C3%A1rmol_en_Lago_General_Carrera.jpg/1920px-Catedral_de_M%C3%A1rmol_en_Lago_General_Carrera.jpg", "credito": "Nicolás Lara", "licencia": "CC BY-SA 3.0", "pagina": "https://commons.wikimedia.org/wiki/File:Catedral_de_M%C3%A1rmol_en_Lago_General_Carrera.jpg", "nota": "La Catedral"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9b/Capilla_de_M%C3%A1rmol_25.jpg/1280px-Capilla_de_M%C3%A1rmol_25.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9b/Capilla_de_M%C3%A1rmol_25.jpg/1920px-Capilla_de_M%C3%A1rmol_25.jpg", "credito": "LBM1948", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Capilla_de_M%C3%A1rmol_25.jpg", "nota": "La Capilla"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dd/Capilla_de_M%C3%A1rmol_04.jpg/1280px-Capilla_de_M%C3%A1rmol_04.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dd/Capilla_de_M%C3%A1rmol_04.jpg/1920px-Capilla_de_M%C3%A1rmol_04.jpg", "credito": "LBM1948", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Capilla_de_M%C3%A1rmol_04.jpg", "nota": "Vetas de mármol"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5c/Capilla_de_M%C3%A1rmol_22.jpg/1280px-Capilla_de_M%C3%A1rmol_22.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5c/Capilla_de_M%C3%A1rmol_22.jpg/1920px-Capilla_de_M%C3%A1rmol_22.jpg", "credito": "LBM1948", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Capilla_de_M%C3%A1rmol_22.jpg", "nota": "Entrando en lancha"}
  ],
  'exploradores': [
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/90/Monte_San_Valent%C3%ADn.jpg/1280px-Monte_San_Valent%C3%ADn.jpg", "grande": "https://upload.wikimedia.org/wikipedia/commons/9/90/Monte_San_Valent%C3%ADn.jpg", "credito": "Mauro Pesce", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Monte_San_Valent%C3%ADn.jpg", "nota": "El San Valentín, el cerro más alto de la Patagonia, desde el valle"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b4/ISS063-E-82020_-_View_of_Chile_-_Exploradores_Glacier_%28Patagonia%29_%28cropped%29.jpg/1280px-ISS063-E-82020_-_View_of_Chile_-_Exploradores_Glacier_%28Patagonia%29_%28cropped%29.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b4/ISS063-E-82020_-_View_of_Chile_-_Exploradores_Glacier_%28Patagonia%29_%28cropped%29.jpg/1920px-ISS063-E-82020_-_View_of_Chile_-_Exploradores_Glacier_%28Patagonia%29_%28cropped%29.jpg", "credito": "NASA (Estación Espacial)", "licencia": "Public domain", "pagina": "https://commons.wikimedia.org/wiki/File:ISS063-E-82020_-_View_of_Chile_-_Exploradores_Glacier_(Patagonia)_(cropped).jpg", "nota": "El glaciar visto desde la Estación Espacial"}
  ],
  'confluencia-baker': [
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5c/R%C3%ADo_Baker_en_confluencia_con_El_Salto%2C_Ays%C3%A9n.JPG/1280px-R%C3%ADo_Baker_en_confluencia_con_El_Salto%2C_Ays%C3%A9n.JPG", "grande": "https://upload.wikimedia.org/wikipedia/commons/5/5c/R%C3%ADo_Baker_en_confluencia_con_El_Salto%2C_Ays%C3%A9n.JPG", "credito": "Roberto Araya Barckhahn", "licencia": "CC BY-SA 3.0", "pagina": "https://commons.wikimedia.org/wiki/File:R%C3%ADo_Baker_en_confluencia_con_El_Salto,_Ays%C3%A9n.JPG", "nota": "El Baker y El Salto"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/90/Lago_Bertrand_2016.jpg/1280px-Lago_Bertrand_2016.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/90/Lago_Bertrand_2016.jpg/1920px-Lago_Bertrand_2016.jpg", "credito": "Manxuc", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Lago_Bertrand_2016.jpg", "nota": "Lago Bertrand, donde nace el Baker"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Lago_Bertrand_1.jpg/1280px-Lago_Bertrand_1.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Lago_Bertrand_1.jpg/1920px-Lago_Bertrand_1.jpg", "credito": "Manxuc", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Lago_Bertrand_1.jpg", "nota": "Lago Bertrand"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/67/Muelle_Puerto_Bertrand.jpg/1280px-Muelle_Puerto_Bertrand.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/67/Muelle_Puerto_Bertrand.jpg/1920px-Muelle_Puerto_Bertrand.jpg", "credito": "Nicolás Lara", "licencia": "CC BY-SA 3.0", "pagina": "https://commons.wikimedia.org/wiki/File:Muelle_Puerto_Bertrand.jpg", "nota": "El muelle de Puerto Bertrand"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/Campsite_near_Puerto_Bertrand_%283259891997%29.jpg/1280px-Campsite_near_Puerto_Bertrand_%283259891997%29.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/Campsite_near_Puerto_Bertrand_%283259891997%29.jpg/1920px-Campsite_near_Puerto_Bertrand_%283259891997%29.jpg", "credito": "Jason Hollinger", "licencia": "CC BY 2.0", "pagina": "https://commons.wikimedia.org/wiki/File:Campsite_near_Puerto_Bertrand_(3259891997).jpg", "nota": "Camping cerca de Bertrand"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a1/R%C3%ADo_Baker%2C_sector_Balsa_Baker.jpg/1280px-R%C3%ADo_Baker%2C_sector_Balsa_Baker.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a1/R%C3%ADo_Baker%2C_sector_Balsa_Baker.jpg/1920px-R%C3%ADo_Baker%2C_sector_Balsa_Baker.jpg", "credito": "Alexander Wellmann Catalán", "licencia": "Public domain", "pagina": "https://commons.wikimedia.org/wiki/File:R%C3%ADo_Baker,_sector_Balsa_Baker.jpg", "nota": "El Baker, sector Balsa Baker"}
  ],
  'parque-patagonia': [
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/Guanacos_en_Parque_Patagonia.jpg/1280px-Guanacos_en_Parque_Patagonia.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/Guanacos_en_Parque_Patagonia.jpg/1920px-Guanacos_en_Parque_Patagonia.jpg", "credito": "Abbagliati", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Guanacos_en_Parque_Patagonia.jpg", "nota": "Guanacos en el Valle Chacabuco"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d3/Sendero_Lagunas_Altas.jpg/1280px-Sendero_Lagunas_Altas.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d3/Sendero_Lagunas_Altas.jpg/1920px-Sendero_Lagunas_Altas.jpg", "credito": "Gonzalo Lastra", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Sendero_Lagunas_Altas.jpg", "nota": "El sendero Lagunas Altas"}
  ],
  'tortel': [
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/30/Caleta_Tortel_%286835868688%29.jpg/1280px-Caleta_Tortel_%286835868688%29.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/30/Caleta_Tortel_%286835868688%29.jpg/1920px-Caleta_Tortel_%286835868688%29.jpg", "credito": "Gabriel Urrutia Galaz", "licencia": "CC BY-SA 2.0", "pagina": "https://commons.wikimedia.org/wiki/File:Caleta_Tortel_(6835868688).jpg", "nota": "Caleta Tortel"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7b/Pasarelas_Tortel_1.jpg/1280px-Pasarelas_Tortel_1.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7b/Pasarelas_Tortel_1.jpg/1920px-Pasarelas_Tortel_1.jpg", "credito": "Manxuc", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Pasarelas_Tortel_1.jpg", "nota": "Las pasarelas de ciprés"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9b/Pasarelas_Tortel_2.jpg/1280px-Pasarelas_Tortel_2.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9b/Pasarelas_Tortel_2.jpg/1920px-Pasarelas_Tortel_2.jpg", "credito": "Manxuc", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Pasarelas_Tortel_2.jpg", "nota": "Pasarelas sobre el agua"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d1/Tortel_Florencia_G.jpg/1280px-Tortel_Florencia_G.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d1/Tortel_Florencia_G.jpg/1920px-Tortel_Florencia_G.jpg", "credito": "Florencia Giussani", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Tortel_Florencia_G.jpg", "nota": "Tortel desde arriba"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/R%C3%ADo_Baker_llegando_a_Tortel.jpg/1280px-R%C3%ADo_Baker_llegando_a_Tortel.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/R%C3%ADo_Baker_llegando_a_Tortel.jpg/1920px-R%C3%ADo_Baker_llegando_a_Tortel.jpg", "credito": "Manxuc", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:R%C3%ADo_Baker_llegando_a_Tortel.jpg", "nota": "El Baker llegando a Tortel"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/99/R%C3%ADo_Baker_detr%C3%A1s_de_Tortel.jpg/1280px-R%C3%ADo_Baker_detr%C3%A1s_de_Tortel.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/99/R%C3%ADo_Baker_detr%C3%A1s_de_Tortel.jpg/1920px-R%C3%ADo_Baker_detr%C3%A1s_de_Tortel.jpg", "credito": "Manxuc", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:R%C3%ADo_Baker_detr%C3%A1s_de_Tortel.jpg", "nota": "El Baker detrás del pueblo"}
  ],
  'villa-ohiggins': [
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Lago_O%27Higgins_2.jpg/1280px-Lago_O%27Higgins_2.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Lago_O%27Higgins_2.jpg/1920px-Lago_O%27Higgins_2.jpg", "credito": "betoscopio", "licencia": "CC BY-SA 2.0", "pagina": "https://commons.wikimedia.org/wiki/File:Lago_O%27Higgins_2.jpg", "nota": "Lago O'Higgins"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/Lago_O%27Higgins_4.jpg/1280px-Lago_O%27Higgins_4.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/Lago_O%27Higgins_4.jpg/1920px-Lago_O%27Higgins_4.jpg", "credito": "betoscopio", "licencia": "CC BY-SA 2.0", "pagina": "https://commons.wikimedia.org/wiki/File:Lago_O%27Higgins_4.jpg", "nota": "Lago O'Higgins"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cd/Glaciar_O%27Higgins.JPG/1280px-Glaciar_O%27Higgins.JPG", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cd/Glaciar_O%27Higgins.JPG/1920px-Glaciar_O%27Higgins.JPG", "credito": "Roberto Araya Barckhahn", "licencia": "CC BY-SA 3.0", "pagina": "https://commons.wikimedia.org/wiki/File:Glaciar_O%27Higgins.JPG", "nota": "El glaciar O'Higgins desde la navegación"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/Ventisquero_O%C2%B4Higgins.jpg/1280px-Ventisquero_O%C2%B4Higgins.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/Ventisquero_O%C2%B4Higgins.jpg/1920px-Ventisquero_O%C2%B4Higgins.jpg", "credito": "Fcerda", "licencia": "CC BY-SA 3.0", "pagina": "https://commons.wikimedia.org/wiki/File:Ventisquero_O%C2%B4Higgins.jpg", "nota": "El frente del glaciar"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Ferry_at_Puerto_Yungay_%283259916857%29.jpg/1280px-Ferry_at_Puerto_Yungay_%283259916857%29.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Ferry_at_Puerto_Yungay_%283259916857%29.jpg/1920px-Ferry_at_Puerto_Yungay_%283259916857%29.jpg", "credito": "Jason Hollinger", "licencia": "CC BY 2.0", "pagina": "https://commons.wikimedia.org/wiki/File:Ferry_at_Puerto_Yungay_(3259916857).jpg", "nota": "La barcaza de Puerto Yungay, camino a O'Higgins"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Transfer_Puerto_Yungay_%28260718271%29.jpeg/1280px-Transfer_Puerto_Yungay_%28260718271%29.jpeg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Transfer_Puerto_Yungay_%28260718271%29.jpeg/1920px-Transfer_Puerto_Yungay_%28260718271%29.jpeg", "credito": "Camila Eyzaguirre", "licencia": "CC BY-SA 3.0", "pagina": "https://commons.wikimedia.org/wiki/File:Transfer_Puerto_Yungay_(260718271).jpeg", "nota": "Cruzando en la barcaza"}
  ],
  'chile-chico': [
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/Jeinimeni_Lago.jpg/1280px-Jeinimeni_Lago.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/Jeinimeni_Lago.jpg/1920px-Jeinimeni_Lago.jpg", "credito": "Mario Otárola Alfaro", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Jeinimeni_Lago.jpg", "nota": "Lago Jeinimeni"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/Lago_Jeinimeni_-_Chile_Chico_%289224045059%29.jpg/1280px-Lago_Jeinimeni_-_Chile_Chico_%289224045059%29.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/Lago_Jeinimeni_-_Chile_Chico_%289224045059%29.jpg/1920px-Lago_Jeinimeni_-_Chile_Chico_%289224045059%29.jpg", "credito": "Gabriel Urrutia Galaz", "licencia": "CC BY-SA 2.0", "pagina": "https://commons.wikimedia.org/wiki/File:Lago_Jeinimeni_-_Chile_Chico_(9224045059).jpg", "nota": "Lago Jeinimeni"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Parque_Jeinimeni_-_Chile_Chico_%289226823018%29.jpg/1280px-Parque_Jeinimeni_-_Chile_Chico_%289226823018%29.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Parque_Jeinimeni_-_Chile_Chico_%289226823018%29.jpg/1920px-Parque_Jeinimeni_-_Chile_Chico_%289226823018%29.jpg", "credito": "Gabriel Urrutia Galaz", "licencia": "CC BY-SA 2.0", "pagina": "https://commons.wikimedia.org/wiki/File:Parque_Jeinimeni_-_Chile_Chico_(9226823018).jpg", "nota": "La reserva Jeinimeni"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/93/Lago_Verde%2C_Sector_Jeinimeni%2C_Patagonia_National_Park.jpg/1280px-Lago_Verde%2C_Sector_Jeinimeni%2C_Patagonia_National_Park.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/93/Lago_Verde%2C_Sector_Jeinimeni%2C_Patagonia_National_Park.jpg/1920px-Lago_Verde%2C_Sector_Jeinimeni%2C_Patagonia_National_Park.jpg", "credito": "Jaymenna78734", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Lago_Verde,_Sector_Jeinimeni,_Patagonia_National_Park.jpg", "nota": "Lago Verde, sector Jeinimeni"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/04/Cueva_de_las_Manos_del_r%C3%ADo_Pedregoso_01.jpg/1280px-Cueva_de_las_Manos_del_r%C3%ADo_Pedregoso_01.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/04/Cueva_de_las_Manos_del_r%C3%ADo_Pedregoso_01.jpg/1920px-Cueva_de_las_Manos_del_r%C3%ADo_Pedregoso_01.jpg", "credito": "Lin linao", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Cueva_de_las_Manos_del_r%C3%ADo_Pedregoso_01.jpg", "nota": "La Cueva de las Manos del río Pedregoso"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/62/Piedras_amontonadas_en_Jeinimeni.JPG/1280px-Piedras_amontonadas_en_Jeinimeni.JPG", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/62/Piedras_amontonadas_en_Jeinimeni.JPG/1920px-Piedras_amontonadas_en_Jeinimeni.JPG", "credito": "Lin linao", "licencia": "CC BY-SA 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:Piedras_amontonadas_en_Jeinimeni.JPG", "nota": "Piedras en Jeinimeni"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/Chile_Chico_e_islote.JPG/1280px-Chile_Chico_e_islote.JPG", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/Chile_Chico_e_islote.JPG/1920px-Chile_Chico_e_islote.JPG", "credito": "Lin linao", "licencia": "CC BY-SA 3.0", "pagina": "https://commons.wikimedia.org/wiki/File:Chile_Chico_e_islote.JPG", "nota": "Chile Chico y el lago"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/27/Calle_en_Chile_Chico_01.JPG/1280px-Calle_en_Chile_Chico_01.JPG", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/27/Calle_en_Chile_Chico_01.JPG/1920px-Calle_en_Chile_Chico_01.JPG", "credito": "Lin linao", "licencia": "CC BY-SA 3.0", "pagina": "https://commons.wikimedia.org/wiki/File:Calle_en_Chile_Chico_01.JPG", "nota": "Una calle de Chile Chico"}
  ],
  'carretera-austral': [
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/Study_in_Gravel_%283184558307%29.jpg/1280px-Study_in_Gravel_%283184558307%29.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/Study_in_Gravel_%283184558307%29.jpg/1920px-Study_in_Gravel_%283184558307%29.jpg", "credito": "Jason Hollinger", "licencia": "CC BY 2.0", "pagina": "https://commons.wikimedia.org/wiki/File:Study_in_Gravel_(3184558307).jpg", "nota": "El ripio"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/Where_the_Pavement_Starts_%283184615299%29.jpg/1280px-Where_the_Pavement_Starts_%283184615299%29.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/Where_the_Pavement_Starts_%283184615299%29.jpg/1920px-Where_the_Pavement_Starts_%283184615299%29.jpg", "credito": "Jason Hollinger", "licencia": "CC BY 2.0", "pagina": "https://commons.wikimedia.org/wiki/File:Where_the_Pavement_Starts_(3184615299).jpg", "nota": "Donde empieza el pavimento"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bc/Carretera_Austral_2012.JPG/1280px-Carretera_Austral_2012.JPG", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bc/Carretera_Austral_2012.JPG/1920px-Carretera_Austral_2012.JPG", "credito": "Chile365", "licencia": "CC BY-SA 3.0", "pagina": "https://commons.wikimedia.org/wiki/File:Carretera_Austral_2012.JPG", "nota": "La Carretera Austral"},
    {"src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/A_Horse_Along_the_Carretera_Austral%2C_Patagonia%2C_Chile.jpg/1280px-A_Horse_Along_the_Carretera_Austral%2C_Patagonia%2C_Chile.jpg", "grande": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/A_Horse_Along_the_Carretera_Austral%2C_Patagonia%2C_Chile.jpg/1920px-A_Horse_Along_the_Carretera_Austral%2C_Patagonia%2C_Chile.jpg", "credito": "Wescottm", "licencia": "CC BY 4.0", "pagina": "https://commons.wikimedia.org/wiki/File:A_Horse_Along_the_Carretera_Austral,_Patagonia,_Chile.jpg", "nota": "Un caballo en el camino"}
  ]
};
Object.entries(MAS_FOTOS).forEach(([k, fotos]) => { if (LUGARES[k]) LUGARES[k].fotos.push(...fotos); });
