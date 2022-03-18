import { Component } from "react";

import "./loginFormStyle.css";

export default class LoginForm extends Component {
	constructor() {
		console.log("constructor");
		super();

		this.state = {
			email: "",
			password: "",
			loginDisabled: true,
			isLoggingIn: false,
		};
	}

	onUserInputChange = (event) => {
		this.setState({ email: event.target.value });
	};

	onPasswordInputChange = (event) => {
		this.setState({ password: event.target.value });
	};

	// a this bind miatt csak es6 fn szintaxis felel meg
	onLoginAttempt = (event) => {
		this.setState({ isLoggingIn: true });

		const { password, email } = this.state;

		// get data from state

		// fetch API
		fetch(
			"http://localhost:3001/users/login", 
			{
				method: "POST",
				body: JSON.stringify({
					email,
					password,
				}),
				headers: { 
					"Content-Type": "application/json",
				},
			}
		)
		.then((res) => res.json())
		.then((json) => console.log(json))
		.catch((err) => console.log(err));
	};

	render() {
		console.log("render");
		const { isLoggingIn, loginDisabled } = this.state;
		const { onUserInputChange, onPasswordInputChange, onLoginAttempt } =
			this;

		if (isLoggingIn) {
			return (
				<div>
					<p>Sending login request...</p>
				</div>
			);
		} else {
			return (
				<div className="loginFormFrame">
					<form>
						<label htmlFor="emailInput"></label>
						<input
							name="emailInput"
							type="text"
							placeholder="e.g. saraJ7"
							onChange={(event) => {
								onUserInputChange(event);
							}}
						/>

						<label htmlFor="passwordInput"></label>
						<input
							name="passwordInput"
							type="password"
							onChange={(event) => {
								onPasswordInputChange(event);
							}}
						/>

						<button
							className="loginBtn"
							disabled={loginDisabled}
							onMouseUp={(event) => {
								onLoginAttempt(event);
							}}
						>
							Bejelentkezés
						</button>
					</form>
				</div>
			);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const { password, email } = this.state;
		if (prevState.email !== email || prevState.password !== password) {
			// validate isemail
			if (password.length < 8 || email.length < 5) {
				this.setState({ loginDisabled: true });
			} else {
				this.setState({ loginDisabled: false });
			}
		}
	}
}
