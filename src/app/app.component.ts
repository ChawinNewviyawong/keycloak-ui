import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'keycloak-ui';
  port = location.port;

  
  constructor(
    private _router: Router
  ) { }

  logout() {
    console.log(`[logout] kill cookie token`)

  }
}
