var isDone = false;
// 十进制
var decLiteral = 20;
// 十六进制
var hexLiteral = 0x14;
// 二进制
var binaryLiteral = 20;
// 八进制
var octalLiteral = 20;
// 模版字符串
var username = 'Andy';
var age = 30;
var sentence = "Hello, my name is " + username + "\nI'll be " + (age + 1) + " year old next month\n";
// 数组, 推荐第一种
var list = [1, 2, 3];
var array = [1, 2, 3];
// 元组 tuple
var x;
x = ['hello', 10];
console.log(x[0].substring(1));
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
var colorName = Color[2];
console.log(colorName);
// Any 是跳过类型检查，对原先使用 JS 的项目进行重构时用到
var notSure = 4;
notSure = 'maybe a string instead';
notSure = false;
var anyList = [1, true, 'free'];
list[1] = 100;
// void 与 any 相反, 不返回任何值
function warnUsre() {
    console.log('This is my warning messge');
}
// void 只能赋值 undefined 或 null
var unuseable = null || undefined;
// undefined || null 这两个都是所有类型的子类型, ts 中子类型可以赋值给父类型
var u = undefined;
// let n: null = undefined
// 做空值检查会报错 tsc index.ts --strictNullChecks
// let num: number = 3
// num = null
// 联合类型
var numJoint = 3;
numJoint = null;
