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
