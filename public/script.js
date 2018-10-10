const socket = io();	

chatForm.addEventListener('submit', (event) => {

	event.preventDefault();
	
	socket.emit('chat', chatField.value);
	chatField.value = "";
})

socket.on('chat', (username, message) => {
	let newLine = document.createElement('li');
	newLine.textContent = `${username}: ${message}`;
	chatArea.appendChild(newLine);

	// location.reload();

	// if number of lines > 10, remove first child
})