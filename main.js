import * as THREE from 'three';

import scene from "./js/scene.js";
import renderer from "./js/renderer.js";
import { setearCamera } from "./js/camera.js"
import { setearControles, setearRaycaster } from "./js/controls.js";
import { cargarMundo, cargarObjeto } from "./js/loader.js";
import { setearLuces } from "./js/light.js";
import { interacciones, marcadores, iniciarCarrusel, stepper } from './js/interactions.js';
import { wsConnect } from "./js/clienteWeb.js";

//Camara
const camera = setearCamera();

//Controles
const controls = setearControles(camera, renderer);

//wsConnect(camera); 

//Cargar modelo
cargarMundo(scene);

//Cargar objetos
cargarObjeto('/models/monumento.gltf', 'panel1', scene, { x: 0.5, y: 1.8, z: 0 });
cargarObjeto('/models/ruinasPiamontesa.gltf', 'panel2', scene, { x: 6, y: 1.6, z: 29 });
cargarObjeto('/models/trainEstacion.gltf', 'panel3', scene, { x: -32, y: 1.6, z: -1 });
cargarObjeto('/models/escuelaPrimaria.gltf', 'panel4', scene, { x: -7, y: 1.6, z: 15 });
cargarObjeto('/models/iglesia.gltf', 'panel5', scene, { x: 26, y: 1.8, z: 26 });
cargarObjeto('/models/camaraPelicula.gltf', 'panel6', scene, { x: 6, y: 1.6, z: -2 });
cargarObjeto('/models/monumento2.gltf', 'panel7', scene, { x: -26, y: 1.8, z: -29 });
cargarObjeto('/models/clubAtleticoPast.gltf', 'panel8', scene, { x: 31, y: 1.6, z: -2 });
cargarObjeto('/models/unidadSanitaria.gltf', 'panel9', scene, { x: -22, y: 1.8, z: -31 });
cargarObjeto('/models/jardin.gltf', 'panel10', scene, { x: 15, y: 1.6, z: 2.5 });
cargarObjeto('/models/secundaria.gltf', 'panel11', scene, { x: -7, y: 1.6, z: -18 });
cargarObjeto('/models/monumento3.gltf', 'panel12', scene, { x: -3, y: 1.8, z: -28 });
cargarObjeto('/models/CEC.gltf', 'panel13', scene, { x: 14, y: 1.6, z: 6.5 });
cargarObjeto('/models/festival.gltf', 'panel14', scene, { x: 0, y: 1.6, z: -35 });
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

/*
let angle = 0; // Ángulo inicial en radianes
const radius = 75; // Radio de la órbita
const orbitSpeed = 0.002; // Velocidad de la órbita
*/

//Update
function animate() {
    requestAnimationFrame(animate);

    /*
    angle += orbitSpeed; // Incrementar el ángulo para el movimiento
    camera.position.x = radius * Math.cos(angle);
    camera.position.z = radius * Math.sin(angle);
    camera.lookAt(0, 0, 0); // Apuntar hacia el centro de la escena
    */

    controls.update();
    actualizarMarcador();
    //paneoCamara();    

    //console.log(`Posición de la cámara: X=${camera.position.x}, Y=${camera.position.y}, Z=${camera.position.z}`);

    renderer.render(scene, camera);
}

animate();
