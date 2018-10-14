DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
	name TEXT,
	password TEXT
);

DROP TABLE IF EXISTS lobbies;

CREATE TABLE IF NOT EXISTS lobbies (
	id SERIAL PRIMARY KEY,
	name TEXT,
	host_id INTEGER,
	player_count INTEGER, 
	mission INTEGER DEFAULT 0,
	phase INTEGER DEFAULT 0,
	current_player INTEGER,
	resistance_pts INTEGER DEFAULT 0,
	spies_pts INTEGER DEFAULT 0
);

DROP TABLE IF EXISTS players_in_lobby;

CREATE TABLE IF NOT EXISTS players_in_lobby (
	id SERIAL PRIMARY KEY,
	lobby_id INTEGER,
	user_id INTEGER,
	player_number INTEGER,
	role TEXT DEFAULT 'Resistance'
);

DROP TABLE IF EXISTS missions;

CREATE TABLE IF NOT EXISTS missions (
	id SERIAL PRIMARY KEY,
	lobby_id INTEGER,
	leader INTEGER, 
	mission INTEGER, 
	choice_one INTEGER,
	choice_two INTEGER,
	choice_three INTEGER 
);

DROP TABLE IF EXISTS votes;

CREATE TABLE IF NOT EXISTS votes (
	id SERIAL PRIMARY KEY,
	lobby_id INTEGER,
	mission INTEGER,
	player_number INTEGER,
	vote BOOLEAN
);

DROP TABLE IF EXISTS outcomes;

CREATE TABLE IF NOT EXISTS outcomes (
	id SERIAL PRIMARY KEY,
	lobby_id INTEGER,
	mission INTEGER,
	player_number INTEGER,
	vote BOOLEAN	
);

DROP TABLE IF EXISTS points;

CREATE TABLE IF NOT EXISTS points (
	id SERIAL PRIMARY KEY,
	lobby_id INTEGER,
	mission INTEGER,
	success BOOLEAN,
	fail_votes INTEGER
);

DROP TABLE IF EXISTS lobby_chat;

CREATE TABLE IF NOT EXISTS lobby_chat (
	id SERIAL PRIMARY KEY,
	lobby_id INTEGER,
	user_id INTEGER,
	message TEXT,
	created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO users (name, password) VALUES ('John', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
INSERT INTO users (name, password) VALUES ('Jane', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
INSERT INTO users (name, password) VALUES ('May', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
INSERT INTO users (name, password) VALUES ('Abel', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
INSERT INTO users (name, password) VALUES ('Jack', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');

INSERT INTO lobbies (name, host_id, player_count) VALUES ('Test Game', 1, 5);

INSERT INTO players_in_lobby (lobby_id, user_id, player_number) VALUES (1, 1, 1);
INSERT INTO players_in_lobby (lobby_id, user_id, player_number) VALUES (1, 2, 2);
INSERT INTO players_in_lobby (lobby_id, user_id, player_number) VALUES (1, 3, 3);
INSERT INTO players_in_lobby (lobby_id, user_id, player_number) VALUES (1, 4, 4);
INSERT INTO players_in_lobby (lobby_id, user_id, player_number) VALUES (1, 5, 5);
