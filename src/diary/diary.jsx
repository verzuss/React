import React, { Component } from 'react';
import { faSortAlphaDown, faSortAmountDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Row from './diary_row/diary_row';
import './diary.scss';

class Diary extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem('lessons')) {
      this.state = {
        lessons: JSON.parse(localStorage.getItem('lessons')),
      };
    } else {
      this.state = props;
    }
    this.addLesson = this.addLesson.bind(this);
  }

  addLesson = () => {
    const inputValueLessons = document.querySelector('#lesson').value;
    const inputValueTeacher = document.querySelector('#teacher').value;
    if (inputValueLessons.trim() && inputValueTeacher.trim()) {
      const { lessons } = this.state;
      const lesson = {};
      lesson.name = inputValueLessons;
      lesson.teacher = inputValueTeacher;
      lessons.push(lesson);
      this.setState({
        lessons,
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
    console.log(lessons);
    localStorage.setItem('lessons', JSON.stringify(lessons));
  }

  render() {
    let { lessons } = this.state;
    if (localStorage.getItem('lessons')) {
      lessons = JSON.parse(localStorage.getItem('lessons'));
    }
    return (
      <div className="container">
        <h1 className="header">Hello</h1>
        <button type="button" className="Add-row__btn">+</button>
        <input id="lesson" type="text" placeholder="lesson" />
        <input id="teacher" type="text" placeholder="teacher" />
        <button onClick={this.addLesson} type="button"> add</button>
        <div className="table">
          <ul className="table__row table__header">
            <li>
              Name
              <FontAwesomeIcon id="sort" icon={faSortAlphaDown} />
            </li>
            <li>Teacher</li>
            <li>
              Mark
              <FontAwesomeIcon id="sort" icon={faSortAmountDown} />
            </li>
          </ul>
          {lessons.map((lesson, index) => (
            <Row
              id={index}
              name={lesson.name}
              teacher={lesson.teacher}
              marks={lesson.marks}
              onDel={() => this.deleteLesson(index)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Diary;
