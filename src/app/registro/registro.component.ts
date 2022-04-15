import { Component,OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { LoginPage } from '../login/login.page';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  usuario={
    email:'',
    password:''
  }
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
  }
  async registro()
  {
    const{email,password} =this.usuario;
    this.authService.RegisterUser(email,password)
    .then((res) => {
      window.alert('Registrado Correctamente');
      var login = new LoginPage(this.authService,this.router);
      login.usuario=this.usuario;
      login.logIn();
    }).catch((error) => {
      Swal.fire(error.message);
      return null;
    });
  }
  async logInGoogle() {
    this.authService.logInGoogle()
    .then((res) => {
      window.alert('Logueado Correctamente');
    }).catch((error) => {
      Swal.fire(error.message);
      return null;
    });
  }
}
