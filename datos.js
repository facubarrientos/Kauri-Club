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
        id: 1,
        tipo: "torneo",
        instancia: "fase de grupos",
        idTorneo: 1,
        jugador1: 1,
        jugador2: 2,
        fecha: "2026-05-25",
        hora: "18:00",
        cancha: "Cancha 1",
        estado: "finalizado",

        setsJugador1: [],
        setsJugador2: [],
        ganador: 1
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
        estado: "finalizado",

        setsJugador1: [],
        setsJugador2: [],
        ganador: 2
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

