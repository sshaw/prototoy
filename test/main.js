
const t = require('../'),
      assert = require('assert'),
      defaultString = /^(\w+\s){9}\w+$/,
      arrayOf10Integers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/* array() */
assert.deepStrictEqual(t.array(), arrayOf10Integers, 'array()');
assert.deepStrictEqual(t.array(1), [1], 'array(1)');
assert.deepStrictEqual(t.array(2), [1, 2], 'array(2)');

assert.deepStrictEqual(t.array(2, Boolean), [false, true], 'array(2, Boolean)');
assert.deepStrictEqual(t.array(2, Number), [1, 2], 'array(2, Number)');
assert.deepStrictEqual(t.array(2, Object), [{a: 1}, {a: 1}], 'array(2, Object)');

let array = t.array(2, String);
assert.equal(array.length, 2, 'array(2, String).length');
assert(defaultString.test(array[0]), 'array(2, String)[0]');
assert(defaultString.test(array[1]), 'array(2, String)[1]');

/* json() */
let json = JSON.parse(t.json(2));
assert.deepStrictEqual(json, {a: 1, b: 2}, 'json(2)');

json = JSON.parse(t.json(['foo', 'bar']));
assert.deepStrictEqual(json, {foo: 1, bar: 2}, 'json([foo, bar])');

/* map() */
let map = t.map();
assert.deepStrictEqual(Array.from(map.keys()), ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'], 'map().keys()');
assert.deepStrictEqual(Array.from(map.values()), arrayOf10Integers, 'map().values()');

map = t.map(1);
assert.equal(map.get('a'), 1, 'map(1).a');

map = t.map(2);
assert.equal(map.size, 2, 'map(2).size');
assert.equal(map.get('a'), 1, 'map(2).a');
assert.equal(map.get('b'), 2, 'map(2).b');

map = t.map(2, Number);
assert.equal(map.size, 2, 'map(2, Number).size');
assert.equal(map.get(1), 1, 'map(2, Number).1');
assert.equal(map.get(2), 2, 'map(2, Number).2');

map = t.map(2, Number, Date);
assert.equal(map.size, 2, 'map(2, Number, Date).size');
assert(map.get(1) instanceof Date, 'map(2, Number, Date).1');
assert(map.get(2) instanceof Date, 'map(2, Number, Date).2');
assert(map.get(1).getTime() < map.get(2).getTime(), 'map(2, Number, Date) dates ascend');

/* object() */
let obj = t.object(1);
assert.deepStrictEqual(obj, {a: 1}, 'object(1)');

obj = t.object(2);
assert.deepStrictEqual(obj, {a: 1, b: 2}, 'object(2)');

obj = t.object(27);
assert.equal(Object.keys(obj).length, 27, 'object(27)');
assert.equal(obj.a, 1, 'object(27).a');
assert.equal(obj.b, 2, 'object(27).b');
assert.equal(obj.aa, 27, 'object(27).aa');

obj = t.object(['foo', 'bar']);
assert.deepStrictEqual(obj, {foo: 1, bar: 2});

/* iterator */
assert.deepStrictEqual(Array.from(t.iterator()), arrayOf10Integers, 'iterator()');
assert.deepStrictEqual(Array.from(t.iter(1)), [1], 'iter(1)');
assert.deepStrictEqual(Array.from(t.iter(2)), [1, 2], 'iter(2)');

assert.deepStrictEqual(Array.from(t.iter(['foo', 'bar'])), ['foo', 'bar'], 'iter([foo, bar])');

let iter = t.iter(['foo', 'bar']);
assert.deepStrictEqual(iter.next(), {value: 'foo', done: false}, 'iter([foo, bar], true)[0]');
assert.deepStrictEqual(iter.next(), {value: 'bar', done: false}, 'iter([foo, bar], true)[1]');
assert.deepStrictEqual(iter.next(), {value: undefined, done: true}, 'iter([foo, bar], true)[2]');

/* set() */
assert.deepStrictEqual(Array.from(t.set()), arrayOf10Integers, 'set()');
assert.deepStrictEqual(Array.from(t.set(1)), [1], 'set(1)');

array = Array.from(t.set(2, Date));
assert(array[0] instanceof Date, 'set(2, Date)');
assert(array[1] instanceof Date, 'set(2, Date)');

assert.deepStrictEqual(Array.from(t.set(2, n => n + 100)), [100, 101], 'set(2, function {})');

/* string() */
assert(defaultString.test(t.string()), 'string()');
assert(/^\w+$/.test(t.string(1)), 'string(1)');
assert(/^\w+\s\w+$/.test(t.string(2)), 'string(2)');
assert(defaultString.test(t.string(10)), 'string(10)');

/* defaultLength */

assert.equal(t.defaultLength, 10, 'defaultLength');

t.defaultLength = null;
assert.equal(t.defaultLength, 10, 'defaultLength = null');

t.defaultLength = 0;
assert.equal(t.defaultLength, 10, 'defaultLength = 0');

t.defaultLength = 2;
assert.equal(t.defaultLength, 2, 'defaultLength = 2');
assert.deepStrictEqual(t.array(), [1, 2], 'array(), defaultLength = 2');
