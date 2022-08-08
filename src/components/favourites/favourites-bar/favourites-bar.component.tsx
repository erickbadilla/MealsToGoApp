import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { RestaurantNavigation } from "../../../infrastructure/navigation/restaurant.navigator";
import { Restaurant } from "../../../services/models/restaurant";
import { CompactRestaurantInfo } from "../../restaurant/compact-restaurant-info/compact-restaurant.component";
import { Spacer } from "../../spacer/spacer.component";
import { FavouriteWrapper } from "./favourites-bar.styles";

interface IFavouriteBarProps {
  favourites: Restaurant[];
}

export const FavouriteBar: FunctionComponent<IFavouriteBarProps> = ({
  favourites = [],
}) => {
  const navigation = useNavigation<RestaurantNavigation>();

  if (!favourites.length) {
    return null;
  }

  return (
    <FavouriteWrapper>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favourites.map((favourite) => {
          const key = favourite.name;

          return (
            <Spacer position="left" size="medium" key={key}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("RestaurantDetailStack", {
                    restaurant: favourite,
                  })
                }
              >
                <CompactRestaurantInfo restaurant={favourite} />
              </TouchableOpacity>
            </Spacer>
          );
        })}
      </ScrollView>
    </FavouriteWrapper>
  );
};
