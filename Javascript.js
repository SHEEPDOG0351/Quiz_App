function initializeQuizPage() {
    let quizTitleElement = document.getElementById("quiz-title");
    //--
    let quizTitle = sessionStorage.getItem("QuizTitle"); // retrieves data from browser
    quizTitleElement.textContent = quizTitle;
    //--
    let questionCount = document.getElementById("question-count");
    // let optionTitle = document.querySelectorAll(".option-title");
    let nextbtn = document.getElementById("next");
    let prevbtn = document.getElementById("previous");
    let resetbtn = document.getElementById("resetbtn");
    let count = 1;
    let points = 0;
    resetbtn.addEventListener("click", function () {
      //reloads the page
      location.reload();
    });
    nextbtn.addEventListener("click", function () {
      //question counter up
      count++;
      questionCount.textContent = "Question " + count;
    });
    prevbtn.addEventListener("click", function () {
      //question counter down and doesn't let it below '1'
      if (count <= 1) {
        alert(`You are at the beginning of the quiz`);
      } else {
        count--;
        questionCount.textContent = "Question " + count;
      }
    });
  let possibleAnswerTitle = Array.from(document.getElementsByClassName("option-title"));
  let possibleAnswers = JSON.parse(sessionStorage.getItem("PossibleAnswers").split(',')); //converts string back into an array
  possibleAnswerTitle.forEach((element, index) => {element.textContent = possibleAnswers[index];
    
  });
}
  // ---------------------------------------------------- Index.html javascript below -----------------------------------------------------------------
  function initializeQuestionPage() {
    let answerChoiceCount = 2; //counts how many questions tthere are
    // Get the 'Add Answer Choice' button and the 'ul' container inside the question container
    var answer_choice_button = document.getElementById("answer-choice-btn");
    var question_container = document.querySelector(".question-container ul"); // Select the ul inside .question-container
    let correct_answers = []
  
    // Handles intended functionality for the add answer choice button
    answer_choice_button.addEventListener("click", function () {
      if (answerChoiceCount < 4) {
        //
        // The HTML for the new answer choice
        var code = `<li>
                      <div class="input-wrapper">
                          <input type="text" placeholder="Type possible answer here">
                          <button id="data-question-id" class='correct-btn'>Select as correct</button>
                      </div>
                  </li>`;
  
        // Append the new answer choice to the 'ul' container
        question_container.innerHTML += code;
        answerChoiceCount++;
      } else {
        // won't allow user to add more options  max = 4
        alert("That's enough, buddy!!!");
      }
    });
  
    // Event delegation: Attach a single event listener to the 'ul' container
    question_container.addEventListener("click", function (event) {
      if (event.target && event.target.classList.contains("correct-btn")) {
        correct_btn_clicked(event.target); // Pass the clicked button
      }
    });
  
    // Handle turning the button green on and off
    function correct_btn_clicked(button) {
      if (button.isGreen === undefined) {
        button.isGreen = true; // Initialize the flag if it's not set
      }
      // Toggle the button's background color based on the flag
      if (button.isGreen) {
        button.style.backgroundColor = "rgb(52, 235, 82)";
        button.style.border = "2px solid rgb(52, 235, 82)";
        button.style.color = "black";
      } else {
        button.style.backgroundColor = "rgb(3, 161, 252)";
        button.style.border = "2px solid rgb(3, 161, 252)";
        button.style.color = "black";
      }
  
      // Flip the value of the flag for the next click
      button.isGreen = !button.isGreen;
   }
        //----
  let quizTitleElement = document.getElementById("title");
  let submitbtn = document.getElementById("submit-quiz-btn");
  let possibleAnswerElement = document.getElementsByClassName("possibleAnswer")  
  let possibleAnswerArray;

  //Stores the title info once clicking
  submitbtn.addEventListener("click", function (e) {
    e.preventDefault(); //prevents HTML from submitting form and refreshing page automatically
  
    let quizTitle = quizTitleElement.value;
    possibleAnswerArray = Array.from(possibleAnswerElement).map(element => element.value) //.map to extract the values from html
    sessionStorage.setItem ("PossibleAnswers", JSON.stringify(possibleAnswerArray)); //converts it into aJSON string. Allows it to be stored
    sessionStorage.setItem("QuizTitle", quizTitle); //saves Data into browser
    window.location.href = "Quizpage.html";
  });
  //---
  // First, only starts applying the correct answers in the array once the submit button is pressed. 
  // Mainly just because if people were to switch the correct answers, there would have to be extra code deleting the before correct answer from the array and adding the new one which is just uneccesary.
  document.querySelector('#submit-quiz-btn').addEventListener('click', get_correct_answers)

  function get_correct_answers() {
    let buttons = document.querySelectorAll('.correct-btn');
    let num_correct_buttons = 0
    let correct_buttons = []
    let numerical_position = 0
    let text = ''
    
    for (i = 0; i <= buttons.length; i++) {
        if (buttons.style.backgroundColor == 'rgb(52, 235, 82)') {
            num_correct_buttons++
            correct_buttons.push(buttons[i])
        } else {
            continue
        }
    }
    // Should handle pulling correct buttons associated multiple choice string
    // First, the loop will continue until it reaches the length of the amount of correct buttons
    for (i of correct_buttons) {
        // Get numerical position of currently iterated correct button
        numerical_position = correct_buttons[i]
        // Get actual position now of the currently iterated green correct button
        correct_button_position = buttons[position]
        // Grab text associating with that buttons multiple choice response
        text = correct_button_position.previousElementSibiling.value
        // Push text to the correct_answers array
        correct_answers.push(text)
    }
}
  
  //Checks the current page for the specific ID. If found it will initializes the right functions
  document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("questionAddlink")) {
      initializeQuizPage();
    } else if (document.getElementById("quizAddLink")) {
      initializeQuestionPage();
    }
  });