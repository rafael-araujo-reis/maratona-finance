const form = document.querySelector('.form');
const modal = form.parentElement;

const Modal = {
  open() {
    modal.classList.add('active');
  },
  close() {
    modal.classList.remove('active');

  }
};