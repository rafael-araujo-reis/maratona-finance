const form = document.querySelector('.form');
const modal = form.parentElement;

const Modal = {
  open() {
    console.log('aqui');
    modal.classList.add('active');
  },
  close() {
    console.log('ali');
    modal.classList.remove('active');

  }
};