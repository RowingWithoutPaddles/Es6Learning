export function es6_objectExt() {
    // 属性的简洁表示法
    let foo = 'bar';
    let baz = { foo };
    console.log(baz);
    // 上面等同于：
    console.log({ foo: foo });

    console.log('f(1, 2) = ', f(1, 2));

    let birth = '2000/01/01';
    let person = {
        name: '张三',
        birth,
        // 等价于：hello: function(){}
        hello() {
            console.log('hello');
        }
    }

    // 属性名表达式
    // ES6 允许字面量定义对象时，用表达式作为对象的属性名，要把表达式放在方括号内
    let propKey = 'foo';
    let obj = {
        [propKey]: true,
        ['a' + 'bc']: 123,
    }
    console.log("obj['abc'] = ", obj['abc']);
    console.log('obj[propKey] = ', obj[propKey]);
    console.log("obj['foo'] = ", obj['foo']);

    // 属性名表达式与简洁表示法，不能同时使用，否则会报错
    let bar = 'abc';
    // baz = { [foo] }; // 这样写报错
    baz = { [foo]: 'abc' }

    // 如果对象的方法是一个 Symbol 值，那么name属性返回的是这个 Symbol 值的描述
    let key1 = Symbol('description');
    let key2 = Symbol();
    obj = {
        [key1]() { },
        [key2]() { },
    };
    // chrome上面name返回的空，跟网上讲的不一样
    console.log('obj[key1].name = ', obj[key1].name);
    console.log('obj[key2].name = ', obj[key2].name);


    // 可枚举性
    let descriptor = Object.getOwnPropertyDescriptor(baz, 'bar');
    console.log(`descriptor.enumerable = ${descriptor.enumerable}`);

    console.log('Reflect.ownKeys({ [Symbol()]: 0, b: 0, 10: 0, 2: 0, a: 0 }) = ',
        Reflect.ownKeys({ [Symbol()]: 0, b: 0, 10: 0, 2: 0, a: 0 }));

    // super 关键字
    // super关键字表示原型对象时，只能用在对象的方法之中
    // 并且只有在对象方法的简写法中使用
    let proto = { foo: 'hello' };
    let object = {
        foo: 'world',
        find() {
            return super.foo;
        }
    }
    Object.setPrototypeOf(object, proto);
    console.log('object.find() = ', object.find());

    proto = {
        x: 'hello',
        foo() {
            console.log(this.x);
        }
    }
    object = {
        x: 'world',
        foo() {
            super.foo();
        }
    }
    Object.setPrototypeOf(object, proto);
    object.foo(); // world

    // 对象的解构赋值
    // 解构赋值里扩展运算符必须要是最后一个参数，否则报错
    // 解构赋值的拷贝是浅拷贝
    let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
    console.log('x = %d,  y = %d, z = %o', x, y, z);

    // 扩展运算符的解构赋值，不能复制继承自原型对象的属性
    let o1 = { a: 1 };
    let o2 = { b: 2 };
    o2.__proto__ = o1;
    let { ...o3 } = o2;
    console.log('o3 = ', o3);

    let o = Object.create({ m: 1, n: 2 });
    console.log('o = ', o);
    o.l = 3;
    let { m, ...newObj } = o;
    let { n, l } = newObj;
    console.log('m = %d, n = %o, l = %d', m, n, l);

    // 对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中
    let q = { a: 1, b: 2 }
    let p = { ...q };
    console.log('p = ', p);
    // 由于数组是特殊的对象，所以对象的扩展运算符也可以用于数组
    p = { ...['a', 'b', 'c'] }
    console.log('p = ', p);
    // 如果扩展运算符后面不是对象，则会自动将其转为对象
    // 由于该对象没有自身属性，所以返回一个空对象
    p = { ...1 };
    console.log('p = ', p);
    // 如果扩展运算符后面是字符串，它会自动转成一个类似数组的对象
    p = { ...'Hello' }
    console.log('p = ', p);

}

// 解构赋值的一个用处，是扩展某个函数的参数，引入其他操作
function baseFunction({ a, b }) {
    // ...
}

function wrapperFunction({ x, y, ...restConfig }) {

}

// 如果某个方法的值是一个 Generator 函数，前面需要加上星号
let obj = {
    *m() {
        yield 'Hello world';
    }
}

let ms = {}

function getItem(key) {
    return key in ms ? ms[key] : null;
}

function setItem(key, value) {
    ms[key] = value;
}

function clear() {
    ms = {};
}

// module.exports = { getItem, setItem, clear };
// // 等价于
// module.exports = {
//     getItem: getItem,
//     setItem: setItem,
//     clear: clear
// };

function f(x, y) {
    return { x, y };
    // 等价于 return { x: x, y: y };
}