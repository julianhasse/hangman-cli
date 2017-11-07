var Letter = function(char) {
	this.charac = char;
	this.appear = false;
	this.letterRender = function() {
		return !(this.appear) ? " _ " : this.charac;
	};
};

// ========= Exports ================
module.exports = Letter;

