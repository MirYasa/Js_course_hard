'use strict';

const block = document.querySelector('.a'),
    block2 = document.querySelector('.b');

let timeText = '',
    minText = '',
    secText = '',
    dayWeek = '',
    month = '';

const longTime = () => {
    const date = new Date();

    switch (date.getHours()) {
        case 1:
        case 21:
            timeText = 'час';
            break;

        case 2:
        case 3:
        case 4:
        case 22:
        case 23:
        case 24:
            timeText = 'часа';
            break;

        default:
            timeText = 'часов';
            break;
    }

    switch (date.getMinutes().toString().substr(1)) {
        case '1':
            minText = 'минута';
            break;

        case '2':
        case '3':
        case '4':
            minText = 'минуты';
            break;

        default:
            minText = 'минут';
            break;
    }

    switch (date.getSeconds().toString().substr(1)) {
        case '1':
            secText = 'секунда';
            break;

        case '2':
        case '3':
        case '4':
            secText = 'секунды';
            break;

        default:
            secText = 'секунд';
            break;
    }

    switch (date.getDay()) {
        case 0:
            dayWeek = 'Воскресенье';
            break;
        case 1:
            dayWeek = 'Понедельник';
            break;
        case 2:
            dayWeek = 'Вторник';
            break;
        case 3:
            dayWeek = 'Среда';
            break;
        case 4:
            dayWeek = 'Четверг';
            break;
        case 5:
            dayWeek = 'Пятница';
            break;
        case 6:
            dayWeek = 'Суббота';
            break;
    }

    switch (date.getMonth()) {
        case 0:
            month = 'Января';
            break;
        case 1:
            month = 'Февраля';
            break;
        case 2:
            month = 'Марта';
            break;
        case 3:
            month = 'Апреля';
            break;
        case 4:
            month = 'Мая';
            break;
        case 5:
            month = 'Июня';
            break;
        case 6:
            month = 'Июля';
            break;
        case 7:
            month = 'Августа';
            break;
        case 8:
            month = 'Сентября';
            break;
        case 9:
            month = 'Октября';
            break;
        case 10:
            month = 'Ноября';
            break;
        case 11:
            month = 'Декабря';
            break;
    }

    block.textContent = `Сегодня ${dayWeek}, ${date.getDate()} ${month} ${date.getFullYear()} года, ${date.getHours()} ${timeText} ${date.getMinutes()} ${minText} ${date.getSeconds()} ${secText}`;
};

setInterval(longTime, 1000);

const shortTime = () => {
    const date = new Date(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();
        let hoursText = '',
        minutesText = '',
        secondsText = '',
        day = '',
        month = '';

    if (hours >= 0 && hours <= 9) {
        hoursText = `0${ hours}`;
    } else if (hours < 0) {
        hoursText = '00';
    } else {
        hoursText = hours;
    }

    if (minutes >= 0 && minutes <= 9) {
        minutesText = `0${ minutes}`;
    } else if (minutes < 0) {
        minutesText = '00';
    } else {
        minutesText = minutes;
    }

    if (seconds >= 0 && seconds <= 9) {
        secondsText = `0${ seconds}`;
    } else if (seconds < 0) {
        secondsText = '00';
    } else {
        secondsText = seconds;
    }

    if (date.getDate() < 10) {
        day = `0${date.getDay()}`;
    } else {
        day = date.getDate();
    }

    if ((date.getMonth() + 1) < 10) {
        month = `0${date.getMonth() + 1}`;
    }else {
        month = date.getMonth() + 1;
    }


    block2.textContent = `${day}.${month}.${date.getFullYear()} - ${hoursText}:${minutesText}:${secondsText}`;
};
    setInterval(shortTime, 1000);
shortTime();