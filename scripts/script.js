const form = document.querySelector('.form');
const modal = form.parentElement;

const Modal = {
  openClose() {
    modal.classList.toggle('active');
  }
};

const Transaction = {
  income() {
    //somar valores de entrada
  },
  expense() {
    //somar valores de saida
  },
  total() {
    //somar entrada e saídas
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
  }
};

const transactions = [
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
];

const DOM = {
  transactionContainer: document.querySelector('#data-table tbody'),
  addTransaction(transaction, index) {
    const tr = document.createElement('tr');
    tr.innerHTML = this.innerHTMLTransactions(transaction);
    this.transactionContainer.append(tr);
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
  }
};

transactions.forEach((transaction) => {
  DOM.addTransaction(transaction);
});