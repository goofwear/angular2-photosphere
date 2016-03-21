import {Component, Input} from 'angular2/core';
import {Photosphere} from './classes';

@Component({
    selector: 'photosphere',
    template: `<h1>Angular2 Photosphere</h1>
      <div id="{{ id }}"></div>
    `
})
export class PhotosphereCanvas {

  @Input() data: Photosphere.Attributes;

  id: string;

  ngOnInit() {

    console.log(this.data);
  }

  constructor() {
    let vm = this;
    vm.id = "photosphere-" + Math.round(10000 * Math.random());
    let params = new Photosphere.Params(vm.data.width, vm.data.height, vm.data.speed, vm.data.resolution, vm.data.controls);
    let rotateSpeed = -0.5 * params.speed;
  }
}
