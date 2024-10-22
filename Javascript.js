// Get the 'Add Answer Choice' button and the 'ul' container inside the question container
var answer_choice_button = document.getElementById('answer-choice-btn');
var question_container = document.querySelector('.question-container ul');  // Select the ul inside .question-container

// Handles intended functionality for the add answer choice button
answer_choice_button.addEventListener('click', function() {
    // The HTML for the new answer choice
    var code = `<li>
                    <div class="input-wrapper">
                        <input type="text" placeholder="Type possible answer here">
                        <button class='correct-btn'>Select as correct</button>
                    </div>
                </li>`;

    // Append the new answer choice to the 'ul' container
    question_container.innerHTML += code;
});

// Event delegation: Attach a single event listener to the 'ul' container
question_container.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('correct-btn')) {
        correct_btn_clicked(event.target);  // Pass the clicked button
    }
});

// Handle turning the button green on and off
function correct_btn_clicked(button) {
    if (button.isGreen === undefined) {
        button.isGreen = true;  // Initialize the flag if it's not set
    }
    // Toggle the button's background color based on the flag
    if (button.isGreen) {
        button.style.backgroundColor = 'rgb(52, 235, 82)';
        button.style.border = '2px solid rgb(52, 235, 82)';
        button.style.color = 'black';
    } else {
        button.style.backgroundColor = 'rgb(3, 161, 252)';
        button.style.border = '2px solid rgb(3, 161, 252)';
        button.style.color = 'black';
    }

    // Flip the value of the flag for the next click
    button.isGreen = !button.isGreen;
}
