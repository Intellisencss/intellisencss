import {
  makeResponsiveStyleGetter,
  makeThemedAugmentation,
  ResponsiveProps,
  ResponsiveTheme
} from './utility';

export interface ColorAugmentationProps {
  /** this dictates what the button will say  */
  color: ResponsiveProps;
  bg: ResponsiveProps;
}

interface ColorAugmentationThemeProps extends ResponsiveTheme {
  colors: { [key: string]: string | string[] };
}

const colorGetter = (cssKey: string) =>
  makeResponsiveStyleGetter<ColorAugmentationThemeProps>(
    ({ colors }) => colors,
    cssKey
  );

export const colorAugmentation = makeThemedAugmentation<
  ColorAugmentationProps,
  ColorAugmentationThemeProps
>({
  bg: colorGetter('background-color'),
  color: colorGetter('color')
});
