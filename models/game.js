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

			const queryString = 'UPDATE missions SET leader = $2, choice_one = $4, choice_two = $5, choice_three = $6 WHERE lobby_id = $1 AND mission = $6;';
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








	}
}