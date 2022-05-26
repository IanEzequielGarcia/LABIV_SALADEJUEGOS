import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {
  public formRepartidor: FormGroup;
  encuestado={
    idEncuestado:"",
    apellido:"0",
    nombre:"",
    edad:0,
    numero:0,
  }
  constructor(private fb:FormBuilder,private auth:AuthService) {
    this.formRepartidor = this.fb.group(
      {
      'apellido': ['',  Validators.required],
      'nombre': ['', Validators.required],
      'edad': ['',  Validators.required,Validators.min(18),Validators.max(99)],
      'numero': ['', Validators.required,Validators.maxLength(10)],
      });
  }
  ngOnInit(): void {
  }
  get numeroGet(){
    return this.formRepartidor.get('numero');
  }
  get edadGet(){
    return this.formRepartidor.get('edad');
  }
  async nuevaEncuesta(){
    this.auth.isLoggedIn().forEach(usuario=>{
      if(usuario!=null)
      {
        this.encuestado.idEncuestado = usuario.uid;
      }
      this.encuestado.apellido=this.formRepartidor.get('apellido')?.value;
      this.encuestado.nombre=this.formRepartidor.get('nombre')?.value;
      this.encuestado.edad=this.formRepartidor.get('edad')?.value;
      this.encuestado.numero=this.formRepartidor.get('numero')?.value;
      console.log(this.encuestado);
      this.auth.agregarEncuesta(this.encuestado);
    });
  }
}
