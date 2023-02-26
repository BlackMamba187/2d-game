import OverworldEvent from "../../overworld-event/OverworldEvent";
import OverWorldMap from "../overworld-map/OverWorldMap";
import Sprite from "../sprite/Sprite";

class GameObject {
	x!: number;
	y!: number;
	sprite!: Sprite;
	isGameObject: Boolean;
	loop: number[];
	frameCount: number;
	currentLoopIndex: number;
	frameLimit: number;
	moving!: boolean;
	hitboxX: number;
	hitboxY: number;
	hitboxHeight: number;
	hitboxWidth: number;
	id: string | null;
	isMounted: boolean;
	behaviorLoop: any;
	behaviorLoopIndex: number;
	isRunning: any;

	constructor(config: any) {
		this.id = null;
		this.x = config.x;
		this.y = config.y;

		this.isGameObject! = config.isGameObject || false;
		this.isMounted = false;
		this.frameCount = 0;
		this.currentLoopIndex = 0;
		this.loop = config.loop || [ ]; //set for characters walking
		this.frameLimit = config.framLimit || 10; //set for characters

		this.sprite = new Sprite({
			gameObject: this,
			src: config.src,
			imageWidth: config.imageWidth || 48,
			imageHeight: config.imageHeight || 48,
			animationframes: config.animationframes || 1,
			currentDirection: config.currentDirection || 0,
		});

		this.hitboxX = this.x;
		this.hitboxY = this.y;

		this.hitboxWidth = this.sprite.imageWidth * this.sprite.scale;
		this.hitboxHeight = this.sprite.imageHeight * this.sprite.scale;

		this.behaviorLoop = config.behaviorLoop || [];
		this.behaviorLoopIndex = 0;
		this.isRunning = false;
	}

	spriteAnimation() {
		if (this.isGameObject === true || this.moving === true) {
			this.frameCount++;
			if (this.frameCount >= this.frameLimit) {
				this.frameCount = 0;
				this.currentLoopIndex++;
				if (this.currentLoopIndex >= this.loop.length) {
					this.currentLoopIndex = 0;
				}
			}
			this.moving = false;
			this.sprite.animationframes = this.loop[this.currentLoopIndex];
		}
	}
	mount(map: OverWorldMap) {
		this.isMounted = true;

		//If we have a behavior, kick off after a short delay
		setTimeout(() => {
			this.doBehaviorEvent(map);
		}, 10);
	}

	async doBehaviorEvent(map: OverWorldMap) {
		//Don't do anything if there is a more important cutscene or I don't have config to do anything
		//anyway.
		if (map.isCutscenePlaying || this.behaviorLoop.length === 0) {
			return;
		}

		// Check if the function is currently running
		if (this.isRunning) {
			return;
		}

		// Set the flag to indicate the function is running
		this.isRunning = true;

		//Setting up our event with relevant info
		let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
		eventConfig.who = this.id;

		//Create an event instance out of our next event config
		const eventHandler = new OverworldEvent(map, eventConfig);
		await eventHandler.init();

		//Setting the next event to fire
		this.behaviorLoopIndex += 1;
		if (this.behaviorLoopIndex === this.behaviorLoop.length) {
			this.behaviorLoopIndex = 0;
		}

		// Reset the flag to indicate the function is not running
		this.isRunning = false;

		//Do it again!
		this.doBehaviorEvent(map);
	}
	update(state: any, context: CanvasRenderingContext2D, CameraPerson: any) {}
}

export default GameObject;
