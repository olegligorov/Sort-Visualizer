import React from "react";
import './SortingVisualizer.css'
import {getMergeSortAnimations} from '../SortingAlgorithms/SortingAlgorithms';

const ANIMATION_TIME_MS = 1;
const NUMBER_OF_BARS = 250;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    }
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = []
    for (let i = 0; i < NUMBER_OF_BARS; ++i) {
      array.push(randomIntegerFromInterval(5, 800));
    }
    this.setState({
      array: array,
    });
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; ++i) {
      const arrayBars = document.getElementsByClassName('array-bar');
      // the animation array is consisted of triplets: [i, j], [i, j], [i, newHeight], 
      // i and j are indicies of the elements to be swapped(colored), newHeight is the new height for the ith element
      // every element with such index that index % 3 === 2 is a height swap array
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        let barOneStyle = arrayBars[barOneIdx].style;
        let barTwoStyle = arrayBars[barTwoIdx].style;

        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        // color the bars
        setTimeout(() => {
          barOneStyle.backgroundColor = color; 
          barTwoStyle.backgroundColor = color; 
        }, i * ANIMATION_TIME_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newBarOneHeight] = animations[i];
          let barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newBarOneHeight / 20}rem`;
        }, i * ANIMATION_TIME_MS);
      }
    }
  }

  quickSort() {

  }

  heapSort() {

  }

  bubbleSort() {

  }

  render() {
    const array = this.state.array;
    return (
      <div className="sorting-container">
        <header className="sorting-header">
          <div className="sorting-header-buttons">
            <button onClick={() => this.resetArray()}>Generate new array</button>
            <button onClick={() => this.mergeSort()}>Merge sort</button>
            <button onClick={() => this.quickSort()}>Quick sort</button>
            <button onClick={() => this.heapSort()}>Heap sort</button>
            <button onClick={() => this.bubbleSort()}>Bubble sort</button>
          </div>
        </header>
        <div className="array-container">
          {array.map((value, index) => (
            <div className="array-bar"
              key={index}
              style={{ height: `${value / 20}rem` }}></div>
          ))}
        </div>
      </div>
    );
  }
}

function randomIntegerFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}