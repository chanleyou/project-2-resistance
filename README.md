# Resistance

Mobile-friendly online adaptation of party card game [Resistance](https://en.wikipedia.org/wiki/The_Resistance_(game)) built with Node.js and a PostgreSQL database. Uses the Socket.IO JavaScript library to implement the game's real-time updating and chat features.

Currently only limited to five players and the UI is rather plain, but it works. 

I wrote this rather early into my GA course and there are a lot of things I would change if I were making this with the knowledge I have now. I'd probably write the front-end entirely in React, implement WebSockets better and find a better way to write the database queries. They were probably the most tedious part about making this. Maybe explore GraphQL?

### Issues

- Spies don't automatically win if the player vote fails five times in a row. Totally forgot to code that in!
