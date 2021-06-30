import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes } from 'prop-types';
import './modal.scss';

class Modal extends React.PureComponent {
  constructor(props) {
    super(props);
    const { isEdit, lessons, index } = this.props;
    this.state = {
      valueTeacherInput: isEdit ? lessons[index].teacher : '',
      valueLessonInput: isEdit ? lessons[index].name : '',
    };
  }

  handleLessonInput = (value) => {
    this.setState({
      valueLessonInput: value,
    });
  }

  handleTeacherInput = (value) => {
    this.setState({
      valueTeacherInput: value,
    });
  }

  onEnterHandler = (event) => {
    const { valueLessonInput, valueTeacherInput } = this.state;
    const { isEdit, editLesson, addLesson } = this.props;
    if (event.code === 'Enter') {
      if (isEdit) {
        editLesson(valueLessonInput, valueTeacherInput);
      } else addLesson(valueLessonInput, valueTeacherInput);
    }
  };

  render() {
    const {
      addLesson,
      isEdit,
      closeModal,
      editLesson,
    } = this.props;
    const { valueLessonInput, valueTeacherInput } = this.state;
    if (!isEdit) {
      return (
        <>
          <div className="background" />
          <div className="modal">
            <FontAwesomeIcon id="icon" onClick={closeModal} icon={faTimes} />
            <input
              onKeyPress={this.onEnterHandler}
              onChange={(e) => this.handleLessonInput(e.target.value)}
              required
              id="lesson"
              type="text"
              placeholder="lesson"
            />
            <input
              onKeyPress={this.onEnterHandler}
              onChange={(e) => this.handleTeacherInput(e.target.value)}
              required
              id="teacher"
              type="text"
              placeholder="teacher"
            />
            <button onClick={() => addLesson(valueLessonInput, valueTeacherInput)} type="button">
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
            onKeyPress={this.onEnterHandler}
            onChange={(e) => this.handleLessonInput(e.target.value)}
            required
            value={valueLessonInput}
            id="lesson"
            type="text"
            placeholder="lesson"
          />
          <input
            onKeyPress={this.onEnterHandler}
            onChange={(e) => this.handleTeacherInput(e.target.value)}
            required
            value={valueTeacherInput}
            id="teacher"
            type="text"
            placeholder="teacher"
          />
          <button onClick={() => editLesson(valueLessonInput, valueTeacherInput)} type="button">
            Edit
          </button>
        </div>
      </>
    );
  }
}

Modal.propTypes = {
  lessons: PropTypes.instanceOf(Array).isRequired,
  addLesson: PropTypes.func.isRequired,
  editLesson: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isEdit: PropTypes.bool.isRequired,
};

export default Modal;
