import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'keycloak-ui';
  port = location.port;
  
  constructor(
    private cookieService: CookieService,
    private _router: Router
  ) { }

  accessToken;

  ngOnInit() {
    this.accessToken = this.cookieService.get('accessToken');
    this.prepareUserData();
    this._router.events
        .subscribe((event) => {
          this.prepareUserData();
        });
  }

  prepareUserData() {
    this.accessToken = this.cookieService.get('accessToken');
  }


  logout() {
    console.log(`[logout] kill cookie token`)
    this.cookieService.deleteAll();
    this._router.navigateByUrl('/login');
  }
}
