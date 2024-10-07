import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight, false );
document.body.appendChild( renderer.domElement );

export default renderer;