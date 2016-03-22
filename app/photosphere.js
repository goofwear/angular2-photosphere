System.register(['angular2/core', './classes'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, classes_1;
    var PhotosphereCanvas;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (classes_1_1) {
                classes_1 = classes_1_1;
            }],
        execute: function() {
            PhotosphereCanvas = (function () {
                function PhotosphereCanvas(elementRef) {
                    var vm = this;
                    vm.ElementRef = elementRef;
                    vm.id = "photosphere-" + Math.round(10000 * Math.random());
                }
                PhotosphereCanvas.prototype.ngOnInit = function () {
                    var vm = this;
                    var params = new classes_1.Photosphere.Params(vm.data.width, vm.data.height, vm.data.speed, vm.data.resolution, vm.data.controls);
                    var rotateSpeed = -0.5 * params.speed;
                    var windowWidth = window.innerWidth;
                    var windowHeight = window.innerHeight;
                    var webglEl = vm.ElementRef.nativeElement;
                    var scene = new THREE.Scene();
                    var camera = new THREE.PerspectiveCamera(75, params.width / params.height, 1, 1000);
                    camera.position.x = 0.1;
                    camera.fov = 1.0;
                    var renderer = Detector.webgl ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
                    renderer.setSize(params.width, params.height);
                    var geometry = new THREE.SphereGeometry(100, params.resolution, params.resolution);
                    THREE.ImageUtils.crossOrigin = 'use-credential';
                    var loader = new THREE.TextureLoader();
                    var mesh = new THREE.MeshBasicMaterial({
                        map: loader.load(vm.data.src)
                    });
                    var sphere = new THREE.Mesh(geometry, mesh);
                    sphere.scale.x = -1;
                    scene.add(sphere);
                    var controls = new THREE.OrbitControls(camera, webglEl);
                    if (params.controls === classes_1.Photosphere.Control.wheel || params.controls === classes_1.Photosphere.Control.none) {
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
                        if (vm.fullscreen) {
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
                    vm.toggleFullscreen = function () {
                        // Change the size
                        if (vm.fullscreen) {
                            updateCamera(params.width, params.height);
                            renderer.setSize(params.width, params.height);
                            webglEl[0].style.position = '';
                            // enable scrollbars
                            document.documentElement.style.overflow = 'auto'; // firefox, chrome
                        }
                        else {
                            updateCamera(params.width, params.height);
                            renderer.setSize(windowWidth, windowHeight - 28);
                            webglEl[0].style.position = 'absolute';
                            webglEl[0].style.left = '0px';
                            webglEl[0].style.top = '0px';
                            // Go to top
                            window.scrollTo(0, 0);
                            // disable scrollbars
                            document.documentElement.style.overflow = 'hidden'; // firefox, chrome
                        }
                        vm.fullscreen = vm.fullscreen ? false : true;
                    };
                    /** Function to listen mousewheel */
                    function onMouseWheel(event) {
                        event.preventDefault();
                        if (event.wheelDeltaY) {
                            camera.fov -= event.wheelDeltaY * 0.05;
                        }
                        else if (event.wheelDelta) {
                            camera.fov -= event.wheelDelta * 0.05;
                        }
                        else if (event.detail) {
                            camera.fov += event.detail * 1.0;
                        }
                        camera.fov = Math.max(40, Math.min(100, camera.fov));
                        camera.updateProjectionMatrix();
                    }
                    if (params.controls === classes_1.Photosphere.Control.all || params.controls === classes_1.Photosphere.Control.wheel) {
                        webglEl.addEventListener('mousewheel', onMouseWheel);
                        webglEl.addEventListener('DOMMouseScroll', onMouseWheel);
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], PhotosphereCanvas.prototype, "data", void 0);
                PhotosphereCanvas = __decorate([
                    core_1.Component({
                        selector: 'photosphere',
                        template: "<div id=\"{{ id }}\"></div>"
                    }),
                    __param(0, core_1.Inject(core_1.ElementRef)), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], PhotosphereCanvas);
                return PhotosphereCanvas;
            }());
            exports_1("PhotosphereCanvas", PhotosphereCanvas);
        }
    }
});
//# sourceMappingURL=photosphere.js.map