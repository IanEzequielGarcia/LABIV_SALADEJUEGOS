import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  estaLogueado = this.authService.isLoggedIn();
  constructor(private authService: AuthService) {}
  async logOut(){
    this.authService.SignOut();
  }
  ngOnInit(): void {
    
  }
}
