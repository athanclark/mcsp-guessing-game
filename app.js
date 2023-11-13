function generateRandomNum(){
    // Generates a random integer between 1 and 100
    return Math.floor(Math.random() * (101 - 1)) + 1;
}

var answer = generateRandomNum();

var mainFunction = function mainFunction(){
    // Accepts a number representing the number to try to guess
    // Displays an alert telling them if they were correct, or if they should guess higher or lower
    console.log("answer", answer);
    var guess = Number(prompt('Guess a number between 1 and 100'));
    console.log("guess", guess);
    if (answer > guess){
        alert("Your guess is too low!");
        return false;
    } else if (answer < guess){
        alert("Your guess is too high!");
        return false;
    } else if (answer === guess){
        alert("Correct! Nice guess");
        return true;
    }
};

var outcome;
do {
    outcome = mainFunction();
} while (!outcome)

