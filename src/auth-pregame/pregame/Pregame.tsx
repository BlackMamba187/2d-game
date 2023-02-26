import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
} from "react-router-dom";
import Friends from "./Friends/Friends";
import Games from "./Games/Games";
import Heros from "./Heros/Heros";
import Home from "./Home/Home";
import Settings from "./Settings/Settings";

const Pregame = () => {
	const Mylocation = useLocation();
	return (
		<div className="min-h-screen max-h-screen bg-cover bg-center bg-no-repeat bg-[url('https://img.itch.zone/aW1hZ2UvMTQ1OTg5OS84NTIyMDY2LnBuZw==/original/6HnMxI.png')] overflow-y-auto scrollbar-none">
			<Routes  location={Mylocation} key={Mylocation.pathname}>
				<Route  path="/" element={<Home />} />
				<Route path="/heros" element={<Heros />} />
				<Route path="/games" element={<Games />} />
				<Route path="/friends" element={<Friends />} />
				<Route path="/settings" element={<Settings />} />
			</Routes>
		</div>
	);
};

export default Pregame;
