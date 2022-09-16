import React, { FunctionComponent } from "react";

import { SafeArea } from "../../../../components/utilities/safe-area";
import { colors } from "../../../../infrastructure/theme/colors";
import { CustomCardIcon } from "../../components/card-icon/card-icon.component";

export const CheckoutSuccessScreen: FunctionComponent = () => (
  <SafeArea>
    <CustomCardIcon
      iconName="check-bold"
      iconBackgroudColor={colors.ui.success}
      message="Success!"
    />
  </SafeArea>
);
