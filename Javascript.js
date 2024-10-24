function initializeQuizPage() {
  let quizTitleElement = document.getElementById("quiz-title");
  let quizTitle = sessionStorage.getItem("QuizTitle"); // retrieves data from browser
  quizTitleElement.textContent = quizTitle;
  let questionCount = document.getElementById("question-count");
  let nextbtn = document.getElementById("next");
  let prevbtn = document.getElementById("previous");
  let resetbtn = document.getElementById("resetbtn");
  let count = 1;
  resetbtn.addEventListener("click", function () {
      //reloads the page
      location.reload();
  });
  nextbtn.addEventListener("click", function () {
      //question counter up
      count++;
      questionCount.textContent = "Question " + count;
  });
  // Adds event listener
  prevbtn.addEventListener("click", function () {
      //question counter down and doesn't let it below '1'
      if (count <= 1) {
          alert("You are at the beginning of the quiz");
      } else {
          count--;
          questionCount.textContent = "Question " + count;
      }
  });
  // Load possible answers from session storage
  let possibleAnswerTitle = Array.from(document.getElementsByClassName("option-title"));
  let possibleAnswers = JSON.parse(sessionStorage.getItem("PossibleAnswers")); // Converts string back into an array
  possibleAnswerTitle.forEach((element, index) => {
      element.textContent = possibleAnswers[index];
      let questionTitleElement = document.getElementById("question-title");
  let questionTitle = JSON.parse(sessionStorage.getItem("QuestionTitle").split(",")); // brings the QuestionTitle from initializeQuestionPage
  questionTitleElement.textContent = questionTitle;
  });
}

// Display question 

//Getting amount of correct answers from user

let userAnswers = {}; // To store the user's answers, with question IDs as keys

// Assuming each question block has a unique ID like 'question-1', 'question-2', etc.
let questionBlocks = document.querySelectorAll('.question-block');

questionBlocks.forEach((questionBlock) => {
    let questionId = questionBlock.id; // Unique ID of the question (e.g., 'question-1')
    let answerChoices = questionBlock.querySelectorAll('input[name="question"]'); // Radio buttons or checkboxes

    // Add event listeners to each answer choice
    answerChoices.forEach((choice) => {
        choice.addEventListener('change', function() {
            userAnswers[questionId] = this.value; // Store the user's selected answer for the question
            console.log('User selected answer for ' + questionId + ': ' + this.value);
        });
    });
});

// Event Listener added to submit button to then run the calculation of how many questions the user got right 
document.getElementById('submit-quiz-btn').addEventListener('click', function() {
    checkUserAnswers(userAnswers); // Pass the user's answers for comparison
});

// Function to check user answers against correct answers
function checkUserAnswers(userAnswers) {
let correctAnswers = { // Example of correct answers (these should be set dynamically)
    'question-1': 'Answer 1',
    'question-2': 'Answer 3',
    // Add correct answers for each question
};

let score = 0;
for (let questionId in correctAnswers) {
    if (userAnswers[questionId] === correctAnswers[questionId]) {
        score++; // Increment score if the user's answer matches the correct answer
    }
}

console.log(`You scored a ${score}/${userAnswers.length}!`);

}
// ---------------------------------------------------------- Index.html Javascript Below ---------------------------------------------------------------

function initializeQuestionPage() {
  let answerChoiceCount = 2; // Tracks the number of answer choices per question
  let add_button_container = document.querySelector('.add-button-container');
  let correct_answers = [];

  // Attach event listener to the existing "Add Answer Choice" button (for the first question)
  attachAnswerChoiceListener();

  // Handles the creation of a new question
  let new_question_button = document.getElementById('new-question-btn');
  new_question_button.addEventListener('click', function () {
      let newQuestionId = `question-${document.querySelectorAll('.question-block').length + 1}`;

      // Create new question block
      let questionBlock = `
          <div class="question-block" id="${newQuestionId}">
              <input class="question" type="text" placeholder="Type Question Here" />
              <ul class="answer-list">
                  <li>
                      <div class="input-wrapper">
                          <input class="possibleAnswer" type="text" placeholder="Type possible answer here" />
                          <button class="correct-btn">Select as correct</button>
                      </div>
                  </li>
                  <li>
                      <div class="input-wrapper">
                          <input class="possibleAnswer" type="text" placeholder="Type possible answer here" />
                          <button class="correct-btn">Select as correct</button>
                      </div>
                  </li>
              </ul>
              <button class="add_buttons answer-choice-btn">Add Answer Choice Above</button>
          </div>
      `;

      add_button_container.insertAdjacentHTML('beforebegin', questionBlock);

      // Attach event listener to the new question's "Add Answer Choice" button
      attachAnswerChoiceListener();
  });

  // Function to attach event listener to "Add Answer Choice" button
  function attachAnswerChoiceListener() {
      // Select all "Add Answer Choice Above" buttons, including the original and newly added ones
      let allAnswerChoiceButtons = document.querySelectorAll('.answer-choice-btn');

      allAnswerChoiceButtons.forEach((button) => {
          button.removeEventListener('click', addAnswerChoice); // Ensure we remove any previous listener to avoid duplicates
          button.addEventListener('click', addAnswerChoice);
      });
  }

  // Function to handle adding a new answer choice
  function addAnswerChoice(event) {
      let answerList = event.target.closest('.question-block').querySelector('.answer-list');
          let li = document.createElement('li');
          li.innerHTML = `
              <div class="input-wrapper">
                  <input class="possibleAnswer" type="text" placeholder="Type possible answer here" />
                  <button class='correct-btn'>Select as correct</button>
              </div>`;
          answerList.appendChild(li);
          answerChoiceCount++;
  }

  // Event delegation: Attach a single event listener to the body for "Select as correct" buttons
  document.body.addEventListener("click", function (event) {
      if (event.target && event.target.classList.contains("correct-btn")) {
          correct_btn_clicked(event.target); // Pass the clicked button
      }
  });

  // Function to toggle correct answer button
  function correct_btn_clicked(button) {
      if (button.isGreen === undefined) {
          button.isGreen = true; // Initialize the flag if it's not set
      }
      if (button.isGreen) {
          button.style.backgroundColor = "rgb(52, 235, 82)";
          button.style.border = "2px solid rgb(52, 235, 82)";
          button.style.color = "black";
      } else {
          button.style.backgroundColor = "rgb(3, 161, 252)";
          button.style.border = "2px solid rgb(3, 161, 252)";
          button.style.color = "black";
      }
      button.isGreen = !button.isGreen;
  }

  // Getting correct answers in array
  document.querySelector('#submit-quiz-btn').addEventListener('click', get_correct_answers);
  function get_correct_answers() {
      let buttons = document.querySelectorAll('.correct-btn');
      let correct_buttons = [];
      let correct_answers = [];
      buttons.forEach((button, index) => {
          if (button.style.backgroundColor === 'rgb(52, 235, 82)') {
              correct_buttons.push(button);
              let correct_answer_text = button.previousElementSibling.value;
              correct_answers.push(correct_answer_text);
          }
      });

      console.log(correct_answers);  // This array will now hold all the correct answers.
  }

  let quizTitleElement = document.getElementById("title");
  let submitbtn = document.getElementById("submit-quiz-btn");

  // Stores the title and possible answers in session storage on submit
  submitbtn.addEventListener("click", function (e) {
      e.preventDefault(); // Prevents form submission from refreshing the page
      let questionTitleElement = document.getElementsByClassName("question")
      let questionSequenceArray;
      let quizTitle = quizTitleElement.value;
      let possibleAnswerElement = Array.from(document.getElementsByClassName("possibleAnswer")).map(element => element.value);
      questionSequenceArray = Array.from(questionTitleElement).map(element => element.value);
      sessionStorage.setItem ("QuestionTitle",JSON.stringify(questionSequenceArray));
      sessionStorage.setItem("PossibleAnswers", JSON.stringify(possibleAnswerElement));
      sessionStorage.setItem("QuizTitle", quizTitle); // Saves Data into browser
      window.location.href = "Quizpage.html"; // Navigates to the quiz page
  });
}

// Initialize quiz or question page depending on the current page's ID
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("questionAddlink")) {
      initializeQuizPage();
  } else if (document.getElementById("quizAddLink")) {
      initializeQuestionPage();
  }
});