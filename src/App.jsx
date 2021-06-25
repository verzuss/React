import './App.scss';
import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Diary from './diary/diary';
import Marks from './diary/marks/marks';

class App extends PureComponent {
  render() {
    return (
      <>
        <Router>
          <div>
            <Route exact path="/">
              <Diary />
            </Route>
            <Route path="/marks/:index">
              <Marks />
            </Route>
          </div>
        </Router>
      </>
    );
  }
}

export default App;
