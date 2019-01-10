export function es6_regexp() {
    let regex = new RegExp(/xyz/ig, 'i');

    let str = ' Hello world ';
    // i - 修饰符是用来执行不区分大小写的匹配。
    // g - 修饰符是用于执行全文的搜索
    // match返回存放匹配结果的数组
    console.log(str.match(/o/ig));
    console.log(str.replace(/\s/ig, '-'))
    console.log(str.search(/l/g))
    console.log(str.split(/o/));
    
    // ES6 对正则表达式添加了u修饰符，含义为“Unicode 模式”，用来正确处理大于\uFFFF的 Unicode 字符
    // 因为\uD83D\uDC2A是代表一个字符，所以结果是false
    console.log(/^\uD83D/u.test('\uD83D\uDC2A'));
    
    let s = '𠮷';
    // 一旦加上u修饰符号，就会修改下面这些正则表达式的行为
    // 对于码点大于0xFFFF的 Unicode 字符，点字符不能识别，必须加上u修饰符
    console.log(`/^.$/u.test('${s}') = ${/^.$/u.test(s)}`);
    // ES6 新增了使用大括号表示 Unicode 字符，这种表示法在正则表达式中必须加上u修饰符，才能识别当中的大括号，否则会被解读为量词
    console.log(`/\u{20BB7}/u.test('${s}') = ${/\u{20BB7}/u.test(s)}`);
    
    // 使用u修饰符后，所有量词都会正确识别码点大于0xFFFF的 Unicode 字符
    console.log(`/𠮷{2}/u.test('𠮷𠮷') = ${/𠮷{2}/u.test(s.repeat(2))}`);
    
    console.log(codePointLength('𠮷𠮷'));

    // 有些 Unicode 字符的编码不同，但是字型很相近，比如，\u004B与\u212A都是大写的K,
    // 不加u修饰符，就无法识别非规范的K字符
    console.log(`/[a-z]/iu.test('\u212A') = ${/[a-z]/iu.test('\u212A')}`);
    console.log(`/[a-z]/i.test('\u212A') = ${/[a-z]/i.test('\u212A')}`);
    
    // y 修饰符，确保匹配必须从剩余的第一个位置开始, 实际上，y修饰符号隐含了头部匹配的标志^。
    let text = 'aaa_aa_a'
    let r1 = /a+/g
    let r2 = /a+/y
    r1.exec(text) // [aaa]，剩余_aa_a
    r2.exec(text) // [aaa]，剩余_aa_a

    r1.exec(text) // [aa], 剩余_a
    r2.exec(text) // null，因为剩余的开头是_，找不到匹配的

    // lastIndex属性指定每次搜索的开始位置，把下面的g换成y，结果不一样
    let reg = /a/g;
    reg.lastIndex = 2;
    let match = reg.exec('xaya')
    console.log(match);
    // match.index = 3
    // 下一次匹配从4号位开始
    console.log(reg.lastIndex);
    // 4号位开始匹配失败
    console.log(reg.exec('xaya'));
    
    // y修饰符的一个应用，是从字符串提取 token（词元），y修饰符确保了匹配之间不会有漏掉的字符。
    // 一旦出现非法字符，两者的行为就不一样了
    let REGEX_Y = /\s*(\+|\d+)\s*/y
    let REGEX_G = /\s*(\+|\d+)\s*/g

    console.log(tokenize(REGEX_Y, '3x + 4'));
    console.log(tokenize(REGEX_G, '3 + 4'));

    console.log(`REGEX_Y.flags = ${REGEX_Y.flags}`);
    console.log(`REGEX_Y.source = ${REGEX_Y.source}`);
    
    

}

function tokenize(reg, str) {
    let result = [];
    let match;
    while (match = reg.exec(str)) {
        result.push(match[1]);
    }
    return result;
}

/**
 * \S是预定义模式，匹配所有非空白字符。只有加了u修饰符，它才能正确匹配码点大于0xFFFF的 Unicode 字符。
 * 利用这一点，可以写出一个正确返回字符串长度的函数
 * @param {*} str 
 */
function codePointLength(str) {
    let result = str.match(/[\s\S]/gu);
    return result ? result.length : 0;
}