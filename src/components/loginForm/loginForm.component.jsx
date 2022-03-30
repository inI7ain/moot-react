import { useEffect, useState, Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";

import "./loginForm.styles.scss";

export default function LoginForm() {
	
	const [stEmail, setEmail] = useState("");
	const [stPassword, setPassword] = useState("");
	const [stLoginDisabled, setLoginDisabled] = useState(true);
	const [stIsLoggingIn, setIsLoggingIn] = useState(false);

	// const { t, i18n } = useTranslation();

	// muszáj ES6-os fn-nek lennie a this binding miatt
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
		<div className="LoginFormSigningIn">
			<p>Sending login request...</p>
		</div>
	) : (
		<div className="loginFormContainer" >
			<div className="loginFormFrame">
				<form className="loginForm">
					<img className="logo" src="https://pixel77.com/wp-content/uploads/2014/11/20-Creative-Chat-Logo-Designs-19.png" alt="logo" />
					<input
						name="emailInput"
						type="text"
						placeholder="Felhasználónév"
						onChange={(event) => {
							setEmail(event.target.value);
						}}
					/>
					<input
						name="passwordInput"
						type="password"
						placeholder="Jelszó"
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
					<div className="separator" />
					<div className="signUpFrame">
						<p>Nincs még fiókja?</p>
						<Link className="signupLink" to="/signup">
							<p>Regisztráció</p>
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
