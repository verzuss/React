import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes } from 'prop-types';
import './marks_modal.scss';

class MarksModal extends React.PureComponent {
  formattedDate = (d = new Date()) => [d.getFullYear(), d.getMonth(), d.getDate()]
    .map((n) => (n < 10 ? `0${n}` : `${n}`)).join('-')

  render() {
    const {
      lessons,
      indexMark,
      indexLesson,
      addMark,
      onEnter,
      isEdit,
      closeModal,
      editMark,
    } = this.props;
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
                onKeyPress={onEnter}
                defaultValue={today}
                min="2000-01-01"
                max="2021-12-31"
                className="marks-modal__date"
                required
                id="date"
                type="date"
              />
            </div>
            <div>
              mark
              <select className="marks-modal__mark">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <button onClick={addMark} type="button">
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
              onKeyPress={onEnter}
              defaultValue={markValue.date}
              min="2000-01-01"
              max="2021-12-31"
              className="marks-modal__date"
              required
              id="date"
              type="date"
            />
          </div>
          <div>
            mark
            <select className="marks-modal__mark" defaultValue={markValue.mark}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <button onClick={editMark} type="button">
            edit
          </button>
        </div>
      </>
    );
  }
}

MarksModal.propTypes = {
  lessons: PropTypes.instanceOf(Array).isRequired,
  onEnter: PropTypes.func.isRequired,
  editMark: PropTypes.func.isRequired,
  addMark: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  indexLesson: PropTypes.number.isRequired,
  indexMark: PropTypes.number.isRequired,
  isEdit: PropTypes.bool.isRequired,
};

export default MarksModal;
