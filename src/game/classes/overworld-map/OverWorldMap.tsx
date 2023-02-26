import { utils } from "../../../Utils/Utils";
import GameObject from "../gameobject/GameObject";

class OverWorldMap {
	lowerImage!: HTMLImageElement;
	upperImage!: HTMLImageElement;
	gameObjects: any;
	scale: number;
	walls: any;
	isCutscenePlaying: boolean;

	constructor(config: any) {
		this.gameObjects = config.gameObjects;
		this.walls = config.walls || {};
		this.scale = 2;

		this.lowerImage = new Image();
		this.lowerImage.src = config.lowerSrc;

		this.upperImage = new Image();
		this.upperImage.src = config.upperSrc;

		this.isCutscenePlaying = false;
	}

	drawLowerImage(context: CanvasRenderingContext2D, CameraPerson: any) {
		context.drawImage(
			this.lowerImage,
			context.canvas.width / 2 - CameraPerson.x,
			context.canvas.height / 2 - CameraPerson.y,
			this.lowerImage.width * this.scale,
			this.lowerImage.height * this.scale
		);
	}

	drawUpperImage(context: CanvasRenderingContext2D, CameraPerson: any) {
		context.drawImage(
			this.upperImage,
			context.canvas.width / 2 - CameraPerson.x,
			context.canvas.height / 2 - CameraPerson.y,
			this.upperImage.width * this.scale,
			this.upperImage.height * this.scale
		);
	}

	checkOverlap(x: any, y: any, w: any, h: any, walls: any) {
		const personX = x;
		const personY = y;
		const personWidth = w;
		const personHeight = h;

		let collisionX = "false";
		let collisionY = "false";

		for (let [key, value] of Object.entries(walls)) {
			if (value === true) {
				const [x, y, wallWidth, wallHeight] = key
					.split(",")
					.map((num) => parseInt(num, 10));

				if (
					personX < x + wallWidth &&
					personX + personWidth > x &&
					personY < y + wallHeight &&
					personY + personHeight > y
				) {
					// Check the horizontal collision
					if (personX + personWidth / 2 < x + wallWidth / 2) {
						collisionX = "left";
					} else {
						collisionX = "right";
					}

					// Check the vertical collision
					if (personY + personHeight / 2 < y + wallHeight / 2) {
						collisionY = "top";
					} else {
						collisionY = "bottom";
					}

					return { collisionX, collisionY };
				}
			}
		}

		return { collisionX, collisionY };
	}

	mountObjects() {
		Object.keys(this.gameObjects).forEach((key) => {
			let object = this.gameObjects[key];
			object.id = key;

			//TODO: determine if this object should actually mount
			object.mount(this);
		});
	}
}
export default OverWorldMap;
