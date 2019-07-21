# prototoy

[![Build Status](https://travis-ci.org/sshaw/prototoy.svg?branch=master)](https://travis-ci.org/sshaw/prototoy)

Lightweight JavaScript object generator for your `node` REPL (or elsewhere, I suppose).

## Usage

prototoy is not intended to be a full-fledged object generation library rather, it's
intended for use in your Node.js REPL when you need a quick dummy object to toy around with.

It's recommended that you load prototoy when you run `node` interactively.
I recommend [setting up a `.noderc` file](https://github.com/sshaw/dotfiles/blob/6a6ef413a9e9e15cfd6db7c491c581ec36544eb2/bashrc#L154-L161)
with the following:

```js
const t = require('prototoy');
```

If you don't want to setup a `.noderc` file how to do this depends on whether you want it available locally or globally.

### Locally

`npm install prototoy` or `yarn install prototoy`

Load prototoy when you run `node` as a REPL in your project:

```
node -e 'const t = require("prototoy")' -i
```


### Globally

`npm install prototoy -g` or `yarn install prototoy -g`

Load prototoy when you run `node` as a REPL. Here's one way to do it:

```bash
# In your shell's config (Bash here):
inode() {
  NODE_PATH=$(npm config get prefix)/lib/node_modules node -e 'const t = require("prototoy")' -i
}
```

---

Now you can easily generate objects to test things with:

```
> t.string(5)
'd zzzz ww uuuuuuu aa'

> t.array()
[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

> t.array(5, Date)
[ 2018-02-11T05:50:06.271Z,
  2018-02-12T05:50:06.271Z,
  2018-02-13T05:50:06.271Z,
  2018-02-14T05:50:06.271Z,
  2018-02-15T05:50:06.271Z ]

> t.obj()  // also t.object()
{ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10 }

> t.obj(2)
{ a: 1, b: 2 }

> t.obj(['foo', 'bar'])
{ foo: 1, bar: 2 }

> i = t.iter(2)
{}
> i.next()
{ value: 1, done: false }
> i.next()
{ value: 2, done: false }
> i.next()
{ value: undefined, done: true }

> i = t.iter(2, true)
{}
> i.next()
{ value: 1, done: false }
> i.next()
{ value: 2, done: false }
> i.next()
{ value: 1, done: false }
> i.next()
{ value: 2, done: false }
> i.next()
{ value: 1, done: false }
...

> i = t.iter(['foo', 'bar'], true)
{}
> i.next()
{ value: 'foo', done: false }
> i.next()
{ value: 'bar', done: false }
> i.next()
{ value: 'foo', done: false }
...

> t.map(2)
Map { 'a' => 1, 'b' => 2 }

> t.map(2, Number)
Map { 1 => 1, 2 => 2 }

> t.map(2, Number, Boolean)
Map { 1 => true, 2 => false }
```

And others...

## API

All functions will create items of `defaultLength` `length`/`size` if no arguments are given.

### `array([length [, type|function])`

#### Arguments

* `length` - The length of the array to create, defaults to `defaultLength`
* `type|function` - The type of object to generate or a function that will be called to generate each element.

`type` can be one of `Date`, `Number`, `Object`, `Boolean` or `String`.

The function's signature is `callback(index)`, where `index` starts at `0`.

#### Returns

An array.

### `json([properties])`

Generate some JSON.

#### Arguments

`properties` - An array of property names to use

#### Returns

A JSON string.

### `map([spec  [, keyType [, valueType]]])`

#### Arguments

* `spec` - An integer representing the number of entries to generate or an array of key names to use
* `keyType` - The key's data type, defaults to `String`
* `valueType` - The value's data type, defaults to an integer

#### Returns

An instance of `Map` populated according to the arguments.

### `object([spec])`

Generate an object with some properties.

#### Arguments

* `spec` - An integer representing the number of properties to add to the object or an array of property names to create.

#### Returns

An object as defined by `spec`.


### `iterator(spec, [cycle = false])`

Create an [iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols). Can also be called as `iter`.

#### Arguments

* `spec` - An integer representing the number of entries to generate or an array of values to use in the generator
* `cycle` - If `true` the iterator's `done` property will never be `false`. You will iterate "forever".

### Returns

An iteratable object create by [a Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator).

### `set()`

Same arguments as [`array()`](#array), excepts it returns a `Set`.

### `string([length])`

Return a string containing `length` words. `length` defaults to `defaultLength`.


## See Also

* [Pry-Toys](https://github.com/ariabov/pry-toys) - The Ruby library that served as inspiration
* [randexp](https://www.npmjs.com/package/randexp)
* [Chance](http://chancejs.com/)
* [randomstring](https://www.npmjs.com/package/randomstring)
* [random-input-generator](https://github.com/danielnovograd/random-input-generator)
* [templated-object-generator](https://www.npmjs.com/package/templated-object-generator)
* [unionized](https://www.npmjs.com/package/unionized)

## Author

Skye Shaw (skye.shaw -AT- gmail)

## License

Released under the MIT License: http://www.opensource.org/licenses/MIT
