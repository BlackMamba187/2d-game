export class OverworldEvent {
	map: any;
	event: any;
	constructor(
		map: any,
		event: { who: any; type: any; direction: any; time: number }
	) {
		this.map = map;
		this.event = event;
	}

	stand(resolve: any) {
		const who = this.map.gameObjects[this.event.who];

		who.behavior.direction = this.event.direction;
		who.startBehavior({
			type: "stand",
			direction: who.behavior.direction,
		});
		
		setTimeout(() => {
			resolve();
		}, this.event.time);
	}

	walk(resolve: any) {
		const who = this.map.gameObjects[this.event.who];

		who.behavior.direction = this.event.direction;
		who.startBehavior({
			type: "stand",
			direction: who.behavior.direction,
		});
		
		setTimeout(() => {
			resolve();
		}, this.event.time);
	}
	init() {
		return new Promise<void>((resolve) => {
			if (this.event.type === "walk") {
				this.walk(resolve);
			}
			if (this.event.type === "stand") {
				this.stand(resolve);
			}
		});
	}
}

export default OverworldEvent;
