import React, { Component } from 'react';
import {
  faSortAlphaDown,
  faSortAmountDown,
  faSortAlphaDownAlt,
  faSortAmountDownAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import Row from './diary_row/diary_row';
import Modal from './modal/modal';
import './diary.scss';

class Diary extends Component {
  constructor(props) {
    super(props);
    const storageData = localStorage.getItem('lessons');
    this.state = {
      lessons: storageData ? JSON.parse(storageData) : [],
      editIndex: null,
      sortStatus: null,
    };
    this.addLesson = this.addLesson.bind(this);
  }

  componentDidUpdate() {
    const { lessons } = this.state;
    localStorage.setItem('lessons', JSON.stringify(lessons));
  }

  changeSortStatus = (sortType) => {
    const { sortStatus } = this.state;
    if (sortType === 'subjectSort') {
      if (sortStatus !== 'lessonsSort') {
        this.setState({
          sortStatus: 'lessonsSort',
        });
      } else {
        this.setState({
          sortStatus: 'lessonsSortReverse',
        });
      }
    } else if (sortType === 'marksSort') {
      if (sortStatus !== 'marksSort') {
        this.setState({
          sortStatus: 'marksSort',
        });
      } else {
        this.setState({
          sortStatus: 'marksSortReverse',
        });
      }
    }
  }

  sortArray = () => {
    const { sortStatus } = this.state;
    let { lessons } = this.state;
    lessons = lessons.map((lesson) => ({
      ...lesson,
      averageMark: lesson.marks.length
        ? (lesson.marks
          .map((note) => note.mark)
          .reduce((accumulator, current) => +accumulator + +current, 0)
            / lesson.marks.length).toFixed(2)
        : '0.00',
    }));
    switch (sortStatus) {
      case 'lessonsSort':
        return lessons.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          return -1;
        });

      case 'lessonsSortReverse':
        return lessons.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return -1;
          }
          return 1;
        });

      case 'marksSort':
        return lessons.sort((a, b) => b.averageMark - a.averageMark);

      case 'marksSortReverse':
        return lessons.sort((a, b) => a.averageMark - b.averageMark);

      default:
        return lessons;
    }
  }

  addLesson = (inputValueLessons, inputValueTeacher) => {
    const { lessons } = this.state;
    const { closeModal } = this.props;
    if (inputValueLessons.trim() && inputValueTeacher.trim()) {
      this.setState({
        lessons: [
          ...lessons,
          {
            name: inputValueLessons,
            teacher: inputValueTeacher,
            averageMark: '0.00',
            marks: [],
            id: Date.now(),
          },
        ],
        sortStatus: null,
      });
      closeModal();
    }
  };

  editLesson = (index, inputValueLessons, inputValueTeacher) => {
    if (inputValueLessons.trim() && inputValueTeacher.trim()) {
      const { lessons } = this.state;
      const { closeModal } = this.props;
      lessons[index].name = inputValueLessons;
      lessons[index].teacher = inputValueTeacher;
      this.setState({
        lessons,
        editIndex: null,
        sortStatus: null,
      });
      closeModal();
    }
  };

  deleteLesson = (index) => {
    const { lessons } = this.state;
    lessons.splice(index, 1);
    this.setState({
      lessons,
    });
  };

  toggleEditModal = (index) => {
    const { openEditModal } = this.props;
    this.setState({
      editIndex: index,
    });
    openEditModal();
  };

  onKeyPressHandler = (event) => {
    const { isEdit, editIndex } = this.state;
    if (event.code === 'Enter') {
      if (isEdit) {
        this.editLesson(editIndex);
      } else this.addLesson();
    }
  };

  render() {
    const { lessons, editIndex, sortStatus } = this.state;
    const {
      isOpen, isEdit, openModal, closeModal,
    } = this.props;

    const lessonsRow = this.sortArray().map((lesson, key) => (
      <Row
        name={lesson.name}
        teacher={lesson.teacher}
        marks={lesson.marks}
        averageMark={lesson.averageMark}
        key={lesson.id}
        index={key}
        onDel={() => this.deleteLesson(key)}
        editLesson={() => this.toggleEditModal(key)}
      />
    ));

    const lessonsModal = isOpen ? (
      <Modal
        lessons={lessons}
        toggleModal={this.toggleModal}
        addLesson={this.addLesson}
        editLesson={
          (valueLessonInput, valueTeacherInput) => {
            this.editLesson(editIndex, valueLessonInput, valueTeacherInput);
          }
        }
        closeModal={closeModal}
        onEnter={this.onKeyPressHandler}
        isEdit={isEdit}
        index={editIndex || 0}
      />
    ) : null;

    let sortLessonsIcon;
    switch (sortStatus) {
      case 'lessonsSort':
        sortLessonsIcon = (
          <FontAwesomeIcon
            id="icon"
            className="active"
            icon={faSortAlphaDown}
            onClick={() => this.changeSortStatus('subjectSort')}
          />
        );
        break;

      case 'lessonsSortReverse':
        sortLessonsIcon = (
          <FontAwesomeIcon
            id="icon"
            className="active"
            icon={faSortAlphaDownAlt}
            onClick={() => this.changeSortStatus('subjectSort')}
          />
        );
        break;

      default:
        sortLessonsIcon = (
          <FontAwesomeIcon
            id="icon"
            icon={faSortAlphaDown}
            onClick={() => this.changeSortStatus('subjectSort')}
          />
        );
        break;
    }

    let sortMarksIcon;
    switch (sortStatus) {
      case 'marksSort':
        sortMarksIcon = (
          <FontAwesomeIcon
            id="icon"
            className="active"
            icon={faSortAmountDown}
            onClick={() => this.changeSortStatus('marksSort')}
          />
        );
        break;

      case 'marksSortReverse':
        sortMarksIcon = (
          <FontAwesomeIcon
            id="icon"
            className="active"
            icon={faSortAmountDownAlt}
            onClick={() => this.changeSortStatus('marksSort')}
          />
        );
        break;

      default:
        sortMarksIcon = (
          <FontAwesomeIcon
            id="icon"
            icon={faSortAmountDown}
            onClick={() => this.changeSortStatus('marksSort')}
          />
        );
        break;
    }

    return (
      <div className="container">
        <h1 className="header">Diary</h1>
        <button
          type="button"
          onClick={openModal}
          className="Add-row__btn"
        >
          +
        </button>
        <div className="table">
          <ul className="table__row table__header">
            <li>
              Subject
              {sortLessonsIcon}
            </li>
            <li>Teacher</li>
            <li className="column__mark">
              Mark
              {sortMarksIcon}
            </li>
          </ul>
          {lessonsRow}
          {lessonsModal}
        </div>
      </div>
    );
  }
}

Diary.propTypes = {
  closeModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  openEditModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired,
};

export default Diary;
