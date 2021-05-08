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
  }
];

const DOM = {
  innerHTMLTransactions() {
    const html = `
      <tr>
        <td class="description">${transaction.description}</td>
        <td class="expense">${transaction.amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
          <img src="./assets/minus.svg" alt="Remover transação">
        </td>
      </tr>
  `;
    return html;
  }

};