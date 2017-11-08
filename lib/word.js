// ========= Imports =============== 
var Letter = require('./letter.js');


// ====== Object Constructor ======
var Word = function(secret){
	this.word = secret;
	this.lets = []; 
	this.found = false;

	this.getLets = () => {
		for (var i = 0; i < this.word.length; i++) {
			this.lets.push(new Letter(this.word[i])); 
		}
	}; //

	this.secretFound = () => {
		this.found = this.lets.every(function(curLet) {
			return curLet.appear;
		});
		return this.found;
	}; // 

	this.checkLetter = (guessLetter) => {
		var whatToReturn = 0;

		for (var i = 0; i < this.lets.length; i++) {
			if (this.lets[i].charac == guessLetter){
				this.lets[i].appear = true;
				whatToReturn++;
			}
		}
		return whatToReturn;
	}; //

	this.wordRender = () => {
		var str = '';

		for (var i = 0 ; i < this.lets.length; i++){
			str += this.lets[i].letterRender();
		}
		return str;
	}; // 
} // 

// ========= Exports =============== 
module.exports = Word;