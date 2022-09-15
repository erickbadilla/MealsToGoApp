import { Avatar } from "react-native-paper";
import styled from "styled-components/native";

export const CartIconContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

interface ICartIcon {
  backgroundColor?: string;
}

export const CartIcon = styled(Avatar.Icon).attrs({
  size: 128,
})<ICartIcon>`
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor || theme.colors.brand.primary};
`;
