import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './modal.scss';

class Modal extends React.PureComponent {
  render() {
    const {
      lessons, index, addLesson, onEnter, isEdit, closeModal, editLesson,
    } = this.props;
    if (!isEdit) {
      return (
        <>
          <div className="background" />
          <div className="modal">
            <FontAwesomeIcon id="sort" onClick={closeModal} icon={faTimes} />
            <input onKeyPress={onEnter} required id="lesson" type="text" placeholder="lesson" />
            <input onKeyPress={onEnter} required id="teacher" type="text" placeholder="teacher" />
            <button onClick={addLesson} type="button"> add</button>
          </div>
        </>
      );
    } return (
      <>
        <div className="background" />
        <div className="modal">
          <FontAwesomeIcon id="sort" onClick={closeModal} icon={faTimes} />
          <input onKeyPress={onEnter} required defaultValue={lessons[index].name} id="lesson" type="text" placeholder="lesson" />
          <input onKeyPress={onEnter} required defaultValue={lessons[index].teacher} id="teacher" type="text" placeholder="teacher" />
          <button onClick={editLesson} type="button">Edit</button>
        </div>
      </>
    );
  }
}

export default Modal;
