import React, { FunctionComponent } from "react";
import styled, { DefaultTheme, useTheme } from "styled-components/native";

const defaultTextStyles = (theme: DefaultTheme) => `
    font-family: ${theme.fonts.body};
    font-weight: ${theme.fontWeights.regular};
    color: ${theme.colors.text.primary};
    flex-wrap: wrap;
    margin-top: 0px
    margin-bottom: 0px
`;

const body = (theme: DefaultTheme) => `
    font-size: ${theme.fontSizes.body};
`;

const error = (theme: DefaultTheme) => `
   color: ${theme.colors.text.error};
`;

const caption = (theme: DefaultTheme) => `
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.bold};
`;

const label = (theme: DefaultTheme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.medium};

`;

const TEXT_VARIANTS = Object.freeze({
  body,
  label,
  caption,
  error,
});

type TTextVariant = keyof typeof TEXT_VARIANTS;

const getVariantStyles = (variant: TTextVariant, theme: DefaultTheme) => {
  return TEXT_VARIANTS[variant](theme);
};

interface IStyledTextProps {
  defaultStyles: string;
  variantStyles: string;
}

const StyledText = styled.Text<IStyledTextProps>`
  ${({ defaultStyles }) => defaultStyles}
  ${({ variantStyles }) => variantStyles}
`;

interface ITextProps {
  variant?: TTextVariant;
}

export const Text: FunctionComponent<ITextProps> = ({
  variant = "body",
  children,
}) => {
  const theme = useTheme();
  const defaultStyles = defaultTextStyles(theme);
  const variantStyles = getVariantStyles(variant, theme);

  return (
    <StyledText defaultStyles={defaultStyles} variantStyles={variantStyles}>
      {children}
    </StyledText>
  );
};
