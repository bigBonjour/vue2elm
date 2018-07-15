export function saveToLocal(id, key, val) {
	let seller = window.localStorage.__seller__;
	if(!seller) {
		seller = {};
		seller[id] = {};
	} else {
		seller = JSON.parse(seller);
		if(!seller) {
			seller[id] = {};
		}
	}
	seller[id][key] = val;
	window.localStorage.__seller__ = JSON.stringify(seller);
};
export function loadFromLocal(id, key, def) {
	let seller = window.localStorage.__seller__;
	if(!seller) {
		return def;
	}
	id = JSON.parse(seller)[id];
	if(!id) {
		return def;
	}
	let ret = id[key];

	return ret || def;
};