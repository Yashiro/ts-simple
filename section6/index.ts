// 泛型
// T 类型变量, 只用来表示类型而不是值, 用来捕获传入类型
// 泛型函数
function identity<T>(arg: T): T {
    return arg
}
// 当 tsc 编译器无法推断出类型时应使用此方式
let output1 = identity<String>('myString1')
// 类型推断方式, 一般情况下推荐此种方式
let output2 = identity('myString2')

// 泛型变量的使用
// 此处函数接收两个参数, 一个是类型参数 T, 另一个是参数 arg 且返回类型是 T 的数组
function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length)
    return arg
}

// 泛型类型的使用
function identityType<T>(arg: T): T {
    return arg
}
// 泛型函数类型
let myIdentityType: <T>(arg: T) => T = identityType

// 调用签名的字面量, 可改用如下泛型接口方式
let myIdentitySign: { <T>(arg: T): T } = identityType
// 泛型接口
interface GenericIdentityFn {
    <T>(arg: T): T
}
let myGenericIdentityFn: GenericIdentityFn = identityType
// 上述方式更推荐改为如下方式
interface GenericIdentityFnType<T> {
    (arg: T): T
}
let myGenericIdentityFnType: GenericIdentityFnType<number> = identityType

// 泛型类
// 泛型类只能是类的实例部分, 不能有静态部分
class GenericNumber<T> {
    zeroValue: T
    add: (x: T, y: T) => T
}
let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function (x, y) {
    return x + y
}
console.log('myGenericNumber => ', myGenericNumber.add(myGenericNumber.zeroValue, 9))

let stringNumberic = new GenericNumber<string>()
stringNumberic.zeroValue = ''
stringNumberic.add = function (x, y) {
    return x + y
}
console.log('stringNumberic => ', stringNumberic.add(stringNumberic.zeroValue, 'Hello Generic'))

// 泛型约束
interface Lengthwise {
    length: number
}
function genericConstraint<T extends Lengthwise>(arg: T): T {
    console.log(arg.length)
    return arg
}
// 通过 keyof 使 K 作为 T 属性存在
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key]
}
let x = { a: 1, b: 2, c: 3, d: 4 }
console.log('getProperty => ', getProperty(x, 'a'))
// 由于 getProperty 中的泛型 K 已经被约束是必须是 T 中存在的属性
// 而 m 不是 x 的属性, 因此会报错
// getProperty(x, 'm')

// 泛型中创建类类型在工厂函数中的应用
function create<T>(c: { new(): T }): T {
    return new c()
}
// 此处只是例子可以编译通过
// 但由于属性都没有赋值, 运行时会报 undefined
class BeeKeeper {
    hasMoak: boolean
}

class LionKeeper {
    nameTag: string
}

class Animal {
    numLegs: number
}

class Bee extends Animal {
    keeper: BeeKeeper
}

class Lion extends Animal {
    keeper: LionKeeper
}

function createInstance<T extends Animal>(c: new() => T): T {
    return new c()
}
// createInstance(Lion).keeper.nameTag
// createInstance(Bee).keeper.hasMoak

// 类型推断
// 最佳通用类型
class Animals {
    numLegs: number
}
class Tiger extends Animals {

}
class Sheep extends Animals {

}
let zooNoType = [new Tiger(), new Sheep()]
console.log('zoo no type => ', zooNoType)
let zoo: Animals[] = [new Tiger(), new Sheep()]
console.log('zoo => ', zoo)

// 上下文类型
// tsc 类型检查器会根据等式左边的类型来推断右边的类型是否匹配
// 因此 mouseEvent 不明确 any 类型而调用 clickTime 属性是会报错
// window.onmousedown = function (mouseEvent: any) {
//     console.log(mouseEvent.clickTime)
// }

// 上下文类型选出 Animals[] 为最佳通用类型
function createZoo(): Animals[] {
    return [new Tiger(), new Sheep()]
}
