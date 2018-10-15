var React = require("react");
var Layout = require('../layout/layout');

const sha256 = require('js-sha256');
const SALT = "latvianpotato";

class CreateGame extends React.Component {
	render () {

		let cookies = this.props.cookies;

		if (cookies.loggedin === sha256(cookies.userid + cookies.username + SALT)) {
			return (
				<form className ="form-inline my-2" method="POST" action="/lobbies" id="createForm">
					<input type="submit" value="Create" className ="btn btn-success mr-1 col-3 col-sm-2 col-lg-1" />
					<input type="text" name="name" placeholder="Lobby Name" required autoComplete="off" className="form-control col"/>
					<input type="hidden" name="host_id" value={cookies.userid} />
				</form>

			)
		} else {
			return <div />
		}
	}
}

class JoinGame extends React.Component {
	render () {

		let cookies = this.props.cookies;
		let lobby = this.props.lobby;

		if (cookies.loggedin === sha256(cookies.userid + cookies.username + SALT)) {

			return (
				<form className ="form-inline" method="GET" action={"/lobbies/" + lobby.id}>
					<input type="submit" value="Enter" className ="btn btn-primary" />
				</form>
			)

		} else {
			return <div />
		}
	}
}

class Index extends React.Component {
	render () {

		let allPlayers = this.props.allPlayers;
		let cookies = this.props.cookies;
		let lobbies = this.props.lobbies;

		for (let i in lobbies) {
			lobbies[i]['players'] = [];
			for (let y in allPlayers) {
				if (allPlayers[y].lobby_id === lobbies[i].id)
				lobbies[i].players.push(allPlayers[y]);
			}
		}	
		
		let lobbiesMap = lobbies.map(lobby => {

			let playerInGame = false;

				for (let i in lobby.players) {
					if (parseInt(cookies.userid) === lobby.players[i].user_id) {
						playerInGame = true;
					}
				}

			if (lobby.mission === 6) {
				return <div />
			} else if (playerInGame === true) {
				return (
					<div key={lobby.id} className="col-12 p-2">
						<div className="card p-3 my-1">
							<p className ="my-0">Lobby ID: {lobby.id}</p>
							<p className ="my-0">Name: {lobby.name}</p>
							<p className ="my-0">Host: {lobby.host_name}</p>
							<p className ="mt-0 mb-2">Players: {lobby.players.length}/5 <strong>You are in this game!</strong></p>
							<JoinGame cookies={this.props.cookies} lobby={lobby} />
						</div>
					</div>
				)
			} else if (lobby.players.length < 5) {
				return (
					<div key={lobby.id} className="col-12 p-2">
						<div className="card p-3 my-2">
							<p className ="my-0">Lobby ID: {lobby.id}</p>
							<p className ="my-0">Name: {lobby.name}</p>
							<p className ="my-0">Host: {lobby.host_name}</p>
							<p className ="mt-0 mb-2">Players: {lobby.players.length}/5</p>
							<JoinGame cookies={this.props.cookies} lobby={lobby} />
						</div>
					</div>
				)
			} else {
				return <div />
			}
		})

		return (

			<Layout title="Games" cookies={this.props.cookies}>
				<div className="col-12 px-2 py-2 m-0">
					<h1 className="m-0">Games</h1>
				</div>

				{lobbiesMap}

				<div className="col-12 p-2 my-1">
					<CreateGame cookies={this.props.cookies} />
				</div>

				<script src="/socket.io/socket.io.js" />					
				<script src='/lobbies.js' />
			</Layout>
		)
	}
}

module.exports = Index;