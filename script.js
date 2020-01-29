var startButton = document.querySelector("#startButton");
var headerText = document.querySelector("#header-text");
var openingText = document.querySelector("#opening-text");
var buttonSet = document.querySelector("#button-set");
//include question.js

var quizDone = false;

var questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["\"quotes\"", "{curly brackets}", "(parentheses)", "[square brackets]"],
      answer: "(parentheses)"
    },
    {
      title: "Arrays in JavaScript can be used to store ____.",
      choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
      answer: "all of the above"
    },
    {
      title: "String values must be enclosed within ____ when being assigned to variables.",
      choices: [",commmas,", "{curly brackets}", "\"quotes\"", "(parentheses)"],
      answer: "\"quotes\""
    },
    {
      title: "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["JavaScript", "terminal / bash", "for loops", "console log"],
      answer: "console log"
    }
    ///etc.
  ];

var currentQuestion = 1;



/*----------------------Start Page----------------------*/



startButton.addEventListener("click", start_quiz); //allow start button to begin the quiz
function start_quiz(){
    startTimer();
    clear_screen();
    //openingText.textContent = "";
    currentQuestion = 0;
    quizDone = false;
    display_question(currentQuestion);
}

function display_startpage(){
    clear_screen();

    headerText.textContent = "Coding Quiz Challenge";
    openingText.textContent = "Try to answer the following questions within the time limit. Wrong answers will deduct time, so think carefully!";
    openingText.setAttribute("style", "text-align:center");

    startButton = document.createElement("button")
    startButton.textContent = "Start";
    startButton.setAttribute("class", "btn btn-primary");
    buttonSet.appendChild(startButton);
    startButton.addEventListener("click", start_quiz);

    //center header text and button
    headerText.setAttribute("style", "text-align: center");
    buttonSet.setAttribute("style", "text-align: center");
}



/*----------------------Questions----------------------*/



function display_question(index){
    clear_screen(); //clear screen
    headerText.textContent = questions[index].title; //display question text

    for (var i = 0; i < questions[index].choices.length; i++){ //create choice buttons
        var newButton = document.createElement("button");
        newButton.textContent = questions[index].choices[i];
        newButton.setAttribute("class", "btn btn-primary");
        buttonSet.appendChild(newButton);
        buttonSet.appendChild(document.createElement("br")); //add line break
        if (questions[index].choices[i] === questions[index].answer){ //if this button is the correct answer...
            newButton.addEventListener("click", proceed_question_correct); //add trigger to the proceed correct function
        }
        else{
            newButton.addEventListener("click", proceed_question_wrong); //if it's not correct, add trigger to the proceed wrong function
        }
    }
    //left-align header text and button
    headerText.setAttribute("style", "text-align: left");
    buttonSet.setAttribute("style", "text-align: left");
}

function proceed_question_correct(){
    alert("correct!"); //display "correct!" message

    currentQuestion++; //proceed to next question
    if (currentQuestion >= questions.length){ //if we've reached the end of the quiz...
        quizDone = true; //mark quiz as done
        //go to highscore entry page
        display_highscore_entry();
    }
    else{
        display_question(currentQuestion); //display next question
    }
}

function proceed_question_wrong(){
    
    alert("wrong! Time reduced by 15 seconds!"); //display "wrong!" message
    secondsRemaining -= 15; //decrement timer

    currentQuestion++; //proceed to next question
    if (currentQuestion >= questions.length){ //if we've reached the end of the quiz...
        quizDone = true; //mark quiz as done
        //display_highscore_entry(); //go to highscore entry page
    }
    else{
        display_question(currentQuestion); //display next question
    }
}



/*----------------------Timer----------------------*/



var secondsRemaining = 0; //this will count downwards
var interval;

var timeDisplay = document.querySelector("#timeDisplay");

function startTimer() {
    setTime();
  
    interval = setInterval(function() {
        secondsRemaining--;
        renderTime();
    }, 1000);
}

function setTime(){
    clearInterval(interval);
    secondsRemaining = questions.length * 15;
}

function renderTime(){
    timeDisplay.textContent = "Time: " + secondsRemaining;

    if (quizDone == true || secondsRemaining <= 0) { //if we finish the quiz, or we run out of time...
        clearInterval(interval); //stop the timer
        timeDisplay.textContent = ""; //hide the timer
        display_highscore_entry(); //proceed to high score entry page
    }
}



/*----------------------High Scores----------------------*/



//items for the high score entry form. we build it here, then display once it's needed
var highScoreForm = document.querySelector("#highScoreForm");
highScoreForm.setAttribute("style", "text-align: left");

var highScoreLabel = document.createElement("label");
highScoreLabel.setAttribute("for", "initials");
highScoreLabel.textContent = "Enter Initials: ";

var highScoreTextEntry = document.createElement("input");
highScoreTextEntry.setAttribute("type", "text");
highScoreTextEntry.setAttribute("name", "initials");
highScoreTextEntry.setAttribute("id", "initials");

var highScoreSubmitBtn = document.createElement("button");
highScoreSubmitBtn.setAttribute("class", "btn btn-primary");
highScoreSubmitBtn.textContent = "Submit";
highScoreSubmitBtn.addEventListener("click", add_highscore);

//items for the high score board
var goBackButton = document.createElement("button");
goBackButton.setAttribute("class", "btn btn-primary");
goBackButton.textContent = "Go Back";
goBackButton.addEventListener("click", display_startpage);

var clearHighScoresBtn = document.createElement("button"); //this button lets us clear out the high score board
clearHighScoresBtn.setAttribute("class", "btn btn-primary");
clearHighScoresBtn.textContent = "Clear Highscores";
clearHighScoresBtn.addEventListener("click", clear_highscores);

localStorage.setItem("scoreboard", JSON.stringify([])); //this will be a list to store our scores

var scoreboardDisplay = document.querySelector("#scoreboardDisplay");

function display_highscore_entry(){
    clear_screen(); //clear screen

    headerText.textContent = "All Done!";
    openingText.textContent = "Your final score is " + secondsRemaining;
    openingText.setAttribute("style", "text-align:left");

    //display form for adding a highscore
    highScoreForm.appendChild(highScoreLabel);
    highScoreForm.appendChild(highScoreTextEntry);
    highScoreTextEntry.value = ""; //prevent previously entered value from lingering on repeat plays
    highScoreForm.appendChild(highScoreSubmitBtn);
}

function add_highscore(){
    var initials = highScoreTextEntry.value;
    var score = secondsRemaining;

    var highScore = {
        myInitials: initials,
        myScore: score
    }

    var scoreboard = JSON.parse(localStorage.getItem("scoreboard")); //grab current scoreboard
    scoreboard.push(highScore); //add in this new score

    localStorage.setItem("scoreboard", JSON.stringify(scoreboard)); //save our altered scoreboard into local storage

    //console.log(JSON.parse(localStorage.getItem("scoreboard")));
    //console.log(secondsRemaining);

    display_highscores();
}

function display_highscores(){
    clear_screen(); //clear screen
    
    quizDone = true; //cancels the quiz if the user goes to this screen during the quiz

    headerText.textContent = "High Scores";

    sort_highscores();

    //display highscore list
    var scoreboard = JSON.parse(localStorage.getItem("scoreboard"));
    for (var i = 0; i < scoreboard.length; i++){
        var newScore = document.createElement("div");
        newScore.textContent = "" + (i + 1) + ". " + scoreboard[i].myInitials + " - " + scoreboard[i].myScore;
        var divider = document.createElement("hr");
        scoreboardDisplay.appendChild(newScore);
        scoreboardDisplay.appendChild(divider);
    }
    scoreboardDisplay.appendChild(goBackButton); //This button lets us return to the start screen.
    scoreboardDisplay.appendChild(clearHighScoresBtn);
}

//note: sort doesn't seem to be working correctly?
function sort_highscores(){
    var scoreboard = JSON.parse(localStorage.getItem("scoreboard"));
    for(var i = 0; i < scoreboard.length; i++){ //for each placement in the board...
        for(var j = i + 1; j < scoreboard.length; j++){ //check it against every other placement
            if (scoreboard[j].myScore > scoreboard[i].myScore){ //if a placement later in the list is higher (e.g. if rank 3 has higher score than rank 2)
                var temp = scoreboard[i]; //hold one value so we don't lose it...
                scoreboard[i] = scoreboard[j]; //and switch the values
                scoreboard[j] = temp;
            }
        }
    }
    localStorage.setItem("scoreboard", JSON.stringify(scoreboard)); //save our altered scoreboard into local storage
}

function clear_highscores(){
    localStorage.clear();
    localStorage.setItem("scoreboard", JSON.stringify([])); //this will be a list to store our scores
    display_highscores();
}




/*----------------------General Use----------------------*/

var viewHighscoresBtn = document.querySelector("#viewHighscoresBtn");
viewHighscoresBtn.textContent = "View Highscores";
viewHighscoresBtn.addEventListener("click", display_highscores);

function clear_screen(){
    //clears out the screen in preparation to display something else
    headerText.textContent = "";
    openingText.textContent = "";
    buttonSet.innerHTML = "";
    highScoreForm.innerHTML ="";
    scoreboardDisplay.innerHTML = "";
}

