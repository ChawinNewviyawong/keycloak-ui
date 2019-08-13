import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { DataService } from '../service/data.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  product_payload: any = {
    identity: "",
    name: "",
    unit_price: "",
    currency: "",
    quantity: "",
  }

  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private dataService: DataService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.product_payload = JSON.parse(localStorage.getItem('product'));
    console.log(this.product_payload)
  }

  save(){
        this.loading = true;

    this.product_payload.identity = (this.product_payload.identity.trim()).toLowerCase()
    this.product_payload.name = (this.product_payload.name.trim()).toLowerCase()
    this.product_payload.currency =  (this.product_payload.currency.trim()).toLowerCase()

    this.dataService.updateProduct(this.product_payload).subscribe(
      response => {
        console.log(response)
            this.loading = false;

        this._router.navigateByUrl('/dashboard');
      }, error => {
        console.log(error);
        if (error.status == 401) {
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
              this.save();
              this.loading = false;
            }
          );
        }
      });
  }

}
