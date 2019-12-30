// 交叉类型
// 就是将多个类型合并为一个类型
// 可以把现有的多种类型叠加在一起成为新的类型
// 多数是在混入或其他不适合典型面向对象模型的地方下使用
// 交叉类型由两个泛型和 & 连接而成
function extend(first, second) {
    // 此处断言为 T & U 类型
    var result = {};
    for (var id in first) {
        // 由于类型不同无法赋值会报错
        // 因此等号右边断言为 any 类型
        result[id] = first[id];
    }
    for (var id in second) {
        if (!result.hasOwnProperty(id)) {
            // 同上操作
            result[id] = second[id];
        }
    }
    return result;
}
// 使用上面的函数
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger() {
    }
    ConsoleLogger.prototype.log = function () {
        // ..
        console.log('ConsoleLogger');
    };
    return ConsoleLogger;
}());
// 此处通过 extend 函数把 Person 和 ConsoleLogger 联合到了一起成为交叉类型
var jim = extend(new Person('jim'), new ConsoleLogger());
console.log('jim => ', jim);
console.log('jim name => ', jim.name);
jim.log();
// 联合类型
// 属于由 | 分割的多个类型之一
function padLeft(value, padding) {
    if (typeof padding === 'number') {
        return Array(padding + 1).join('  ') + value;
    }
    if (typeof padding === 'string') {
        return padding + value;
    }
    throw new Error("Expected string or number got " + padding);
}
console.log('padLeft => ', padLeft('Hello World', 4));
function getSmallPet() {
    // ..
    return;
}
var pet = getSmallPet();
// layEggs 是 Fish 和 Bird 共有的函数可以被 pet 调用
// 而其他独有的函数则不能被 pet 调用
pet.layEggs();
