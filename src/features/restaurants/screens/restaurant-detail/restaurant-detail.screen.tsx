import React, { useCallback, useState } from "react";
import { ScrollView } from "react-native";
import { List } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Spacer } from "../../../../components/spacer/spacer.component";
import { SafeArea } from "../../../../components/utilities/safe-area";
import { withDivider } from "../../../../hocs/with-divider/with-divider.hoc";
import { TAppNavigation } from "../../../../infrastructure/navigation/app.navigator";
import { TRestaurantRoute } from "../../../../infrastructure/navigation/restaurant.navigator";
import { useCart } from "../../../../services/cart/cart.context";
import { IRestaurant } from "../../../../services/models/restaurant";
import { OrderButton } from "../../components/order-button/order-button.component";
import { RestaurantInfoCard } from "../../components/restaurant-info-card/restaurant-info-card.component";

import { Accordion } from "./restaurant-detail.styles";

const AccordionWithDivider = withDivider(Accordion);
const ListItemWithDivider = withDivider(List.Item);

export const RestaurantDetailScreen = () => {
  const { params } = useRoute<TRestaurantRoute>();
  const navigation = useNavigation<TAppNavigation>();
  const cartContext = useCart();

  const [breakfastExpanded, setBreakfastExpanded] = useState(false);
  const [launchExpanded, setLaunchExpanded] = useState(false);
  const [dinnerExpanded, setDinnerExpanded] = useState(false);
  const [drinksExpanded, setDrinksExpanded] = useState(false);

  const handleBreakfastPress = () => setBreakfastExpanded((prev) => !prev);
  const handleLaunchExpanded = () => setLaunchExpanded((prev) => !prev);
  const handleDinnerExpanded = () => setDinnerExpanded((prev) => !prev);
  const handleDrinksExpanded = () => setDrinksExpanded((prev) => !prev);

  const BreakfastIcon = useCallback(
    (props) => <List.Icon {...props} icon="bread-slice" />,
    []
  );

  const LunchIcon = useCallback(
    (props) => <List.Icon {...props} icon="hamburger" />,
    []
  );

  const DinnerIcon = useCallback(
    (props) => <List.Icon {...props} icon="food-variant" />,
    []
  );

  const DrinksIcon = useCallback(
    (props) => <List.Icon {...props} icon="cup" />,
    []
  );

  const onOrderButtonPress = () => {
    if (!params?.restaurant) {
      return;
    }

    cartContext.add(
      {
        item: "special",
        price: 1299,
      },
      params.restaurant
    );

    navigation.navigate("CheckoutTab");
  };

  return (
    <SafeArea>
      <Spacer position="bottom">
        <RestaurantInfoCard restaurant={params?.restaurant as IRestaurant} />
      </Spacer>

      <ScrollView>
        <AccordionWithDivider
          title="Breakfast"
          left={BreakfastIcon}
          expanded={breakfastExpanded}
          onPress={handleBreakfastPress}
        >
          <ListItemWithDivider title="Gallo Pinto" />
          <ListItemWithDivider title="Tortilla con Cuajada" />
        </AccordionWithDivider>

        <AccordionWithDivider
          title="Lunch"
          left={LunchIcon}
          expanded={launchExpanded}
          onPress={handleLaunchExpanded}
        >
          <ListItemWithDivider title="Gallo Pinto con Bisteck" />
          <ListItemWithDivider title="Sopa de res" />
          <ListItemWithDivider title="Casado del día" />
        </AccordionWithDivider>

        <AccordionWithDivider
          title="Dinner"
          left={DinnerIcon}
          expanded={dinnerExpanded}
          onPress={handleDinnerExpanded}
        >
          <ListItemWithDivider title="Tamal de Cerdo" />
          <ListItemWithDivider title="Tamal de Elote" />
          <ListItemWithDivider title="Sopa de Pollo" />
        </AccordionWithDivider>

        <AccordionWithDivider
          title="Drinks"
          left={DrinksIcon}
          expanded={drinksExpanded}
          onPress={handleDrinksExpanded}
        >
          <ListItemWithDivider title="Cafe con leche" />
          <ListItemWithDivider title="Agua 1L" />
          <ListItemWithDivider title="Horchata" />
          <ListItemWithDivider title="Pinolillo" />
          <ListItemWithDivider title="Coca Cola" />
          <ListItemWithDivider title="Fanta" />
        </AccordionWithDivider>
      </ScrollView>

      <Spacer position="bottom" size="large">
        <OrderButton
          mode="contained"
          icon="currency-usd"
          onPress={onOrderButtonPress}
        >
          Order Special 12.99!
        </OrderButton>
      </Spacer>
    </SafeArea>
  );
};
