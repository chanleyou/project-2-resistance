const sha256 = require('js-sha256');

module.exports = (pool) => {

	return {

		getName: (query, callback) => {

			const queryString = "SELECT * FROM users WHERE name = $1;";
			const values = [query.name];

			pool.query(queryString, values, (error, queryResult) => {
				callback(error, queryResult);
			})
		},

		getId: (query, callback) => {

			const queryString = 'SELECT * FROM users WHERE id = $1;';
			const values = [query.id];

			pool.query(queryString, values, (error, queryResult) => {
				callback(error, queryResult);
			})
		}, 

		create: (query, callback) => {

			const queryString = 'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING name';
			const values = [query.name, sha256(query.password)];

			pool.query(queryString, values, (error, queryResult) => {
				callback(error, queryResult);
			})
		}

	}
}