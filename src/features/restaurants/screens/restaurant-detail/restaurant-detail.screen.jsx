import React, { useState } from "react";

import { ScrollView } from "react-native";
import { List } from "react-native-paper";
import { SafeArea } from "../../../../components/utilities/safe-area";
import { RestaurantInfoCard } from "../../components/restaurant-info-card/restaurant-info-card.component";

export const RestaurantDetailScreen = ({ route }) => {
  const [breakfastExpanded, setBreakfastExpanded] = useState(false);
  const [launchExpanded, setLaunchExpanded] = useState(false);
  const [dinnerExpanded, setDinnerExpanded] = useState(false);
  const [drinksExpanded, setDrinksExpanded] = useState(false);

  const { restaurant } = route.params;

  const handleBreakfastPress = () => setBreakfastExpanded((prev) => !prev);
  const handleLaunchExpanded = () => setLaunchExpanded((prev) => !prev);
  const handleDinnerExpanded = () => setDinnerExpanded((prev) => !prev);
  const handleDrinksExpanded = () => setDrinksExpanded((prev) => !prev);

  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
      <ScrollView>
        <List.Accordion
          title="Breakfast"
          left={(props) => <List.Icon {...props} icon="bread-slice" />}
          expanded={breakfastExpanded}
          onPress={handleBreakfastPress}
        >
          <List.Item title="Eggs Benedict" />
          <List.Item title="Classic Breakfast" />
        </List.Accordion>

        <List.Accordion
          title="Lunch"
          left={(props) => <List.Icon {...props} icon="hamburger" />}
          expanded={launchExpanded}
          onPress={handleLaunchExpanded}
        />

        <List.Accordion
          title="Dinner"
          left={(props) => <List.Icon {...props} icon="food-variant" />}
          expanded={dinnerExpanded}
          onPress={handleDinnerExpanded}
        />

        <List.Accordion
          title="Drinks"
          left={(props) => <List.Icon {...props} icon="cup" />}
          expanded={drinksExpanded}
          onPress={handleDrinksExpanded}
        >
          <List.Item title="Eggs Benedict" />
          <List.Item title="Classic Breakfast" />
        </List.Accordion>
      </ScrollView>
    </SafeArea>
  );
};
