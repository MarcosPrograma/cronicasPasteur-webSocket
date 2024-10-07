import * as THREE from 'three';

export function pantallaCarga() {
    const pantallaCarga = document.getElementById('pantalla-carga');
    const contenido = document.getElementById('contenido-principal');
    const barraCarga = document.getElementById('barra-carga');
    const textoCarga = document.createElement('p');
    textoCarga.textContent = 'Cargando...';
    pantallaCarga.appendChild(textoCarga);

    const manager = new THREE.LoadingManager();

    manager.onStart = function (url, itemsLoaded, itemsTotal) {
        console.log(`Comenzando a cargar los archivos: ${url}\nLoaded ${itemsLoaded} of ${itemsTotal} files.`);
        contenido.style.display = 'none';
        pantallaCarga.style.display = 'flex';
    };

    manager.onLoad = function () {
        console.log('Carga completa');
        pantallaCarga.style.display = 'none';
        contenido.style.display = 'block';
    };

    manager.onProgress = function (url, itemsLoaded, itemsTotal) {
        const progreso = (itemsLoaded / itemsTotal) * 100;
        textoCarga.textContent = `Cargando... ${Math.round(progreso)}%`;
        barraCarga.style.width = progreso + '%';
    };

    manager.onError = function (url) {
        console.log('Hubo un error en la carga ' + url);
    };

    /*
    //simulación de carga
    setTimeout(() => {
        manager.onProgress();
    }, 10000); // 5 segundos de retraso para pruebas
    */

    return manager;
}
