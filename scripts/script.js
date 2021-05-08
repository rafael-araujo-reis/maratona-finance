const form = document.querySelector('.form');
const modal = form.parentElement;

const Modal = {
  openClose() {
    modal.classList.toggle('active');
  }
};

const Transaction = {
  income = {
    //somar valores de entrada
  },
  close() {
    modal.classList.remove('active');

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
  innerHTMLTransactions =
  `<tr>
    <td class="description">Conta de luz</td>
    <td class="expense">-R$ 600,00</td>
    <td class="date">13/04/2021</td>
    <td>
      <img src="./assets/minus.svg" alt="Remover transação">
    </td>
  </tr>`
};