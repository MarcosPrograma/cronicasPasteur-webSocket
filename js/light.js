import * as THREE from 'three';

export function setearLuces(scene) {
    const luzAmbiental = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(luzAmbiental);

    //Dos luces direcionales para que se vean las caras de los modelos
    const luzDireccional1 = new THREE.DirectionalLight(0xffffff, 1.5);
    luzDireccional1.position.set(50, 50, 50); 
    luzDireccional1.castShadow = true; 
    luzDireccional1.shadow.mapSize.width = 2048; //Calidad de la sombra en el mapa
    luzDireccional1.shadow.mapSize.height = 2048;
    scene.add(luzDireccional1);

    const luzDireccional2 = new THREE.DirectionalLight(0xffffff, 0.75);
    luzDireccional2.position.set(-50, 50, -50);
    luzDireccional2.castShadow = true;
    luzDireccional2.shadow.mapSize.width = 2048; 
    luzDireccional2.shadow.mapSize.height = 2048;
    scene.add(luzDireccional2);

    //Mejorar la intesidad de la luz
    const hemiLuz = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    hemiLuz.position.set(0, 200, 0);
    scene.add(hemiLuz);
}
