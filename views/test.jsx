var React = require("react");

class Test extends React.Component {
	render () {

		return(

			<html>
			<head>
				<meta charSet="UTF-8"/>
				<title>Socket Test</title>
			</head>
			<body>
			<h1>Chat!</h1>
			<ul id="chatArea">
			</ul>
			<form id="chatForm">
				<input type="text" id="chatField" placeholder="Chat here!" autoComplete="off" />
				<input type="submit" id="chatSubmit" value ="Chat" />
			</form>
			</body>
			<script src="/socket.io/socket.io.js" />	
			<script src="script.js" />
			</html>
		)
	}
}

module.exports = Test;