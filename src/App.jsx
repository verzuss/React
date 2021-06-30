import './App.scss';
import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Diary from './diary/diary';
import Marks from './marks/marks';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isEdit: false,
    };
  }

  openEditModal = () => {
    this.setState({
      isOpen: true,
      isEdit: true,
    });
  }

  closeModal = () => {
    this.setState({
      isOpen: false,
      isEdit: false,
    });
  }

  openModal = () => {
    this.setState({
      isOpen: true,
    });
  }

  render() {
    const { isEdit, isOpen } = this.state;
    return (
      <>
        <Router>
          <div>
            <Route exact path="/">
              <Diary
                isOpen={isOpen}
                isEdit={isEdit}
                openModal={this.openModal}
                openEditModal={this.openEditModal}
                closeModal={this.closeModal}
              />
            </Route>
            <Route path="/marks/:index">
              <Marks
                isOpen={isOpen}
                isEdit={isEdit}
                openModal={this.openModal}
                openEditModal={this.openEditModal}
                closeModal={this.closeModal}
              />
            </Route>
          </div>
        </Router>
      </>
    );
  }
}

export default App;
