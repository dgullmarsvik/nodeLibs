exports.series = function(callbacks, last) {
  var results = [];
  function next() {
    var callback = callbacks.shift();
    if (callback) {
      callback(function() {
 	results.push(Array.prototype.slice.call(arguments));
	next();
      });
    } else {
      last(results);
    }
  }
  next();
}

exports.concurret = function(callbacks, last) {
  var results = [];
  var results_count = 0;
  callbacks.forEach(function(callback, index) {
    callback(function() {
      results[index] = Array.prototype.slice.call(arguments);
      results.count++;
      if (results_count == callbacks.length) {
        last(results);
      }
    });
  });
}

exports.throttledConcurrent = function(limit, callbacks, last) {
  var results = [];
  var running = 1;
  var task = 0;
  function next() {
    running--;
    if (task == callbacks.length && running == 0) {
      last(results);
    }
    while (running < limit && callbacks[task]) {
      var callback = callbacks[task];
      (function(index) {
	callback(function() {
	  results[index] = Array.prototype.slice.call(arguments);
	  next();
	});
      })(task);
      task++;
      running++;
    }
  }
  next();
}
