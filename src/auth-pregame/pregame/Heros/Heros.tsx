import {
	collection,
	DocumentData,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import square from "../../../assets/ui/square.png";
import { auth, db } from "../../../firebase/FirebaseConfig";

const Heros = () => {
	const [allHeros, setAllHeros] = useState<DocumentData[]>([]);
	const navigate = useNavigate();

	const usersHeros = async () => {
		const q = query(
			collection(db, "heros"),
			where("id", "==", auth.currentUser?.uid)
		);

		const querySnapshot = await getDocs(q);
		const docs = querySnapshot.docs.map((doc) => doc.data());
		setAllHeros(docs);
	};
	useEffect(() => {
		usersHeros();
	}, []);

	return (
		<div className="min-h-screen max-h-screen bg-cover bg-center bg-no-repeat bg-[url('https://img.itch.zone/aW1hZ2UvMTQ1OTg5OS84NTIyMDY2LnBuZw==/original/6HnMxI.png')] overflow-y-auto scrollbar-none select-none">
			<Link className="z-50 h-8 absolute bg-sky-500" to={"/"}>
				Back
			</Link>
			<div className="px-28 py-8">
				<div className="grid grid-cols-3 gap-2">
					<div className="col-span-4">
						<button
							onClick={() => navigate("/createhero")}
							className="my-4 h-10 bg-sky-500 w-full"
						>
							{" "}
							create new hero
						</button>
					</div>
					{allHeros.map((item, idx) => (
						<div key={idx} className="relative">
							<img src={square} className="place-self-center w-full h-full" />
							<div className="p-4 text-center z-10 w-[80%] h-[80%] absolute top-[10%] left-[10%] flex flex-col justify-center items-center overflow-hidden">
								<p className="h-full w-full">Name: {item.name}</p>
								<p className="h-full w-full">Class: {item.class}</p>
								<p className="h-full w-full">Alignment: {item.alignment}</p>
								<div className="grid grid-cols-2 w-full h-full"></div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Heros;
