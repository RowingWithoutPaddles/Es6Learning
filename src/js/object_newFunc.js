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
    let target = { a: 1 };
    let source1 = { b: 2 };
    let source2 = { c: 3 };
    Object.assign(target, source1, source2)
}