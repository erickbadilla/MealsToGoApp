import { Avatar, Button, TextInput } from "react-native-paper";
import styled from "styled-components/native";
import { colors } from "../../../../infrastructure/theme/colors";

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

export const NameInput = styled(TextInput)`
  margin: ${({ theme }) => theme.space[3]};
`;

export const PayButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  width: 80%;
  align-self: center;
  padding: ${({ theme }) => theme.space[1]};
`;

export const ClearButton = styled(Button).attrs({
  color: colors.ui.error,
})`
  width: 80%;
  align-self: center;
  padding: ${({ theme }) => theme.space[1]};
`;
