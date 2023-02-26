
class Sprite {
	image: any;
	gameObject: any;
	currentDirection: number;
	animationframes: any;
	imageWidth: number;
	imageHeight: number;
	scale: number;

	constructor(config: any) {
		this.image = new Image();
		this.image.src = config.src;
		this.gameObject = config.gameObject;
		this.currentDirection = config.currentDirection || 0;
		this.animationframes = 1;

		this.scale = config.scale || 2;
        
		this.imageWidth = config.imageWidth || 72;
		this.imageHeight = config.imageHeight || 96;
	}

	drawFrame(context: any, frameX: number, frameY: number, CameraPerson: any) {
		let x = this.gameObject.x + context.canvas.width / 2 - CameraPerson.x;

		let y = this.gameObject.y + context.canvas.height / 2 - CameraPerson.y;

		context.drawImage(
			this.image,
			frameX * this.imageWidth,
			frameY * this.imageHeight,
			this.imageWidth,
			this.imageHeight,
			x,
			y,
			this.imageWidth * this.scale,
			this.imageHeight * this.scale
		);
	}

	draw(context: any, CameraPerson: any) {
		this.drawFrame(
			context,
			this.animationframes,
			this.currentDirection,
			CameraPerson
		);
	}
}

export default Sprite;
