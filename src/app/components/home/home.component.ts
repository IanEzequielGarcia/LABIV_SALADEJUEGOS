import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  estaLogueado = this.authService.isLoggedIn();
  constructor(private authService: AuthService) {}
  async logOut(){
    this.authService.SignOut();
  }
  ngOnInit(): void {
  }

}
