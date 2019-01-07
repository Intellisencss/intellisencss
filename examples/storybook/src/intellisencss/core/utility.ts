import { get } from 'lodash';
import styled, { StyledComponent } from 'styled-components';

export type ResponsiveProps = string | number | (string | number)[];

// interface StyleConfig<T> {
//   cssName: string;
//   propKeys: string[];
//   propKey: keyof T;
// }

// const propsCase = (text: string) => camel(text);

// export const makeStyleFunc = <T extends {}>(config: StyleConfig<T>) => (
//   props: any
// ) => {
//   const stylePropsKey = config.propKey || propsCase(config.cssName);

//   return props[stylePropsKey]
//     ? `${config.cssName}: ${props[stylePropsKey]}`
//     : null;
// };

export type Themed<T> = { theme: T };

export type ThemedStyleAugmentationFn<P, T> = (
  allProps: Partial<P> & Themed<T>
) => string;

export function augmentComponent<
  P,
  TA extends T,
  C extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
  T extends object,
  O extends object = {},
  A extends keyof any = never
>(
  styledComponent: StyledComponent<C, T, O, A>,
  styleAugmentation: ThemedStyleAugmentationFn<P, TA>
): StyledComponent<C, T, O & Partial<P>, A> {
  const augmented = styled(styledComponent)`
    ${styleAugmentation}
  `;

  return augmented as StyledComponent<C, T, O & Partial<P>, A>;
}

export function multiAugment<
  P1 extends {},
  TA1 extends T,
  P2 extends {},
  TA2 extends T,
  C extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
  T extends object,
  O extends object = {},
  A extends keyof any = never
>(
  styledComponent: StyledComponent<C, T, O, A>,
  styleAugmentations: [ThemedStyleAugmentationFn<P1, TA1>, ThemedStyleAugmentationFn<P2, TA2>]
): StyledComponent<C, T, O & Partial<P1 & P2>, A> {
  const augmented = styled(styledComponent)`
    ${styleAugmentations}
  `;

  return augmented as StyledComponent<C, T, O & Partial<P1 & P2>, A>;
}

type InferredPropsObject<T> = T extends infer U ? U : never; 

// type InferredTest = InferredPropsObject<ColorAugmentationProps>

export function multiAugment2<
  P extends {},
  TA extends T,
  U extends ThemedStyleAugmentationFn<InferredPropsObject<P>, TA>[],
  //X extends ThemedStyleAugmentationFn<InferredPropsObject<P>, TA>,



  C extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
  T extends object,
  O extends object = {},
  A extends keyof any = never
>(
  styledComponent: StyledComponent<C, T, O, A>,
  ...styleAugmentations: U
): StyledComponent<C, T, O & Partial<P>, A> {
  const augmented = styled(styledComponent)`
    ${styleAugmentations}
  `;

  return augmented as StyledComponent<C, T, O & Partial<P>, A>;
}

export function multiAug3<C extends keyof JSX.IntrinsicElements | React.ComponentType<any>, T extends {}, O extends {}, A extends keyof any = never>(styleComponent: StyledComponent<C, T, O, A>, styleaugmentations: (() => string)[]) {
  return styleaugmentations.reduce((acc: StyledComponent<C, T, O , A>, val) => augmentComponent(acc, val), styleComponent);
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

    const themeValue = get(subTheme, p);
    const result = themeValue ? `${cssKey}: ${themeValue}` : `${cssKey}: ${p}`;
    
    return result;
  };
}