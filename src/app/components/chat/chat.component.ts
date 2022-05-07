import { Component, OnInit } from '@angular/core';
import { timeout } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  mostrarChat = false;
  usuario:any;
  mensaje:string="";
  mensajeList:any=[
    {
      emisor:"NTHkbRuDTtQ6XC6yhmMSpQgNM0U2",
      nombre:"",
      texto:"Hola",
      fecha:"4/5/2022",
      hora:"21:21",
    },    {
      emisor:"id",
      nombre:"",
      texto:"Chau",
      fecha:"4/5/2022",
      hora:"21:22"
    },
    {
      emisor:"NTHkbRuDTtQ6XC6yhmMSpQgNM0U2",
      nombre:"",
      texto:"Hola de nuevo",
      fecha:"4/5/2022",
      hora:"21:23"
    },
    {
      emisor:"id",
      nombre:"",
      texto:"Chau de nuevo",
      fecha:"4/5/2022",
      hora:"21:24"
    },
  ];
  constructor(private authS:AuthService) { }

  ngOnInit(): void {
    this.authS.isLoggedIn().subscribe(usuario=>{
      this.usuario=usuario;
    });
  }
  MensajeEnviado()
  {
    console.log(this.mensaje);
    console.log(this.usuario);
    let dateTime = new Date();
    let nuevoMensaje={
      emisor:this.usuario.uid,
      nombre:this.usuario.email,
      texto:this.mensaje,
      fecha:`${dateTime.getDay()}/${dateTime.getMonth()}/${dateTime.getFullYear()}`,
      hora:`${dateTime.getHours()}:${dateTime.getMinutes()}`,
    };
    if(this.usuario.displayName!=null)
      {
        nuevoMensaje={
          emisor:this.usuario.uid,
          nombre:this.usuario.displayName,
          texto:this.mensaje,
          fecha:`${dateTime.getDay()}/${dateTime.getMonth()}/${dateTime.getFullYear()}`,
          hora:`${dateTime.getHours()}:${dateTime.getMinutes()}`,
        };
      }
    console.log(nuevoMensaje);
    this.mensajeList.push(nuevoMensaje);
    this.mensaje="";
    setTimeout(()=>{
      this.ScrollAUltimoMensajeByClassname();
    },10);
  }
  ScrollAUltimoMensajeByClassname()
  {
    let listaMensajes=document.getElementsByClassName('msj');
    let ultimo:any=listaMensajes[listaMensajes.length-1];
    let maxPos=ultimo.offsetTop;
    //@ts-ignore
    document.getElementById('contenedorChat').scrollTop=maxPos;
  }
}
