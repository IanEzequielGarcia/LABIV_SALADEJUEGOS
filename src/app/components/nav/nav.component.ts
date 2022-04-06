import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication-service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
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