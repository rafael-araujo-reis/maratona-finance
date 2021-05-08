const form = document.querySelector('.form');
const modal = form.parentElement;

const Modal = {
  open() {
    modal.classList.add('active');
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
};