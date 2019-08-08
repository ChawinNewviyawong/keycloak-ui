import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

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

  constructor(
    private dataService: DataService,
    private _router: Router
  ) { }

  ngOnInit() {
  }


  addProduct() {
    let accessToken = localStorage.getItem('accessToken');
    this.dataService.addProduct(this.product_payload, accessToken).subscribe((response) => {
      console.log(response);
      // this.mapField(response.body);
      // this._router.navigateByUrl("/dashboard");
      $('#resultModal').modal('show')
    },
      error => {
        console.log("Error Message:" + error);
      })
  }
}
