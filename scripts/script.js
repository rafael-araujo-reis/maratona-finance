const form = document.querySelector('.form');
const modal = form.parentElement;

const Modal = {
  openClose() {
    modal.classList.toggle('active');
  }
};

const Transaction = {
  all: transactions = [
    {
      id: 1,
      description: 'Desenvolvimento',
      amount: 1200000,
      date: '13/04/2021'
    },
    {
      id: 2,
      description: 'Conta de luz',
      amount: -60000,
      date: '13/04/2021'
    },
    {
      id: 3,
      description: 'Terreno',
      amount: -100000,
      date: '13/04/2021'
    },
    {
      id: 4,
      description: 'Terreno',
      amount: -6000000,
      date: '13/04/2021'
    },
    {
      id: 4,
      description: 'PLR',
      amount: 1300000,
      date: '13/04/2021'
    }
  ],
  add(transaction) {
    this.all.push(transaction);
    DOM.addTransaction(transaction);
    DOM.updateBalance();
  },
  remove(index) {
    this.all.splice(index, 1);
    DOM.removeTransaction(index);
    DOM.updateBalance();
  },
  income() {
    let incomeSum = 0;
    transactions.forEach((transaction) => {
      if (transaction.amount > 0) {
        incomeSum += transaction.amount;
      }
    });
    return incomeSum;
  },
  expense() {
    let expenseSum = 0;
    this.all.forEach((transaction) => {
      if (transaction.amount < 0) {
        expenseSum += transaction.amount;
      }
    });
    return expenseSum;
  },
  total() {
    let totalSum = 0;
    totalSum = this.expense() + this.income();
    return totalSum;
  }
};

const Utils = {
  formatCurrent(value) {
    const signal = Number(value) > 0 ? '' : '-';
    value = String(value).replace(/\D/, '');
    value = Number(value) / 100;

    value = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
    return signal + value;
  },
  formatAmount(value) {
    value = Number(value) * 100;
    return value;
  },
  formatDate(date) {
    date = date.split('-');
    date = `${date[2]}/${date[1]}/${date[0]}`;
    return date;
  }
};

const DOM = {
  transactionContainer: document.querySelector('#data-table tbody'),
  addTransaction(transaction, index) {
    const tr = document.createElement('tr');
    tr.innerHTML = this.innerHTMLTransactions(transaction);
    this.transactionContainer.append(tr);
  },
  removeTransaction(index) {
    this.transactionContainer.deleteRow(index);
  },
  innerHTMLTransactions(transaction) {
    const classCSS = transaction.amount > 0 ? 'income' : 'expense';
    const amount = Utils.formatCurrent(transaction.amount);
    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${classCSS}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
        <img src="./assets/minus.svg" alt="Remover transação">
      </td>
  `;
    return html;
  },
  updateBalance() {
    const cards = document.querySelectorAll('.card');
    cards[0].lastElementChild.innerHTML = Utils.formatCurrent(Transaction.income());
    cards[1].lastElementChild.innerHTML = Utils.formatCurrent(Transaction.expense());
    cards[2].lastElementChild.innerHTML = Utils.formatCurrent(Transaction.total());
  }
};

const Form = {
  description: document.querySelector('#description'),
  amount: document.querySelector('#amount'),
  date: document.querySelector('#date'),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value
    };
  },
  validateFields() {
    const { description, amount, date } = Form.getValues();

    if (
      description === '' ||
      amount === '',
      amount === 0 ||
      date === '') {
      throw new Error('Por favor, preencha todos os campos');
    }
  },
  formatValues() {
    let { description, amount, date } = Form.getValues();
    amount = Utils.formatAmount(amount);
    date = Utils.formatDate(date);

    return { description, amount, date };
  },
  saveTransaction(transaction) {
    Transaction.add(transaction);
  },
  clearForm() {
    Form.description.value = '';
    this.amount.value = '';
    this.date.value = '';
  },
  closeModal() {
    Modal.openClose();
  },
  submit(event) {
    try {
      event.preventDefault();
      this.validateFields();
      const transaction = this.formatValues();
      this.saveTransaction(transaction);
      this.clearForm();
      this.closeModal();
    } catch (error) {
      alert(error.message);
    }
  }
};

const App = {
  init() {
    Transaction.all.forEach((transaction) => {
      DOM.addTransaction(transaction);
    });

    DOM.updateBalance();
  }
};

App.init();