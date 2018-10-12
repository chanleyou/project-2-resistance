module.exports = (db, io) => {

	return {

		choosePhase: (request, response) => {

			if (request.body.choiceOne === request.body.choiceTwo || request.body.choiceOne === request.body.choiceThree || request.body.choiceTwo === request.body.choiceThree) {
				
				response.redirect('/lobbies/' + request.params.id);
	
			} else {

				let queryString = {
					lobby_id: request.params.id,
					leader: request.body.leader,
					current_round: request.body.mission_number,
					choice_one: request.body.choiceOne,
					choice_two: request.body.choiceTwo,
					choice_three: request.body.choiceThree
				}

				db.game.getMission(queryString, (error, queryResult) => {
					if (error) {
						console.error('Error assigning roles.', error);
						response.sendStatus(500);
		
						// creates mission if it doesn't exist
					} else if (queryResult.rowCount === 0) {
						
						db.game.createMission(queryString, (error, queryResult) => {
							if (error) {
								console.error('Error assigning roles.', error);
								response.sendStatus(500);
							} else {
		
								db.game.votingPhase(request.params, (error, queryResult) => {
									if (error) {
										console.error('Error assigning roles.', error);
										response.sendStatus(500);
									} else {
		
										io.emit('updateGame');
				
										response.redirect("/lobbies/" + request.params.id);
									}
								})
							}
						})
					} else {

						// updates mission if it exists
						db.game.updateMission(queryString, (error, queryResult) => {
							if (error) {
								console.error('Error assigning roles.', error);
								response.sendStatus(500);
							} else {
		
								db.game.votingPhase(request.params, (error, queryResult) => {
									if (error) {
										console.error('Error assigning roles.', error);
										response.sendStatus(500);
									} else {
		
										io.emit('updateGame');
				
										response.redirect("/lobbies/" + request.params.id);
									}
								})
							}
						})
					}
				})
			}
		},

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

							io.emit('updateGame');

							response.redirect("/lobbies/" + request.params.id);
						}
					})
				}
			})	
		},


	}
}

