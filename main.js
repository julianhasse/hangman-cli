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
var Word = require('./word.js');
// const getQuote = require("./lib/quoteAPI");
// const logColor = require("./lib/logColor");
// const gameStats = require("./lib/gameStats");

// var Stats = new gameStats();

// ============== Start the game =================== 
startGame(true);

function startGame(firstGame){
    question = {message: "Play another game?", type: "confirm", name: "play"};
            if (firstGame){
              clear();
              console.log("\n\n\n")
              console.log(chalk.yellow(figlet.textSync("         Welcome to", {
                font: 'Sub-zero',
                horizontalLayout: 'fitted',
                verticalLayout: 'fitted'
            })));
              console.log(chalk.blue(figlet.textSync("Hangman", {
                font: 'Blocks',
                horizontalLayout: 'fitted',
                verticalLayout: 'fitted'
            })));
            console.log(chalk.yellow("                                                   Hangman, by Julian Hasse - Version 1.0.0"));
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
      console.log(chalk.blue(figlet.textSync("   Bye Bye", {
        font: 'Sub-zero',
        horizontalLayout: 'fitted',
        verticalLayout: 'fitted'
    })));
    console.log(chalk.blue("           Hangman, by Julian Hasse - Version 1.0.0"));
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
	"nixon", "thread", "typeface", "terminal", "unix", "virus", "workstation", "zip"],
	wordsWon : 0,
	guessesRemaining : 10, //per word
	currentWrd : null, //the word object
	startGame : function (wrd){
		//make sure the user has 10 guesses
		this.resetGuessesRemaining();

		//get a random word from the array
		this.currentWrd = new Word(this.wordBank[Math.floor(Math.random() * this.wordBank.length)]);

		this.currentWrd.getLets(); //populate currentWrd (made from Word constructor function) object with letters
      console.log("Ex US President Last Names List\n" + game.wordBank.toString() + " \n\n");
      console.log("Welcome to US ex-Presidents Hangman!\nGuess from all the ex presidents' last names. (use all lower case)");
      console.log(this.currentWrd.wordRender() + '\n');
  		
		
		this.keepPromptingUser();

	}, 
	resetGuessesRemaining : function(){
		this.guessRemaining = 10;
	},
	keepPromptingUser : function(){
		var self = this;

		prompt.get(['guessLetter'], function(err, result) {
		    // result is an object like this: { guessLetter: 'f' }
		    //console.log(result);
		    
		    console.log('  The letter or space you guessed is: ' + result.guessLetter);

		    //this checks if the letter was found and if it is then it sets that specific letter in the word to be found
		    var findHowManyOfUserGuess = self.currentWrd.checkIfLetterFound(result.guessLetter);

		    //if the user guessed incorrectly minus the number of guesses they have left
		    if (findHowManyOfUserGuess == 0){
		    	console.log('Even Trump can guess better than that. Try another letter.');
		    	self.guessesRemaining--;
		    } else {
		    	console.log('You\'re wrong #alternativeFacts.  True Fact = Good Job keep going!');

		    	//check if you win only when you are right
	    		if(self.currentWrd.didWeFindTheWord()){
			    	console.log('You Won! The president was ' + self.currentWrd.word);
  					console.log('You are great at making this game great again and again!!!!!');
			    	return; //end game
			    }
		    }
		    
		    console.log('Guesses remaining: ', self.guessesRemaining);
		    console.log(self.currentWrd.wordRender());
		    console.log('here are the letters you guessed already: ');

		    if ((self.guessesRemaining > 0) && (self.currentWrd.found == false)){
		    	self.keepPromptingUser();
		    }
		    else if(self.guessesRemaining == 0){
		    	console.log('You lost! The president was', self.currentWrd.word);
 			    console.log('Why do you hate America? :( You should have memorized all of your presidents like that weird kid in 3rd grade!');
		    } else {
		    	console.log(self.currentWrd.wordRender());
		    }
		});
	}


};

