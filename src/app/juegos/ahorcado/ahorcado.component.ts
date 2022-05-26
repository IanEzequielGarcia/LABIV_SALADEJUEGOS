import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent implements OnInit {
  maxWrong:number=6;
  answer:string = '';
  mistakes:number = 0;
  guessed:any[] = [];
  keyboard:any[]=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  wordStatus:any = null;
  constructor(private authS:AuthService) {
    setTimeout(()=>{
      this.randomWord();
      this.guessedWord();
    },100)
  }

  ngOnInit(): void {
  }
  socialMedia = [
    "whatsapp",
    "instagram",
    "twitter",
    "snapchat",
    "tiktok",
    "youtube",
    "wechat",
    "facebook",
    "telegram",
    "palmchat",
    "gmail",
    "linkedin",
    "reddit",
    "hangouts",
    "discord",
    "twitch",
  ]
  
  randomWord() {
    this.answer =this.socialMedia[Math.floor(Math.random() * this.socialMedia.length)];
    console.log(this.answer);
  }
  
  handleGuess(chosenLetter:string) {
    this.guessed.indexOf(chosenLetter) === -1 ? this.guessed.push(chosenLetter) : null;
    (<HTMLInputElement>document.getElementById(chosenLetter)).setAttribute('disabled', 'true');
  
    if (this.answer.indexOf(chosenLetter) >= 0) {
      this.guessedWord();
      this.checkIfGameWon();
    } else if (this.answer.indexOf(chosenLetter) === -1) {
      this.mistakes++;
      this.updateMistakes();
      this.checkIfGameLost();
      this.updateHangmanPicture();
    }
  }
  updateHangmanPicture() {
    switch(this.mistakes)
    {
          case 1:
            (<HTMLInputElement>document.getElementById('hangmanPic')).src = 'https://firebasestorage.googleapis.com/v0/b/tpsaladejuegos-8b998.appspot.com/o/1.png?alt=media&token=c30606b1-b3c6-48d3-b489-fea856d4a5c5';
              break;
          case 2:
              (<HTMLInputElement>document.getElementById('hangmanPic')).src = 'https://firebasestorage.googleapis.com/v0/b/tpsaladejuegos-8b998.appspot.com/o/2.png?alt=media&token=48fa4fb8-30db-4b27-b74e-444812fa78ec';
              break;
          case 3:
              (<HTMLInputElement>document.getElementById('hangmanPic')).src = 'https://firebasestorage.googleapis.com/v0/b/tpsaladejuegos-8b998.appspot.com/o/3.png?alt=media&token=390475c2-93ff-45bb-96b8-08ab743ea2be';
              break;
          case 4:
              (<HTMLInputElement>document.getElementById('hangmanPic')).src = 'https://firebasestorage.googleapis.com/v0/b/tpsaladejuegos-8b998.appspot.com/o/4.png?alt=media&token=edd7eb41-b306-43c5-9e67-a58aec0e8934';
              break;
          case 5:
              (<HTMLInputElement>document.getElementById('hangmanPic')).src = 'https://firebasestorage.googleapis.com/v0/b/tpsaladejuegos-8b998.appspot.com/o/5.png?alt=media&token=be87d942-4b46-4489-b449-4a4b04142789';
              break;
          case 6:
              (<HTMLInputElement>document.getElementById('hangmanPic')).src = 'https://firebasestorage.googleapis.com/v0/b/tpsaladejuegos-8b998.appspot.com/o/6.png?alt=media&token=b5898ca2-7a91-4cee-b388-efa88b48eb19';
          break;
          default:
              (<HTMLInputElement>document.getElementById('hangmanPic')).src = 'https://firebasestorage.googleapis.com/v0/b/tpsaladejuegos-8b998.appspot.com/o/0.png?alt=media&token=e949bb76-84fe-4bc5-847a-5fe772e40471';
              break;
    }
  }
  checkIfGameWon() {
    if (this.wordStatus == this.answer) {
      Swal.fire('GANASTE!!!',"","success");
      (<HTMLInputElement>document.getElementById('hangmanPic')).src = 'https://firebasestorage.googleapis.com/v0/b/tpsaladejuegos-8b998.appspot.com/o/ganaste.png?alt=media&token=cce18269-5fda-46cf-b927-53acb95ade09';
      this.addScore();
    }
  }
  addScore(){
    let puntaje={
      puntos:0,
      uid:"",
      fecha:""
    }
    this.authS.isLoggedIn().subscribe(usuario=>{
      puntaje.uid=usuario!.uid;
      puntaje.puntos=6-this.mistakes;
      puntaje.fecha=Date.now().toString();
      console.log(puntaje);
      this.authS.agregarPuntaje(puntaje);
    })
  }
  checkIfGameLost() {
    if (this.mistakes == this.maxWrong) {
      (<HTMLInputElement>document.getElementById('wordSpotlight')).innerHTML = 'La respuesta correcta era: ' + this.answer;
      (<HTMLInputElement>document.getElementById('hangmanPic')).innerHTML = 'PERDISTE!!!';
      Swal.fire('Perdiste :(',"","error");
    }
  }
  reset() {
    this.mistakes = 0;
    this.guessed = [];
    (<HTMLInputElement>document.getElementById('hangmanPic')).src = 'https://firebasestorage.googleapis.com/v0/b/tpsaladejuegos-8b998.appspot.com/o/0.png?alt=media&token=e949bb76-84fe-4bc5-847a-5fe772e40471';
    this.keyboard.forEach(element => {
      (<HTMLInputElement>document.getElementById(element)).removeAttribute('disabled');
    });
    this.keyboard=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    this.randomWord();
    this.guessedWord();
    this.updateMistakes();
  }
  guessedWord() {
    this.wordStatus = this.answer.split('').map(letter => (this.guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
    (<HTMLInputElement>document.getElementById('wordSpotlight')).innerHTML = this.wordStatus;
  }
  
  updateMistakes() {
    (<HTMLInputElement>document.getElementById('mistakes')).innerHTML = this.mistakes.toString();
  }
}
