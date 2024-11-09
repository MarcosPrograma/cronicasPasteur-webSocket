let websocket;
let scrollAutomaticoActivo = {};

function wsConnect() {
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
        abrirPanelPorUID(uid);
    };

    websocket.onclose = function (evt) {
        console.log('reconectando WebSocket');

        //volver a mostrar UI cuando el ESP32 este desactivo
        document.querySelectorAll('.carrusel-bot-ant, .carrusel-bot-sig, .nav-list').forEach(ui => {
            ui.classList.renove('ocultar-UI');
        });

        setTimeout(function () {
            wsConnect(); // volver a conectar
        }, 2000);

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
        const duracion = 10000;
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

function abrirPanelPorUID(uid) {
    //cierra paneles si no hay tarjeta
    if (uid === 'noHayTarjeta') {
        ['panel1', 'panel2', 'panel3', 'panel4', 'panel5', 'panel6', 'panel7', 'panel8', 'panel9', 'panel10',
            'panel11', 'panel12', 'panel13', 'panel14'].forEach(panelId => {
                document.getElementById(panelId).classList.remove('mostrar');
                resetearScroll(panelId);
            });
    } else {
        switch (uid) {
            case '62269551':
                document.getElementById('panel1').classList.add('mostrar');
                scrollAutomatico('panel1');
                break;
            case '7765a39f':
                document.getElementById('panel2').classList.add('mostrar');
                scrollAutomatico('panel2');
                break;
            case '13e659e7':
                document.getElementById('panel3').classList.add('mostrar');
                break;
            case '33f370e7':
                document.getElementById('panel4').classList.add('mostrar');
                break;
            case '636598e7':
                document.getElementById('panel5').classList.add('mostrar');
                break;
            case '73569e7':
                document.getElementById('panel6').classList.add('mostrar');
                break;
            case 'f36a39e7':
                document.getElementById('panel7').classList.add('mostrar');
                break;
            case '13438fe6':
                document.getElementById('panel8').classList.add('mostrar');
                break;
            case 'c3199ce6':
                document.getElementById('panel9').classList.add('mostrar');
                break;
            case 'f3d92e6':
                document.getElementById('panel10').classList.add('mostrar');
                break;
            case 'f336abe6':
                document.getElementById('panel11').classList.add('mostrar');
                break;
            case '33e47fe7':
                document.getElementById('panel12').classList.add('mostrar');
                break;
            case '3fc7ae7':
                document.getElementById('panel13').classList.add('mostrar');
                break;
            case '339386e7':
                document.getElementById('panel14').classList.add('mostrar');
                break;
            default:
                console.log('UID Desconocido:' + uid);
        }
    }
}

// Se invoca la función init cuando la página termina de cargarse
window.addEventListener("load", wsConnect, false);