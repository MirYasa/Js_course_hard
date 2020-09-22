'use strict';

const enDays = ['Monday', 'Tusday', 'Wednsday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    ruDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    lang = prompt('Введите "en" либо "ru" для того чтобы выбрать язык'),
    arr = lang == 'ru' ? console.log(ruDays) : lang == 'en' ? console.log(enDays) : console.log('Вы не выбрали язык'),
    namePerson = prompt('Введите имя'),
    result = namePerson == 'Артём' ? console.log('Директор') : namePerson == 'Максим' ? console.log('Преподователь') : console.log('Студент');

if (lang == 'en') {
    console.log(enDays);
} else if (lang == 'ru') {
    console.log(ruDays);
} else {
    console.log('Вы не выбрали язык!');
}

switch (lang) {
    case 'ru':
        console.log(ruDays);
        break;
    case 'en':
        console.log(enDays);
        break;
    default:
        console.log('Вы не выбрали язык!');
        break;
}