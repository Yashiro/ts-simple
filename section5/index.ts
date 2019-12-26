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

// this 是来自对象字面量的函数表达式
// TypeScript 可以提示错误使用 this 的地方
// 在 JavaScript 中会在函数调用时指定 this 的值, 但要弄清函数调用的上下文
// 下面代码在编译时不会报错, 但在执行时会报 Cannot read property '2' of undefined
// 原因是执行 cardPicker() 时调用的上下文是全局的 global, 此时 this 指向就是 global
// 因此 this.suits 是 undefined
// 使用 ES6 箭头函数语法可以解决, 原因是箭头函数保存的是函数创建时的 this 值
let deck = {
    suits: ['hearts', 'spades', 'clubs', 'diamonds'],
    cards: Array(52),
    createCardPicker: function () {
        // return function () {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52)
            // 随机的扑克牌索引
            let pickedSuits = Math.floor(pickedCard / 13)

            return {
                // 通过索引得到扑克牌
                suit: this.suits[pickedSuits],
                // 得到扑克牌的点数
                card: pickedCard % 13
            }
        }
    }
}
let cardPicker = deck.createCardPicker()
let pickedCard = cardPicker()
console.log('card => ', pickedCard.card)

// 使用 function (this: void) 重构 deck
interface Card {
    suit: string
    card: number
}
interface Deck {
    suits: string[]
    cards: number[]

    createCardPicker(this: Deck): () => Card
}
let deckRefactor: Deck = {
    suits: ['hearts', 'spades', 'clubs', 'diamonds'],
    cards: Array(52),
    // 把 this 显示的指向 Deck 接口
    createCardPicker: function (this: Deck) {
        // return function () {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52)
            // 随机的扑克牌索引
            let pickedSuits = Math.floor(pickedCard / 13)

            return {
                // 通过索引得到扑克牌
                // 这样就不会出现 this.suits.s 而编译不报错了
                suit: this.suits[pickedSuits],
                // 得到扑克牌的点数
                card: pickedCard % 13
            }
        }
    }
}
let cardPickerRefactor = deckRefactor.createCardPicker()
let pickedCardRefactor = cardPickerRefactor()
console.log('card refactor => ', pickedCardRefactor.card)

// this 参数在回调函数中
interface UIElement {
    addClickListener(onclick: (this: void, e: Event) => void ): void
}
class Handler {
    type: string

    onClickBad = (e: Event) => {
        this.type = e.type
    }
}
let h = new Handler()
let uiElement: UIElement = {
    addClickListener() {
    }
}
uiElement.addClickListener(h.onClickBad)

// 函数重载
let suits = ['hearts', 'spades', 'clubs', 'diamonds']

// 使用函数重载来做约束输入的参数类型条件
function pickCard(x: { suit: string, card: number }[]): number
function pickCard(x: number): { suit: string, card: number }

function pickCard(x): any {
    if (Array.isArray(x)) {
        let pickedCard = Math.floor(Math.random() * x.length)
        return pickedCard
    } else if (typeof x === 'number') {
        let pickedSuit = Math.floor(x / 13)
        return { suit: suits[pickedSuit], card: x % 13 }
    }
}

let myDeck = [
    { suit: 'diamonds', card: 2},
    { suit: 'spades', card: 10},
    { suit: 'hearts', card: 4}
]
let pickedCard1 = myDeck[pickCard(myDeck)]
console.log('card: ' + pickedCard1.card + ' of ' + pickedCard1.suit)

let pickedCard2 = pickCard(15)
console.log('card: ' + pickedCard2.card + ' of ' + pickedCard2.suit)
