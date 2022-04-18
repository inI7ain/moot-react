import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PasswordStrengthBar from 'react-password-strength-bar';

import "./signupForm.styles.scss";


export default function SignupForm() {

	const [stUsername, setUsername] = useState("");
	const [stEmail, setEmail] = useState("");
	const [stPassword, setPassword] = useState("");
	const [stConfirmPassword, setConfirmPassword] = useState("");
	const [stSignupDisabled, setSignupDisabled] = useState(true);
	const [stPwMatching, setPwMatching] = useState(false);
	const [stSigningUp, setSigningUp] = useState(false);

	const onSignupAttempt = async (event) => {
		try {
			if (!stSignupDisabled) {
				setSigningUp(true);
				const signupResult = await fetch(
					"http://localhost:3001/users/create",
					{
						method: "POST",
						body: JSON.stringify({
							username: stUsername,
							email: stEmail,
							password: stPassword,
							// stAvatar?
						}),
						headers: { 
							"Content-Type": "application/json",
						}
					}
				);

				if (signupResult) {
					console.log(signupResult);
					// válasz, stSigningup állítás, -> route
				} else {

				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (stPassword.length || stConfirmPassword.length) {
			// szükséges feltétel, hogy üres jelszavak esetén ne legyen egyezés
			if (stConfirmPassword === stPassword) {
				setPwMatching(true);
				setSignupDisabled(false);
			} else {
				setPwMatching(false);
				setSignupDisabled(true);
			}
		}
	}, [stPassword, stConfirmPassword])

	return (
		<div className="signupFormContainer">
			<div className="logoFrame">
				<img 
					className="logoImg"
					src="https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/chat-512.png"
					alt="logo"
				/>
			</div>
			<div className="signupFormFrame">
				<h3>Moot</h3>
				<div className="topSeparator" />
				<p className="signupMsg">Hozzon létre új fiókot</p>
				<form className="signupForm">
					<input 
						type="text"
						className="usernameInput"
						placeholder="felhasználónév"
						onChange={(evt) => {
							setUsername(evt.target.value);
						}}
					/>
					<input 
						type="text"
						className="emailInput"
						placeholder="e-mail cím"
						onChange={(evt) => {
							setEmail(evt.target.value);
						}}
					/>
					<input 
						type="password"
						className="passwordInput"
						placeholder="jelszó"
						onChange={(evt) => {
							setPassword(evt.target.value);
						}}
					/>
					<input 
						type="password"
						className="passwordConfirmInput"
						placeholder="jelszó megerősítése"
						onChange={(evt) => {
							setConfirmPassword(evt.target.value);
						}}
					/>
					<div className="pwStrengthMeter">
						<PasswordStrengthBar 
							minLength={8}
							password={stPassword}
							shortScoreWord={"túl rövid (min. 8)"}
							scoreWords={["gyenge", "átlagos", "jó", "erős", "nagyon erős"]}
						/>
					</div>
					{(!stPwMatching && (stPassword.length || stConfirmPassword.length)) ?
						<div className="matchingAlert">
							A beírt jelszavak nem egyeznek!
						</div> : <></>
					}
					<button
						className="signupBtn"
						disabled={stSignupDisabled}
						onClick={(event) => {
							onSignupAttempt(event);
						}}
					>
						Regisztráció
					</button>
					<Link className="loginLink" to="/">
						<p>Van már fiókja?</p>
					</Link>
					{/* jelszó erősség mérő */}
					{/* avatar? */}
				</form>
			</div>
		</div>
	);
};