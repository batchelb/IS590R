import { Component } from '@angular/core';
import { CoreService } from './core.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'IS590R-final';
  constructor(public coreService: CoreService){}
}
