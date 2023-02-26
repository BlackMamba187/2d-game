import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { auth } from "../firebase/FirebaseConfig";
import Canvas from "../game/canvas/Canvas";
import OverWorld from "../game/classes/overworld/Overworld";
import ForgotPassword from "./authFlow/ForgotPassword/ForgotPassword";
import Landing from "./authFlow/Landing/Landing";

import Friends from "./pregame/Friends/Friends";
import GameRoom from "./pregame/Games/GameRoom";
import Games from "./pregame/Games/Games";
import Createhero from "./pregame/Heros/Createhero";
import Heros from "./pregame/Heros/Heros";
import Home from "./pregame/Home/Home";
import Settings from "./pregame/Settings/Settings";


const UI_SCALE_FACTOR = 1;

const Main = () => {
	const [currentUser, setCurrentUser] = useState(false);

	onAuthStateChanged(auth, (user) => {
		if (user) {
			setCurrentUser(true);
		} else {
			setCurrentUser(false);
		}
	});

	let width = window.innerWidth * UI_SCALE_FACTOR;
	let height = window.innerHeight * UI_SCALE_FACTOR;

	const draw = (context: any, state:any) => {
		const OverworldGame = new OverWorld();
		OverworldGame.init(context, state);

		window.onresize = () => {
			context.canvas.width = window.innerWidth * UI_SCALE_FACTOR;
			context.canvas.height = window.innerHeight * UI_SCALE_FACTOR;
		};
	};

	return (
		<>
			{currentUser ? (
				<Routes>
					<Route path="/home" element={<Home />} />
					<Route path="/heros" element={<Heros />} />
					<Route path="/createhero" element={<Createhero />} />
					<Route path="/games" element={<Games />} />
					<Route path="/gameroom" element={<GameRoom />} />
					<Route path="/friends" element={<Friends />} />
					<Route path="/settings" element={<Settings />} />
					<Route
						path="/maingame"
						element={
							<div className="game-container">
								<Canvas draw={draw} height={height} width={width} />
							</div>
						}
					/>
					<Route path="*" element={<Navigate to="/home" replace />} />
				</Routes>
			) : (
				<Routes>
					<Route path="/landing" element={<Landing />} />
					<Route path="/forgotpassword" element={<ForgotPassword />} />
					<Route path="*" element={<Navigate to="/landing" replace />} />
				</Routes>
			)}
		</>
	);
};

export default Main;
