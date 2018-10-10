module.exports = (pool) => {

	return {

		getId: (query, callback) => {

			const queryString = 'SELECT * FROM lobbies WHERE id = $1;';
			const values = [query.id];

			pool.query(queryString, values, (error, queryResult) => {
				callback(error, queryResult);
			})
		}, 

		index: (callback) => {

			const queryString = 'SELECT * FROM lobbies ORDER BY id ASC;';

			pool.query(queryString, (error, queryResult) => {
				callback(error, queryResult);
			})
		}

		// create: (query, callback) => {

		// 	const queryString = 'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING name';
		// 	const values = [query.name, sha256(query.password)];

		// 	pool.query(queryString, values, (error, queryResult) => {
		// 		callback(error, queryResult);
		// 	})
		// }

	}
}