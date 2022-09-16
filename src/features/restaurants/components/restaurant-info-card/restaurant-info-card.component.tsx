import React, { FunctionComponent, useMemo } from "react";
import { SvgXml } from "react-native-svg";

import open from "../../../../../assets/open.js";
import star from "../../../../../assets/star.js";
import { Favourite } from "../../../../components/favourites/favourites-icon/favourites.component";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { IRestaurant } from "../../../../services/models/restaurant.js";

import {
  Address,
  Icon,
  Info,
  Rating,
  RestaurantCard,
  RestaurantCardCover,
  Section,
  SectionEnd,
} from "./restaurant-info-card.styles";

interface IRestaurantInfoCardProps {
  restaurant: IRestaurant;
}

export const RestaurantInfoCard: FunctionComponent<
  IRestaurantInfoCardProps
> = ({ restaurant }) => {
  const {
    name = "Some Restaurant",
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ],
    vicinity = "100 some random street",
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily = true,
    placeId,
  } = restaurant;

  const ratingIter = useMemo(
    () => Array.from(Array(Math.floor(rating))),
    [rating]
  );

  return (
    <RestaurantCard elevation={5}>
      <Favourite restaurant={restaurant} />
      <RestaurantCardCover source={{ uri: photos[0] }} />
      <Info>
        <Text variant="label">{name}</Text>
        <Section>
          <Rating>
            {ratingIter.map((_, index) => (
              <SvgXml
                key={`star-${placeId}-${index}`}
                xml={star}
                width={20}
                height={20}
              />
            ))}
          </Rating>

          <SectionEnd>
            {isClosedTemporarily && (
              <Text variant="error">CLOSED TEMPORARILY</Text>
            )}
            <Spacer position="left" size="large">
              {isOpenNow && <SvgXml xml={open} width={20} height={20} />}
            </Spacer>
            <Spacer position="left" size="large">
              {<Icon source={{ uri: icon }} />}
            </Spacer>
          </SectionEnd>
        </Section>
        <Address>{vicinity}</Address>
      </Info>
    </RestaurantCard>
  );
};
