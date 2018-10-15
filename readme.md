To be Improved:

1. Rework routes and game logic to exist inside sockets.
	- Only figured out that I should have used sockets to make AJAX calls (without exposing sockets to client-side JS). 
	
	- Right now the flow is like this:
		a. client-side JS gets makes AJAX call, updates the board
		b. client-side JS exposes a form that exposes an express route
		c. Upon completion of express route, socket tells other players to refresh their page
		d. Other players make AJAX calls and update the board

		This is an unwieldy (and unnecessary) combination of server and client-side JS. This happened because I didn't really understand socket implementation and only threw it in as an afterthought. Instead, all my code could have been simplified to:

		1. client-side JS makes socket request
		2. server-side socket JS handles the request, updates db, then sends a message telling client what to update

		This not only reduces lag (less redundant unnecessary AJAX calls, having to do both express and socket routing) but also exposes less of the game's code to client, making it a lot harder to cheat. Right now about 75% of game logic can be seen in public script.js, switching to this reduces this to about 10%.

2. Split each individual step of the game and part of the game board into its own function