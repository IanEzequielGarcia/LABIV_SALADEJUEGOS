import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { LoginPage } from './login.page';
import { BrowserModule } from '@angular/platform-browser';

//import { AppRoutingModule } from './login-routing.module';
//import { AppComponent } from './login.page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from '../app-routing.module';
import { NavbarComponent } from '../components/navbar/navbar.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [LoginPage,NavbarComponent]
})
export class LoginPageModule {}

