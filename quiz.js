//QUIZ JAVASCRIPT 
// Correct answers object
const answers = {
  q1: "1983",                  // Fill-in-the-blank answer
  q2: "a",                     // Question 2 correct option
  q3: "b",                     // Question 3 correct option
  q4: "c",                     // Question 4 correct option
  q5: ["Nintendo", "Sega"]     // Question 5 correct checkboxes
};

// Function to evaluate the quiz
function checkQuiz(event) {
  event.preventDefault(); // Prevent default form submission
  let score = 0;          // Initialize score counter
  let results = "<h2>Results</h2>"; // HTML string for results

  // QUESTION 1: Fill-in-the-blank
  const q1 = document.querySelector("input[name='q1']").value.trim();
  const correct1 = q1 === answers.q1; // Compare with correct answer
  if (correct1) score++;
  results += `<p><strong>1.</strong> ${correct1 ? "Correct" : "Incorrect"} 
              (Your answer: ${q1 || "none"}) — Correct: ${answers.q1}</p>`;

  // QUESTIONS 2-4: Multiple-choice questions
  ["q2","q3","q4"].forEach((q, i) => {
    const user = document.querySelector(`input[name='${q}']:checked`)?.value || "none"; // Get user selection
    const correct = user === answers[q];
    if (correct) score++;
    results += `<p><strong>${i+2}.</strong> ${correct ? "Correct" : "Incorrect"} 
                (Your answer: ${user}) — Correct: ${answers[q]}</p>`;
  });

  // QUESTION 5: Multi-select checkboxes
  const selected = [...document.querySelectorAll("input[name='q5']:checked")].map(x => x.value);
  const correct5 = JSON.stringify(selected.sort()) === JSON.stringify(answers.q5.sort()); // Compare arrays
  if (correct5) score++;
  results += `<p><strong>5.</strong> ${correct5 ? "Correct" : "Incorrect"} 
              (Your answers: ${selected.join(", ") || "none"}) — Correct: ${answers.q5.join(", ")}</p>`;

  // Display total score and pass/fail
  results += `<h3>Total Score: ${score}/5</h3>`;
  results += `<h3 style="color:${score>=3?'green':'red'}">${score>=3?'PASS':'FAIL'}</h3>`;

  // Insert results into the page
  document.getElementById("results").innerHTML = results;
}

// Attach event listener to the quiz form for submission
document.getElementById("quizForm").addEventListener("submit", checkQuiz);

// Attach event listener to reset button to clear form and results
document.getElementById("resetBtn").addEventListener("click", () => {
  document.getElementById("quizForm").reset();       // Clear all input fields
  document.getElementById("results").innerHTML = ""; // Clear previous results
});
