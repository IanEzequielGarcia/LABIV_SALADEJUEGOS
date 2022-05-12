        var suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
        var values = ["1","2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        var deck = new Array();
        var players = new Array();
        var currentPlayer = 0;
        var puntos=0;
        var cartaAnterior=0;
        
        function createDeck()
        {
            deck = new Array();
            for (var i = 0 ; i < values.length; i++)
            {
                for(var x = 0; x < suits.length; x++)
                {
                    var weight = parseInt(values[i]);
                    var card = { Value: values[i], Suit: suits[x], Weight: weight };
                    deck.push(card);
                }
            }
        }

        function createPlayers(num)
        {
            players = new Array();
            for(var i = 1; i <= num; i++)
            {
                var hand = new Array();
                var player = { Name: 'Player ' + i, ID: i, Points: 0, Hand: hand };
                players.push(player);
            }
        }

        function createPlayersUI()
        {
            document.getElementById('players').innerHTML = '';
            for(var i = 0; i < players.length; i++)
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
                
                div_player.appendChild(div_playerid);
                div_player.appendChild(div_hand);
                div_player.appendChild(div_points);
                document.getElementById('players').appendChild(div_player);
            }
        }

        function shuffle()
        {
            // for 1000 turns
            // switch the values of two random cards
            for (var i = 0; i < 1000; i++)
            {
                var location1 = Math.floor((Math.random() * deck.length));
                var location2 = Math.floor((Math.random() * deck.length));
                var tmp = deck[location1];

                deck[location1] = deck[location2];
                deck[location2] = tmp;
            }
        }

        function startblackjack()
        {
            document.getElementById('btnStart').value = 'Reiniciar';
            document.getElementById("status").style.display="none";
            puntos=0;
            cartaAnterior=0;
            // deal 2 cards to every player object
            currentPlayer = 0;
            createDeck();
            shuffle();
            createPlayers(1);
            createPlayersUI();
            dealHands();
            document.getElementById('player_' + currentPlayer).classList.add('active');
        }

        function dealHands()
        {
            // alternate handing cards to each player
            // 2 cards each
            for (var x = 0; x < players.length; x++)
            {
                var card = deck.pop();
                players[x].Hand.push(card);
                renderCard(card, x);
                updatePoints();
            }
            updateDeck();
        }

        function renderCard(card, player)
        {
            var hand = document.getElementById('hand_' + player);
            
            if(hand.childNodes.length>0)
            {
                hand.removeChild(hand.firstChild);
            }
            hand.appendChild(getCardUI(card));
        }
        function getCardUI(card)
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
        function getPoints(player)
        {
            var points = 0;
            for(var i = 0; i < players[player].Hand.length; i++)
            {
                points = players[player].Hand[i].Weight;
            }
            players[player].Points = points;
            return points;
        }

        function updatePoints()
        {
            for (var i = 0 ; i < players.length; i++)
            {
                getPoints(i);
                document.getElementById('points_' + i).innerHTML = players[i].Points;
            }
        }

        function hitMe()
        {
            // pop a card from the deck to the current player
            // check if current player new points are over 21
            var card = deck.pop();
            players[currentPlayer].Hand.push(card);
            renderCard(card, currentPlayer);
            updatePoints();
            
            console.log("CARTA ACTUAL "+players[currentPlayer].Points);
            console.log("CARTA ANTERIOR "+cartaAnterior);
            console.log("Cartas "+deck.length);

            if(puntos<=9&&deck.length>1)
            {
                if (players[currentPlayer].Points > cartaAnterior && players[currentPlayer].Points != cartaAnterior)
                {
                    puntos++;
                    updateDeck();
                    end();
                }
            }else{
                document.getElementById('status').innerHTML = 'Perdiste';
                document.getElementById('status').style.display = "inline-block";
                end();
            }
            cartaAnterior=players[currentPlayer].Points;
        }

        function stay()
        {
            var card = deck.pop();
            players[currentPlayer].Hand.push(card);
            renderCard(card, currentPlayer);
            updatePoints();

            console.log("CARTA ACTUAL "+players[currentPlayer].Points);
            console.log("CARTA ANTERIOR "+cartaAnterior);
            console.log("Cartas "+deck.length);
            if(puntos<=9&&deck.length>1)
            {
                if (players[currentPlayer].Points < cartaAnterior && players[currentPlayer].Points != cartaAnterior)
                {
                    puntos++;
                    updateDeck();
                    end();
                }
            }
            else{
                document.getElementById('status').innerHTML = 'Perdiste';
                document.getElementById('status').style.display = "inline-block";
                end();
            }
            cartaAnterior=players[currentPlayer].Points;
        }

        function end()
        {
            if(puntos>9)
            {
                document.getElementById('status').innerHTML = 'Ganaste';
                document.getElementById("status").style.display = "inline-block";
            }
        }

        function updateDeck()
        {
            //document.getElementById('deckcount').innerHTML = deck.length;
            document.getElementById('deckcount').innerHTML = puntos;
        }

        window.addEventListener('load', function(){
            createDeck();
            shuffle();
            createPlayers(1);
        });