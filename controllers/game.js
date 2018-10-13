module.exports = (db, io) => {

	return {

		choosePhase: (request, response) => {

			if (request.body.choiceOne === request.body.choiceTwo || request.body.choiceOne === request.body.choiceThree || request.body.choiceTwo === request.body.choiceThree) {
				
				response.redirect('/lobbies/' + request.params.id);
	
			} else {

				let queryString = {
					id: request.params.id,
					leader: request.body.leader,
					mission: request.body.mission_number,
					choice_one: request.body.choiceOne,
					choice_two: request.body.choiceTwo,
					choice_three: request.body.choiceThree
				}

				db.game.getMission(queryString, (error, queryResult) => {
					if (error) {
						console.error('Error getting mission.', error);
						response.sendStatus(500);
		
						// creates mission if it doesn't exist
					} else if (queryResult.rowCount === 0) {
						
						db.game.createMission(queryString, (error, queryResult) => {
							if (error) {
								console.error('Error creating mission.', error);
								response.sendStatus(500);
							} else {
		
								db.game.votingPhase(request.params, (error, queryResult) => {
									if (error) {
										console.error('Error going to voting phase.', error);
										response.sendStatus(500);
									} else {

										io.emit('updateGame', queryString);
				
										response.redirect("/lobbies/" + request.params.id);
									}
								})
							}
						})
					} else {

						// updates mission if it exists
						db.game.updateMission(queryString, (error, queryResult) => {
							if (error) {
								console.error('Error updating mission.', error);
								response.sendStatus(500);
							} else {

								console.log(request.params);
		
								db.game.votingPhase(request.params, (error, queryResult) => {
									if (error) {
										console.error('Error going to voting phase.', error);
										response.sendStatus(500);
									} else {
		
										io.emit('updateGame', queryString);
				
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
					console.error('Error assigning roles.', error);
					response.sendStatus(500);
				} else {

					db.game.startGame(request.params, (error, queryResult) => {
						if (error) {
							console.error('Error starting game.', error);
							response.sendStatus(500);
						} else {

							io.emit('updateGame', request.params);

							response.redirect("/lobbies/" + request.params.id);
						}
					})
				}
			})	
		},

		getMission: (request, response) => {

			db.game.getMission(request.params, (error, queryResult) => {
				if (error) {
					console.error('Error getting mission.', error);
					response.sendStatus(500);
				} else {

					response.send(queryResult.rows[0]);
				}
			})
		},

		getVotes: (request, response) => {

			db.game.getVotes(request.params, (error, queryResult) => {
				if (error) {
					console.error('Error getting votes.', error);
					response.sendStatus(500);
				} else {

					response.send(queryResult.rows);
				}
			})
		},

		vote: (request, response) => {

			let queryString = {
				id: request.params.id,
				mission: request.params.mission,
				player_number: request.body.player_number,
				vote: request.body.vote
			}

			db.game.vote(queryString, (error, queryResult) => {
				if (error) {
					console.error('Error getting votes.', error);
					response.sendStatus(500);
				} else {

					db.game.getVotes(request.params, (error, queryResult) => {
						if (error) {
							console.error('Error getting votes.', error);
							response.sendStatus(500);
						} else {
												
							if (queryResult.rowCount === 5) {
	
								let votesYes = 0;
	
								for (let i in queryResult.rows) {
									if (queryResult.rows[i].vote) {
										votesYes++;
									}
								}
								if (votesYes >= 3) {

									//
									// VOTE PASSED
									//

									db.game.missionPhase(request.params, (error, queryResult) => {
										if (error) {
											console.error('Error going to mission phase.', error);
										} else {

											io.emit('updateGame', request.params);
					
											response.redirect("/lobbies/" + request.params.id);
										}
									})

								} else {
	
									db.game.choosePhase(request.params, (error, queryResult) => {
										if (error) {
											console.error('Error going back to choose phase.', error);
											response.sendStatus(500);
										} else {

											let current_player = queryResult.rows[0].current_player + 1;

											if (current_player === 6) {
												current_player = 1;
											}

											let queryString = {
												id: request.params.id,
												current_player: current_player
											}

											db.game.updateCurrentPlayer(queryString, (error, queryResult) => {
												if (error) {
													console.error('Error updating current player.', error);
													response.sendStatus(500);
												} else {

													db.game.resetVotes(request.params, (error, queryResult) => {
														if (error) {
															console.error('Error reseting votes.', error);
															response.sendStatus(500);
														} else {
														
															io.emit('updateGame', request.params);
					
															response.redirect("/lobbies/" + request.params.id);
														}
													})
												}
											})
										}
									})
								}
							} else { // less than 5 votes
	
								io.emit('updateGame', request.params);
			
								response.redirect("/lobbies/" + request.params.id);
							}
						}
					})
				}
			})
		},











	}
}

