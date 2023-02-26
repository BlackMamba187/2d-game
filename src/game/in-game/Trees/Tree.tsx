import GameObject from "../../classes/gameobject/GameObject";
import TreePic from "../../../assets/objects/tree1.png";

class Tree extends GameObject {
	constructor(config: any) {
		super(config);
		this.isGameObject = true;
		this.loop = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		this.x = config.x;
		this.y = config.y;
		this.sprite.image.src = config.src || TreePic;
		this.sprite.imageHeight = 160;
		this.sprite.imageWidth = 160;
		this.frameLimit = 14;

		this.hitboxX = this.x + this.sprite.imageWidth * 0.5;
		this.hitboxY = this.y + this.sprite.imageHeight * 1.5

		this.hitboxWidth = this.sprite.imageWidth * this.sprite.scale * 0.55;
		this.hitboxHeight = this.sprite.imageHeight * this.sprite.scale * 0.25;
	}
	update(state: any, context: CanvasRenderingContext2D, CameraPerson: any) {
		this.spriteAnimation();
	}
}
export default Tree;
