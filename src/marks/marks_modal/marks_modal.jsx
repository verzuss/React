import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes } from 'prop-types';
import './marks_modal.scss';

class MarksModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.dateInput = React.createRef();
    this.markInput = React.createRef();
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
      addMark, editMark, isEdit, indexMark,
    } = this.props;
    const dateInputValue = this.dateInput.current.value;
    const markInputValue = this.markInput.current.value;
    if (dateInputValue > this.formattedDate() || dateInputValue < '2000-01-01') {
      this.setState({
        isInputValue: true,
      });
    } else if (isEdit) {
      editMark(indexMark, { date: dateInputValue, mark: markInputValue });
    } else {
      addMark(dateInputValue, markInputValue);
    }
  }

  render() {
    const {
      lessons,
      indexMark,
      indexLesson,
      isEdit,
      closeModal,
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
                ref={this.dateInput}
              />
            </div>
            {errorSpan}
            <div>
              mark
              <select
                ref={this.markInput}
                className="marks-modal__mark"
                onKeyDown={this.onKeyPressHandler}
              >
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
              onKeyDown={this.onKeyPressHandler}
              min="2000-01-01"
              max={today}
              className="marks-modal__date"
              required
              id="date"
              type="date"
              ref={this.dateInput}
            />
          </div>
          {errorSpan}
          <div>
            mark
            <select
              ref={this.markInput}
              className="marks-modal__mark"
              defaultValue={markValue.mark}
              onKeyDown={this.onKeyPressHandler}
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
};

export default MarksModal;
