import * as THREE from 'three';

let posicionInicialCamara = new THREE.Vector3();

function toggleMarcadores(mostrar){
    const marcadores = document.querySelectorAll('.marcador');
    marcadores.forEach(marcador => {
        if (mostrar){
            marcador.classList.remove('oculto');
        } else {
            marcador.classList.add('oculto');
        }
    });
}

export function setearPosicionCamara(camera, targetPosition, lookAtPosition){
    camera.position.set(targetPosition.x, targetPosition.y, targetPosition.z);
    camera.lookAt(lookAtPosition.x, lookAtPosition.y, lookAtPosition.z);
}

export function zoomInObjeto(camera, targetPosition, duration = 1000){
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

        if(t < 1){
            requestAnimationFrame(animateZoom);
        } else {
            toggleMarcadores(true);
        }
    }

    requestAnimationFrame(animateZoom);
}

export function zoomOutObjeto(camera, duration = 1000){
    const startPosition = new THREE.Vector3().copy(camera.position);
    const endPosition = new THREE.Vector3().copy(posicionInicialCamara);

    toggleMarcadores(false);

    const marcadores = document.querySelectorAll('.marcador');
    marcadores.forEach(marcador => marcador.classList.add('oculto'));

    const startTime = performance.now();

    function animateZoom(time){
        const elapsed = time - startTime;
        const t = Math.min(elapsed / duration, 1);
        const easedT = t * (2 - t); //suavizado de la animacion

        camera.position.lerpVectors(startPosition, endPosition, easedT);

        camera.lookAt(endPosition);

        if(t < 1){
            requestAnimationFrame(animateZoom);
        } else {
            toggleMarcadores(true);
        }
    }
    requestAnimationFrame(animateZoom);
}