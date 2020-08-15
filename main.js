'use strict';
const arr = ['12312', '45', '1354', '2593', '40123', '6432', '12356'];

for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] == 4 || arr[i][0] == 2) {
        console.log(arr[i]);
    }
}

nextPrime:
    for (let i = 2; i <= 100; i++) {
        for (let j = 2; j < i; j++) {
            if (i % j == 0) {
                continue nextPrime;
            }
        }
        console.log(i + ' ' + 'Делится на 1 и на' + ' ' + i);
    }