import { object, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import styled, { theme, ThemeProvider } from '../theme';
import {
  colorAugmentation,
  fontFamilyAugmentation,
  fontSizeAugmentation,
  spaceAugmentation
} from './core';
import {
  augmentComponent,
  extendComponent,
  multiAugmentComponent
} from './core/utility';
const First = styled('div')<{ jesse?: string }>`
  font-size: 42px;
`;

const Second = augmentComponent(First, colorAugmentation);

const Third = augmentComponent(Second, spaceAugmentation);

const Fourth = multiAugmentComponent(
  First,
  colorAugmentation,
  spaceAugmentation,
  fontSizeAugmentation,
  fontFamilyAugmentation
);

const Fifth = extendComponent(Fourth, {
  bg: 'blue',
  color: 'silver',
  p: 2,
  my: 3
});

const Sixth = extendComponent(Fifth, {
  fontFamily: 'sans'
});

(storiesOf('Intellisencss/Inception', module) as any).addWithJSX(
  'Playground',
  () => (
    <ThemeProvider theme={object('theme', theme)}>
      <div>
        <First>First</First>
        <Second bg="" color="">
          Second
        </Second>
        <Third mr={3} bg="green" color="black">
          I Have Evolved!
        </Third>
        <Fourth
          m={text('m', '2')}
          p={text('p', '2')}
          color={text('color', 'cyan')}
          bg={text('bg', 'yellow')}
          fontSize={text('fontSize', '32')}
          fontFamily={text('fontFamily', 'sans.0')}
        >
          Customized Component
        </Fourth>
        <Fifth>Extended Component</Fifth>
        <Fifth p="4">Extended Component Customized</Fifth>
        <Sixth>Extended Extended</Sixth>
      </div>
    </ThemeProvider>
  )
);
