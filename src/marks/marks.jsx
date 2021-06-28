import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes } from 'prop-types';
import MarksRow from './marks_row/marks_row';
import MarksModal from './marks_modal/marks_modal';
import './marks.scss';

class Marks extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    if (localStorage.getItem('lessons')) {
      this.state = {
        lessons: JSON.parse(localStorage.getItem('lessons')),
        isOpen: false,
        isEdit: false,
        editIndex: null,
        index: match.params.index,
      };
    }
  }

  addMark = () => {
    const inputValueDate = document.querySelector('.marks-modal__date').value;
    if (inputValueDate.trim()) {
      const { lessons, index } = this.state;
      const { isOpen } = this.state;
      const note = {};
      note.date = inputValueDate;
      note.mark = document.querySelector('.marks-modal__mark').value;
      lessons[index].marks.push(note);
      this.setState({
        lessons,
        isOpen: !isOpen,
      });
    }
  }

  toggleEditModal = (index) => {
    const { isEdit } = this.state;
    const { isOpen } = this.state;
    this.setState({
      editIndex: index,
      isOpen: !isOpen,
      isEdit: !isEdit,
    });
  }

  editMark = (editIndex) => {
    const inputValueDate = document.querySelector('.marks-modal__date').value;
    if (inputValueDate.trim()) {
      const {
        isOpen, isEdit, lessons, index,
      } = this.state;
      lessons[index].marks[editIndex].date = inputValueDate;
      lessons[index].marks[editIndex].mark = document.querySelector('.marks-modal__mark').value;
      this.setState({
        lessons,
        isOpen: !isOpen,
        editIndex: null,
        isEdit: !isEdit,
      });
    }
  }

  deleteMark = (indexDel) => {
    const { lessons, index } = this.state;
    lessons[index].marks.splice(indexDel, 1);
    this.setState({
      lessons,
    });
  }

  closeModal = () => {
    this.setState({
      isOpen: false,
      isEdit: false,
    });
  }

  toggleModal = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  }

  onKeyPressHandler = (event) => {
    const { isEdit, editIndex } = this.state;
    if (event.code === 'Enter') {
      if (isEdit) {
        this.editMark(editIndex);
      } else this.addMark();
    }
  }

  render() {
    const {
      lessons, index, isOpen, isEdit, editIndex,
    } = this.state;
    const { history } = this.props;
    localStorage.setItem('lessons', JSON.stringify(lessons));
    const marksRow = lessons[index].marks.map((item, key) => (
      <MarksRow
        mark={item.mark}
        date={item.date}
        index={key}
        onDel={() => this.deleteMark(key)}
        editLesson={() => this.toggleEditModal(key)}
      />
    ));

    const marksModal = isOpen ? (
      <MarksModal
        lessons={lessons}
        addMark={this.addMark}
        editMark={() => this.editMark(editIndex)}
        closeModal={this.closeModal}
        onEnter={this.onKeyPressHandler}
        isEdit={isEdit}
        indexMark={editIndex}
        indexLesson={index}
      />
    )
      : null;
    return (
      <div className="container">
        <h1 className="header">Marks</h1>
        <button type="button" onClick={() => history.push('/')} className="Add-row__btn marks__home">
          <FontAwesomeIcon id="home" icon={faHome} />
        </button>
        <button type="button" onClick={this.toggleModal} className="Add-row__btn">+</button>
        <div className="table">
          <ul className="table__row table__header">
            <li>Date</li>
            <li>Mark</li>
          </ul>
          { marksRow }
          { marksModal }
        </div>
      </div>
    );
  }
}

Marks.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

export default withRouter(Marks);
