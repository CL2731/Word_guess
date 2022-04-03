// here we have initialized a variable named playBtn which represents
// the play button object/element in the index.html
var playBtn = document.querySelector("#play");

// initialize the variable referencing the h2 that shows the timer
var timerEl = document.querySelector(".time");

// initialize the reference to the list element to display underscores or characters
var listEl = document.querySelector("#letterList");

// initialize word array for our set of words to guess
var wordArray = ["elephant", "library", "zebra", "chaos", "javascript", "funny"]; 

// initialize these variables here so we can access them across multiple functions
var hiddenWord;
var hiddenScore;
var secondsLeft = 30;
var timerInterval;

//check to see if localstorage has a win/loss item
//if not, make them, if so initialize them here
var wins, losses = 0;
if (localStorage.getItem("wins") === null) {
    localStorage.setItem("wins", 0);
} else {
    wins = localStorage.getItem("wins");
}
if (localStorage.getItem("losses") === null) {
    localStorage.setItem("losses", 0);
} else {
    losses = localStorage.getItem("losses");
}

// make button eventlistener ("click", func that starts game and timer)
playBtn.addEventListener("click", playGame); 

// Within function (game){
function playGame() {
    //set score to zero
    hiddenScore = 0;

    //set up the hiddenWord array by invoking selectWord function
    //this function selects a word from an array of predetermined words
    hiddenWord = selectWord(wordArray);

    //pass the hiddenWord array into the displayHiddenWord function so
    //we can create the li elements for each letter
    displayHiddenWord(hiddenWord);

    //set the display of the button to none to make room for the underscores
    playBtn.setAttribute("style","display:none;");

    //start timer function
    setTimer();

    //eventlistener (keydown) function - check if letter should show
    document.addEventListener("keydown", checkKeydown);

};

//set timer function
function setTimer() {
    
    //set the max number of seconds
    secondsLeft = 30;

    //set up the timer interval to count down every 1000 milliseconds (1 second)
    timerInterval = setInterval(function() {

        //this is our timer variable, it will subtract one from itself at each interval
        secondsLeft--;

        //every second we should set the text content of the timer element (h2), to the
        //variable seconds left
        timerEl.textContent = secondsLeft;

        //if the time is up
        if(secondsLeft === 0) {
            //invoke the losegame function
            loseGame();
        }

    }, 1000);
};

function checkKeydown(event){
    // initialize variable keyPressed to the key that the user
    // pressed
    var keyPressed = event.key;

    //check to see if this key that was pressed is
    //in our hidden word
    if (hiddenWord.includes(keyPressed)) {

        //if the hidden character is in the word then lets find it with a for loop
        //this will also catch characters that appear multiple times
        for (var i = 0; i < hiddenWord.length; i++) {

            // this if statement checks if the character at this index was the keyPressed
            // it also checks if this key has already been pressed by checking the data state
            if(hiddenWord[i] === keyPressed && listEl.children[i].getAttribute("data-state") === "hidden") {
     
                //set the textContent of the li element to the character
                listEl.children[i].textContent = hiddenWord[i];

                //set the attribute for the li item to be visible
                listEl.children[i].setAttribute("data-state", "visible");

                //increase the score so we can know if the player has won
                hiddenScore++;
            }
        }
    }

    //at the end of every key press we check to see if the player won
    if (hiddenScore === hiddenWord.length) {
        //invoke the win game function!!
        winGame();
    }
};

//this function will select a word for us
//it will also return that word as an array
//with that word's characters at each index
function selectWord(words) {
    return words[Math.floor(Math.random() * words.length)].split('');
};


//this function creates li elements for our word and other important related attributes
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

        // set the textContent to "_" upon initialization
        liArray[i].textContent = "_";
    }
};

// when the user wins, call this function
function winGame() {

    //increment the win count
    wins++;

    //store the number of wins to the local storage
    localStorage.setItem("wins", wins);

    //prevent the alert from bypassing other functions
    setTimeout(function() {
        alert("Good job, you won!\nYou have won " + wins + " times!\n You have lost " + losses + " times.");

        //clean the game board by calling this function
        cleanBoard(hiddenWord);

    }, 10);
    
};

//when the user loses, call this function
function loseGame() {

    //increment the loss counter
    losses++;

    //store the loss count to the local storage
    localStorage.setItem("losses", losses);

    //prevent the alert from bypassing other functions
    setTimeout(function() {
        alert("Times up!! You lost.\nThe word was: " + hiddenWord.join('')+ ".\nYou have won " + wins + " times!\n You have lost " + losses + " times.");

        //clean the game board by calling this function
        cleanBoard(hiddenWord);
    
    }, 10);
    
};

//this function resets the game board essentially
function cleanBoard(arr) {

    //this for loop removes all the children elements of listEl by removing them from the
    //end to the front
    for (var i = arr.length - 1; i >= 0; i--) {
        listEl.children[i].remove();
    } 

    //reset the timer variable
    secondsLeft = 30;

    //update the textContent on the h2
    timerEl.textContent = secondsLeft;

    //stop the timer interval
    clearInterval(timerInterval);

    //bring the play button back into the view/html
    playBtn.setAttribute("style","display:inline;");
}