import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
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
    path: '',
    pathMatch:'full',
    component:HomeComponent
  },
  {
    path: 'juegos',
    children: [
      { path: 'ahorcado', component:AhorcadoComponent},
      { path: 'preguntados', component:PreguntadosComponent},
      { path: 'mayoromenor', component:MayorMenorComponent},
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
