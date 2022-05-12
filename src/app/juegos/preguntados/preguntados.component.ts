import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

export interface Ipais{
  nombre:string;
  bandera:string;
  //poblacion:string;
}
@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss']
})

export class PreguntadosComponent implements OnInit {
  quizzes:any[] = [];

  currentQuiz:number=0;
  answerSelected = false;
  correctAnswers = 0;
  incorrectAnswers = 0;
  prevAnswered:any[] = [];
  result = false;
  resultStatus = 'Mostar puntaje';
  banderaPais:Ipais={
    nombre:"",
    bandera:"",
  };
  
    constructor(private quizService: QuizService,public http:HttpClient) { }
  
    ngOnInit(): void {
      this.quizzes = this.quizService.getQuizzes();
      this.currentQuiz = this.getRandom();
      this.prevAnswered.push(this.currentQuiz);
      this.actualizarBandera();
    }
    actualizarBandera(){
      this.http.get(`https://restcountries.com/v3.1/name/${this.quizzes[this.currentQuiz].country}`).subscribe(
        (lista:any)=>{
          lista.forEach((pais: any) => {
            var pais2:Ipais={
              bandera:pais.flags.png,
              nombre:pais.name.common,
            };
          this.banderaPais=pais2;
          //console.log(this.banderaPais);
          });
        }
      );
    }

    onAnswer(option: boolean){
      this.answerSelected = true;
      setTimeout(() => {
        let newQuiz = this.getRandom();
        while(this.prevAnswered.includes(newQuiz) && this.prevAnswered.length < 10){
          newQuiz = this.getRandom();
        }
        this.currentQuiz = newQuiz;
          this.prevAnswered.push(this.currentQuiz);
          this.actualizarBandera();
          this.answerSelected = false;
      }, 30);
  
      if(option){
        this.correctAnswers++;
      }else{
        this.incorrectAnswers++;
      }
      
    }

    getRandom(){
      return Math.floor(Math.random() * this.quizzes.length);
    }
  
    mostrarRespuesta(){
      this.result = true;
      this.resultStatus = 'Volver a Jugar!';    
    }
    playAgain(){
      this.prevAnswered = [];
      this.prevAnswered.push(this.getRandom());
      this.correctAnswers = 0;
      this.incorrectAnswers = 0;
    }
  
  /*listaPaises = new Array<any>();
  /nombre:string[]=[];
  paisSeleccionado:string="";
  paisRandom:any;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.obtenerTodos();
    let keys = Math.floor (Math.random() * this.listaPaises.length);
    setTimeout(this.paisRandom = this.listaPaises[keys],50) ;
    //this.paisRandom=JSON.parse(this.listaPaises.toString());
    this.listaPaises.forEach(p=>console.log(p));
    console.log(this.paisRandom);
    
    //setTimeout(this.paisRandom = this.listaPaises,50);
    console.log(this.paisRandom);
    console.log(this.listaPaises);

  }
  obtenerTodos(){
    this.http.get('https://restcountries.com/v3.1/all').subscribe(
      (lista:any)=>{
        lista.forEach((pais:any)=>{
          let pais2=JSON.parse(JSON.stringify(pais));
          //console.log(pais);
          //console.log(pais2);
          this.listaPaises.push(pais2);
        });
      }
    )
  }
  seleccionado(){
    this.paisSeleccionado=(<HTMLInputElement> document.getElementById("select")).value;
    console.log(this.paisSeleccionado);
  }*/
}
