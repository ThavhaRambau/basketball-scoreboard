let homeScore = 12;
let guestScore = 0;
let timeLeft = 60;
let isTimerRunning = true;

const homeScoreEl = document.getElementById("homeScore");
const guestScoreEl = document.getElementById("guestScore");
const timerEl = document.getElementById("timer");
const resetBtn = document.getElementById("reset");
const pauseBtn = document.getElementById("pause");
const startBtn = document.getElementById("start");

// Buttons for HOME and GUEST scoring (excluding control buttons)
const scoreButtons = document.querySelectorAll("button:not(#reset):not(#pause):not(#start)");

// Handle score changes
scoreButtons.forEach(button => {
    button.addEventListener("click", () => {
        const value = parseInt(button.textContent);
        const parent = button.parentElement;

        if (parent.querySelector("h3").textContent === "HOME") {
            homeScore += value;
            homeScoreEl.textContent = homeScore;
        } else {
            guestScore += value;
            guestScoreEl.textContent = guestScore;
        }
        
        // Highlight the leading team
        highlightLeader();
    });
});

// Countdown timer
let timerInterval = setInterval(updateTimer, 1000);

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timerEl.textContent = `Time Left: ${timeLeft}s`;
    } else {
        clearInterval(timerInterval);
        timerEl.textContent = "Time's up!";
        isTimerRunning = false;
        highlightWinner();
    }
}

// Highlight the team that's currently winning
function highlightLeader() {
    homeScoreEl.style.color = homeScore > guestScore ? "green" : "red";
    guestScoreEl.style.color = guestScore > homeScore ? "green" : "red";
}

// Highlight the winner when time runs out
function highlightWinner() {
    if (homeScore > guestScore) {
        homeScoreEl.style.color = "gold";
        homeScoreEl.style.fontSize = "2.5rem";
    } else if (guestScore > homeScore) {
        guestScoreEl.style.color = "gold";
        guestScoreEl.style.fontSize = "2.5rem";
    }
}

// Reset functionality
resetBtn.addEventListener("click", () => {
    // Reset scores
    homeScore = 0;
    guestScore = 0;
    homeScoreEl.textContent = homeScore;
    guestScoreEl.textContent = guestScore;
    
    // Reset styles
    homeScoreEl.style.color = "red";
    guestScoreEl.style.color = "red";
    homeScoreEl.style.fontSize = "";
    guestScoreEl.style.fontSize = "";
    
    // Reset timer
    timeLeft = 60;
    clearInterval(timerInterval);
    timerEl.textContent = `Time Left: ${timeLeft}s`;
    timerInterval = setInterval(updateTimer, 1000);
    isTimerRunning = true;
});

// Pause functionality
pauseBtn.addEventListener("click", () => {
    if (isTimerRunning) {
        clearInterval(timerInterval);
        isTimerRunning = false;
        timerEl.textContent = `Paused: ${timeLeft}s`;
    }
});

// Start functionality
startBtn.addEventListener("click", () => {
    if (!isTimerRunning && timeLeft > 0) {
        timerInterval = setInterval(updateTimer, 1000);
        isTimerRunning = true;
        timerEl.textContent = `Time Left: ${timeLeft}s`;
    }
});

// Initialize
highlightLeader();