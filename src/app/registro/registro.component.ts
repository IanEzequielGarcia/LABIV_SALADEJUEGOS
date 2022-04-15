import { Component,OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { AuthService } from '../services/auth.service';
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
    }).catch((error) => {
      window.alert(error.message);
      return null;
    });
  }
  async logInGoogle() {
    this.authService.logInGoogle()
    .then((res) => {
      window.alert('Logueado Correctamente');
    }).catch((error) => {
      window.alert(error.message);
      return null;
    });
  }
}
