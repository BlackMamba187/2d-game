export const utils = {
	nextPosition(initialX: number, initialY: number, direction: string, speed: number) {
		let x = initialX;
		let y = initialY;
		const size = speed;
		if (direction === "left") {
			x -= size;
		} else if (direction === "right") {
			x += size;
		} else if (direction === "up") {
			y -= size;
		} else if (direction === "down") {
			y += size;
		}
		return { x, y };
	},
};
