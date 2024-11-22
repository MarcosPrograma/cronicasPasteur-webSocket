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
    'panel1': {x: 31, y: 23, z: 31},
    'panel2': { x: 12, y: 16, z: 48 },
    'panel3': { x: -50, y: 13, z: -3 },
    'panel4': {x: -25, y: 17, z: 39},
    'panel5': {x: 40, y: 13, z: 42},
    'panel6': {x: 34, y: 22, z: -29},
    'panel7': {x: -40, y: 12, z: -46},
    'panel8': {x: 53, y: 13, z: -3},
    'panel9': {x: -37, y: 16, z: -52},
    'panel10': {x: 46, y: 17, z: 8},
    'panel11': {x: -16, y: 14, z: -37},
    'panel12': {x: -8, y: 14, z: -47},
    'panel13': {x: 41, y: 18, z: 22},
    'panel14': {x: 0, y: 18, z: -63},

    'panel16': {x: -44, y: 10, z: 21},
    'panel17': {x: 49, y: 10, z: -28},
    'panel18': {x: -41, y: 12, z: 43},
    'panel19': {x: 40, y: 10, z: -38},
};

export function setearRaycaster(camera, scene) {
    const divInvisible = document.getElementById('divInvisible'); // Fondo negro

    //Interaccion por clics
    function onMouseClick(event) {
        if (divInvisible.classList.contains('mostrar')) return;

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

                if (posicionCamara) {;
                    animacionCamara(camera, posicionCamara, targetPosition, 1500);
                }

                //zoomInObjeto(camera, targetPosition, 1500);
                
                /*
                setTimeout(() => {
                  zoomInObjeto(camera, targetPosition);
                }, 1500);
                */
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
        controls.minDistance = 50;
        controls.maxDistance = 90;

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
        controls.minDistance = 40;
        controls.maxDistance = 80;
        
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