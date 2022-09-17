import React, { useCallback, useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Divider, List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { CreateTokenResult, StripeProvider } from "@stripe/stripe-react-native";

import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { SafeArea } from "../../../../components/utilities/safe-area";
import { TCheckoutNavigation } from "../../../../infrastructure/navigation/checkout.navigator";
import { useCart } from "../../../../services/cart/cart.context";
import { payRequest } from "../../../../services/checkout/checkout.service";
import { capitalize } from "../../../../utils/capitilizeText";
import { RestaurantInfoCard } from "../../../restaurants/components/restaurant-info-card/restaurant-info-card.component";
import { CustomCardIcon } from "../../components/card-icon/card-icon.component";
import { CreditCardInput } from "../../components/credit-card/credit-card.component";

import {
  ClearButton,
  NameInput,
  PayButton,
  PaymentProcessing,
} from "./checkout.styles";

export const CheckoutScreen = () => {
  const [cartSum, setCartSum] = useState<number>(0);
  const [personName, setPersonName] = useState<string>("");
  const [card, setCard] = useState<CreateTokenResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { cart, restaurant, clear: clearCart } = useCart();

  const navigation = useNavigation<TCheckoutNavigation>();

  const onError = useCallback(
    () =>
      navigation.navigate("CheckoutError", {
        error: "Something went wrong processing your credit card.",
      }),
    [navigation]
  );

  const onPay = useCallback(async () => {
    if (!card?.token) {
      return navigation.navigate("CheckoutError", {
        error: "Please fill a valid credit card.",
      });
    }

    setLoading(true);

    try {
      await payRequest(card.token.id, cartSum, personName);

      clearCart();

      navigation.navigate("CheckoutSuccess");
    } catch (error) {
      return navigation.navigate("CheckoutError", {
        error:
          (error as Error)?.message ??
          "Something went wrong. Please try again later.",
      });
    }

    setLoading(false);
  }, [cartSum, personName, card, clearCart, navigation]);

  useEffect(() => {
    if (!cart.length) {
      return setCartSum(0);
    }

    const sum = cart.reduce((acc, { price }) => acc + price, 0);

    setCartSum(sum);
  }, [cart]);

  if (!cart.length || !restaurant) {
    return (
      <SafeArea>
        <CustomCardIcon
          iconName="cart-off"
          iconBackgroudColor="red"
          message="Your cart is empty!"
        />
      </SafeArea>
    );
  }

  return (
    <StripeProvider publishableKey="pk_test_51LgIhfIusQC7ECpn6orZxPNEHGEkB5sge5WF9voiYFY7kLvDSTRfXZBAdgCtvC9sNBpEzA04bBzP0iGxSXIdXVfa00M0ku3B4Z">
      <SafeArea>
        <RestaurantInfoCard restaurant={restaurant} />

        {loading && <PaymentProcessing />}

        <ScrollView>
          <Spacer position="left" size="medium">
            <Spacer position="top" size="large">
              <Text>Your Order</Text>
            </Spacer>

            <List.Section>
              {cart.map(({ id, price, item }) => (
                <List.Item
                  key={id}
                  title={`${capitalize(item)} - $${price / 100}`}
                />
              ))}
            </List.Section>

            <Text>Total: ${cartSum / 100}</Text>
          </Spacer>

          <Spacer size="medium" />

          <Divider />

          <NameInput
            label="Name"
            value={personName}
            onChangeText={setPersonName}
          />

          <Spacer position="top" size="large">
            <CreditCardInput
              name={personName}
              onSuccess={setCard}
              onError={onError}
              hidden={!personName?.length}
            />
          </Spacer>

          <Spacer position="top" size="xxl">
            <PayButton
              disabled={loading}
              icon="cash"
              mode="contained"
              onPress={onPay}
            >
              Pay
            </PayButton>
          </Spacer>

          <Spacer position="top" size="large">
            <ClearButton
              disabled={loading}
              icon="cart-off"
              mode="contained"
              onPress={clearCart}
            >
              Clear Cart
            </ClearButton>
          </Spacer>

          <Spacer position="top" size="large" />
        </ScrollView>
      </SafeArea>
    </StripeProvider>
  );
};
