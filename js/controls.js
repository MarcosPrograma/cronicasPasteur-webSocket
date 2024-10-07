import * as THREE from 'three';
import { zoomInObjeto, zoomOutObjeto } from "/js/zoom.js";
import { OrbitControls } from "/js/controls/orbitControls.js";

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(); 

//---------------------------- Raycaster ----------------------------
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

            //Solo lo hace con los objetos seleccionados
            if (object.userData.id){
                const targetPosition = new THREE.Vector3();
                object.getWorldPosition(targetPosition);
                zoomInObjeto(camera, targetPosition);
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

        controls.minPolarAngle = 0;
        controls.maxPolarAngle = Math.PI * 0.6; //evitar rotaciones fuertes

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
        
        controls.minPolarAngle = 0;
        controls.maxPolarAngle = Math.PI * 0.45; //evitar rotaciones fuertes
        
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