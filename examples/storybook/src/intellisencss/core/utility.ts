import { camel } from 'change-case';
import { get } from 'lodash';
import styled, { StyledComponent } from 'styled-components';

export type ResponsiveProps = string | number | (string | number)[];

interface StyleConfig<T> {
  cssName: string;
  propKeys: string[];
  propKey: keyof T;
}

const propsCase = (text: string) => camel(text);

export const makeStyleFunc = <T extends {}>(config: StyleConfig<T>) => (
  props: any
) => {
  const stylePropsKey = config.propKey || propsCase(config.cssName);

  return props[stylePropsKey]
    ? `${config.cssName}: ${props[stylePropsKey]}`
    : null;
};

export type Themed<T> = { theme: T };

export type ThemedStyleAugmentationFn<P, T> = (
  allProps: P & Themed<T>
) => string;

export function augmentComponent<
  P,
  TA,
  C extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
  T extends object,
  O extends object = {},
  A extends keyof any = never
>(
  styledComponent: StyledComponent<C, T, O, A>,
  styleAugmentation: ThemedStyleAugmentationFn<P, TA>
): StyledComponent<C, T & TA, O & Partial<P>, A> {
  const augmented = styled(styledComponent)`
    ${styleAugmentation}
  `;

  return augmented as StyledComponent<C, T, O & Partial<P>, A>;
}

export type AugmentationConfig<P, T> = { [K in keyof P]: PropConfig<T> };

export type ThemedStyleGetter<T> = (
  propVal: ResponsiveProps,
  theme: T
) => string;

export interface PropConfig<T> {
  transformFn?: () => string;
  getStyle: ThemedStyleGetter<T>;
}

export function makeThemedAugmentation<P, T>(
  config: AugmentationConfig<P, T>
): ThemedStyleAugmentationFn<P, T> {
  return props => {
    // 1. find all props that have been set which match keys from config
    // 2. for those with values, execute and return the style get func attached

    const configKeys = Object.keys(config);
    const propsWithValues = Object.keys(props).filter(x =>
      configKeys.includes(x)
    );

    const applied = propsWithValues.reduce((acc, key) => {
      const propConfig: PropConfig<T> = config[key];

      return `${acc}
        ${propConfig.getStyle(props[key], props.theme)}
      `;
    }, '');

    return applied;
  };
}

export function makeStyleGetter<T>(
  cssKey: string,
  themeSelector: (theme: { [key: string]: T }) => T
): ThemedStyleGetter<T> {
  return (p, t) => {
    const subTheme = themeSelector(t as any);

    if (Array.isArray(p)) {
      return '';
    }

    console.log(subTheme);
    const themeValue = get(subTheme, p);
    const result = themeValue ? `${cssKey}: ${themeValue}` : `${cssKey}: ${p}`;
    console.log(result);
    return result;
  };
}

// const mapped = [['mb', 'margin-bottom'], ['mb', 'margin-bottom']];

// const mappedThing: AugmentationConfig<SpaceProps, any> = mapped.reduce(
//   (a, b) => {
//     return {
//       ...a,
//       [b[0]]: {
//         getStyle: (p: any, t: any) => `${b[1]}: ${p}`
//       }
//     };
//   },
//   {}
// );

// const spaceStyleGetter: ThemedStyleGetter<SpaceThemeProps> = (
//   propValue,
//   theme
// ) => {};

// const spaceAugmentation = makeThemedAugmentation<SpaceProps, SpaceThemeProps>({
//   mt: {
//     getStyle: () => {}
//   }
// });

// console.log(mappedThing);
