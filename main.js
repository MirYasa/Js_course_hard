'use strict';
const str = '                       я1zzzzz                 gggggggg                    ',
    arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
 let re = /[A-Z, А-Я]/gi;
    
function hard(a) {
    a = a.trim();
    if (a.search(re) != -1) {
        if (a.length > 30) {
            return a.slice(0, 30) + '...';
        } else {
            return a;
        }
    } else {
        return 'Вы ввели число';
    }
}
console.log(hard(str));