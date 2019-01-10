export function string_ext() {
    // 字符的 Unicode 表示法
    // 如果直接在\u后面跟上超过0xFFFF的数值,只要将码点放入大括号
    console.log("\u{20BB7}")
    console.log("\u{41}\u{42}\u{43}")

    // 通常一个汉字是一个字符，但有些汉字需要4个字节储存的字符（Unicode 码点大于0xFFFF的字符），JavaScript 会认为它们是两个字符
    // s是三个字符，𠮷是\uD842\uDFB7
    let s = '𠮷a';
    console.log(s.codePointAt(0)) // 返回𠮷的十进制码点
    console.log(s.codePointAt(0).toString(16)) // 20BB7
    console.log(s.codePointAt(1)) // 返回𠮷的后两个字节的十进制，DFB7的十进制
    console.log(s.codePointAt(2)) // a的十进制

    console.log(`is32Bit('𠮷') = ${is32Bit('𠮷')}`)
    console.log(`is32Bit('a') = ${is32Bit('a')}`)

    // ES6 提供了String.fromCodePoint方法，可以识别大于0xFFFF的字符，弥补了String.fromCharCode方法的不足
    console.log(String.fromCodePoint(0x20BB7))
    console.log(String.fromCodePoint(0x78, 0x1f680, 0x79))

    // 字符串的遍历器接口
    for (let s of 'Hello') {
        console.log(s)
    }

    // for...of遍历器最大的优点是可以识别大于0xFFFF的码点
    for (let s of '𠮷🚀') {
        console.log(s)
    }

    console.log('\u01D1'.normalize())
    console.log('\u004F\u030C'.normalize())

    let str = 'Hello world!'
    // 下面三个方法都支持第二个参数，表示开始搜索的位置
    console.log(str.includes('o', 1));
    console.log(str.startsWith('Hello'))
    console.log(str.endsWith('!'))

    // 将原字符串重复n次
    console.log('Hello world'.repeat(2))

    // 字符串补全长度，padStart()用于头部补全，padEnd()用于尾部补全
    // 第一个参数是字符串补全生效的最大长度, 如果省略第二个参数，默认使用空格补全长度。
    console.log('x'.padStart(5, 'a'))
    console.log('x'.padEnd(5, 'b'))
    // 如果原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串
    console.log('abc'.padEnd(3, 'x'))
    console.log('01-10'.padStart(10, 'YYYY-MM-DD'))

    // 所有模板字符串的空格和换行，都是被保留的
    console.log(`<ul>
        <li>first</li>
        <li>second</li>
    </ul>`);

    // 模板字符串甚至还能嵌套。
    const tmpl = addrs =>  `
    <table>
        ${addrs.map(addr => `
        <tr>
            <td>${addr.first}</td>
            <td>${addr.last}</td>
        </tr>
        `).join('')}
    </table>
    `
    const data = [{ first: 'Jane',  last: 'Bond' }, { first: 'Army',  last: 'Music' }]
    console.log(tmpl(data))

    // 如果需要引用模板字符串本身，在需要时执行，可以像下面这样写。
    // 方法一：
    let string = 'return `Hello ${name}`'
    let func = new Function('name', string)
    console.log(func('Jack'));
    // 方法二：
    let string1 = '(name) => `Hello ${name}`'
    let func1 = eval.call(null, string1)
    console.log(func1('World'));
    
    // String.raw方法，往往用来充当模板字符串的处理函数，返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串
    console.log(`String.raw\`Hi\\n\${2 + 3}\` = ${String.raw`Hi\n${2 + 3}`}`);
    // 如果原字符串的斜杠已经转义，那么String.raw会进行再次转义。
    // 其实输出的结果是Hi\\u000A!，但是控制台显示的是转义后的结果
    console.log(String.raw`Hi\u000A!`);

    // String.raw方法也可以作为正常的函数使用。这时，它的第一个参数，应该是一个具有raw属性的对象，且raw属性的值应该是一个数组或者是Iterator。
    console.log(String.raw({raw: 'test'}, ...[0, 1, 2]))
    
}

// 判断一个字符由两个字节还是由四个字节组成
function is32Bit(str) {
    return str.codePointAt(0) > 0xFFFF;
}