import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
	Button,
	TextField
} from "@mui/material";
import ReactLoading from "react-loading";
import ReactModal from "react-modal";
import PasswordStrengthBar from "react-password-strength-bar";

import LanguageSelect from "../../languageSelect/languageSelect.component";
import "../../localization/i18n";

import "./signupForm.styles.scss";


export default function SignupForm() {
	const modalWidth = 300,
		  modalHeight = 100;
	const navigate = useNavigate();
	const { t, i18n } = useTranslation();

	const [stUsername, setUsername] = useState("");
	const [stEmail, setEmail] = useState("");
	const [stPassword, setPassword] = useState("");
	const [stConfirmPassword, setConfirmPassword] = useState("");
	const [stSignupDisabled, setSignupDisabled] = useState(true);
	const [stPwMatching, setPwMatching] = useState(false);
	const [stIsSigningUp, setIsSigningUp] = useState(false);
	const [stModalOpen, setModalOpen] = useState(false);

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
	};

	const onSignupAttempt = async (event) => {
		try {
			if (!stSignupDisabled) {
				setIsSigningUp(true);
				const signupResultResponse = await fetch(
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

				const signupResult = await signupResultResponse.json();

				if (signupResult.success) {
					console.log(signupResult);
					navigate("/home");
					// válasz, stSigningup állítás, -> route
				} else {
					setIsSigningUp(false);
					setModalOpen(true);
				}
			}
		} catch (error) {
			console.log(error);
			setIsSigningUp(false);
			setModalOpen(true);
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
			<LanguageSelect />
			<div className="logoFrame">
				<img 
					className="logoImg"
					src="https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/chat-512.png"
					alt="logo"
				/>
			</div>
			{!stIsSigningUp &&
				<div className="signupFormFrame">
					<h3>Moot</h3>
					<div className="topSeparator" />
					<p className="signupMsg">Hozzon létre új fiókot</p>
					<form className="signupForm">
						<TextField 
							type="text"
							variant="standard"
							className="usernameInput"
							placeholder="felhasználónév"
							onChange={(evt) => {
								setUsername(evt.target.value);
							}}
						/>
						<TextField 
							type="text"
							variant="standard"
							className="emailInput"
							placeholder="e-mail cím"
							onChange={(evt) => {
								setEmail(evt.target.value);
							}}
						/>
						<TextField
							variant="standard" 
							type="password"
							className="passwordInput"
							placeholder="jelszó"
							onChange={(evt) => {
								setPassword(evt.target.value);
							}}
						/>
						<TextField 
							type="password"
							variant="standard"
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
						<Button
							variant="contained"
							className="signupBtn"
							disabled={stSignupDisabled}
							onClick={(event) => {
								onSignupAttempt(event);
							}}
						>
							Regisztráció
						</Button>
						<Link className="loginLink" to="/">
							<p>Van már fiókja?</p>
						</Link>
						{/* jelszó erősség mérő */}
						{/* avatar? */}
					</form>
				</div>
			}
			{stIsSigningUp &&
				<ReactLoading
					type="bubbles"
					color={"#44a8a8"}
					height={125}
					width={125}
					disabled={!stIsSigningUp}
				/>
			}	
			<ReactModal
				className="signupFormModalFrame"
				isOpen={stModalOpen}
				contentLabel={t("sgnpFormMdlContLbl.description")}
				// onRequestClose={setIsLoggingIn(false)}
				role="dialog"
				shouldCloseOnEsc={true}
				ariaHideApp={false}
				style={{
					content: {
						width: modalWidth,
						height: modalHeight,
						borderRadius: 12,
						backgroundColor: "white",
						boxShadow: "rgba(99, 99, 110, 0.2) 0px 7px 29px 0px",
						position: "absolute",
						border: "1px solid lightgray",
						textAlign: "center",
						top: `calc(50vh - ${modalHeight / 2}px)`,
						left: `calc(50vw - ${modalWidth / 2}px)`,
					},
				}}
			>
				<p>{t("sgnpFormMdlMsg.description")}</p>
				<Button
					className="modalCloseBtn"
					variant="outlined"
					onClick={(event) => {
						setModalOpen(false);
					}}
				>
					{t("lgnFormMdlCloseBtn.description")}
				</Button>
			</ReactModal>
		</div>
	);
};