function generateRandomNum(){
    // Generates a random integer between 1 and 100
    return Math.floor(Math.random() * (101 - 1)) + 1;
}
// Keys are names, values are number of guesses
var scores = {};

var initializeGame = function initializeGame() {
    var name = prompt('Enter your name');
    var answer = generateRandomNum();
    var guesses = [];

    var mainFunction = function mainFunction(){
        // Accepts a number representing the number to try to guess
        // Displays an alert telling them if they were correct, or if they should guess higher or lower
        console.log("answer", answer);
        var guess = Number(prompt('Guess a number between 1 and 100'));
        guesses.push(guess);
        console.log("guess", guess);
        if (answer > guess){
            alert(`Sorry ${name}, Your guess is too low!`);
            return false;
        } else if (answer < guess){
            alert(`Sorry ${name}. Your guess is too high!`);
            return false;
        } else if (answer === guess){
            if (scores[name] === undefined){
                alert(`That's Correct ${name}! Nice guess - guesses: ${guesses.slice(0, guesses.length - 1)}`);
                scores[name] = guesses.length
            } else if (scores[name]=== guesses.length){
                alert(`That's Correct ${name}! Nice guess - guesses: ${guesses.slice(0, guesses.length - 1)} You had the same number of guesses as your best attempt!`);
            } else if (scores[name] < guesses.length){
                alert(`That's Correct ${name}! Nice guess - guesses: ${guesses.slice(0, guesses.length - 1)} Your best score had ${guesses.length - scores[name]} fewer attempts.`);
            } else if (scores[name] > guesses.length){
                alert(`That's Correct ${name}! Nice guess - guesses: ${guesses.slice(0, guesses.length - 1)} This score had ${scores[name] - guesses.length} fewer attempts than your old best!.`);
                scores[name] = guesses.length
            }
            return true;
        }
    };

    do {
        var outcome = mainFunction();
    } while (!outcome)
}

do {
    initializeGame();
    var again = prompt('Would you like to play again? (Y/N)');
} while (again === 'Y')
