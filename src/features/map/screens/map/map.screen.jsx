import React, { Fragment, useEffect, useState } from "react";
import { Callout, Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

import { CompactRestaurantInfo } from "../../../../components/restaurant/compact-restaurant-info/compact-restaurant.component";
import { useLocation } from "../../../../services/location/location.context";
import { useRestaurantContext } from "../../../../services/restaurants/restaurant.context";
import { Search } from "../../components/search/search.component";

import { Map } from "./map.styles";

const RestaurantMap = () => {
  const { location } = useLocation();
  const { restaurants } = useRestaurantContext();
  const navigation = useNavigation();

  const [latDelta, setLatDelta] = useState(0);

  const { viewport, lat, lng } = location;
  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport]);

  return (
    <Fragment>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.0922 * latDelta,
        }}
      >
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.name}
            title={restaurant.name}
            coordinate={{
              latitude: restaurant.geometry.location.lat,
              longitude: restaurant.geometry.location.lng,
            }}
          >
            <Callout
              onPress={() =>
                navigation.navigate("RestaurantDetailStack", {
                  restaurant,
                })
              }
            >
              <CompactRestaurantInfo isMap restaurant={restaurant} />
            </Callout>
          </Marker>
        ))}
      </Map>
    </Fragment>
  );
};

export const MapScreen = () => {
  const { location } = useLocation();

  if (!location) {
    return (
      <Map
        region={{
          latitude: 0,
          longitude: 0,
        }}
      />
    );
  }

  return <RestaurantMap />;
};
