import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { LoginPageModule } from './login/login.module';
import { LoginPage } from './login/login.page';
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
    path: 'quien-soy',
    component:QuienSoyComponent
  },
  {
    path: '',
    pathMatch:'full',
    component:HomeComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
