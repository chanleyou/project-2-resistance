var React = require("react");

class ChatBox extends React.Component {
	render () {

		return (
			// fill out the className
			<div> 
				<ul id="chatArea">
				</ul>
				<form id="chatForm">
					<input type="text" id="chatField" autoComplete="off" />
					<input type="submit" id="chatSubmit" value ="Chat" />
				</form>
			</div>
		)
	}
}

module.exports = ChatBox;