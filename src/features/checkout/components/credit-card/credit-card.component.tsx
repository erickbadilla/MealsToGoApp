import React, { FunctionComponent } from "react";

import {
  CardFieldInput,
  CreateTokenResult,
  useStripe,
} from "@stripe/stripe-react-native";
import { isDevelopment } from "../../../../utils/enviroment";
import { CardInput } from "./credit-card.styles";

/**
export const CreditCardInput = () => {
  const onChange = ({ values, status }: IFormData): void => {
    const isIncomplete = (Object.values(status) as FormStatus[]).includes(
      "incomplete"
    );

    console.log(isIncomplete);
  };

  return <LiteCreditCardInput onChange={onChange} />;
};
 */

const placeholder: string = isDevelopment ? "4242 4242 4242 4242" : "";

const cardPlaceholder: CardFieldInput.Placeholders = {
  number: placeholder,
};

type TValidationState = keyof typeof CardFieldInput.ValidationState;

const isCreditCardValid = ({
  validCVC,
  validExpiryDate,
  validNumber,
}: CardFieldInput.Details): boolean => {
  const validationStates: TValidationState[] = [
    validCVC,
    validExpiryDate,
    validNumber,
  ];

  return validationStates.every((state) => state === "Valid");
};

interface ICreditCardInput {
  name: string;
  hidden: boolean;
  onSuccess: (card: CreateTokenResult) => void;
  onError: () => void;
}

export const CreditCardInput: FunctionComponent<ICreditCardInput> = ({
  name,
  hidden,
  onSuccess,
  onError,
}) => {
  const { createToken } = useStripe();

  const onCardChange = async (cardDetails: CardFieldInput.Details) => {
    const isInvalid = isCreditCardValid(cardDetails);

    if (!isInvalid) {
      return;
    }

    try {
      const result = await createToken({
        type: "Card",
        currency: "usd",
        name,
      });

      onSuccess(result);
    } catch (error) {
      onError();
    }
  };

  return (
    <CardInput
      postalCodeEnabled={false}
      placeholder={cardPlaceholder}
      onCardChange={onCardChange}
      hidden={hidden}
    />
  );
};
