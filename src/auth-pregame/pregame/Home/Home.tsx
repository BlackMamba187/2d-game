import React, { useEffect, useState } from "react";
import {auth, db } from "../../../firebase/FirebaseConfig";
import button from "../../../assets/ui/button.png";
import square from "../../../assets/ui/square.png";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

const Home = () => {
	const [userName, setUserName] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getUserDetails(auth.currentUser!.uid);
	}, []);

	const getUserDetails = async (id: string) => {
		const docRef = doc(db, "users", id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			setUserName(docSnap.data().name);
		}

		setIsLoading(false);
	};



	return (
		<div className="min-h-screen max-h-screen bg-cover bg-center bg-no-repeat bg-[url('https://img.itch.zone/aW1hZ2UvMTQ1OTg5OS84NTIyMDY2LnBuZw==/original/6HnMxI.png')] overflow-y-auto scrollbar-none select-none ">
			{!isLoading && (
				<div className="flex  max-h-screen ">
					<div className="p-2 min-h-screen flex flex-col w-full ">
						<div>
							<img src={square} className="w-1/12 " />
							<p className="w-1/12 text-center">{userName}</p>
						</div>
						<div className=" flex flex-col justify-evenly h-full text-center items-center ">
							<Link
								className="w-2/12 flex items-center cursor-pointer"
								to={"/heros"}
							>
								<div className="absolute text-center z-10 w-2/12">Heros</div>
								<img src={button} className="relative w-full" />
							</Link>
							<Link className="w-2/12 flex items-center " to={"/games"}>
								<div className="absolute text-center z-10 w-2/12">Games</div>
								<img src={button} className="relative w-full" />
							</Link>
							<Link className="w-2/12 flex items-center" to={"/friends"}>
								<div className="absolute text-center z-10 w-2/12">Friends</div>
								<img src={button} className="relative w-full" />
							</Link>

							<Link className="w-2/12 flex items-center" to={"/settings"}>
								<div className="absolute text-center z-10 w-2/12">Settings</div>
								<img src={button} className="relative w-full" />
							</Link>
						</div>
					</div>
				</div>
			)}
			{isLoading && <p>Loading...</p>}
		</div>
	);
};

export default Home;
