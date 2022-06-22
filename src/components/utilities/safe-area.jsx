import { SafeAreaView, StatusBar } from "react-native";
import styled from "styled-components/native";

import { isAndroid } from "../../utils/devices";

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${isAndroid() ? `${StatusBar.currentHeight}` : "0"}px;
`;
