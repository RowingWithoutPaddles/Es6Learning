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
    
    // Math.cbrt方法用于计算一个数的立方根,对于非数值，Math.cbrt方法内部也是先使用Number方法将其转为数值。
    console.log(`Math.cbrt(27) = ${Math.cbrt(27)}`);
    console.log(`Math.cbrt(8) = ${Math.cbrt(8)}`);
    
    // Math.clz32()方法将参数转为 32 位无符号整数的形式，然后这个 32 位值里面有多少个前导 0
    console.log(`Math.clz32(0) = ${Math.clz32(0)}`); // 结果是32，因为全是0
    console.log(`Math.clz32(1) = ${Math.clz32(1)}`); // 结果是31，最后一个是1
    // 对于小数，Math.clz32方法只考虑整数部分。对于空值或其他类型的值，Math.clz32方法会将它们先转为数值，然后再计算
    console.log(`Math.clz32(1.1) = ${Math.clz32(1.1)}`);
    console.log(`Math.clz32('1.1') = ${Math.clz32('1.1')}`);
    console.log(`Math.clz32(null) = ${Math.clz32(null)}`);

    // Math.imul方法返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数。
    // 如果只考虑最后 32 位，大多数情况下，Math.imul(a, b)与a * b的结果是相同的，即该方法等同于(a * b)|0的效果（超过 32 位的部分溢出）。
    // 之所以需要部署这个方法，是因为 JavaScript 有精度限制，超过 2 的 53 次方的值无法精确表示。
    // 这就是说，对于那些很大的数的乘法，低位数值往往都是不精确的，Math.imul方法可以返回正确的低位数值。
    console.log(`((0x7fffffff * 0x7fffffff)|0) = ${((0x7fffffff * 0x7fffffff)|0)}`);
    console.log(`Math.imul(0x7fffffff, 0x7fffffff) = ${Math.imul(0x7fffffff, 0x7fffffff)}`);
    
    // Math.hypot方法返回所有参数的平方和的平方根。
    console.log(`Math.hypot(3, 4) = ${Math.hypot(3, 4)}`);
    console.log(`Math.hypot(6, 8) = ${Math.hypot(6, 8)}`);
    

    // ES6 新增了 4 个对数相关方法。
    // Math.expm1(x)返回 e^x - 1，即Math.exp(x) - 1。
    console.log(`Math.expm1(1) = ${Math.expm1(1)}`);
    console.log(`Math.expm1(0) = ${Math.expm1(0)}`);
    
    // Math.log1p(x)方法返回1 + x的自然对数，即Math.log(1 + x)。如果x小于-1，返回NaN。
    console.log(`Math.log1p(0) = ${Math.log1p(0)}`);
    console.log(`Math.log1p(1) = ${Math.log1p(1)}`);
    
    // Math.log10(x)返回以 10 为底的x的对数。如果x小于 0，则返回 NaN。
    console.log(`Math.log10(100) = ${Math.log10(100)}`);

    // Math.log2(x)返回以 2 为底的x的对数。如果x小于 0，则返回 NaN。
    console.log(`Math.log2(8) = ${Math.log2(8)}`);
    
    // ES2016 新增了一个指数运算符（**）
    console.log(`2 ** 3 = ${2 ** 3}`); // 即 2^3 = 8
    // 这个运算符的一个特点是右结合，而不是常见的左结合。多个指数运算符连用时，是从最右边开始计算的
    console.log(`2 ** 3 ** 2 = ${2 ** 3 ** 2}`); // 即 2^(3^2) = 512
    // 指数运算符可以与等号结合，形成一个新的赋值运算符（**=）。
    let num = 2;
    num **= 2; // 即 num = num^2
    console.log(`num **= 2, num = ${num}`);
}