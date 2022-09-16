import { PaymentIntent } from "@stripe/stripe-react-native";

import { HOST } from "../../utils/enviroment";

export const payRequest = async (
  token: string,
  amount: number,
  name: string
): Promise<PaymentIntent> => {
  try {
    const fetchResponse = await fetch(`${HOST}/pay`, {
      body: JSON.stringify({
        token,
        amount,
        name,
      }),
      method: "POST",
    });

    if (fetchResponse.status > 200) {
      throw new Error();
    }

    return await fetchResponse.json();
  } catch (error) {
    throw new Error("Something went wrong processing your payment.");
  }
};
