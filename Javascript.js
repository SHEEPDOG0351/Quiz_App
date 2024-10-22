let questionCount = document.getElementById("question-count");
let optionTitle = document.querySelectorAll(".option-title");
let nextbtn = document.getElementById("next");
let prevbtn = document.getElementById("previous");
let resetbtn = document.getElementById('resetbtn')
let count = 1;
resetbtn.addEventListener("click", function(){ //reloads the page
    location.reload()
})
nextbtn.addEventListener("click", function () {
  //question counter up
  count++;
  questionCount.innerHTML = "Question" + " " + count;
});
prevbtn.addEventListener("click", function () {
  //question counter down and doesn't let it below '1'
  if (count <= 1) {
    alert(`You are at the beginning of the quiz`);
  } else {
    count--;
    questionCount.innerHTML = "Question" + " " + count;
  }
});
optionTitle.forEach((option) => {
optionTitle.innerHTML = 
});
// ---------------------------------------------------- Index.html javascript below -----------------------------------------------------------------
