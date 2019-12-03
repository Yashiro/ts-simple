// 闭包
function f() {
    var a = 10
    return function g() {
        var b = a + 1
        return b
    }
}
var g = f()
console.log(g())

// var 有一个潜规则，变量声明会提前，即所谓变量提升
// 即 f1 函数体内等同于如下
// var x
// if (shouldInitialize) {
//     x = 10
// }
function f1(shouldInitialize) {
    if (shouldInitialize) {
        var x = 10
    }
    return x
}
console.log(f1(true)) // 10
console.log(f1(false)) // undefined

// 矩阵运算
function sumMatrix(matrix) {
    var sum = 0
    for (var i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i]
        // 此处如果仍就 var 定义变量名 i 会把外层的 var i 覆盖; 因此要改变量名为 j
        for (var j = 0; j < currentRow.length; j++) {
            sum += currentRow[j]
        }
    }
    return sum
}
var matrix = [
    [1, 2, 3],
    [4, 5, 6]
]
// 如果内层循环 var 不改为 j，则结果不会为正确的 21 而是 6;
// 因为 i 变量一样都累加到 3 跳出整个循环体
console.log(sumMatrix(matrix))

// 如果把输出放在定时器中结果为十个 10 而不是预期的 0 - 9;
// 可以使用立即执行表达式来解决; 作用是每次把传入立即执行函数的参数在末尾缓存下来
for(var i = 0; i < 10; i++) {
    // 此处相当于闭包, 每次外层循环的 i 的值赋给 j 然后输出
    (function (j) {
        setTimeout(() => {
            console.log(j)
        }, 100 * j)
    })(i)
}

// let 有块级作用域概念、在同一块中不可重复声明
// 屏蔽功能
function sumMatrixByLet(matrix: number[][]) {
    let sum = 0
    for (let i = 0; i < matrix.length; i++) {
        let currentRow = matrix[i]
        for (let i = 0; i < currentRow.length; i++) {
            sum += currentRow[i]
        }
    }
    return sum
}
let matrixByLet = [
    [1, 2, 3],
    [4, 5, 6]
]
console.log('let =>', sumMatrixByLet(matrixByLet))

// let 块级作用域创建新的变量环境; 在每次迭代时能创建新的作用域
for (let i = 0; i < 10; i++) {
    setTimeout(() => {
        console.log(`let ${i} => `, i)
    }, 100 * i)
}

// const 与 let 用法一样
// 区别就是不能对 const 声明的常量重新赋值, 但可以对其中的属性重新赋值
// 除要对引用的变量值进行改变的，都应该使用 const
const numLivesForCat = 9
const kitty = {
    name: 'Kitty',
    numLives: numLivesForCat
}
kitty.name = 'Jerry'
kitty.numLives--


// 解构
// 数组解构
let input: [number, number] = [1, 2]
let [ first, second ] = input

// 函数参数解构
function unstructure([first, second]: [number, number]) {
    console.log('unstructure => ', first)
    console.log('unstructure => ', second)
}
unstructure(input)

// ... 语法创建剩余变量
let [one, ...rest] = [1, 2, 3, 4]
console.log('one => ', one)
console.log('rest => ', rest)

// 对象解构
let o = {
    a: 'foo',
    b: 12,
    c: 'bar'
}
// let {a, ...passthrough} = o
// let total= passthrough.b + passthrough.c.length
// console.log('total => ', total)
// 属性重命名, 这样会和指定类型混淆, 是一种不好的方式
// let {a: newName1, b: newName2} = o

// 对解构属性指定类型
let {a, b}: {a: string, b: number} = o

// 函数中参数的类型是一个对象解构
// b? 中的 ? 表示这个参数是可选
function keepWholeObject(wholeObject: {a: string, b?: string}) {
    let {a, b = 1001} = wholeObject
    console.log('keepWholeObject a => ', a)
    console.log('keepWholeObject b => ', b)
}

// 函数声明中的解构应用
// type c = {a: string, b?: number}
function statement({a, b = 0} = {a: ''}): void {
    console.log('statement a => ', a)
    console.log('statement b => ', b)
}
// 下面两种都可以正常编译和执行
statement({a: 'yes'})
statement()
// 下面这样编译是无法通过, 原因就是在声明参数的时候已经指定 a 是必传参数
// statement({})
