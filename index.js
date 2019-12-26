'use strict';
function repeater(type, name, repeat, fn, isOnly, isSkip) {
	for (let i = 0; i < repeat; i++) {
		(isOnly ? type.only : isSkip ? type.skip : type)(`${name} (iteration ${i + 1}-${repeat})`, fn)
	}
}
function describe({name, repeat, fn, isOnly = false, isSkip = false}) {
	repeater(module.exports.origin_describe, name, repeat, fn, isOnly, isSkip);
}
function it({name, repeat, fn, isOnly = false, isSkip = false}) {
	repeater(module.exports.origin_it, name, repeat, fn, isOnly, isSkip);
}

module.exports = {
	describe,
	it
};
module.exports.origin_describe = global.describe;
module.exports.origin_it = global.it;