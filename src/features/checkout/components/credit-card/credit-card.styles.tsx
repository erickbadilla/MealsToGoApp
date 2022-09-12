import styled from "styled-components/native";
import { CardField } from "@stripe/stripe-react-native";

export const CardInput = styled(CardField).attrs({
  cardStyle: {
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
  },
})`
  width: 100%;
  height: 50px;
`;
