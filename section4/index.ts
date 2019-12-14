class Greeter {
    greeting: string

    constructor(message: string) {
        this.greeting = message
    }

    greet() {
        return 'Hello, ' + this.greeting
    }
}

let greeter = new Greeter('World')
console.log(greeter.greet())

// 类继承
class Animal {
    name: string

    constructor(name: string) {
        this.name = name
    }

    move(distance: number = 0) {
        console.log(`${this.name} moved ${distance} m`)
    }
}
class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!')
    }
}
const dog = new Dog('Black Dog')
dog.bark()
dog.move(10)

// 子类继承父类调用父类方法
class Bear extends Animal {
    constructor(name: string) {
        // super 必须在当前类成员变量之前
        super(name)
    }
    // 重写父类 move 方法
    move(distance: number = 25) {
        console.log('Running...')
        super.move(distance);
    }
}
class Horse extends Animal {
    constructor(name: string) {
        super(name)
    }
    move(distance: number = 45) {
        console.log('Galloping...')
        super.move(distance);
    }
}
let white = new Bear('White')
let tom: Animal = new Horse('Tom')
white.move()
tom.move()

// private 私有修饰符
// protected 受保护修饰符
class Person {
    protected name: string

    // 父类的构造器设为 protected 可以防止父类被实例化
    // 但不影响子类的构造器 super 调用
    protected constructor(name: string) {
        this.name = name
    }
}
class Employee extends Person {
    private department: string

    constructor(name: string, department: string) {
        super(name)
        this.department = department
    }

    getElevatorPitch() {
        // 如果父类 Person 的属性 name 是 private 的话, this.name 会报错
        return `Hello, my name is ${this.name} and I work in ${this.department}`
    }

}
let howard = new Employee('Howard', 'Sales')
console.log(howard.getElevatorPitch())

// 类的只读属性 & 参数属性
class Human {
    // readonly name: string
    //
    // constructor(name: string) {
    //     this.name = name
    // }

    // 所谓参数属性就是对构造器参数添加一个访问限定符
    // 例如 readonly、private、protected
    // 在工程项目中不建议使用参数属性, 而是像上方注释的声明属性前加访问限定符
    constructor(readonly name: string) {
        this.name = name
    }

}
// readonly 可在类构造器初始化赋值一次
// 之后再对类属性赋值会报错
let john = new Human('John')
console.log(john)