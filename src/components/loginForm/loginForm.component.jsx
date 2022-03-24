import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";

import "./loginForm.styles.scss";

export default function LoginForm() {
	
	const [stEmail, setEmail] = useState("");
	const [stPassword, setPassword] = useState("");
	const [stLoginDisabled, setLoginDisabled] = useState(true);
	const [stIsLoggingIn, setIsLoggingIn] = useState(false);

	const { t, i18n } = useTranslation();

	const onLoginAttempt = async (event) => {
		try {	
			setIsLoggingIn(stIsLoggingIn);
			const login = await fetch(
				"http://localhost:3001/users/login", 
				{
					method: "POST",
					body: JSON.stringify({
						stEmail,
						stPassword,
					}),
					headers: { 
						"Content-Type": "application/json",
					},
				}
			)
			if (login) {
				console.log(login);
			}
		} catch (error) {
			console.log(error);
		}	
	};

	useEffect(() => {
		// validate isEmail
		if (stPassword.length < 8 || stEmail.length < 5) {
			setLoginDisabled(true);
		} else {
			setLoginDisabled(false);
		}
	}, [stEmail, stPassword]);

	return stIsLoggingIn ? (
		<div>
			<p>Sending login request...</p>
		</div>
	) : (
		<div className="loginFormFrame">
			<form>
				<label htmlFor="emailInput"></label>
				<input
					name="emailInput"
					type="text"
					placeholder="e.g. saraJ7"
					onChange={(event) => {
						setEmail(event.target.value);
					}}
				/>

				<label htmlFor="passwordInput"></label>
				<input
					name="passwordInput"
					type="password"
					onChange={(event) => {
						setPassword(event.target.value);
					}}
				/>

				<button
					className="loginBtn"
					disabled={stLoginDisabled}
					onMouseUp={(event) => {
						onLoginAttempt(event);
					}}
				>
					Bejelentkezés
				</button>
			</form>
			<Link className="signupLink" to="/signup">
				<p>Click here to sign up</p>
			</Link>
		</div>
	);
}
