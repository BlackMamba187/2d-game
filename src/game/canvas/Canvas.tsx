import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

const Canvas = ({ draw, height, width }: any) => {
	const canvasRef = useRef(null);
	const location = useLocation();
	useEffect(() => {
		const canvas: any = canvasRef.current;
		const context = canvas.getContext("2d");
		
		draw(context,location.state.id);
	}, []);

	return (
		<canvas className="canvas" ref={canvasRef} height={height} width={width} />
	);
};

export default Canvas;
