module.exports = (pool) => {

	return {

		getId: (query, callback) => {

			const queryString = `SELECT * FROM lobbies WHERE id = ${query.id};`;

			pool.query(queryString, (error, queryResult) => {
				callback(error, queryResult);
			})
		}, 

		index: (callback) => {

			const queryString = 'SELECT lobbies.id, lobbies.name, users.name AS host_name, lobbies.name AS lobby_name FROM lobbies INNER JOIN users ON (users.id = lobbies.host_id) ORDER BY id ASC;';

			pool.query(queryString, (error, queryResult) => {
				callback(error, queryResult);
			})
		},

		create: (query, callback) => {

			const queryString = 'INSERT INTO lobbies (name, host_id, status, player_count) VALUES ($1, $2, $3, $4) RETURNING id';
			const values = [query.name, query.host_id, 'open', 1];

			pool.query(queryString, values, (error, queryResult) => {
				callback(error, queryResult);
			})
		},

		joinLobby: (query, callback) => {

			const queryString = 'INSERT INTO players_in_lobby (lobby_id, user_id) VALUES ($1, $2);';
			const values = [query.lobby_id, query.player_id];

			pool.query(queryString, values, (error, queryResult) => {
				callback(error, queryResult);
			})
		}

	}
}