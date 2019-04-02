// -------------------------------------------------
// Description: Contains all javascript for the site.
// -------------------------------------------------

// Simple Helpers
// Swaps document.write with print
function print(html) {document.write(html);}
// Change any elements display style to block
function show(element) {element.style.display = 'block';};
// Change any elements display style to none
function hide(element) {element.style.display = 'none';};

// Global Variables
let questionCounter = 0;    // Keeps track of question number
let score = 0;              // Keeps track of players score
let randomQuestion;         // Keeps the current randomly generated question
// Element Variables
const elementQuiz = document.getElementById("quiz");                          // Stores the main quiz div element
const elementQuestion = document.getElementById("question");                  // Stores each question element
const elementAnswers = document.getElementById("answers");                    // Stores all answer elements
const elementSubmit = document.getElementById("submit");                      // Stores submit button elements
const elementScoreCounter = document.getElementById("scoreCounter");          // Stores score tracker element
const elementQuestionCounter = document.getElementById("questionCounter");    // Stores question tracker element

// Quiz default JavaScript questions as object
// question - Stores the question being asked
// choices - Stores all possible given answers
// correctAnswer - Stores the correct answer that will match one of the choices
const questions = [{
    question: "Inside which HTML element do we put the JavaScript?",
    choices: ["&lt;scripting&gt;", "&lt;javascript&gt;", "&lt;js&gt;", "&lt;script&gt;"],
    correctAnswer: "<script>"
  }, {
    question: "The external JavaScript file must contain the <script> tag.",
    choices: ["false", "true"],
    correctAnswer: "false"
  }, {
    question: "How do you create a function in JavaScript?",
    choices: ["function myFunction()", "function = myFunction()", "function:myFunction()"],
    correctAnswer: "function myFunction()"
  }, {
    question: "How to write an IF statement in JavaScript?",
    choices: ["if (i == 5)", "if i = 5 then", "if i = 5", "if i == 5 then"],
    correctAnswer: "if (i != 5)"
  }, {
    question: "How do you round the number 7.25, to the nearest integer?",
    choices: ["Math.rnd(7.25)", "rnd(7.25)", "round(7.25)", "Math.round(7.25)"],
    correctAnswer: "Math.round(7.25)"
  }, {
    question: "JavaScript is the same as Java.",
    choices: ["True", "False"],
    correctAnswer: "False"
  }, {
    question: "Which event occurs when the user clicks on an HTML element?",
    choices: ["onmouseclick", "onclick", "onmouseover", "onchange"],
    correctAnswer: "onclick"
  }, {
    question: "How does a FOR loop start?",
    choices: ["for (i = 0; i <= 5; i++)", "for i = 1 to 5", "for (i = 0; i <= 5)", "for (i <= 5; i++)"],
    correctAnswer: "for (i = 0; i <= 5; i++)"
}];

const questionAmount = questions.length;    // Gets the original amount of questions before any are removed

// Loads next quiz question from questions object
const generateQuestion = function() {
  // Local variables
  randomQuestion = questions[Math.floor(Math.random()*questions.length)];
/*  console.log(randomQuestion);
  if (typeof randomQuestion == "number") {
    generateQuestion();
  }*/
  // Checks if you are at the end of the quiz
  if ( questionCounter === questions.length ) {
    // Quiz end (Code not finished)
  } else {
    // Creates a question with a set of answers
    elementScoreCounter.textContent = "Score: " + score;
    elementQuestionCounter.textContent = "Question: " + (questionCounter + 1) + " / " + questionAmount;
    elementQuestion.textContent = "Question " + (questionCounter + 1) + " : " + (randomQuestion.question);
    // Loops through choices and creates a button for each
    for ( let i = 0; i < randomQuestion['choices'].length; i++ ) {
      // InnerHTML creates label and radio input from a string
      elementAnswers.innerHTML += ('<label class="button questionOption" onmouseover="buttonHoverIn(this);" onmouseout="buttonHoverOut(this);" onclick="animateButton(this);"><input type="radio" name="buttons" ' + 'value="' + randomQuestion['choices'][i] + '"' + '>' + randomQuestion['choices'][i] + '</label>');
    }
  }
}

// Checks users answer after submit
const checkQuestion = function() {
    // Local variables
    const answerOptions = document.getElementsByName("buttons");                // Stores all answer button elements
    const answerOptionsLength = document.getElementsByName("buttons").length;   // Stores the amount of answer buttons (Length)
    const correctAnswer = randomQuestion['correctAnswer'];                      // Stores the current correct answer
    const error = document.getElementById("errorMessage");                      // Stores the erro message element
    let notchecked = 0;                                                         // Stores how many of the buttons were not checked
    // Loops through how ever many answer buttons there are
    for ( let i = 0; i < answerOptionsLength; i++ ) {
      // Checks if any buttons are set to true
      if ( answerOptions[i].checked === true ) {
        // Compares correct answer to what the user selected
        if ( answerOptions[i].value == correctAnswer ){
          // Adds 1 point if user is correct and displays it
          score += 1;
          elementScoreCounter.textContent = "Score: " + score;
        } else {
          // Remove 1 point if user is not correct and displays it
          score += 1;
          elementScoreCounter.textContent = "Score: " + score;
        }
      } else {
        // Adds 1 to buttons not checked
        notchecked++;
      }
    }

    // Checks if user has inputted anything
    if (notchecked == answerOptionsLength) {
      // Wipes generated question to regenerate
      elementQuestion.textContent = "";
      elementAnswers.textContent = "";
      // Adds error message
      error.textContent = "Error: no input detected, select an answer and try again...";
      // Generates question again
      generateQuestion();
    } else {
      // Finds the randomly selected questions index and removes it from question array
      let selectedQuestion = questions.indexOf(randomQuestion);
      questions.splice(selectedQuestion, 1);
      // Updates counter and generates next question
      questionCounter = questionCounter + 1;
      error.textContent = "";
      elementQuestion.textContent = "";
      elementAnswers.textContent = "";
      // Generates next question
      generateQuestion();
    }
}
// Adds/remove classes for animation
const animateButton = function(e) {
  e.classList.remove('hover');
  e.classList.remove('animate');
  e.classList.add('animate');
  // Adds a small delay before removing
  setTimeout(function(){
    e.classList.remove('animate');
  }, 2000);
};
// Button hover effect in
const buttonHoverIn = function (e) {
  e.classList.add("hover");
}
// Button hover effect out
const buttonHoverOut = function (e) {
  e.classList.remove("hover");
}
// Delayed Start button click
const delayedStartButtonClick = function(button, content = null) {
  button.style.cursor = "default";
  // Adds a small delay
  setTimeout(function(){
    hide(button);
    show(content);
    generateQuestion();
  }, 1700);
}
// Delayed Submit button click
const delayedSubmitButtonClick = function(button, content = null) {
  button.style.cursor = "default";
  // Adds a small delay
  setTimeout(function(){
    checkQuestion();
  }, 1000);
}
// Reloads page
const reload = function () {
  // Adds a small delay
  setTimeout(function(){
    location.reload()
  }, 1550);
}
// Checks radio button for any changes
elementAnswers.addEventListener( "change", ( evt ) => {
  // Local variables
  let target = evt.target;                    // Stores target
  let targetParent = target.parentElement;    // Stores targets parent
  // Finds all answer buttons
  if ( target.type === "radio" && targetParent && targetParent.tagName.toLowerCase() === "label" ) {
    let prior = elementAnswers.querySelector( 'label.checked input[name="' + target.name + '"]' );
    if ( prior ) {
      // Removes class if deselected
      prior.parentElement.classList.remove( "checked" );
    }
    // Adds class if selected
    targetParent.classList.add( "checked" );
  }
}, false );
