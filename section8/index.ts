// 可以为 null 的类型
// null & undefined 即可做值, 也可作为类型
let s = 'foo'
s = null
let sn: string | null = 'bar'
sn = null

sn = undefined

function f(x: number, y?: number) {
    return x + (y || 0)
}
// tsc index.ts --strictNullChecks
f(1, 2)
f(1)
f(1, undefined)
f(1, null)
// 另一个例子
class C {
    a: number
    b?: number
}
let c = new C()
c.a = 12 // no error
c.a = undefined // error 因为 undefined 不能赋值给基本类型
c.b = 13 // no error
c.b = undefined // no error 因为 b 是可选参数, undefined 可以赋值给可选型和联合类型
c.b = null // error null 不能赋值给 undefined

// null 的类型保护
// function fn(sn: string | null): string {
//     if (sn === null) {
//         return 'default'
//     } else {
//         return sn
//     }
// }
// 上述函数的简写
function fn(sn: string | null) {
    return sn || 'default'
}

// 通过 ! 符合来手动去除 null 和 undefined
// 此处如果使用 strictNullChecks 严格模式会报 Object is possibly 'null'
function broken(name: string | null): string {
    function postfix(epithet: string) {
        // 此处加上类型断言 ! 就不会报 Object is possibly 'null'
        return name!.charAt(0) + '. the ' + epithet
    }
    // || 短路运算符
    name = name || 'Bob'
    return name
}
