import React from "react";
import square from "../../assets/ui/square.png";

const Square = () => {
	return (
		<div className="relative">
			<img src={square} className="place-self-center w-full h-full" />
			<div className="p-4 text-center z-10 w-[80%] h-[80%] absolute top-[10%] left-[10%] flex flex-col justify-center items-center overflow-hidden">
				<p className="">Name: </p>
				<p className="">Password: </p>
			</div>
		</div>
	);
};

export default Square;
