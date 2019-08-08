import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { AuthService } from '../service/auth.service';
import { CookieService } from 'ngx-cookie-service';

declare var $ : any;
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  // data = [];
  product_payload : any = {
    identity: "",
    name: "",
    unit_price: "",
    currency: "",
    quantity: "",
  }
  port = location.port;
  result : any ={
    message: "AAAAAAA"
  }
  constructor(
    private cookieService: CookieService,
    private dataService: DataService,
    private authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
  }


  addProduct() {
    let accessToken = localStorage.getItem('accessToken');
    console.log(`[accessToken] : ${accessToken}`);
    console.log(`[addProduct] : ${JSON.stringify(this.product_payload) }`);


    this.dataService.addProduct(this.product_payload, accessToken).subscribe((response) => {
      console.log(response);
      // this.mapField(response.body);
      // this._router.navigateByUrl("/dashboard");
      $('#resultModal').modal('show')
    },
      error => {
        this.result.message = "[Error] :" +  JSON.stringify(error)
        console.log(this.result.message);

        if (error.status == 401) {
          console.log(`status code : ${error.status}`);
          // let refreshToken = localStorage.getItem('refreshToken');
          let refreshToken = this.cookieService.get('refreshToken');
          this.authService.refreshToken(refreshToken).subscribe(
            response => {
              console.log(response);
              let accessToken = response.body.accessToken;
              let refreshToken = response.body.refreshToken;
              localStorage.setItem('accessToken', accessToken);
              localStorage.setItem('refreshToken', refreshToken);
              this.cookieService.set('accessToken', accessToken);
              this.cookieService.set('refreshToken', refreshToken);
              this.addProduct();
            }
          );
        }

        // $('#resultModal').modal('show')
      })
  }
}
