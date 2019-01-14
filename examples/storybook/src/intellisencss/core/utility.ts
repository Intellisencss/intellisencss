import { paramCase } from 'change-case';
import { get } from 'lodash';
import * as React from 'react';
import styled, { StyledComponent } from 'styled-components';

export type ResponsiveProps = string | number | (string | number)[];

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

export type AugmentationConfig<P, T> = { [K in keyof P]: ThemedStyleGetter<T> };

export type ThemedStyleGetter<T> = (
  key: string,
  propVal: ResponsiveProps,
  theme: T
) => string;

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
      const themeStyleGetter: ThemedStyleGetter<T> = config[key];

      return `${acc}
        ${themeStyleGetter(key, props[key], props.theme)}
      `;
    }, '');

    return applied;
  };
}

export function makeResponsiveStyleGetter<
  T extends { breakpoints: (string | number)[] }
>(
  themeSelector: (theme: { [key: string]: T }) => T = ({ theme }) => theme,
  cssKey: string | undefined = undefined
): ThemedStyleGetter<T> {
  return (propKey, propVal, theme) => {
    if (!propVal) {
      return ``;
    }

    const cssTarget = cssKey || paramCase(propKey);
    const themeSlice = themeSelector(theme as any);

    if (Array.isArray(propVal)) {
      return '';
    }

    const themeValue = get(themeSlice, propVal);
    const result = themeValue
      ? `${cssTarget}: ${themeValue}`
      : `${cssTarget}: ${fallbackToPx(propVal)}`;

    return result;
  };
}

export interface ResponsiveTheme {
  breakpoints: (string | number)[];
}

type PfromSA<SA extends Array<ThemedStyleAugmentationFn<any, any>>> = {
  [K in keyof SA]: SA[K] extends ThemedStyleAugmentationFn<infer P, any>
    ? (x: P) => void
    : never
} extends { [k: number]: (x: infer P) => void }
  ? P
  : never;

type SAExtendsTProperly<
  SA extends Array<ThemedStyleAugmentationFn<any, any>>,
  T
> = {
  [K in keyof SA]: SA[K] extends ThemedStyleAugmentationFn<any, infer U>
    ? [U] extends [T]
      ? SA[K]
      : ThemedStyleAugmentationFn<any, T>
    : never
};

export function multiAugmentComponent<
  SA extends Array<ThemedStyleAugmentationFn<any, any>>,
  C extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
  T extends object,
  O extends object = {},
  A extends keyof any = never
>(
  styledComponent: StyledComponent<C, T, O, A>,
  ...styleAugmentations: SA & SAExtendsTProperly<SA, T>
): StyledComponent<C, T, O & Partial<PfromSA<SA>>, A> {
  const augmented = styled(styledComponent)`
    ${styleAugmentations}
  `;

  return augmented as StyledComponent<C, T, O & Partial<PfromSA<SA>>, A>;
}

export function extendComponent<
  C extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
  T extends object,
  O extends object = {},
  A extends keyof any = never
>(component: StyledComponent<C, T, O, A>, defaults: Partial<O>) {
  const extended = React.forwardRef((props, ref) => {
    return React.createElement(component as any, { ...props, ref });
  });

  extended.defaultProps = {
    ...(component.defaultProps as any),
    ...defaults
  };

  return extended as StyledComponent<C, T, O, A>;
}

export const fallbackToPx = (n: string | number) => (Number(n) ? n + 'px' : n);
export const createMediaQuery = (n: string | number) =>
  `@media screen and (min-width: ${fallbackToPx(n)})`;
