
class Player {
	constructor(name, id, color, active = false) {
		this.name = name;    // Identifies Player
		this.id = id;		// Identifies which player tokens belong to
		this.color = color; // Token color
		this.active = active;  // Tracks whose turn
		this.tokens = this.createTokens(21);    // Holds player's tokens
	}

/**
 * Creates token objects for player
 * @param     {integer}    num - Number of token objects to be created
 * @returns   {Array}     An array of the newly created token objects
 */


	createTokens = (num) => {
		const tokens = [];

		for (let i = 0; i < num; i++) {
			let token = new Token(i, this);
			tokens.push(token);
		}

		return tokens;
	}

	/**
	 * Gets all tokens that have not yet been dropped
	 * @return {array} Array of unused tokens.
	*/
	get unusedTokens() {
		return this.tokens.filter(token => !token.dropped);
	}

	/**
	 * Gets active token, the first token in the unusedTokens array
	 * @return {Object} First token object in unusedTokens array
	*/
	get activeToken() {
		return this.unusedTokens[0];
	}

	/**
	 * Check if player has any undropped tokens remaining
	 * @return {Boolean}
	*/
	checkTokens() {
		return this.unusedTokens.length == 0 ? false : true;
	}
}