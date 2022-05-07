import { Component,OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { LoginPage } from '../login/login.page';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { getDatabase, ref, set } from "firebase/database";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['../login/login.page.scss','../login/login.page.extended.scss']
})
export class RegistroComponent implements OnInit {
  db = getDatabase();
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
      Swal.fire('Registrado Correctamente');
      var login = new LoginPage(this.authService,this.router);
      login.usuario=this.usuario;
      login.logIn();
      this.logger();
    }).catch((error) => {
      Swal.fire(error.message);
      return null;
    });
  }
  async logInGoogle() {
    this.authService.logInGoogle()
    .then((res) => {
      Swal.fire('Logueado Correctamente');
    }).catch((error) => {
      Swal.fire(error.message);
      return null;
    });
  }
 async logger()
 {
  let dateTime = new Date();
  let fecha = `${dateTime.getDate()+'/'+dateTime.getMonth()+'/'+dateTime.getFullYear()}`;
  console.log(`${this.usuario.email}, ${fecha} `)
  set(ref(this.db, 'users/' + fecha), {
    email: this.usuario.email,
    date: fecha,
  });
 }
}
