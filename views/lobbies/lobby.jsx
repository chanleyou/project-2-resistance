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

// class Dashboard extends React.Component

class GameBoard extends React.Component {
	render () {

		let lobby = this.props.lobby;
		let players = this.props.players;

		if (players.length < 5) {
			
			return (				
						<h1>Waiting for players...</h1>
			)

		} else if (players.length === 5 && lobby.round === 0) {
			
			return (
			<h1>Game has five players!</h1>
			
			)

		} else {
			return <div />
		}
	}
} 

class Lobby extends React.Component {
	render () {

		console.log(this.props);

		let lobby = this.props.lobby;

		return (
			<Layout cookies={this.props.cookies} title={'Game ' + lobby.id}>
				<div className="col-12 my-3">
					<h1>{lobby.name}</h1>
				</div>

				<div className="col-12 col-lg-10">
					<div className="card p-3 my-2 shadow-sm">
						<GameBoard lobby={lobby} cookies={this.props.cookies} players = {this.props.players} />
					</div>
				</div>

				<Players players={this.props.players} />

				<Chat cookies={this.props.cookies} />
			</Layout>
		)

	}
}

module.exports = Lobby;