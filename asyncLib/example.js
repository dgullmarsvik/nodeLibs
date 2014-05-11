var async = require('./homemade_async_lib.js');

function async_test(arg, callback) {
  var delay = Math.floor(Math.random() * 5 + 1) * 100; // random ms
  console.log('async with \'' + arg + '\', return in ' + delay + ' ms');
  setTimeout(function() { callback(arg * 2); }, delay);
}
function final_test(results) { console.log('Done', results); }

async.throttledConcurrent(3, [
	function(next) { async_test(1, next); },
	function(next) { async_test(2, next); },
	function(next) { async_test(3, next); },
	function(next) { async_test(4, next); },
	function(next) { async_test(5, next); },
	function(next) { async_test(6, next); }
], final_test);
