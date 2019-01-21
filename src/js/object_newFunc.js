export function object_newFunc() {
    // Object.is()
    // Object.is用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致
    console.log("Object.is('foo', 'foo') = ", Object.is('foo', 'foo'));
    console.log("'foo' === 'foo' = ", 'foo' === 'foo');
    console.log('Object.is({}, {}) = ', Object.is({}, {}));
    console.log('{} === {} = ', {} === {});
    // 不同之处只有两个：一是+0不等于-0，二是NaN等于自身
    console.log("Object.is(+0, -0) = ", Object.is(+0, -0), '\t这是正确的');
    console.log("+0 === -0 = ", +0 === -0, '\t这是错误的');
    console.log("Object.is(NaN, NaN) = ", Object.is(NaN, NaN), '\t这是正确的');
    console.log("NaN === NaN = ", NaN === NaN, '\t这是错误的');

    // Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
    // Object.assign方法实行的是浅拷贝，而不是深拷贝
    // 如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性
    let target = { a: 1, b: 1 };
    let source1 = { b: 2, c: 2 };
    let source2 = { c: 3 };
    Object.assign(target, source1, source2)
    console.log('target = ', target);
    // 如果只有一个参数，Object.assign会直接返回该参数
    console.log("Object.assign(source2) === source2 = ", Object.assign(source2) === source2);
    // 如果该参数不是对象，则会先转成对象，然后返回
    console.log('Object.assign(2) = ', Object.assign(2));
    // Object.assign可以用来处理数组，但是会把数组视为对象
    console.log('Object.assign([1, 2, 3], [4, 5]) = ', Object.assign([1, 2, 3], [4, 5])); // [4, 5, 3]
    // 取值函数的处理
    let source4 = {
        get foo() { return 1; }
    };
    let target4 = {};
    console.log('Object.assign(target4, source4) = ', Object.assign(target4, source4));

    // Object.assign方法有很多用处
    // 为对象添加属性
    let point = new Point(2, 3);
    console.log('point = ', point);

    // 为对象添加方法
    Object.assign(Point.prototype, {
        func1(x, y) {
            console.log('func1 x = %d, y = %d', x, y);
        },
        func2() {
            console.log(('func2'));
        }
    });
    // 等同于
    // Point.prototype.func1 = function(x, y) {
    //     // ...
    // }
    // Point.prototype.func2 = function(x, y) {
    //     // ...
    // }
    point.func1(1, 2)
    point.func2()


    // Object.setPrototypeOf用来设置一个对象的prototype对象
    let proto = {};
    let obj = { x: 10 };
    Object.setPrototypeOf(obj, proto);
    proto.y = 20;
    proto.z = 30;
    console.log(`obj.y = ${obj.y}, obj.z = ${obj.z}`);
    // Object.getPrototypeOf()用于读取一个对象的原型对象
    console.log('Object.getPrototypeOf(obj) == proto = ', Object.getPrototypeOf(obj) == proto);
    
    console.log(Object.entries(point)); // [["z",0],["x",2],["y",3]]
    // Object.entries方法的另一个用处是，将对象转为真正的Map结构。
    let map = new Map(Object.entries(point));
    console.log('map = ', map);
    
    
}

class Point {

    z = 0;
    constructor(x, y) {
        Object.assign(this, { x, y });
    }
}