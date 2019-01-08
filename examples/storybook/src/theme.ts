import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';

type StringOrNumberArray = (string | number)[];

export interface ThemeInterface {
  breakpoints: StringOrNumberArray;
  space: StringOrNumberArray;
  colors: { [key: string]: string | string[] };
  fontSizes: StringOrNumberArray;
  fonts: string[] | { [key: string]: string[] };
}

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<ThemeInterface>;

export const theme: ThemeInterface = {
  breakpoints: ['40em', '52em', '64em'],
  fontSizes: [],
  fonts: {
    sans: ['Ubuntu Mono'],
    serif: []
  },
  space: [0, 4, 8, '4rem', 32, 64],
  colors: {
    red: ['#fe8c7d', '#f65b44', '#e80404', '#b50207', '#840107'],
    green: '#80BC00',
    blue: '#00B2E3',
    purple: '#A05CBF',
    yellow: '#F4B223'
  }
};

export { css, createGlobalStyle, keyframes, ThemeProvider };
export default styled;
