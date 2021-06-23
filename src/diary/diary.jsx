import React, { Component } from 'react';
import { faSortAlphaDown, faSortAmountDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Row from './diary_row/diary_row';
import './diary.scss';

class Diary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: JSON.parse(localStorage.getItem('lessons')),
    };
    this.addLesson = this.addLesson.bind(this);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(nextProps, nextState);
  //   return true;
  // }

  addLesson = () => {
    if (document.querySelector('#lesson').value.trim()) {
      const { lessons } = this.state;
      const lesson = {};
      lesson.name = document.querySelector('#lesson').value;
      lesson.teacher = document.querySelector('#teacher').value;
      lessons.push(lesson);
      console.log(lesson);
      console.log(lessons);
      this.setState({
        lessons,
      });
      localStorage.setItem('lessons', JSON.stringify(lessons));
    }
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
          {lessons.map((lesson) => (
            <Row
              name={lesson.name}
              teacher={lesson.teacher}
              marks={lesson.marks}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Diary;
