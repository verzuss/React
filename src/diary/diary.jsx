import React, { Component } from 'react';
import { faSortAlphaDown, faSortAmountDown } from '@fortawesome/free-solid-svg-icons';
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
      };
    } else {
      this.state = {
        lessons: [],
        isOpen: false,
        isEdit: false,
        editIndex: null,
      };
    }
    this.addLesson = this.addLesson.bind(this);
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
      });
      localStorage.setItem('lessons', JSON.stringify(lessons));
    }
  }

  toggleModal = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  }

  closeModal = () => {
    this.setState({
      isOpen: false,
      isEdit: false,
    });
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
      });
      localStorage.setItem('lessons', JSON.stringify(lessons));
    }
  }

  deleteLesson = (index) => {
    const { lessons } = this.state;
    lessons.splice(index, 1);
    this.setState({
      lessons,
    });
    localStorage.setItem('lessons', JSON.stringify(lessons));
  }

  onKeyPressHandler = (event) => {
    const { isEdit, editIndex } = this.state;
    if (event.code === 'Enter') {
      if (isEdit) {
        this.editLesson(editIndex);
      } else this.addLesson();
    }
  }

  render() {
    let { lessons } = this.state;
    const { isOpen, isEdit, editIndex } = this.state;
    if (localStorage.getItem('lessons')) {
      lessons = JSON.parse(localStorage.getItem('lessons'));
    }
    const lessonsRow = lessons.map((lesson, key) => (
      <Row
        name={lesson.name}
        teacher={lesson.teacher}
        marks={lesson.marks}
        index={key}
        onDel={() => this.deleteLesson(key)}
        editLesson={() => this.toggleEditModal(key)}
      />
    ));

    const lessonsModal = isOpen
      ? (
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
      )
      : null;
    return (
      <div className="container">
        <h1 className="header">Hello</h1>
        <button type="button" onClick={this.toggleModal} className="Add-row__btn">+</button>
        <div className="table">
          <ul className="table__row table__header">
            <li>
              Subject
              <FontAwesomeIcon id="sort" icon={faSortAlphaDown} />
            </li>
            <li>Teacher</li>
            <li className="column__mark">
              Mark
              <FontAwesomeIcon id="sort" icon={faSortAmountDown} />
            </li>
          </ul>
          { lessonsRow }
          { lessonsModal }
        </div>
      </div>
    );
  }
}

export default Diary;
