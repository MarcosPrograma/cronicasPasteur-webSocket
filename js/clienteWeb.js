import * as THREE from 'three';
import { animacionCamara, zoomInObjeto, zoomOutObjeto } from "./zoom.js";

let websocket;
let scrollAutomaticoActivo = {};

export function wsConnect(camera) {
    websocket = new WebSocket("ws://localhost:3000");

    // Asignación de callbacks
    websocket.onopen = function (evt) {
        console.log('Conectado con el WebSocket Server');

        //ocultar UI cuando el ESP32 este activo
        document.querySelectorAll('.carrusel-bot-ant, .carrusel-bot-sig, .nav').forEach(ui => {
            ui.classList.add('ocultar-UI');
        });
    };

    websocket.onmessage = function (evt) {
        console.log('Servidor: UID Recibido', evt.data);
        const uid = evt.data;
        abrirPanelPorUID(uid, camera);
    };

    websocket.onclose = function (evt) {
        console.log('reconectando WebSocket');

        //volver a mostrar UI cuando el ESP32 este desactivo
        document.querySelectorAll('.carrusel-bot-ant, .carrusel-bot-sig, .nav-list').forEach(ui => {
            ui.classList.remove('ocultar-UI');
        });

        setTimeout(() => wsConnect(camera), 2000); //volver a conectar
    };

    websocket.onerror = function (evt) {
        console.log("Error: " + evt.data);
    };
}

function scrollAutomatico(panelId) {
    const panel = document.getElementById(panelId);

    if (panel) {
        const scrollTopMax = panel.scrollHeight - panel.clientHeight;
        //let scrollTop = panel.scrollTop;
        const duracion = 20000;
        let startTime = null;

        scrollAutomaticoActivo[panelId] = true;

        function animacionScroll(tiempo) {
            if (!scrollAutomaticoActivo[panelId]) return;

            if (startTime === null) startTime = tiempo;
            const timeElapsed = tiempo - startTime;
            const progress = Math.min(timeElapsed / duracion, 1);
            //panel.scrollTop = scrollTop + progress * (scrollTopMax - scrollTop);
            panel.scrollTop = progress * scrollTopMax;

            if (progress < 1) {
                requestAnimationFrame(animacionScroll);
            }
        }
        requestAnimationFrame(animacionScroll);
    }
}

function resetearScroll(panelId) {
    const panel = document.getElementById(panelId);
    if (panel) {
        panel.scrollTop = 0;
        scrollAutomaticoActivo[panelId] = false;
    }
}


const posicionesCamara = {
    'panel1': { x: 13, y: 12, z: 12 },
    'panel2': { x: 9, y: 12, z: 45 },
    'panel3': { x: -44, y: 12, z: -2 },
    'panel4': { x: -15, y: 12, z: 32 },
    'panel5': { x: 37, y: 12, z: 39 },
    'panel6': { x: 20, y: 12, z: -8 },
    'panel7': { x: -36, y: 11, z: -40 },
    'panel8': { x: 53, y: 12, z: -3 },
    'panel9': { x: -32, y: 12, z: -48 },
    'panel10': { x: 29, y: 10, z: 4 },
    'panel11': { x: -16, y: 12, z: -37 },
    'panel12': { x: -4, y: 12, z: -40 },
    'panel13': { x: 30, y: 12, z: 14 },
    'panel14': { x: -2, y: 12, z: -57 },
};

function abrirPanelPorUID(uid, camera) {
    const divInvisible = document.getElementById('divInvisible');

    //cierra paneles si no hay tarjeta
    if (uid === 'noHayTarjeta') {
        ['panel1', 'panel2', 'panel3', 'panel4', 'panel5', 'panel6', 'panel7', 'panel8', 'panel9', 'panel10',
            'panel11', 'panel12', 'panel13', 'panel14'].forEach(panelId => {
                document.getElementById(panelId).classList.remove('mostrar');
                resetearScroll(panelId);
                zoomOutObjeto(camera);
            });
            divInvisible.classList.remove('mostrar');
    } else {
        const mapeoPaneles = {
            '62269551': 'panel1',
            '7765a39f': 'panel2',
            '13e659e7': 'panel3',
            '33f370e7': 'panel4',
            '636598e7': 'panel5',
            '73569e7': 'panel6',
            'f36a39e7': 'panel7',
            '13438fe6': 'panel8',
            'c3199ce6': 'panel9',
            'f3d92e6': 'panel10',
            'f336abe6': 'panel11',
            '33e47fe7': 'panel12',
            '3fc7ae7': 'panel13',
            '339386e7': 'panel14',
        }

        const panelId = mapeoPaneles[uid];

        if (panelId) {
            document.getElementById(panelId).classList.add('mostrar');
            divInvisible.classList.add('mostrar');
            scrollAutomatico(panelId);
            const posicionCamara = posicionesCamara[panelId];
            if (posicionCamara) {
                animacionCamara(camera, posicionCamara, posicionCamara, 1500);
            } else {
                console.warn(`Posición de cámara no definida para el panel: ${panelId}`);
            }
        } else {
            console.log('UID Desconocido:', uid);
        }
    }
}


// Se invoca la función init cuando la página termina de cargarse
window.addEventListener("load", wsConnect, false);