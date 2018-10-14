const socket = io();

window.onload = () => {

	// $('#createForm').submit(() => { 
	// 	socket.emit('refreshIndex');
	// });

	socket.on('refreshIndex', () => {
		console.log('hey');
		location.reload(true);
	})
}