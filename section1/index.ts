let isDone: boolean = false

// 十进制
let decLiteral: number = 20
// 十六进制
let hexLiteral: number = 0x14
// 二进制
let binaryLiteral: number = 0b10100
// 八进制
let octalLiteral: number = 0o24

// 模版字符串
let username: string = 'Andy'
let age: number = 30
let sentence = `Hello, my name is ${username}
I'll be ${age + 1} year old next month
`

// 数组, 推荐第一种
let list: number[] =[1, 2, 3]
let array: Array<number> = [1, 2, 3]

// 元组 tuple
let x: [string, number]
x = ['hello', 10]
console.log(x[0].substring(1))

enum Color {
    Red = 1,
    Green,
    Blue
}
let colorName: string = Color[2]
console.log(colorName)

// Any 是跳过类型检查，对原先使用 JS 的项目进行重构时用到
let notSure: any = 4
notSure = 'maybe a string instead'
notSure = false

let anyList: any[] = [1, true, 'free']
list[1] = 100

// void 与 any 相反, 不返回任何值
function warnUsre(): void {
    console.log('This is my warning messge')
}
// void 只能赋值 undefined 或 null
let unuseable: void = null || undefined

// undefined || null 这两个都是所有类型的子类型, ts 中子类型可以赋值给父类型
let u: undefined = undefined
// let n: null = undefined

// 做空值检查会报错 tsc index.ts --strictNullChecks
// let num: number = 3
// num = null

// 联合类型, 严格模式不会报错
let numJoint: number | null = 3
numJoint = null

// never 是任何类型的子类型, 用于异常或没有返回值时
function error(message: string): never {
    throw new Error((message))
}
function fail() {
    return error('something failed')
}

// 另一种 never 使用场景
function inifiniteLoop(): never {
    while (true) {

    }
}

// object 类似 Object.create, 不能赋值基础类型
declare function create(o: object | null): void
create({prop: 0})
create(null)

// 类型推断
let someValue: any = 'this is a string'
// 第一种类型转换
let strLenght: number = (<string>someValue).length
// 第二种类型转换, 类型断言, 建议使用这种
let strLenghtAssert: number = (someValue as string).length
