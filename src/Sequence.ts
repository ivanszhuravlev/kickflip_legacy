import {Data} from './types';

interface State {
  tempData: Data[];
}

export interface SequenceInstance {
  saveToTemp: (move: Data) => Data[];
  getTempData: () => Data[];
  filterMovingAverage: (
    prevFiltered: number,
    current: number,
    ratio: number,
  ) => number;
  filterNewMove: (prevMove: Data, move: Data) => Data;
  getVector: (prevMove: Data, move: Data) => number;
}

export const Sequence = () => {
  const tempBufferLength = 2;
  const state: State = {
    tempData: [],
  };

  const instance: SequenceInstance = {
    saveToTemp: function ({x, y, z, timestamp}: Data) {
      const safeBuffer = tempBufferLength - 1;
      const prevData = state.tempData;

      const slicedData =
        prevData.length < safeBuffer
          ? prevData
          : prevData.slice(prevData.length - safeBuffer);

      const newData = [...slicedData, {x, y, z, timestamp}];

      state.tempData = newData;

      return state.tempData;
    },
    getTempData: function () {
      return state.tempData;
    },
    filterMovingAverage: function (
      prevFiltered: number,
      current: number,
      ratio: number,
    ) {
      return prevFiltered + ratio * (current - prevFiltered);
    },
    filterNewMove: function (prevMove: Data, move: Data): Data {
      const {timestamp, ...coords} = move;

      const [x, y, z] = (Object.keys(coords) as Array<
        keyof typeof coords
      >).reduce(
        (acc: number[], key) => [
          ...acc,
          this.filterMovingAverage(prevMove[key], move[key], 0.4),
        ],
        [],
      );

      return {x, y, z, timestamp};
    },
    getVector: function (prevMove: Data, move: Data) {
      const {timestamp, ...coords} = move;

      const [x, y, z] = (Object.keys(coords) as Array<
        keyof typeof coords
      >).reduce(
        (acc: number[], key) => [
          ...acc,
          Math.pow(move[key] - prevMove[key], 2),
        ],
        [],
      );

      return Math.sqrt(x + y + z);
    },
  };

  return instance;
};
