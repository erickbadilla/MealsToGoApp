import { List } from "react-native-paper";
import styled from "styled-components/native";

export const Accordion = styled(List.Accordion)`
  background-color: ${({ theme }) => theme.colors.bg.primary};
`;
