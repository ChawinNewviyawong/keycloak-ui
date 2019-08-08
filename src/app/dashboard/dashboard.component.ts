import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ProfileService } from '../service/profile.service';
import { tokenName } from '@angular/compiler';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data = [];
  profile: any = {
    txid: "",
    companyName: "",
    email: "",
    username: "",
    birthDay: "",
    address: "",
    zipcode: "",
  }
  port = location.port;

  constructor(
    private cookieService: CookieService,
    private dataService: DataService,
    private profileService: ProfileService,
    private authService: AuthService,
    private _router: Router) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    let token = {
      // accessToken: localStorage.getItem('accessToken'),
      accessToken: this.cookieService.get('accessToken'),
    }
    console.log("accessToken " + localStorage.getItem('accessToken'));
    this.profileService.getProfile(token).subscribe((response) => {
      console.log(response);
      this.profile = response.body;
      for (let data of response.body) {
        this.profile.username = data.username;
        this.profile.txid = data.txid;
        this.profile.companyName = data.companyName;
        this.profile.email = data.email;
        this.profile.birthDay = data.birthDay;
        this.profile.address = data.address;
        this.profile.zipcode = data.zipcode;
      }
      this.getDataList();

    }, error => {
      console.log(error);
      if (error.error.code == 401) {
        console.log(error.error.code);
        // let refreshToken = localStorage.getItem('refreshToken');
        let refreshToken = this.cookieService.get('refreshToken');
        this.authService.refreshToken(refreshToken).subscribe(
          response => {
            console.log(response);
            let accessToken = response.body.accessToken;
            let refreshToken = response.body.refreshToken;
            localStorage.setItem('accessToken', accessToken);
            this.cookieService.set('accessToken', accessToken);
            // this.cookieService.set('refreshToken', refreshToken);
            this.getProfile();
          }
        );
      }
    });
  }

  getDataList() {
    let accessToken = this.cookieService.get('accessToken');
    this.dataService.getDataList(accessToken).subscribe((response) => {
      console.log(response);
      this.mapField(response.body);
    },
      error => {
        console.log("Error Message:" + error);
      })
  }

  edit(item) {
    console.log(item);
    localStorage.setItem('product', JSON.stringify(item));
    this._router.navigateByUrl("/edit");
  }

  mapField(body) {
    this.data = [];

    interface Type {
      [key: string]: any
    }

    for (let data of body) {
      let item: Type = {};
      item.identity = data.identity;
      item.name = data.name;
      item.unit_price = data.unit_price;
      item.currency = data.currency;
      item.quantity = data.quantity;
      this.data.push(item);
    }
  }

}
