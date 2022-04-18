import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ButtonGroup, Button } from "@mui/material";
import ReactModal from "react-modal";

import "../../localization/i18n";

import "./loginForm.styles.scss";
import { width } from "@mui/system";

export default function LoginForm() {
	const modalWidth = 150;
	const navigate = useNavigate();
	const { t, i18n } = useTranslation();
	
	const [stEmail, setEmail] = useState("");
	const [stPassword, setPassword] = useState("");
	const [stLoginDisabled, setLoginDisabled] = useState(true);
	const [stIsLoggingIn, setIsLoggingIn] = useState(false);
	const [stModalOpen, setModalOpen] = useState(false);

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
	};

	// muszáj ES6-os fn-nek lennie a this binding miatt
	const onLoginAttempt = async (event) => {
		try {	
			if (!stLoginDisabled) {
				setIsLoggingIn(stIsLoggingIn);
				const loginResultResponse = await fetch(
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

				const loginResult = await loginResultResponse.json();

				if (loginResult.success) {
					console.log(loginResult);
					navigate("/home");
					// válasz token beállítás, stLoggingIn visszaállítás
				} else {
					// nincs válasz kezelés
					setModalOpen(true);
				}
			}
		} catch (error) {
			console.log(error);
		}	
	};

	useEffect(() => {
		// validate isEmail?
		if (stPassword.length < 8 || stEmail.length < 5) {
			setLoginDisabled(true);
		} else {
			setLoginDisabled(false);
		}
	}, [stEmail, stPassword]);

	return stIsLoggingIn ? (
		<div className="loginFormLoader">
			<p>{t('description')}</p>
		</div>
	) : (
		<div className="loginFormContainer" >
			<ButtonGroup variant="contained" className="languageSelector">
				<Button onClick={() => changeLanguage('en')}>English</Button>
				<Button onClick={() => changeLanguage('hu')}>Hungarian</Button>
				<Button onClick={() => changeLanguage('it')}>Italian</Button>
			</ButtonGroup>
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
						onClick={(event) => {
							onLoginAttempt(event);
						}}
						type="submit"
					>
						{t("loginBtn.description")}
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
			<ReactModal 
				className="modalFrame"
				isOpen={stModalOpen}
				contentLabel={t("loginModalCloseBtn")}
				style={{
					content: {
						width: modalWidth,
						height: 150,
						backgroundColor: "aqua",
						position: "absolute",
						top: "calc(50vh - 75px)",
						left: `calc(50vw - ${modalWidth / 2}px)`
					}
				}}
			>
				<button className="modalCloseBtn" onClick={(event) => {
					setModalOpen(false);
				}}>Close</button>
				<p>hello from modal</p>
			</ReactModal>
		</div>
	);
}
