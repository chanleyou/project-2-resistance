var React = require("react");
var Layout = require('./layout/layout');
var ChatBox = require('./layout/chatbox');

class Test extends React.Component {
	render () {

		return(
			<Layout title="Test Page" cookies={this.props.cookies}>
				<div>
					<ChatBox />
				</div>
			</Layout>
		)
	}
}

module.exports = Test;