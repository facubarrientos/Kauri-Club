var jugadores = [
    {
        id: 1,
        nombre: "Julian Matesanz",
        puntos: 3000,
        partidosJugados: 5,
        partidosGanados: 4,
        categoria: "C",
        foto: "./img/gavi.JPG"
    },
    {
        id: 2,
        nombre: 'Diego "Papu" Pagliaro',
        puntos: 2850,
        partidosJugados: 0,
        partidosGanados: 0,
        categoria: "C",
        foto: "./img/putitos.jpg"
    },
    {
        id: 3,
        nombre: "Daniel Abons",
        puntos: 2700,
        partidosJugados: 0,
        partidosGanados: 0,
        categoria: "C",
        foto: "./img/gavi.JPG"
    },
    {
        id: 4,
        nombre: "Marcos Bertani",
        puntos: 2550,
        partidosJugados: 0,
        partidosGanados: 0,
        categoria: "C",
        foto: "./img/putitos.jpg"
    },
    {
        id: 5,
        nombre: "Sergio Alegre",
        puntos: 2400,
        partidosJugados: 0,
        partidosGanados: 0,
        categoria: "C",
        foto: "./img/gavi.JPG"
    },
    {
        id: 6,
        nombre: "Gabriel Bongiorno",
        puntos: 2250,
        partidosJugados: 0,
        partidosGanados: 0,
        categoria: "C",
        foto: "./img/putitos.jpg"
    },
    {
        id: 7,
        nombre: "Claudio Estenssoro",
        puntos: 2100,
        partidosJugados: 0,
        partidosGanados: 0,
        categoria: "C",
        foto: "./img/gavi.JPG"
    },
    {
        id: 8,
        nombre: "Fernando Mansilla",
        puntos: 2000,
        partidosJugados: 0,
        partidosGanados: 0,
        categoria: "C",
        foto: "./img/putitos.jpg"
    },
    {
        id: 9,
        nombre: "Leonardo Fretes",
        puntos: 1900,
        partidosJugados: 0,
        partidosGanados: 0,
        categoria: "C",
        foto: "./img/gavi.JPG"
    },
    {
        id: 10,
        nombre: "Gabriel Grasso",
        puntos: 1800,
        partidosJugados: 0,
        partidosGanados: 0,
        categoria: "C",
        foto: "./img/putitos.jpg"
    },
    {
        id: 11,
        nombre: "Pedro Cassullo",
        puntos: 1700,
        partidosJugados: 0,
        partidosGanados: 0,
        categoria: "C",
        foto: "./img/gavi.JPG"
    },
    {
        id: 12,
        nombre: "Cristian Giolito",
        puntos: 1600,
        partidosJugados: 0,
        partidosGanados: 0,
        categoria: "C",
        foto: "./img/putitos.jpg"
    },
    {
        id: 13,
        nombre: 'Diego "El Gallego" Hidalgo',
        puntos: 1500,
        partidosJugados: 0,
        partidosGanados: 0,
        categoria: "C",
        foto: "./img/gavi.JPG"
    },
    {
        id: 14,
        nombre: "Matías Ferreiro",
        puntos: 1400,
        partidosJugados: 0,
        partidosGanados: 0,
        categoria: "C",
        foto: "./img/putitos.jpg"
    },
    {
        id: 15,
        nombre: 'Pablo "Viejín" Rosa',
        puntos: 1300,
        partidosJugados: 0,
        partidosGanados: 0,
        categoria: "C",
        foto: "./img/gavi.JPG"
    }
];

let partidos = [
        {
        id: 101,
        tipo: "desafio",
        instancia: "desafio",
        idTorneo: null,
        jugador1: 1,
        jugador2: 4,
        fecha: "2026-06-18",
        hora: "19:00",
        cancha: "Cancha 1",
        estado: "pendiente",

        setsJugador1: [],
        setsJugador2: [],
        ganador: null
    },

    {
        id: 102,
        tipo: "desafio",
        instancia: "desafio",
        idTorneo: null,
        jugador1: 8,
        jugador2: 12,
        fecha: "2026-06-20",
        hora: "18:30",
        cancha: "Cancha 2",
        estado: "pendiente",

        setsJugador1: [],
        setsJugador2: [],
        ganador: null
    },

    {
        id: 103,
        tipo: "torneo",
        instancia: "fase de grupos",
        idTorneo: 2,
        jugador1: 2,
        jugador2: 7,
        fecha: "2026-06-22",
        hora: "20:00",
        cancha: "Cancha Central",
        estado: "pendiente",

        setsJugador1: [],
        setsJugador2: [],
        ganador: null
    },

    {
        id: 104,
        tipo: "torneo",
        instancia: "cuartos",
        idTorneo: 2,
        jugador1: 3,
        jugador2: 5,
        fecha: "2026-06-24",
        hora: "21:00",
        cancha: "Cancha 1",
        estado: "pendiente",

        setsJugador1: [],
        setsJugador2: [],
        ganador: null
    },

    {
        id: 105,
        tipo: "desafio",
        instancia: "desafio",
        idTorneo: null,
        jugador1: 10,
        jugador2: 14,
        fecha: "2026-06-15",
        hora: "18:00",
        cancha: "Cancha 3",
        estado: "finalizado",

        setsJugador1: [6, 6],
        setsJugador2: [3, 4],
        ganador: 10
    },

    {
        id: 106,
        tipo: "torneo",
        instancia: "fase de grupos",
        idTorneo: 2,
        jugador1: 6,
        jugador2: 9,
        fecha: "2026-06-14",
        hora: "19:30",
        cancha: "Cancha Central",
        estado: "finalizado",

        setsJugador1: [4, 6, 6],
        setsJugador2: [6, 3, 2],
        ganador: 6
    },

    {
        id: 107,
        tipo: "torneo",
        instancia: "semifinal",
        idTorneo: 1,
        jugador1: 1,
        jugador2: 2,
        fecha: "2026-05-28",
        hora: "20:00",
        cancha: "Cancha Central",
        estado: "finalizado",

        setsJugador1: [6, 7],
        setsJugador2: [4, 5],
        ganador: 1
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

