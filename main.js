'use strict';

let week = ['Sunday', 'Monday', 'Tuesday', 'Wednsday', 'Thursday', 'Friday', 'Saturday'],
    toDay = new Date(),
    a = toDay.getDay();

for (let i = 0; i < 7; i++) {

    if (i == a) {
        document.write(`<p><i>${week[i]}</i></p>`);
    } else if (week[i] == 'Saturday' || week[i] == 'Sunday') {
        document.write(`<p><b>${week[i]}</b></p>`);
    }  else {
        document.write(`<p>${week[i]}</p>`);
    }
}