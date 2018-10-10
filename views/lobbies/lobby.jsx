var React = require("react");
var Layout = require('../layout/layout');

class Index extends React.Component {
	render () {

		let lobbies = this.props.lobbies.map(lobby => {
			return (
				<div key={lobby.id} className="col-12">
					<div className="card p3 my-2 shadow-sm">
						<p>LOBBY ID: {lobby.id}</p>
						<p>HOST ID: {lobby.host_id}</p>
						<p>JOIN BUTTONS HERE</p>
					</div>
				</div>
			)
		})

		return (

			<Layout title="Games" cookies={this.props.cookies}>
				<div className="col-12">
					<h1 className="mt-4 mb-2">Games</h1>
				</div>

				{lobbies}
			
			</Layout>
		)
	}
}