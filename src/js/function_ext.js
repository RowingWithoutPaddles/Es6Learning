export function es6_functionExt() {
  // 函数参数的默认值
  printMsg('Hello')
  printMsg('Hello', 'China')
  printMsg('Hello', '')

  // 参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的
  foo();

  // 参数默认值可以与解构赋值的默认值，结合起来使用。
  destructuring({})
  destructuring({
    x: 1
  })
  destructuring({
    x: 1,
    y: 2
  })
  destructuring()

  fetch('http://www.baidu.com', {})
  fetch('http://www.baidu.com')

  func1()
  func2()

  func1({
    x: 3,
    y: 8
  })
  func2({
    x: 3,
    y: 8
  })

  func1({
    x: 1
  })
  func2({
    x: 1
  })

  func1({})
  func2({})

  func1({
    z: 1
  })
  func2({
    z: 1
  })

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

  // 跟网上说的结果不一样
  bar();
  // 跟网上说的结果不一样
  func4();

  //   func5(); // 因为故意抛了异常，所以注释掉



  // rest 参数, rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错
  console.log(`add(2, 3, 5) = ${add(2, 3, 5)}`);

  let arr = [];
  push(arr, 1, 2, 3);

  // Function构造函数返回的函数实例，name属性的值为anonymous
  console.log(`(new Function).name = ${(new Function).name}`);

  function func6() {}
  // bind返回的函数，name属性值会加上bound前缀
  console.log(`func6.bind({}).name = ${func6.bind({}).name}`);
  console.log(`(function(){}).bind({}).name = ${(function(){}).bind({}).name}`);


  // 箭头函数
  // 由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错
  let getTempItem = id => ({
    id: id,
    name: 'Temp'
  });

  // 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象
  // 箭头函数里面根本没有自己的this，而是引用外层的this。
  // 除了this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target
  func6.call({
    id: 42
  })

  // 下面是一个部署管道机制（pipeline）的例子，即前一个函数的输出是后一个函数的输入
  const pipeline = (...funcs) => {
    // 返回一个函数
    return initialValue => {
      console.log(`initialValue = ${initialValue}`)
      return funcs.reduce((preResult, currentValue) => {
        console.log(`preResult = ${preResult}`);
        console.log(`currentValue = ${currentValue}`)
        return currentValue(preResult);
      }, initialValue);
    };
  }
  const plus = a => {
    console.log('plus');
    return a + 1;
  };
  const multi = a => {
    console.log(`multi a = ${a}`);
    return a * 2;
  };
  const addThenMulti = pipeline(plus, multi);
  console.log(addThenMulti(5));
}

var id = 21;

/**
 * 不知道为什么里面的方法不调用，无所谓了
 * 里面的this指向的是func6的this对象
 */
function func6() {
  setTimeout(() => {
    console.log(`id: ${this.id}`);
  }, 1000)
}

/**
 * rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错
 */
function push(arr, ...items) {
  items.forEach(item => {
    arr.push(item);
  })
}

/**
 * @param  {...any} nums 就是个数组对象
 */
function add(...nums) {
  let sum = 0;
  for (let num of nums) {
    sum += num;
  }
  return sum;
}

function throwIfMissing() {
  throw new Error('missing parameter');
}

/**
 * 利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误
 */
function func5(param = throwIfMissing()) {
  return param;
}

var x = 1;

/**
 * 网上说因为是两个作用域：参数作用域和方法体作用域，结果应该是3，但是我这边结果是2，
 * 估计是环境的问题，这个时候尽量变量名不要重复
 */
function func4(x, y = function () {
  x = 2;
}) {
  var x = 3;
  y();
  console.log(`x = ${x}`);
}

let str = 'outer';
/**
 * 因为参数列表是个单独的作用域，参数列表中foo是outer，但是结果却是inter，跟网上说的不一样！！！
 */
function bar(func = () => str) {
  let str = 'inter';
  console.log(func());
}

function func3(x = 1, y) {
  console.log(`func3 x = ${x}, y = ${y}`)
}

/**
 * 函数参数的默认值是空对象，但是设置了对象解构赋值的默认值
 */
function func1({
  x = 0,
  y = 0
} = {}) {
  console.log(`func1 x = ${x}, y = ${y}`)
}

/**
 * 函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值
 */
function func2({
  x,
  y
} = {
  x: 0,
  y: 0
}) {
  console.log(`func2 x = ${x}, y = ${y}`)
}

function fetch(url, {
  body = '',
  method = 'Get',
  headers = {}
} = {}) {
  console.log(`fetch method = ${method}`)
}

function destructuring({
  x,
  y = 5
} = {}) {
  console.log(`destructuring x = ${x}, y = ${y}`);
}

let num = 99;

function foo(p = num + 1) {
  console.log(`foo p = ${p}`);
}

function printMsg(x, y = 'World') {
  console.log(`printMsg x = ${x}, y = ${y}`);
}
