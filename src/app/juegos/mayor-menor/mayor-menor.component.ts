import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.scss']
})
export class MayorMenorComponent implements OnInit {
  ingresado:number=-1;
  
  nRandom = Math.random()*(100 + 1);
  constructor() { }
  mayorOMenor(){
    if(this.ingresado>this.nRandom)
    {
      (<HTMLInputElement>document.getElementById("resultado")).value = "Te pasaste";
    }else if(this.ingresado<this.nRandom)
    {
      (<HTMLInputElement>document.getElementById("resultado")).value = "Te quedaste corto";
      
    }else{
      (<HTMLInputElement>document.getElementById("resultado")).value = "Felicidades!!";
    }
  }
  ngOnInit(): void {
  }

}
