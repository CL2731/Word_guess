// create a button 
// have an event listener listen for click of button                    (11, 12)
// after click we will start game - function
// display hidden word                                                  (19, 20 of class)
// add another event listener that listens for keydown
// if keydown = any correct letter, then show letter                    (15, 16 referance)
// add timer when game starts                                           (09, 10 from class for help)
// user wins when all letters are displayed before time runs out
// user loses if all letters are not displayed before time runs out
//  us localstorage to keep track of wins & loses                       (20, 21 referance)

// function to select word

// here we have initialized a variable named playBtn which represents
// the play button object/element in the index.html
var playBtn = document.querySelector("#play");

// initialize word array for our set of words to guess
var wordArray = ["elephant", "library", "zebra", "chaos", "javascript", "funny"];    

// initialize the list element to display underscores or characters
var listEl = document.querySelector("#letterList");

// make button eventlistener ("click", func that starts game and timer)
playBtn.addEventListener("click", playGame); 

// Within function (game){
function playGame() {
    //      timer function
    setTimer();
    //initialize hidden word for this game with selectWord function
    //this is an array with each letter from the word
    var hiddenWord = selectWord(wordArray);



    //      eventlistener ? (keydown) function - check if letter shows
    document.addEventListener("keydown", checkKeydown);
    //      if ( checks timer === all shown) Win

    //      local storage wins

    //      local storage losses
};

function setTimer() {
    var timerEl = document.querySelector(".time");

    var secondLeft = 30;
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = secondsLeft;

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            //player loses here? 
            //we have to come back to this
            //lose function?
        }

    }, 1000);
};

function checkKeydown(event){
    // initialize variable keyPressed to the key that the user
    // pressed
    var keyPressed = event.key;

    //check to see if this key that was pressed is
    //in our hidden word

};

//this function will select a word for us
//it will also return that word as an array
//with that word's characters at each index
function selectWord(words) {
    return words[Math.floor(Math.random() * words.length)].split('');
};

function displayHiddenWord(charArray) {

    //set the display of listEl to flex
    listEl.setAttribute("style", "display:flex;");

    // initialize an array to hold li elements
    var liArray = [];

    // initialize li elements for the letters to be displayed on
    for (var i = 0; i < charArray.length; i++) {

        // initialize the first li element for the first letter
        liArray[i] =  document.createElement("li");

        // set the li element as a child of the ul element
        listEl.appendChild(liArray[i]);

        // set the data state to hidden so it can be changed later
        liArray[i].setAttribute("data-state", "hidden");

        //set the data character attribute to the character at this index
        //in the character array
        liArray[i].setAttribute("data-character", charArray[i]);

        // set the textContent to "_" upon initialization
        liArray[i].textContent = "_";
    }
};