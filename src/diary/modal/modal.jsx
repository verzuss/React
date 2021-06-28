import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes } from 'prop-types';
import './modal.scss';

class Modal extends React.PureComponent {
  render() {
    const {
      lessons,
      index,
      addLesson,
      onEnter,
      isEdit,
      closeModal,
      editLesson,
    } = this.props;
    if (!isEdit) {
      return (
        <>
          <div className="background" />
          <div className="modal">
            <FontAwesomeIcon id="icon" onClick={closeModal} icon={faTimes} />
            <input
              onKeyPress={onEnter}
              required
              id="lesson"
              type="text"
              placeholder="lesson"
            />
            <input
              onKeyPress={onEnter}
              required
              id="teacher"
              type="text"
              placeholder="teacher"
            />
            <button onClick={addLesson} type="button">
              add
            </button>
          </div>
        </>
      );
    }
    return (
      <>
        <div className="background" />
        <div className="modal">
          <FontAwesomeIcon id="icon" onClick={closeModal} icon={faTimes} />
          <input
            onKeyPress={onEnter}
            required
            defaultValue={lessons[index].name}
            id="lesson"
            type="text"
            placeholder="lesson"
          />
          <input
            onKeyPress={onEnter}
            required
            defaultValue={lessons[index].teacher}
            id="teacher"
            type="text"
            placeholder="teacher"
          />
          <button onClick={editLesson} type="button">
            Edit
          </button>
        </div>
      </>
    );
  }
}

Modal.propTypes = {
  lessons: PropTypes.instanceOf(Array).isRequired,
  name: PropTypes.string.isRequired,
  teacher: PropTypes.string.isRequired,
  addLesson: PropTypes.func.isRequired,
  editLesson: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isEdit: PropTypes.bool.isRequired,
};

export default Modal;
