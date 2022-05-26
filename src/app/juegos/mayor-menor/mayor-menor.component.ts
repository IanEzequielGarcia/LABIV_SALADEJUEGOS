import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.scss']
})
export class MayorMenorComponent implements OnInit 
{
  constructor(private authS:AuthService) {
    setTimeout(()=>{
        this.createDeck();
        this.shuffle();
        this.createPlayers(1);
      },100)
   }
  ngOnInit(): void {
  }
  
    suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
    values = ["1","2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    deck = new Array();
    players = new Array();
    currentPlayer = 0;
    vidas=0;
    cartaAnterior=0;
    createDeck()
    {
        this.deck = new Array();
        for (var i = 0 ; i < this.values.length; i++)
        {
            for(var x = 0; x < this.suits.length; x++)
            {
                var weight = parseInt(this.values[i]);
                var card = { Value: this.values[i], Suit: this.suits[x], Weight: weight };
                this.deck.push(card);
            }
        }
    }

    createPlayers(num:any)
    {
        this.players = new Array();
        for(var i = 1; i <= num; i++)
        {
            var hand = new Array();
            var player = { Name: 'Player ' + i, ID: i, Points: 0, Hand: hand };
            this.players.push(player);
        }
    }

    createPlayersUI()
    {
        (<HTMLInputElement>document.getElementById('players')).innerHTML = '';
        for(var i = 0; i < this.players.length; i++)
        {
            var div_player = document.createElement('div');
            var div_playerid = document.createElement('div');
            var div_hand = document.createElement('div');
            var div_points = document.createElement('div');

            div_points.className = 'points';
            div_points.id = 'points_' + i;
            div_player.id = 'player_' + i;
            div_player.className = 'player';
            div_hand.id = 'hand_' + i;
            
            div_playerid.innerHTML = 'Player ' + this.players[i].ID;
            div_player.appendChild(div_playerid);
            div_player.appendChild(div_hand);
            div_player.appendChild(div_points);
            (<HTMLInputElement>document.getElementById('players')).appendChild(div_player);
        }
    }

    shuffle()
    {
        // for 1000 turns
        // switch the this.values of two random cards
        for (var i = 0; i < 1000; i++)
        {
            var location1 = Math.floor((Math.random() * this.deck.length));
            var location2 = Math.floor((Math.random() * this.deck.length));
            var tmp = this.deck[location1];

            this.deck[location1] = this.deck[location2];
            this.deck[location2] = tmp;
        }
    }

    startblackjack()
    {
        (<HTMLInputElement>document.getElementById('btnStart')).value = 'Reiniciar';
        (<HTMLInputElement>document.getElementById('status')).style.display="none";
        this.vidas=0;
        this.cartaAnterior=0;
        // deal 2 cards to every player object
        this.currentPlayer = 0;
        this.createDeck();
        this.shuffle();
        this.createPlayers(1);
        this.createPlayersUI();
        this.dealHands();
        (<HTMLInputElement>document.getElementById('player_' + this.currentPlayer)).classList.add('active');
        (<HTMLInputElement>document.getElementById('player_' + this.currentPlayer)).style.backgroundColor="white";
    }

    dealHands()
    {
        // alternate handing cards to each player
        // 2 cards each
        for (var x = 0; x < this.players.length; x++)
        {
            var card = this.deck.pop();
            this.players[x].Hand.push(card);
            this.renderCard(card, x);
            this.updatePoints();
        }
        this.updateDeck();
    }

    renderCard(card:any, player:any)
    {
        var hand = document.getElementById('hand_' + player);
    }
    getCardUI(card:any)
    {
        var el = document.createElement('div');
        var icon = '';
        if (card.Suit == 'Hearts')
        icon='&hearts;';
        else if (card.Suit == 'Spades')
        icon = '&spades;';
        else if (card.Suit == 'Diamonds')
        icon = '&diams;';
        else
        icon = '&clubs;';
        
        el.className = 'card';
        el.innerHTML = card.Value + '<br/>' + icon;
        return el;
    }

        // returns the number of points that a player has in hand
    getPoints(player:any)
    {
        var points = 0;
        for(var i = 0; i < this.players[player].Hand.length; i++)
        {
            points = this.players[player].Hand[i].Weight;
        }
        this.players[player].Points = points;
        return points;
    }

    updatePoints()
    {
        for (var i = 0 ; i < this.players.length; i++)
        {
            this.getPoints(i);
            
            (<HTMLInputElement>document.getElementById('points_' + i)).innerHTML = this.players[i].Points;
        }
    }
    hitMe()
    {
        // pop a card from the this.deck to the current player
        // check if current player new points are over 21
        var card = this.deck.pop();
        this.players[this.currentPlayer].Hand.push(card);
        this.renderCard(card, this.currentPlayer);
        this.updatePoints();
        
        console.log("CARTA ACTUAL "+this.players[this.currentPlayer].Points);
        console.log("CARTA ANTERIOR "+this.cartaAnterior);
        console.log("Cartas "+this.deck.length);

        if(this.vidas<=9&&this.deck.length>1)
        {
            if (this.players[this.currentPlayer].Points > this.cartaAnterior && this.players[this.currentPlayer].Points != this.cartaAnterior)
            {
                this.vidas++;
                this.updateDeck();
                this.end();
            }
        }else{
        
        (<HTMLInputElement>document.getElementById('status')).innerHTML = 'Perdiste';
        (<HTMLInputElement>document.getElementById('status')).style.display = "inline-block";
            this.end();
            this.addScore();
        }
        this.cartaAnterior=this.players[this.currentPlayer].Points;
    }

    stay()
    {
        var card = this.deck.pop();
        this.players[this.currentPlayer].Hand.push(card);
        this.renderCard(card, this.currentPlayer);
        this.updatePoints();

        console.log("CARTA ACTUAL "+this.players[this.currentPlayer].Points);
        console.log("CARTA ANTERIOR "+this.cartaAnterior);
        console.log("Cartas "+this.deck.length);
        if(this.vidas<=9&&this.deck.length>1)
        {
            if (this.players[this.currentPlayer].Points < this.cartaAnterior && this.players[this.currentPlayer].Points != this.cartaAnterior)
            {
                this.vidas++;
                this.updateDeck();
                this.end();
            }
        }
        else{
        (<HTMLInputElement>document.getElementById('status')).innerHTML = 'Perdiste';
        (<HTMLInputElement>document.getElementById('status')).style.display = "inline-block";
            this.end();
            this.addScore();

        }
        this.cartaAnterior=this.players[this.currentPlayer].Points;
        }
  
        end()
        {
            if(this.deck.length>1&&this.vidas>9)
            {
                (<HTMLInputElement>document.getElementById('status')).innerHTML = 'Ganaste';
                (<HTMLInputElement>document.getElementById('status')).style.display = "inline-block";
                this.addScore();

            }
        }

        updateDeck()
        {
            //document.getElementById('this.deckcount').innerHTML = this.deck.length;
            (<HTMLInputElement>document.getElementById('deckcount')).innerHTML = this.vidas.toString();
        }
        addScore(){
            let puntaje={
              puntos:0,
              uid:"",
              fecha:""
            }
            this.authS.isLoggedIn().subscribe(usuario=>{
              puntaje.uid=usuario!.uid;
              puntaje.puntos=this.deck.length-this.vidas;
              puntaje.fecha=Date.now().toString();
              console.log(puntaje);
              this.authS.agregarPuntaje(puntaje);
            })
          }

}