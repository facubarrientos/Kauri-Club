import { auth, db } from "./firebase.js";
import { 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

import {
    collection,
    getDocs,
    addDoc,
    doc,
    updateDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

let jugadores = [];

async function cargarJugadores() {

    const snapshot = await getDocs(
        collection(db, "jugadores")
    );

    const jugadoresFirebase = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    console.log("Jugadores Firestore:", jugadoresFirebase);

    return jugadoresFirebase;
}

async function cargarTorneos() {

    const snapshot = await getDocs(
        collection(db, "torneos")
    );

    const torneosFirebase = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    console.log("Torneos Firestore:", torneosFirebase);

    return torneosFirebase;
}

async function cargarPartidos() {

    const snapshot = await getDocs(
        collection(db, "partidos")
    );

    const partidosFirebase = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    console.log("Partidos Firestore:", partidosFirebase);

    return partidosFirebase;
}

async function iniciarApp(){

    jugadores = await cargarJugadores();
    torneos = await cargarTorneos();
    partidos = await cargarPartidos();

    renderPartidosPublicos();
    renderRankingInicio();
    mostrarJugadores();
    renderAdminJugadores();
    cargarSelectPartidos();
    renderAdminPartidos();
    renderAdminTorneos();
    renderPerfilJugador();

    console.log("Datos listos para usar");
}

iniciarApp();

const PUNTOS_VICTORIA = 100;
const PUNTOS_DERROTA = -50;
const PUNTOS_BONUS_3_DESAFIOS = 100;

const botonMenu =
document.getElementById("menu-toggle");

const menu =
document.querySelector(".menu");

if(botonMenu){

    botonMenu.addEventListener("click", () => {

        menu.classList.toggle("activo");

    });

}


const contenedorPartidos =document.getElementById("contenedor-partidos");
const filtroCategoria = document.getElementById("filtro-categoria");
const filtroTipo = document.getElementById("filtro-tipo");
const filtroEstado = document.getElementById("filtro-estado");
function renderPartidosPublicos(){

    if(!contenedorPartidos) return;

    contenedorPartidos.innerHTML = "";

    const categoriaSeleccionada = filtroCategoria 
        ? filtroCategoria.value 
        : "todos";

    const tipoSeleccionado = filtroTipo 
        ? filtroTipo.value 
        : "todos";

    const estadoSeleccionado = filtroEstado
        ? filtroEstado.value
        : "todos";

    let partidosFiltrados = partidos.filter(partido => {

        const j1 = jugadores.find(j => Number(j.id) === Number(partido.jugador1));
        const j2 = jugadores.find(j => Number(j.id) === Number(partido.jugador2));

        const cumpleTipo =
            tipoSeleccionado === "todos" ||
            partido.tipo === tipoSeleccionado;

        const cumpleCategoria =
            categoriaSeleccionada === "todos" ||
            j1?.categoria === categoriaSeleccionada ||
            j2?.categoria === categoriaSeleccionada;

        const cumpleEstado =
            estadoSeleccionado === "todos" ||
            partido.estado === estadoSeleccionado;

        return cumpleTipo && cumpleCategoria && cumpleEstado;

    });

    partidosFiltrados.sort((a, b) => {
        const fechaA = new Date(`${a.fecha}T${a.hora || "00:00"}`);
        const fechaB = new Date(`${b.fecha}T${b.hora || "00:00"}`);
        return fechaA - fechaB;
    });

    if(partidosFiltrados.length === 0){
        contenedorPartidos.innerHTML = `
            <p class="sin-partidos">
                No hay partidos para mostrar.
            </p>
        `;
        return;
    }

    function crearCardPartido(partido){

        const torneo = torneos.find(t => Number(t.id) === Number(partido.idTorneo));
        const j1 = jugadores.find(j => Number(j.id) === Number(partido.jugador1));
        const j2 = jugadores.find(j => Number(j.id) === Number(partido.jugador2));

        const ganadorId = Number(partido.ganador);

        const ganoJ1 =
            partido.estado === "finalizado" &&
            ganadorId === Number(partido.jugador1);

        const ganoJ2 =
            partido.estado === "finalizado" &&
            ganadorId === Number(partido.jugador2);

        const card = document.createElement("div");
        card.classList.add("card-partido");

        card.innerHTML = `
            <div class="info-fecha">
                <p>📅 ${partido.fecha}</p>
                <p>🕒 ${partido.hora}</p>
            </div>

            <div class="jugador jugador-1 ${ganoJ1 ? "ganador-partido" : ""}">
                <img 
                    src="${j1 ? j1.foto : 'img/default.png'}"
                    class="foto-jugador"
                >

                <div>
                    <h4>
                        ${
                            j1
                            ? `#${obtenerPuestoRanking(j1.id)} ${j1.nombre}`
                            : "Jugador eliminado"
                        }
                        ${ganoJ1 ? "<span class='texto-ganador'>Ganador</span>" : ""}
                    </h4>

                    <span>
                        Categoría ${j1 ? j1.categoria : "-"}
                    </span>
                </div>
            </div>

            <div class="versus">
                <span>VS</span>

                <span class="badge-partido">
                    ${partido.estado}
                </span>

                <span class="instancia-partido">
                    ${partido.instancia || partido.tipo}
                </span>
            </div>

            <div class="jugador jugador-2 ${ganoJ2 ? "ganador-partido" : ""}">
                <img 
                    src="${j2 ? j2.foto : 'img/default.png'}"
                    class="foto-jugador"
                >

                <div>
                    <h4>
                        ${
                            j2
                            ? `#${obtenerPuestoRanking(j2.id)} ${j2.nombre}`
                            : "Jugador eliminado"
                        }
                        ${ganoJ2 ? "<span class='texto-ganador'>Ganador</span>" : ""}
                    </h4>

                    <span>
                        Categoría ${j2 ? j2.categoria : "-"}
                    </span>
                </div>
            </div>

            <div class="info-cancha">
                <p>
                    ${
                        partido.tipo === "desafio"
                        ? "Desafío"
                        : torneo ? torneo.nombre : "Sin torneo"
                    }
                </p>

                <p>${partido.cancha}</p>
            </div>

            <div class="resultado-partido">
                ${formatearResultado(partido)}
            </div>
        `;

        return card;
    }

    const desafios = partidosFiltrados.filter(
        partido => partido.tipo === "desafio"
    );

    const partidosTorneo = partidosFiltrados.filter(
        partido => partido.tipo === "torneo"
    );

    if(desafios.length > 0){

        const bloqueDesafios = document.createElement("div");
        bloqueDesafios.classList.add("bloque-torneo");

        bloqueDesafios.innerHTML = `
            <h3>Desafíos</h3>

            <p class="estado-torneo">
                Partidos por ranking
            </p>
        `;

        desafios.forEach(partido => {
            bloqueDesafios.appendChild(crearCardPartido(partido));
        });

        contenedorPartidos.appendChild(bloqueDesafios);

    }


    torneos.forEach(torneo => {

        const partidosDelTorneo = partidosTorneo.filter(
            partido => Number(partido.idTorneo) === Number(torneo.id)
        );

        if(partidosDelTorneo.length === 0) return;

        const bloque = document.createElement("div");
        bloque.classList.add("bloque-torneo");

        bloque.innerHTML = `
            <h3>${torneo.nombre}</h3>

            <p class="estado-torneo">
                ${torneo.estado}
            </p>
        `;

        partidosDelTorneo.forEach(partido => {
            bloque.appendChild(crearCardPartido(partido));
        });

        contenedorPartidos.appendChild(bloque);

    });

    

}

if(filtroCategoria){
    filtroCategoria.addEventListener("change", renderPartidosPublicos);
}

if(filtroTipo){
    filtroTipo.addEventListener("change", renderPartidosPublicos);
}

if(filtroEstado){
    filtroEstado.addEventListener("change", renderPartidosPublicos);
}

function formatearResultado(partido){

    if(!partido.setsJugador1 || partido.setsJugador1.length === 0){
        return "-";
    }

    return partido.setsJugador1
        .map((setJ1, index) => `${setJ1}-${partido.setsJugador2[index]}`)
        .join(" / ");
}

const tablaPartidos = document.getElementById("tabla-partidos");

if(tablaPartidos){

    tablaPartidos.innerHTML = "";

    const partidosNoFinalizados = partidos.filter(
        partido => partido.estado !== "finalizado"
    );

    partidosNoFinalizados.forEach(partido => {

        const j1 = jugadores.find(
            j => String(j.id) === String(partido.jugador1)
        );

        const j2 = jugadores.find(
            j => String(j.id) === String(partido.jugador2)
        );

        const card = document.createElement("div");

        card.classList.add("card-partido");

        card.innerHTML = `

            <div class="info-fecha">

                <p>📅 ${partido.fecha}</p>

                <p>🕒 ${partido.hora}</p>

            </div>

            <div class="jugador jugador-1">

                <img 
                    src="${j1 ? j1.foto : 'img/default.png'}"
                    class="foto-jugador"
                >

                <div>

                    <h4>
                        ${j1 ? j1.nombre : "Jugador eliminado"}
                    </h4>

                    <span>
                        Ranking: #${j1 ? obtenerPuestoRanking(j1.id) : "-"}
                    </span>

                </div>

            </div>

            <div class="versus">
                <span>VS</span>

                <span class="badge-partido">
                    ${partido.estado}
                </span>

                <span class="instancia-partido">
                    ${
                        partido.tipo === "desafio"
                        ? "DESAFÍO"
                        : partido.instancia
                    }
                </span>

            </div>

            <div class="jugador jugador-2">

                <img 
                    src="${j2 ? j2.foto : 'img/default.png'}"
                    class="foto-jugador"
                >

                <div>

                    <h4>
                        ${j2 ? j2.nombre : "Jugador eliminado"}
                    </h4>

                    <span>
                        Ranking: #${j2 ? obtenerPuestoRanking(j2.id) : "-"}
                    </span>

                </div>

            </div>

            <div class="info-cancha">

                <p> ${partido.cancha}</p>

            </div>

            <div class="resultado-partido">

                ${formatearResultado(partido)}

            </div>
        `;

        tablaPartidos.appendChild(card);

    });

}

function calcularStatsJugador(idJugador){

    let puntos = 0;
    let partidosJugados = 0;
    let partidosGanados = 0;
    let desafiosJugados = 0;

    partidos.forEach(partido => {

        if(partido.estado !== "finalizado") return;

        if(
            partido.ganador === null ||
            partido.ganador === undefined
        ) return;

        const jugoPartido =
            String(partido.jugador1) === String(idJugador) ||
            String(partido.jugador2) === String(idJugador);

        if(!jugoPartido) return;

        partidosJugados++;

        if(partido.tipo === "desafio"){
            desafiosJugados++;
        }

        if(String(partido.ganador) === String(idJugador)){

            partidosGanados++;
            puntos += PUNTOS_VICTORIA;

        }else{

            puntos += PUNTOS_DERROTA;

        }

    });

    const bonusDesafios =
        Math.floor(desafiosJugados / 3) *
        PUNTOS_BONUS_3_DESAFIOS;

    puntos += bonusDesafios;

    return {
        puntos,
        partidosJugados,
        partidosGanados,
        desafiosJugados,
        bonusDesafios
    };
}

function actualizarStatsJugadores(){

    jugadores.forEach(jugador => {

        if(jugador.puntosBase === undefined){
            jugador.puntosBase = jugador.puntos || 0;
        }

        const stats = calcularStatsJugador(jugador.id);

        jugador.puntos = jugador.puntosBase + stats.puntos;
        jugador.partidosJugados = stats.partidosJugados;
        jugador.partidosGanados = stats.partidosGanados;
        jugador.desafiosJugados = stats.desafiosJugados;

    });
}

function obtenerPuestoRanking(idJugador){

    actualizarStatsJugadores();

    const jugador = jugadores.find(j => Number(j.id) === Number(idJugador));

    if(!jugador) return "-";

    const rankingCategoria = jugadores
        .filter(j => j.categoria === jugador.categoria)
        .sort((a, b) => b.puntos - a.puntos);

    const posicion = rankingCategoria.findIndex(
        j => Number(j.id) === Number(idJugador)
    );

    return posicion + 1;
}

const tablaRanking = document.getElementById("tabla-ranking");
const selectorRanking = document.getElementById("selector-ranking");

function renderRankingCategoria(categoria){

    if(!tablaRanking) return;

    actualizarStatsJugadores();

    tablaRanking.innerHTML = "";

    const jugadoresRanking = jugadores
        .filter(jugador => jugador.categoria === categoria)
        .sort((a, b) => b.puntos - a.puntos);

    jugadoresRanking.forEach((jugador, index) => {

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${jugador.nombre}</td>
            <td>${jugador.puntos}</td>
            <td>${jugador.partidosJugados}</td>
            <td>${jugador.partidosGanados}</td>
        `;

        tablaRanking.appendChild(fila);

    });
}

const tablaRankingInicio = document.getElementById("tabla-ranking-inicio");

function obtenerTopCategoria(categoria){

    actualizarStatsJugadores();

    return jugadores
        .filter(jugador => jugador.categoria === categoria)
        .sort((a, b) => b.puntos - a.puntos)
        .slice(0, 5);
}


if(tablaRanking){

    renderRankingCategoria("A");

    if(selectorRanking){

        selectorRanking.addEventListener("change", () => {
            renderRankingCategoria(selectorRanking.value);
        });

    }

}

document.getElementById("tabla-ranking-inicio");

function renderRankingInicio(){

    if(!tablaRankingInicio) return;

    tablaRankingInicio.innerHTML = "";

    const rankingA = obtenerTopCategoria("A");
    const rankingB = obtenerTopCategoria("B");
    const rankingC = obtenerTopCategoria("C");
    const rankingD = obtenerTopCategoria("D");

    for(let i = 0; i < 5; i++){

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${i + 1}</td>

            <td>${rankingA[i]?.nombre || "-"}</td>

            <td>${rankingB[i]?.nombre || "-"}</td>

            <td>${rankingC[i]?.nombre || "-"}</td>

            <td>${rankingD[i]?.nombre || "-"}</td>
        `;

        tablaRankingInicio.appendChild(fila);

    }

}


const listaJugadores = document.getElementById("lista-jugadores");
const buscadorJugadores = document.getElementById("buscador-jugadores");
const filtroCategoriaJugadores = document.getElementById("filtro-categoria-jugadores");

function mostrarJugadores(){

    if(!listaJugadores) return;
    actualizarStatsJugadores();
    const textoBuscado = buscadorJugadores?.value.toLowerCase() || "";
    const categoriaSeleccionada = filtroCategoriaJugadores?.value || "todas";

    listaJugadores.innerHTML = "";

    jugadores
        .filter(jugador => {
            const coincideNombre = jugador.nombre.toLowerCase().includes(textoBuscado);

            const coincideCategoria =
                categoriaSeleccionada === "todas" ||
                jugador.categoria === categoriaSeleccionada;

            return coincideNombre && coincideCategoria;
        })
        .forEach(jugador => {

            const card = document.createElement("div");
            card.classList.add("card-jugador");

            card.addEventListener("click", () => {
                window.location.href = `perfil.html?id=${jugador.id}`;
            });

            card.innerHTML = `
                <img src="${jugador.foto}" alt="${jugador.nombre}">

                <h3>${jugador.nombre}</h3>

                <p>Categoría ${jugador.categoria}</p>

                <div class="stats-jugador">
                    <span>${jugador.puntos} pts</span>
                    <span>${jugador.partidosGanados} victorias</span>
                </div>
            `;

            listaJugadores.appendChild(card);
        });
}

if(listaJugadores){

    if(buscadorJugadores){
        buscadorJugadores.addEventListener("input", mostrarJugadores);
    }

    if(filtroCategoriaJugadores){
        filtroCategoriaJugadores.addEventListener("change", mostrarJugadores);
    }

    mostrarJugadores();
}
function renderPerfilJugador(){

    const perfilJugador =
        document.getElementById("perfil-jugador");

    if(!perfilJugador) return;

    const parametros =
        new URLSearchParams(window.location.search);

    const idJugador =
        parametros.get("id");

    const jugador = jugadores.find(
        j => String(j.id) === String(idJugador)
    );

    if(!jugador) return;

    actualizarStatsJugadores();

    const partidosDelJugador = partidos.filter(p =>
        String(p.jugador1) === String(jugador.id) ||
        String(p.jugador2) === String(jugador.id)
    );

    const derrotas =
        jugador.partidosJugados - jugador.partidosGanados;

    const efectividad =
        jugador.partidosJugados > 0
        ? Math.round(
            (jugador.partidosGanados / jugador.partidosJugados) * 100
        )
        : 0;

    const record =
        `${jugador.partidosGanados} - ${derrotas}`;

    const textoRacha =
        calcularRachaJugador(jugador.id);

    const partidosJugados =
        partidosDelJugador.filter(
            p => p.estado === "finalizado"
        );

    const proximosPartidos =
        partidosDelJugador.filter(
            p => p.estado !== "finalizado"
        );

    perfilJugador.innerHTML = `

        <section class="perfil-hero">

            <div class="perfil-foto">
                <img src="${jugador.foto}" alt="${jugador.nombre}">
            </div>

            <div class="perfil-info">
                <span class="perfil-label">JUGADOR</span>
                <h2>${jugador.nombre}</h2>

                <div class="perfil-meta">
                    <div>
                        <span>Categoría</span>
                        <strong>${jugador.categoria}</strong>
                    </div>

                    <div>
                        <span>Ranking</span>
                        <strong>#${obtenerPuestoRanking(jugador.id)}</strong>
                    </div>
                </div>

                <div class="perfil-resumen-stats">
                    <div>
                        <strong>${jugador.puntos}</strong>
                        <span>Puntos</span>
                    </div>

                    <div>
                        <strong>${jugador.partidosJugados}</strong>
                        <span>Partidos</span>
                    </div>

                    <div>
                        <strong>${jugador.partidosGanados}</strong>
                        <span>Victorias</span>
                    </div>
                </div>
            </div>

        </section>

        <section class="perfil-panel-stats">

            <div class="perfil-panel-item">
                <span>Récord</span>
                <strong>${record}</strong>
                <small>Ganados - perdidos</small>
            </div>

            <div class="perfil-panel-item">
                <span>Efectividad</span>
                <strong>${efectividad}%</strong>
                <small>Porcentaje de victorias</small>
            </div>

            <div class="perfil-panel-item">
                <span>Racha</span>
                <strong>${textoRacha}</strong>
                <small>Últimos resultados</small>
            </div>

        </section>

        <a href="jugadores.html" class="volver-jugadores">
            ← Volver
        </a>

        <section class="perfil-partidos">

            <h3>Partidos jugados</h3>

            <div class="lista-perfil-partidos">
                ${
                    partidosJugados.length > 0
                    ? partidosJugados
                        .map(p =>
                            crearItemPartidoPerfil(p, jugador.id)
                        )
                        .join("")
                    : `
                        <p class="perfil-vacio">
                            Todavía no hay partidos jugados.
                        </p>
                    `
                }
            </div>

            <h3>Próximos partidos</h3>

            <div class="lista-perfil-partidos">
                ${
                    proximosPartidos.length > 0
                    ? proximosPartidos
                        .map(p =>
                            crearItemPartidoPerfil(p, jugador.id)
                        )
                        .join("")
                    : `
                        <p class="perfil-vacio">
                            No hay próximos partidos cargados.
                        </p>
                    `
                }
            </div>

        </section>
    `;
}

function calcularRachaJugador(idJugador){

    const partidosJugador = partidos
        .filter(p =>
            p.estado === "finalizado" &&
            (
                Number(p.jugador1) === Number(idJugador) ||
                Number(p.jugador2) === Number(idJugador)
            )
        )
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    if(partidosJugador.length === 0){
        return "Sin partidos";
    }

    const ganoUltimo =
    Number(partidosJugador[0].ganador) === Number(idJugador);

    let contador = 0;

    for(const partido of partidosJugador){

        const gano =
        Number(partido.ganador) === Number(idJugador);

        if(gano === ganoUltimo){
            contador++;
        }else{
            break;
        }
    }

    return ganoUltimo
    ? `${contador} Victorias`
    : `${contador} Derrotas`;
}

function crearItemPartidoPerfil(partido, idJugador){

    const j1 = jugadores.find(j => Number(j.id) === Number(partido.jugador1));
    const j2 = jugadores.find(j => Number(j.id) === Number(partido.jugador2));

    const jugadorPerfil =
        Number(partido.jugador1) === Number(idJugador)
        ? j1
        : j2;

    const rival =
        Number(partido.jugador1) === Number(idJugador)
        ? j2
        : j1;

    const esGanador =
        Number(partido.ganador) === Number(idJugador);

    const claseResultado =
        partido.estado === "finalizado"
        ? (esGanador ? "gano" : "perdio")
        : "";

    let resultadoHTML = `<span>Pendiente</span>`;

    if(partido.estado === "finalizado"){

        const apellidoJugador =
            jugadorPerfil.nombre
            .split(" ")
            .pop()
            .substring(0,3)
            .toUpperCase();

        const apellidoRival =
            rival.nombre
            .split(" ")
            .pop()
            .substring(0,3)
            .toUpperCase();

        const sets1 =
            String(partido.setsJugador1)
            .split(",")
            .filter(s => s !== "");

        const sets2 =
            String(partido.setsJugador2)
            .split(",")
            .filter(s => s !== "");

        const cantidadSets =
            Math.max(sets1.length, sets2.length);

        resultadoHTML = `
            <div class="mini-score" style="--sets:${cantidadSets}">

                <div></div>

                ${Array.from({length: cantidadSets}).map((_, i)=>`
                    <div class="score-header">S${i+1}</div>
                `).join("")}

                <div class="score-player">${apellidoJugador}</div>

                ${Array.from({length: cantidadSets}).map((_, i)=>`
                    <div class="score-cell">
                        ${
                            Number(partido.jugador1) === Number(idJugador)
                            ? (sets1[i] ?? "-")
                            : (sets2[i] ?? "-")
                        }
                    </div>
                `).join("")}

                <div class="score-player">${apellidoRival}</div>

                ${Array.from({length: cantidadSets}).map((_, i)=>`
                    <div class="score-cell">
                        ${
                            Number(partido.jugador1) === Number(idJugador)
                            ? (sets2[i] ?? "-")
                            : (sets1[i] ?? "-")
                        }
                    </div>
                `).join("")}

            </div>
        `;
    }

    return `
        <div class="partido-perfil-item">

            <div class="partido-perfil-info">

                <span class="partido-perfil-fecha">
                    ${partido.fecha} • ${partido.hora}
                </span>

                <strong>
                    VS ${rival ? rival.nombre : "Rival"}
                </strong>

                <small>
                    ${partido.cancha || "Cancha sin definir"}
                </small>

            </div>

            <div class="partido-perfil-resultado ${claseResultado}">
                ${resultadoHTML}
            </div>

        </div>
    `;
}

                                                                            /* admin*/

    /* LOGIN FIREBASE */

const formLogin = document.getElementById("form-login");

if (formLogin) {

    formLogin.addEventListener("submit", async function(e) {

        e.preventDefault();

        const email =
            document.getElementById("usuario").value;

        const password =
            document.getElementById("password").value;

        try {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            window.location.href = "admin.html";

        } catch (error) {

            alert("Email o contraseña incorrectos");

        }

    });

}

/* PROTECCION ADMIN */

const paginasProtegidas = [
    "admin.html",
    "admin-jugadores.html",
    "admin-partidos.html",
    "admin-torneos.html"
];

const paginaActual =
    window.location.pathname.split("/").pop();

if (paginasProtegidas.includes(paginaActual)) {

    onAuthStateChanged(auth, (user) => {

        if (
            !user ||
            user.email !== "kau.admin@gmail.com"
        ) {

            window.location.href = "login.html";

        }

    });

}

async function cerrarSesion() {
    await signOut(auth);
    window.location.href = "login.html";
}
                                            /* admin-jugadores */

let jugadorEditando = null;

const tablaAdminJugadores = document.getElementById("tabla-admin-jugadores");
const formJugador = document.getElementById("form-jugador");
const btnAgregarJugador = document.getElementById("btn-agregar-jugador");
const modalJugador = document.getElementById("modal-jugador");
const cerrarModal = document.getElementById("cerrar-modal");
function renderAdminJugadores(){

    if(!tablaAdminJugadores) return;

    tablaAdminJugadores.innerHTML = "";

    jugadores.forEach(jugador => {

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>
                <img src="${jugador.foto}" class="admin-foto">
            </td>

            <td>${jugador.nombre}</td>
            <td>${jugador.categoria}</td>
            <td>${jugador.puntos}</td>
            <td>${jugador.partidosGanados}</td>

            <td class="acciones-admin">

                <button
                    class="btn-editar"
                    onclick="editarJugador('${jugador.id}')">
                    Editar
                </button>

                <button
                    class="btn-eliminar"
                    onclick="eliminarJugador('${jugador.id}')">
                    Eliminar
                </button>

            </td>
        `;

        tablaAdminJugadores.appendChild(fila);
    });

}

if(btnAgregarJugador && modalJugador){

    btnAgregarJugador.addEventListener("click", () => {

        jugadorEditando = null;

        formJugador.reset();

        modalJugador.classList.add("activo");

    });

}

if(cerrarModal && modalJugador){

    cerrarModal.addEventListener("click", () => {

        jugadorEditando = null;

        formJugador.reset();

        modalJugador.classList.remove("activo");

    });

}

if(formJugador){

        formJugador.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre-jugador").value;
        const categoria = document.getElementById("categoria-jugador").value;
        const puntos = parseInt(document.getElementById("puntos-jugador").value);
        const partidos = parseInt(document.getElementById("partidos-jugador").value);
        const victorias = parseInt(document.getElementById("victorias-jugador").value);
        const foto = document.getElementById("foto-jugador").value;

        if(jugadorEditando){

            await updateDoc(
                doc(db, "jugadores", jugadorEditando.id),
                {
                    nombre: nombre,
                    categoria: categoria,
                    puntos: puntos,
                    partidosJugados: partidos,
                    partidosGanados: victorias,
                    foto: foto
                }
            );

            jugadores = await cargarJugadores();

        }else {

            await addDoc(collection(db, "jugadores"), {
                nombre: nombre,
                categoria: categoria,
                puntos: puntos,
                partidosJugados: partidos,
                partidosGanados: victorias,
                foto: foto
            });

            jugadores = await cargarJugadores();
        }

        renderAdminJugadores();

        formJugador.reset();

        modalJugador.classList.remove("activo");

        jugadorEditando = null;
    });

}

function editarJugador(id){

    const jugador = jugadores.find(
        j => String(j.id) === String(id)
    );

    if(!jugador) return;

    jugadorEditando = jugador;

    document.getElementById("nombre-jugador").value = jugador.nombre;
    document.getElementById("categoria-jugador").value = jugador.categoria || "A";
    document.getElementById("puntos-jugador").value = jugador.puntos;
    document.getElementById("partidos-jugador").value = jugador.partidosJugados;
    document.getElementById("victorias-jugador").value = jugador.partidosGanados;
    document.getElementById("foto-jugador").value = jugador.foto;

    modalJugador.classList.add("activo");
}

async function eliminarJugador(id){

    if(!confirm("¿Eliminar este jugador?")) return;

    await deleteDoc(
        doc(db, "jugadores", id)
    );

    jugadores = await cargarJugadores();

    renderAdminJugadores();

}
                                            /* admin partidos */
let partidoEditando = null;

const formPartido = document.getElementById("form-partido");
const tablaAdminPartidos = document.getElementById("tabla-admin-partidos");

const selectTorneo = document.getElementById("torneo-partido");
const selectJugador1 = document.getElementById("jugador1-partido");
const selectJugador2 = document.getElementById("jugador2-partido");

function obtenerSets(){

    const setsJugador1 = [];
    const setsJugador2 = [];

    for(let i = 1; i <= 3; i++){

        const setJ1 = document.getElementById(`set${i}-jugador1`).value;
        const setJ2 = document.getElementById(`set${i}-jugador2`).value;

        if(setJ1 !== "" && setJ2 !== ""){
            setsJugador1.push(Number(setJ1));
            setsJugador2.push(Number(setJ2));
        }
    }

    return { setsJugador1, setsJugador2 };
}

function calcularGanador(partido){

    let setsGanadosJ1 = 0;
    let setsGanadosJ2 = 0;

    partido.setsJugador1.forEach((setJ1, index) => {

        const setJ2 = partido.setsJugador2[index];

        if(setJ1 > setJ2){
            setsGanadosJ1++;
        }else if(setJ2 > setJ1){
            setsGanadosJ2++;
        }

    });

    if(setsGanadosJ1 > setsGanadosJ2){
        return partido.jugador1;
    }

    if(setsGanadosJ2 > setsGanadosJ1){
        return partido.jugador2;
    }

    return null;
}

function cargarSelectPartidos(){

    if(!selectJugador1 || !selectJugador2 || !selectTorneo) return;

    selectJugador1.innerHTML = "";
    selectJugador2.innerHTML = "";
    selectTorneo.innerHTML = "";

    torneos.forEach(torneo => {
        selectTorneo.innerHTML += `
            <option value="${torneo.id}">
                ${torneo.nombre}
            </option>
        `;
    });

    jugadores.forEach(jugador => {
        selectJugador1.innerHTML += `
            <option value="${jugador.id}">
                ${jugador.nombre}
            </option>
        `;

        selectJugador2.innerHTML += `
            <option value="${jugador.id}">
                ${jugador.nombre}
            </option>
        `;
    });
}

const selectTipoPartido = document.getElementById("tipo-partido");
const selectInstanciaPartido = document.getElementById("instancia-partido");

function actualizarCampoTorneo(){

    if(!selectTipoPartido || !selectTorneo) return;

    if(selectTipoPartido.value === "desafio"){
        selectTorneo.disabled = true;
        selectTorneo.required = false;
        selectTorneo.value = "";
    }else{
        selectTorneo.disabled = false;
        selectTorneo.required = true;
    }

}

if(selectTipoPartido){

    selectTipoPartido.addEventListener("change", actualizarCampoTorneo);

    actualizarCampoTorneo();

}

if(formPartido){

    formPartido.addEventListener("submit", async function(e){

        e.preventDefault();

        const jugador1 = selectJugador1.value;
        const jugador2 = selectJugador2.value;

        if(jugador1 === jugador2){
            alert("No podés seleccionar el mismo jugador");
            return;
        }

        const estado = document.getElementById("estado-partido").value;
        const sets = obtenerSets();

        if(
            estado === "finalizado" &&
            sets.setsJugador1.length === 0
        ){
            alert("Debes cargar al menos un set para finalizar el partido");
            return;
        }

        if(partidoEditando !== null){

            const partidoActualizado = {
                tipo: selectTipoPartido.value,
                instancia: selectInstanciaPartido.value,

                idTorneo:
                    selectTipoPartido.value === "torneo"
                    ? selectTorneo.value
                    : null,

                jugador1: jugador1,
                jugador2: jugador2,

                fecha: document.getElementById("fecha-partido").value,
                hora: document.getElementById("hora-partido").value,
                cancha: document.getElementById("cancha-partido").value,

                estado: estado,

                setsJugador1: sets.setsJugador1,
                setsJugador2: sets.setsJugador2,

                ganador: null
            };

            partidoActualizado.ganador =
                estado === "finalizado"
                ? calcularGanador(partidoActualizado)
                : null;

            await updateDoc(
                doc(db, "partidos", String(partidoEditando)),
                partidoActualizado
            );

            partidos = await cargarPartidos();

            partidoEditando = null;
        }else{
            const nuevoPartido = {
                tipo: selectTipoPartido.value,
                instancia: selectInstanciaPartido.value,

                idTorneo:
                    selectTipoPartido.value === "torneo"
                    ? selectTorneo.value
                    : null,

                jugador1: jugador1,
                jugador2: jugador2,

                fecha: document.getElementById("fecha-partido").value,
                hora: document.getElementById("hora-partido").value,
                cancha: document.getElementById("cancha-partido").value,

                estado: estado,

                setsJugador1: sets.setsJugador1,
                setsJugador2: sets.setsJugador2,

                ganador: null
            };

            nuevoPartido.ganador =
                estado === "finalizado"
                ? calcularGanador(nuevoPartido)
                : null;

            await addDoc(
                collection(db, "partidos"),
                nuevoPartido
            );

            partidos = await cargarPartidos();
        }
        renderAdminPartidos();
        formPartido.reset();
    });
}

function renderAdminPartidos(){

    if(!tablaAdminPartidos) return;

    tablaAdminPartidos.innerHTML = "";

    partidos.forEach(partido => {

        const torneo = torneos.find(t => String(t.id) === String(partido.idTorneo));
        const j1 = jugadores.find(j => Number(j.id) === Number(partido.jugador1));
        const j2 = jugadores.find(j => Number(j.id) === Number(partido.jugador2));
        const ganador = jugadores.find(
            j => Number(j.id) === Number(partido.ganador)
        );
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>
                ${
                    partido.tipo === "desafio"
                    ? "Desafío"
                    : torneo ? torneo.nombre : "Sin torneo"
                }
            </td>

            <td>
                ${partido.instancia || "-"}
            </td>
            <td>${j1 ? j1.nombre : "Jugador eliminado"}</td>
            <td>${j2 ? j2.nombre : "Jugador eliminado"}</td>
            <td>${partido.fecha}</td>
            <td>${partido.hora}</td>
            <td>${partido.cancha}</td>

            <td>
                <span class="estado-partido ${partido.estado}">
                    ${partido.estado}
                </span>
            </td>

            <td>
                ${formatearResultado(partido)}
                <br>
                <strong>
                    ${ganador ? `Ganador: ${ganador.nombre}` : "Sin ganador"}
                </strong>
            </td>
            <td class="acciones-admin">
                <button
                    class="btn-editar"
                    type="button"
                    onclick="editarPartido('${partido.id}')">
                    Editar
                </button>
                <button
                    class="btn-eliminar"
                    type="button"
                    onclick="eliminarPartido('${partido.id}')">
                    Eliminar
                </button>
            </td>
        `;

        tablaAdminPartidos.appendChild(fila);
    });
}

function editarPartido(id){

    const partido = partidos.find(
        p => String(p.id) === String(id)
    );

    if(!partido){
        alert("No encontré el partido");
        return;
    }

    partidoEditando = id;

    selectTipoPartido.value = partido.tipo || "torneo";
    selectInstanciaPartido.value = partido.instancia || "desafio";

    selectTorneo.value =
        partido.idTorneo !== null
        ? String(partido.idTorneo)
        : "";

    selectJugador1.value = String(partido.jugador1);
    selectJugador2.value = String(partido.jugador2);

    document.getElementById("fecha-partido").value = partido.fecha;
    document.getElementById("hora-partido").value = partido.hora;
    document.getElementById("cancha-partido").value = partido.cancha;
    document.getElementById("estado-partido").value =
        partido.estado || "pendiente";

    for(let i = 1; i <= 3; i++){

        document.getElementById(`set${i}-jugador1`).value =
            partido.setsJugador1?.[i - 1] ?? "";

        document.getElementById(`set${i}-jugador2`).value =
            partido.setsJugador2?.[i - 1] ?? "";
    }

    actualizarCampoTorneo();
}

async function eliminarPartido(id){

    const confirmar = confirm(
        "¿Seguro que querés eliminar este partido?"
    );

    if(!confirmar) return;

    await deleteDoc(
        doc(db, "partidos", String(id))
    );

    partidos = await cargarPartidos();

    renderAdminPartidos();
}
                                    /* admin torneos */

let torneoEditando = null;

const formTorneo = document.getElementById("form-torneo");
const tablaAdminTorneos = document.getElementById("tabla-admin-torneos");

if(formTorneo){

    formTorneo.addEventListener("submit", async function(e){

        e.preventDefault();

        const nombre = document.getElementById("nombre-torneo").value;
        const fecha = document.getElementById("fecha-torneo").value;
        const formato = document.getElementById("formato-torneo").value;
        const estado = document.getElementById("estado-torneo").value;

        if(torneoEditando !== null){

            await updateDoc(
                doc(db, "torneos", torneoEditando),
                {
                    nombre: nombre,
                    fechaInicio: fecha,
                    formato: formato,
                    estado: estado
                }
            );

            torneos = await cargarTorneos();

            torneoEditando = null;

        }else{

            await addDoc(
                collection(db, "torneos"),
                {
                    nombre: nombre,
                    fechaInicio: fecha,
                    formato: formato,
                    estado: estado
                }
            );

            torneos = await cargarTorneos();
        }

        renderAdminTorneos();

        formTorneo.reset();

    });

}

function renderAdminTorneos(){

    if(!tablaAdminTorneos) return;

    tablaAdminTorneos.innerHTML = "";

    torneos.forEach(torneo => {

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${torneo.nombre}</td>
            <td>${torneo.fechaInicio}</td>
            <td>${torneo.formato || "-"}</td>
            <td>${torneo.estado}</td>

            <td class="acciones-admin">
                <button
                    class="btn-editar"
                    type="button"
                    onclick="editarTorneo('${torneo.id}')">
                    Editar
                </button>

                <button
                    class="btn-eliminar"
                    type="button"
                    onclick="eliminarTorneo('${torneo.id}')">
                    Eliminar
                </button>
            </td>
        `;

        tablaAdminTorneos.appendChild(fila);
    });
}

function editarTorneo(id){

    const torneo = torneos.find(
        t => String(t.id) === String(id)
    );

    if(!torneo){
        alert("No encontré el torneo");
        return;
    }

    torneoEditando = String(id);

    document.getElementById("nombre-torneo").value =
        torneo.nombre;

    document.getElementById("fecha-torneo").value =
        torneo.fechaInicio;

    document.getElementById("formato-torneo").value =
        torneo.formato || "largo";

    document.getElementById("estado-torneo").value =
        torneo.estado;
}

async function eliminarTorneo(id){

    const confirmar = confirm(
        "¿Seguro que querés eliminar este torneo?"
    );

    if(!confirmar) return;

    await deleteDoc(
        doc(db, "torneos", String(id))
    );

    torneos = await cargarTorneos();

    renderAdminTorneos();

}

renderAdminTorneos();
window.editarJugador = editarJugador;
window.eliminarJugador = eliminarJugador;

window.editarPartido = editarPartido;
window.eliminarPartido = eliminarPartido;

window.editarTorneo = editarTorneo;
window.eliminarTorneo = eliminarTorneo;

window.cerrarSesion = cerrarSesion;