module.exports = (db, io) => {

	return {

		startGame: (request, response) => {

			db.game.assignRoles(request.params, (error, queryResult) => {
				if (error) {
					console.error('Error starting game.', error);
					response.sendStatus(500);
				} else {

					db.game.startGame(request.params, (error, queryResult) => {
						if (error) {
							console.error('Error assigning roles.', error);
							response.sendStatus(500);
						} else {

							response.redirect(`/lobbies/${request.body.lobby_id}`);					
						}
					})

				}
			})	
		},


	}
}

