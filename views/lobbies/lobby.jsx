var React = require("react");
var Layout = require('../layout/layout');
var Chat = require('../layout/chat');

class Lobby extends React.Component {
	render () {

		const lobby = this.props.lobby;

		return (
			<Layout cookies={this.props.cookies} title={'Game ' + lobby.id}>
				<div className="col-12 px-3 py-2 my-0">
					<h2 className="m-0">{lobby.name}</h2>
				</div>

				<div className="col-12 col-md-10 p-2">
					<div className="card p-3 my-0" id='gameBoard'>
						<h4 id='gameStatus' />
						<p id="phaseLine" />
						<ul id="choiceUl" />
						<ul id='votesUl' />	
						
						<form method="POST" action={'/lobbies/' + lobby.id + '/start?_method=PUT'} id='startButton' className='d-none'>
							<input type="hidden" name="lobby_id" value={lobby.id} />
							<input type="submit" value="Start Game" className ="btn btn-lg btn-primary" />
						</form>

						<form method="POST" action={'/lobbies/' + lobby.id + '/choose?_method=PUT'} id='chooseForm' className='d-none'>
						</form>

						<form method='POST' className='d-none' id='voteForm'>
							<input type='hidden' name='player_number' id='voteFormId' />
							<button type="submit" name="vote" className="btn btn-success" value="true">Yes</button>
							<button type="submit" name="vote" className="btn btn-danger mx-1" value="false">No</button>
						</form> 

						<form method='POST' className = 'd-none' id = 'missionForm'>
							<input type='hidden' name='player_number' id='missionFormId' />
							<input type='hidden' name='current_player' id='missionFormcurrent' />
							<button type="submit" name="vote" className="btn btn-success mx-1" value="true">Success</button>
							<button type="submit" name="vote" className="btn btn-danger mx-1" value="false" id='failButton'>Fail</button>
						</form>

						<p id='playerLine' className='mt-3 my-0'/>
						<div id='scoreboard' />
					</div>
				</div>

				<div className="col-12 col-md-2 p-2">
					<div className="card p-3 my-0">
						<h4 className="mb-2">Players</h4>
						<div id='listPlayers' />
					</div>
				</div>

				<Chat cookies={this.props.cookies} />
				<script src="/socket.io/socket.io.js" />	
				<script src="/script.js" />
			</Layout>
		)

	}
}

module.exports = Lobby;