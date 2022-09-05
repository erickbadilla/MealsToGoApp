import styled from "styled-components/native";

export const AnimationWrapper = styled.View`
  width: 100%;
  height: 40%;
  position: absolute;

  top: 30px;
  padding: ${({ theme }) => theme.space[2]};
`;
