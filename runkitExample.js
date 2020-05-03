const t = require('.');

let a = t.a();
a.push(999);
console.log(a);

let o = t.o();
console.log(o);

o = t.o(['foo', 'bar']);
console.log(o);

let i = t.i(2) ;
console.log(i.next());

a = t.a(10, Date);
console.log(a[0].getDay());
