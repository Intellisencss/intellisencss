import { storiesOf } from '@storybook/react';
import * as React from 'react';
import styled, { theme, ThemeProvider } from '../theme';
import { colorAugmentation, spaceAugmentation } from './core';
import { augmentComponent, multiAugment, multiAugment2 } from './core/utility';

// type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

// type StringFunc = () => () => number

// type Test = ReturnType<StringFunc>

const First = styled('div')<{ jesse?: string }>`
  font-size: 42px;
`;

const Second = augmentComponent(First, colorAugmentation);

const Third = augmentComponent(Second, spaceAugmentation);

const Fourth = multiAugment(First, [colorAugmentation, spaceAugmentation]);

const Fifth = multiAugment2(First, [colorAugmentation, spaceAugmentation]);



(storiesOf('Intellisencss/Inception', module) as any).addWithJSX(
  'Playground',
  () => (
    <ThemeProvider theme={theme}>
      <div>
        <First>First</First>
        <Second bg="" color="">Second</Second>
        <Third ml={2} mr={3} my={1} bg="green" color="black">
          I Have Evolved!
        </Third>
        <Fourth ml={3} color="cyan" bg="yellow">
          Hi
        </Fourth>
        <Fifth color="blue" bg="red.1" ml={42}>
          Fifth
        </Fifth>
      </div>
    </ThemeProvider>
  )
);
