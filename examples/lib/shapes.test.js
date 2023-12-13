const { Circle, Square, Triangle } = require("./shapes")

describe ('circle', () => {
    test('renders blue circle', () => {
        const shape = new Circle
        let colour = ('blue')
        shape.setColour(colour)
        expect(shape.render()).toEqual(`<circle cx="50%" cy="50%" r="100" height="100%" width="100%" fill="${colour}"/>`)
    })
})

describe ('square', () => {
    test('renders yellow square', () => {
        const shape = new Square
        let colour = ('yellow')
        shape.setColour(colour)
        expect(shape.render()).toEqual(`<rect x="50" height="200" width="200" fill="${colour}"/>`)
    })
})

describe ('triangle', () => {
    test('renders green triangle', () => {
        const shape = new Triangle
        let colour = ('green')
        shape.setColour(colour)
        expect(shape.render()).toEqual(`<polygon height="100%" width="100%" points="0,200 300,200 150,0" fill="${colour}"/>`)
    })
})