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
    if (localStorage.getItem('lessons')) {
      this.state = {
        lessons: JSON.parse(localStorage.getItem('lessons')),
        editIndex: null,
      };
    }
  }

  componentDidUpdate() {
    const { lessons } = this.state;
    localStorage.setItem('lessons', JSON.stringify(lessons));
  }

  addMark = (date, mark) => {
    if (date.trim()) {
      const { lessons } = this.state;
      const { match, closeModal } = this.props;
      const note = {};
      note.date = date;
      note.mark = mark;
      note.id = Date.now();
      lessons[match.params.index].marks.push(note);
      this.setState({
        lessons,
      });
      closeModal();
    }
  }

  editMark = (editIndex, date, mark) => {
    if (date.trim()) {
      const { lessons } = this.state;
      const { match, closeModal } = this.props;
      lessons[match.params.index].marks[editIndex].date = date;
      lessons[match.params.index].marks[editIndex].mark = mark;
      this.setState({
        lessons,
        editIndex: null,
      });
      closeModal();
    }
  }

  deleteMark = (indexDel) => {
    const { lessons } = this.state;
    const { match } = this.props;
    lessons[match.params.index].marks.splice(indexDel, 1);
    this.setState({
      lessons,
    });
  }

  toggleEditModal = (index) => {
    const { openEditModal } = this.props;
    this.setState({
      editIndex: index,
    });
    openEditModal();
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
      lessons, editIndex,
    } = this.state;
    const {
      isOpen, isEdit, openModal, closeModal,
    } = this.props;
    const { match, history } = this.props;
    const marksRow = lessons[match.params.index].marks.map((item, key) => (
      <MarksRow
        mark={item.mark}
        date={item.date}
        index={key}
        onDel={() => this.deleteMark(key)}
        editLesson={() => this.toggleEditModal(key)}
        key={item.id}
      />
    ));

    const marksModal = isOpen ? (
      <MarksModal
        lessons={lessons}
        addMark={(date, mark) => this.addMark(date, mark)}
        editMark={(date, mark) => this.editMark(editIndex, date, mark)}
        closeModal={closeModal}
        onEnter={this.onKeyPressHandler}
        isEdit={isEdit}
        indexMark={editIndex || 0}
        indexLesson={match.params.index}
        dateInput={this.dateInput}
        markInput={this.markInput}
      />
    )
      : null;
    return (
      <div className="container">
        <h1 className="header">Marks</h1>
        <button type="button" onClick={() => history.push('/')} className="Add-row__btn marks__home">
          <FontAwesomeIcon id="home" icon={faHome} />
        </button>
        <button type="button" onClick={openModal} className="Add-row__btn">+</button>
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
  closeModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  openEditModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired,
};

export default withRouter(Marks);
