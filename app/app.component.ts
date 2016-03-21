import {Component} from 'angular2/core';
import {PhotosphereCanvas} from './photosphere';
import {Photosphere} from './classes';

@Component({
    selector: 'app',
    template: `
      <h1>My First Angular 2 App</h1>
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
      height: 800,
      width: 600
    }
  }
}
