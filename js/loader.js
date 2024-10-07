import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { pantallaCarga } from "./pantallaCarga.js";

// Pantalla de carga
const manager = pantallaCarga();

// Cargar plano del mundo
export function cargarMundo(scene){
    const loader = new GLTFLoader(manager).setPath('/models/');

    loader.load('scene.gltf', (gltf) => {
        console.log('Cargando mundo');
        const mesh = gltf.scene;
        mesh.position.set(0, 0, 0);
        scene.add(mesh);
    });
}

// Cargar objetos particulares
export function cargarObjeto(rutaArchivo, id, scene, posicion) {
    const loader = new GLTFLoader(manager);

    loader.load(rutaArchivo, (gltf) => {
        console.log('Cargando objeto:', id);
        const objeto = gltf.scene;
        objeto.position.set(posicion.x, posicion.y, posicion.z); 
        objeto.userData.id = id;

        objeto.traverse((child) => {
            if (child.isMesh) {
                child.userData.id = id;
                child.castShadow = true;
                child.receiveShadow = true;

                if (child.material) {
                    child.material.metalness = 0.2;
                    child.material.roughness = 1;
                }
            }
        });

        scene.add(objeto);
    });
}
