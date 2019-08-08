import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../service/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  profile: any = {
    name: "",
    companyName: "",
    txid: "",
    email: "",
    username: "",
    password: "",
    birthDay: "",
    address: "",
    zipcode: "",
  }

  constructor(private profileService: ProfileService,
    private _router: Router) { }

  ngOnInit() {
  }

  register() {
    console.log(`[register] : ${JSON.stringify(this.profile) }`);

    this.profileService.register(this.profile)
      .subscribe((response) => {
        // if (response.status == 200) {
          console.log(`[result] : ${JSON.stringify(response.body) }`);
          // this._router.navigateByUrl("/dashboard");
        // }
        // else {
        //   console.log("Error Message:" + response.statusText);
        // }
      }, error => {
        console.log("Error Message:" + error);
      });
  }

}
