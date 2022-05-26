import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { AhorcadoComponent } from './juegos/ahorcado/ahorcado.component';
import { MayorMenorComponent } from './juegos/mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './juegos/preguntados/preguntados.component';
import { LoginPageModule } from './login/login.module';
import { LoginPage } from './login/login.page';
import { RegistroComponent } from './registro/registro.component';
const routes: Routes = [
  /*{
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },*/
  {
    path: 'login',
    component:LoginPage
    //loadChildren: () => import('./juegos/ahorcado/ahorcado.component').then(m => m.AhorcadoComponent)
  },
  {
    path: 'registro',
    component:RegistroComponent
  },
  {
    path: 'quien-soy',
    component:QuienSoyComponent
  },
  {
    path: 'encuesta',
    component:EncuestaComponent
  },
  {
    path: 'juegos',
    loadChildren: () => import('./juegos/juegos.module').then(m => m.JuegosModule)
    /*children: [
      { path: 'ahorcado', component:AhorcadoComponent},
      { path: 'preguntados', component:PreguntadosComponent},
      { path: 'mayoromenor', component:MayorMenorComponent},
    ]*/
  },
  {
    path: '',
    pathMatch:'full',
    component:HomeComponent
  },
  {
    path: '**',
    component:NotFoundComponent
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
