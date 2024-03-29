import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../service/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  password='';
  confirmpassword=''
  error=''
  public loading = false;

  constructor(
    private profileService: ProfileService,
    private _router: Router) { }

  ngOnInit() {
  }

  changePassword() {

    if (this.password === this.confirmpassword) {
      this.loading = true;

      let body = {
        newPassword: this.password,
      }
      this.profileService.changePassword(body).subscribe(
        response => {
          if (response.status == 201) {
            this._router.navigateByUrl('/dashboard');
          }
          else {
            this.error = response.statusText;
          }
          this.loading = false;

        }
      )
    }
    else {
      this.error = 'Passwords do not match';
    }
  }

}
