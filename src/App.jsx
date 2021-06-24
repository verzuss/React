import './App.scss';
import React, { PureComponent } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Diary from './diary/diary';

class App extends PureComponent {
  render() {
    return (
      <>
        <Router>
          <div>
            <Route exact path="/">
              <Diary />
            </Route>
          </div>
        </Router>
      </>
    );
  }
}

export default App;
