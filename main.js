var numOfPlayersDiv = document.getElementById('num-of-players')

var namesOfPlayersDiv = document.getElementById('player-names')

var confirmNamesDiv = document.getElementById('confirm-names-and-play')

var gamePlayDiv = document.getElementById('game-play')

var discardPileDiv = document.getElementById('discard-pile')

var goOrNotDiv = document.getElementById('go-or-not')
var cardChoiceDiv = document.getElementById('card-choice')

var startGameDiv = document.getElementById('start-game')

var checkUserChoiceDiv = document.getElementById('check-user-choice')

var invalidIndexDiv = document.getElementById('invalid-index')

var erroneousInputsDiv = document.getElementById('erroneous-inputs')

var names = []

var deck

var players = []

var discardPile = {}


var chooseCard

var skipGo

var playerGoing//declare this now so that when playGame() runs and assigns it to a value, the haveGo() function can access playerGoing


numOfPlayersDiv.style.display = 'none'
namesOfPlayersDiv.style.display = 'none'
confirmNamesDiv.style.display= 'none'
gamePlayDiv.style.display= 'none'
discardPileDiv.style.display = 'none'
goOrNotDiv.style.display = 'none'
cardChoiceDiv.style.display = 'none'
checkUserChoiceDiv.style.display = 'none'
invalidIndexDiv.style.display = 'none'
erroneousInputsDiv.style.display = 'none'

var numOfPlayers

function startGame() {

  startGameDiv.style.display = 'inline'
  numOfPlayersDiv.style.display = 'none'
  namesOfPlayersDiv.style.display = 'none'
  confirmNamesDiv.style.display= 'none'
  gamePlayDiv.style.display= 'none'
  discardPileDiv.style.display = 'none'
  goOrNotDiv.style.display = 'none'
  cardChoiceDiv.style.display = 'none'
  invalidIndexDiv.style.display = 'none'
  erroneousInputsDiv.style.display = 'none'

} //end function


function numberOfPlayers() {
  startGameDiv.style.display = 'none'
  numOfPlayersDiv.style.display = 'inline'
  document.getElementById('numOfPlayers').value=''
} //end function

function confirmNamesOfPlayers() {
  erroneousInputsDiv.innerHTML = ''
  numOfPlayers = document.getElementById('numOfPlayers').value

  if (( 7 <= numOfPlayers) || (numOfPlayers <= 1 )) {
    erroneousInputsDiv.style.display = 'inline'
    erroneousInputsDiv.innerHTML += '<p>Oops! You must enter a number between 2 and 6.</p>'
    document.getElementById('numOfPlayers').value = ''
  } else {


  numOfPlayersDiv.style.display = 'none'
  namesOfPlayersDiv.style.display = 'inline'
  namesOfPlayersDiv.innerHTML = ''

  document.getElementById('player-names').innerHTML += '<p>What are the names of your players?</p>'

  for (i = 0; i < numOfPlayers; i++) {

    var input = '<br><input type=\'text\' id=\'names\'>'

    document.getElementById('player-names').innerHTML += input
  } //end for loop
  document.getElementById('player-names').innerHTML += '<br><button onclick=\'getListOfNames()\'>Confirm names of players</button>'
  } //end if function
} //end function


function getListOfNames() {
  names = []
  confirmNamesDiv.innerHTML = ''

  namesOfPlayersDiv.style.display = 'none'
  confirmNamesDiv.style.display = 'inline'

  var namesArray = document.getElementById('player-names').getElementsByTagName('input')

  for (i=0; i < namesArray.length; i++) {
    names.push(' ' + namesArray[i].value)
  } //end for loop
  confirmNamesDiv.innerHTML += ''+names+ '<br>'
  confirmNamesDiv.innerHTML += '<br><button onclick=\'generateDeck();generateRandomNumber();generatePlayersList();generateInitialDiscardPile();playGame();\'>Let\'s play!</button>'

} //end function
console.log('names' + names)

//Game functions
var colours = ['Red', 'Yellow', 'Green', 'Blue']
var numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']



  function createDeck() {
    deck = []
    for (let colourIdx = 0; colourIdx < colours.length; colourIdx++) {
      for (let numberIdx = 0; numberIdx < numbers.length; numberIdx++) {
        let card = {
          colour: colours[colourIdx],
          number: numbers[numberIdx]
        }
        deck.push(card)
      }
    }
    return deck
    console.log(deck)
  } //end function

  function shuffleDeck(deck) {
  for (let i=0; i < deck.length; i++) {
    //Get a whole number that is between 0-length of deck. Assign it to swapIdx
    let swapIdx = Math.trunc(Math.random() * deck.length);
    let tmp = deck[swapIdx];
    //Temporarily assign the card at swapIdx within deck to 'tmp'
    deck[swapIdx] = deck[i];
    //Swap this randomly chosen card with the card we're looking at in the loop
    deck[i] = tmp;
    //We're essentially swapping deck[i] with deck[swapIdx]
    //We needed the temporary variable in order to do this swap
    }
  } //end function

  function getNextCard() {
    return deck.shift(); //shift() takes the first card in a list
  } //end function

  function getCardString (card) {
    return card.colour + ' of ' + card.number + '\n' //return string representation of card
  } //end function

  function createPlayers (names) {
  players = []
  for (i = 0; i < numOfPlayers; i++) {
    let player = {
      name: names[i],
      cards: [
        getNextCard(),
        getNextCard()]
      }
      players.push(player)
    }
  } //end function


  function getCardObject (listofCards) { //need to create loop which allows us to print each card in list 'cards'
    var string = ''

    for (i = 0; i < listofCards.length; i++) {
      string += getCardString(listofCards[i]) + '\n'
    }
    return string
  } //end function


  function getPlayerAndCard (player) {
    return player.name + " has \n" + getCardObject(player.cards)
  } //end function



  function generatePlayersList () {
    createPlayers(names)
  } //end function


  function generateDeck() {
    createDeck()
    shuffleDeck(deck)
  } //end functio

  function generateInitialDiscardPile () {
    discardPile = deck[deck.length - 1]
  } //end function


  function generateRandomNumber() {
    playerGoing = Math.floor(Math.random() * Math.floor(numOfPlayers-1))
  }

  function playGame() {

  //createPlayers(names)

  goOrNotDiv.style.display = 'none'
  confirmNamesDiv.style.display = 'none'
  discardPileDiv.style.display = 'inline'
  gamePlayDiv.style.display= 'inline'
  gamePlayDiv.innerHTML = ''

  playerGoing = (playerGoing + 1) % players.length

  discardPileDiv.innerHTML = '<p>Top of discard pile: '+getCardString(discardPile)+'</p>'
  gamePlayDiv.innerHTML += '<p>'+names[playerGoing]+' is going</p>'
  gamePlayDiv.innerHTML += '<p>'+getPlayerAndCard(players[playerGoing])+'</p>'

  goOrNot()

} //end function


function goOrNot() {
  goOrNotDiv.style.display = 'inline'


} //end function

function checkIfCanGo() {

  var object = players[playerGoing].cards

  var count = 0

  for (i = 0; i < object.length; i++) {

  var cardObject = object[i] //get ith element of 'cards' list


  if (cardObject.colour !== discardPile.colour && cardObject.number !== discardPile.number) {
    count ++
    } //end if function
  } //end for loop
  if (object.length === count) {
  checkUserChoiceDiv.innerHTML = ''
  checkUserChoiceDiv.style.display = 'inline'
  checkUserChoiceDiv.innerHTML += '<p>Oops! It looks like you have no matching cards. You\'ll need to miss a go.</p>'
} else {chooseCard()}

} //end function

function chooseCard() {
  checkUserChoiceDiv.style.display = 'none'
  goOrNotDiv.style.display = 'none'
  cardChoiceDiv.style.display = 'inline'
  var object = players[playerGoing].cards
  cardChoiceDiv.innerHTML = ''
  cardChoiceDiv.innerHTML += '<p><label>What\'s the position of the card you want to play?<input id=\'userChoice\' type=\'number\' value =\'\'></label></p>'
  cardChoiceDiv.innerHTML += '<button onclick=\'haveGo()\'>Play this card</button>'

}//end function

function haveGo() {

  erroneousInputsDiv.style.display = 'none'

  invalidIndexDiv.innerHTML = ''

  var userChoice = Number(document.getElementById('userChoice').value)
  userChoice -= 1

  var object = players[playerGoing].cards

  var cardObject = object[userChoice]

  console.log("no of players cards " + object.length)
  if (userChoice >= object.length) {
    invalidIndexDiv.style.display = 'inline'
    invalidIndexDiv.innerHTML += '<p>Oops! You need to enter a number that corresponds with the position of the card you want to play.</p>'
  } //end if

  if (cardObject.colour == discardPile.colour ||  cardObject.number == discardPile.number) {
    gamePlayDiv.innerHTML += '<p>'+names[playerGoing]+' has matched with '+getCardString(cardObject)+''

    cardChoiceDiv.style.display = 'none'

    discardPile = Object.assign({}, cardObject)

    discardPileDiv.innerHTML = '<p>Top of discard pile: '+getCardString(discardPile)+'</p>'

    var removedCard = object.indexOf(cardObject)

    object.splice(removedCard, 1)
    
    console.log('object length after go' + object.length)
    if (object.length === 0) {
      gamePlayDiv.innerHTML += '<p>'+names[playerGoing]+' has won!</p>'
      gamePlayDiv.innerHTML += '<button onclick=\'startGame()\'>Play again</button>'
    } else {
      gamePlayDiv.innerHTML += '<p>'+getPlayerAndCard(players[playerGoing])+'</p>'
      gamePlayDiv.innerHTML += '<button onclick=\'playGame()\'>Next player</button>'
    } 
  } else {
    console.log('not match')
      erroneousInputsDiv.style.display = 'inline'
      erroneousInputsDiv.innerHTML = ''
      erroneousInputsDiv.innerHTML += '<p>That card doesn\'t match, please try another.</p>'
      } 


} //end function

function skipGo() {

  goOrNotDiv.style.display = 'none'
  checkUserChoiceDiv.style.display = 'none'
  players[playerGoing].cards.push(getNextCard())
  var object = players[playerGoing].cards
  console.log('skipgo')
  
  gamePlayDiv.innerHTML = ''
  gamePlayDiv.innerHTML += '<p>No cards matched. '+ getCardString(object[object.length-1]) +' has been added to the hand.</p>'
  gamePlayDiv.innerHTML += '<p>'+getPlayerAndCard(players[playerGoing])+'</p>'
  gamePlayDiv.innerHTML += '<button onclick=\'playGame()\'>Next player</button>'
} //end function

function checkIfNeedToSkip() {
  var object = players[playerGoing].cards

  var count = 0

  for (i = 0; i < object.length; i++) {

  var cardObject = object[i] //get ith element of 'cards' list


  if (cardObject.colour == discardPile.colour || cardObject.number == discardPile.number) {
    count ++
    } //end if function
  } //end for loop
  console.log('count ' + count)
  if (count !== 0) {
  checkUserChoiceDiv.innerHTML = ''
  checkUserChoiceDiv.style.display = 'inline'
  checkUserChoiceDiv.innerHTML += '<p>Oops! It looks like you have at least one matching card. Go on, have a go.</p>'
} else {
  skipGo()
}
} //end function
