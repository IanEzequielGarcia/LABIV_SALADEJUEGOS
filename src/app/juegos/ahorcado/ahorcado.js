var socialMedia = [
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
  let answer = '';
  let maxWrong = 6;
  let mistakes = 0;
  let guessed = [];
  let alphabets=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  let wordStatus = null;
  
  function randomWord() {
    answer = socialMedia[Math.floor(Math.random() * socialMedia.length)];
  }
  
  function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
      `
        <button
          class="btn btn-lg btn-primary m-2"
          id='` + letter + `'
          onClick="handleGuess('` + letter + `')"
        >
          ` + letter + `
        </button>
      `).join('');
  
    document.getElementById('keyboard').innerHTML = buttonsHTML;
  }
  
  function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);
  
    if (answer.indexOf(chosenLetter) >= 0) {
      guessedWord();
      checkIfGameWon();
    } else if (answer.indexOf(chosenLetter) === -1) {
      mistakes++;
      updateMistakes();
      checkIfGameLost();
      updateHangmanPicture();
    }
  }
  
  function updateHangmanPicture() {
      switch(mistakes)
      {
            case 1:
                document.getElementById('hangmanPic').src = 'https://firebasestorage.googleapis.com/v0/b/tpsaladejuegos-8b998.appspot.com/o/1.png?alt=media&token=c30606b1-b3c6-48d3-b489-fea856d4a5c5';
                break;
            case 2:
                document.getElementById('hangmanPic').src = 'https://firebasestorage.googleapis.com/v0/b/tpsaladejuegos-8b998.appspot.com/o/2.png?alt=media&token=48fa4fb8-30db-4b27-b74e-444812fa78ec';
                break;
            case 3:
                document.getElementById('hangmanPic').src = 'https://firebasestorage.googleapis.com/v0/b/tpsaladejuegos-8b998.appspot.com/o/3.png?alt=media&token=390475c2-93ff-45bb-96b8-08ab743ea2be';
                break;
            case 4:
                document.getElementById('hangmanPic').src = 'https://firebasestorage.googleapis.com/v0/b/tpsaladejuegos-8b998.appspot.com/o/4.png?alt=media&token=edd7eb41-b306-43c5-9e67-a58aec0e8934';
                break;
            case 5:
                document.getElementById('hangmanPic').src = 'https://firebasestorage.googleapis.com/v0/b/tpsaladejuegos-8b998.appspot.com/o/5.png?alt=media&token=be87d942-4b46-4489-b449-4a4b04142789';
                break;
            case 6:
                document.getElementById('hangmanPic').src = 'https://firebasestorage.googleapis.com/v0/b/tpsaladejuegos-8b998.appspot.com/o/6.png?alt=media&token=b5898ca2-7a91-4cee-b388-efa88b48eb19';
            break;
            default:
                document.getElementById('hangmanPic').src = 'https://firebasestorage.googleapis.com/v0/b/tpsaladejuegos-8b998.appspot.com/o/0.png?alt=media&token=e949bb76-84fe-4bc5-847a-5fe772e40471';
                break;
      }
  }
  
  function checkIfGameWon() {
    if (wordStatus === answer) {
      document.getElementById('keyboard').innerHTML = 'GANASTE!!!';
      document.getElementById('hangmanPic').src = 'https://firebasestorage.googleapis.com/v0/b/tpsaladejuegos-8b998.appspot.com/o/ganaste.png?alt=media&token=cce18269-5fda-46cf-b927-53acb95ade09';
    }
  }
  
  function checkIfGameLost() {
    if (mistakes === maxWrong) {
      document.getElementById('wordSpotlight').innerHTML = 'La respuesta correcta era: ' + answer;
      document.getElementById('keyboard').innerHTML = 'PERDISTE!!!';
    }
  }
  
  function reset() {
    mistakes = 0;
    guessed = [];
    document.getElementById('hangmanPic').src = 'https://firebasestorage.googleapis.com/v0/b/tpsaladejuegos-8b998.appspot.com/o/0.png?alt=media&token=e949bb76-84fe-4bc5-847a-5fe772e40471';
  
    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons();
  }
  
  function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
  
    document.getElementById('wordSpotlight').innerHTML = wordStatus;
  }
  
  function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
  }
  document.getElementById('maxWrong').innerHTML = maxWrong;
  randomWord();
  generateButtons();
  guessedWord();