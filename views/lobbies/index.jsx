var React = require("react");
var Layout = require('../layout/layout');
var Chat = require('../layout/chat');

const sha256 = require('js-sha256');
const SALT = "latvianpotato";

class CreateGame extends React.Component {
	render () {

		let cookies = this.props.cookies;

		if (cookies.loggedin === sha256(cookies.userid + cookies.username + SALT)) {
			return (
				<form className ="form-inline my-2" method="POST" action="/lobbies">
					<input type="text" name="name" placeholder="Lobby Name" required autoComplete="off" />
					<input type="hidden" name="host_id" value={cookies.userid} />
					<input type="submit" value="Create" className ="btn btn-success ml-1" />
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
					<input type="submit" value="Join" className ="btn btn-sm btn-primary" />
				</form>
			)

		} else {
			return <div />
		}
	}
}

class Index extends React.Component {
	render () {

		let lobbies = this.props.lobbies.map(lobby => {
			return (
				<div key={lobby.id} className="col-12">
					<div className="card p-3 my-2 shadow-sm">
						<p>Lobby ID: {lobby.id}</p>
						<p>Name: {lobby.name}</p>
						<p>Host: {lobby.host_name}</p>
						<p>Players: {lobby.player_count}/5 -- obselete -- REPLACE WITH players_in_lobby.rowCount</p>
						<JoinGame cookies={this.props.cookies} lobby={lobby} />
					</div>
				</div>
			)
		})

		return (

			<Layout title="Games" cookies={this.props.cookies}>
				<div className="col-12">
					<h1 className="mt-4 mb-2">Games</h1>
					<CreateGame cookies={this.props.cookies} />
				</div>

				{lobbies}

			</Layout>
		)
	}
}

module.exports = Index;