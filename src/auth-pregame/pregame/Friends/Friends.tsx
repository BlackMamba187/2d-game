import {
	collection,
	doc,
	DocumentData,
	getDoc,
	getDocs,
	onSnapshot,
	query,
	setDoc,
	where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../../firebase/FirebaseConfig";
import Search from "../../components/Search";

const Friends = () => {
	const [userName, setUserName] = useState("");
	const [users, setUsers] = useState<DocumentData[]>([]);
	const [friendships, setFriendship] = useState<DocumentData[]>([]);


	useEffect(() => {
		getUserDetails(auth.currentUser!.uid);
		getUsers();
		AllFriendships();
	}, []);
	const getUserDetails = async (id: string) => {
		const docRef = doc(db, "users", id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			setUserName(docSnap.data().name);
		} else {
			return;
		}
	};
	const getUsers = () => {
		const Allusers = collection(db, "users");
		onSnapshot(Allusers, (docsSnap) => {
			const usersData = docsSnap.docs.map((doc) => doc.data());
			setUsers(usersData);
		});
	};
	const filteredUsers = users.filter((user) => user.name !== userName);
	const AllFriendships = () => {
		const AllFriendships = collection(db, "friendships");
		onSnapshot(AllFriendships, (docsSnap) => {
			const friendshipsData = docsSnap.docs.map((doc) => doc.data());
			setFriendship(friendshipsData);
		});
	};
	const Myfriendships = friendships.filter((friendship) => {
		return (
			friendship.username === userName || friendship.friendname === userName
		);
	});
	const startFriendship = async (friendname: string) => {
		const Oldfriendships = Myfriendships.filter((friendship) => {
			return (
				friendship.username === friendname ||
				friendship.friendname === friendname
			);
		});
		if (Oldfriendships.length === 0) {
			const newFriendshipRef = doc(collection(db, "friendships"));
			await setDoc(newFriendshipRef, {
				username: userName,
				friendname: friendname,
				status: "requested",
			});
			console.log("Friendship created!");
			return;
		} else {
			console.log("Friendship already exists.");
			return;
		}
	};
	const acceptFriendship = async (friendname: string) => {
		const w = query(
			collection(db, "friendships"),
			where("username", "==", friendname),
			where("friendname", "==", userName)
		);

		const docSnap = await getDocs(w);

		if (docSnap.empty) {
			console.log("No friendship found");
			return;
		} else {
			const friendshipRef = docSnap.docs[0].id;
			try {
				await setDoc(doc(db, "friendships", friendshipRef), {
					username: friendname,
					friendname: userName,
					status: "accepted",
				});
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<div className="min-h-screen max-h-screen bg-cover bg-center bg-no-repeat bg-[url('https://img.itch.zone/aW1hZ2UvMTQ1OTg5OS84NTIyMDY2LnBuZw==/original/6HnMxI.png')] overflow-y-auto scrollbar-none select-none">
			<Link className="z-50 h-8 absolute bg-sky-500" to={"/"}>
				Back
			</Link>
			<div className="px-28 py-8 text-center">
				<div className="grid grid-cols-4 gap-4 my-4">
				<Search name={"All Users"} array={filteredUsers} click={startFriendship} clickType={"name"}/>
					<div>
						<div>request sent</div>
						<div className="">
							{Myfriendships.map((pending, indexOf) => (
								<div key={indexOf} className="flex flex-col w-full">
									{pending.username === userName &&
										pending.status === "requested" && (
											<div className="p-2 bg-[#ead4aa] border-2 border-[#743f39] flex flex-col justify-center items-center">
												<p>request sent to {pending.friendname}</p>
											</div>
										)}
								</div>
							))}
						</div>
					</div>
					<div>
						<div>request from</div>
						<div className="">
							{Myfriendships.map((pending, indexOf) => (
								<div key={indexOf} className="flex flex-col w-full">
									{pending.friendname === userName &&
										pending.status === "requested" && (
											<div
												className="p-2 bg-[#ead4aa] border-2 border-[#743f39] flex flex-col justify-center items-center"
												onClick={() => acceptFriendship(pending.username)}
											>
												<p>request from {pending.username}</p>
											</div>
										)}
								</div>
							))}
						</div>
					</div>
					<div>
						<div>accepted friends</div>
						<div>
							{Myfriendships.map((accepted, index) => {
								if (
									accepted.friendname === userName &&
									accepted.status === "accepted"
								) {
									return (
										<div key={index} className="my-2">
											<div className="p-2 bg-[#ead4aa] border-2 border-[#743f39] flex flex-col justify-center items-center">
												<p>friends with {accepted.username}</p>
											</div>
										</div>
									);
								} else if (
									accepted.username === userName &&
									accepted.status === "accepted"
								) {
									return (
										<div key={index} className="my-2">
											<div className="p-2 bg-[#ead4aa] border-2 border-[#743f39] flex flex-col justify-center items-center">
												<p>friends with {accepted.friendname}</p>
											</div>
										</div>
									);
								}
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Friends;
