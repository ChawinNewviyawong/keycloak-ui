import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { from } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ProfileService } from './service/profile.service';
import { AuthService } from './service/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    EditComponent,
    AddComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AuthService, ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
