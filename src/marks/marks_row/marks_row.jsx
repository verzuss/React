import React from 'react';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes } from 'prop-types';
import './marks_row.scss';

class MarksRow extends React.PureComponent {
  render() {
    const {
      mark, date, onDel, editLesson,
    } = this.props;
    return (
      <ul className="table__row">
        <li>{date}</li>
        <li>{mark}</li>
        <li className="column__icon">
          <FontAwesomeIcon id="icon" onClick={onDel} icon={faTrashAlt} />
        </li>
        <li className="column__icon">
          <FontAwesomeIcon id="icon" onClick={editLesson} icon={faEdit} />
        </li>
      </ul>
    );
  }
}

MarksRow.propTypes = {
  mark: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onDel: PropTypes.func.isRequired,
  editLesson: PropTypes.func.isRequired,
};

export default MarksRow;
