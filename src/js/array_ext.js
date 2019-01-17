export function es6_arrayExt() {
    // 扩展运算符
    console.log(1, ...[2, 3, 4], 5);
    // 扩展运算符主要用于函数调用
    // 如果扩展运算符后面是一个空数组，则不产生任何效果
    let array = [1, 2];
    push(array, [3, 4, 5]);
    console.log(`array = ${array}`);
    // 用...替代函数的 apply 方法
    console.log(`add(...array) = ${add(...array)}`);

    // 扩展运算符的应用
    // 复制数组，两种写法
    let arrayCopy = [...array];
    let [...arrayCopy2] = array;
    console.log(`arrayCopy = ${arrayCopy}`);
    console.log(`arrayCopy2 = ${arrayCopy2}`);

    // 合并数组
    let a1 = [{ foo: 1 }]
    let a2 = [{ foo: 2 }]
    // 不过，这两种方法都是浅拷贝，使用的时候需要注意
    let a3 = a1.concat(a2);
    let a4 = [...a1, ...a2];
    console.log(`a1[0] === a3[0] = ${a1[0] === a3[0]}`);
    console.log(`a1[0] === a4[0] = ${a1[0] === a4[0]}`);

    // 与解构赋值结合，如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错
    let [first, ...rest] = [1, 2, 3, 4, 5]
    console.log(`first = ${first}, rest = ${rest}`);

    // 字符串
    let strArr = [...'Hello'];
    console.log(`strArr = ${strArr}`);
    // 上面的写法，有一个重要的好处，那就是能够正确识别四个字节的 Unicode 字符
    let str = 'x\uD83D\uDE80y';
    console.log(`'${str}'.length = ${str.length}，这是错误的`);
    console.log(`stringLength('${str}') = ${stringLength(str)}，这是正确的`);
    // 凡是涉及到操作四个字节的 Unicode 字符的函数，都有这个问题。因此，最好都用扩展运算符改写
    console.log(`'${str}'.split('').reverse().join('') = ${str.split('').reverse().join('')}，这是错误的`);
    console.log(`[...'${str}'].reverse().join('') = ${[...str].reverse().join('')}，这是正确的`);

    // 实现了 Iterator 接口的对象都能用扩展运算符
    Number.prototype[Symbol.iterator] = function* () {
        let i = 0;
        let num = this.valueOf();
        while (i < num) {
            yield i++;
        }
    }
    console.log(`[...5] = ${[...5]}`);

    // Map 和 Set 结构，Generator 函数
    // 扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符
    let map = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three'],
    ])
    console.log(`[...map.keys()] = ${[...map.keys()]}`);

    let go = function* () {
        yield 1;
        yield 2;
        yield 3;
    }
    console.log(`[...go()] = ${[...go()]}`);


    // 只要是部署了 Iterator 接口的数据结构，Array.from都能将其转为数组
    console.log(`Array.from('Hello') = ${Array.from('Hello')}，等价于 ...'Hello' `);

    let nameSet = new Set(['a', 'b']);
    console.log(`Array.from(nameSet) = ${Array.from(nameSet)}`);

    // 如果参数是一个真正的数组，Array.from会返回一个一模一样的新数组。
    console.log(`Array.from([1, 2, 3]) = ${Array.from([1, 2, 3])}`);

    // Array.from方法还支持类似数组的对象。所谓类似数组的对象，本质特征只有一点，即必须有length属性。
    // 因此，任何有length属性的对象，都可以通过Array.from方法转为数组，而此时扩展运算符就无法转换
    let arrayLike = {
        '0': 'a',
        '1': 'b',
        '2': 'c',
        length: 3,
    }
    console.log(`Array.from(arrayLike) = ${Array.from(arrayLike)}`);
    console.log(`Array.from({ length: 3 }) = ${Array.from({ length: 3 })}`);

    // Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组
    console.log(`Array.from(arrayLike, str => str.repeat(2)) = ${Array.from(arrayLike, str => str.repeat(2))}，等价于下面的方法：`);
    console.log(`Array.from(arrayLike).map(str => str.repeat(2)) = ${Array.from(arrayLike).map(str => str.repeat(2))}`);

    console.log(`Array.from([1, , 2, , 3], n => n || 0) = ${Array.from([1, , 2, , 3], n => n || 0)}`);

    console.log(`typesOf(null, [], NaN) = ${typesOf(null, [], NaN)}`);

    // 默认填充值
    console.log(`Array.from({ length: 2 }, () => 'Jack') = ${Array.from({ length: 2 }, () => 'Jack')}`);

    console.log(`stringLength2(str) = ${stringLength2(str)}`);


    // Array.of方法用于将一组值，转换为数组。
    console.log(`Array.of(3, 8, 11) = [${Array.of(3, 8, 11)}]`);
    console.log(`Array.of() = [${Array.of()}]`);
    console.log(`Array.of(undefined) = [${Array.of(undefined)}]`);

    // 数组实例的 copyWithin()
    // 数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。
    // 也就是说，使用这个方法，会修改当前数组。
    // 把下标3后面的数据从下标0的位置开始覆盖
    let arrays = [1, 2, 3, 4, 5];
    console.log(`arrays.copyWithin(0, 3) = ${arrays.copyWithin(0, 3)}`);
    // 将3号位复制到0号位
    console.log(`[].copyWithin.call({length: 3, 3: 1}, 0, 3) = ${[].copyWithin.call({ length: 3, 3: 1 }, 0, 3)}`);
    let i32a = new Int32Array([1, 2, 3, 4, 5]);
    // 两种写法效果一样
    console.log(`i32a.copyWithin(0, 2) = ${i32a.copyWithin(0, 2)}`);
    console.log(`[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 2) = ${[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 2)}`);

    // 数组实例的 find() 和 findIndex()
    // find 用于找出第一个符合条件的数组成员, 如果没有符合条件的成员，则返回undefined
    // 这里可以只指定value，index和arr可以省略
    console.log(`arrays.find((value, index, arr) => value > 3) = ${arrays.find((value, index, arr) => value > 3)}`);
    // findIndex 返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1
    // 这里也可以只指定value，index和arr可以省略
    console.log(`arrays.findIndex((value, index, arr) => value > 3) = ${arrays.findIndex((value, index, arr) => value > 3)}`);
    // find() 和 findIndex()这两个方法都可以接受第二个参数，用来绑定回调函数的this对象
    function f(v) {
        return v > this.age;
    }
    let person = { name: 'army', age: 4 };
    console.log(`arrays.find(f, person) = ${arrays.find(f, person)}`);
    // 这里不能用箭头函数，因为箭头函数没有this对象，所以最后this还是外面的
    // console.log(arrays.find(value => value > this.age, person));

    // find() 和 findIndex()这两个方法都可以发现NaN，弥补了数组的indexOf方法的不足
    let nanArr = [NaN];
    console.log(`nanArr.indexOf(NaN) = ${nanArr.indexOf(NaN)}，这是不对的`);
    console.log(`nanArr.findIndex(value => Object.is(value, NaN)) = ${nanArr.findIndex(value => Object.is(value, NaN))}，这是对的`);


    // fill方法使用给定值，填充一个数组。
    // fill方法用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。
    let pFillArr = ['a', 'b', 'c'];
    console.log(`[${pFillArr}].fill(7) = ${pFillArr.fill(7)}`);
    console.log(`new Array(3).fill(7) = ${new Array(3).fill(7)}`);
    // fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置,[起始位置, 结束位置)
    // fill方法从 1 号位开始，向原数组填充 7，到 2 号位之前结束
    console.log(`['a', 'b', 'c'].fill(7, 1, 2) = ${['a', 'b', 'c'].fill(7, 1, 2)}`);
    // 如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象
    let fillResult = new Array(3).fill({ name: 'Nike' });
    fillResult[0].name = 'Jack';
    console.log(`fillResult = ${JSON.stringify(fillResult)}`);


    // 数组实例的 entries()，keys() 和 values()
    array = [1, 2, 3, 4, 5];
    for (let index of array.keys()) {
        console.log(`index = ${index}`);
    }
    for (let value of array.values()) {
        console.log(`value = ${value}`)
    }
    for (let [index, value] of array.entries()) {
        console.log('index = %d, value = %d', index, value);
    }


    // 数组实例的 includes(), 该方法的第二个参数表示搜索的起始位置，默认为0
    console.log(`array.includes(2) = ${array.includes(2)}`);
    console.log(`array.includes(2, 3) = ${array.includes(2, 3)}`);


    // 数组实例的 flat()，flatMap()
    // 数组的成员有时还是数组，Array.prototype.flat()用于将嵌套的数组“拉平”，变成一维的数组
    // flat()默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将flat()方法的参数写成一个整数，表示想要拉平的层数，默认为1
    array = [1, 2, [3, [4, 5]]];
    console.log('array.flat() = ', JSON.stringify(array.flat()));
    console.log('array.flat(2) = ', JSON.stringify(array.flat(2)));
    // 如果不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数
    console.log('%s.flat(Infinity) = %s', JSON.stringify(array), JSON.stringify(array.flat(Infinity)));
    // 如果原数组有空位，flat()方法会跳过空位
    console.log('[1, 2, , 4, 5].flat() = ', [1, 2, , 4, 5].flat());
    
    // flatMap()方法对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()），然后对返回值组成的数组执行flat()方法
    // flatMap()只能展开一层数组
    array = [1, 2, 3, 4, 5];
    console.log('%s.flatMap(x => [x, x * 2]) = %s', JSON.stringify(array), JSON.stringify(array.flatMap(x => [x, x * 2])));
    console.log('%s.flatMap(x => [[x, x * 2]]) = %s', JSON.stringify(array), JSON.stringify(array.flatMap(x => [[x, x * 2]])));
    
    // ES6 则是明确将数组中的空位转为undefined
    // Array.from和扩展运算符（...）会将空位转为undefined
    array = [1, 2, , , 5];
    console.log(array);
    console.log(Array.from(array));
    console.log([...array]);
    // copyWithin()会连空位一起拷贝，fill()会将空位视为正常的数组位置，for...of循环也会遍历空位
    array = [, 'a', 'b', ,];
    console.log(array.copyWithin(2, 0));
    
}

function typesOf() {
    return Array.from(arguments, value => typeof value);
}

/**
 * 正确返回字符串长度的函数
 * 直接用str.length，JavaScript 会将四个字节的 Unicode 字符，识别为 2 个字符，采用扩展运算符就没有这个问题
 * 以下两种写法都一样
 */
function stringLength(str) {
    return [...str].length;
}
function stringLength2(str) {
    return Array.from(str).length;
}

function push(array, ...items) {
    array.push(...items);
}

function add(x, y) {
    return x + y;
}