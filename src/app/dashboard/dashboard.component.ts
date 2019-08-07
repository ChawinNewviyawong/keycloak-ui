import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ProfileService } from '../service/profile.service';
import { tokenName } from '@angular/compiler';

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

  constructor(
    private dataService: DataService) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    let token = {
      accessToken: localStorage.getItem('accessToken'),
    }
    this.dataService.getProfile(token).subscribe((response) => {
      console.log(response);
      this.profile = response;
      for (let data of response) {
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
      console.log("Error Message:" + error);
    });
  }

  getDataList() {
    this.dataService.getDataList().subscribe((response) => {
      this.mapField(response);
    },
    error => {
      console.log("Error Message:" + error);
    })
  }

  mapField(body) {
    this.data = [];

    interface Type {
      [key: string]: any
    }

    for (let data of body) {
      let item: Type = {};
      item.id = data.id;
      item.name = data.name;
      this.data.push(item);
    }
  }

}
