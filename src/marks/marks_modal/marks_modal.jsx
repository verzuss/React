import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes } from 'prop-types';
import './marks_modal.scss';

class MarksModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isInputValue: false,
    };
  }

  onKeyPressHandler = (event) => {
    if (event.code === 'Enter') {
      this.checkInput();
    }
  };

  formattedDate = (d = new Date()) => [d.getFullYear(), d.getMonth(), d.getDate()]
    .map((n) => (n < 10 ? `0${n}` : `${n}`)).join('-')

  checkInput = () => {
    const {
      addMark, editMark, isEdit, getDateInput,
    } = this.props;
    const dateInputValue = getDateInput.current.value;
    if (dateInputValue > this.formattedDate() || dateInputValue < '2000-01-01') {
      this.setState({
        isInputValue: true,
      });
    } else if (isEdit) {
      editMark();
    } else {
      addMark();
    }
  }

  render() {
    const {
      lessons,
      indexMark,
      indexLesson,
      isEdit,
      closeModal,
      getDateInput,
      getMarkInput,
    } = this.props;
    const { isInputValue } = this.state;
    const errorSpan = isInputValue ? <span className="marks-modal__err-text">Permissible value: 2000 - current date</span> : null;
    const today = this.formattedDate();
    const markValue = lessons[indexLesson].marks[indexMark];
    if (!isEdit) {
      return (
        <>
          <div className="background" />
          <div className="modal marks-modal">
            <FontAwesomeIcon id="icon" onClick={closeModal} icon={faTimes} />
            <div>
              date
              <input
                onKeyDown={this.onKeyPressHandler}
                defaultValue={today}
                min="2000-01-01"
                max={today}
                className="marks-modal__date"
                required
                id="date"
                type="date"
                ref={getDateInput}
              />
            </div>
            {errorSpan}
            <div>
              mark
              <select ref={getMarkInput} className="marks-modal__mark">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <button onClick={this.checkInput} type="button">
              add
            </button>
          </div>
        </>
      );
    }
    return (
      <>
        <div className="background" />
        <div className="modal marks-modal">
          <FontAwesomeIcon id="icon" onClick={closeModal} icon={faTimes} />
          <div>
            date
            <input
              defaultValue={markValue.date}
              min="2000-01-01"
              max={today}
              className="marks-modal__date"
              required
              id="date"
              type="date"
              ref={getDateInput}
            />
          </div>
          {errorSpan}
          <div>
            mark
            <select
              ref={getMarkInput}
              className="marks-modal__mark"
              defaultValue={markValue.mark}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <button onClick={this.checkInput} type="button">
            edit
          </button>
        </div>
      </>
    );
  }
}

MarksModal.propTypes = {
  lessons: PropTypes.instanceOf(Array).isRequired,
  editMark: PropTypes.func.isRequired,
  addMark: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  indexLesson: PropTypes.string.isRequired,
  indexMark: PropTypes.number.isRequired,
  isEdit: PropTypes.bool.isRequired,
  getMarkInput: PropTypes.instanceOf(Object).isRequired,
  getDateInput: PropTypes.instanceOf(Object).isRequired,
};

export default MarksModal;
