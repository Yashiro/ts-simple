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
const  dog = new Dog('Black Dog')
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
