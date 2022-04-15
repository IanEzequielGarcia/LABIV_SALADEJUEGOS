import { getLocaleDateTimeFormat } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario={
    email:'',
    password:''
  }
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit() {}
  logIn() {
    const{email,password} =this.usuario;
    let dateTime = new Date()
    this.authService.SignIn(email, password)
      .then((res) => {
        console.log(`${email} ${dateTime.getDate()}}`)
        this.router.navigate(['/']);
      }).catch((error) => {
        Swal.fire(error.message);
        return null;
      });
  }
  async accesoRapido()
  {
    this.usuario.email="JuanPerez@gmail.com";
    this.usuario.password="Contraseña123";
  }
  async logInGoogle() {
    this.authService.logInGoogle()
    .then((res) => {
      this.router.navigate(['/']);
    }).catch((error) => {
      Swal.fire(error.message);
      return null;
    });
  }
  
}
