'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');

    function DomElement(selector = '#selector', height = '200px', width = '200px', bg = 'blue', fontSize = '10px') {
        this.selector = selector;
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
    }

    DomElement.prototype.createElem = function () {
        const elem = document.createElement('div');
        elem.classList.add('block');
        elem.style.cssText = `height: ${this.height}; 
        width: ${this.width}; background-color: ${this.bg};
        font-size: ${this.fontSize}; position: absolute;`;

        if (this.selector.charAt(0) === '.') {
            elem.setAttribute('class', this.selector.substr(1));

        } else if (this.selector.charAt(0) === '#') {
            elem.setAttribute('id', this.selector.substr(1));
        }

        body.append(elem);
    };

    DomElement.prototype.moveElement = function () {
        const block = document.querySelector('.block');
        let top = 0, left = 0, right = 0, bot = 0;

        document.addEventListener('keydown', (event) => {
            console.log(block.clientLeft);

            if (event.keyCode === 37) {
               
                right -= 10;
                block.style.left = `${right}px`;

            } else if (event.keyCode === 38) {
                top -= 10;
                block.style.top = `${top}px`;

            } else if (event.keyCode === 39) {
                right += 10;
                block.style.left = `${right}px`;

            } else if (event.keyCode === 40) {
                top += 10;
                block.style.top = `${top}px`;
            }
        });
    };

    const domElement = new DomElement('.block', '100px', '100px', 'red', '20px');

    domElement.createElem();
    domElement.moveElement();
});