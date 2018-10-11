const socket = io();

parseCookie = (cookieString) => {

	let output = {};

	let cookies = cookieString.split('; ');
	
	for (let i in cookies) {
		let array = cookies[i].split("=");
		output[array[0]] = array[1];
	}
	return output;
}

//to get who this player is
let cookies = parseCookie(document.cookie);


chatForm.addEventListener('submit', (event) => {

	event.preventDefault();
	
	socket.emit('chat', chatField.value);
	chatField.value = "";
})

socket.on('refresh', () => {
	location.reload(true);
})

// controls the chatbox
socket.on('chat', (username, message) => {
	let newLine = document.createElement('p');
	newLine.classList.add('my-0');
	newLine.textContent = `${username}: ${message}`;
	chatArea.appendChild(newLine);

	if (chatArea.childNodes.length > 10) {
		chatArea.removeChild(chatArea.firstChild);
	}
})

