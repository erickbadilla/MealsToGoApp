import { Camera as ExpoCamera } from "expo-camera";
import styled from "styled-components/native";

export const ProfileCamera = styled(ExpoCamera)`
  width: 100%;
  height: 100%;
`;

export const InnerSnap = styled.View`
  width: 100%;
  height: 100%;
  z-index: 999;
`;

export const CenterText = styled.View`
  align-items: center;
`;
