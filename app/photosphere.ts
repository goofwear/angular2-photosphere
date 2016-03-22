import {Component, Input, Inject, ElementRef, OnInit} from 'angular2/core';
import {Photosphere} from './classes';

@Component({
    selector: 'photosphere',
    template: `<div id="{{ id }}"></div>`
})
export class PhotosphereCanvas {

  @Input() data: Photosphere.Attributes;

  id: string;

  fullscreen: boolean;

  toggleFullscreen: () => void;

  ElementRef: ElementRef;

  ngOnInit() {
    let vm = this;
    let params = new Photosphere.Params(vm.data.width, vm.data.height, vm.data.speed, vm.data.resolution, vm.data.controls);
    let rotateSpeed = -0.5 * params.speed;
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    let webglEl = vm.ElementRef.nativeElement;

    let scene: THREE.Scene = new THREE.Scene();

    let camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, params.width / params.height, 1, 1000);
    camera.position.x = 0.1;
    camera.fov = 1.0;

    let renderer: THREE.Renderer = Detector.webgl ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
    renderer.setSize(params.width, params.height);

    let geometry = new THREE.SphereGeometry(100, params.resolution, params.resolution);
    THREE.ImageUtils.crossOrigin = 'use-credential';

    let loader = new THREE.TextureLoader();

    let mesh: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
        map: loader.load(vm.data.src)
    });

    let sphere: THREE.Mesh = new THREE.Mesh(geometry, mesh);
    sphere.scale.x = -1;
    scene.add(sphere);

    let controls = new THREE.OrbitControls(camera, webglEl);

    if(params.controls === Photosphere.Control.wheel || params.controls === Photosphere.Control.none) {
        controls.enabled = false;
    }

    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = rotateSpeed;

    webglEl.appendChild(renderer.domElement);

    render();

    /** Render the scene */
    function render() {
        if(vm.fullscreen) {
            updateSize();
        }
        controls.update();
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    /** Update the camera when changing width and height */
    function updateCamera(w, h) {
        camera.aspect = w / h;
        camera.fov = Math.max(40, Math.min(100, camera.fov));
        camera.updateProjectionMatrix();
    }

    /** Resize camera when the size of the screen is changing */
    function updateSize() {
        if (windowWidth !== window.innerWidth || windowHeight !== window.innerHeight) {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
                updateCamera(windowWidth, windowHeight);
        renderer.setSize(windowWidth, windowHeight);
      }
    }

    /** Function to toggle fullscreen mode */
    vm.toggleFullscreen = function() {
        // Change the size
        if(vm.fullscreen) {
            updateCamera(params.width, params.height);
            renderer.setSize(params.width, params.height);
            webglEl[0].style.position = '';

            // enable scrollbars
            document.documentElement.style.overflow = 'auto';  // firefox, chrome
            //document.body.scroll = 'yes'; // ie only

        } else {
            updateCamera(params.width, params.height);
            renderer.setSize(windowWidth, windowHeight - 28);
            webglEl[0].style.position = 'absolute';
            webglEl[0].style.left = '0px';
            webglEl[0].style.top = '0px';

            // Go to top
            window.scrollTo(0,0);

            // disable scrollbars
            document.documentElement.style.overflow = 'hidden';  // firefox, chrome
            //document.body.scroll = 'no'; // ie only
        }

        vm.fullscreen = vm.fullscreen ? false : true;
    };

    /** Function to listen mousewheel */
    function onMouseWheel(event) {
        event.preventDefault();
        if(event.wheelDeltaY) { // WebKit
            camera.fov -= event.wheelDeltaY * 0.05;
        } else if(event.wheelDelta) { // Opera / IE9
            camera.fov -= event.wheelDelta * 0.05;
        } else if(event.detail) { // Firefox
            camera.fov += event.detail * 1.0;
        }
        camera.fov = Math.max(40, Math.min(100, camera.fov));
        camera.updateProjectionMatrix();
    }

    if(params.controls === Photosphere.Control.all || params.controls === Photosphere.Control.wheel) {
        webglEl.addEventListener('mousewheel', onMouseWheel);
        webglEl.addEventListener('DOMMouseScroll', onMouseWheel);
    }

  }

  constructor(@Inject(ElementRef) elementRef: ElementRef) {
    let vm = this;
    vm.ElementRef = elementRef;
    vm.id = "photosphere-" + Math.round(10000 * Math.random());
  }
}
