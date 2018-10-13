var React = require("react");
var Layout = require('../layout/layout');
var Chat = require('../layout/chat');

class Lobby extends React.Component {
	render () {

		const lobby = this.props.lobby;

		return (
			<Layout cookies={this.props.cookies} title={'Game ' + lobby.id}>
				<div className="col-12 my-3">
					<h1>{lobby.name}</h1>
				</div>

				<div className="col-12 col-lg-10">
					<div className="card p-3 my-2 shadow-sm" id='gameBoard'>
						<h2 id='gameStatus' />
						<p id="phaseLine" />
						<ul id="choiceUl" className='d-none' />
						<ul id='votesUl' />
						
						<form method="POST" action={'/lobbies/' + lobby.id + '/start?_method=PUT'} id='startButton' className='d-none'>
							<input type="hidden" name="lobby_id" value={lobby.id} />
							<input type="submit" value="Start Game" className ="btn btn-lg btn-primary" />
						</form>

						<form method="POST" action={'/lobbies/' + lobby.id + '/choose?_method=PUT'} id='chooseForm' className='d-none'>
						</form>

						<form method='POST' className='d-none' id='voteForm'>
						<input type='hidden' name='player_number' id='voteFormId' />
						<button type="submit" name="vote" className="btn btn-success mx-1" value="true">Yes</button>
						<button type="submit" name="vote" className="btn btn-danger mx-1" value="false">No</button>
						</form> 

					</div>
					<div className="card p-3 my-2 shadow-sm" id = 'dashboard'>
						<p id='playerLine' className='my-0'/>
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