import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../shared/users';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardAdminServicioGuard implements CanActivate, CanDeactivate<unknown> {
  constructor(public firebase:AuthService,public ruta:Router) {
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let retorno = true;
    console.log("guard "+this.firebase.esAdmin);
    if(this.firebase.esAdmin)
    {
      console.log("entro");
      return true;
    }else{
      console.log("no entro");
      this.ruta.navigate(['/bienvenida']);
      return false;
    }


  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
}
