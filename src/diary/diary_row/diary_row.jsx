/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './diary_row.scss';

class Row extends Component {
  calcMark = () => {
    const { marks } = this.props;
    const averageMark = marks
      ? marks
        .map((mark) => mark.mark)
        .reduce((accumulator, current) => +accumulator + +current, 0) / marks.length
      : 0;
    return averageMark.toFixed(2);
  }

  render() {
    const {
      name, teacher, onDel, editLesson,
    } = this.props;
    return (
      <ul className="table__row">
        <li>
          {name}
        </li>
        <li>
          {teacher}
        </li>
        <li className="column__mark">
          {this.calcMark()}
        </li>
        <li className="column__icon">
          <FontAwesomeIcon id="sort" onClick={onDel} icon={faTrashAlt} />
        </li>
        <li className="column__icon">
          <FontAwesomeIcon id="sort" onClick={editLesson} icon={faEdit} />
        </li>
      </ul>
    );
  }
}

export default Row;
