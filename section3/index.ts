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
