import {
  ActivityIndicator,
  Button,
  TextInput,
  Colors,
} from "react-native-paper";
import styled from "styled-components/native";
import { colors } from "../../../../infrastructure/theme/colors";

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

export const PaymentProcessing = styled(ActivityIndicator).attrs({
  size: 128,
  animating: true,
  color: Colors.blue300,
})`
  position: absolute;
  top: 50%;
  left: 32%;
  z-index: 999;
`;
