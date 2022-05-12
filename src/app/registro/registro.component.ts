import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPage } from '../login/login.page';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

import { getFirestore } from "firebase/firestore";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['../login/login.page.scss','../login/login.page.extended.scss']
})
export class RegistroComponent implements OnInit {
  registroForm = new FormGroup({
    emailForm : new FormControl('',[Validators.required,Validators.minLength(4),Validators.email]),
    passwordForm : new FormControl('',[Validators.required,Validators.minLength(4)]),
  });
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
  get emailGet(){
    return this.registroForm.get('emailForm');
  }
  get passwordGet(){
    return this.registroForm.get('passwordForm');
  }
  async registro()
  {
    const{email,password} =this.usuario;
    this.authService.RegisterUser(email,password)
    .then((res) => {
      Swal.fire('Registrado Correctamente');
      var login = new LoginPage(this.authService,this.router);
      login.usuario=this.usuario;
      
      let usuario = getFirestore()

      login.logIn();
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
}
