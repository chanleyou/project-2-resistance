var React = require("react");
var Layout = require('../layout/layout');
var Chat = require('../layout/chat');

class Lobby extends React.Component {
	render () {

		console.log('PROPS: ', this.props);

		const lobby = this.props.lobby;

		return (
			<Layout cookies={this.props.cookies} title={'Game ' + lobby.id}>
				<div className="col-12 my-3">
					<h1>{lobby.name}</h1>
				</div>

				<div className="col-12 col-lg-10">
					<div className="card p-3 my-2 shadow-sm">
						<h1 id='gameStatus' />
					</div>
					<div className="card p-3 my-2 shadow-sm">
						<h4>Dashboard here!</h4>
					</div>
				</div>

				<div className="col-12 col-lg-2">
					<div className="card p-3 my-2 shadow-sm">
						<h4 className="mb-2">Players</h4>
						<div id='listPlayers' />
					</div>
				</div>

				<Chat cookies={this.props.cookies} />
			</Layout>
		)

	}
}

module.exports = Lobby;