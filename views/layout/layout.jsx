var React = require('react');

const sha256 = require('js-sha256');
const SALT = "latvianpotato";

class ProfileLink extends React.Component {

	render() {

		let cookies = this.props.cookies;

		if (cookies.loggedin === sha256(cookies.userid + cookies.username + SALT)) {
			return (
				<div className='nav-item nav-link'>
					<button className="text-light p-0 btn btn-link" href="#">{cookies.username}</button>
				</div>
			)
		} else {
			return <span />
		}
	}
}

class Login extends React.Component {

	render() {

		if (this.props.cookies.loggedin) {
			return (
				<div className="navbar-nav ml-auto">
					<form method="POST" action="/users/logout" className="form-inline nav-item nav-link">
						<input type="submit" className="btn btn-link p-0 text-light" value="Logout" />
					</form>
				</div>
			)
		} else {
			return (
				<div className="navbar-nav ml-auto">

					<form method="GET" action="/users/login" className="form-inline nav-item nav-link">
						<input type="submit" className="btn btn-link p-0 text-light" value="Login" />
					</form>
					<form method="GET" action="/users/new" className="form-inline nav-item nav-link">
						<input type="submit" className="btn btn-link p-0 text-light" value="Register" />
					</form>
				</div>
			)
		}
	}
}

class Layout extends React.Component {

	render() {

		return (

			<html>
				<head>
					<title>{this.props.title}</title>
					<meta name="viewport" content="width=device-width" />
					<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" />
				</head>
				<body>
					<nav className="navbar navbar-expand-md navbar-dark bg-dark">
						<div className="container">
							<a className="navbar-brand mb-0 h1" href="/">Resistance</a>
							<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
								<span className="navbar-toggler-icon"></span>
							</button>
							<div className="collapse navbar-collapse" id="navbarSupportedContent">
								<div className="navbar-nav mr-auto">
									<div className="nav-item nav-link">
										<button type="button" className="btn btn-link p-0 text-light" data-toggle="modal" data-target="#exampleModal" value="Rules">Rules</button>
									</div>
									<ProfileLink cookies={this.props.cookies} />
								</div>
								<Login cookies={this.props.cookies} />
							</div>
						</div>
					</nav>
					<div className="container">
						{this.props.children}
					</div>
					<footer className="row">
					</footer>

					<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title" id="exampleModalLabel">Instructions</h5>
									<button type="button" className="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div className="modal-body">
									<p className='text-justify small'>
										Players are randomly split into two teams: the Resistance (3 players) and Spies (2 players). The Spies know each other's identities.
									</p>

									<p className='text-justify small'>
										At the start of the game, a randomly chosen mission leader chooses 2-3 players to go for the mission. The position of mission leader passes on to the next player every round.
									</p>

									<table className="table small table-bordered">
										<tbody>
											<tr>
												<th scope="col">Mission #</th>
												<td>1</td>
												<td>2</td>
												<td>3</td>
												<td>4</td>
												<td>5</td>
											</tr>
											<tr>
												<th scope="row">Players Needed</th>
												<td>2</td>
												<td>3</td>
												<td>2</td>
												<td>3</td>
												<td>3</td>
											</tr>
										</tbody>
									</table>

									<p className='text-justify small'>
										The players then vote on whether they agree with the mission leader's proposal. If the vote fails, the role of mission leader passes on to the next player. The Spies automatically win the game if the vote fails to go through five times in a row.
									</p>

									<p className='text-justify small'>
										Spies, if chosen for the mission can choose to sabotage it, earning them a point. The Resistance earns a point if nobody sabotages the mission.
									</p>

									<p className='text-justify small'>
										The first team to get three points wins.
									</p>

								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
								</div>
							</div>
						</div>
					</div>

				</body>
				<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" />
				<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" />
				<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" />
			</html>
		)
	}
}

module.exports = Layout;
