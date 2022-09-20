import React, { FunctionComponent, useCallback, useState } from "react";
import { Colors } from "react-native-paper";

import { FadeInView } from "../../../../components/animations/fade.animation";
import { FavouriteBar } from "../../../../components/favourites/favourites-bar/favourites-bar.component";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Spinner } from "../../../../components/spinner/spinner.component";
import { Text } from "../../../../components/typography/text.component";
import { SafeArea } from "../../../../components/utilities/safe-area";
import { useFavoritesContext } from "../../../../services/favorites/favourites.context";
import { useLocation } from "../../../../services/location/location.context";
import { IRestaurant } from "../../../../services/models/restaurant";
import { useRestaurantContext } from "../../../../services/restaurants/restaurant.context";
import { RestaurantList } from "../../components/restaurant-list/restaurant-list.styles";
import { RestaurantListItem } from "../../components/restaurant-list-item/restaurant-list-item.component";
import { Search } from "../../components/search/search.component";

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

  const onFavouritesToggle = useCallback(
    () => setIsToggled((prev) => !prev),
    []
  );
  return (
    <SafeArea>
      <Spinner isLoading={isLoading} size={50} color={Colors.blueA100} />
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={onFavouritesToggle}
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
