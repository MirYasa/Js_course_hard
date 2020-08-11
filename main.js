'use strict';
const str = prompt('Введите строку', '');

function hard(a) {
    if (typeof (a) != 'string') {
        return 'Вы ввели не строку!';
    } else {
        if (a.length > 30) {
            return a.slice(0,30) + '...';
        } else {
            return a.trim();
        }
    }
}

console.log(hard(str));