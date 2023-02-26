import React, { useState } from "react";
import { appWindow } from "@tauri-apps/api/window";
import {
	FaCog,
	FaGamepad,
	FaHome,
	FaMinus,
	FaRegWindowMaximize,
	FaSearch,
	FaTimes,
	FaUserAlt,
	FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Toolbar = () => {
	const navigate = useNavigate();
	return (
		<div
			data-tauri-drag-region
			className="h-8 absolute w-full top-0 right-0 flex justify-end items-center z-10 bg-red-500"
		>
			<div className="flex">
			<div className="p-2 cursor-pointer hover:bg-[#ead4aa]">
					<FaHome color="#743f39" size={25} />
				</div>
			<div className="p-2 cursor-pointer hover:bg-[#ead4aa]">
					<FaUserAlt color="#743f39" size={25} />
				</div>
			<div className="p-2 cursor-pointer hover:bg-[#ead4aa]">
					<FaGamepad color="#743f39" size={25} />
				</div>
			<div className="p-2 cursor-pointer hover:bg-[#ead4aa]">
					<FaSearch color="#743f39" size={25} />
				</div>
				<div className="p-2 cursor-pointer hover:bg-[#ead4aa]">
					<FaCog color="#743f39" size={25} />
				</div>
				<div className=" p-2 cursor-pointer hover:bg-[#ead4aa]">
					<FaUsers onClick={()=> window.location.reload()} color="#743f39" size={25} />
				</div>
				<div className="p-2 cursor-pointer hover:bg-[#ead4aa]">
					<FaMinus
						color="#743f39"
						onClick={() => appWindow.minimize()}
						size={25}
					/>
				</div>
				<div className=" p-2 cursor-pointer hover:bg-[#ead4aa]">
					<FaRegWindowMaximize
						color="#743f39"
						size={25}
						onClick={() => appWindow.maximize()}
					/>
				</div>

				<div className="p-2 cursor-pointer hover:bg-[#ead4aa]">
					<FaTimes
						color="#743f39"
						onClick={() => appWindow.close()}
						size={25}
					/>
				</div>
			</div>
		</div>
	);
};

export default Toolbar;
