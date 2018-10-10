var React = require("react");
var Layout = require('../layout/layout');
var Chat = require('../layout/chatbox');

class GameBoard extends React.Component {
	render () {

		let lobby = this.props.lobby;

		if (lobby.status === 'open') {
			return (
				<div />
			)
		} else {
			return <div />
		}

		// 1. player decides who to go on mission
		// 2. players vote
		// 3. if yes, mission commences, if not go back to 1, pass down turn
		// 4. players chosen decide mission success
		// 5. 
	}
} 

class Lobby extends React.Component {
	render () {

		let lobby = this.props.lobby;

		return (
			<Layout cookies={this.props.cookies} title={'Game ' + lobby.id}>
				<div>
					<GameBoard lobby={lobby} cookies={this.props.cookies} />
					<Chat cookies={this.props.cookies} />
				</div>
				<script src="/socket.io/socket.io.js" />	
				<script src="script.js" />
			</Layout>
		)

	}
}

module.exports = Lobby;