import * as THREE from 'three';

let posicionInicialCamara = new THREE.Vector3();

export function zoomInObjeto(camera, targetPosition, duration = 1000){
    posicionInicialCamara.copy(camera.position); //guardar posicion

    const startPosition = new THREE.Vector3().copy(camera.position);
    const direction = new THREE.Vector3().subVectors(targetPosition, camera.position).normalize();
    
    const distancia = 4; //ajustable para controlar que tan cerca queda la camara 
    
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
        }
    }

    requestAnimationFrame(animateZoom);
}

export function zoomOutObjeto(camera, duration = 1000){
    const startPosition = new THREE.Vector3().copy(camera.position);
    const endPosition = new THREE.Vector3().copy(posicionInicialCamara);

    const startTime = performance.now();

    function animateZoom(time){
        const elapsed = time - startTime;
        const t = Math.min(elapsed / duration, 1);
        const easedT = t * (2 - t); //suavizado de la animacion

        camera.position.lerpVectors(startPosition, endPosition, easedT);

        camera.lookAt(endPosition);

        if(t < 1){
            requestAnimationFrame(animateZoom);
        }
    }
    requestAnimationFrame(animateZoom);
}