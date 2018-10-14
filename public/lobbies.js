const socket = io();

window.onload = () => {

	socket.on('refreshIndex', (lobbyFrom) => {
		location.reload(true);
	})
}