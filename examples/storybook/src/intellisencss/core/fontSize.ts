import {
  makeResponsiveStyleGetter,
  makeThemedAugmentation,
  ResponsiveProps,
  ResponsiveTheme
} from './utility';

export interface FontSizeAugmentationProps {
  fontSize: ResponsiveProps;
}

export interface FontSizeAugmentationThemeProps extends ResponsiveTheme {
  fontSizes: (string | number)[];
}

export const fontSizeAugmentation = makeThemedAugmentation<
  FontSizeAugmentationProps,
  FontSizeAugmentationThemeProps
>({
  fontSize: makeResponsiveStyleGetter<FontSizeAugmentationThemeProps>(
    ({ fontSizes }) => fontSizes
  )
});
