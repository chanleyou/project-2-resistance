var React = require("react");
var Layout = require('../layout/layout');
var Chat = require('../layout/chat');

class Players extends React.Component {
	render () {

		let players = this.props.players.map(player => {
			return (
				<p key={player.player_number} className="mb-1">{player.player_number}. {player.name}</p>
			)
		})

		return (
			<div className="col-12 col-lg-2">
				<div className="card p-3 my-2 shadow-sm">
				<h4 className="mb-2">Players</h4>
					{players}
				</div>
			</div>
		) 
	}
}

class GameBoard extends React.Component {
	render () {

		let lobby = this.props.lobby;
		let players = this.props.players;
		let cookies = this.props.cookies;
		let thisPlayer = this.props.thisPlayer;

		if (players.length < 5) {
			
			return (				
				<h1>Waiting for players...</h1>
			)

		} else if (players.length === 5 && lobby.round === 0 && cookies.userid == lobby.host_id) {
			
			return (
				<div>
					<h1>Game has five players!</h1>
					<p>Start game?</p>
					<form method="POST" action={'/lobbies/' + lobby.id + '/start?_method=PUT'}>
						<input type="hidden" name="lobby_id" value={lobby.id} />
						<input type="submit" value="Start" className ="btn btn-sm btn-primary" />
					</form>
				</div>
				)

		} else if (players.length === 5 && lobby.round === 0 && cookies.userid != lobby.host_id) {

			return (
				<div>
					<h1>Game has five players!</h1>
					<p>Waiting for host to start game...</p>
				</div>
				)
		} else if (lobby.round === 1 || lobby.round === 3 || lobby.round === 4) {

			return (
				<div>
					<h1>Mission {lobby.round}</h1>
				</div>
			)
		
		} else {
			return <div />
		}
	}
} 

class Dashboard extends React.Component {
	render () {

		let lobby = this.props.lobby;

		if (lobby.round === 0) {
			return <h4>Waiting for game to start...</h4>
		} else {
			return <p>You are part of the <strong>{this.props.thisPlayer.role}</strong>.</p>
		}
	}
}

class Lobby extends React.Component {
	render () {

		// console.log(this.props);

		let lobby = this.props.lobby;
		let players = this.props.players;
		let cookies = this.props.cookies;
		let thisPlayer;

		for (let i in players) {
			if (cookies.userid == players[i].user_id) {
				thisPlayer = players[i];
				break;
			}
		}

		return (
			<Layout cookies={this.props.cookies} title={'Game ' + lobby.id}>
				<div className="col-12 my-3">
					<h1>{lobby.name}</h1>
				</div>

				<div className="col-12 col-lg-10">
					<div className="card p-3 my-2 shadow-sm">
					<GameBoard lobby={lobby} cookies={cookies} players ={players} thisPlayer={thisPlayer} />
					</div>
					<div className="card p-3 my-2 shadow-sm">
					<Dashboard lobby={lobby} cookies={cookies} players ={players} thisPlayer={thisPlayer} />
					</div>
				</div>

				<Players players={this.props.players} />

				<Chat cookies={this.props.cookies} />
			</Layout>
		)

	}
}

module.exports = Lobby;