import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Board } from './board';
import { Cell } from './cell';

@Component({
  selector: 'app-juego-propio',
  templateUrl: './juego-propio.component.html',
  styleUrls: ['./juego-propio.component.scss']
})
export class JuegoPropioComponent implements OnInit {

  ngOnInit(): void {
  }
  title = 'Buscaminas';
  board: Board;
  constructor(private authS:AuthService) {
    this.reset();
    this.board= new Board(20,50);
  }

  checkCell(cell: Cell) {
    const result = this.board.checkCell(cell);
    if (result === 'gameover') {
      this.addScore();
      Swal.fire('Perdiste',"","error");
    } else if (result === 'win') {
      this.addScore();
      Swal.fire('GANASTE!!!',"","success");
    }
  }
  flag(cell: Cell) {
    if (cell.status === 'flag') {
      cell.status = 'open';
    } else {
      cell.status = 'flag';
    }
  }

  reset() {
    this.board = new Board(20, 50);
  }
  addScore(){
    let puntaje={
      puntos:0,
      uid:"",
      fecha:""
    }
    this.authS.isLoggedIn().subscribe(usuario=>{
      puntaje.uid=usuario!.uid;
      puntaje.puntos=400-this.board.remainingCells;
      puntaje.fecha=Date.now().toString();
      console.log(puntaje);
      this.authS.agregarPuntaje(puntaje);
    })
  }
}
