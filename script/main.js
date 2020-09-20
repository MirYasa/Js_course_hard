'use strict';

const startBtn = document.getElementById('start'),
    cancelBtn = document.querySelector('#cancel'),
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
    leftSide = document.querySelector('.data'),
    leftInputs = leftSide.querySelectorAll('input[type="text"]');

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let expensesItems = document.querySelectorAll('.expenses-items'),
    IncomeItems = document.querySelectorAll('.income-items');

class AppData {
    constructor() {
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
    }

    getExpensesMonth() {
        for (const key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }
    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.ceil(this.budgetMonth / 30);
    }
    getTargetMonth() {
        if (Math.ceil(targetAmount.value / (this.budget - this.expensesMonth)) < 0) {
            return 'Цель не будет достигнута';
        } else {
            return Math.ceil(targetAmount.value / (this.budget - this.expensesMonth));
        }
    }
    getStatusIncome() {
        if (this.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else if (this.budgetDay < 0) {
            return ('Что-то пошло не так');
        }
    }
    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = prompt('Какой у вас годовой процент?');
            if (!isNumber(this.percentDeposit)) {
                do {
                    this.percentDeposit = prompt('Какой у вас годовой процент?');
                } while (!isNumber(this.percentDeposit));
            }
            this.moneyDeposit = prompt('Какая сумма заложена?');
            if (!isNumber(this.moneyDeposit)) {
                do {
                    this.moneyDeposit = prompt('Какая сумма заложена?');
                } while (!isNumber(this.moneyDeposit));
            }
        }
    }
    calcSaveMoney() {
        return this.budgetMonth * periodSelect.value;
    }
    start() {
        this.budget = salaryAmount.value * 1;

        this.getExpInc();
        this.getExpensesMonth();
        this.getBudget();
        this.getInfoDeposit();
        this.getAddExpenses();
        this.getAddIncome();
        this.showResult();

        startBtn.style.display = 'none';
        cancelBtn.style.display = 'block';
        leftInputs.forEach((input) => {
            input.disabled = true;
        });
    }
    addExpensesBlock() {
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
    }
    addIncomeBlock() {
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
    }
    // getExpenses() {
    //     expensesItems.forEach((item) => {
    //         const itemExpenses = item.querySelector('.expenses-title').value,
    //             cashExpenses = item.querySelector('.expenses-amount').value;
    //         if (itemExpenses !== '' && cashExpenses !== '') {
    //             this.expenses[itemExpenses] = cashExpenses * 1;
    //         }
    //     });
    // }
    // getIncome() {
    //     IncomeItems.forEach((item) => {
    //         const itemIncome = item.querySelector('.income-title').value,
    //             cashIncome = item.querySelector('.income-amount').value;
    //         if (itemIncome !== '' && cashIncome !== '') {
    //             this.[itemIncome] = cashIncome;
    //         }
    //     });
    //     for (const key in this.income) {
    //         this.incomeMonth += +this.income[key];
    //     }
    // }
    getExpInc() {

        const count = (item) => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value,
                itemAmount = item.querySelector(`.${startStr}-amount`).value;

            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = itemAmount;
            }
        };

        IncomeItems.forEach(count);
        expensesItems.forEach(count);

        for (const key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }
    showResult() {
        expensesMonthValue.value = this.expensesMonth;
        budgetDayValue.value = this.budgetDay;
        budgetMonthValue.value = this.budgetMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSaveMoney();
        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = this.calcSaveMoney();
        });
    }
    getAddExpenses() {
        const addExpenses = additionalExpensesItem.value.split(', ');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    }
    getAddIncome() {
        additionalIncomeItem.forEach((item) => {
            const itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }
    reset() {
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;

        salaryAmount.value = '';
        incomeTitle.value = '';
        incomeAmount.value = '';
        additionalIncomeItem.forEach((item) => {
            item.value = '';
        });
        additionalExpensesItem.value = '';
        expensesAmount.value = '';
        expensesTitle.value = '';
        expensesItems.value = '';
        targetAmount.value = '';
        periodSelect.value = 1;
        periodAmount.textContent = 1;

        expensesMonthValue.value = '';
        budgetDayValue.value = '';
        budgetMonthValue.value = '';
        additionalExpensesValue.value = '';
        additionalIncomeValue.value = '';
        targetMonthValue.value = '';
        incomePeriodValue.value = '';

        cancelBtn.style.display = 'none';
        startBtn.style.display = 'block';
        leftInputs.forEach((input) => {
            input.disabled = false;
        });
        startBtn.setAttribute('disabled', 'disabled');
    }
    addEventListeners() {
        salaryAmount.addEventListener('input', () => {
            if (appData.isNumber(salaryAmount.value)) {

                startBtn.removeAttribute('disabled');
            } else {
                startBtn.setAttribute('disabled', 'disabled');
            }
        });
        startBtn.setAttribute('disabled', 'disabled');
        startBtn.addEventListener('click', this.start.bind(this));
        cancelBtn.addEventListener('click', this.reset.bind(this));
        plus2.addEventListener('click', this.addExpensesBlock);
        plus.addEventListener('click', this.addIncomeBlock);
        periodSelect.addEventListener('input', () => {
            periodAmount.textContent = periodSelect.value;
        });
    }
    isNumber(elem) {
        return !isNaN(parseFloat(elem)) && isFinite(elem);
    }
}

const appData = new AppData();

appData.addEventListeners();