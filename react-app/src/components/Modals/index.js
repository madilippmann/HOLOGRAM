import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

export default function Modal({ children, closeModal }) {


  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal_background" onClick={closeModal}></div>
      <div id="modal_content">
        {children}
      </div>
    </div>,
    document.getElementById('portal'))
}
