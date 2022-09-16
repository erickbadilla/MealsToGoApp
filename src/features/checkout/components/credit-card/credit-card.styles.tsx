import { CardField } from "@stripe/stripe-react-native";
import styled from "styled-components/native";

interface ICardInputProps {
  hidden: boolean;
}

export const CardInput = styled(CardField).attrs({
  cardStyle: {
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
  },
})`
  width: 100%;
  height: 50px;
  display: ${({ hidden }: ICardInputProps) => (hidden ? "none" : "flex")};
`;
