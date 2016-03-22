System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Photosphere;
    return {
        setters:[],
        execute: function() {
            (function (Photosphere) {
                /** Type for allowed controls */
                (function (Control) {
                    Control[Control["all"] = 0] = "all";
                    Control[Control["wheel"] = 1] = "wheel";
                    Control[Control["pointer"] = 2] = "pointer";
                    Control[Control["none"] = 3] = "none";
                })(Photosphere.Control || (Photosphere.Control = {}));
                var Control = Photosphere.Control;
                /**
                  Photosphere parameters : width, height, speed, resolution
                */
                var Params = (function () {
                    function Params(width, height, speed, resolution, controls) {
                        var vm = this;
                        vm.setWidth(width);
                        vm.setHeight(height);
                        vm.setSpeed(speed);
                        vm.setResolution(resolution);
                        vm.setControls(controls);
                    }
                    /**
                      Set the width of the canvas
                    */
                    Params.prototype.setWidth = function (width) {
                        var vm = this;
                        if (typeof width !== "undefined" && !isNaN(width)) {
                            vm.width = width;
                        }
                        else {
                            vm.width = Params.DEFAULT_WIDTH;
                        }
                    };
                    /**
                      Set the height of the canvas
                    */
                    Params.prototype.setHeight = function (height) {
                        var vm = this;
                        if (typeof height !== "undefined" && !isNaN(height)) {
                            vm.height = height;
                        }
                        else {
                            vm.height = Params.DEFAULT_HEIGHT;
                        }
                    };
                    /**
                      Set the rotation speed of the canvas
                    */
                    Params.prototype.setSpeed = function (speed) {
                        var vm = this;
                        if (typeof speed !== "undefined" && !isNaN(speed)) {
                            vm.speed = Math.min(Math.max(speed, Params.MIN_SPEED), Params.MAX_SPEED);
                        }
                        else {
                            vm.speed = Params.DEFAULT_SPEED;
                        }
                    };
                    /**
                      Set the rotation speed of the canvas
                    */
                    Params.prototype.setResolution = function (resolution) {
                        var vm = this;
                        if (typeof resolution !== "undefined" && !isNaN(resolution)) {
                            vm.resolution = Math.min(Math.max(resolution, Params.MIN_RESOLUTION), Params.MAX_RESOLUTION);
                        }
                        else {
                            vm.resolution = Params.DEFAULT_RESOLUTION;
                        }
                    };
                    /**
                      Set the controls of the canvas
                    */
                    Params.prototype.setControls = function (controls) {
                        var vm = this;
                        if (typeof controls !== "undefined") {
                            vm.controls = controls;
                        }
                        else {
                            vm.controls = Params.DEFAULT_CONTROLS;
                        }
                    };
                    Params.DEFAULT_WIDTH = 640;
                    Params.DEFAULT_HEIGHT = 480;
                    Params.DEFAULT_SPEED = 0;
                    Params.MIN_SPEED = 0;
                    Params.MAX_SPEED = 20;
                    Params.DEFAULT_RESOLUTION = 30;
                    Params.MAX_RESOLUTION = 80;
                    Params.MIN_RESOLUTION = 10;
                    Params.DEFAULT_CONTROLS = Control.all;
                    return Params;
                }());
                Photosphere.Params = Params;
            })(Photosphere = Photosphere || (Photosphere = {}));
            exports_1("Photosphere", Photosphere);
        }
    }
});
//# sourceMappingURL=classes.js.map