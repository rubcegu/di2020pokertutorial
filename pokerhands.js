let numbers = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
let suits = ["S", "H", "D", "C"]
let deck = [];
let images = [];
let handSuits = [];
let handRanks = [];
let foundPairs = [];
let foundTriples = [];
let foundQuadruples = [];

let oppCard1 = document.getElementById("oppCard1");
let oppCard2 = document.getElementById("oppCard2");
let playerCard1 = document.getElementById("playerCard1");
let playerCard2 = document.getElementById("playerCard2");
let sharedCard1 = document.getElementById("sharedCard1");
let sharedCard2 = document.getElementById("sharedCard2");
let sharedCard3 = document.getElementById("sharedCard3");
let sharedCard4 = document.getElementById("sharedCard4");
let sharedCard5 = document.getElementById("sharedCard5");

let hands = ["highCard", "pair", "twoPair", "threeOfAKind", "straight", "flush", "fullHouse", "fourOfAKind", "straightFlush", "royalFlush"]

// Builds a full array of 52 unique cards from two separate arrays of numbers and suits
for (let i = 0; i < 13; i++) {
	let card1 = numbers[i] + suits[0];
	let card2 = numbers[i] + suits[1];
	let card3 = numbers[i] + suits[2];
	let card4 = numbers[i] + suits[3];
	deck.push(card1);
	deck.push(card2);
	deck.push(card3);
	deck.push(card4);
}

// Builds array of card image urls from deck array
for (let i = 0; i < 52; i++) {
	let image = "cards/" + deck[i] + ".png"
	images.push(image);
}

// creats image elements for everything in image url array
for (let i = 0; i < 52; i++) {
	let cardImage = document.createElement("IMG");
	cardImage.id = images[i];
}

// Puts reverse card image on all card slots
function dealFaceDown () {
	for (let i = 0; i < 9; i++) {
	let x = document.querySelectorAll(".cardLocation");
	x[i].style.backgroundImage = "url('cards/reverse.png')";
}

}

function revealPlayerCards () {	
	playerCard1.style.backgroundImage = "url('" + images[0] + "')";
	playerCard2.style.backgroundImage = "url('" + images[1] + "')";
}

function revealOppCards () {
	oppCard1.style.backgroundImage = "url('" + images[7] + "')";
	oppCard2.style.backgroundImage = "url('" + images[8] + "')";
}

function revealFlop () {
	sharedCard1.style.backgroundImage = "url('" + images[2] + "')";
	sharedCard2.style.backgroundImage = "url('" + images[3] + "')";
	sharedCard3.style.backgroundImage = "url('" + images[4] + "')";
}

function revealTurn () {
	sharedCard4.style.backgroundImage = "url('" + images[5] + "')";
}

function revealRiver () {
	sharedCard5.style.backgroundImage = "url('" + images[6] + "')";
}

// Returns stored values to zero, shuffles order of pack, and puts card reverse image on car spots.
function shuffle() {
	handRanks = [];
	handSuits = [];
	foundPairs = [];
	foundTriples = [];
	foundQuadruples = [];

	for (let i = 0; i < hands.length; i++) {
		let outputCell = document.getElementById(hands[i]);
		outputCell.innerHTML = " " }

  	for (let i = images.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
    [deck[i], deck[j]] = [deck[j], deck[i]];
  	}

 	dealFaceDown();
}

// converts non-number card values (J,Q,K,A) into numbers based on first character of cards in deck array
// This makes it easier to sort values in handRanks array for hand calculation
// Called within test function (see my hand value)

function converter() {
	for (let i = 0; i < 7; i++) {
		let rank = deck[i].charAt(0);
		let suit = deck[i].charAt(deck[i].length-1);
		handRanks.push(rank);
		handSuits.push(suit);	
	}
	for (let i = 0; i < 7; i++) {
		if (handRanks[i] == 1) {handRanks[i] = 10} 
		else if (handRanks[i] == "J") {handRanks[i] = 11}
		else if (handRanks[i] == "Q") {handRanks[i] = 12}
		else if (handRanks[i] == "K") {handRanks[i] = 13}
		else if (handRanks[i] == "A") {handRanks[i] = 14}
		else {handRanks[i] = parseInt(handRanks[i])};
	}
}

// converts handranks into all numbers, then calls checkhand.

function test () {
	converter ();
	checkHand ();
}

// sorts handrank highest to lowest
// performs a series of tests to see which hand criteria are met
// first examples for demonstration of concept only...too hard to go further at this stage!!
function checkHand () {
	handRanks.sort(function(a, b){return b-a});
	highCardCheck ();
	pairCheck ();
}

// finds and displays highest card (even if better hands exist)
function highCardCheck () {

	let highest = handRanks[0];

	if (highest == "14") {highest = "Ace"}
	else if (highest == "13") {highest = "King"}
	else if (highest == "12") {highest = "Queen"}
	else if (highest == "11") {highest = "Jack"}

let checkOuput = document.getElementById("highCard");
checkOuput.innerHTML = "Highest card is: " + highest;

}

// checks if exactly one pair exists
function pairCheck () {
	for (let i = 0; i < 7; i++) {
	if (handRanks[i] == handRanks [i+1]) {
	foundPairs.push(handRanks[i]);}
	}
	if (foundPairs.length == 1) {
	onePairOutPut ();
	} else if (foundPairs.length > 1) {
	twoPairCheck ();
	}
}

// output if exactly one pair found
function onePairOutPut () {
	if (foundPairs[0] == "14") {foundPairs[0] = "Ace"}
	else if (foundPairs[0] == "13") {foundPairs[0] = "King"}
	else if (foundPairs[0] == "12") {foundPairs[0] = "Queen"}
	else if (foundPairs[0] == "11") {foundPairs[0] = "Jack"}
	let checkOuput = document.getElementById("pair");
	checkOuput.innerHTML = "You have a pair of " + foundPairs[0] + "s.";
	}

// foundpairs has more than one value in it, checks for 'good pairs' which are not actually triples
// finds first two pairs in chronological order
// this function is not good enough for a situation where there is a low value triple (e.g. 2 jacks, 2 7s, 3 4s) - would still show up as two pair
function twoPairCheck () {
	let goodPairs = [];
	for (let i = 0; i < foundPairs.length; i++) {

	if (foundPairs[i] != foundPairs [i+1]) {
	goodPairs.push(1);
	} else if (foundPairs[i] == foundPairs [0]) {
	goodPairs.push(0);
	}
	}

	if (goodPairs[0] = goodPairs[1]) {
		twoPairOutPut ();
	}
}
// two pair output. needs word to avoid breaking DRY principles!
function twoPairOutPut () {
	if (foundPairs[0] == "14") {foundPairs[0] = "Ace"}
	else if (foundPairs[0] == "13") {foundPairs[0] = "King"}
	else if (foundPairs[0] == "12") {foundPairs[0] = "Queen"}
	else if (foundPairs[0] == "11") {foundPairs[0] = "Jack"}
	if (foundPairs[1] == "14") {foundPairs[1] = "Ace"}
	else if (foundPairs[1] == "13") {foundPairs[1] = "King"}
	else if (foundPairs[1] == "12") {foundPairs[1] = "Queen"}
	else if (foundPairs[1] == "11") {foundPairs[1] = "Jack"}
	let checkOuput = document.getElementById("twoPair");
	checkOuput.innerHTML = "You have a pair of " + foundPairs[0] + "s and a pair of " + foundPairs[1] + "s.";
	}
