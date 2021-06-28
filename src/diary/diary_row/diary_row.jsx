import React from 'react';
import { withRouter } from 'react-router';
import { faTrashAlt, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import './diary_row.scss';

class Row extends React.PureComponent {
  render() {
    const {
      name, teacher, onDel, editLesson, index, history, averageMark,
    } = this.props;
    return (
      <ul className="table__row">
        <li>{name}</li>
        <li>{teacher}</li>
        <li className="column__mark">
          {averageMark}
          <FontAwesomeIcon
            id="icon"
            onClick={() => history.push(`/marks/${index}`)}
            icon={faPlus}
          />
        </li>
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

Row.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  name: PropTypes.string.isRequired,
  averageMark: PropTypes.string.isRequired,
  teacher: PropTypes.string.isRequired,
  onDel: PropTypes.func.isRequired,
  editLesson: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default withRouter(Row);
