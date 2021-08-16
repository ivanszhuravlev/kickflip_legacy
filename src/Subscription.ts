import {SequenceInstance} from './Sequence';
import {Data} from './types';
import {accelerationSteps} from './constants';

export const updateTemp = (sequence: SequenceInstance, data: Data) => {
  const {x, y, z, timestamp} = data;

  const temp = sequence.getTempData();
  const lastMove = temp[temp.length - 1];

  const filtered = lastMove
    ? sequence.filterNewMove(lastMove, {x, y, z, timestamp})
    : {x, y, z, timestamp};

  return sequence.saveToTemp(filtered);
};

export const checkVector = (sequence: SequenceInstance, temp: Data[]) => {
  if (temp.length < 2) return undefined;

  const acceleration = sequence.getVector(temp[0], temp[1]);

  // if (acceleration < accelerationSteps.hand) {
  //   console.log('still', acceleration);
  // } else {
  //   if (acceleration )
  // }
  if (acceleration > accelerationSteps.hand) {
    console.log('STUNT', acceleration, temp[0]);
    // if (acceleration <= accelerationSteps.hand) {
    //   return 
    // }
    return temp[0]
  }
};
