import React, {useEffect, useRef} from 'react';
import styled from 'styled-components/native';
import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';

import {Data} from './types';
import {Sequence} from './Sequence';
import {updateTemp, checkVector} from './Subscription';

const Container = styled.View`
  width: 100%;
  height: 100%;
  align-items: flex-end;
  justify-content: center;
`;

const Button = styled.TouchableOpacity`
  width: 160px;
  height: 240px;
  background-color: #0f00ff;

  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
`;

setUpdateIntervalForType(SensorTypes.accelerometer, 10);

export const Main = () => {
  // const subscription = gyroscope.subscribe(({x, y, z, timestamp}) =>
  //   console.log({x, y, z, timestamp}),
  // );
  let subscription;

  useEffect(() => {
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  let sequenceArr = [];

  const handlePress = () => {
    const sequence = Sequence();

    subscription = accelerometer.subscribe(({x, y, z, timestamp}) => {
      const newTemp = updateTemp(sequence, {x, y, z, timestamp});

      const stuntCoord = checkVector(sequence, newTemp);

      if (stuntCoord) {
        sequenceArr.push(stuntCoord);
      } else {
        sequenceArr.length ? console.log('SEQUENCEARRRRR', sequenceArr) : console.log('begin')
      }
      // console.table({x, y, z, timestamp});
      // console.table(filtered);
      // console.log('--------------');
    });
  };

  // console.log('subscription', subscription);
  return (
    <Container>
      <Button onPress={handlePress} />
    </Container>
  );
};
