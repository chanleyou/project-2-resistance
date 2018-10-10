module.exports = (db) => {

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

		lobby: (request, response) => {

			db.lobbies.getId(request.params, (error, queryResult) => {
				if (error) {
					console.error('error getting lobby:', error);
					response.sendStatus(500);

				} else if (queryResult.rowCount === 0) {

					console.error('Lobby not found.');
					response.sendStatus(404).send('Lobby not found!');

				} else {

					response.render('lobbies/lobby', {cookies: request.cookies, lobby: queryResult.rows[0]});

				}
			})
		},

		create: (request, response) => {

			db.lobbies.create(request.body, (error, queryResult) => {
				if (error) {
					console.error('error creating lobby:', error);
					response.sendStatus(500);
				} else if (queryResult.rowCount > 0) {

					let hostJoin = {
						player_id: request.body.host_id,
						lobby_id: queryResult.rows[0].id
					}

					db.lobbies.joinLobby(hostJoin, (error, queryResult) => {
						if (error) {
							console.error('error creating lobby:', error);
							response.sendStatus(500);
						} else {
							response.redirect('/lobbies/' + hostJoin.lobby_id);
						}
					})

				} else {
					console.error('Error creating lobby!');
					response.sendStatus(500);
				}
			})
		},

	}
}