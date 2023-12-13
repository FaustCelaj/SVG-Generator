const inquirer = require('inquirer');
const fs = require('fs');
const { Circle, Square, Triangle } = require('./examples/lib/shapes');

class SVG {
    constructor() {
        this.textElement = '';
        this.shapeElement = '';
    }

    render() {
        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`;
    }

    setTextElement(logoText, logoTextColour) {
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${logoTextColour}">${logoText}</text>`;
    }

    setShapeElement(shape) {
        this.shapeElement = shape.render();
    }
}

function createDocument(svg) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Logo Document</title>
    </head>
    <body>
        <div>${svg}</div>
    </body>
    </html>`;
}

async function init() {
    console.log('Starting generator');
    let resultSvg = '';

    const questions = [
        {
            type: "input",
            name: "text",
            message: "Logo Text: Enter up to 3 Characters:",
        },
        {
            type: "input",
            name: "textColour",
            message: "Text colour: Enter a colour keyword (OR a hexadecimal number):",
        },
        {
            type: "list",
            name: "shape",
            message: "Choose which shape you would like",
            choices: ["Circle", "Square", "Triangle"],
        },
        {
            type: "input",
            name: "shapeColour",
            message: "Shape colour: Enter a colour keyword (OR a hexadecimal number):",
        },
    ];

    try {
        const answers = await inquirer.prompt(questions);

        let logoText = answers.text.length > 0 && answers.text.length <= 3 ? answers.text : null;
        if (!logoText) {
            console.log('Invalid text, please enter 1-3 characters.');
            return;
        }

        let logoTextColour = answers.textColour;
        let logoShapeType = answers.shape;
        let logoShapeColour = answers.shapeColour;

        console.log(`Logo text is ${logoText}, text colour is ${logoTextColour}, shape chosen is ${logoShapeType}, and the shape colour is ${logoShapeColour}`);

        let logoShape;
        switch (logoShapeType) {
            case 'Circle':
                logoShape = new Circle();
                console.log('Selected Circle');
                break;
            case 'Square':
                logoShape = new Square();
                console.log('Selected Square');
                break;
            case 'Triangle':
                logoShape = new Triangle();
                console.log('Selected Triangle');
                break;
            default:
                console.log('Invalid shape selected.');
                return;
        }
        logoShape.setColour(logoShapeColour);

        let svg = new SVG();
        svg.setTextElement(logoText, logoTextColour);
        svg.setShapeElement(logoShape);
        resultSvg = svg.render();

        console.log(resultSvg);

        fs.writeFile('logo.svg', resultSvg, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Successfully generated logo.svg!');
            }
        });

        const htmlDocument = createDocument(resultSvg);

        fs.writeFile('logo.html', htmlDocument, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Successfully generated logo.html!');
            }
        });

        console.log("Logo generation complete!");
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

init();
