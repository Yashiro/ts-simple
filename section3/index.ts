// 定义接口
interface LabelLedValue {
    label: string
}
// ts 中的接口与其他语言的接口不同, 不需要实现而只要与接口型似即可
// 即所谓的鸭式辨型法
function printLabel(labelLedObj: LabelLedValue  ) {
    console.log(labelLedObj.label)
}
let myObj = { size: 10, label: 'Size 10 Object' }
printLabel(myObj)

// 可选属性
interface square {
    color: string,
    area: number
}
// ? 表示属性可选
// 好处1 可以对可能存在的属性预定义
// 好处2 可以捕获一个不存在的属性的错误
interface squareConfig {
    color?: string,
    width?: number
}

function createSquare(config: squareConfig): square {
    let newSquare = { color: 'white', area: 100 }
    if (config.color) {
        newSquare.color = config.color
    }
    if (config.width) {
        newSquare.area - config.width * config.width
    }
    return newSquare
}
let mySquare = createSquare({ color: 'black' })
console.log('mySquare => ', mySquare)

// 只读属性
interface Point {
    readonly x: number,
    readonly y: number
}
// 只能通过创建对象字面量初始化
let p1: Point = { x: 10, y: 20}
// p1.x = 30 静态检查报错只读属性不能修改
console.log('p1 => ', p1)

// 泛型只读数组
let a: number[] = [1, 2, 3 ,4]
// 整个 ro 数组都是只读
let ro: ReadonlyArray<number> = a
let ro1: ReadonlyArray<number> = []
// ro[0] = 12 静态检查报错只读属性不能修改
// ro.push push 也是不可以的
// a = ro 也不能把只读数组赋值给其他变量
// 但可采用类型断言赋值回 a
a = ro as number[]
console.log('ro => ', ro)
// 只读的可以赋值给只读的
ro1 = ro
console.log('ro1 => ', ro1)
// 判定是使用 const 还是使用 readonly 的依据主要是看是变量还是属性

// 额外属性检查
interface Circle {
    color: string
    area: number
}
interface  CircleConfig{
    color?: string,
    radius?: number,
    pi?: number
    // 索引签名(任意类型)
    [propName: string]: any
}
function createCircle(config: CircleConfig): Circle {
    let newCircle = { color: 'black', area: 100 }
    if (config.color) newCircle.color = config.color
    if (config.radius) {
        newCircle.area = config.radius * config.pi
    }
    return newCircle
}
console.log(createCircle({color : 'gray', radius: 9, pi: 3.14}))
// 如在下面传入一个没有定义的属性是可以编译通过的
console.log(createCircle({color : 'gray', radius: 9, pi: 3.14, defaultArea: 300}))

// 函数类型
// 函数类型接口
interface SearchFunc {
    // 定义一个函数调用签名
    // 只有参数列表和返回值类型的函数定义
    (source: string, subString: string): boolean
}
let mySearch: SearchFunc
// 实现函数类型接口
// 只要保持参数列表个数和类型以及返回类型与接口定义一致即可
mySearch = function (src: string, sub: string): boolean {
    let result = src.search(sub)
    return result > -1
}
// 也可做如下的类型推断方式的写法
mySearch = function (src, sub) {
    let result = src.search(sub)
    return result > -1
}

// 可索引的类型
// 数字签名
interface StringArray {
    // 索引签名
    [index: number]: string
}
// 赋值索引类型变量
let myArray: StringArray
myArray = ['Bob', 'Fred']
// 此处使用 number 类型的索引会得到一个 string 类型的返回值
let myStr: string = myArray[0]
console.log('myStr => ', myStr)

// 数字签名和字符串签名兼容方式
// 规则是数字索引返回值必须是字符串索引返回值的子集
class Animal {
    name: string
}
class Dog extends Animal{
    bread: string
}
interface NotOkay {
    // 注意子类型定义要在父类型之前
    [x: number]: Dog
    [x: string]: Animal
}

// 另一个例子
interface NumberDictionary {
    [index: string]: number
    // 这种类型定义是正确, 与上面的索引签名匹配
    length: number
    // 下面这种静态检查就会报类型不匹配
    // name: string
}

// 再举一个例子
interface ReadonlyStringArray {
    readonly [index: number]: string
}
let readonlyArray: ReadonlyStringArray = ['Alice', 'Bob']
// 如之后再赋值就会报错
