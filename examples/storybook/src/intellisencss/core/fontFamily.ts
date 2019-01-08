import {
  makeResponsiveStyleGetter,
  makeThemedAugmentation,
  ResponsiveProps,
  ResponsiveTheme
} from './utility';

export interface FontFamilyAugmentationProps {
  fontFamily: ResponsiveProps;
}

export interface FontFamilyAugmentationThemeProps extends ResponsiveTheme {
  fonts: string[] | { [key: string]: string[] };
}

export const fontFamilyAugmentation = makeThemedAugmentation<
  FontFamilyAugmentationProps,
  FontFamilyAugmentationThemeProps
>({
  fontFamily: makeResponsiveStyleGetter<FontFamilyAugmentationThemeProps>(
    ({ fonts }) => fonts
  )
});
