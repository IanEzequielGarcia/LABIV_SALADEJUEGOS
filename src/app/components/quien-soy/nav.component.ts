import { Component, OnInit } from '@angular/core';
//import { AuthenticationService } from 'src/app/shared/authentication-service';
import {AuthenticationService} from '../../shared/authentication-service';
@Component({
  selector: 'app-nav',
  templateUrl: '../nav/nav.component.html',
  styleUrls: ['../nav/nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    
  }
  async estaLogeado()
  {
    return this.authService.isLoggedIn;
  }

}
