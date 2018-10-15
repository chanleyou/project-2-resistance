To be Improved:

1. Rework routes and game logic to exist inside sockets.
	- Only figured out that I should have used sockets to make AJAX calls (without exposing sockets to client-side JS). 
	
	- Right now the flow is like this:
		
		a. player makes a move, database gets updated
		b. database tells all 5 players to get the new updated database
		c. the 5 players EACH make 6 AJAX queries for the updated board

		this is an unwieldy and unnecessary combination of server and client-side JS. This happened because I didn't really understand socket implementation and only figured it out yesterday.

		Instead, my code should have been simplified to:

		a. player makes a move, database gets updated
		b. database uses sockets to emit the updated db to all players

		This would probably reduce lag greatly (less redundant AJAX calls and database queries, having to ping express and AJAX routes back and forth), but also greatly simplifies my code and makes it a lot harder to cheat as players can see less of my game logic JS.

2. Split each individual step of the game and part of the game board into its own function
