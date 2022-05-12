import { Component, OnInit } from '@angular/core';
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
  constructor() {
    this.reset();
    this.board= new Board(20,50);
  }

  checkCell(cell: Cell) {
    const result = this.board.checkCell(cell);
    if (result === 'gameover') {
      alert('Perdiste');
    } else if (result === 'win') {
      alert('Ganaste!!!');
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
}
