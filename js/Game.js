
class Game {
	constructor() {
		this.board = new Board();
		this.players = this.createPlayers();
		this.ready = false;         // Ability to ineract with game
	}

	/**
	 * Gets the active player
	 * @ return {Object}  player - the active player
	*/
	get activePlayer() {
		return this.players.find(player => player.active);
	}

	/** 
	 * Creates two player objects
	 * @return {array}   An array of two Player objects
	*/

	createPlayers() {
		const players = [new Player('Player 1', 1, '#00CED1', true),
									   new Player('Player 2', 2, '#e59a13')];
		return players;		 
	}

	/**
	 *Gets game ready for play and starts the game
	 *Draw game board, draw token, set game to ready
	*/
	startGame() {
		this.board.drawHTMLBoard();
		this.activePlayer.activeToken.drawHTMLToken();
		this.ready = true;
	}

	/** 
	 *Branches code, depending on what key player presses
	 * @param {Object} e - Keydown event object
	*/
	handleKeydown(e) {
		if (this.ready) {
			if (e.key === "ArrowLeft") {
				this.activePlayer.activeToken.moveLeft();
			}

			else if (e.key === "ArrowRight") {
				this.activePlayer.activeToken.moveRight(this.board.columns);
			}

			else if (e.key === "ArrowDown") {
				this.playToken();
			}
		}
	}

	/** 
	 * Finds next available space to drop token, drops token
	*/
	playToken() {
		let spaces = this.board.spaces;
		let activeToken = this.activePlayer.activeToken;
		let targetColumn = spaces[activeToken.columnLocation];
		let targetSpace = null;

		/* Identify next empty space in selected column */
		for (let space of targetColumn) {
			if (space.token === null) {
				targetSpace = space;
			}
		}
		
		/* If targetSpace is null, column is full, do not drop */
		if (targetSpace !== null) {
			const game = this;
			game.ready = false;

			activeToken.drop(targetSpace, function() {
				game.updateGameState(activeToken, targetSpace);
			});
		}
	}

	/** 
 * Checks if there a winner on the board after each token drop.
 * @param   {Object}    Targeted space for dropped token.
 * @return  {boolean}   Boolean value indicating whether the game has been won (true) or not (false)
*/
checkForWin(target){
    const owner = target.token.owner;
    let win = false;

    // vertical
    for (let x = 0; x < this.board.columns; x++ ){
        for (let y = 0; y < this.board.rows - 3; y++){
            if (this.board.spaces[x][y].owner === owner && 
                this.board.spaces[x][y+1].owner === owner && 
                this.board.spaces[x][y+2].owner === owner && 
                this.board.spaces[x][y+3].owner === owner) {
                    win = true;
            }           
        }
    }

    // horizontal
    for (let x = 0; x < this.board.columns - 3; x++ ){
        for (let y = 0; y < this.board.rows; y++){
            if (this.board.spaces[x][y].owner === owner && 
                this.board.spaces[x+1][y].owner === owner && 
                this.board.spaces[x+2][y].owner === owner && 
                this.board.spaces[x+3][y].owner === owner) {
                    win = true;
            }           
        }
    }

    // diagonal
    for (let x = 3; x < this.board.columns; x++ ){
        for (let y = 0; y < this.board.rows - 3; y++){
            if (this.board.spaces[x][y].owner === owner && 
                this.board.spaces[x-1][y+1].owner === owner && 
                this.board.spaces[x-2][y+2].owner === owner && 
                this.board.spaces[x-3][y+3].owner === owner) {
                    win = true;
            }           
        }
    }

    // diagonal
    for (let x = 3; x < this.board.columns; x++ ){
        for (let y = 3; y < this.board.rows; y++){
            if (this.board.spaces[x][y].owner === owner && 
                this.board.spaces[x-1][y-1].owner === owner && 
                this.board.spaces[x-2][y-2].owner === owner && 
                this.board.spaces[x-3][y-3].owner === owner) {
                    win = true;
            }           
        }
    }
    return win;
	}

	/** 
	 * Switches active player
	*/
	switchPlayers() {
		for (let player of this.players) {
			player.active = player.active === true ? false : true;
		}
	}
	
	/** 
	 * Displays game over message
	 * @param {string} message - Game over message     
	*/
	gameOver(message) {
		document.getElementById('game-over').style.display = 'block';
		document.getElementById('game-over').innerHTML =
		 message + '<br /><a href="index.html" id="play-again" >Play Again</a>';
		
//		game.startGame();
	}

	/** 
	 * Updates game state after token is dropped. 
	 * @param   {Object}  token  -  Token that's being dropped
	 * @param   {Object}  target -  Targeted space for dropped token
	*/
	updateGameState (token, target) {
		target.mark(token);
		
		/** 
		 * Check for a win
		 * If win, game over with winner message
		 * If not a win, switch players, check for remaining tokens
		 * If tokens remain, draw token and set game state to ready
		 * If no tokens remain, game over with no tokens message
		*/
		if (!this.checkForWin(target)) {
			
			this.switchPlayers();
		
			if(this.activePlayer.checkTokens()) {
				this.activePlayer.activeToken.drawHTMLToken();
				this.ready = true;
			}

			else {
				this.gameOver('No more tokens');
			}
		}
		else {
			this.gameOver(`${target.owner.name} wins!`);
		}
	}
}

