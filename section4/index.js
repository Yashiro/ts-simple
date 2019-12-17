var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return 'Hello, ' + this.greeting;
    };
    return Greeter;
}());
var greeter = new Greeter('World');
console.log(greeter.greet());
// 类继承
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.move = function (distance) {
        if (distance === void 0) { distance = 0; }
        console.log(this.name + " moved " + distance + " m");
    };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.bark = function () {
        console.log('Woof! Woof!');
    };
    return Dog;
}(Animal));
var dog = new Dog('Black Dog');
dog.bark();
dog.move(10);
// 子类继承父类调用父类方法
var Bear = /** @class */ (function (_super) {
    __extends(Bear, _super);
    function Bear(name) {
        // super 必须在当前类成员变量之前
        return _super.call(this, name) || this;
    }
    // 重写父类 move 方法
    Bear.prototype.move = function (distance) {
        if (distance === void 0) { distance = 25; }
        console.log('Running...');
        _super.prototype.move.call(this, distance);
    };
    return Bear;
}(Animal));
var Horse = /** @class */ (function (_super) {
    __extends(Horse, _super);
    function Horse(name) {
        return _super.call(this, name) || this;
    }
    Horse.prototype.move = function (distance) {
        if (distance === void 0) { distance = 45; }
        console.log('Galloping...');
        _super.prototype.move.call(this, distance);
    };
    return Horse;
}(Animal));
var white = new Bear('White');
var tom = new Horse('Tom');
white.move();
tom.move();
// private 私有修饰符
// protected 受保护修饰符
var Person = /** @class */ (function () {
    // 父类的构造器设为 protected 可以防止父类被实例化
    // 但不影响子类的构造器 super 调用
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    function Employee(name, department) {
        var _this = _super.call(this, name) || this;
        _this.department = department;
        return _this;
    }
    Employee.prototype.getElevatorPitch = function () {
        // 如果父类 Person 的属性 name 是 private 的话, this.name 会报错
        return "Hello, my name is " + this.name + " and I work in " + this.department;
    };
    return Employee;
}(Person));
var howard = new Employee('Howard', 'Sales');
console.log(howard.getElevatorPitch());
// 类的只读属性 & 参数属性
var Human = /** @class */ (function () {
    // readonly name: string
    //
    // constructor(name: string) {
    //     this.name = name
    // }
    // 所谓参数属性就是对构造器参数添加一个访问限定符
    // 例如 readonly、private、protected
    // 在工程项目中不建议使用参数属性, 而是像上方注释的声明属性前加访问限定符
    function Human(name) {
        this.name = name;
        this.name = name;
    }
    return Human;
}());
// readonly 可在类构造器初始化赋值一次
// 之后再对类属性赋值会报错
var john = new Human('John');
console.log(john);
// 存取器
// 此处编译要使用 tsc index.ts --target es5
// vue 也是使用 Object.defineProperty 对象劫持
var password = 'pwd';
var Staff = /** @class */ (function () {
    function Staff() {
    }
    Object.defineProperty(Staff.prototype, "fullName", {
        get: function () {
            return this._fullName;
        },
        set: function (newName) {
            if (password && password === 'pwd') {
                this._fullName = newName;
            }
            else {
                console.log('Error: Unauthorized update of staff');
            }
        },
        enumerable: true,
        configurable: true
    });
    return Staff;
}());
var staff = new Staff();
staff.fullName = 'Bob Smith';
if (staff.fullName) {
    console.log(staff.fullName);
}
// 静态属性
var Grid = /** @class */ (function () {
    function Grid(scale) {
        this.scale = scale;
    }
    Grid.prototype.calculateDistanceFromOrigin = function (point) {
        var xDist = point.x - Grid.origin.x;
        var yDist = point.y - Grid.origin.y;
        // 勾股定理计算距离
        return Math.sqrt(xDist * xDist + yDist * yDist) * this.scale;
    };
    Grid.origin = { x: 0, y: 0 };
    return Grid;
}());
var grid1 = new Grid(1.0);
var grid2 = new Grid(5.0);
console.log(grid1.calculateDistanceFromOrigin({ x: 3, y: 4 }));
console.log(grid2.calculateDistanceFromOrigin({ x: 3, y: 4 }));
