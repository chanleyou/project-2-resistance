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
	username TEXT,
	user_id INTEGER,
	message TEXT,
	created_at TIMESTAMPTZ DEFAULT now()
);
