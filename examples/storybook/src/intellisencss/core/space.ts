import { get } from 'lodash';
import {
  makeThemedAugmentation,
  ResponsiveProps,
  ResponsiveTheme,
  ThemedStyleGetter
} from './utility';

export interface SpaceAugmentationProps {
  m: ResponsiveProps;
  mt: ResponsiveProps;
  mr: ResponsiveProps;
  mb: ResponsiveProps;
  ml: ResponsiveProps;
  mx: ResponsiveProps;
  my: ResponsiveProps;
  p: ResponsiveProps;
  pt: ResponsiveProps;
  pr: ResponsiveProps;
  pb: ResponsiveProps;
  pl: ResponsiveProps;
  px: ResponsiveProps;
  py: ResponsiveProps;
}

interface SpaceAugmentationThemeProps extends ResponsiveTheme {
  space: (string | number)[];
}

const applySpace = (cssKeys: string[], space: string) =>
  cssKeys.reduce((acc, key) => {
    return `${acc}
    ${key}: ${space}
  `;
  }, '');

const makeSpaceStyleGetter: (
  ...keys: string[]
) => ThemedStyleGetter<SpaceAugmentationThemeProps> = (...cssKeys) => (
  key,
  propVal,
  theme
) => {
  if (!propVal) {
    return '';
  }

  if (Array.isArray(propVal)) {
    // TODO: this needs to be responsive
    return '';
  }

  const themeValue = get(theme.space, propVal);

  const actualValue =
    themeValue != null
      ? Number(themeValue)
        ? `${themeValue}px`
        : themeValue
      : Number(propVal)
      ? `${propVal}px`
      : (propVal as string);

  return applySpace(cssKeys, actualValue);
};

export const spaceAugmentation = makeThemedAugmentation<
  SpaceAugmentationProps,
  SpaceAugmentationThemeProps
>({
  m: makeSpaceStyleGetter('margin'),
  mt: makeSpaceStyleGetter('margin-top'),
  mr: makeSpaceStyleGetter('margin-right'),
  mb: makeSpaceStyleGetter('margin-bottom'),
  ml: makeSpaceStyleGetter('margin-left'),
  mx: makeSpaceStyleGetter('margin-left', 'margin-right'),
  my: makeSpaceStyleGetter('margin-top', 'margin-bottom'),
  p: makeSpaceStyleGetter('padding'),
  pt: makeSpaceStyleGetter('padding-top'),
  pr: makeSpaceStyleGetter('padding-right'),
  pb: makeSpaceStyleGetter('padding-bottom'),
  pl: makeSpaceStyleGetter('padding-left'),
  px: makeSpaceStyleGetter('padding-left', 'padding-right'),
  py: makeSpaceStyleGetter('padding-top', 'padding-bottom')
});
