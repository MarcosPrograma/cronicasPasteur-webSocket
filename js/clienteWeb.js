let websocket; 

function wsConnect() {
    websocket = new WebSocket("ws://localhost:3000");

    // Asignación de callbacks
    websocket.onopen = function (evt) {
        console.log('Conectado con el WebSocket Server');
    };
    websocket.onmessage = function (evt) {
        console.log('Servidor: UID Recibido', evt.data);
        const uid = evt.data;
        abrirPanelPorUID(uid);
    };
    websocket.onclose = function (evt) {
        console.log('reconectando WebSocket');
        setTimeout(function () {
            wsConnect(); // volver a conectar
        }, 2000);
    };
    websocket.onerror = function (evt) {
        console.log("Error: " + evt.data);
    };
}

function abrirPanelPorUID(uid){
    if (uid === 'noHayTarjeta') {
        document.getElementById('panel1').classList.remove('mostrar');
        document.getElementById('panel2').classList.remove('mostrar');
    } else {
        switch (uid) {
            case '62269551':
                document.getElementById('panel1').classList.add('mostrar');
                break;
            case '7765a39f':
                document.getElementById('panel2').classList.add('mostrar');
                break;
            default:
                console.log('UID Desconocido:' + uid);
        }
    }
}

// Se invoca la función init cuando la página termina de cargarse
window.addEventListener("load", wsConnect, false);