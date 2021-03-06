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
