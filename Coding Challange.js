/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

	


var scores, roundScore, activePlayer, dice1, previousRoll, gamePlaying;

init();





document.querySelector('.btn-roll').addEventListener('click', function() {
	if(gamePlaying) {
		//1. Random no.
		dice1 = Math.floor(Math.random() * 6) + 1;

		//2. Display the Result
		var diceDOM = document.querySelector('.dice1');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice1 + '.png';


		//3. Update the round score but only if the rolled NO. was NOT a 1 or two consecutive 6
		if (dice1 === 6 && previousRoll === 6) {
			// Player looses score
			scores[activePlayer] = 0;
		document.querySelector('#score-' + activePlayer).textContent = '0';
		nextPlayer();

		} else if (dice1 !== 1) {
			//Add score
			roundScore += dice1;     //i.e., roundScore = rondScore + dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			//Next player
			nextPlayer();
		}

		//4. Last Roll score!
	     previousRoll = dice1;
			

	 }
	
});


document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		//Add CURRENT score to Global score
		scores[activePlayer] += roundScore;

		// Update UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		var input = document.getElementById('max-score').value;
		//alert('Winnig Score is ' + input);
		var winningScore;

		// Undefined, 0, null or "" are COERCED to false
		//  Anything else is True

		if (input) {
			winningScore = input;
		} else {
			winningScore = 100;
		}
	    

		// Check if Player won the Game!
		if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice1').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
		} else {
		nextPlayer();
		}	
	}
	
});


function nextPlayer() {

	activePlayer === 0? activePlayer = 1 : activePlayer = 0;
		roundScore = 0;

		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';

		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		//document.querySelector('.player-0-panel').classList.remove('active');
		//document.querySelector('.player-1-panel').classList.add('active');

		document.querySelector('.dice1').style.display = 'none';
		document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;
	previousRoll = 0;
	gamePlaying = true;

	document.querySelector('.dice1').style.display = 'none';
	document.querySelector('.dice2').style.display = 'none';

	document.getElementById('score-0').textContent= '0';
	document.getElementById('current-0').textContent= '0';
	document.getElementById('score-1').textContent= '0';
	document.getElementById('current-1').textContent= '0';

	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}



