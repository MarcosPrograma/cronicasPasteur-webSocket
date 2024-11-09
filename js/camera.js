import * as THREE from 'three';

export function setearCamera(){
    const camera = new THREE.PerspectiveCamera( 65, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set (50,50,50);
    return camera;
}