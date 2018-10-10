DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS lobbies;

CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
	name TEXT,
	password TEXT
);

CREATE TABLE IF NOT EXISTS lobbies (
	id SERIAL PRIMARY KEY,
	name TEXT,
	password TEXT,
	host_id INTEGER,
	status TEXT
);