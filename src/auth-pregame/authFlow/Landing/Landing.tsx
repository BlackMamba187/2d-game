import makeStyles from "@mui/material/styles/makeStyles";
import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";

const backgroundImageUrl = "https://cdn.midjourney.com/248153a5-2bf7-4b26-b760-3507c99231cd/grid_0.png";

const Landing = () => {
	const [show, setShow] = useState(true);
	return (
		<div className="bg-white max-h-screen flex justify-center">
			<div className="w-1/4 self-center max-h-">
				<div className="flex justify-evenly">
					<div
						className="bg-red-500 cursor-pointer"
						onClick={() => setShow(true)}
					>
						Sign In
					</div>
					<div
						className="bg-red-500  cursor-pointer"
						onClick={() => setShow(false)}
					>
						Sign Up
					</div>
				</div>
				<div className="px-4 rounded-lg">{show ? <SignIn /> : <SignUp />}</div>
			</div>
			<div className="w-3/4">
				<img src={backgroundImageUrl} className="h-full w-full" alt="hero image" />
			</div>
		</div>
	);
};

export default Landing;
