import React, { Component } from 'react';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './diary_row.scss';

class Row extends Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  calcMark = () => {
    const { marks } = this.state;
    const averageMark = marks
      ? marks
        .map((mark) => mark.mark)
        .reduce((accumulator, current) => +accumulator + +current, 0) / marks.length
      : 0;
    return averageMark.toFixed(2);
  }

  render() {
    console.log(this.state);
    const { name } = this.state;
    const { teacher } = this.state;
    const { onDel } = this.state;
    return (
      <ul className="table__row table__header">
        <li>
          {name}
        </li>
        <li>
          {teacher}
        </li>
        <li>
          {this.calcMark()}
        </li>
        <li>
          <FontAwesomeIcon id="sort" onClick={onDel} icon={faTrashAlt} />
        </li>
        <li>
          <FontAwesomeIcon id="sort" icon={faEdit} />
        </li>
      </ul>
    );
  }
}

export default Row;
