import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
interface msg{
  apellido:string,
  nombre:string,
  edad:string,
  fecha:string,
  idEncuestado:string
  numero:number}

@Component({
  selector: 'app-encuesta-respuestas',
  templateUrl: './encuesta-respuestas.component.html',
  styleUrls: ['./encuesta-respuestas.component.scss']
})
export class EncuestaRespuestasComponent implements OnInit {

  respuestaList:any[]=[];
  constructor(public authS:AuthService) {
    this.TrerRespuestas();
   }

  ngOnInit(): void {
  }
  async TrerRespuestas(){
    
    (await this.authS.getRtasEncuentras()).forEach((msg)=>{
      console.log(msg);
      if(this.respuestaList.indexOf(<msg>msg['encuesta']) == -1)
      {
        this.respuestaList.push(<msg>msg['encuesta']);
      }
    });
    this.respuestaList.sort((a, b) => Number.parseInt(a.fecha) - Number.parseInt(b.fecha));
  }
  
}
