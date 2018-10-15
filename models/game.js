module.exports = (pool) => {

	return {
		
		startGame: (query, callback) => {
		
			let rng = Math.floor(Math.random()*5 + 1);
		
			const queryString = 'UPDATE lobbies SET mission = 1, phase = 1, current_player = $1  WHERE id = $2 RETURNING *;';
		
			const values = [rng, query.id];
		
			pool.query(queryString, values, (error, queryResult) => {
				callback(error, queryResult);
			})
		},

		assignRoles: (query, callback) => {

			let rng1 = Math.floor(Math.random()*5 + 1);
			let rng2 = Math.floor(Math.random()*5 + 1);

			while (rng1 === rng2) {
				rng2 = Math.floor(Math.random()*5 + 1);
			}

			const queryString = 'UPDATE players_in_lobby SET role = $1 WHERE lobby_id = $2 AND (player_number = $3 OR player_number = $4);';
			const values = ['Spies', query.id, rng1, rng2];

			pool.query(queryString, values, (error, queryResult) => {
				callback(error, queryResult);
			})
		},

		getMission: (query, callback) => {

			const queryString = 'SELECT * FROM missions WHERE lobby_id = $1 AND mission = $2;';
			const values = [query.id, query.mission];

			pool.query(queryString, values, (error, queryResult) => {
				callback(error, queryResult);
			})
		},

		createMission: (query, callback) => {

			const queryString = 'INSERT INTO missions (lobby_id, leader, mission, choice_one, choice_two, choice_three) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;';
			const values = [query.id, query.leader, query.mission, query.choice_one, query.choice_two, query.choice_three];

			pool.query(queryString, values, (error, queryResult) => {
				callback(error, queryResult);
			})
		},

		updateMission: (query, callback) => {

			const queryString = 'UPDATE missions SET leader = $2, choice_one = $4, choice_two = $5, choice_three = $6 WHERE lobby_id = $1 AND mission = $3;';
			const values = [query.id, query.leader, query.mission, query.choice_one, query.choice_two, query.choice_three];

			pool.query(queryString, values, (error, queryResult) => {
				callback(error, queryResult);
			})
		},

		votingPhase: (query, callback) => {
				
			const queryString = 'UPDATE lobbies SET phase = 2 WHERE id = $1 RETURNING *;';
			const values = [query.id];
		
			pool.query(queryString, values, (error, queryResult) => {
				callback(error, queryResult);
			})
		},

		getVotes: (query, callback) => {

			const queryString = 'SELECT * FROM votes WHERE lobby_id = $1 AND mission = $2;';
			const values = [query.id, query.mission];

			pool.query(queryString, values, (error, queryResult) => {
				callback(error, queryResult);
			})
		},

		vote: (query, callback) => {

			const queryString = 'INSERT INTO votes (lobby_id, mission, player_number, vote) VALUES ($1, $2, $3, $4);';
			const values = [query.id, query.mission, query.player_number, query.vote];

			pool.query(queryString, values, (error, queryResult) => {
				callback(error, queryResult);
			})
		},

		choosePhase: (query, callback) => {
				
			const queryString = 'UPDATE lobbies SET phase = 1 WHERE id = $1 RETURNING *;';
			const values = [query.id];
		
			pool.query(queryString, values, (error, queryResult) => {
				callback(error, queryResult);
			})
		},

		updateCurrentPlayer: (query, callback) => {

			const queryString= 'UPDATE lobbies SET current_player = $1 WHERE id = $2;';
			const values = [query.current_player, query.id];

			pool.query(queryString, values, (error, queryResult) => {
				callback(error, queryResult);
			})
		},

		resetVotes: (query, callback) => {

			const queryString = 'DELETE FROM votes WHERE lobby_id = $1 AND mission = $2;';
			const values = [query.id, query.mission];

			pool.query(queryString, values, (error, queryResult) => {
				callback(error, queryResult);
			})
		},

		missionPhase: (query, callback) => {

			const queryString = 'UPDATE lobbies SET phase = 3 WHERE id = $1;';
			const values = [query.id];

			pool.query(queryString, values, (error, queryResult) => {
				callback(error, queryResult);
			})
		},

		goOnMission: (query, callback) => {

			const queryString = 'INSERT INTO outcomes (lobby_id, mission, player_number, vote) VALUES ($1, $2, $3, $4);';
			const values = [query.id, query.mission, query.player_number, query.vote];

			pool.query(queryString, values, (error, queryResult) => {
				callback(error, queryResult);
			})
		},

		getOutcomes: (query, callback) => {

			const queryString = 'SELECT * FROM outcomes WHERE lobby_id = $1 AND mission = $2;';
			const values = [query.id, query.mission];

			pool.query(queryString, values, (error, queryResult) => {
				callback(error, queryResult);
			})
		},

		givePoints: (query, callback) => {

			const queryString = 'INSERT INTO points (lobby_id, mission, success, fail_votes) VALUES ($1, $2, $3, $4);';
			const values = [query.id, query.mission, query.success, query.fail_votes];

			pool.query(queryString, values, (error, queryResult) => {
				callback(error, queryResult);
			})
		},

		checkWin: (query, callback) => {

			const queryString = 'SELECT * FROM points WHERE lobby_id = $1 ORDER BY mission ASC;';
			const values = [query.id];

			pool.query(queryString, values, (error, queryResult) => {
				callback(error, queryResult);
			})
		},

		nextMission: (query, callback) => {

			const queryString = 'UPDATE lobbies SET mission = $1, phase = 1, current_player = $2 WHERE id = $3;';
			const values = [query.mission, query.current_player, query.id];

			pool.query(queryString, values, (error, queryResult) => {
				callback(error, queryResult);
			})
		},

		over: (query, callback) => {

			const queryString = 'UPDATE lobbies SET mission = 6 WHERE id = $1;';
			const values = [query.id];

			pool.query(queryString, values, (error, queryResult) => {
				callback(error, queryResult);
			})
		},

		getAllMissions: (query, callback) => {

			const queryString = 'SELECT * FROM missions WHERE lobby_id = $1;';
			const values = [query.id];

			pool.query(queryString, values, (error, queryResult) => {
				callback(error, queryResult);
			})
		},

		getAllVotes: (query, callback) => {

			const queryString = 'SELECT * FROM votes WHERE lobby_id = $1;';
			const values = [query.id];

			pool.query(queryString, values, (error, queryResult) => {
				callback(error, queryResult);
			})
		},








	}
}