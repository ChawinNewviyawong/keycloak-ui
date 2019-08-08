import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = {
    username: "",
    password: ""
  }

  constructor(
    private authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  requestToken() {
    this.authService.requestToken(this.user).subscribe(response => {
      console.log(response);
      let accessToken = response.body.accessToken;
      let refreshToken = response.body.refreshToken;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      console.log('accessToken: ' + localStorage.getItem('accessToken'));
      console.log('refreshToken: ' + localStorage.getItem('refreshToken'));
      this._router.navigateByUrl("/dashboard");
    });
  }

  register() {
    this._router.navigateByUrl("/register");
  }

}
