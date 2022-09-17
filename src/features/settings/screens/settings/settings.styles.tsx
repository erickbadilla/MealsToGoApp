import { Avatar, List } from "react-native-paper";
import styled from "styled-components/native";

import { SafeArea } from "../../../../components/utilities/safe-area";

export const SettingsItem = styled(List.Item)`
  padding: ${({ theme }) => theme.space[3]};
  background-color: rgba(255, 255, 255, 0.4);
`;

export const AvatarContainer = styled.View`
  align-items: center;
`;

export const AvatarIcon = styled(Avatar.Icon)`
  background-color: ${({ theme }) => theme.colors.brand.primary};
`;

export const TransparentSafeArea = styled(SafeArea)`
  background-color: transparent;
`;

export const SettingsBackground = styled.ImageBackground.attrs({
  source: require("../../../../assets/home_bg.jpg"),
})`
  position: absolute;
  height: 100%;
  width: 100%;
`;
