import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PersonIcon from '@mui/icons-material/Person';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';

import "./home.styles.scss";

export default function Home() {

	// const [stValue, setValue] = useState(0);

	const navigate = useNavigate();

	return (
		<div className="homeScreenContainer">
			<Box sx={{ width: "100vw" }}>
				<BottomNavigation
					showLabels={true}
					// value={stValue}
					/* onChange={(event, newValue) => {
						setValue(newValue);
					}} */
				>
					<BottomNavigationAction label="Feed" icon={<HomeIcon />} onClick={() => {
						navigate("/home");
					}}/>
					<BottomNavigationAction label="Task manager" icon={<TaskAltIcon />} onCliCk={() => {
						navigate("/taskManager");
					}}/>
					<BottomNavigationAction label="Chat" icon={<ChatBubbleIcon />} onCliCk={() => {
						navigate("/chat");
					}}/>
					<BottomNavigationAction label="Profile" icon={<PersonIcon />} onClick={() => {
						navigate("/readProfile");
					}}/>
					{/* kontakt felvétel későbbiekben */}
					{/* <BottomNavigationAction label="Contacts" icon={<PersonAddIcon />} /> */}
				</BottomNavigation>
			</Box>
			<h1>hello from home</h1>
		</div>
	);
};
