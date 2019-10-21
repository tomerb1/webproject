var getElementsByClassName = prompt ('What is your name?');
window.localStorage.setItem ('name', 'dan');
function change(username) {
    prompt('What is your name?');
}

// Those are global variables, they stay alive and reflect the state of the game
var elPreviousCard = null;
var flippedCouplesCount = 0;

// This is a constant that we dont change during the game (we mark those with CAPITAL letters)
var TOTAL_COUPLES_COUNT = 3;

// Load an audio file
var audioWin = new Audio('sound/win.mp3');

// This function is called whenever the user click a card
function cardClicked(elCard) {

    // If the user clicked an already flipped card - do nothing and return from the function
    if (elCard.classList.contains('flipped')) {
        return;
    }

    // Flip it
    elCard.classList.add('flipped');

    // This is a first card, only keep it in the global variable
    if (elPreviousCard === null) {
        elPreviousCard = elCard;
    } else {
        // get the data-card attribute's value from both cards
        var card1 = elPreviousCard.getAttribute('data-card');
        var card2 = elCard.getAttribute('data-card');

        // No match, schedule to flip them back in 1 second
        if (card1 !== card2){
            setTimeout(function () {
                elCard.classList.remove('flipped');
                elPreviousCard.classList.remove('flipped');
                elPreviousCard = null;
            }, 1000)

        } else {
            // Yes! a match!
            flippedCouplesCount++;
            elPreviousCard = null;

            // All cards flipped!
            if (TOTAL_COUPLES_COUNT === flippedCouplesCount) {
                audioWin.play();
            
                // and finally add a button to call resetCard() 
        document.getElementById("Play Again").innerHTML =
        '<button onclick="resetCard();">Play Again</button>';
            }

        }

    }

}

function resetCard() {// to erase the flipped classes
    var cardclass = document.getElementsByClassName("card");
    for (i = 0; i < cardclass.length; i++) {
      cardclass[i].classList.remove("flipped");
      document.getElementById("Play Again").innerHTML = "";
    }
}