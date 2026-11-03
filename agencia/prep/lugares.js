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
  }
};
