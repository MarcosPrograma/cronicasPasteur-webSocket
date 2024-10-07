import * as THREE from 'three';

export function setearCamera(){
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set (25,50,50);
    return camera;
}