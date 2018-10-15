var React = require("react");
var Layout = require('../layout/layout');

class Lobby extends React.Component {
	render() {

		const lobby = this.props.lobby;

		return (
			<Layout cookies={this.props.cookies} title={'Game ' + lobby.id}>
				<div className="row">
					<div className="col-12 p-3 m-1">
						<h2 className="m-0">{lobby.name}</h2>
					</div>
				</div>

				<div className="row">

					<div className="col-12 p-3 border rounded-0" id='gameBoard'>
						<h4 id='gameStatus' />
						<p id="phaseLine" />
						<ul id="choiceUl" />
						<ul id='votesUl' />

						<form method="POST" action={'/lobbies/' + lobby.id + '/start?_method=PUT'} id='startButton' className='d-none'>
							<input type="hidden" name="lobby_id" value={lobby.id} />
							<input type="submit" vaue="Start Game" className="btn btn-lg btn-primary" />
						</form>

						<form method="POST" action={'/lobbies/' + lobby.id + '/choose?_method=PUT'} id='chooseForm' className='d-none'>
						</form>

						<form method='POST' className='d-none' id='voteForm'>
							<input type='hidden' name='player_number' id='voteFormId' />
							<button type="submit" name="vote" className="btn btn-success" value="true">Yes</button>
							<button type="submit" name="vote" className="btn btn-danger mx-1" value="false">No</button>
						</form>

						<form method='POST' className='d-none' id='missionForm'>
							<input type='hidden' name='player_number' id='missionFormId' />
							<input type='hidden' name='current_player' id='missionFormcurrent' />
							<button type="submit" name="vote" className="btn btn-success mx-1" value="true">Success</button>
							<button type="submit" name="vote" className="btn btn-danger mx-1" value="false" id='failButton'>Fail</button>
						</form>

						<p id='playerLine' className='mt-3 my-0' />
					</div>
				</div>

				<div className="row">
					<div className="col-12 col-md-4 col-lg-3 p-0">
						<div className="p-3 border">
							<h5 className="card-title">Players</h5>
							<div id='listPlayers' />
						</div>

						<div className="p-3 border rounded-0" id='missionLogs'>
							<h5 className="card-title">Results</h5>
							<div id='scoreboard' />
						</div>
					</div>

					<div className="col p-3 border rounded-0">
						<h4>Chat</h4>
						<div id="chatArea" className="mt-1 mb-3 p-1 small" style={{ height: '12rem', overflow: 'auto' }}>
						</div>
						<form id="chatForm" className="form-inline">
							<input type="text" id="chatField" className="form-control col" autoComplete="off" />
							<input type="submit" id="chatSubmit" className="btn btn-secondary ml-1 col-3 col-md-2 col-lg-1" value="Chat" />
						</form>
					</div>
				</div>

				<script src="/socket.io/socket.io.js" />
				<script src="/script.js" />
			</Layout>
		)

	}
}

module.exports = Lobby;