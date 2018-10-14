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
