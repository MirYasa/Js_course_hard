'use strict';
const body = document.querySelector('body'),
    color = document.querySelector('.color'),
    change = document.querySelector('.change');

change.addEventListener('click', () => {
    const random = `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`;
    
    color.textContent = random;
    body.style.cssText = `background-color: ${random};`;
    
});