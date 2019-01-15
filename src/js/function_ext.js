export function es6_functionExt() {
    // 函数参数的默认值
    printMsg('Hello')
    printMsg('Hello', 'China')
    printMsg('Hello', '')

    // 参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的
    foo();

    // 参数默认值可以与解构赋值的默认值，结合起来使用。
    destructuring({})
    destructuring({ x: 1 })
    destructuring({ x: 1, y: 2 })
    destructuring()

    fetch('http://www.baidu.com', {})
    fetch('http://www.baidu.com')

    func1()
    func2()

    func1({ x: 3, y: 8 })
    func2({ x: 3, y: 8 })

    func1({ x: 1 })
    func2({ x: 1 })

    func1({})
    func2({})

    func1({ z: 1 })
    func2({ z: 1 })

    // 参数默认值的位置
    // 如果非尾部的参数设置默认值，实际上这个参数是没法省略的。
    func3()
    func3(2)
    // func3(, 2) // 报错
    func3(undefined, 2)

    // 函数的 length 属性
    // 指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数
    console.log(`(function (a) {}).length = ${(function (a) { }).length}`);
    console.log(`(function (a = 1) {}).length = ${(function (a = 1) { }).length}`);
    console.log(`(function (a, b, c = 3) {}).length = ${(function (a, b, c = 3) { }).length}`);
    console.log(`(function (...args) {}).length = ${(function (...args) { }).length}`); // 0
    // 如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了
    console.log(`(function (a = 1, b, c) {}) = ${(function (a = 1, b, c) { })}`);
    console.log(`(function (a, b = 1, c) {}) = ${(function (a, b = 1, c) { })}`);

}

function func3(x = 1, y) {
    console.log(`func3 x = ${x}, y = ${y}`)
}

/**
 * 函数参数的默认值是空对象，但是设置了对象解构赋值的默认值
 */
function func1({ x = 0, y = 0 } = {}) {
    console.log(`func1 x = ${x}, y = ${y}`)
}

/**
 * 函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值
 */
function func2({ x, y } = { x: 0, y: 0 }) {
    console.log(`func2 x = ${x}, y = ${y}`)
}

function fetch(url, { body = '', method = 'Get', headers = {} } = {}) {
    console.log(`fetch method = ${method}`)
}

function destructuring({ x, y = 5 } = {}) {
    console.log(`destructuring x = ${x}, y = ${y}`);
}

let num = 99;
function foo(p = num + 1) {
    console.log(`foo p = ${p}`);
}

function printMsg(x, y = 'World') {
    console.log(`printMsg x = ${x}, y = ${y}`);
}