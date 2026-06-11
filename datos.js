var jugadores = [

    {
        id: 1,
        nombre: "Gavi Quintero",
        puntos: 120,
        partidosJugados: 5,
        partidosGanados: 4,
        categoria: "A",
        foto: "./img/gavi.JPG"
    },

    {
        id: 2,
        nombre: "Duo Putin",
        puntos: 90,
        partidosJugados: 4,
        partidosGanados: 3,
        categoria: "A",
        foto: "./img/putitos.JPG"
    },

    {
        id: 3,
        nombre: "juan Barrientos",
        puntos: 150,
        partidosJugados: 7,
        partidosGanados: 6,
        categoria: "A",
        foto: "./img/gavi.JPG"
    },

    {
        id: 4,
        nombre: "Lucas Medina",
        puntos: 110,
        partidosJugados: 6,
        partidosGanados: 4,
        categoria: "A",
        foto: "./img/putitos.JPG"
    },

    {
        id: 5,
        nombre: "Nico Alvarez",
        puntos: 95,
        partidosJugados: 5,
        partidosGanados: 3,
        categoria: "A",
        foto: "./img/gavi.JPG"
    },

    {
        id: 6,
        nombre: "Tomy Suarez",
        puntos: 180,
        partidosJugados: 9,
        partidosGanados: 8,
        categoria: "A",
        foto: "./img/putitos.JPG"
    },

    {
        id: 7,
        nombre: "Matias Rojas",
        puntos: 130,
        partidosJugados: 6,
        partidosGanados: 5,
        categoria: "A",
        foto: "./img/gavi.JPG"
    },

    {
        id: 8,
        nombre: "Ivan Lopez",
        puntos: 85,
        partidosJugados: 4,
        partidosGanados: 2,
        categoria: "A",
        foto: "./img/putitos.JPG"
    },

    {
        id: 9,
        nombre: "Santi Gomez",
        puntos: 170,
        partidosJugados: 8,
        partidosGanados: 7,
        categoria: "A",
        foto: "./img/gavi.JPG"
    },

    {
        id: 10,
        nombre: "Mauro Diaz",
        puntos: 100,
        partidosJugados: 5,
        partidosGanados: 4,
        categoria: "B",
        foto: "./img/putitos.JPG"
    },

    {
        id: 11,
        nombre: "Juan Perez",
        puntos: 140,
        partidosJugados: 7,
        partidosGanados: 5,
        categoria: "B",
        foto: "./img/gavi.JPG"
    },
    {
        id: 12,
        nombre: "Leo Fernandez",
        puntos: 115,
        partidosJugados: 6,
        partidosGanados: 4,
        categoria: "C",     
        foto: "./img/putitos.JPG"
    },
];

let partidos = [
    {
        id: 1,
        tipo: "torneo",
        instancia: "fase de grupos",
        idTorneo: 1,
        jugador1: 1,
        jugador2: 2,
        fecha: "2026-05-25",
        hora: "18:00",
        cancha: "Cancha 1",
        estado: "pendiente",

        setsJugador1: [],
        setsJugador2: [],
        ganador: null
    },
    {
        id: 2,
        tipo: "torneo",
        instancia: "final",
        idTorneo: 1,
        jugador1: 1,
        jugador2: 2,
        fecha: "2026-05-25",
        hora: "18:00",
        cancha: "Cancha 1",
        estado: "pendiente",

        setsJugador1: [],
        setsJugador2: [],
        ganador: null
    },
    {
        id: 3,
        tipo: "torneo",
        instancia: "final",
        idTorneo: 2,
        jugador1: 1,
        jugador2: 2,
        fecha: "2026-05-25",
        hora: "18:00",
        cancha: "Cancha 1",
        estado: "pendiente",

        setsJugador1: [],
        setsJugador2: [],
        ganador: null
    },
    {
        id: 1,
        tipo: "desafio",
        instancia: "desafio",
        idTorneo: null,
        jugador1: 10,
        jugador2: 11,
        fecha: "2026-05-25",
        hora: "18:00",
        cancha: "Cancha 1",
        estado: "finalizado",

        setsJugador1: [],
        setsJugador2: [],
        ganador: null
    },
    {
        id: 2,
        tipo: "desafio",
        instancia: "desafio",
        idTorneo: null,
        jugador1: 11,
        jugador2: 4,
        fecha: "2026-06-25",
        hora: "18:00",
        cancha: "Cancha 1",
        estado: "pendiente",

        setsJugador1: [6, 6, 6],
        setsJugador2: [5, 5, 5],
        ganador: null
    }
];


var torneos = [
  {
    id: 1,
    nombre: "Torneo Apertura",
    formato: "corto",
    fechaInicio: "2026-05-22",
    estado: "finalizado"
  },
  {
    id: 2,
    nombre: "Torneo Clausura",
    formato: "largo",
    fechaInicio: "2026-05-22",
    estado: "activo"
  },
  {
    id: 3,
    nombre: "Torneo aaaaa ",
    formato: "corto",
    fechaInicio: "2026-05-22",
    estado: "activo"
  }
];

