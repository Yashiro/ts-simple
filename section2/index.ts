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
        }, 1000 * j)
    })(i)
}
