import { useEffect, useState, Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import VerticalLayout from "../verticalLayout/verticalLayout.component";
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
			if (!stLoginDisabled) {
				setIsLoggingIn(stIsLoggingIn);
				const loginResult = await fetch(
					"http://localhost:3001/users/login", 
					{
						method: "POST",
						body: JSON.stringify({
							email: stEmail,
							password: stPassword
						}),
						headers: { 
							"Content-Type": "application/json"
						}
					}
				);

				if (loginResult) {
					console.log(loginResult.json());
					// válasz kezelés, stLoggingIn visszaállítás, -> route
				} else {
					// nincs válasz kezelés
				}
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
		<div className="loginFormLoader">
			<p>Bejelentkezés...</p>
		</div>
	) : (
		<div className="loginFormContainer" >
			<div className="logoFrame">
				<img 
					className="logoImg"
					src="https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/chat-512.png"
					alt="logo"
				/>
			</div>
			<div className="loginFormFrame">
				<h3>Moot</h3>
				<div className="topSeparator" />
				<p className="loginMsg">Bejelentkezés</p>
				<form className="loginForm" onSubmit={(evt) => evt.preventDefault()}>
					<input
						name="emailInput"
						type="text"
						placeholder="e-mail cím"
						onChange={(event) => {
							setEmail(event.target.value);
						}}
					/>
					<input
						name="passwordInput"
						type="password"
						placeholder="jelszó"
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
						type="submit"
					>
						Bejelentkezés
					</button>
					<div className="bottomSeparator" />
					<div className="signUpFrame">
						<p>Nincs még fiókja?</p>
						<Link className="signupLink" to="/signup">
							<p>Regisztráció</p>
						</Link>
					</div>
					<div>
						<Link className="pwResetLink" to="/pwReset">
							<p>Elfelejtette a jelszavát?</p>
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
