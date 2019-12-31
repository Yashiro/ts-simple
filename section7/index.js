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
// pet.layEggs()
// 类型保护
// 如果没有类型保护, 一般通过类型断言来明确类型
// let petTypeProtect = getSmallPet()
// if ((petTypeProtect as Fish).swim) {
//     (petTypeProtect as Fish).swim()
// } else if ((petTypeProtect as Bird).fly) {
//     (petTypeProtect as Bird).fly()
// }
// 类型谓词
// function isFish(petTypeProtect: Fish | Bird): petTypeProtect is Fish {
//     return (petTypeProtect as Fish).swim !== undefined
// }
// if (isFish(petTypeProtect)) {
//     petTypeProtect.swim()
// } else {
//     petTypeProtect.fly()
// }
// 使用类型谓词改写 padLeft 函数
function isNumber(x) {
    return typeof x === 'number';
}
function isString(x) {
    return typeof x === 'string';
}
// function padLeftTypeProtect(value: string, padding: string | number) {
//     if (isNumber(padding)) {
//         return Array(padding + 1).join('  ') + value
//     }
//     if (isString(padding)) {
//         return padding + value
//     }
//     throw new Error(`Expected string or number got ${padding}`)
// }
// 也可使用 type 来判定参数类型来进行类型保, 但只对基础类型有效
function padLeftTypeProtect(value, padding) {
    if (typeof padding === 'number') {
        return Array(padding + 1).join('  ') + value;
    }
    if (typeof padding === 'string') {
        return padding + value;
    }
    throw new Error("Expected string or number got " + padding);
}
console.log('padLeftTypeProtect => ', padLeftTypeProtect('Hello World', 4));
// instance 类型保护
var Tiger = /** @class */ (function () {
    function Tiger() {
    }
    Tiger.prototype.roar = function () {
        console.log('tiger roar');
    };
    Tiger.prototype.sleep = function () {
        console.log('tiger sleep');
    };
    return Tiger;
}());
var Sheep = /** @class */ (function () {
    function Sheep() {
    }
    Sheep.prototype.bleat = function () {
        console.log('sheep bleat');
    };
    Sheep.prototype.sleep = function () {
        console.log('sheep  sleep');
    };
    return Sheep;
}());
function getRandomPet() {
    return Math.random() > 0.5 ? new Tiger() : new Sheep();
}
var petInstanceProtect = getRandomPet();
if (petInstanceProtect instanceof Tiger) {
    petInstanceProtect.roar();
}
if (petInstanceProtect instanceof Sheep) {
    petInstanceProtect.bleat();
}
