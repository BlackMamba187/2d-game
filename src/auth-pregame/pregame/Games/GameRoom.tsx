import {
	collection,
	doc,
	DocumentData,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth, db, real_db } from "../../../firebase/FirebaseConfig";
import {
	getDatabase,
	ref,
	push,
	onValue,
	child,
	update,
	set,
	get,
} from "firebase/database";

interface playerob {
	id: string;
	isReady: boolean;
	name: string;
}

interface game {
	name: string;
	players: playerob[];
	private: boolean;
	state: string;
}
{
	/*	
	src: string;
	name: string;
	class: string;
	alignment: string;
	str: number;
	dex: number;
	con: number;
	int: number;
	wis: number;
	cha: number;
	feats: string[];
	traits: string[];
	spells: string[];
	skills: string[];*/
}
const GameRoom = () => {
	const [gameRoom, setGameRoom] = useState<game>();
	const [boolean, setBoolean] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	const gameRoomRef = ref(real_db, `games/${location.state.id}`);

	useEffect(() => {
		onValue(gameRoomRef, (snapshot) => {
			const data = snapshot.val();
			if (data) {
				setGameRoom(data);
			}
		});
	}, []);

	const myPlayer = {
		name: "Bob",
		id: auth.currentUser!.uid,
		isReady: false,
	};
	const players = gameRoom?.players ?? []; // provide default value if players is undefined

	// Check if player with same id already exists in players array
	const existingPlayer = players.find((player) => player.id === myPlayer.id);

	const joingameRoom = () => {
		const gameKey = location.state.id;
		const playersRef = ref(real_db, `games/${gameKey}/players`);

		if (existingPlayer) {
			console.log(
				`Player with id ${myPlayer.id} already exists in players array`
			);
			return;
		}
		// Check if players array already contains 6 players
		if (players.length >= 6) {
			console.log(`Players array already contains 6 players`);
			return;
		}

		set(playersRef, [...players, myPlayer]);
	};

	const setPlayerReady = (playerId: string, isReady: boolean) => {
		const playersRef = ref(real_db, `games/${location.state.id}/players`);

		// Get the players array from the database
		get(playersRef).then((snapshot) => {
			const players = snapshot.val();

			// Find the player with the specified playerId
			const playerIndex = players.findIndex(
				(player: playerob) => player.id === playerId
			);
			if (playerIndex < 0) {
				console.log(`Player with id ${playerId} not found`);
				return;
			}

			// Update the isReady property of the player
			players[playerIndex].isReady = isReady;

			// Update the players array in the database
			set(playersRef, players);

			// Check if all players are ready
			const allReady = players.every((player: any) => player.isReady);
			if (allReady) {
				setTimeout(() => {
					console.log("All players are ready!");
				}, 5000);
			}
		});
	};

	const handleSwitchChange = (id: string) => {
		setBoolean(!boolean);
		setPlayerReady(id, boolean);
	};

	return (
		<div className="min-h-screen max-h-screen bg-cover bg-center bg-no-repeat bg-[url('https://img.itch.zone/aW1hZ2UvMTQ1OTg5OS84NTIyMDY2LnBuZw==/original/6HnMxI.png')] overflow-y-auto scrollbar-none select-none">
			<Link className="z-50 h-8 absolute bg-sky-500" to={"/games"}>
				Back
			</Link>

			<div className="px-28 py-8">
				<div className="grid grid-cols-3 gap-2">
					<div className="col-span-3">
						<div>welcome to {location.state.id}</div>
						{!existingPlayer && (
							<button
								onClick={() => joingameRoom()}
								className="my-4 h-10 bg-red-500 w-full"
							>
								join game
							</button>
						)}
						{existingPlayer && (
							<button
								onClick={() =>
									navigate("/maingame", { state: { id: location.state.id } })
								}
								className="my-4 h-10 bg-red-500 w-full"
							>
								start game
							</button>
						)}

						<div>{gameRoom?.name}</div>
						<div>{gameRoom?.private ? "true" : "false"}</div>
						<div>{gameRoom?.state}</div>
						<div>{gameRoom?.players?.length} </div>
						<div>
							{gameRoom?.players?.map((player, idx) => (
								<div className="my-4" key={player.id}>
									<div>{player.id}</div>
									<div>{player.name}</div>
									{player.id === auth.currentUser!.uid ? (
										<div onClick={() => handleSwitchChange(player.id)}>
											{player.isReady ? "my player true" : "my player false"}
										</div>
									) : (
										<div>{player.isReady ? "true" : "false"}</div>
									)}
								</div>
							))}{" "}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GameRoom;
