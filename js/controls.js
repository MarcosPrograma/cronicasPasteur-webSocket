import * as THREE from 'three';
import { animacionCamara, zoomInObjeto, zoomOutObjeto } from "/js/zoom.js";
import { OrbitControls } from "/js/controls/orbitControls.js";

//---------------------------- Raycaster ----------------------------
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(); 

function toggleMarcadores(mostrar) {
    const marcadores = document.querySelectorAll('.marcador');
    marcadores.forEach(marcador => {
        if (mostrar) {
            marcador.classList.remove('oculto');
        } else {
            marcador.classList.add('oculto');
        }
    });
}

//Setear una posicion de camara para el zoomIn
const posicionesCamara = {
    'panel1': {x: 13, y: 12, z: 12},
    'panel2': { x: 9, y: 12, z: 45 },
    'panel3': { x: -44, y: 12, z: -2 },
    'panel4': {x: -15, y: 12, z: 32},
    'panel5': {x: 37, y: 12, z: 39},
    'panel6': {x: 20, y: 12, z: -8},
    'panel7': {x: -36, y: 11, z: -40},
    'panel8': {x: 53, y: 12, z: -3},
    'panel9': {x: -32, y: 12, z: -48},
    'panel10': {x: 29, y: 10, z: 4},
    'panel11': {x: -16, y: 12, z: -37},
    'panel12': {x: -4, y: 12, z: -40},
    'panel13': {x: 30, y: 12, z: 14},
    'panel14': {x: -2, y: 12, z: -57},

    'panel16': {x: -43, y: 10, z: 20},
    'panel17': {x: 45, y: 10, z: -25},
    'panel18': {x: -36, y: 10, z: 39},
    'panel19': {x: 38, y: 10, z: -38},
};

export function setearRaycaster(camera, scene) {
    const divInvisible = document.getElementById('divInvisible'); // Fondo negro

    //Interaccion por clics
    function onMouseClick(event) {

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
            const object = intersects[0].object;
            
            const panelId = object.userData.id;
            const panel = document.getElementById(panelId);

            //si el objeto tiene un id valido
            if (panelId && posicionesCamara[panelId]){
                const posicionCamara = posicionesCamara[panelId];
                const targetPosition = new THREE.Vector3();
                object.getWorldPosition(targetPosition);

                toggleMarcadores(false);

                animacionCamara(camera, posicionCamara, targetPosition, 1500);

                setTimeout(() => {
                  zoomInObjeto(camera, targetPosition);
                }, 1500);
            }

            //si hay un panel abierto, se debe cerrar el otro 
            if (panel) {
                document.querySelectorAll('.panelDesplegable').forEach(p => p.classList.remove('mostrar'));
                panel.classList.add('mostrar');
                divInvisible.classList.add('mostrar');
            }
        }
    }

    // Cerrar paneles y ocultar divInvisible al hacer clic sobre él
    divInvisible.addEventListener('click', () => {
        document.querySelectorAll('.panelDesplegable').forEach(panel => {
            panel.classList.remove('mostrar');
        });
        divInvisible.classList.remove('mostrar');
        zoomOutObjeto(camera);
        toggleMarcadores(true);
    });

    window.addEventListener('click', onMouseClick);
}

//------------- Controles de rotacion, zoom, paneo, etc -------------
export function setearControles(camera, renderer) {
    const controls = new OrbitControls(camera, renderer.domElement);

    const esMobile = window.matchMedia ("(max-width: 768px)").matches;

    if(esMobile){
        //--- config de controles para movil ---
        //distancia del zoom
        controls.minDistance = 22;
        controls.maxDistance = 70;

        //limites de la orbita en vertical
        controls.minPolarAngle = 0;
        controls.maxPolarAngle = Math.PI * 0.45; 

        //amortiguacion
        controls.enableDamping = true;
        controls.dampingFactor = 0.06;
        
        //velocidad de zoom
        controls.enableZoom = true; 
        controls.zoomSpeed = 1.2;

        //velocidad de rotacion
        controls.enableRotate = true;
        controls.rotateSpeed = 0.6;
        
        //paneo
        controls.enablePan = false;
        controls.screenSpacePanning = false;

        controls.autoRotate = false; 
    } else {
        //--- config de controles para escritorio ---
        //distancia del zoom
        controls.minDistance = 22;
        controls.maxDistance = 70;
        
        //limites de la orbita en vertical
        controls.minPolarAngle = 0;
        controls.maxPolarAngle = Math.PI * 0.45; 
        
        //amortiguacion
        controls.enableDamping = true;
        controls.dampingFactor = 0.06;
                
        //velocidad de zoom
        controls.enableZoom = true; 
        controls.zoomSpeed = 1.2;
        
        //velocidad de rotacion
        controls.enableRotate = true;
        controls.rotateSpeed = 0.4;
                
        //paneo
        controls.enablePan = false;
        controls.screenSpacePanning = false;
        
        controls.autoRotate = false; 
    }

    return controls;
}