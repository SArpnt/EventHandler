class EventHandler {
	constructor(e, s = !!e) {
		if (!(Array.isArray(e) || typeof e == 'undefined')) throw new TypeError("Paramater 1 must be type 'array'");
		this.strict = !!s;
		this.events = {};
		this.Event = function () {
			this.ran = 0;
			this.listeners = [];
		};
		if (e) for (let i of e) this.events[i] = new this.Event;
	}

	on(name, func) {
		if (typeof func != 'function')
			throw new TypeError(`Input 2 is type '${typeof func}' instead of 'function'`);
		if (this.strict && !this.events[name])
			console.warn(`Event '${name}' does not exist`);
		else {
			if (!this.events[name]) this.events[name] = new this.Event;
			return this.events[name].listeners.push(func) - 1;
		}
	}

	off(name, id) { // id could be a function or a number (array index)
		if (!this.events[name]) {
			if (this.strict) console.warn(`Event '${name}' does not exist`);
			return;
		}

		if (typeof id == 'function') {
			let r = 0;
			this.events[name].listeners.forEach((e, i) => {
				if (e == id) {
					r++;
					delete this.events[name].listeners[i];
				}
			});
			return r;
		}
		else if (typeof id == 'number') {
			let r = this.events[name].listeners[id];
			delete this.events[name].listeners[id];
			return r;
		} else if (typeof id == 'undefined')
			return this.events[name].listeners.splice(0, Infinity);
		else
			throw new TypeError(`Input 2 is type '${typeof a}' instead of 'function' or 'number'`);
	}

	emit(name, ...data) {
		return this.emitCall(name, this, ...data);
	}
	emitCall(name, context, ...data) {
		if (!this.events[name])
			if (this.strict) {
				console.warn(`Event '${name}' does not exist`);
				return [];
			} else
				this.events[name] = new this.Event;
		let returns = [];
		this.events[name].ran++;
		for (let f in this.events[name].listeners)
			try {
				returns.push(this.events[name].listeners[f].apply(context, data));
			} catch (e) {
				console.error(e);
				returns.push(e);
			}
		return returns;
	}
}
let x = EventHandler.prototype;
x.addEventListener = x.add = x.when = x.on;
x.removeEventListener = x.remove = x.abort = x.off;
x.dispatchEvent = x.dispatch = x.send = x.trigger = x.emit;
x.dispatchEventContext = x.dispatchContext = x.sendContext = x.triggerContext = x.emitContext =
	x.dispatchEventCall = x.dispatchCall = x.sendCall = x.triggerCall = x.emitCall;