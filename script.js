class EventHandler {
	constructor(e) {
		this.strict = !!e;
		this.events = {};
		if (e) for (let i of e) this.events[i] = [];
	}

	on(name, func) {
		if (typeof func != 'function') throw new TypeError(`Input 2 of EventHandler.on is a '${typeof func}' instead of a 'function'`);
		if (this.strict && !this.events[name]) { console.warn(`Event '${name}' does not exist`); return; }
		return (this.events[name] || (this.events[name] = [])).push(func) - 1;
	}

	off(name, id) { //id could be a function or a number (array index)
		if (!this.events[name]) {
			if (this.strict) console.warn(`Event '${name}' does not exist`);
			return;
		}

		if (typeof id == 'function') {
			let temp = 0;
			this.events[name] = this.events[name].filter(e => e != id || (temp++, 0));
			return temp;
		}
		else if (typeof id == 'number')
			return this.events[name].splice(id, 1)[0];
		else if (typeof id == 'undefined')
			return this.events[name].splice(0, Infinity);
		else
			throw new TypeError(`Input 2 of EventHandler.off is a '${typeof a}' instead of a 'function' or 'number'`);
	}

	emit(name, ...data) {
		return this.emitCall(name, this, ...data);
	}
	emitCall(name, context, ...data) {
		if (!this.events[name]) {
			if (this.strict) console.warn(`Event '${name}' does not exist`);
			return;
		}
		let temp = [];
		this.events[name].forEach(f => {
			try {
				temp.push(f.apply(context, data));
			} catch (e) {
				console.error(e);
				temp.push(e);
			}
		});
		return temp;
	}
}
EventHandler.prototype.addEventListener = EventHandler.prototype.on;
EventHandler.prototype.removeEventListener = EventHandler.prototype.off;
EventHandler.prototype.dispatchEvent = EventHandler.prototype.emit;
EventHandler.prototype.dispatchEventContext = EventHandler.prototype.emitContext =
EventHandler.prototype.dispatchEventCall = EventHandler.prototype.emitCall;