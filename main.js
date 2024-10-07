import * as THREE from 'three';

import scene from "./js/scene.js";
import renderer from "./js/renderer.js";
import { setearCamera } from "./js/camera.js"
import { setearControles, setearRaycaster } from "./js/controls.js";
import { cargarMundo, cargarObjeto } from "./js/loader.js";
import { setearLuces } from "./js/light.js";
import { interacciones, marcadores, iniciarCarrusel, stepper } from './js/interactions.js';

/*
//-------------------- Web Socket --------------------
const socket = new WebSocket("ws://localhost:3000"); //Crear conexion con el websocket

socket.addEventListener('open', function (event) {
    console.log('Conectado con el WebSocket Server'); //Abrir la conexion
});

socket.addEventListener('message', function (event) {
    console.log('Mensaje del servidor (UID Recibido)', event.data);

    const uid = event.data;
    abrirPanelPorUID(uid);
});

function abrirPanelPorUID(uid) {
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
//------------------------------------------------------
*/

//Camara
const camera = setearCamera();

//Controles
const controls = setearControles(camera, renderer);

//Cargar modelo
cargarMundo(scene);

//Cargar objetos
cargarObjeto('/models/monumento.gltf', 'panel1', scene, { x: 1.5, y: 1.8, z: 1.5 });
cargarObjeto('/models/ruinasPiamontesa.gltf', 'panel2', scene, { x: 6, y: 1.6, z: 29 });
cargarObjeto('/models/trainEstacion.gltf', 'panel3', scene, { x: -30, y: 1.6, z: -1 });
cargarObjeto('/models/escuelaPrimaria.gltf', 'panel4', scene, { x: -6.2, y: 1.6, z: 16 });
cargarObjeto('/models/iglesia.gltf', 'panel5', scene, { x: 27, y: 1.8, z: 27 });
cargarObjeto('/models/camaraPelicula.gltf', 'panel6', scene, { x: 6, y: 1.6, z: 0 });
cargarObjeto('/models/monumento2.gltf', 'panel7', scene, { x: -24, y: 1.8, z: -27 });
cargarObjeto('/models/clubAtleticoPast.gltf', 'panel8', scene, { x: 33, y: 1.6, z: -2 });
cargarObjeto('/models/unidadSanitaria.gltf', 'panel9', scene, { x: -22, y: 1.8, z: -31 });
cargarObjeto('/models/jardin.gltf', 'panel10', scene, { x: 14, y: 1.6, z: 5 });
cargarObjeto('/models/secundaria.gltf', 'panel11', scene, { x: -5.6, y: 1.6, z: -16.5 });
cargarObjeto('/models/monumento3.gltf', 'panel12', scene, { x: -6, y: 1.8, z: -26.5 });
cargarObjeto('/models/CEC.gltf', 'panel13', scene, { x: 14, y: 1.6, z: 6 });
cargarObjeto('/models/festival.gltf', 'panel14', scene, { x: -2, y: 1.6, z: -30 });
//Geriatrico

//Secretos
cargarObjeto('/models/secreto1.gltf', 'panel16', scene, { x: -29, y: 1.6, z: 14 });
cargarObjeto('/models/secreto2.gltf', 'panel17', scene, { x: 35, y: 1.6, z: -20 });
cargarObjeto('/models/secreto3.gltf', 'panel18', scene, { x: -28, y: 1.6, z: 30 });
cargarObjeto('/models/secreto4.gltf', 'panel19', scene, { x: 30, y: 1.6, z: -30 });

//Lucecita
setearLuces(scene);

//Raycaster
setearRaycaster(camera, scene);

//Interaccion
interacciones(camera);
iniciarCarrusel();
stepper();

//Sincronizar marcadores
const actualizarMarcador = marcadores(scene, camera);

//Resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

//Update
function animate() {
    requestAnimationFrame(animate);

    controls.update();
    actualizarMarcador();

    renderer.render(scene, camera);
}

animate();
