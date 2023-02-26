import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase/FirebaseConfig";

const Settings = () => {
	return (
		<div className="min-h-screen max-h-screen bg-cover bg-center bg-no-repeat bg-[url('https://img.itch.zone/aW1hZ2UvMTQ1OTg5OS84NTIyMDY2LnBuZw==/original/6HnMxI.png')] overflow-y-auto scrollbar-none select-none">
			<Link className="z-50 h-8 absolute bg-sky-500" to={"/"}>
				Back
			</Link>
			<div className="px-28 py-8">
				<div className="grid grid-cols-3 gap-2">
					<div className="col-span-4">
						<button
							onClick={() => auth.signOut()}
							className="my-4 h-10 bg-red-500 w-full"
						>
							Sign Out
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Settings;
