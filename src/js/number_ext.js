export function es6_numberExt() {
    // ES6 提供了二进制和八进制数值的新的写法，分别用前缀0b（或0B）和0o（或0O）表示
    console.log(0b111110111 === 503); // 二进制
    console.log(0o767 === 503); // 八进制
    
    // 如果要将0b和0o前缀的字符串数值转为十进制，要使用Number方法。
    console.log(Number('0o767'));
    console.log(Number('0b111110111'));

    // Number.isFinite()、Number.isNaN()与传统的全局方法isFinite()和isNaN()的区别在于，
    // 传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效
    // Number.isFinite()用来检查一个数值是否为有限的（finite）
    // 如果参数类型不是数值，Number.isFinite一律返回false
    console.log(`Number.isFinite(15) = ${Number.isFinite(15)}`);
    console.log(`Number.isFinite(0.8) = ${Number.isFinite(0.8)}`);
    console.log(`Number.isFinite(Infinity) = ${Number.isFinite(Infinity)}`);
    console.log(`Number.isFinite(NaN) = ${Number.isFinite(NaN)}`);
    console.log(`Number.isFinite(true) = ${Number.isFinite(true)}`);
    console.log(`Number.isFinite('1') = ${Number.isFinite('1')}`);
    
    // Number.isNaN()用来检查一个值是否为NaN，NaN是not a number
    console.log(`Number.isNaN(NaN) = ${Number.isNaN(NaN)}`);
    console.log(`Number.isNaN(1) = ${Number.isNaN(1)}`);
    console.log(`Number.isNaN('1') = ${Number.isNaN('1')}`);
    console.log(`Number.isNaN(true) = ${Number.isNaN(true)}`);
    
    console.log(Number.parseInt('12.34'));
    console.log(Number.parseFloat('12.34#'));

    // Number.isInteger()用来判断一个数值是否为整数
    console.log(Number.isInteger(12.34));
    console.log(`Number.MAX_VALUE = ${Number.MAX_VALUE}`);
    console.log(`Number.MIN_VALUE = ${Number.MIN_VALUE}`);

    // Math.trunc方法用于去除一个数的小数部分，返回整数部分
    console.log(Math.trunc(4.1));
    console.log(Math.trunc(-4.1));
    console.log(Math.trunc('123.45'));
    console.log(Math.trunc(true));
    
    // Math.sign方法用来判断一个数到底是正数、负数、还是零。
    // 如果参数是非数值，会自动转为数值。对于那些无法转为数值的值，会返回NaN
    console.log(`Math.sign(-2) = ${Math.sign(-2)}`);
    console.log(`Math.sign(2) = ${Math.sign(2)}`);
    console.log(`Math.sign(0) = ${Math.sign(0)}`);
    console.log(`Math.sign(true) = ${Math.sign(true)}`);
    console.log(`Math.sign('') = ${Math.sign('')}`);
    console.log(`Math.sign('9') = ${Math.sign('9')}`);
    console.log(`Math.sign('a') = ${Math.sign('a')}`);
    console.log(`Math.sign(null) = ${Math.sign(null)}`);
    
    
    
}