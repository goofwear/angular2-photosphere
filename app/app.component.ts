import {Component} from 'angular2/core';
import {PhotosphereCanvas} from './photosphere';
import {Photosphere} from './classes';

@Component({
    selector: 'app',
    template: `
      <h1>Angular2 Photosphere</h1>
      <photosphere [data]="data"></photosphere>
    `,
    directives: [PhotosphereCanvas]
})
export class AppComponent {
  data: Photosphere.Attributes;
  constructor() {
    let vm = this;
    vm.data = {
      src: "app/photosphere.jpg",
      height: 600,
      width: 800,
      speed: 2
    }
  }
}
