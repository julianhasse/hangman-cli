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
	lives : 10, 
	secretWord : null, 
	lettersGuessed : [], 
	startGame : function (wrd){
		
		this.resetGuessesRemaining();

		this.secretWord = new Word(this.wordBank[Math.floor(Math.random() * this.wordBank.length)]);

		this.secretWord.getLets(); 
      console.log(Color.magenta("Get ready!\nGuess the secret computer-related word'."));
      console.log(this.secretWord.wordRender() + '\n');
		
		this.keepPromptingUser();

	}, 
	resetGuessesRemaining : function(){
		this.guessRemaining = 10;
	},
	keepPromptingUser : function(){
		var self = this;

		prompt.get(['letter'], function(err, result) {
		    
		    console.log(`  you typed: ${result.letter}`);

		    //this checks if the letter was found and if it is then it sets that specific letter in the word to be found
		    var findHowManyOfUserGuess = self.secretWord.checkIfLetterFound(result.letter);

		    //if the user guessed incorrectly minus the number of guesses they have left
		    if (findHowManyOfUserGuess == 0){
						self.lettersGuessed.push(result.letter);
						console.log(Color.fail('Ooops. Try another letter.'));
						console.log('\n')
						self.lives--;
		    } else {
						self.lettersGuessed.push(result.letter);
						console.log(Color.success('You are right!'));
						console.log('\n')

		    	//check if you win only when you are right
	    		if (self.secretWord.didWeFindTheWord()){
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
		    
					console.log(Color.magenta('Guesses remaining: ') + Color.yellow(self.lives));
					console.log(self.secretWord.wordRender());
					console.log(Color.magenta('Letters you guessed already: ') + Color.yellow(self.lettersGuessed.join(" - ")));

		    if ((self.lives > 0) && (self.secretWord.found == false)){
		    	self.keepPromptingUser();
		    }
		    else if(self.lives == 0){
					console.log("\n\n")
					console.log(Color.success(figlet.textSync(" You Lost ", {
						font: 'Sub-zero',
						horizontalLayout: 'fitted',
						verticalLayout: 'fitted'
				})));
				  console.log("\n\n")
		    	console.log(Color.magenta('The secret word was: ' + Color.yellow(self.secretWord.word)));
		    } else {
		    	console.log(self.secretWord.wordRender());
		    }
		});
	}
};

