import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication-service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthenticationService,) { }

  ngOnInit(): void {
  }
  async estaLogeado()
  {
    return this.authService.isLoggedIn;
  }
}
