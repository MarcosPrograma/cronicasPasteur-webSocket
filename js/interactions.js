import * as THREE from 'three';
import { zoomInObjeto, zoomOutObjeto } from "/js/zoom.js";

//----------- Paneles ------------
export function interacciones(camera) {
    document.addEventListener('DOMContentLoaded', function () {
        const abrir = document.querySelectorAll('[data-target]');
        const cerrar = document.querySelectorAll('.cerrar');
        const paneles = document.querySelectorAll('.panelDesplegable'); //Paneles de info
        const panel_menu = document.getElementById('panel_menu'); //Menu
        const acercaDe = document.getElementById('acercaDe'); //AcercaDe
        const divInvisible = document.getElementById('divInvisible'); //Fondo negro
        let panelActualmenteAbierto = null; 

        function actualizarDivInvisible() {
            const algunPanelAbierto = Array.from(paneles).some(panel => panel.classList.contains('mostrar')) || acercaDe.classList.contains('mostrar') || panel_menu.classList.contains('mostrar');
            if (algunPanelAbierto) {
                divInvisible.classList.add('mostrar');
            } else {
                divInvisible.classList.remove('mostrar');
            }
        }

        //Apertura de los paneles con data-target
        abrir.forEach(boton => {
            boton.addEventListener('click', function () {

                const targetId = this.getAttribute('data-target');
                const targetPanel = document.getElementById(targetId);

                //si hay otro panel abierto, lo cierra
                if (panelActualmenteAbierto && panelActualmenteAbierto !== targetPanel) {
                    panelActualmenteAbierto.classList.remove('mostrar');
                    panelActualmenteAbierto.scrollTop = 0;
                }

                if (targetPanel) {
                    targetPanel.classList.toggle('mostrar');
                    panelActualmenteAbierto = targetPanel.classList.contains('mostrar') ? targetPanel : null;
                    targetPanel.scrollTop = 0;
                }

                actualizarDivInvisible();
            });
        });

        //Apertura del menu
        const abrirMenu = document.querySelector('#abrirMenu');
        if (abrirMenu) {
            abrirMenu.addEventListener('click', function () {
                panel_menu.classList.toggle('mostrar');
                if(panel_menu.classList.contains('mostrar')){
                    panel_menu.scrollTop = 0;
                }
                actualizarDivInvisible();
            });
        }

        //Cierre de los paneles
        cerrar.forEach(boton => {
            boton.addEventListener('click', function () {
                const panelDesplegable = this.closest('.panelDesplegable') || acercaDe;

                if (this.closest('#panel_menu')){
                    panel_menu.classList.remove('mostrar');
                    panel_menu.scrollTop = 0;
                } else if (panelDesplegable) {
                    panelDesplegable.classList.remove('mostrar');
                    panelDesplegable.scrollTop = 0;
                    panelActualmenteAbierto = null;

                    zoomOutObjeto(camera);
                }
                actualizarDivInvisible();
            });
        });

        divInvisible.addEventListener('click', function () {
            paneles.forEach(panel => {
                panel.classList.remove('mostrar');
                panel.scrollTop = 0;
            });
            acercaDe.classList.remove('mostrar');
            acercaDe.scrollTop = 0;
            panel_menu.classList.remove('mostrar');
            panel_menu.scrollTop = 0;
            actualizarDivInvisible();
        });

        //-------- swipe -------- 
        let touchStartX = 0;
        let touchEndX = 0; 

        function swipe(){
            if(touchEndX < touchStartX - 50){ //swipe a la izquierda
                paneles.forEach(panel =>{ 
                    if (panel.classList.contains('mostrar')){
                        panel.classList.remove('mostrar');
                        panel.scrollTop = 0;
                    }
                });
                panelActualmenteAbierto = null;
                actualizarDivInvisible();
            } else if (touchEndX > touchStartX + 50 ){ //swipe a la derecha
                if(panel_menu.classList.contains('mostrar')){
                    panel_menu.classList.remove('mostrar');
                    panel_menu.scrollTop = 0;
                }
                if(acercaDe.classList.contains('mostrar')){
                    acercaDe.classList.remove('mostrar');
                    acercaDe.scrollTop = 0;
                }
                actualizarDivInvisible();
            }
        }

        // deteccion del incio del toque
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        // deteccion del final del toque
        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            swipe();
        });
    });
}

//----------- Marcadores ------------
export function marcadores(scene, camera) {
    const contenedor = document.getElementById('marcadores-contenedor');
    const divInvisible = document.getElementById('divInvisible'); // Fondo negro

    const marcadores = [
        { id: 'marker1', panelId: 'panel1', position: { x: 1.5, y: 5, z: 1.5 }, img: './src/img/locationHover.png'},
        { id: 'marker2', panelId: 'panel2', position: { x: 6, y: 6, z: 29 }, img: './src/img/locationHover.png'},
        { id: 'marker3', panelId: 'panel3', position: { x: -30, y: 6, z: -1 }, img: './src/img/locationHover.png'},
        { id: 'marker4', panelId: 'panel4', position: { x: -6.2, y: 6, z: 16 }, img: './src/img/locationHover.png'},
        { id: 'marker5', panelId: 'panel5', position: { x: 27, y: 6, z: 27 }, img: './src/img/locationHover.png'},
        { id: 'marker6', panelId: 'panel6', position: { x: 6, y: 5, z: 0 }, img: './src/img/locationHover.png'},
        { id: 'marker7', panelId: 'panel7', position: { x: -24, y: 4, z: -27 }, img: './src/img/locationHover.png'},
        { id: 'marker8', panelId: 'panel8', position: { x: 32, y: 5, z: 0 }, img: './src/img/locationHover.png'},
        { id: 'marker9', panelId: 'panel9', position: { x: -22, y: 6, z: -31 }, img: './src/img/locationHover.png'},
        { id: 'marker10', panelId: 'panel10', position: { x: 14, y: 4, z: 4 }, img: './src/img/locationHover.png'},
        { id: 'marker11', panelId: 'panel11', position: { x: -5.6, y: 6, z: -16.5 }, img: './src/img/locationHover.png'},
        { id: 'marker12', panelId: 'panel12', position: { x: -6, y: 5, z: -26.5 }, img: './src/img/locationHover.png'},
        { id: 'marker13', panelId: 'panel13', position: { x: 14, y: 4, z: 8 }, img: './src/img/locationHover.png'},
        { id: 'marker14', panelId: 'panel14', position: { x: -2, y: 4, z: -33 }, img: './src/img/locationHover.png'}
    ];

    const vector = new THREE.Vector3();
    const marcadoresPosiciones = {};

    function actualizarMarcadorPosicion() {
        marcadores.forEach(marcador => {
            let marcadorElement = document.getElementById(marcador.id);
            if (!marcadorElement) {
                marcadorElement = document.createElement('div');
                marcadorElement.className = 'marcador';
                marcadorElement.id = marcador.id;

                //Estilo para el marcador
                const img = document.createElement('img');
                const numeroMarcador = document.createElement('span');
                img.src = marcador.img;
                marcadorElement.appendChild(img);
                numeroMarcador.innerText = marcador.id.replace('marker', '');
                numeroMarcador.className = 'numero-marcador';
                marcadorElement.appendChild(numeroMarcador);

                contenedor.appendChild(marcadorElement);

                marcadorElement.addEventListener('click', () => {
                    const panel = document.getElementById(marcador.panelId);
                    document.querySelectorAll('.panelDesplegable').forEach(p => p.classList.remove('mostrar'));
                    if (panel) {
                        panel.classList.add('mostrar');
                        divInvisible.classList.add('mostrar');
                    }

                    const targetPosition = new THREE.Vector3(marcador.position.x, marcador.position.y, marcador.position.z);
                    zoomInObjeto(camera, targetPosition, 1000);
                });
            }

            vector.set(marcador.position.x, marcador.position.y, marcador.position.z);
            vector.project(camera);

            const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
            const y = (vector.y * -0.5 + 0.5) * window.innerHeight;

            //guardar posiciones de los marcadores
            if(!marcadoresPosiciones[marcador.id]){
                marcadoresPosiciones[marcador.id] = {x, y};
            }   

            //*intento* suavizado para que no salte con el zoom *tos* no funciona del todo *tos*
            const posicionPrevia = marcadoresPosiciones[marcador.id];
            posicionPrevia.x = THREE.MathUtils.lerp(posicionPrevia.x, x, 0.4);
            posicionPrevia.y = THREE.MathUtils.lerp(posicionPrevia.y, y, 0.4);

            marcadorElement.style.transform = `translate(-50%, -50%) translate(${posicionPrevia.x}px, ${posicionPrevia.y}px)`;
        });
    }

    divInvisible.addEventListener('click', () => {
        document.querySelectorAll('.panelDesplegable').forEach(panel => {
            panel.classList.remove('mostrar');
        });
        divInvisible.classList.remove('mostrar');
    });

    return actualizarMarcadorPosicion;
}

//----------- Carrusel ------------
export function iniciarCarrusel() {
    document.querySelectorAll('.carrusel').forEach(carrusel => {
        const imagenes = carrusel.querySelector('.carrusel-imagenes');
        const imagen = carrusel.querySelectorAll('.carrusel-imagen');
        const siguiente = carrusel.querySelector('.carrusel-bot-sig');
        const anterior = carrusel.querySelector('.carrusel-bot-ant');
        let indice = 0;


        function mostrarImagen(indice) {
            const width = imagen[0].clientWidth;
            imagenes.style.transform = `translateX(${-indice * width}px)`;
        }

        function mostrarSiguienteImagen() {
            indice = (indice + 1) % imagen.length;
            mostrarImagen(indice);
        }

        let cambioAutomatico = setInterval(mostrarSiguienteImagen, 5000);

        function resetTiempo() {
            clearInterval(cambioAutomatico);
            cambioAutomatico = setInterval(mostrarSiguienteImagen, 5000);
        }

        siguiente.addEventListener('click', () => {
            mostrarSiguienteImagen();
            resetTiempo();
        });

        anterior.addEventListener('click', () => {
            indice = (indice - 1 + imagen.length) % imagen.length;
            mostrarImagen(indice);
            resetTiempo();
        });
    });
}

//----------- Stepper ------------
export function stepper() {
    let actualStep = 1;

    //Funciones    
    function pasoSiguiente() {
        const actualElement = document.querySelector(`.step[data-step="${actualStep}"]`);
        const siguienteElement = document.querySelector(`.step[data-step="${actualStep + 1}"]`);

        if (siguienteElement) {
            actualElement.classList.remove('activo');
            siguienteElement.classList.add('activo');
            actualStep++;
        }
    }

    //------------------------------------------------------------------
    function terminarPaso() {
        const overlay = document.getElementById('stepperFondo-overlay');
        const stepper = document.getElementById('stepper-overlay');

        overlay.classList.add('hidden');
        overlay.classList.remove('visible');
        stepper.classList.remove('visible');

        setTimeout(() => {
            overlay.style.display = 'none';
        }, 500);

        //document.getElementById('stepper-overlay').style.display = 'none';   
    }

    //------------------------------------------------------------------
    function mostrarStepper(step = 1) {
        const overlay = document.getElementById('stepperFondo-overlay');
        const stepper = document.getElementById('stepper-overlay');

        overlay.style.display = 'flex';
        overlay.classList.remove('hidden');
        overlay.classList.add('visible');
        stepper.classList.add('visible');

        //document.getElementById('stepper-overlay').style.display = 'flex';
        document.querySelectorAll('.step').forEach(step => step.classList.remove('activo'));
        document.querySelector(`.step[data-step="${step}"]`).classList.add('activo');
        actualStep = step;
    }

    //------------------------------------------------------------------
    document.querySelectorAll('.siguiente-step').forEach(boton => {
        boton.addEventListener('click', pasoSiguiente);
    });

    document.querySelectorAll('.cierreStepper').forEach(boton => {
        boton.addEventListener('click', terminarPaso);
    });

    document.querySelector('.final-step').addEventListener('click', terminarPaso);
    document.querySelector('#mostrarStepper').addEventListener('click', (e) => {
        e.preventDefault();
        mostrarStepper(2);
    });
    //document.querySelector('.step[data-step="1"]').classList.add('activo');

    window.addEventListener('load', () => {
        mostrarStepper();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    stepper();
});