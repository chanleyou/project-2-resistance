const socket = io();

const parseCookie = (cookieString) => {

	let output = {};

	let cookies = cookieString.split('; ');

	for (let i in cookies) {
		let array = cookies[i].split("=");
		output[array[0]] = array[1];
	}
	return output;
}

const updateScores = (lobby, thisPlayer) => {

	let request = new XMLHttpRequest();

	request.addEventListener("load", function () {

		let points = JSON.parse(this.responseText);

		while (scoreboard.firstChild) {
			scoreboard.removeChild(scoreboard.firstChild);
		}
		let rtPts = 0;
		let spPts = 0;

		for (let i in points) {
			let point = document.createElement('span');
			point.classList.add('badge', 'mr-1');
			scoreboard.appendChild(point);

			if (points[i].success) {
				point.innerHTML = `S`;
				point.classList.add('bg-success', 'text-white');

				rtPts++;
			} else {
				point.innerHTML = `F <span class="badge badge-light" style='padding:  1px 2px'>${points[i].fail_votes}</span>`;
				point.classList.add('bg-danger', 'text-white');

				spPts++;
			}
		}

		if (rtPts >= 3) {
			gameStatus.textContent = "The Resistance has won!";
			if (thisPlayer.role === 'Resistance') {
				phaseLine.textContent = "Good job!";
			} else {
				phaseLine.textContent = "Better luck next time...";
			}
		} else if (spPts >= 3) {
			gameStatus.textContent = "The Spies have won!";
			if (thisPlayer.role === 'Sp	ies') {
				phaseLine.textContent = "Good job!";
			} else {
				phaseLine.textContent = "Better luck next time...";
			}
		}
	})

	request.open("GET", `/lobbies/${lobby.id}/points`);
	request.send();
}

const choosePlayerForm = (lobby, players) => {

	let chooseForm = document.querySelector('#chooseForm');
	chooseForm.classList.remove('d-none');

	let missionId = document.createElement('input');
	missionId.name = 'mission_number';
	missionId.value = lobby.mission;
	missionId.type = 'hidden';
	chooseForm.appendChild(missionId);

	let leader = document.createElement('input');
	leader.name = 'leader';
	leader.value = lobby.current_player;
	leader.type = 'hidden';
	chooseForm.appendChild(leader);

	const populate = (element, name) => {

		element.classList.add('form-control', 'my-1');
		element.name = name;
		element.required = 'required';
		chooseForm.appendChild(element);
		let defaultChoice = document.createElement('option');
		defaultChoice.value = "";
		defaultChoice.textContent = "Choose player...";
		defaultChoice.selected = 'true';
		element.appendChild(defaultChoice);

		for (let i in players) {
			let option = document.createElement('option');
			option.textContent = `${players[i].player_number} ${players[i].name}`;
			option.value = players[i].player_number;
			element.appendChild(option);
		}
	}

	let selectOne = document.createElement('select');
	populate(selectOne, 'choiceOne');
	let selectTwo = document.createElement('select');
	populate(selectTwo, 'choiceTwo');

	if (lobby.mission === 2 || lobby.mission === 4 || lobby.mission === 5) {
		let selectThree = document.createElement('select');
		populate(selectThree, 'choiceThree');
	}

	submitButton = document.createElement('button');
	submitButton.type = 'submit';
	submitButton.classList.add('btn', 'btn-primary', 'my-1');
	submitButton.textContent = 'Submit';
	chooseForm.appendChild(submitButton);
}

// central function that decides what to show 
// called upon by updateGame
const gameLogic = (cookies, lobby, players,	mission, votes, outcomes) => {

	let thisPlayer = {};

	// player array where player_number = index of array, makes listing players easier
	let playerList = [null];

	for (let i in players) {

		playerList.push(players[i]);

		if (cookies.userid == players[i].user_id) {
			thisPlayer = players[i];
		}
	}

	updateScores(lobby, thisPlayer);

	let fellowSpy = {};

	if (thisPlayer.role === 'Spies') {
		for (let i in players) {
			if (players[i].role === 'Spies' && players[i].user_id !== thisPlayer.user_id) {
				fellowSpy = players[i];
				break;
			}
		}
	}

	let currentPlayer = {};

	for (let i in players) {
		if (lobby.current_player === players[i].player_number) {
			currentPlayer = players[i];
			break;
		}
	}

	choiceUl.classList.add('d-none');
	votesUl.classList.add('d-none');

	// reset stuff
	while (listPlayers.firstChild) {
		listPlayers.removeChild(listPlayers.firstChild);
	}

	while (choiceUl.firstChild) {
		choiceUl.removeChild(choiceUl.firstChild);
	}

	while (votesUl.firstChild) {
		votesUl.removeChild(votesUl.firstChild);
	}

	// update player list
	for (let i in players) {
		let playerTag = document.createElement('p');
		playerTag.classList.add('m-0');

		if (players[i].player_number === lobby.current_player) {
			playerTag.classList.add('font-weight-bold');
		}

		if (players[i].role === 'Spies' && (thisPlayer.role === 'Spies' || lobby.mission === 6)) {
			playerTag.innerHTML = `<span class='badge badge-danger text-light'>${players[i].player_number}</span> ${players[i].name}`;
		} else {
		playerTag.innerHTML = `${players[i].player_number} ${players[i].name}`;

		}

		listPlayers.appendChild(playerTag);
	}

	// update player choices
	let choices = [];

	if (mission) {

		for (let i in players) {
			if (players[i].player_number === mission.choice_one) {
				choices.push(players[i]);
			} else if (players[i].player_number === mission.choice_two) {
				choices.push(players[i]);
			} else if (players[i].player_number === mission.choice_three) {
				choices.push(players[i]);
			}
		}

		for (let i in choices) {
			list = document.createElement('li');
			list.textContent = `${choices[i].player_number} ${choices[i].name}`;
			choiceUl.appendChild(list);
		}
	}

	// playerLine controller
	if (lobby.mission !== 0) {
		
		if (thisPlayer.role === 'Resistance') {
			playerLine.textContent = `You are part of the ${thisPlayer.role}.`;
		} else {
			playerLine.textContent = `You are part of the ${thisPlayer.role}, along with ${fellowSpy.player_number} ${fellowSpy.name}.`;
		}
	}

	// game controller
	if (lobby.mission === 0 && players.length < 5) {

		gameStatus.textContent = "Waiting for players...";

	} else if (lobby.mission === 0 && players.length === 5) {

		gameStatus.textContent = "Waiting for host to start the game.";

		if (lobby.host_id == cookies.userid) {
			startButton.classList.remove('d-none');
			startButton.addEventListener('submit', () => {
				startButton.classList.add('d-none');
			})
		}

	} else if (lobby.mission === 6) {

	} else { // if mission = 1 to 5

		gameStatus.textContent = `Mission ${lobby.mission}`;

		if (lobby.phase === 1) {

			if (thisPlayer.player_number === currentPlayer.player_number) {

				if (lobby.mission === 1 || lobby.mission === 3) {

					phaseLine.textContent = "It's your turn! Choose 2 players to go on the mission:";

					choosePlayerForm(lobby, players);

				} else {

					phaseLine.textContent = "It's your turn! Choose 3 players to go on the mission:";

					choosePlayerForm(lobby, players);

				}

			} else {

				phaseLine.textContent = `It's ${currentPlayer.player_number} ${currentPlayer.name}'s turn to choose who goes on the mission. Waiting for ${currentPlayer.player_number} ${currentPlayer.name} to choose...`;
			}

		} else if (lobby.phase === 2) {

			choiceUl.classList.remove('d-none');
			votesUl.classList.remove('d-none');

			if (thisPlayer.player_number === currentPlayer.player_number) {
				phaseLine.textContent = 'You have chosen the following players for this mission:'
			} else {
				phaseLine.textContent = `${currentPlayer.name} has chosen the following players for this mission:`
			}

			choiceUl.classList.remove('d-none');

			let hasPlayerVoted = false;

			for (let i in votes) {

				if (votes[i].player_number === thisPlayer.player_number) {
					hasPlayerVoted = true;
				}

				list = document.createElement('li');

				let player_number = votes[i].player_number;

				if (votes[i].vote) {
					list.textContent = `${votes[i].player_number} ${playerList[player_number].name} voted yes.`;
				} else {
					list.textContent = `${votes[i].player_number} ${playerList[player_number].name} voted no.`;
				}

				votesUl.appendChild(list);
			}

			if (hasPlayerVoted === false) {

				voteForm.classList.remove('d-none');
				voteForm.action = `/lobbies/${lobby.id}/${lobby.mission}/vote`;

				voteFormId.value = thisPlayer.player_number;

				voteForm.addEventListener('submit', () => {
					voteForm.classList.add('d-none');
				})
			}
		} else if (lobby.phase === 3) {

			choiceUl.classList.remove('d-none');

			if (thisPlayer.player_number === mission.choice_one || thisPlayer.player_number === mission.choice_two || thisPlayer.player_number === mission.choice_three) {

				let doneMission = false;
				let yourOutcome;

				for (let i in outcomes) {
					if (outcomes[i].player_number === thisPlayer.player_number) {
						yourOutcome = outcomes[i];
						doneMission = true;
						break;
					}
				}

				if (doneMission) {

					if (yourOutcome.vote) {
						phaseLine.textContent = 'You voted for this mission to succeed.';
					} else {
						phaseLine.textContent = 'You sabotaged this mission.';
					}

				} else {

					missionForm.classList.remove('d-none');
					missionForm.action = `/lobbies/${lobby.id}/${lobby.mission}/mission`;
					missionFormId.value = thisPlayer.player_number;
					missionFormcurrent.value = lobby.current_player;


					missionForm.addEventListener('submit', () => {
						missionForm.classList.add('d-none');
					})

					if (thisPlayer.role === 'Resistance') {
						failButton.disabled = 'true';
					}

					phaseLine.textContent = 'What will you do for the mission?'
				}

			} else {

				phaseLine.textContent = "Waiting on mission completion..."
			}
		}


	}
}

// gets all AJAX queries and updates stuff before passing into gameLogic
// in retrospect each individual phase/mission should have been its own function to reduce number of AJAX calls 
const updateGame = (lobby, cookies) => {

	let request = new XMLHttpRequest();

	request.addEventListener("load", function () {

		let players = JSON.parse(this.responseText);

		let request = new XMLHttpRequest();

		request.addEventListener("load", function () {

			let lobby = JSON.parse(this.responseText);

			let request = new XMLHttpRequest();

			request.addEventListener('load', function () {

				if (this.responseText) {

					let mission = JSON.parse(this.responseText);

					let request = new XMLHttpRequest();

					request.addEventListener('load', function () {

						let votes = JSON.parse(this.responseText);

						let request = new XMLHttpRequest();

						request.addEventListener('load', function () {

							let outcomes = JSON.parse(this.responseText);

							gameLogic(cookies, lobby, players, mission, votes, outcomes);
						})

						request.open('GET', `/lobbies/${lobby.id}/${lobby.mission}/outcomes`);
						request.send();
					})

					request.open('GET', `/lobbies/${lobby.id}/${lobby.mission}/votes`);
					request.send();

				} else {

					gameLogic(cookies, lobby, players);
				}
			})

			request.open("GET", `/lobbies/${lobby.id}/${lobby.mission}`);
			request.send();
		})

		request.open("GET", `/lobbies/${lobby.id}/status`);
		request.send();
	})

	request.open("POST", `/lobbies/${lobby.id}/getPlayers`);
	request.send();
}

// stuff happens after the page loads
window.onload = () => {

	let cookies = parseCookie(document.cookie);
	const lobby = {
		id: document.title.replace(/\D/g, '')
	};

	updateGame(lobby, cookies);
	
	socket.emit('joinedChat', lobby);

	// socket EMITS chat	
	chatForm.addEventListener('submit', (event) => {

		event.preventDefault();

		if (chatField.value) {
			socket.emit('chat', lobby, chatField.value);
			chatField.value = "";
		}
	})

	// socket receives chat
	socket.on('chat', (lobbyFrom, chat) => {

		if (lobbyFrom.id === lobby.id) {

			while (chatArea.firstChild) {
				chatArea.removeChild(chatArea.firstChild);
			}

			for (let i in chat) {
				let newLine = document.createElement('p');
				newLine.classList.add('m-0');
				newLine.textContent = `${chat[i].username}: ${chat[i].message}`;
				chatArea.appendChild(newLine);
			}

			chatArea.scrollTop = chatArea.scrollHeight;
		}
	})

	// socket updates game
	socket.on('updateGame', (lobbyFrom) => {
		if (lobbyFrom.id === lobby.id) {
			updateGame(lobby, cookies);
		}
	})

	socket.on('updateScores', (lobbyFrom) => {
		if (lobbyFrom.id === lobby.id) {
			updateScores(lobby);
		}
	})
}
