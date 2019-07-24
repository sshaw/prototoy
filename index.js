'use strict';

// Make a property name of length n
function makePropertyName(n) {
  const base = 26;
  let r, err, result = '';

  do {
    r = n % base;
    n = Math.floor(n / base);

    // After 9 you'd have 10, not 00.
    // This means after 'z' you'd have 'ba', but we want 'aa'.
    err = (r === 1 && result.length ? 0 : r);

    result = String.fromCharCode(97 + err) + result;
  } while(n > 0);

  return result;
}

function array(count, generator) {
  count = count || _defaultLength;

  switch(generator) {
  case Boolean:
    generator = n => n % 2 ? true : false;
    break;
  case Date:
    let d = new Date();
    // Advance one day per call
    generator = n => new Date(d.getTime() + n * 1000 * 60 * 60 * 24);
    break;
  case Number:
  case undefined:
  case null:
    generator = n => n + 1;
    break;
  case Object:
    generator = n => object(1);
    break;
  case String:
    generator = n => string();
    break;
  }

  let result = [];
  for(let i = 1; i <= count; i++)
    result.push(generator(i-1));

  return result;
}

function cycle(list) {
  return iterator(list, true);
}

function json(properties) {
  return JSON.stringify(object(properties));
}

function map(properties, keyType, valType) {
  let result, keys, max = properties || _defaultLength;

  if(Number.isInteger(max)) {
    keys = array(max, keyType || (n => makePropertyName(n)) );
  }
  else {
    keys = properties;
    max = keys.length;
    valType = keyType;
  }

  result = new Map();
  array(max, valType || Number).forEach((val, i) => result.set(keys[i], val));

  return result;
}

function object (properties) {
  let object = {}, count = 0, max = properties || _defaultLength, propName = makePropertyName;

  if(!Number.isInteger(max)) {
    max = properties.length;
    propName = n => properties[n % max];
  }

  do {
    object[propName(count++)] = count;
  } while(count < max);

  return object;
}

function iterator(list, cycle = false) {
  let generator, i = 0;

  list = list || _defaultLength;

  if(Number.isInteger(list)) {
    let count = list;
    generator = function* () {
      while(cycle || i < count) yield (i++ % count) + 1;
    };
  }
  else {
    generator = function* () {
      while(cycle || i < list.length) yield list[i++ % list.length];
    }
  }

  return generator();
}

function set() {
  return new Set(array(...arguments));
}

function string(count) {
  const random = (max) => Math.floor( Math.random()* Math.floor(max) + 1);
  let word, str = [];

  count = count || _defaultLength;
  while(count-- > 0) {
    word = String.fromCharCode(96 + random(26));
    str.push(word.repeat(random(8)));
  }

  return str.join(' ');
}

let _defaultLength = 10, obj = {
  array: array,
  a: array,
  cycle: cycle,
  iter: iterator,
  iterator: iterator,
  i: iterator,
  map: map,
  m: map,
  json: json,
  j: json,
  object: object,
  obj: object,
  o: object,
  set: set,
  string: string,
  str: string
};

Object.defineProperty(obj, 'defaultLength', {
  set: (n) => _defaultLength = n || _defaultLength,
  get: ()  => _defaultLength
});

module.exports = obj;
