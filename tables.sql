DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS lobbies;
DROP TABLE IF EXISTS players_in_lobby;
DROP TABLE IF EXISTS lobby_chat;

CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
	name TEXT,
	password TEXT
);

CREATE TABLE IF NOT EXISTS lobbies (
	id SERIAL PRIMARY KEY,
	name TEXT,
	host_id INTEGER,
	status TEXT,
	player_count INTEGER
);

CREATE TABLE IF NOT EXISTS players_in_lobby (
	id SERIAL PRIMARY KEY,
	lobby_id INTEGER,
	user_id INTEGER
);

CREATE TABLE IF NOT EXISTS lobby_chat (
	id SERIAL PRIMARY KEY,
	lobby_id INTEGER,
	user_id INTEGER,
	message TEXT,
	created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO users (name, password) VALUES ('John', 'ba6be8d873bee4c17eda1a4963e9b0474b33aad645c464baad4b9e4252074d77');

INSERT INTO lobbies (name, host_id, status, player_count) VALUES ('Test Game', 1, 'open', 1);

INSERT INTO players_in_lobby (lobby_id, user_id) VALUES (1, 1);

