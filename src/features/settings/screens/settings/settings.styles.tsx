import { Avatar, List } from "react-native-paper";
import styled from "styled-components/native";

export const SettingsItem = styled(List.Item)`
  padding: ${({ theme }) => theme.space[3]};
`;

export const AvatarContainer = styled.View`
  align-items: center;
`;

export const AvatarIcon = styled(Avatar.Icon)`
  background-color: #2182bd;
`;
