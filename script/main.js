'use strict';

const block = document.querySelector('.block'),
    startbtn = document.querySelector('.start'),
    resetBtn = document.querySelector('.reset');

let start, stopId, progress, toggle = false;

block.style.cssText = `background: blue; position: absolute; width: 50px; height: 50px; top: 50px;`;

const step = (timestamp) => {
    if (!start) {
        start = timestamp;
    }
    progress = (timestamp - start) / 10 + 50;
    block.style.top = progress + 'px';
    stopId = window.requestAnimationFrame(step);
};

const toggleAnimation = () => {
    if (!toggle) {
        toggle = true;
        window.requestAnimationFrame(step);
    } else {
        toggle = false;
        cancelAnimationFrame(stopId);
    }
};

const reset = () => {
    block.style.cssText = `background: blue; position: absolute; width: 50px; height: 50px; top: 50px;`;
    toggle = false;
    start = 0;
    cancelAnimationFrame(stopId);
};

startbtn.addEventListener('click', toggleAnimation);
resetBtn.addEventListener('click', reset);