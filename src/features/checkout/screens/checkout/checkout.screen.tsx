import React, { useEffect, useState } from "react";

import { StripeProvider } from "@stripe/stripe-react-native";
import { SafeArea } from "../../../../components/utilities/safe-area";
import { CreditCardInput } from "../../components/credit-card/credit-card.component";
import { useCart } from "../../../../services/cart/cart.context";
import { Text } from "../../../../components/typography/text.component";
import {
  CartIcon,
  CartIconContainer,
  ClearButton,
  NameInput,
  PayButton,
} from "./checkout.styles";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { RestaurantInfoCard } from "../../../restaurants/components/restaurant-info-card/restaurant-info-card.component";
import { ScrollView } from "react-native-gesture-handler";
import { List } from "react-native-paper";
import { capitalize } from "../../../../utils/capitilizeText";

export const CheckoutScreen = () => {
  const { cart, restaurant, clear: clearCart } = useCart();
  const [cartSum, setCartSum] = useState<number>(0);
  const [personName, setPersonName] = useState<string>("");

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
        <CartIconContainer>
          <Spacer position="bottom" size="small">
            <CartIcon icon="cart-off" backgroundColor="red" />
          </Spacer>

          <Text>Your cart is empty!</Text>
        </CartIconContainer>
      </SafeArea>
    );
  }

  return (
    <StripeProvider publishableKey="pk_test_51LgIhfIusQC7ECpn6orZxPNEHGEkB5sge5WF9voiYFY7kLvDSTRfXZBAdgCtvC9sNBpEzA04bBzP0iGxSXIdXVfa00M0ku3B4Z">
      <SafeArea>
        <RestaurantInfoCard restaurant={restaurant} />
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

          <NameInput
            label="Name"
            value={personName}
            onChangeText={setPersonName}
          />

          <Spacer position="top" size="large">
            {personName?.length > 0 && <CreditCardInput name={personName} />}
          </Spacer>

          <Spacer position="top" size="xxl">
            <PayButton icon="cash" mode="contained">
              Pay
            </PayButton>
          </Spacer>

          <Spacer position="top" size="large">
            <ClearButton icon="cart-off" mode="contained" onPress={clearCart}>
              Clear Cart
            </ClearButton>
          </Spacer>

          <Spacer position="top" size="large" />
        </ScrollView>
      </SafeArea>
    </StripeProvider>
  );
};
