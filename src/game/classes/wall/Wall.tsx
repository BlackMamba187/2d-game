import { utils } from "../../../Utils/Utils";

class Wall {
	collisionsMap: number[][];
	coordinates: { [x: string]: boolean }[];

	mapWalls: any;
	coll: number[];
	constructor(collisions: number[]) {
		this.coll = collisions;
		this.collisionsMap = [];
		this.coordinates = [];

		for (let i = 0; i < this.coll.length; i += 120) {
			this.collisionsMap.push(this.coll.slice(i, 120 + i));
		}
	}

	getWalls(context: CanvasRenderingContext2D, CameraPerson: any) {
		this.collisionsMap.forEach((row, i) => {
			row.forEach((symbol: number, j: number) => {
				if (symbol === 7510) {
					this.coordinates.push({
						[`${j * 64 + context.canvas.width / 2 - CameraPerson.x},${
							i * 64 + context.canvas.height / 2 - CameraPerson.y
						},${64},${64}`]: true,
					});
				}
			});
		});
		return Object.assign({}, ...this.coordinates);
	}
}
export default Wall;
