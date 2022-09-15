import { useRoute } from "@react-navigation/native";
import React, { FunctionComponent } from "react";
import { SafeArea } from "../../../../components/utilities/safe-area";
import { TCheckoutRoute } from "../../../../infrastructure/navigation/checkout.navigator";
import { colors } from "../../../../infrastructure/theme/colors";
import { CustomCardIcon } from "../../components/card-icon/card-icon.component";

export const CheckoutErrorScreen: FunctionComponent = () => {
  const { params } = useRoute<TCheckoutRoute>();

  return (
    <SafeArea>
      <CustomCardIcon
        iconName="close"
        iconBackgroudColor={colors.ui.error}
        message={params?.error ?? "Something went wrong."}
      />
    </SafeArea>
  );
};
