import './App.scss';
import React, { Component } from 'react';
import Diary from './diary/diary';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: [
        // {
        //   name: 'English',
        //   teacher: 'Ivanov Ivan',
        //   marks: [
        //     {
        //       date: Date(),
        //       mark: 5,
        //     },
        //     {
        //       date: Date(),
        //       mark: 5,
        //     },
        //     {
        //       date: Date(),
        //       mark: 5,
        //     },
        //   ],
        // },
        // {
        //   name: 'Math',
        //   teacher: 'Olegov Oleg',
        //   marks: [
        //     {
        //       date: Date(),
        //       mark: 4,
        //     },
        //     {
        //       date: Date(),
        //       mark: 3,
        //     },
        //     {
        //       date: Date(),
        //       mark: 3,
        //     },
        //   ],
        // },
        // {
        //   name: 'History',
        //   teacher: 'Danilov Daniil',
        //   marks: [
        //     {
        //       date: Date(),
        //       mark: 5,
        //     },
        //     {
        //       date: Date(),
        //       mark: 5,
        //     },
        //     {
        //       date: Date(),
        //       mark: 4,
        //     },
        //   ],
        // },
      ],
    };
  }

  render() {
    const { lessons } = this.state;

    return (
      <>
        <Diary lessons={lessons} />
      </>
    );
  }
}

export default App;
