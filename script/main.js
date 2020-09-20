'use strict';

const startBtn = document.getElementById('start'),
    plus = document.querySelector('.income .btn_plus'),
    plus2 = document.querySelector('.expenses .btn_plus'),
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    targetMonthValue = document.querySelector('.target_month-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    periodSelect = document.querySelector('.period-select'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-items .income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-items .expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    targetAmount = document.querySelector('.target-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    periodAmount = document.querySelector('.period-amount'),
    reg = /[^а-я a-z,-\.]/gi,
    reg2 = /[^0-9]/gi,
    data = document.querySelector('.data'),
    inputs = data.querySelectorAll('input');    

let expensesItems = document.querySelectorAll('.expenses-items'),
    IncomeItems = document.querySelectorAll('.income-items');

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let money,
    result = [],
    appData = {
        income: {},
        incomeMonth: 0,
        addIncome: [],
        expenses: {},
        addExpenses: [],
        deposit: false,
        percentDeposit: 0,
        moneyDeposit: 0,
        budget: 0,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0,
        getExpensesMonth: function () {
            for (const key in appData.expenses) {
                appData.expensesMonth += appData.expenses[key];
            }
            return appData.expensesMonth;
        },
        getBudget: function () {
            appData.budgetMonth = Math.ceil(appData.budget + appData.incomeMonth - appData.getExpensesMonth());
            appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
        },
        getTargetMonth: function () {
            if (Math.ceil(targetAmount.value / (appData.budget - appData.expensesMonth)) < 0) {
                return 'Цель не будет достигнута';
            } else {
                return Math.ceil(targetAmount.value / (appData.budget - appData.expensesMonth));
            }
        },
        getStatusIncome: function () {
            if (appData.budgetDay >= 1200) {
                return ('У вас высокий уровень дохода');
            } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
                return ('У вас средний уровень дохода');
            } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
                return ('К сожалению у вас уровень дохода ниже среднего');
            } else if (appData.budgetDay < 0) {
                return ('Что-то пошло не так');
            }
        },
        getInfoDeposit: function () {
            if (appData.deposit) {
                appData.percentDeposit = prompt('Какой у вас годовой процент?');
                if (!isNumber(appData.percentDeposit)) {
                    do {
                        appData.percentDeposit = prompt('Какой у вас годовой процент?');
                    } while (!isNumber(appData.percentDeposit));
                }
                appData.moneyDeposit = prompt('Какая сумма заложена?');
                if (!isNumber(appData.moneyDeposit)) {
                    do {
                        appData.moneyDeposit = prompt('Какая сумма заложена?');
                    } while (!isNumber(appData.moneyDeposit));
                }
            }
        },
        calcSaveMoney: function () {
            return appData.budgetMonth * periodSelect.value;
        },
        start: function () {
            appData.budget = salaryAmount.value * 1;
    
            appData.getExpenses();
            appData.getIncome();
            appData.getBudget();
            appData.getInfoDeposit();
            appData.getAddExpenses();
            appData.getAddIncome();

            appData.showResult();
        },
        addExpensesBlock: function () {
            const cloneExpensesItem = expensesItems[0].cloneNode(true),
                expensesValue = cloneExpensesItem.querySelectorAll('input');
            expensesValue.forEach((item) => {
                item.value = '';
            });
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plus2);
            expensesItems = document.querySelectorAll('.expenses-items');
            if (expensesItems.length === 3) {
                plus2.style.display = 'none';
            }
        },
        addIncomeBlock: function () {
            const cloneIncomeItem = IncomeItems[0].cloneNode(true),
                incomeValue = cloneIncomeItem.querySelectorAll('input');
            incomeValue.forEach((item) => {
                item.value = '';
            });
            IncomeItems[0].parentNode.insertBefore(cloneIncomeItem, plus);
            IncomeItems = document.querySelectorAll('.income-items');
            if (IncomeItems.length === 3) {
                plus.style.display = 'none';
            }
        },
        getExpenses: function () {
            expensesItems.forEach((item) => {
                const itemExpenses = item.querySelector('.expenses-title').value,
                    cashExpenses = item.querySelector('.expenses-amount').value;
                if (itemExpenses !== '' && cashExpenses !== '') {
                    appData.expenses[itemExpenses] = cashExpenses * 1;
                }
            });
        },
        getIncome: function () {
            IncomeItems.forEach((item) => {
                const itemIncome = item.querySelector('.income-title').value,
                    cashIncome = item.querySelector('.income-amount').value;
                if (itemIncome !== '' && cashIncome !== '') {
                    appData.income[itemIncome] = cashIncome * 1;
                }

                for (const key in appData.income) {
                    appData.incomeMonth += +appData.income[key];
                }

            });
        },
        showResult: function () {
            expensesMonthValue.value = appData.expensesMonth;
            budgetDayValue.value = appData.budgetDay;
            budgetMonthValue.value = appData.budgetMonth;
            additionalExpensesValue.value = appData.addExpenses.join(', ');
            additionalIncomeValue.value = appData.addIncome.join(', ');
            targetMonthValue.value = appData.getTargetMonth();
            incomePeriodValue.value = appData.calcSaveMoney();
            periodSelect.addEventListener('input', () => {
                incomePeriodValue.value = appData.calcSaveMoney();
            });
        },
        getAddExpenses: function () {
            const addExpenses = additionalExpensesItem.value.split(', ');
            addExpenses.forEach((item) => {
                item = item.trim();
                if (item !== '') {
                    appData.addExpenses.push(item);
                }
            });
        },
        getAddIncome: function () {
            additionalIncomeItem.forEach((item) => {
                const itemValue = item.value.trim();
                if (itemValue !== '') {
                    appData.addIncome.push(itemValue);
                }
            });
        },
    };

data.addEventListener('input', (e) => {
const target = e.target;
    if (target.placeholder === 'Сумма') {
        target.value = target.value.replace(reg2, '');
    } else if (target.placeholder === 'Наименование'){
        target.value = target.value.replace(reg, '');  
    }
});

startBtn.style.display = 'none';

salaryAmount.addEventListener('input', () => {
    if (salaryAmount.value === '') {
        startBtn.style.display = 'none';
    } else {
        startBtn.style.display = 'block';
    }
});
startBtn.addEventListener('click', appData.start);
plus2.addEventListener('click', appData.addExpensesBlock);
plus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', () => {
    periodAmount.textContent = periodSelect.value;
});