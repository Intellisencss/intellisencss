import {
  makeStyleGetter,
  makeThemedAugmentation,
  ResponsiveProps
} from './utility';

interface ColorAugmentationProps {
  color: ResponsiveProps;
  bg: ResponsiveProps;
}

interface ColorAugmentationThemeProps {
  colors: { [key: string]: string | string[] };
}

const colorGetter = (cssKey: string) =>
  makeStyleGetter<ColorAugmentationThemeProps>(cssKey, ({ colors }) => colors);

export const colorAugmentation = makeThemedAugmentation<
  ColorAugmentationProps,
  ColorAugmentationThemeProps
>({
  bg: {
    getStyle: colorGetter('background-color')
  },
  color: {
    getStyle: colorGetter('color')
  }
});
