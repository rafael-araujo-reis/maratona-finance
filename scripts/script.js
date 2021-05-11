const form = document.querySelector('.form');
const modal = form.parentElement;

const Modal = {
  openClose() {
    modal.classList.toggle('active');
  }
};

const Storage = {
  get() {
    item = JSON.parse(localStorage.getItem('transactions')) || [];
    return item;
  },
  set(transactions) {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }
};

const Transaction = {
  all: Storage.get(),
  add(transaction) {
    Transaction.all.push(transaction);
    App.reload();
  },
  remove(index) {
    index = index - 1;
    Transaction.all.splice(index, 1);
    DOM.removeTransaction(index);
    DOM.updateBalance();
  },
  income() {
    let incomeSum = 0;
    Transaction.all.forEach((transaction) => {
      if (transaction.amount > 0) {
        incomeSum += transaction.amount;
      }
    });
    return incomeSum;
  },
  expense() {
    let expenseSum = 0;
    Transaction.all.forEach((transaction) => {
      if (transaction.amount < 0) {
        expenseSum += transaction.amount;
      }
    });
    return expenseSum;
  },
  total() {
    let totalSum = 0;
    totalSum = Transaction.expense() + Transaction.income();
    return totalSum;
  }
};

const Utils = {
  formatCurrent(value) {
    const signal = Number(value) >= 0 ? '' : '-';
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
    tr.innerHTML = DOM.innerHTMLTransactions(transaction, index);
    DOM.transactionContainer.append(tr);
  },
  removeTransaction(index) {
    DOM.transactionContainer.deleteRow(index);
  },
  innerHTMLTransactions(transaction) {
    const classCSS = transaction.amount > 0 ? 'income' : 'expense';
    const amount = Utils.formatCurrent(transaction.amount);
    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${classCSS}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
        <img onclick="Transaction.remove(this.parentElement.parentElement.rowIndex)" src="./assets/minus.svg" alt="Remover transação">
      </td>
  `;
    return html;
  },
  updateBalance() {
    const cards = document.querySelectorAll('.card');
    cards[0].lastElementChild.innerHTML = Utils.formatCurrent(Transaction.income());
    cards[1].lastElementChild.innerHTML = Utils.formatCurrent(Transaction.expense());
    cards[2].lastElementChild.innerHTML = Utils.formatCurrent(Transaction.total());
  },
  clearTransactions() {
    DOM.transactionContainer.innerHTML = '';
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
    Form.amount.value = '';
    Form.date.value = '';
  },
  closeModal() {
    Modal.openClose();
  },
  submit(event) {
    try {
      event.preventDefault();
      Form.validateFields();
      const transaction = Form.formatValues();
      Form.saveTransaction(transaction);
      Form.clearForm();
      Form.closeModal();
    } catch (error) {
      alert(error.message);
    }
  }
};

const App = {
  init() {
    Transaction.all.forEach(DOM.addTransaction);
    DOM.updateBalance();
    Storage.set(Transaction.all);
  },
  reload() {
    DOM.clearTransactions();
    App.init();
  }
};

App.init();