import React, { FunctionComponent } from "react";
import styled, { useTheme, DefaultTheme } from "styled-components/native";

const sizeVariant = {
  small: 1,
  medium: 2,
  large: 3,
};

const positionsVariant = {
  top: "margin-top",
  right: "margin-right",
  bottom: "margin-bottom",
  left: "margin-left",
};

type TPostionVariant = keyof typeof positionsVariant;
type TSizeVariant = keyof typeof sizeVariant;

const getVariant = (
  position: TPostionVariant,
  size: TSizeVariant,
  { space }: DefaultTheme
) => {
  const property = positionsVariant[position];
  const sizeIndex = sizeVariant[size];

  return `${property}: ${space[sizeIndex]}`;
};

const SpacerView = styled.View<{
  variant: string;
}>`
  ${({ variant }) => variant};
`;

interface ISpacerProps {
  position?: TPostionVariant;
  size?: TSizeVariant;
}

export const Spacer: FunctionComponent<ISpacerProps> = ({
  position = "top",
  size = "small",
  children,
}) => {
  const theme = useTheme();
  const variant = getVariant(position, size, theme);

  return <SpacerView variant={variant}>{children}</SpacerView>;
};
