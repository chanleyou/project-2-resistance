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
			
		}







	}
}
