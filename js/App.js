
const game = new Game();

/** 
 * Listens for click on `#begin-game` and calls startGame() on game object
*/

let begin = document.getElementById('begin-game');
let gameover = document.getElementById('game-over');

begin.addEventListener('click', function() {
    game.startGame();
    this.style.display = 'none';
    document.getElementById('key').style.display = 'none';
    document.getElementById('play-area').style.opacity = '1';
});

//
window.addEventListener('keyup', function() {
    console.log('keyup');
    if (begin.style.display != 'none') {
	    game.startGame();
	    begin.style.display = 'none';
	    document.getElementById('key').style.display = 'none';
	    document.getElementById('play-area').style.opacity = '1';
  	}
});


/** 
 * Listen for keyboard presses
 */
document.addEventListener('keydown', function(event){
  game.handleKeydown(event);
});
