// ============== External Modules =================== 
const inquirer = require("inquirer"); 
// A collection of common interactive command line user interfaces.
const figlet = require("figlet"); 
// Implements the FIGfont spec in JavaScript.
const clear = require('clear'); 
// Clear the terminal screen if possible.
const prompt = require('prompt');
// Clear the terminal screen if possible.
const chalk = require('chalk');


// ============== Local Modules =================== 
const Word = require('./lib/word.js');
const Color = require("./lib/logColor");


// ============== Game Intro =================== 
startGame(true);

function startGame(firstGame){
    question = {message: "Play another game?", type: "confirm", name: "play"};
            if (firstGame){
              clear();
              console.log("\n\n\n")
              console.log(Color.yellow(figlet.textSync("         Welcome to", {
                font: 'Sub-zero',
                horizontalLayout: 'fitted',
                verticalLayout: 'fitted'
            })));
              console.log(Color.blue(figlet.textSync("Hangman", {
                font: 'Blocks',
                horizontalLayout: 'fitted',
                verticalLayout: 'fitted'
            })));
            console.log(Color.yellow("                                                   Hangman, by Julian Hasse - Version 1.0.0"));
            console.log("\n\n\n")
              question["message"] = "Play new game?";
            }   
  inquirer.prompt(question)
  .then(function(input){
    if (input.play){
      clear();
      game.startGame();
    } else {
      clear();
      console.log("\n\n\n")
      console.log(Color.blue(figlet.textSync("   Bye Bye", {
        font: 'Sub-zero',
        horizontalLayout: 'fitted',
        verticalLayout: 'fitted'
    })));
    console.log(Color.blue("           Hangman, by Julian Hasse - Version 1.0.0"));
    console.log("\n\n\n")
      process.exit();
    }
  }) 
}; 


// ============== Start the game =================== 

prompt.start();

game = {
	wordBank : ["algorithm", "application", "bandwidth", "broadband", "byte", "captcha", "download", "encryption", "flowchart", "freeware", "hyperlink", 
	"interface", "joystick", "kernel", "link", "monitor", "motherboard", "mouse", "multimedia", "network", "node", "output", "offline", 
	"password", "phishing", "piracy", "platform", "podcast", "programmer", "protocol", "queue", "runtime", "scanner", "screenshot", "spreadsheet", 
	"syntax", "thread", "typeface", "terminal", "unix", "virus", "workstation", "zip"],
	wordsWon : 0,
	guessesRemaining : 10, //per word
	currentWrd : null, //the word object
	lettersGuessed : [], // store the letters guessed
	startGame : function (wrd){
		//make sure the user has 10 guesses
		this.resetGuessesRemaining();

		//get a random word from the array
		this.currentWrd = new Word(this.wordBank[Math.floor(Math.random() * this.wordBank.length)]);

		this.currentWrd.getLets(); //populate currentWrd (made from Word constructor function) object with letters
      console.log(Color.magenta("Get ready!\nGuess from our 'Computer vocabulary word List'."));
      console.log(this.currentWrd.wordRender() + '\n');
  		
		
		this.keepPromptingUser();

	}, 
	resetGuessesRemaining : function(){
		this.guessRemaining = 10;
	},
	keepPromptingUser : function(){
		var self = this;

		prompt.get(['letter'], function(err, result) {
		    // result is an object like this: { letter: 'f' }
		    //console.log(result);
		    
		    console.log(`  you typed: ${result.letter}`);

		    //this checks if the letter was found and if it is then it sets that specific letter in the word to be found
		    var findHowManyOfUserGuess = self.currentWrd.checkIfLetterFound(result.letter);

		    //if the user guessed incorrectly minus the number of guesses they have left
		    if (findHowManyOfUserGuess == 0){
					self.lettersGuessed.push(result.letter);
					console.log(Color.fail('Ooops. Try another letter.'));
					console.log('\n')
		    	self.guessesRemaining--;
		    } else {
					self.lettersGuessed.push(result.letter);
					console.log(Color.success('You are right! Keep going...'));
					console.log('\n')

		    	//check if you win only when you are right
	    		if(self.currentWrd.didWeFindTheWord()){
						console.log("\n\n")
						console.log(Color.success(figlet.textSync(" You Won ", {
							font: 'Sub-zero',
							horizontalLayout: 'fitted',
							verticalLayout: 'fitted'
					})));
					console.log("\n\n")
			    	return; //end game
			    }
		    }
		    
		    console.log(Color.magenta('Guesses remaining: ') + Color.yellow(self.guessesRemaining));
		    console.log(self.currentWrd.wordRender());
		    console.log(Color.magenta('Letters you guessed already: ') + Color.yellow(self.lettersGuessed.join(" - ")));

		    if ((self.guessesRemaining > 0) && (self.currentWrd.found == false)){
		    	self.keepPromptingUser();
		    }
		    else if(self.guessesRemaining == 0){
		    	console.log(Color.magenta('You lost! The secret word was: ' + self.currentWrd.word));
		    } else {
		    	console.log(self.currentWrd.wordRender());
		    }
		});
	}


};

