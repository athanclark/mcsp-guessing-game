function generateRandomNum(){
    // Generates a random integer between 1 and 100
    return Math.floor(Math.random() * (101 - 1)) + 1;
}

// Called within a function, keeps `scores` hidden from rest of scope
var scoreSystem = (function initStoreScore() {
    // Keys are names, values are number of guesses
    var scores;

    try {
        scores = JSON.parse(decodeURI(window.location.hash).slice(1));
        if (typeof scores !== 'object') {
            throw new Error('URL fragment isn\'t a stringified object!');
        }
    } catch(e) {
        scores = {};
    }

    return {
        set: function setScore(name, score) {
            scores[name] = score;
            window.location.hash = '#' + JSON.stringify(scores);
        },
        get: function getScore(name) {
            return scores[name];
        }
    };
})();

var initializeGame = function initializeGame() {
    var name = demandNonNull(prompt)('Enter your name');
    var answer = generateRandomNum();
    console.log("answer", answer);
    var guesses = [];

    var mainFunction = function mainFunction(){
        var guess = Number(demandNonNull(prompt)('Guess a number between 1 and 100'));
        guesses.push(guess);

        if (answer > guess) {
            alert(`Sorry ${name}, Your guess is too low!`);
        } else if (answer < guess) {
            alert(`Sorry ${name}. Your guess is too high!`);
        } else {
            var guessesExceptLast = guesses.slice(0, guesses.length - 1);
            var notice = `That's Correct ${name}! Nice guess - guesses: ${guessesExceptLast}`;
            var previousScore = scoreSystem.get(name);
            var guessDifference = Math.abs(guesses.length - previousScore);

            if (previousScore === undefined){
                alert(notice);
                scoreSystem.set(name, guesses.length);
            } else if (previousScore < guesses.length) {
                alert(notice + ` Your best score had ${guessDifference} fewer attempts.`);
            } else if (previousScore > guesses.length) {
                alert(notice + ` This score had ${guessDifference} fewer attempts than your old best!`);
                scoreSystem.set(name, guesses.length);
            } else {
                alert(notice + ` You had the same number of guesses as your best attempt!`);
            }
        }

        return answer === guess;
    };

    // Loop each guess
    do {
        var outcome = mainFunction();
    } while (!outcome)
}

// Loop each game
do {
    initializeGame();
    var again = demandNonNull(prompt)('Would you like to play again? (Y/N)');
} while (again === 'Y')



// Will alert if `getter(input)` returns null and try again
function demandNonNull(getter) {
    return function demandNonNullCurry(input) {
        var result = getter(input);
        if (result === null) {
            alert('Hey, you have to enter something!');
            demandNonNull(getter)(input);
        } else {
            return result;
        }
    };
}
