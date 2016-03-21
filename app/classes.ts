export module Photosphere {

  /**
   * The common attributes of a photosphere. All numeric attributes are string, because
   * they are coming directly from the html call of the directive
  */
  export interface Attributes {
    /** The source file */
    src?: string;
    /** Height of the photosphere */
    height?: number;
    /** Width of the photosphere */
    width?: number;
    /** Rotation speed */
    speed?: number;
    /** Resolution of the sphere */
    resolution?: number;
    /** Controls allowed */
    controls?: Control;
  }

  /** Type for allowed controls */
  export enum Control {all, wheel, pointer, none}

  /**
    Photosphere parameters : width, height, speed, resolution
  */
  export class Params {
    static DEFAULT_WIDTH: number = 640;
    static DEFAULT_HEIGHT: number = 480;
    static DEFAULT_SPEED: number = 0;
    static MIN_SPEED: number = 0;
    static MAX_SPEED: number = 20;
    static DEFAULT_RESOLUTION: number = 30;
    static MAX_RESOLUTION: number = 80;
    static MIN_RESOLUTION: number = 10;
    static DEFAULT_CONTROLS: Control = Control.all;
    /** Width of the canvas */
    width: number;
    /** Height of the canvas */
    height: number;
    /** Rotation speed of the view */
    speed: number;
    /** Number of meridians on the 3d sphere. The more, the cleaner, the less the faster */
    resolution: number;
    /** Available controls on the sphere */
    controls: Control;
    constructor(width?: number, height?: number, speed?: number, resolution?: number, controls?: Control) {
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
    setWidth(width: number) {
      var vm = this;
      if(typeof width !== "undefined" && !isNaN(width)) {
        vm.width = width;
      } else {
        vm.width = Params.DEFAULT_WIDTH;
      }
    }
    /**
      Set the height of the canvas
    */
    setHeight(height: number) {
      var vm = this;
      if(typeof height !== "undefined" && !isNaN(height)) {
        vm.height = height;
      } else {
        vm.height = Params.DEFAULT_HEIGHT;
      }
    }
    /**
      Set the rotation speed of the canvas
    */
    setSpeed(speed: number) {
      var vm = this;
      if(typeof speed !== "undefined" && !isNaN(speed)) {
        vm.speed = Math.min(Math.max(speed, Params.MIN_SPEED), Params.MAX_SPEED);
      } else {
        vm.speed = Params.DEFAULT_SPEED;
      }
    }
    /**
      Set the rotation speed of the canvas
    */
    setResolution(resolution: number) {
      var vm = this;
      if(typeof resolution !== "undefined" && !isNaN(resolution)) {
        vm.resolution = Math.min(Math.max(resolution, Params.MIN_RESOLUTION), Params.MAX_RESOLUTION);
      } else {
        vm.resolution = Params.DEFAULT_RESOLUTION;
      }
    }
    /**
      Set the controls of the canvas
    */
    setControls(controls: Control) {
      var vm = this;
      if(typeof controls !== "undefined") {
        vm.controls = controls;
      } else {
        vm.controls = Params.DEFAULT_CONTROLS;
      }
    }
  }

}
