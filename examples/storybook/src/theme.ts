import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';

export interface ThemeInterface {
  spacing: (string | number)[];
  colors: { [key: string]: string | string[] };
}

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<ThemeInterface>;

export const  theme: ThemeInterface = {
  spacing: [0, 1, 2, '50rem', 4, 5],
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
