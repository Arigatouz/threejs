import * as THREE from 'three';
import './style.css';
// @ts-ignore
import {OrbitControls} from "three/addons/controls/OrbitControls"
// @ts-ignore
import gsap from 'gsap';

/*
* cursor
* */
const canvas = document.querySelector('.webGL')! as HTMLCanvasElement
const cursor = {
    x: 0,
    y: 0
}

canvas.addEventListener('mousemove', (event) => {
    cursor.x = -(event.clientX / sizes.width - 0.5);
    cursor.y = event.clientY / sizes.height - 0.5;
});


const scene = new THREE.Scene();

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: "teal", wireframe: true})
)

scene.add(cube);

const sizes: { height: number, width: number } = {
    height: window.innerHeight,
    width: window.innerWidth
}
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, aspectRatio, 1, -1, 0.1, 100);
camera.position.z = 3;
// camera.position.y = 2;
// camera.position.x = 2;
console.log('camera position length =',camera.position.length());
scene.add(camera);
// listen to resize event
window.addEventListener('resize', () => {
    // update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    // update camera
    camera.aspect = sizes.width / sizes.height;
    // you need to call updateProjectionMatrix() after changing the aspect ratio otherwise the camera will not be updated
    camera.updateProjectionMatrix();
    // update renderer
    renderer.setSize(sizes.width, sizes.height);
    // update pixel ratio for retina display and other high density displays
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
// handle fullscreen event on double click on the canvas element to make it fullscreen and exit fullscreen
// and we also handle the safari browser which uses webkit prefix
const getFullscreenElement = () => document.fullscreenElement || document.webkitFullscreenElement;

const requestFullscreen = (element: HTMLElement) => {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if ((element as any).webkitRequestFullscreen) {
        (element as any).webkitRequestFullscreen();
    }
};
const exitFullscreen = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
    }
};

window.addEventListener('dblclick', () => {
    getFullscreenElement() ? exitFullscreen() : requestFullscreen(canvas);

});
// controls
const controls = new OrbitControls(camera, canvas);
// controls.target.y = 1;
// controls.update();
// add damping to controls for smoothness animation but in order to make it work we need to update the controls in the tick function
controls.enableDamping = true;
// to disable the controls
// controls.enabled = false;

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);


const clock = new THREE.Clock();


// gsap.to(cube.position, {duration: 1, delay: 1, x: 2})
// gsap.to(cube.position, {duration: 1, delay: 2, x: 0})
const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    // cube.rotation.x = elapsedTime;
    // cube.rotation.y = elapsedTime;
    // cube.rotation.z = Math.sin(elapsedTime);
    // camera.position.x = Math.sin(elapsedTime);
    // camera.position.y = Math.cos(elapsedTime);

    // update camera to follow mouse
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    // camera.position.y = -(cursor.y * 5);
    // camera.lookAt(cube.position);
    controls.update();
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick);
}
tick();