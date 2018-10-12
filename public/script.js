const socket = io();

// parses cookie into an object
const parseCookie = (cookieString) => {

	let output = {};

	let cookies = cookieString.split('; ');
	
	for (let i in cookies) {
		let array = cookies[i].split("=");
		output[array[0]] = array[1];
	}
	return output;
}

//updates player list
const getPlayers = (lobby) => {
	
	let request = new XMLHttpRequest();

	request.addEventListener("load", function () {

		let response = JSON.parse(this.responseText);
			
		while (listPlayers.firstChild) {
				listPlayers.removeChild(listPlayers.firstChild);
			}

		for (let i in response) {
			let playerTag = document.createElement('p');
			playerTag.classList.add('m-0');
			playerTag.textContent = `${response[i].player_number} ${response[i].name}`
			listPlayers.appendChild(playerTag);
		}
	})

	request.open("GET", `/lobbies/${lobby.id}/getPlayers`);
	request.send();
}

// stuff happens after the page loads
window.onload = () => {

	let cookies = parseCookie(document.cookie);
	const lobby = {
		id: document.title.replace(/\D/g,'')
	};

	//initialise window
	getPlayers(lobby);

	// socket EMITS chat	
	chatForm.addEventListener('submit', (event) => {
	
		event.preventDefault();
	
		if (chatField.value) {
			socket.emit('chat', chatField.value);
			chatField.value = "";
		}	
	})

	// socket receives chat
	socket.on('chat', (username, message) => {
		let newLine = document.createElement('p');
		newLine.classList.add('my-0');
		newLine.textContent = `${username}: ${message}`;
		chatArea.appendChild(newLine);

		if (chatArea.childNodes.length > 10) {
			chatArea.removeChild(chatArea.firstChild);
		}
	})

	// socket receives update players
	socket.on('reloadPlayers', () => {
		getPlayers(lobby);
	})

}
