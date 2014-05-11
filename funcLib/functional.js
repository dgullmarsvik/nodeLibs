exports.compose = function() {
  var fns = arguments,
      length = arguments.length;
  return function() {
    var i = length;
    while (--i >= 0) {
      arguments = [fns[i].apply(this, arguments)];
    }
    return arguments[0];
  };
};

exports.sequence = function() {
  var fns = arguments,
      length = arguments.length;
  return function() {
    var i = 0;
    while (i++ < length) {
      arguments = [fns[i].apply(this, arguments)];
    }
    return arguments[0];
  };
};

var _ = {};
exports.curry = function(fn, length, args, holes) {
  length = length || fn.length;
  args = args || [];
  holes = holes || [];
  return function() {
    var _args = args.slice(0),
        _holes = holes.slice(0),
        argStart = _args.length,
        holeStart = _holes.length,
        arg, i;
    for (i = 0; i < arguments.length; i++) {
      arg = arguments[i];
      if(arg === _ && holeStart) {
        holeStart--;
        _holes.push(_holes.shift());
      } else if (arg === _) {
        _holes.push(argStart + i);
      } else if (holeStart) {
        holeStart--;
        _args.splice(_holes.shift(), 0, arg);
      } else {
        _args.push(arg);
      }
    }
    if (_args.length < length) {
      return exports.curry.call(this, fn, length, _args, _holes);
    } else {
      return fn.apply(this, _args);
    }
  }
}
