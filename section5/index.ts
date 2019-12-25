// 函数
// 命名函数
function add(x, y) {
    return x + y
}
// 匿名函数
let myAdd = function (x, y) {
    return x + y
}
// 通过作用域规则, 函数内部得外部变量
let z = 100
function addToZ(x, y) {
    return x + y + z
}

// 函数添加类型
function addByType(x: number, y: number): number {
    return x + y
}
// 书写完整函数类型
// 函数参数类型匹配, 参数名可以不一样
// ts 提供类型推断, 即函数等式两边只要有一边声明类型即可
let myAddByType: (baseValue: number, increment: number) => number = function (x: number, y: number): number {
    return x + y
}

// 可选参数, 添加 ？ 符合来使得参数非必传
// 注意 ? 位置, 另外可选参数必须在必传参数的后面
function buildNameOption(firstName: string, lastName?: string): string {
    if (lastName) {
        return firstName + ' ' + lastName
    } else {
        return firstName
    }
}
let result1 = buildNameOption('Bob')
console.log('buildNameOption', result1)

// 默认参数
function buildNameDefault(firstName = 'Will', lastName: string): string {
    return firstName + ' ' + lastName
}
let result2 = buildNameDefault(undefined, 'Bob')
console.log('buildNameDefault', result2)

// 剩余参数
function buildNameRemain(firstName: string, ...restOfName: string[]): string {
    return firstName + ' ' + JSON.stringify(restOfName)
}
let buildNameFn: (fname: string, ...rest: string[]) => string = buildNameRemain
let result3 = buildNameFn('Bob', 'Adams', 'Will')
console.log('buildNameRemain', result3)
