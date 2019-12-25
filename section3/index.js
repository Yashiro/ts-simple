var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// ts 中的接口与其他语言的接口不同, 不需要实现而只要与接口型似即可
// 即所谓的鸭式辨型法
function printLabel(labelLedObj) {
    console.log(labelLedObj.label);
}
var myObj = { size: 10, label: 'Size 10 Object' };
printLabel(myObj);
function createSquare(config) {
    var newSquare = { color: 'white', area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area - config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({ color: 'black' });
console.log('mySquare => ', mySquare);
// 只能通过创建对象字面量初始化
var p1 = { x: 10, y: 20 };
// p1.x = 30 静态检查报错只读属性不能修改
console.log('p1 => ', p1);
// 泛型只读数组
var a = [1, 2, 3, 4];
// 整个 ro 数组都是只读
var ro = a;
var ro1 = [];
// ro[0] = 12 静态检查报错只读属性不能修改
// ro.push push 也是不可以的
// a = ro 也不能把只读数组赋值给其他变量
// 但可采用类型断言赋值回 a
a = ro;
console.log('ro => ', ro);
// 只读的可以赋值给只读的
ro1 = ro;
console.log('ro1 => ', ro1);
function createCircle(config) {
    var newCircle = { color: 'black', area: 100 };
    if (config.color)
        newCircle.color = config.color;
    if (config.radius) {
        newCircle.area = config.radius * config.pi;
    }
    return newCircle;
}
console.log(createCircle({ color: 'gray', radius: 9, pi: 3.14 }));
// 如在下面传入一个没有定义的属性是可以编译通过的
console.log(createCircle({ color: 'gray', radius: 9, pi: 3.14, defaultArea: 300 }));
var mySearch;
// 实现函数类型接口
// 只要保持参数列表个数和类型以及返回类型与接口定义一致即可
mySearch = function (src, sub) {
    var result = src.search(sub);
    return result > -1;
};
// 也可做如下的类型推断方式的写法
mySearch = function (src, sub) {
    var result = src.search(sub);
    return result > -1;
};
// 赋值索引类型变量
var myArray;
myArray = ['Bob', 'Fred'];
// 此处使用 number 类型的索引会得到一个 string 类型的返回值
var myStr = myArray[0];
console.log('myStr => ', myStr);
// 数字签名和字符串签名兼容方式
// 规则是数字索引返回值必须是字符串索引返回值的子集
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Dog;
}(Animal));
var readonlyArray = ['Alice', 'Bob'];
// 类包含两种类型: 静态类型、实例类型
// 此时如果实现构造器的接口时会报错
// 因为 ts 只对类的实例部分检查而不会对静态部分进行检查
var Clock = /** @class */ (function () {
    // 此处的构造器就是静态类型
    function Clock(h, m) {
    }
    Clock.prototype.setTime = function (d) {
        this.currentTime = d;
    };
    return Clock;
}());
// 工厂方法
function createClock(clockConstructorAgain, hour, minute) {
    return new clockConstructorAgain(hour, minute);
}
var DigitalClock = /** @class */ (function () {
    function DigitalClock(h, m) {
    }
    DigitalClock.prototype.tick = function () {
        console.log('beep beep');
    };
    return DigitalClock;
}());
var AnalogClock = /** @class */ (function () {
    function AnalogClock(h, m) {
    }
    AnalogClock.prototype.tick = function () {
        console.log('tick toc');
    };
    return AnalogClock;
}());
var digital = createClock(DigitalClock, 12, 17);
var anallog = createClock(AnalogClock, 7, 32);
digital.tick();
anallog.tick();
