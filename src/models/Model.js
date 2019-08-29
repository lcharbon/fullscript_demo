class Model {
	static store = {};
	static attributes = ["id"];

	static find(id) {
		if (!id) return;
		
		return this.store[id.toString()];
	}

	static findOrCreate(id) {
		return this.find(id) || new this({id: id});
	}

	static all() {
		return Object.values(this.store);
	}

	static flushStore() {
		for (let model in this.store) delete this.store[model];
	}

	constructor(data = {}) {
		this.setData(data);
	}

	
	setData(data) {
		let attributes = this.constructor.attributes;
		let key = "";
		
		for (key in data) {
			if (attributes.includes(key)) this[key] = data[key];
		}
	}

	asJSON() {
		let json = {}
		let attribute = "";

		for (attribute of this.constructor.attributes) {
			if (attribute === "local_id") continue;
			if (this[attribute] === undefined) continue;
			
			json[attribute] = this[attribute];
		}

		return json;
	}

	store() {
		this.constructor.store[this.id] = this;
	}

	async load() {
		// let request = new APIRequest("GET", this.postRoute + '/' + this.id);
		// let data = await request.send();

		// this.applyAPIData(data);
	}
}

export default Model
