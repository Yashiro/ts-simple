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
// 泛型
// T 类型变量, 只用来表示类型而不是值, 用来捕获传入类型
// 泛型函数
function identity(arg) {
    return arg;
}
// 当 tsc 编译器无法推断出类型时应使用此方式
var output1 = identity('myString1');
// 类型推断方式, 一般情况下推荐此种方式
var output2 = identity('myString2');
// 泛型变量的使用
// 此处函数接收两个参数, 一个是类型参数 T, 另一个是参数 arg 且返回类型是 T 的数组
function loggingIdentity(arg) {
    console.log(arg.length);
    return arg;
}
// 泛型类型的使用
function identityType(arg) {
    return arg;
}
// 泛型函数类型
var myIdentityType = identityType;
// 调用签名的字面量, 可改用如下泛型接口方式
var myIdentitySign = identityType;
var myGenericIdentityFn = identityType;
var myGenericIdentityFnType = identityType;
// 泛型类
// 泛型类只能是类的实例部分, 不能有静态部分
var GenericNumber = /** @class */ (function () {
    function GenericNumber() {
    }
    return GenericNumber;
}());
var myGenericNumber = new GenericNumber();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
    return x + y;
};
console.log('myGenericNumber => ', myGenericNumber.add(myGenericNumber.zeroValue, 9));
var stringNumberic = new GenericNumber();
stringNumberic.zeroValue = '';
stringNumberic.add = function (x, y) {
    return x + y;
};
console.log('stringNumberic => ', stringNumberic.add(stringNumberic.zeroValue, 'Hello Generic'));
function genericConstraint(arg) {
    console.log(arg.length);
    return arg;
}
// 通过 keyof 使 K 作为 T 属性存在
function getProperty(obj, key) {
    return obj[key];
}
var x = { a: 1, b: 2, c: 3, d: 4 };
console.log('getProperty => ', getProperty(x, 'a'));
// 由于 getProperty 中的泛型 K 已经被约束是必须是 T 中存在的属性
// 而 m 不是 x 的属性, 因此会报错
// getProperty(x, 'm')
// 泛型中创建类类型在工厂函数中的应用
function create(c) {
    return new c();
}
// 此处只是例子可以编译通过
// 但由于属性都没有赋值, 运行时会报 undefined
var BeeKeeper = /** @class */ (function () {
    function BeeKeeper() {
    }
    return BeeKeeper;
}());
var LionKeeper = /** @class */ (function () {
    function LionKeeper() {
    }
    return LionKeeper;
}());
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var Bee = /** @class */ (function (_super) {
    __extends(Bee, _super);
    function Bee() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Bee;
}(Animal));
var Lion = /** @class */ (function (_super) {
    __extends(Lion, _super);
    function Lion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Lion;
}(Animal));
function createInstance(c) {
    return new c();
}
// createInstance(Lion).keeper.nameTag
// createInstance(Bee).keeper.hasMoak
// 类型推断
// 最佳通用类型
var Animals = /** @class */ (function () {
    function Animals() {
    }
    return Animals;
}());
var Tiger = /** @class */ (function (_super) {
    __extends(Tiger, _super);
    function Tiger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Tiger;
}(Animals));
var Sheep = /** @class */ (function (_super) {
    __extends(Sheep, _super);
    function Sheep() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Sheep;
}(Animals));
var zooNoType = [new Tiger(), new Sheep()];
console.log('zoo no type => ', zooNoType);
var zoo = [new Tiger(), new Sheep()];
console.log('zoo => ', zoo);
// 上下文类型
// tsc 类型检查器会根据等式左边的类型来推断右边的类型是否匹配
// 因此 mouseEvent 不明确 any 类型而调用 clickTime 属性是会报错
// window.onmousedown = function (mouseEvent: any) {
//     console.log(mouseEvent.clickTime)
// }
// 上下文类型选出 Animals[] 为最佳通用类型
function createZoo() {
    return [new Tiger(), new Sheep()];
}
