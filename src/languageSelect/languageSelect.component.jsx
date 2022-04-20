import { useTranslation } from "react-i18next";
import {
	Select,
	MenuItem,
	InputLabel,
	FormControl,
} from "@mui/material";

import "./languageSelect.styles.scss";

export default function LanguageSelect() {

	const { i18n, t } = useTranslation();

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
	};

	return (
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
	);
}