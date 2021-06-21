import './App.scss';
import React from 'react';
import Diary from './diary/diary';

class App extends React.PureComponent {
  render() {
    return (
      <>
        <Diary />
      </>
    );
  }
}

export default App;
