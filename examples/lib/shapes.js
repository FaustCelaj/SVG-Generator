class Shape {
    constructor() {
        this.colour = '';
    }

    setColour(logoShapeColour) {
        this.colour = logoShapeColour;
    }
}

class Circle extends Shape {
    render() {
        return `<circle cx="50%" cy="50%" r="100" height="100%" width="100%" fill="${this.colour}"/>`;
    }
}

class Square extends Shape {
    render() {
        return `<rect x="50" height="200" width="200" fill="${this.colour}"/>`;
    }
}

class Triangle extends Shape {
    render() {
        return `<polygon height="100%" width="100%" points="0,200 300,200 150,0" fill="${this.colour}"/>`;
    }
}

module.exports = { Circle, Square, Triangle };
