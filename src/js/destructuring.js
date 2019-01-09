export function es6_destructuring() {
  let [a, b, c] = [1, 2, 3];
  console.log(`a = ${a}, b = ${b}, c = ${c}`)

  let [foo, [
    [bar], baz
  ]] = [1, [
    [2], 3
  ]]
  console.log(`foo = ${foo}, bar = ${bar}, baz = ${baz}`)

  let [, , third] = [1, 2, 3]
  console.log(`third = ${third}`)

  let [x, , z] = ['x', 'y', 'z']
  console.log(`x = ${x}, z = ${z}`)

  let [head, ...tail] = [1, 2, 3, 4]
  console.log(`head = ${head}, tail = ${tail}`)

  // 如果解构不成功，变量的值就等于undefined。
  let [l, m, ...n] = ['l']
  console.log(`l = ${l}, m = ${m}, n = ${n}`)
  // l  "l"
  // m  undefined
  // n  []

  let [t] = []
  let [s1, t1] = [1]
  // t 和 t1 都是 undefined
  console.log(`t = ${t}, t1 = ${t1}`)

  // 不完全解构
  let [a1, b1, c1] = [1, 2, 3, 4]
  console.log(`a1 = ${a1}, b1 = ${b1}, c1 = ${c1}`)

  let [a2, [b2], c2] = [1, [2, 3], 4]
  console.log(`a2 = ${a2}, b2 = ${b2}, c2 = ${c2}`)

  // 如果等号的右边不是数组（或者严格地说，不是可遍历的结构），那么将会报错。
  // 下面这些都会报错
  // let [foo] = 1;
  // let [foo] = false;
  // let [foo] = NaN;
  // let [foo] = undefined;
  // let [foo] = null;
  // let [foo] = {};

  // 对于 Set 结构，也可以使用数组的解构赋值。
  let [a3, b3, c3] = new Set(['a3', 'b3', 'c3'])
  console.log(`a3 = ${a3}, b3 = ${b3}, c3 = ${c3}`)

  // 只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值
  let [f1, f2, f3, f4, f5, f6] = fibs()
  console.log(`f1 = ${f1},f2 = ${f2},f3 = ${f3},f4 = ${f4},f5 = ${f5},f6 = ${f6}`)

  console.log('-------------------解构赋值允许指定默认值-------------------')
  defaultValue();

  console.log('-------------------对象的解构赋值-------------------')
  objectDestructuring();
}

function objectDestructuring() {
    // 对象的属性没有次序，变量必须与属性同名，才能取到正确的值
    let {a, b} = {b: 2, a: 1}
    // 完整的写法：let {a: a, b: b} = {b: 2, a: 1}
    console.log(`a = ${a}, b = ${b}`)

    // 如果变量名与属性名不一致，必须写成下面这样
    // x, y是匹配的模式，valueX和valueY是变量
    let {x: valueX, y: valueY} = {x: 1, y: 2}
    console.log(`valueX = ${valueX}, valueY = ${valueY}`)

    let obj = {
        p: [
            'hello',
            { w: 'world' }
        ]
    }
    let { p: [c, {w}] } = obj
    console.log(`c = ${c}, w = ${w}`)

    const node = {
        loc: {
            start: {
                line: 1,
                number: 5
            }
        }
    }
    let { loc, loc: { start }, loc: { start: {line} } } = node
    console.log(`log = ${loc}, start = ${start}, line = ${line}`)

    let object = {};
    let arr = [];
    ({foo: object.prop, bar: arr[0]} = {foo: 'foo', bar: 'bar'})
    console.log(`obejct = ${object}, arr = ${arr}`)

    let {m = 1, n: n = 2} = {m: 3}
    console.log(`m = ${m}, n = ${n}`)

    // 如果要将一个已经声明的变量用于解构赋值，必须非常小心
    let z;
    // 不将大括号写在行首，避免 JavaScript 将{z}解释为代码块，所以加上圆括号
    ({z} = {z: 1})
    console.log(`z = ${z}`)

    // 对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量
    let {log, sin, cos} = Math
    console.log(`sin(PI / 4) = ${sin(Math.PI / 4)}`)

    // 由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。
    let array = [1, 2, 3, 4]
    let {0: first, [array.length - 1]: fourth} = array
    console.log(`first = ${first}, fourth = ${fourth}`)

    // 字符串的解构赋值
    let [o, p, q, r, s] = 'Hello'
    console.log(`o = ${o}, p = ${p},q = ${q},r = ${r},s = ${s},`)
    // 类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值
    let {length: len} = 'Hello'
    console.log(`len = ${len}`)

    // 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象
    let {toString: toS} = 123;
    console.log(toS === Number.prototype.toString)

    let {toString: toSt} = true;
    console.log(toSt === Boolean.prototype.toString)

    // 函数的参数也可以使用解构赋值
    console.log(`add([1, 2, 3]) = ${add([1, 2, 3])}`)
    console.log([[1, 2], [3, 4]].map(([a, b]) => a + b))

    // 函数参数的解构也可以使用默认值
    console.log(move({x: 1, y: 2}))
    console.log(move({x: 1}))
    console.log(move({}))
    console.log(move())

    // 遍历Map
    let map = new Map();
    map.set('first', 'hello');
    map.set('second', 'world');
    for (let [key, value] of map) {
        console.log(`key = ${key}, value = ${value}`)
    }
    for (let [key] of map) {
        console.log(`key = ${key}`)
    }
    for (let [, value] of map) {
        console.log(`value = ${value}`)
    }
}

function move({x = 0, y = 0} = {}) {
    return [x, y]
}

function add([x, y]) {
    return x + y;
}

function defaultValue() {
    let [a = 1] = []
    console.log(`a = ${a}`)
    
    // 只有当一个数组成员严格等于undefined，默认值才会生效
    let [x = 1, y = 2] = [undefined, null];
    console.log(`x = ${x}, y = ${y}`)

    // 如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值
    let [func = f()] = []

    // 默认值可以引用解构赋值的其他变量，但该变量必须已经声明
    let [b = 1, c = b] = [2]
    console.log(`b = ${b}, c = ${c}`)
}

function f() {
    console.log('this is default function')
}

// fibs是一个 Generator 函数，原生具有 Iterator 接口
function* fibs() {
    let a = 0;
    let b = 1;
    while(true) {
        yield a;
        [a, b] = [b, a + b];
    }
}
