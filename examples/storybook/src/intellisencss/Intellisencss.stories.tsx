import { storiesOf } from '@storybook/react';
import * as React from 'react';
import styled, { theme, ThemeProvider } from '../theme';
import { colorAugmentation, spaceAugmentation } from './core';
import { augmentComponent } from './core/utility';

const First = styled('div')<{ jesse?: string }>`
  font-size: 42px;
`;

const Second = augmentComponent(First, colorAugmentation);

const Third = augmentComponent(Second, spaceAugmentation);

(storiesOf('Intellisencss/Inception', module) as any).addWithJSX(
  'Playground',
  () => (
    <ThemeProvider theme={theme}>
      <div>
        <First color="blue">First</First>
        <Second color="">Second</Second>
        <Third ml={3} mr={2} bg="purple" color="black">
          I Have Evolved!
        </Third>
      </div>
    </ThemeProvider>
  )
);
