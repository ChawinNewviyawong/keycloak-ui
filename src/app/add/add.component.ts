import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { AuthService } from '../service/auth.service';
import { CookieService } from 'ngx-cookie-service';


// import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
// import { ModalAlert, ModalAlertData } from '../util/modal/modal-alert.component';
// import { Overlay, overlayConfigFactory } from 'angular2-modal';

declare var $: any;
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  // data = [];
  // public progressDialog;

  product_payload: any = {
    identity: "",
    name: "",
    unit_price: "",
    currency: "",
    quantity: "",
  }
  port = location.port;
  result: any = {
    message: ""
  }
  constructor(
    private cookieService: CookieService,
    private dataService: DataService,
    private authService: AuthService,
    private _router: Router,
  ) { }

  ngOnInit() {
  }


  addProduct() {
    let accessToken = localStorage.getItem('accessToken');
    console.log(`[accessToken] : ${accessToken}`);
    console.log(`[addProduct] : ${JSON.stringify(this.product_payload)}`);

    this.product_payload.identity = (this.product_payload.identity.trim()).toLowerCase()
    this.product_payload.name = (this.product_payload.name.trim()).toLowerCase()
    this.product_payload.currency =  (this.product_payload.currency.trim()).toLowerCase()

    this.dataService.addProduct(this.product_payload, accessToken).subscribe((response) => {
      console.log(response);
      // this.progressDialog.close();

      // let message = "OK"
      // let header = "ABCD"
      // this.modal.open(ModalAlert, overlayConfigFactory({ header, message }, BSModalContext));
      // this.mapField(response.body);
      // $('#resultModal').modal('show')
      document.getElementById("error").style.display = "none";

      this._router.navigateByUrl("/dashboard");
    },
      error => {
        this.result.message = "[Error] :" + JSON.stringify(error)
        console.log(this.result.message);

        // let message = "OK"
        // let header = "ABCD"
        // this.modal.open(ModalAlert, overlayConfigFactory({ header, message }, BSModalContext));

        if (error.status == 401) {
          console.log(`status code : ${error.status}`);
          // let refreshToken = localStorage.getItem('refreshToken');
          let refreshToken = this.cookieService.get('refreshToken');
          console.log(`refreshToken : ${refreshToken}`);

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
              document.getElementById("error").style.display = "none";

            }
          );
        }else{

          // let message = this.result.message;
          (<HTMLInputElement>document.getElementById('status')).value = this.result.message;
          console.log('Error:' + this.result.message);
          document.getElementById("error").style.display = "block";

        }

        
    

        // $('#resultModal').modal('show')
      })
  }
}
