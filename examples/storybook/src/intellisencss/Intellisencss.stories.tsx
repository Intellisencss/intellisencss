import { object, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import styled, { theme, ThemeProvider } from '../theme';
import { wInfo } from '../utils';
import {
  colorAugmentation,
  fontFamilyAugmentation,
  fontSizeAugmentation,
  spaceAugmentation
} from './core';
import { ColorAugmentationProps } from './core/color';
import { augmentComponent, multiAugmentComponent } from './core/utility';
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

const PropsTest = (props: ColorAugmentationProps) => (
  <Fourth {...props as any} />
);

(storiesOf('Intellisencss/Inception', module) as any)
  .addWithJSX('Playground', () => (
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
      </div>
    </ThemeProvider>
  ))
  .addWithJSX(
    'And Another One',
    wInfo(``)(() => (
      <PropsTest color="blue" bg="black">
        Something In Here
      </PropsTest>
    ))
  );
