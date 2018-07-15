export function queryParam() {
	let url = window.location.search;
	let obj = {};
	let reg = /[^?&]+=[^?&]+/g;
	let arr = url.match(reg);
	if(!arr) {
		arr = ["id=yangyufeng"];
		let __seller__ = window.localStorage.__seller__;
		if(!__seller__) {
			window.localStorage.__seller__ = '{"yangyufeng":{"favorite":false}}';
		}
	}
	arr.forEach((item) => {
		let tempArr = item.split("=");
		let key = decodeURIComponent(tempArr[0]);
		let val = decodeURIComponent(tempArr[1]);
		obj[key] = val;
	})
	return obj;
}