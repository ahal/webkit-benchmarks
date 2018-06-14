// Since bug 1108290 the JIT optimizes fun.apply(..., array) by taking
// a fast inline path when the array is without holes and its length
// equals its initialized length.
//
// This program applies arrays whose length equals their initialized
// length, thus triggering the optimization.
//
// Contrast the running time of this program with the running time of
// misc-apply-array-headroom.js, which applies arrays whose length
// exceeds their initialized length.  That program should run in 10x
// to 40x the time of this one.

function assertEq(result, expected) {
  if (result !== expected)
    throw "Assertion: Expected " + expected + ", got " + result;
}

var iter = 1000;
var reps = 100;
var sumval = 10;		// Sum of a subarray
var arrays = [[1,2,3,4],
	      [2,3,4,1],
	      [3,4,1,2],
	      [4,1,2,3],
	      [1,2,3,4],
	      [2,3,4,1],
	      [3,4,1,2],
	      [4,1,2,3]];

function g(a,b,c,d) {
    return a+b+c+d;
}

function sumit(a) {
    var sum = 0;
    for ( var i=0 ; i < iter ; i++ )
	sum += g.apply(null, a);
    return sum;
}

var osum = 0;
for ( var r=0 ; r < reps ; r++ )
    for ( var i=0 ; i < arrays.length ; i++ )
	osum += sumit(arrays[i]);
assertEq(osum, iter*sumval*reps*arrays.length);
