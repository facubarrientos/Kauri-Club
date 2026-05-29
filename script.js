const botonMenu =
document.getElementById("menu-toggle");

const menu =
document.querySelector(".menu");

if(botonMenu){

    botonMenu.addEventListener("click", () => {

        menu.classList.toggle("activo");

    });

}


const contenedorPartidos =
document.getElementById("contenedor-partidos");

function renderPartidosPublicos(){

    if(!contenedorPartidos) return;

    contenedorPartidos.innerHTML = "";

    torneos.forEach(torneo => {

        const partidosDelTorneo = partidos.filter(
            partido => Number(partido.idTorneo) === Number(torneo.id)
        );

        const bloque = document.createElement("div");

        bloque.classList.add("bloque-torneo");

        bloque.innerHTML = `
            <h3>${torneo.nombre}</h3>

            <p class="estado-torneo">
                ${torneo.estado}
            </p>
        `;

        if(partidosDelTorneo.length === 0){

            bloque.innerHTML += `
                <p class="sin-partidos">
                    No hay partidos cargados.
                </p>
            `;

        }else{

            partidosDelTorneo.forEach(partido => {

                const j1 = jugadores.find(
                    j => Number(j.id) === Number(partido.jugador1)
                );

                const j2 = jugadores.find(
                    j => Number(j.id) === Number(partido.jugador2)
                );

                bloque.innerHTML += `
                    <div class="card-partido">

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
                                    Ranking: ${j1 ? j1.puntos : "-"}
                                </span>

                            </div>

                        </div>

                        <div class="versus">
                            <span>VS</span>

                            <span class="badge-partido">
                                ${partido.estado}
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
                                    Ranking: ${j2 ? j2.puntos : "-"}
                                </span>

                            </div>

                        </div>

                        <div class="info-cancha">
                            <p> ${partido.cancha}</p>
                        </div>

                        <div class="resultado-partido">
                            ${formatearResultado(partido)}
                        </div>

                    </div>
                `;

            });

        }

        contenedorPartidos.appendChild(bloque);

    });

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
            j => Number(j.id) === Number(partido.jugador1)
        );

        const j2 = jugadores.find(
            j => Number(j.id) === Number(partido.jugador2)
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
                        Ranking: ${j1 ? j1.puntos : "-"}
                    </span>

                </div>

            </div>

            <div class="versus">
                <span>VS</span>

                <span class="badge-partido">
                    ${partido.estado}
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
                        Ranking: ${j2 ? j2.puntos : "-"}
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

renderPartidosPublicos();
const tablaRanking = document.getElementById("tabla-ranking");

if(tablaRanking){

    jugadores.forEach((jugador, index) => {

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

const listaJugadores = document.getElementById("lista-jugadores");
const buscadorJugadores = document.getElementById("buscador-jugadores");

function mostrarJugadores(filtro = ""){

    if(!listaJugadores) return;

    listaJugadores.innerHTML = "";

    jugadores
        .filter(jugador =>
            jugador.nombre.toLowerCase().includes(filtro.toLowerCase())
        )
        .forEach(jugador => {

            const card = document.createElement("div");
            card.classList.add("card-jugador");

            card.addEventListener("click", () => {
                 window.location.href = `perfil.html?id=${jugador.id}`;
            });

            card.innerHTML = `
                <img src="${jugador.foto}" alt="${jugador.nombre}">

                <h3>${jugador.nombre}</h3>

                <div class="stats-jugador">

                    <span>
                        ${jugador.puntos} pts
                    </span>

                    <span>
                        ${jugador.partidosGanados} victorias
                    </span>

                </div>
            `;

            listaJugadores.appendChild(card);
        });
}

if(buscadorJugadores){
    buscadorJugadores.addEventListener("input", () => {
        mostrarJugadores(buscadorJugadores.value);
    });

    mostrarJugadores();
}

const perfilJugador =
document.getElementById("perfil-jugador");

if(perfilJugador){

    const parametros =
    new URLSearchParams(window.location.search);

    const idJugador =
    parseInt(parametros.get("id"));

    const jugador =
    jugadores.find(j => j.id === idJugador);

    if(jugador){

        perfilJugador.innerHTML = `
            <div class="perfil-card">

                <div class="perfil-foto">
                    <img src="${jugador.foto}" alt="${jugador.nombre}">
                </div>

                <div class="perfil-info">

                    <h2>${jugador.nombre}</h2>

                    <div class="perfil-stats">

                        <div class="perfil-stat">
                            <strong>${jugador.puntos}</strong>
                            <span>Puntos</span>
                        </div>

                        <div class="perfil-stat">
                            <strong>${jugador.partidosJugados}</strong>
                            <span>Partidos</span>
                        </div>

                        <div class="perfil-stat">
                            <strong>${jugador.partidosGanados}</strong>
                            <span>Victorias</span>
                        </div>

                    </div>

                    <a href="jugadores.html" class="volver-jugadores">
                        <- Volver
                    </a>

                </div>

            </div>
        `;
    }

}


                                                                            /* admin*/

const formLogin =
document.getElementById("form-login");

if(formLogin){

    formLogin.addEventListener("submit", (e) => {

        e.preventDefault();

        const usuario =
        document.getElementById("usuario").value;

        const password =
        document.getElementById("password").value;

        if(
            usuario === "Lauchi.admin"
            &&
            password === "Acceso645@"
        ){

            localStorage.setItem("adminLogueado", "true");

            window.location.href = "admin.html";
        }
        else{
            alert("Datos incorrectos");
        }

    });

}

                                            /* proteccion admin*/
const adminLogueado =
localStorage.getItem("adminLogueado");

const paginasProtegidas = [

    "admin.html",
    "admin-jugadores.html",
    "admin-partidos.html",
    "admin-torneos.html"

];

const paginaActual =
window.location.pathname.split("/").pop();

if(

    paginasProtegidas.includes(paginaActual)

    &&

    adminLogueado !== "true"

){

    window.location.href = "login.html";

}

function cerrarSesion(){

    localStorage.removeItem("adminLogueado");

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
            <td>${jugador.puntos}</td>
            <td>${jugador.partidosGanados}</td>

            <td class="acciones-admin">
                <button class="btn-editar" onclick="editarJugador(${jugador.id})">
                    Editar
                </button>

                <button class="btn-eliminar" onclick="eliminarJugador(${jugador.id})">
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

    formJugador.addEventListener("submit", (e) => {

        e.preventDefault();

        const nombre = document.getElementById("nombre-jugador").value;
        const puntos = parseInt(document.getElementById("puntos-jugador").value);
        const partidos = parseInt(document.getElementById("partidos-jugador").value);
        const victorias = parseInt(document.getElementById("victorias-jugador").value);
        const foto = document.getElementById("foto-jugador").value;

        if(jugadorEditando){

            jugadorEditando.nombre = nombre;
            jugadorEditando.puntos = puntos;
            jugadorEditando.partidosJugados = partidos;
            jugadorEditando.partidosGanados = victorias;
            jugadorEditando.foto = foto;

        } else {

            jugadores.push({
                id: Date.now(),
                nombre: nombre,
                puntos: puntos,
                partidosJugados: partidos,
                partidosGanados: victorias,
                foto: foto
            });

        }

        renderAdminJugadores();

        formJugador.reset();

        modalJugador.classList.remove("activo");

        jugadorEditando = null;
    });

}

function editarJugador(id){

    const jugador = jugadores.find(j => j.id === id);

    if(!jugador) return;

    jugadorEditando = jugador;

    document.getElementById("nombre-jugador").value = jugador.nombre;
    document.getElementById("puntos-jugador").value = jugador.puntos;
    document.getElementById("partidos-jugador").value = jugador.partidosJugados;
    document.getElementById("victorias-jugador").value = jugador.partidosGanados;
    document.getElementById("foto-jugador").value = jugador.foto;

    modalJugador.classList.add("activo");
}

function eliminarJugador(id){

    const indice = jugadores.findIndex(j => j.id === id);

    if(indice !== -1){

        jugadores.splice(indice, 1);

        renderAdminJugadores();

    }
}

renderAdminJugadores();

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

if(formPartido){

    formPartido.addEventListener("submit", function(e){

        e.preventDefault();

        const jugador1 = Number(selectJugador1.value);
        const jugador2 = Number(selectJugador2.value);

        if(jugador1 === jugador2){
            alert("No podés seleccionar el mismo jugador");
            return;
        }

        const estado = document.getElementById("estado-partido").value;
        const sets = obtenerSets();

        if(partidoEditando !== null){

            const partido = partidos.find(
                p => Number(p.id) === Number(partidoEditando)
            );

            if(!partido) return;

            partido.idTorneo = Number(selectTorneo.value);
            partido.jugador1 = jugador1;
            partido.jugador2 = jugador2;
            partido.fecha = document.getElementById("fecha-partido").value;
            partido.hora = document.getElementById("hora-partido").value;
            partido.cancha = document.getElementById("cancha-partido").value;
            partido.estado = estado;
            partido.setsJugador1 = sets.setsJugador1;
            partido.setsJugador2 = sets.setsJugador2;
            partido.ganador = calcularGanador(partido);

            partidoEditando = null;

        }else{

            const nuevoPartido = {
                id: Date.now(),
                idTorneo: Number(selectTorneo.value),
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

            nuevoPartido.ganador = calcularGanador(nuevoPartido);

            partidos.push(nuevoPartido);
        }

        renderAdminPartidos();
        formPartido.reset();
    });
}

function renderAdminPartidos(){

    if(!tablaAdminPartidos) return;

    tablaAdminPartidos.innerHTML = "";

    partidos.forEach(partido => {

        const torneo = torneos.find(t => Number(t.id) === Number(partido.idTorneo));
        const j1 = jugadores.find(j => Number(j.id) === Number(partido.jugador1));
        const j2 = jugadores.find(j => Number(j.id) === Number(partido.jugador2));

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${torneo ? torneo.nombre : "Sin torneo"}</td>
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

            <td>${formatearResultado(partido)}</td>

            <td class="acciones-admin">
                <button class="btn-editar" type="button" onclick="editarPartido(${partido.id})">
                    Editar
                </button>

                <button class="btn-eliminar" type="button" onclick="eliminarPartido(${partido.id})">
                    Eliminar
                </button>
            </td>
        `;

        tablaAdminPartidos.appendChild(fila);
    });
}

function editarPartido(id){

    const partido = partidos.find(p => Number(p.id) === Number(id));

    if(!partido){
        alert("No encontré el partido");
        return;
    }

    partidoEditando = Number(id);

    selectTorneo.value = String(partido.idTorneo);
    selectJugador1.value = String(partido.jugador1);
    selectJugador2.value = String(partido.jugador2);

    document.getElementById("fecha-partido").value = partido.fecha;
    document.getElementById("hora-partido").value = partido.hora;
    document.getElementById("cancha-partido").value = partido.cancha;
    document.getElementById("estado-partido").value = partido.estado || "pendiente";

    for(let i = 1; i <= 3; i++){
        document.getElementById(`set${i}-jugador1`).value =
            partido.setsJugador1 && partido.setsJugador1[i - 1] !== undefined
            ? partido.setsJugador1[i - 1]
            : "";

        document.getElementById(`set${i}-jugador2`).value =
            partido.setsJugador2 && partido.setsJugador2[i - 1] !== undefined
            ? partido.setsJugador2[i - 1]
            : "";
    }
}

function eliminarPartido(id){

    const confirmar = confirm("¿Seguro que querés eliminar este partido?");

    if(!confirmar) return;

    const index = partidos.findIndex(p => Number(p.id) === Number(id));

    if(index !== -1){
        partidos.splice(index, 1);
    }

    renderAdminPartidos();
}

cargarSelectPartidos();
renderAdminPartidos();
                                    /* admin torneos */

let torneoEditando = null;

const formTorneo = document.getElementById("form-torneo");
const tablaAdminTorneos = document.getElementById("tabla-admin-torneos");

if(formTorneo){

    formTorneo.addEventListener("submit", function(e){

        e.preventDefault();

        const nombre = document.getElementById("nombre-torneo").value;
        const fecha = document.getElementById("fecha-torneo").value;
        const estado = document.getElementById("estado-torneo").value;

        if(torneoEditando !== null){

            const torneo = torneos.find(t => Number(t.id) === Number(torneoEditando));

            if(!torneo) return;

            torneo.nombre = nombre;
            torneo.fechaInicio = fecha;
            torneo.estado = estado;

            torneoEditando = null;

        }else{

            const nuevoTorneo = {
                id: Date.now(),
                nombre: nombre,
                fechaInicio: fecha,
                estado: estado
            };

            torneos.push(nuevoTorneo);
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
            <td>${torneo.estado}</td>
            <td class="acciones-admin">
                <button class="btn-editar" type="button" onclick="editarTorneo(${torneo.id})">
                    Editar
                </button>

                <button class="btn-eliminar" type="button" onclick="eliminarTorneo(${torneo.id})">
                    Eliminar
                </button>
            </td>
        `;

        tablaAdminTorneos.appendChild(fila);
    });
}

function editarTorneo(id){

    const torneo = torneos.find(t => Number(t.id) === Number(id));

    if(!torneo) return;

    torneoEditando = id;

    document.getElementById("nombre-torneo").value = torneo.nombre;
    document.getElementById("fecha-torneo").value = torneo.fechaInicio;
    document.getElementById("estado-torneo").value = torneo.estado;
}

function eliminarTorneo(id){

    const confirmar = confirm("¿Seguro que querés eliminar este torneo?");

    if(!confirmar) return;

    const index = torneos.findIndex(t => Number(t.id) === Number(id));

    if(index !== -1){
        torneos.splice(index, 1);
    }

    renderAdminTorneos();
}

renderAdminTorneos();