import { useEffect, useState } from "react";
import {
	addDoc,
	collection,
	doc,
	DocumentData,
	getDoc,
	onSnapshot,
	updateDoc,
} from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, real_db } from "../../../firebase/FirebaseConfig";
import Search from "../../components/Search";
import square from "../../../assets/ui/square.png";
import Square from "../../components/Square";
import { onValue, push, ref, set } from "firebase/database";
const Games = () => {
	const [games, setGames] = useState<any>([]);
	const navigate = useNavigate();
	const gamesRef = ref(real_db, "games");

	useEffect(() => {
		onValue(gamesRef, (snapshot) => {
			const data = snapshot.val();
			if (data) {
				const gamesArray = Object.entries(data).map(
					([key, value]: [string, any]) => ({
						id: key,
						...value,
					})
				);
				setGames(gamesArray);
			}
		});
	}, []);

	const newGame = {
		name: "Game 1",
		state: "waiting_for_players",
		private: true,
		players: [],
	};

	const gameRoomNav = async () => {
		const newGameRef = push(gamesRef);
		const newGameKey = newGameRef.key;
		await set(newGameRef, newGame);
		navigate("/gameroom", { state: { id: newGameKey } });
	};

	//saved as name in object but is id
	const onclick = (id: string) => {
		//console.log(games);
		navigate("/gameroom", { state: { id: id } });
	};

	{
		/* 
game room
type name 
type password
nav to game room

invite friends

other players search name
type right password
nav to game room
or see invites
select hero
ready check
nav to game with hero
*/
	}
	return (
		<div className="min-h-screen max-h-screen bg-cover bg-center bg-no-repeat bg-[url('https://img.itch.zone/aW1hZ2UvMTQ1OTg5OS84NTIyMDY2LnBuZw==/original/6HnMxI.png')] overflow-y-auto scrollbar-none select-none">
			<Link className="z-50 h-8 absolute bg-sky-500" to={"/"}>
				Back
			</Link>
			<div className="px-28 py-8">
				<div className="grid grid-cols-3 gap-2">
					<div className="col-span-3">
						<button
							onClick={() => gameRoomNav()}
							className="my-4 h-10 bg-red-500 w-full"
						>
							New game
						</button>

						<Search
							name={"All Games"}
							array={games}
							click={onclick}
							clickType={"id"}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Games;
