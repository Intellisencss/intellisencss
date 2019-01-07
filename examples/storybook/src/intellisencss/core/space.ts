import { makeThemedAugmentation, ResponsiveProps, ThemedStyleGetter } from './utility';

export interface SpaceAugmentationProps {
  m: ResponsiveProps;
  mt: ResponsiveProps;
  mr: ResponsiveProps;
  mb: ResponsiveProps;
  ml: ResponsiveProps;
  mx: ResponsiveProps;
  my: ResponsiveProps;
}

interface SpaceAugmentationThemeProps {
  spacing: (string | number)[];
}

// const spaceStyleGetter: ThemedStyleGetter<SpaceThemeProps> = (prop, theme) =>
//   '';

const applySpace = (cssKeys: string[], space: string) =>
  cssKeys.reduce((acc, key) => {
    return `${acc}
    ${key}: ${space}
  `;
  }, '');

const makeSpaceStyleGetter: (
  ...keys: string[]
) => ThemedStyleGetter<SpaceAugmentationThemeProps> = (...cssKeys) => (
  propVal,
  theme
) => {
  if (Array.isArray(propVal)) {
    // TODO: this needs to be responsive
    return '';
  }

  if (typeof propVal === 'number') {
    // Check to see if this exists in the spaces array
    // otherwise assume they meant pixels

    const space = theme.spacing[propVal] || `${propVal}px`;

    // If this is still a number assume that the unit is pixels
    // TODO: Maybe pass in the fallback unit as config so rem, em etc can be done
    const finalSpace = typeof space === 'number' ? `${space}px` : space;

    return applySpace(cssKeys, finalSpace);
  }

  return '';
};

export const spaceAugmentation = makeThemedAugmentation<
  SpaceAugmentationProps,
  SpaceAugmentationThemeProps
>({
  m: {
    getStyle: makeSpaceStyleGetter('margin')
  },
  mt: {
    getStyle: makeSpaceStyleGetter('margin-top')
  },
  mr: {
    getStyle: makeSpaceStyleGetter('margin-right')
  },
  mb: {
    getStyle: makeSpaceStyleGetter('margin-bottom')
  },
  ml: {
    getStyle: makeSpaceStyleGetter('margin-left')
  },
  mx: {
    getStyle: makeSpaceStyleGetter('margin-left', 'margin-right')
  },
  my: {
    getStyle: makeSpaceStyleGetter('margin-top', 'margin-bottom')
  }
});
