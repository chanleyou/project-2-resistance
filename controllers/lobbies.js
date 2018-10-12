const sha256 = require('js-sha256');
const SALT = 'latvianpotato';

module.exports = (db, io) => {

	return {

		index: (request, response) => {

			db.lobbies.index((error, queryResult) => {
				if (error) {
					console.error('error getting lobbies:', error);
					response.sendStatus(500);
					
				} else {
					
					response.render('lobbies/index', {cookies: request.cookies, lobbies: queryResult.rows});
					
				}
			})
		},
		
		create: (request, response) => {

			db.lobbies.create(request.body, (error, queryResult) => {
				if (error) {
					console.error('Error creating lobby: ', error);
					response.sendStatus(500);
				} else {

					response.redirect(`/lobbies/${queryResult.rows[0].id}`);
				}
			})
		},

		enter: (request, response) => {

			let cookies = request.cookies;

			// checks if user is logged in
			if (cookies.loggedin !== sha256(cookies.userid + cookies.username + SALT)) {
				response.sendStatus(401).send('User authentication failed. Try logging in again.');

			} else {

				// finds the lobby
				db.lobbies.getId(request.params, (error, queryResult) => {
					if (error) {
						console.error('Error finding lobby: ', error);
						response.sendStatus(500);
	
					} else if (queryResult.rowCount === 0) {
	
						response.send('Lobby not found!');
									
					} else {
	
						let lobby = queryResult.rows[0];
	
						// check if player is in lobby
						db.lobbies.getPlayers(lobby, (error, queryResult) => {
							if (error) {
								console.error('Error getting players in lobby:', error);
								response.sendStatus(500);
	
							} else {
	
								let players = queryResult.rows;
								let playerInGame = false;
	
								for (let i in players) {
									if (cookies.userid == players[i].user_id) {
										playerInGame = true;
										break;
									}
								}

								// enters if the user is one of the players in the game
								if (playerInGame) {

									response.render('lobbies/lobby', {cookies:cookies, lobby: lobby});
								} else {

									if (players.length >= 5) {

										response.send('Game is already full!');

									// joins the lobby if it isn't full
									} else { 

										let joinQuery = {
											lobby_id: lobby.id,
											user_id: cookies.userid,
											player_number: players.length + 1
										}

										db.lobbies.join(joinQuery, (error, queryResult) => {
											if (error) {
												console.error('Error joining lobby: ', error);
												response.send('Error joining lobby.');
											} else {

												// joins the lobby, reloads everyone's player list
												io.emit('reloadPlayers');
												
												response.render('lobbies/lobby', {cookies:cookies, lobby: lobby});
											}
										})
									}
								}
							}
						})
					}
				})
			}
		},

		getPlayers: (request, response) => {

			console.log(request.params);

			db.lobbies.getPlayers(request.params, (error, queryResult) => {
				if (error) {
					console.error('Error getting players in lobby:', error);
					response.sendStatus(500);

				} else {

					response.send(queryResult.rows);
				}
			})
		},
		





	}
}