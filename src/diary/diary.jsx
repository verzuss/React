import React from 'react';
import { faSortAlphaDown, faSortAmountDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './diary.scss';

class Diary extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <h1 className="header">Hello</h1>
        <button type="button" className="Add-row__btn">+</button>
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
        </div>
      </div>
    );
  }
}

export default Diary;
