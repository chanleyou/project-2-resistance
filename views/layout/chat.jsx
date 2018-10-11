var React = require("react");

class Chat extends React.Component {
	render () {

		return (
			// fill out the className
			<div className="col-12"> 
				<div className="card p-3 shadow-sm">
					<h4>
						Chat
					</h4>
					<div id="chatArea" className="mt-1 mb-3">
					</div>
					<form id="chatForm" className="form-inline">
						<input type="text" id="chatField" className="form-control w-75" autoComplete="off" />
						<input type="submit" id="chatSubmit" className="btn btn-secondary ml-1" value ="Chat" />
					</form>
				</div>
				<script src="/socket.io/socket.io.js" />	
				<script src="/script.js" />
			</div>
			
		)
	}
}

module.exports = Chat;