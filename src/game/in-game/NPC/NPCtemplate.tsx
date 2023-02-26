import Person from "../../classes/person/Person";

export class NPCtemplate extends Person {
	constructor(config: any) {
		super(config);

		this.frameLimit = 16;

		this.speed = 2;
	}
	update(state: any) {
		console.log("hello", this.id)

	}
}

export default NPCtemplate;
