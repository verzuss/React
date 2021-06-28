import React, { Component } from 'react';
import {
  faSortAlphaDown,
  faSortAmountDown,
  faSortAlphaDownAlt,
  faSortAmountDownAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Row from './diary_row/diary_row';
import Modal from './modal/modal';
import './diary.scss';

class Diary extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem('lessons')) {
      this.state = {
        lessons: JSON.parse(localStorage.getItem('lessons')),
        isOpen: false,
        isEdit: false,
        editIndex: null,
        sortStatus: null,
      };
    } else {
      this.state = {
        lessons: [],
        isOpen: false,
        isEdit: false,
        editIndex: null,
        sortStatus: null,
      };
    }
    this.addLesson = this.addLesson.bind(this);
  }

  changeSortStatus = (sortType) => {
    const { sortStatus } = this.state;
    if (sortType === 'subjectSort') {
      if (sortStatus !== 'lessonsSort') {
        this.setState({
          sortStatus: 'lessonsSort',
        }, () => {
          this.sortArray();
        });
      } else {
        this.setState({
          sortStatus: 'lessonsSortReverse',
        }, () => {
          this.sortArray();
        });
      }
    }
    if (sortType === 'marksSort') {
      if (sortStatus !== 'marksSort') {
        this.setState({
          sortStatus: 'marksSort',
        }, () => {
          this.sortArray();
        });
      } else {
        this.setState({
          sortStatus: 'marksSortReverse',
        }, () => {
          this.sortArray();
        });
      }
    }
  }

  sortArray = () => {
    const { lessons, sortStatus } = this.state;
    if (sortStatus === 'lessonsSort') {
      lessons.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        return -1;
      });
    }
    if (sortStatus === 'lessonsSortReverse') {
      lessons.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return -1;
        }
        return 1;
      });
    }
    if (sortStatus === 'marksSort') {
      lessons.sort((a, b) => b.averageMark - a.averageMark);
    }
    if (sortStatus === 'marksSortReverse') {
      lessons.sort((a, b) => a.averageMark - b.averageMark);
    }
    this.setState({
      lessons,
    });
  }

  addLesson = () => {
    const inputValueLessons = document.querySelector('#lesson').value;
    const inputValueTeacher = document.querySelector('#teacher').value;
    if (inputValueLessons.trim() && inputValueTeacher.trim()) {
      const { lessons } = this.state;
      const { isOpen } = this.state;
      const lesson = {};
      lesson.name = inputValueLessons;
      lesson.teacher = inputValueTeacher;
      lesson.marks = [];
      lessons.push(lesson);
      this.setState({
        lessons,
        isOpen: !isOpen,
        sortStatus: null,
      });
    }
  };

  toggleModal = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };

  closeModal = () => {
    this.setState({
      isOpen: false,
      isEdit: false,
    });
  };

  toggleEditModal = (index) => {
    const { isEdit } = this.state;
    const { isOpen } = this.state;
    this.setState({
      editIndex: index,
      isOpen: !isOpen,
      isEdit: !isEdit,
    });
  };

  editLesson = (index) => {
    const inputValueLessons = document.querySelector('#lesson').value;
    const inputValueTeacher = document.querySelector('#teacher').value;
    if (inputValueLessons.trim() && inputValueTeacher.trim()) {
      const { isOpen, isEdit, lessons } = this.state;
      lessons[index].name = inputValueLessons;
      lessons[index].teacher = inputValueTeacher;
      this.setState({
        lessons,
        isOpen: !isOpen,
        editIndex: null,
        isEdit: !isEdit,
        sortStatus: null,
      });
    }
  };

  deleteLesson = (index) => {
    const { lessons } = this.state;
    lessons.splice(index, 1);
    this.setState({
      lessons,
    });
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
    const { lessons } = this.state;
    const {
      isOpen, isEdit, editIndex, sortStatus,
    } = this.state;
    localStorage.setItem('lessons', JSON.stringify(lessons));
    lessons.forEach((item, index) => {
      const averageMark = item.marks.length
        ? item.marks
          .map((note) => note.mark)
          .reduce((accumulator, current) => +accumulator + +current, 0)
          / item.marks.length
        : 0;
      lessons[index].averageMark = averageMark.toFixed(2);
    });

    const lessonsRow = lessons.map((lesson, key) => (
      <Row
        name={lesson.name}
        teacher={lesson.teacher}
        marks={lesson.marks}
        averageMark={lesson.averageMark}
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
        editLesson={() => this.editLesson(editIndex)}
        closeModal={this.closeModal}
        onEnter={this.onKeyPressHandler}
        isEdit={isEdit}
        index={editIndex}
      />
    ) : null;

    let sortLessonsIcon;
    if (sortStatus === 'lessonsSort') {
      sortLessonsIcon = <FontAwesomeIcon id="icon" className="active" icon={faSortAlphaDown} onClick={() => this.changeSortStatus('subjectSort')} />;
    } else if (sortStatus === 'lessonsSortReverse') {
      sortLessonsIcon = <FontAwesomeIcon id="icon" className="active" icon={faSortAlphaDownAlt} onClick={() => this.changeSortStatus('subjectSort')} />;
    } else {
      sortLessonsIcon = <FontAwesomeIcon id="icon" icon={faSortAlphaDown} onClick={() => this.changeSortStatus('subjectSort')} />;
    }

    let sortMarksIcon;
    if (sortStatus === 'marksSort') {
      sortMarksIcon = <FontAwesomeIcon id="icon" className="active" icon={faSortAmountDown} onClick={() => this.changeSortStatus('marksSort')} />;
    } else if (sortStatus === 'marksSortReverse') {
      sortMarksIcon = <FontAwesomeIcon id="icon" className="active" icon={faSortAmountDownAlt} onClick={() => this.changeSortStatus('marksSort')} />;
    } else {
      sortMarksIcon = <FontAwesomeIcon id="icon" icon={faSortAmountDown} onClick={() => this.changeSortStatus('marksSort')} />;
    }

    return (
      <div className="container">
        <h1 className="header">Diary</h1>
        <button
          type="button"
          onClick={this.toggleModal}
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

export default Diary;
