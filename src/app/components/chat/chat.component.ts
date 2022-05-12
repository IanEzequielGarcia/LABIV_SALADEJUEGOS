import { Component, OnInit } from '@angular/core';
import { fromCollectionRef } from '@angular/fire/compat/firestore';
import { timeout } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
interface msg{
    emisor:string,
    nombre:string,
    texto:string,
    fecha:string,
    hora:string}
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  mostrarChat = false;
  msg:any={
    emisor:"",
      nombre:"",
      texto:"",
      fecha:"",
      hora:""
  }
  usuario:any;
  mensaje:string="";
  mensajeLista:msg[]=[];
  /*mensajeList:any=[
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
  ];*/
  constructor(private authS:AuthService) { }

  ngOnInit(): void {
    this.authS.isLoggedIn().subscribe(usuario=>{
      this.usuario=usuario;
    });
    this.CargarMensajes();
  }
  async CargarMensajes()
  {
    (await this.authS.getMensajes()).forEach((msg)=>{
      if(this.mensajeLista.indexOf(<msg>msg['datos']) == -1)
      {
        this.mensajeLista.push(<msg>msg['datos']);
      }
    });
    this.mensajeLista.sort((a, b) => Number.parseInt(a.fecha) - Number.parseInt(b.fecha));
  }
  MensajeEnviado()
  {
    if(this.mensaje.length>0)
    {
      let dateTime = new Date();
      console.log("bbbbbb "+this.usuario.uid);
      console.log("c "+this.usuario.email);

      let nuevoMensaje={
        emisor:this.usuario.uid,
        nombre:this.usuario.email,
        texto:this.mensaje,
        fecha:`${dateTime.getTime()}`,
        hora:`${dateTime.getHours()}:${dateTime.getMinutes()}`,
      };
      if(this.usuario.displayName!=null)
      {
        nuevoMensaje={
          emisor:this.usuario.uid,
          nombre:this.usuario.displayName,
          texto:this.mensaje,
          fecha:`${dateTime.getTime()}`,
          hora:`${dateTime.getHours()}:${dateTime.getMinutes()}`,
        };
      }
      console.log(nuevoMensaje);
      this.authS.NuevoMensaje(nuevoMensaje);
      //this.mensajeList.push(nuevoMensaje);
      setTimeout(() => {
        this.mensajeLista=[];
        this.CargarMensajes();
      }, 10);
      this.mensaje="";
      setTimeout(()=>{
        this.ScrollAUltimoMensajeByClassname();
      },10);
    }
  }
  ScrollAUltimoMensajeByClassname()
  {
    let listaMensajes=document.getElementsByClassName('msj') as HTMLCollectionOf<Element>;
    let ultimo:any=listaMensajes[listaMensajes.length-1];
    let maxPos=ultimo.offsetTop;
    //@ts-ignore
    document.getElementById('contenedorChat').scrollTop=maxPos;
  }
}
