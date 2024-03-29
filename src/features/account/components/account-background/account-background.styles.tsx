import styled from "styled-components/native";

export const AccountBackground = styled.ImageBackground.attrs({
  source: require("../../../../assets/home_bg.jpg"),
  resizeMode: "cover",
})<{ children?: React.ReactNode }>`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
