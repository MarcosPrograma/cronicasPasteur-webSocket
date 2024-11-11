import * as THREE from 'three';

let posicionInicialCamara = new THREE.Vector3();
const posicionDefault = new THREE.Vector3(56, 23, 52); 

//ocultar marcadores
function toggleMarcadores(mostrar) {
    const marcadores = document.querySelectorAll('.marcador');
    marcadores.forEach(marcador => {
        if (mostrar) {
            setTimeout(() => {
                marcador.classList.remove('oculto');
            }, 100); //delay de 1 miliseg para que se puedan reubicar los marcadores
        } else {
            marcador.classList.add('oculto');
        }
    });
}

/* //set posicion camara manual
export function setearPosicionCamara(camera, targetPosition, lookAtPosition){
    camera.position.set(targetPosition.x, targetPosition.y, targetPosition.z);
    camera.lookAt(lookAtPosition.x, lookAtPosition.y, lookAtPosition.z);
}
*/

//animacion de la camara 
export function animacionCamara(camera, targetPosition, lookAtPosition, duration = 1000) {

    if (!camera || !camera.position) {
        //console.log('Camera is undefined or does not have a position property');
        return;
    }

    toggleMarcadores(false);
    
    const startPosition = new THREE.Vector3().copy(camera.position); //posicion actual de la camara
    const startAtLook = new THREE.Vector3(); //posicion actual donde mira 
    camera.getWorldDirection(startAtLook);

    const endPosition = new THREE.Vector3(targetPosition.x, targetPosition.y, targetPosition.z);
    const endLookAt = new THREE.Vector3(targetPosition.x, targetPosition.y, targetPosition.z);

    const startTime = performance.now();

    function animate(time) {
        const elapsed = time - startTime;
        const t = Math.min(elapsed / duration, 1);
        const easedT = t * (2 - t); //suavizado para la interpolacion

        //interpolacion
        camera.position.lerpVectors(startPosition, endPosition, easedT);
        const currentLookAt = new THREE.Vector3().lerpVectors(startAtLook, endLookAt, easedT);
        camera.lookAt(currentLookAt);

        if (t < 1) {
            requestAnimationFrame(animate);
            toggleMarcadores(false);
        } else {
            toggleMarcadores(true);
        }
    }

    requestAnimationFrame(animate);
}

//inicializar en una posicion default, para tener una posicion inicial y no un 0,0,0
export function inicializarCamara(camera){
    if(posicionInicialCamara.equals(new THREE.Vector3(0, 0, 0))){
        posicionInicialCamara.copy(posicionDefault);
        camera.position.copy(posicionDefault);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
}

//zoomIn
export function zoomInObjeto(camera, targetPosition, duration = 1000) {

    if (!camera || !camera.position) {
        //console.log('Camera is undefined or does not have a position property');
        return;
    }

    posicionInicialCamara.copy(camera.position); //guardar posicion

    toggleMarcadores(false);

    const marcadores = document.querySelectorAll('.marcador');
    marcadores.forEach(marcador => marcador.classList.add('oculto'));

    const startPosition = new THREE.Vector3().copy(camera.position);
    const direction = new THREE.Vector3().subVectors(targetPosition, camera.position).normalize();

    const distancia = 10; //ajustable para controlar que tan cerca queda la camara 
    const endPosition = new THREE.Vector3().copy(targetPosition).sub(direction.multiplyScalar(distancia));

    /*
    const alturaAjustada = 3;
    endPosition.y = targetPosition.y + alturaAjustada;
    endPosition.x = targetPosition.x + alturaAjustada;
    endPosition.z = targetPosition.z + alturaAjustada;
    */

    const startTime = performance.now();

    function animateZoom(time) {
        const elapsed = time - startTime;
        const t = Math.min(elapsed / duration, 1);
        const easedT = t * (2 - t); //suavizado de la animacion

        camera.position.lerpVectors(startPosition, endPosition, easedT);

        camera.lookAt(targetPosition);

        if (t < 1) {
            requestAnimationFrame(animateZoom);
            toggleMarcadores(false);
        } else {
            toggleMarcadores(true);
        }
    }

    requestAnimationFrame(animateZoom);
}

//zoomOut
export function zoomOutObjeto(camera, duration = 1000) {

    if (!camera || !camera.position) {
        //console.log('Camera is undefined or does not have a position property');
        return;
    }

    if (posicionInicialCamara.equals(new THREE.Vector3(0, 0, 0))) {
        posicionInicialCamara.copy(posicionDefault);
    }

    const startPosition = new THREE.Vector3().copy(camera.position);
    const endPosition = new THREE.Vector3().copy(posicionInicialCamara);

    toggleMarcadores(false);

    const marcadores = document.querySelectorAll('.marcador');
    marcadores.forEach(marcador => marcador.classList.add('oculto'));

    const startTime = performance.now();

    function animateZoom(time) {
        const elapsed = time - startTime;
        const t = Math.min(elapsed / duration, 1);
        const easedT = t * (2 - t); //suavizado de la animacion

        camera.position.lerpVectors(startPosition, endPosition, easedT);

        camera.lookAt(endPosition);

        if (t < 1) {
            requestAnimationFrame(animateZoom);
            toggleMarcadores(false);
        } else {
            toggleMarcadores(true);
        }
    }
    requestAnimationFrame(animateZoom);
}