import { auth } from "../../../firebase/FirebaseConfig";
import { utils } from "../../../Utils/Utils";
import GameObject from "../gameobject/GameObject";

//stats
//race
//class

class Person extends GameObject {
	movementProgress: number;
	uid!: string;
	speed: number;
	canmovedown: boolean;
	canmoveup: boolean;
	canmoveleft: boolean;
	canmoveright: boolean;
	behavior: { action: string; type: string };
	walkingLoop: number[];
	armsUpLoop: number[];
	crouchLoop: number[];
	jumpLoop: number[];
	noIdeaLoop: number[];
	attackToolLoop: number[];
	BowLoop: number[];
	ClimbLoop: number[];
	sleepDeadLoop: number[];
	constructor(config: any) {
		super(config);
		this.id = config.id || "npc1";

		//movement and design
		this.sprite.scale = 2.4;
		this.movementProgress = 0;

		this.hitboxX = this.x + this.sprite.imageWidth * 0.4;
		this.hitboxY = this.y + this.sprite.imageHeight * 0.3;

		this.hitboxWidth = this.sprite.imageWidth * this.sprite.scale * 0.68;
		this.hitboxHeight = this.sprite.imageHeight * this.sprite.scale * 0.6;

		this.speed = 8;

		//game play
		this.canmoveup = true;
		this.canmovedown = true;
		this.canmoveleft = true;
		this.canmoveright = true;

		this.behavior = { action: "", type: "" };

		this.walkingLoop = [0, 1, 2];
		this.armsUpLoop = [3, 4, 5];
		this.crouchLoop = [6];
		this.jumpLoop = [7, 8, 9];
		this.noIdeaLoop = [10];

		this.attackToolLoop = [11, 12, 13, 14];
		this.BowLoop = [15, 16, 17, 18];
		this.ClimbLoop = [19, 20, 21];
		this.sleepDeadLoop = [22];
	}
	getId() {
		this.uid = auth.currentUser!.uid;
	}

	playerMapCollions(
		state: any,
		context: CanvasRenderingContext2D,
		CameraPerson: any
	) {
		const collision = state.map.checkOverlap(
			utils.nextPosition(
				this.hitboxX + context.canvas.width / 2 - CameraPerson!.x,
				this.hitboxY + context.canvas.height / 2 - CameraPerson!.y,
				this.behavior.action,
				this.speed
			).x,
			utils.nextPosition(
				this.hitboxX + context.canvas.width / 2 - CameraPerson!.x,
				this.hitboxY + context.canvas.height / 2 - CameraPerson!.y,
				this.behavior.action,
				this.speed
			).y,
			this.hitboxWidth,
			this.hitboxHeight,
			state.map.walls
		);
		if (collision.collisionX === "left") {
			this.canmoveright = false;
			this.behavior.action = state.direction;
		} else if (collision.collisionX === "right") {
			this.canmoveleft = false;
			this.behavior.action = state.direction;
		} else {
			this.canmoveleft = true;
			this.canmoveright = true;
			this.behavior.action = state.direction;
		}

		if (collision.collisionY === "top") {
			this.canmovedown = false;
			this.behavior.action = state.direction;
		} else if (collision.collisionY === "bottom") {
			this.canmoveup = false;
			this.behavior.action = state.direction;
		} else {
			this.canmoveup = true;
			this.canmovedown = true;
		}
	}

	startBehavior(behavior: { direction: string; type: string }) {
		if (behavior.type === "walk") {
			this.loop = this.walkingLoop; //this.attackToolLoop;
			//this.frameLimit = 4;
			this.movementProgress = 40;
		}
		if (behavior.type === "stand") {
			if (behavior.direction === "up") {
				this.sprite.currentDirection = 3;
			}
			if (behavior.direction === "down") {
				this.sprite.currentDirection = 0;
			}
			if (behavior.direction === "left") {
				this.sprite.currentDirection = 1;
			}
			if (behavior.direction === "right") {
				this.sprite.currentDirection = 2;
			}
		}
	}
	updatePosition() {
		if (this.behavior.action === "up" && this.canmoveup) {
			this.sprite.currentDirection = 3;
			this.moving = true;
			this.hitboxY -= this.speed;
			this.y -= this.speed;
			this.movementProgress -= this.speed;
		}
		if (this.behavior.action === "down" && this.canmovedown) {
			this.sprite.currentDirection = 0;
			this.moving = true;
			this.hitboxY += this.speed;
			this.y += this.speed;
			this.movementProgress -= this.speed;
		}
		if (this.behavior.action === "left" && this.canmoveleft) {
			this.sprite.currentDirection = 1;
			this.moving = true;
			this.hitboxX -= this.speed;
			this.x -= this.speed;
			this.movementProgress -= this.speed;
		}
		if (this.behavior.action === "right" && this.canmoveright) {
			this.sprite.currentDirection = 2;
			this.moving = true;
			this.hitboxX += this.speed;
			this.x += this.speed;
			this.movementProgress -= this.speed;
		}
		this.spriteAnimation();
	}

	update(state: any) {
		this.getId();
		if (this.movementProgress > 0) {
			this.updatePosition();
		} else {
			if (this.id === this.uid && this.movementProgress === 0) {
				this.behavior.action = state.direction;
				//We're keyboard ready and have a key pressed
				if (
					this.behavior.action === "up" ||
					this.behavior.action === "down" ||
					this.behavior.action === "left" ||
					this.behavior.action === "right"
				) {
					this.startBehavior({
						type: "walk",
						direction: this.behavior.action,
					});
				}
				if (this.behavior.action === "int") {
					console.log("interact");
				}
				if (this.behavior.action === "jump") {
					console.log("jump");
				}
				if (this.behavior.action === "dash") {
					console.log("dash");
				}
			}
		}
	}
}

export default Person;
