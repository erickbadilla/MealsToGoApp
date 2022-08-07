import React, { useContext, useState, useEffect, Fragment } from "react";
import { Map } from "./map.styles";
import { Search } from "../../components/search/search.component";
import { LocationContext } from "../../../../services/location/location.context";
import { useRestaurantContext } from "../../../../services/restaurants/restaurant.context";
import { Marker, Callout } from "react-native-maps";
import { CompactRestaurantInfo } from "../../../../components/restaurant/compact-restaurant-info/compact-restaurant.component";

export const MapScreen = ({ navigation }) => {
  const { location } = useContext(LocationContext);
  const { restaurants } = useRestaurantContext();

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
