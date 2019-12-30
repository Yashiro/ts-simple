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
// 函数
// 命名函数
function add(x, y) {
    return x + y;
}
// 匿名函数
var myAdd = function (x, y) {
    return x + y;
};
// 通过作用域规则, 函数内部得外部变量
var z = 100;
function addToZ(x, y) {
    return x + y + z;
}
// 函数添加类型
function addByType(x, y) {
    return x + y;
}
// 书写完整函数类型
// 函数参数类型匹配, 参数名可以不一样
// ts 提供类型推断, 即函数等式两边只要有一边声明类型即可
var myAddByType = function (x, y) {
    return x + y;
};
// 可选参数, 添加 ？ 符合来使得参数非必传
// 注意 ? 位置, 另外可选参数必须在必传参数的后面
function buildNameOption(firstName, lastName) {
    if (lastName) {
        return firstName + ' ' + lastName;
    }
    else {
        return firstName;
    }
}
var result1 = buildNameOption('Bob');
console.log('buildNameOption', result1);
// 默认参数
function buildNameDefault(firstName, lastName) {
    if (firstName === void 0) { firstName = 'Will'; }
    return firstName + ' ' + lastName;
}
var result2 = buildNameDefault(undefined, 'Bob');
console.log('buildNameDefault', result2);
// 剩余参数
function buildNameRemain(firstName) {
    var restOfName = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restOfName[_i - 1] = arguments[_i];
    }
    return firstName + ' ' + JSON.stringify(restOfName);
}
var buildNameFn = buildNameRemain;
var result3 = buildNameFn('Bob', 'Adams', 'Will');
console.log('buildNameRemain', result3);
// this 是来自对象字面量的函数表达式
// TypeScript 可以提示错误使用 this 的地方
// 在 JavaScript 中会在函数调用时指定 this 的值, 但要弄清函数调用的上下文
// 下面代码在编译时不会报错, 但在执行时会报 Cannot read property '2' of undefined
// 原因是执行 cardPicker() 时调用的上下文是全局的 global, 此时 this 指向就是 global
// 因此 this.suits 是 undefined
// 使用 ES6 箭头函数语法可以解决, 原因是箭头函数保存的是函数创建时的 this 值
var deck = {
    suits: ['hearts', 'spades', 'clubs', 'diamonds'],
    cards: Array(52),
    createCardPicker: function () {
        var _this = this;
        // return function () {
        return function () {
            var pickedCard = Math.floor(Math.random() * 52);
            // 随机的扑克牌索引
            var pickedSuits = Math.floor(pickedCard / 13);
            return {
                // 通过索引得到扑克牌
                suit: _this.suits[pickedSuits],
                // 得到扑克牌的点数
                card: pickedCard % 13
            };
        };
    }
};
var cardPicker = deck.createCardPicker();
var pickedCard = cardPicker();
console.log('card => ', pickedCard.card);
var deckRefactor = {
    suits: ['hearts', 'spades', 'clubs', 'diamonds'],
    cards: Array(52),
    // 把 this 显示的指向 Deck 接口
    createCardPicker: function () {
        var _this = this;
        // return function () {
        return function () {
            var pickedCard = Math.floor(Math.random() * 52);
            // 随机的扑克牌索引
            var pickedSuits = Math.floor(pickedCard / 13);
            return {
                // 通过索引得到扑克牌
                // 这样就不会出现 this.suits.s 而编译不报错了
                suit: _this.suits[pickedSuits],
                // 得到扑克牌的点数
                card: pickedCard % 13
            };
        };
    }
};
var cardPickerRefactor = deckRefactor.createCardPicker();
var pickedCardRefactor = cardPickerRefactor();
console.log('card refactor => ', pickedCardRefactor.card);
var Handler = /** @class */ (function () {
    function Handler() {
        var _this = this;
        // 此处要使用箭头函数, 才能和 UIElement 的 addClickListener 中的参数类型匹配
        // onClickBad = function(this: Handler, e: Event) {}
        this.onClickBad = function (e) {
            _this.type = e.type;
        };
    }
    return Handler;
}());
var h = new Handler();
var uiElement = {
    addClickListener: function () {
    }
};
uiElement.addClickListener(h.onClickBad);
// 函数重载
var suits = ['hearts', 'spades', 'clubs', 'diamonds'];
function pickCard(x) {
    if (Array.isArray(x)) {
        var pickedCard_1 = Math.floor(Math.random() * x.length);
        return pickedCard_1;
    }
    else if (typeof x === 'number') {
        var pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}
var myDeck = [
    { suit: 'diamonds', card: 2 },
    { suit: 'spades', card: 10 },
    { suit: 'hearts', card: 4 }
];
var pickedCard1 = myDeck[pickCard(myDeck)];
console.log('card: ' + pickedCard1.card + ' of ' + pickedCard1.suit);
var pickedCard2 = pickCard(15);
console.log('card: ' + pickedCard2.card + ' of ' + pickedCard2.suit);
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
createInstance(Lion).keeper.nameTag;
createInstance(Bee).keeper.hasMoak;
