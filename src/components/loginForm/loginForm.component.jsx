import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
	Button,
	TextField,
} from "@mui/material";
import ReactLoading from "react-loading";
import ReactModal from "react-modal";

import LanguageSelect from "../../components/languageSelect/languageSelect.component";
import "../../localization/i18n";

import "./loginForm.styles.scss";

export default function LoginForm() {
	const modalWidth = 300,
		  modalHeight = 100;
	const navigate = useNavigate();
	const { t } = useTranslation();

	const [stEmail, setEmail] = useState("");
	const [stPassword, setPassword] = useState("");
	const [stLoginDisabled, setLoginDisabled] = useState(true);
	const [stIsLoggingIn, setIsLoggingIn] = useState(false);
	const [stModalOpen, setModalOpen] = useState(false);
	const [stPasswordReset, setPasswordReset] = useState(false);

	
	// muszáj ES6-os fn-nek lennie a this binding miatt
	const onLoginAttempt = async (event) => {
		try {
			if (!stLoginDisabled) {
				setIsLoggingIn(true);
				const loginResultResponse = await fetch(
					"/apiv1/users/login",
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

				if (loginResult?.success) {
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
			setModalOpen(true);
			setIsLoggingIn(false);
		}
	};

	const onPwResetAttempt = async (event) => {
		try {
			fetch(
				"/apiv1/users/resetPassword",
				{
					method: "POST",
					body: JSON.stringify({
						email: stEmail,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			setModalOpen(true);
		} catch (error) {
			console.log(error);
		}
	}

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
			<LanguageSelect />
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
					{!stPasswordReset && 
						<>
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
									<Button variant="text" className="pwResetBtn" onClick={() => {
										setPasswordReset(true);
									}}>
										{t("lgnFormPwResLnk.description")}
									</Button>
								</div>
							</form>
						</>
					}
					{stPasswordReset &&
						<>
							<TextField
								name="emailInput"
								variant="standard"
								type="text"
								placeholder={t("lgnFormResetEmailPlchdr.description")}
								onChange={(event) => {
									setEmail(event.target.value);
								}}
							/>
							<div className="resetBtnFrame">
								<Button
									className="resetBtn"
									variant="contained"
									disabled={!stEmail.length}
									onClick={() => {
										onPwResetAttempt(stEmail);
									}}
									type="submit"
									disableElevation
								>
									{t("lgnFormResetBtn.description")}
								</Button>
								<Button
									className="returnBtn"
									variant="contained"
									onClick={(event) => {
										setPasswordReset(false);
									}}
									type="button"
									disableElevation
								>
									{t("lgnFormCxlResetBtn.description")}
								</Button>
							</div>			
						</>
					}
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
			{stPasswordReset &&
				<div className="passwordResetFrame">

				</div>
			}
			<ReactModal
				bodyOpenClassName="loginFormModalFrame"
				isOpen={stModalOpen}
				contentLabel={t("lgnFormMdlContLbl.description")}
				onRequestClose={() => {
					setIsLoggingIn(false);
				}}
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
				{!stPasswordReset && 
					<p>{t("lgnFormMdlMsg.description")}</p>
				}
				{stPasswordReset && 
					<p>{t("lgnFormMdlResetMsg.description")}</p>
				}
				<Button
					className="modalCloseBtn"
					variant="outlined"
					onClick={(event) => {
						setModalOpen(false);
						if(stPasswordReset) { 
							setPasswordReset(false);
						}
					}}
				>
					{t("lgnFormMdlCloseBtn.description")}
				</Button>
			</ReactModal>
		</div>
	);
}
