import React, { useState, FunctionComponent, useCallback } from "react";
import { RestaurantList } from "../../components/restaurant-list/restaurant-list.styles";
import { SafeArea } from "../../../../components/utilities/safe-area";
import { Search } from "../../components/search/search.component";
import { useRestaurantContext } from "../../../../services/restaurants/restaurant.context";
import { Colors } from "react-native-paper";
import { Spinner } from "../../../../components/spinner/spinner.component";
import { FavouriteBar } from "../../../../components/favourites/favourites-bar/favourites-bar.component";
import { useFavoritesContext } from "../../../../services/favorites/favourites.context";
import { RestaurantListItem } from "../../components/restaurant-list-item/restaurant-list-item.component";
import { FadeInView } from "../../../../components/animations/fade.animation";
import { IRestaurant } from "../../../../services/models/restaurant";
import { useLocation } from "../../../../services/location/location.context";
import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/spacer/spacer.component";

const RESTAURANT_ITEM_HEIGHT = 300.4;

export const RestaurantsScreen: FunctionComponent = () => {
  const {
    restaurants,
    isLoading,
    error: restaurantError,
  } = useRestaurantContext();
  const { error: locationError } = useLocation();
  const { favourites: favorites } = useFavoritesContext();
  const hasErrored: boolean = !!locationError || !!restaurantError;

  const [isToggled, setIsToggled] = useState<boolean>(false);

  const keyExtractor = useCallback(({ name }) => name, []);
  const renderItem = useCallback<FunctionComponent<{ item: IRestaurant }>>(
    ({ item }) => (
      <FadeInView duration={800}>
        <RestaurantListItem item={item} />
      </FadeInView>
    ),
    []
  );
  const getItemLayout = useCallback(
    (_data: IRestaurant[] | null | undefined, index: number) => ({
      length: RESTAURANT_ITEM_HEIGHT,
      offset: RESTAURANT_ITEM_HEIGHT * index,
      index,
    }),
    []
  );
  return (
    <SafeArea>
      <Spinner isLoading={isLoading} size={50} color={Colors.blueA100} />
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled((prev) => !prev)}
      />

      {isToggled && <FavouriteBar favourites={favorites} />}

      {hasErrored && (
        <Spacer position="left" size="large">
          <Text variant="error">Something went wrong retriving the data.</Text>
        </Spacer>
      )}

      {!hasErrored && (
        <RestaurantList
          data={restaurants}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
        />
      )}
    </SafeArea>
  );
};
