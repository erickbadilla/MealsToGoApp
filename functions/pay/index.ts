import { Request, Response } from "firebase-functions";
import { Stripe } from "stripe";

interface IPayRequestData {
  token: string;
  amount: number;
}

export const payRequest = async (
  request: Request,
  response: Response,
  stripeClient: Stripe
): Promise<Response<Stripe.PaymentIntent | Error>> => {
  try {
    const body: IPayRequestData = JSON.parse(request.body);
    console.log(body.token, body.amount);

    const { token, amount } = body;

    const paymentIntent = await stripeClient.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
      payment_method_data: {
        //@ts-ignore
        type: "card",
        card: {
          token,
        },
      },
      confirm: true,
    });

    return response.status(200).json(paymentIntent);
  } catch (error) {
    return response.status(400).json(error);
  }
};
