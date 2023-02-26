import Tree from "../../in-game/Trees/Tree";
import OverWorldMap from "../overworld-map/OverWorldMap";
import LowerTown1 from "../../../assets/maps/demo/Village1Lower.webp";
import UpperTown1 from "../../../assets/maps/demo/Village1Upper.webp";
import { auth } from "../../../firebase/FirebaseConfig";

import player from "../../../assets/characters/playable/char.png";

import Person from "../person/Person";
import { Input } from "../Input/Input";

import { DemoCollisions } from "../../collisionData/collision";
import Wall from "../wall/Wall";

const tree1 = new Tree({ x: 113 * 32, y: 65 * 32 });
const tree2 = new Tree({ x: 112 * 32, y: 70 * 32 });

const Town1 = {
	lowerSrc: LowerTown1,
	upperSrc: UpperTown1,
	gameObjects: {
		tree1: tree1,
		tree2: tree2,
	},
	walls: DemoCollisions,
};

const Game = {
	id: "string",
	state: "paused",
	maps: {
		VillageOne: {
			name: "VillageOne",
			lowerSrc: Town1.lowerSrc,
			upperSrc: Town1.upperSrc,
			gameObjects: Town1.gameObjects,
			walls: Town1.walls,
		},
	},
	players: {
		player1: {
			id: "UaLu2eLZOrb3iedVvANrrjRmP632",
			x: 100 * 32,
			y: 70 * 32,
			src: player,
			map: "VillageOne",
		},
	},
};

class OverWorld {
	map!: any;
	directionInput!: Input;
	id!: string;
	personArray: Person[];
	gameState!: any;
	constructor() {
		this.map = null;
		this.gameState = null;
		this.personArray = Object.values(Game.players).map((player) => {
			return new Person({
				id: player.id,
				src: player.src,
				x: player.x,
				y: player.y,
			});
		});
	}

	getId() {
		this.id = auth.currentUser!.uid;
	}

	renderGame(context: CanvasRenderingContext2D) {
		this.getId();
		this.map.mountObjects();
		const CameraPerson = this.personArray.find(
			(person) => person.id == this.id
		);
		this.map.walls = new Wall(Game.maps.VillageOne.walls).getWalls(
			context,
			CameraPerson
		);

		//Clear off the canvas
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);

		//Draw Lower layer
		this.map.drawLowerImage(context, CameraPerson);

		//Draw Game Objects walls
		Object.values(this.map.gameObjects).forEach((object: any) => {
			this.map.walls[
				`${object.hitboxX + context.canvas.width / 2 - CameraPerson!.x},${
					object.hitboxY + context.canvas.height / 2 - CameraPerson!.y
				},${object.hitboxWidth},${object.hitboxHeight}`
			] = true;
		});

		//Draw Player walls
		this.personArray.forEach((person) => {
			this.map.walls[
				`${person.hitboxX + context.canvas.width / 2 - CameraPerson!.x},${
					person.hitboxY + context.canvas.height / 2 - CameraPerson!.y
				},${person.hitboxWidth},${person.hitboxHeight}`
			] = false;
		});

		for (let [key, value] of Object.entries(this.map.walls)) {
			if (value === true) {
				const [x, y, w, h] = key.split(",").map((num) => parseInt(num, 10));
				context.fillRect(x, y, w, h);
			}
		}

		//Draw Players
		this.personArray.forEach((person) => {
			person.playerMapCollions(
				{
					direction: this.directionInput.direction,
					map: this.map,
				},
				context,
				CameraPerson
			);
			person.update({
				direction: this.directionInput.direction,
				map: this.map,
			});
			context.fillRect(
				person.hitboxX + context.canvas.width / 2 - CameraPerson!.x,
				person.hitboxY + context.canvas.height / 2 - CameraPerson!.y,
				person.hitboxWidth,
				person.hitboxHeight
			);
			person.sprite.draw(context, CameraPerson);
		});

		//Draw Game Objects
		Object.values(this.map.gameObjects).forEach((object: any) => {
			object.update();
			object.sprite.draw(context, CameraPerson);
		});

		//Draw Upper layer
		this.map.drawUpperImage(context, CameraPerson);
	}

	startGameLoop(context: CanvasRenderingContext2D) {
		// Frame rate limiter variables
		var frameDuration = 1000 / 60; // 60 fps
		var previousFrameTime = 0;

		// Step function with frame rate limiter
		const step = (timestamp: any) => {
			var elapsedTime = timestamp - previousFrameTime;

			if (elapsedTime >= frameDuration) {
				previousFrameTime = timestamp;

				// Update game logic and render scene here
				this.renderGame(context);
			}

			requestAnimationFrame(step);
		};

		// Start the game loop
		requestAnimationFrame(step);
	}

	init(context: CanvasRenderingContext2D, state: any) {
		this.gameState = state;
		this.map = new OverWorldMap(Game.maps.VillageOne);

		this.directionInput = new Input();
		this.directionInput.init();

		this.startGameLoop(context);
	}
}

export default OverWorld;
