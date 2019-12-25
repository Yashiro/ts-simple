var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
// 闭包
function f() {
    var a = 10;
    return function g() {
        var b = a + 1;
        return b;
    };
}
var g = f();
console.log(g());
// var 有一个潜规则，变量声明会提前，即所谓变量提升
// 即 f1 函数体内等同于如下
// var x
// if (shouldInitialize) {
//     x = 10
// }
function f1(shouldInitialize) {
    if (shouldInitialize) {
        var x = 10;
    }
    return x;
}
console.log(f1(true)); // 10
console.log(f1(false)); // undefined
// 矩阵运算
function sumMatrix(matrix) {
    var sum = 0;
    for (var i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        // 此处如果仍就 var 定义变量名 i 会把外层的 var i 覆盖; 因此要改变量名为 j
        for (var j = 0; j < currentRow.length; j++) {
            sum += currentRow[j];
        }
    }
    return sum;
}
var matrix = [
    [1, 2, 3],
    [4, 5, 6]
];
// 如果内层循环 var 不改为 j，则结果不会为正确的 21 而是 6;
// 因为 i 变量一样都累加到 3 跳出整个循环体
console.log(sumMatrix(matrix));
// 如果把输出放在定时器中结果为十个 10 而不是预期的 0 - 9;
// 可以使用立即执行表达式来解决; 作用是每次把传入立即执行函数的参数在末尾缓存下来
for (var i = 0; i < 10; i++) {
    // 此处相当于闭包, 每次外层循环的 i 的值赋给 j 然后输出
    (function (j) {
        setTimeout(function () {
            console.log(j);
        }, 100 * j);
    })(i);
}
// let 有块级作用域概念、在同一块中不可重复声明
// 屏蔽功能
function sumMatrixByLet(matrix) {
    var sum = 0;
    for (var i_1 = 0; i_1 < matrix.length; i_1++) {
        var currentRow = matrix[i_1];
        for (var i_2 = 0; i_2 < currentRow.length; i_2++) {
            sum += currentRow[i_2];
        }
    }
    return sum;
}
var matrixByLet = [
    [1, 2, 3],
    [4, 5, 6]
];
console.log('let =>', sumMatrixByLet(matrixByLet));
var _loop_1 = function (i_3) {
    setTimeout(function () {
        console.log("let " + i_3 + " => ", i_3);
    }, 100 * i_3);
};
// let 块级作用域创建新的变量环境; 在每次迭代时能创建新的作用域
for (var i_3 = 0; i_3 < 10; i_3++) {
    _loop_1(i_3);
}
// const 与 let 用法一样
// 区别就是不能对 const 声明的常量重新赋值, 但可以对其中的属性重新赋值
// 除要对引用的变量值进行改变的，都应该使用 const
var numLivesForCat = 9;
var kitty = {
    name: 'Kitty',
    numLives: numLivesForCat
};
kitty.name = 'Jerry';
kitty.numLives--;
// 解构
// 数组解构
var input = [1, 2];
var first = input[0], second = input[1];
// 函数参数解构
function unstructure(_a) {
    var first = _a[0], second = _a[1];
    console.log('unstructure => ', first);
    console.log('unstructure => ', second);
}
unstructure(input);
// ... 语法创建剩余变量
var _a = [1, 2, 3, 4], one = _a[0], rest = _a.slice(1);
console.log('one => ', one);
console.log('rest => ', rest);
// 对象解构
var o = {
    a: 'foo',
    b: 12,
    c: 'bar'
};
// let {a, ...passthrough} = o
// let total= passthrough.b + passthrough.c.length
// console.log('total => ', total)
// 属性重命名, 这样会和指定类型混淆, 是一种不好的方式
// let {a: newName1, b: newName2} = o
// 对解构属性指定类型
var a = o.a, b = o.b;
// 函数中参数的类型是一个对象解构
// b? 中的 ? 表示这个参数是可选
function keepWholeObject(wholeObject) {
    var a = wholeObject.a, _a = wholeObject.b, b = _a === void 0 ? 1001 : _a;
    console.log('keepWholeObject a => ', a);
    console.log('keepWholeObject b => ', b);
}
// 函数声明中的解构应用
// type c = {a: string, b?: number}
function statement(_a) {
    var _b = _a === void 0 ? { a: '' } : _a, a = _b.a, _c = _b.b, b = _c === void 0 ? 0 : _c;
    console.log('statement a => ', a);
    console.log('statement b => ', b);
}
// 下面两种都可以正常编译和执行
statement({ a: 'yes' });
statement();
// 下面这样编译是无法通过, 原因就是在声明参数的时候已经指定 a 是必传参数
// statement({})
// 展开
// 数组展开, 整个过程是浅拷贝, 对 bothPlug 数组的修改不会影响原始数组
var chapter1 = [1, 2];
var chapter2 = [3, 4];
var bothPlug = __spreadArrays([0], chapter1, chapter2, [5]);
console.log('bothPlug => ', bothPlug);
// 对象展开
var defaults = {
    food: 'spicy',
    price: '$10',
    ambiance: 'noisy'
};
// 这里会把原来 food 键值覆盖, 原则是后面的覆盖前面的
var search = __assign(__assign({}, defaults), { food: 'rich' });
console.log('search => ', search);
