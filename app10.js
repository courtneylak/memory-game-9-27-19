/* The purpose of this web-based app is to allow the user
 * to be able to play a game of memory of which two
 * cards are chosen by the user and then flipped to see if they match;
 * with the least amount of flips or guesses in total. */ 


/* upon first card_click initiation, begin timer counter as global variable */

let stopWatch;

const entireDeck = document.querySelector('.deck');

entireDeck.addEventListener('click', function() {
    if (!stopWatch) {
        stopWatch = setInterval(countTimer, 1000);
    };
});

const time_counter = []

var totalSeconds = 0;
function countTimer() {
   ++totalSeconds;
   var hour = Math.floor(totalSeconds /3600);
   var minute = Math.floor((totalSeconds - hour*3600)/60);
   var seconds = totalSeconds - (hour*3600 + minute*60);

   document.getElementById('timer').innerHTML = minute + ' min : ' + seconds + ' sec';
};

/* initiate number of card clicks that player chooses, as a clicks counter as a global variable */

/* increment the move counter and display it on the page (put this functionality in another function that you call from this one) */

function increase() {
    document.getElementById('moves').textContent++;
};

/* star-score performance matrix (change style attribute of the stars from yellow to grey as performance deteriorates): */

function decrease() {
    if (document.getElementById('moves').textContent > 3) {
        const list = document.getElementsByClassName("stars")[0];
        list.getElementsByClassName("fa fa-star")[2].style.color = "grey"};
    if (document.getElementById('moves').textContent > 6) {
        const list = document.getElementsByClassName("stars")[0];
        list.getElementsByClassName("fa fa-star")[1].style.color = "grey"};
    if (document.getElementById('moves').textContent > 9) {
        const list = document.getElementsByClassName("stars")[0];
        list.getElementsByClassName("fa fa-star")[0].style.color = "grey"}; 
};

/* Shuffle the list of cards using Udacity-provided "shuffle" method:
 Shuffle function from http://stackoverflow.com/a/2450976 */

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/* Create a {live, manipulatable} list {or array} that contains all {16 in total} of the cards-- */

const cards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", 
    "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb",
    "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];

/* Use put shuffle function and index the result--then add that back to original html-- */

const result = shuffle(cards);

console.log(result);

/* Shuffle all cards and reiterate them back into the original html. Loop through each card and create its own HTML; add  each card's HTML to the page; */


document.getElementsByTagName("i")[4].className = result[0];
document.getElementsByTagName("i")[5].className = result[1];
document.getElementsByTagName("i")[6].className = result[2];
document.getElementsByTagName("i")[7].className = result[3];
document.getElementsByTagName("i")[8].className = result[4];
document.getElementsByTagName("i")[9].className = result[5];
document.getElementsByTagName("i")[10].className = result[6];
document.getElementsByTagName("i")[11].className = result[7];
document.getElementsByTagName("i")[12].className = result[8];
document.getElementsByTagName("i")[13].className = result[9];
document.getElementsByTagName("i")[14].className = result[10];
document.getElementsByTagName("i")[15].className = result[11];
document.getElementsByTagName("i")[16].className = result[12];
document.getElementsByTagName("i")[17].className = result[13];
document.getElementsByTagName("i")[18].className = result[14];
document.getElementsByTagName("i")[19].className = result[15];


/* Set up the event listener for a card. If a card is clicked: display the card's symbol (put this functionality in another function that you call from this one)*/ 

const displayShuffledCards = document.querySelectorAll('.card');

const openCards = [];

const openCardsTwo = [];

displayShuffledCards.forEach(function(card) { 
    card.addEventListener('click', function(flip) {
        card.classList.add('open', 'show');     
        increase();
        decrease();
        twoCards(flip);
        twoCardsTwo(flip);
        twoCardsClicked();
        winner();
    });
});

/*  Add the card to a *list* of "open" cards (put this functionality in another function that you call from this one) */

function twoCards(card) {
    openCards.unshift(card.target.lastElementChild.className);
};

console.log(openCards);

function twoCardsTwo(flip) {
    openCardsTwo.unshift(flip.target);
}

console.log(openCardsTwo);

/*  - if the list already has another card, check to see if the two cards match

if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one) */

function twoCardsClicked(card) {
    if (openCards.length === 2) {   
        compareCards();
    };
}; 


function compareCards(flip) {
    if (openCards[0] === openCards[1]) {
        openCardsTwo[0].classList.add('match');
        openCardsTwo[1].classList.add('match');
        document.getElementById('match').textContent++;
    };
};


/*    --if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one) */

/* if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one) */

/* Closing 'You're a Winner ~ Game Over' Alert Box. */

function winner() {
    if (match === 8) {
        message = (confirm(`Congratulations! You won the memory matching game! \n 
            Stats: ${moves} Clicks; Time: ${document.getElementById('timer').innerHTML} Minute(s) and ${document.getElementById('timer')} Second(s),
            with a performance factor of ${document.getElementById('stars')} Star(s)!`)); {
            window.open("Hit 'OK' to replay game. Hit 'Cancel' to Exit.");

                if (confirm(mesage)) {
                    gameRestart();
                };
        };
    };
};

const restartButton = document.getElementById('title2');

restartButton.addEventListener('click', function(event) {
    gameRestart();
});
    
function gameRestart() {
    document.getElementById('moves').textContent = '0';
    document.getElementById('match').textContent = '0';
    const stars = document.getElementsByClassName("stars")[0];
    stars.getElementsByClassName("fa fa-star")[2].style.color = "black";
    stars.getElementsByClassName("fa fa-star")[1].style.color = "black";
    stars.getElementsByClassName("fa fa-star")[0].style.color = "black";
    clearInterval(stopWatch);
};
