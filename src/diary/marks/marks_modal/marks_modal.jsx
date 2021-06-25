import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './marks_modal.scss';

class MarksModal extends React.PureComponent {
  render() {
    const {
      lessons, indexMark, indexLesson, addMark, onEnter, isEdit, closeModal, editMark,
    } = this.props;
    const markValue = lessons[indexLesson].marks[indexMark];
    if (!isEdit) {
      return (
        <>
          <div className="background" />
          <div className="modal marks-modal">
            <FontAwesomeIcon id="sort" onClick={closeModal} icon={faTimes} />
            <div>
              date
              <input onKeyPress={onEnter} defaultValue="2021-06-25" className="marks-modal__date" required id="date" type="date" />
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
            <button onClick={addMark} type="button"> add</button>
          </div>
        </>
      );
    } return (
      <>
        <div className="background" />
        <div className="modal marks-modal">
          <FontAwesomeIcon id="sort" onClick={closeModal} icon={faTimes} />
          <div>
            date
            <input onKeyPress={onEnter} defaultValue={markValue.date} className="marks-modal__date" required id="date" type="date" />
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
          <button onClick={editMark} type="button">edit</button>
        </div>
      </>
    );
  }
}

export default MarksModal;
