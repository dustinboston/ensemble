export class Env extends Map {
	/**
	 * @param {(Array<[string|symbol,*]>|Map<symbol|string, *>)} entries
	 * @param {Env|null} outer
	 * @param {*[]} binds
	 * @param {*[]} exprs
	 */
	constructor(entries = [], outer = null, binds = [], exprs = []) {
		super(entries);
		this.outer = outer;

		if (!binds || !exprs) {
			throw new TypeError("new Env() called without bindings or expressions");
		}

		let isVariadic = false;

		for (let i = 0;i < binds.length;i++) {
			if (i > exprs.length) {
				break;
			}

			if (binds[i] === Symbol.for("&")) {
				isVariadic = true;
				this.set(binds[i + 1], exprs.slice(i));
				break;
			} else {
				this.set(binds[i], exprs[i]);
			}
		}

		if (!(isVariadic || binds.length === exprs.length)) {
			const bindsString = JSON.stringify(binds);
			const exprsString = JSON.stringify(exprs);
			throw new TypeError(`Arity mismatch:\nbindings: ${bindsString}\nexpressions: ${exprsString}`);
		}
	}

	/**
	 * @param {string|symbol} key
	 * @returns {Env|null}
	 */
	find(key) {
		if (this.has(key)) {
			return this;
		}

		if (this.outer) {
			// eslint-disable-next-line unicorn/no-array-callback-reference
			return this.outer.find(key);
		}

		return null;
	}

	/**
	 * @param {string|symbol} key
	 * @returns {*}
	 * @throws {Error}
	 */

	get(key) {
		console.log(`Env.get(${key})`);
		const env = this.find(key);
		if (env) {
			return super.get.call(env, key);
		}

		throw new Error(`'${String(key)}' not found in env.`);
	}

	/**
	 *
	 * @param {string|symbol} key
	 * @param {*} value
	 * @returns {*}
	 */
	set(key, value) {
		super.set(key, value);
		return value;
	}
}
