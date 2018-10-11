module.exports = (pool) => {

	return {
		
		startGame: (query, callback) => {
		
			let rng = Math.floor(Math.random()*5 + 1);
		
			const queryString = 'UPDATE lobbies SET round = 1, current_player = $1  WHERE id = $2 RETURNING *;';
		
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

	}
}