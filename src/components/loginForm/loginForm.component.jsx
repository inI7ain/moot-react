import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
	Button,
	Select,
	TextField,
	MenuItem,
	InputLabel,
	FormControl,
} from "@mui/material";
import ReactLoading from "react-loading";
import ReactModal from "react-modal";

import "../../localization/i18n";

import "./loginForm.styles.scss";

export default function LoginForm() {
	const modalWidth = 300,
		  modalHeight = 150;
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
				setIsLoggingIn(true);
				const loginResultResponse = await fetch(
					"http://localhost:3001/users/login",
					{
						method: "POST",
						body: JSON.stringify({
							email: stEmail,
							password: stPassword,
						}),
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				const loginResult = await loginResultResponse.json();

				if (loginResult.success) {
					console.log(loginResult);
					navigate("/home");
					// válasz token beállítás, stLoggingIn visszaállítás
				} else {
					// nincs válasz kezelés
					setIsLoggingIn(false);
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

	return (
		<div className="loginFormContainer">
			<FormControl
				className="languageSelectorFrame"
				variant="standard"
				sx={{ m: 1, minWidth: 120 }}
			>
				<InputLabel
					className="languageSelectorLabel"
					id="lngSelectLabel"
				>
					{t("lngSelLbl.description")}
				</InputLabel>
				<Select
					placeholder="Language"
					labelId="lngSelectLabel"
					className="languageSelector"
					defaultValue={"hu"}
					label="Language"
				>
					<MenuItem
						onClick={(evt) => {
							changeLanguage(evt.target.dataset.value);
						}}
						value={"en"}
					>
						English
					</MenuItem>
					<MenuItem
						onClick={(evt) => {
							changeLanguage(evt.target.dataset.value);
						}}
						value={"hu"}
					>
						Magyar
					</MenuItem>
					<MenuItem
						onClick={(evt) => {
							changeLanguage(evt.target.dataset.value);
						}}
						value={"it"}
					>
						Italiano
					</MenuItem>
				</Select>
			</FormControl>
			<div className="logoFrame">
				<img
					className="logoImg"
					src="https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/chat-512.png"
					alt="logo"
				/>
			</div>
			{!stIsLoggingIn &&
				<div className="loginFormFrame">
					<h3>Moot</h3>
					<div className="topSeparator" />
					<p className="loginMsg">{t("lgnFormLbl.description")}</p>
					<form
						className="loginForm"
						onSubmit={(evt) => evt.preventDefault()}
					>
						<TextField
							name="emailInput"
							variant="standard"
							type="text"
							placeholder={t("lgnFormEmailPlchdr.description")}
							onChange={(event) => {
								setEmail(event.target.value);
							}}
						/>
						<TextField
							name="passwordInput"
							variant="standard"
							type="password"
							placeholder={t("lgnFormPwPlchldr.description")}
							onChange={(event) => {
								setPassword(event.target.value);
							}}
						/>
						<Button
							className="loginBtn"
							variant="contained"
							disabled={stLoginDisabled}
							onClick={(event) => {
								onLoginAttempt(event);
							}}
							type="submit"
							disableElevation
						>
							{t("lgnFormLgnBtn.description")}
						</Button>
						<div className="bottomSeparator" />
						<div className="signUpFrame">
							<p>{t("lgnFormRegPrompt.description")}</p>
							<Link
								className="signupLink"
								underline="hover"
								to="/signup"
							>
								<p>{t("lgnFormRegLnk.description")}</p>
							</Link>
						</div>
						<div className="bottomSeparator" />
						<div>
							<p>{t("lgnFormPwResPrompt.description")}</p>
							<Link className="pwResetLink" to="/pwReset">
								{t("lgnFormPwResLnk.description")}
							</Link>
						</div>
					</form>
				</div>
			}
			{stIsLoggingIn &&
				<ReactLoading
					type="bubbles"
					color={"#44a8a8"}
					height={125}
					width={125}
					disabled={!stIsLoggingIn}
				/>
			}	
			<ReactModal
				className="loginFormModalFrame"
				isOpen={stModalOpen}
				contentLabel={t("lgnFormMdlContLbl.description")}
				// onRequestClose={setIsLoggingIn(false)}
				role="dialog"
				shouldCloseOnEsc={true}
				style={{
					content: {
						width: modalWidth,
						height: 150,
						borderRadius: 12,
						backgroundColor: "whitesmoke",
						position: "absolute",
						top: `calc(50vh - ${modalHeight / 2}px)`,
						left: `calc(50vw - ${modalWidth / 2}px)`,
					},
				}}
			>
				<p>{t("lgnFormMdlMsg.description")}</p>
				<Button
					className="modalCloseBtn"
					variant="text"
					onClick={(event) => {
						setModalOpen(false);
					}}
				>
					{t("lgnFormMdlCloseBtn.description")}
				</Button>
			</ReactModal>
		</div>
	);
}
