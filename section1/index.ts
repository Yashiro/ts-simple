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

