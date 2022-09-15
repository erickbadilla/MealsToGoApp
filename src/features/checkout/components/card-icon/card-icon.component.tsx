import React, { FunctionComponent } from "react";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { CartIcon, CartIconContainer } from "./card-icon.styles";
import { Text } from "../../../../components/typography/text.component";

interface ICardIconProps {
  iconName: string;
  iconBackgroudColor: string;
  message: string;
}

export const CustomCardIcon: FunctionComponent<ICardIconProps> = ({
  iconName,
  iconBackgroudColor,
  message,
}) => (
  <CartIconContainer>
    <Spacer position="bottom" size="medium">
      <CartIcon icon={iconName} backgroundColor={iconBackgroudColor} />
    </Spacer>

    <Text>{message}</Text>
  </CartIconContainer>
);
