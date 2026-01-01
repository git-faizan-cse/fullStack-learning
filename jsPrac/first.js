class Animal {
    constructor() {
        console.log('Animal constructor executed');

    }
}


class Dog extends Animal {
    constructor() {
        super();
        console.log('Dog constructor executed');
    }
}

const myDog = new Dog();d