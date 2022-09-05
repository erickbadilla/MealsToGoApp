import styled from "styled-components/native";
import { Button } from "react-native-paper";
import { colors } from "../../../../infrastructure/theme/colors";

export const AuthButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
`;
