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
