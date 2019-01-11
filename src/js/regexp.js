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

    // s 修饰符：dotAll 模式
    // 点（.）是一个特殊字符，代表任意的单个字符，但是有两个例外。
    // 一个是四个字节的 UTF-16 字符，这个可以用u修饰符解决；另一个是行终止符（line terminator character）
    console.log(`/foo.bar/.test('foo\nbar') = ${/foo.bar/.test('foo\nbar')}`);
    // 暂时不支持s
    // console.log(`/foo.bar/s.test('foo\nbar') = ${/foo.bar/s.test('foo\nbar')}`);

    // 先行断言,只匹配百分号之前的数字,括号之中的部分（(?=%)），是不计入返回结果的。
    console.log(/\d+(?=%)/.exec('100% of US presidents have been male, 200'));
    // 先行否定断言,只匹配不在百分号之前的数字,括号之中的部分（(?!%)），是不计入返回结果的。
    console.log(/\d+(?!%)/.exec('100% of US presidents have been male, 200'));

    // 后行断言,只匹配美元符号之后的数字，要写成/(?<=\$)\d+/
    console.log(/(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill, it’s is worth about €90'));
    // 后行否定断言,只匹配不在美元符号之后的数字，要写成/(?<!\$)\d+/
    console.log(/(?<!\$)\d+/.exec('Benjamin Franklin is on the $100 bill, it’s is worth about €90'));

    // “后行断言”的反斜杠引用，也与通常的顺序相反，这里的\1匹配的是 所获取的第1个()匹配的引用
    console.log(/(?<=(o)d\1)r/.exec('hodor')); // 结果是null
    // 需要反过来写
    console.log(/(?<=\1d(o))r/.exec('hodor')); // 结果是['r', 'o']

    // \p{...}和\P{...}，允许正则表达式匹配符合 Unicode 某种属性的所有字符
    // 格式：\p{UnicodePropertyName=UnicodePropertyValue}，对于某些属性，可以只写属性名，或者只写属性值。
    // \P{…}是\p{…}的反向匹配，即匹配不满足条件的字符。
    // 当前环境不支持\p{}
    // let r = /^\p{Decimal_Number}+$/u
    // r.test('𝟏𝟐𝟑𝟜𝟝𝟞𝟩𝟪𝟫𝟬𝟭𝟮𝟯𝟺𝟻𝟼')

    // 具名组匹配
    // 普通的
    let RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;
    let matchObj = RE_DATE.exec('2018-01-11');
    let year = matchObj[1];
    let month = matchObj[2];
    let day = matchObj[3];
    console.log(`普通匹配：${year}-${month}-${day}`);

    // 具名的
    RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
    matchObj = RE_DATE.exec('2018-01-11');
    year = matchObj.groups.year;
    month = matchObj.groups.month;
    day = matchObj.groups.day;
    console.log(`具名匹配：${year}-${month}-${day}`);

    // 解构赋值和替换
    RE_DATE = /(?<y>\d{4})-(?<m>\d{2})-(?<d>\d{2})/;
    let { groups: { y, m, d } } = RE_DATE.exec('2018-01-11');
    console.log(`y = ${y}, m = ${m}, d = ${d}`);

    // 字符串替换时，使用$<组名>引用具名组。
    console.log('2018-01-10'.replace(RE_DATE, '$<y>/$<m>/$<d>'));

    // replace方法的第二个参数也可以是函数
    console.log('2018-01-10'.replace(RE_DATE, (
        matched, // 整个匹配结果 2018-01-10
        capture1, // 第一组匹配 2018
        capture2, // 第二组匹配 01
        capture3, // 第三组匹配 10
        position, // 匹配开始的位置 0
        S, // 原字符串 2018-01-10
        groups // 具名组构成的一个对象
    ) => {
        let {y, m, d} = groups;
        return `${y}/${m}/${d}`
    }));

    // 在正则表达式内部引用某个“具名组匹配”，使用\k<组名>的写法。
    let REG_TWICE = /^(?<word>[a-z]+)!\k<word>$/
    console.log(REG_TWICE.test('abc!abc'));
    // 数字引用（\1）依然有效
    REG_TWICE = /^(?<word>[a-z]+)!\1$/
    console.log(REG_TWICE.test('abc!abc'));
    // 这两种引用语法还可以同时使用
    REG_TWICE = /^(?<word>[a-z]+)!\1!\k<word>$/
    console.log(REG_TWICE.test('abc!abc!abc'));

    // 当前环境没有matchAll方法
    // regex = /t(e)(st(\d?))/g
    // let matchResult = 'test1test2test3'.matchAll(regex);
    // for (let result of matchResult) {
    //     console.log(result);
        
    // }
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