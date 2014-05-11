var tester = function() {
  console.log({
    'this': this,
    'arguments':arguments,
    'length':arguments.length
  });
};

//tester.apply(null, ["a", "b", "c"]);

var functional = require('./functional.js');
function square(x) { return x*x };
var abs = functional.compose(Math.sqrt, square);

console.log(abs(-2));

var _ = {};
var f = functional.curry(function(a, b, c) {return [a, b, c]; });
//f("a", _, "c")("b");
console.log(f("a", _, "c"));
