import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
interface msg{
  fecha:string,
  uid:string
  puntos:number}

@Component({
  selector: 'app-listado-puntajes',
  templateUrl: './listado-puntajes.component.html',
  styleUrls: ['./listado-puntajes.component.scss']
})
export class ListadoPuntajesComponent implements OnInit {
  puntajeLista:any[]=[];
  constructor(public authS:AuthService) {
    this.TrerRespuestas();
   }
  ngOnInit(): void {
  }
  async TrerRespuestas(){
    
    (await this.authS.getPuntajes()).forEach((msg)=>{
      console.log(msg);
      if(this.puntajeLista.indexOf(<msg>msg['puntaje']) == -1)
      {
        this.puntajeLista.push(<msg>msg['puntaje']);
      }
    });
    this.puntajeLista.sort((a, b) => Number.parseInt(a.fecha) - Number.parseInt(b.fecha));
  }
  
}
