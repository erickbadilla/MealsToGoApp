import React, { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";

import { useLocation } from "../../../../services/location/location.context";

import { SearchContainer } from "./search.styles";

interface ISearchProps {
  isFavouritesToggled: boolean;
  onFavouritesToggle: () => void;
}
export const Search = React.memo<ISearchProps>(
  ({ onFavouritesToggle, isFavouritesToggled }) => {
    const { keyword, search } = useLocation();
    const [searchKeyword, setSearchKeyword] = useState(keyword);

    useEffect(() => {
      setSearchKeyword(keyword);
    }, [keyword]);

    return (
      <SearchContainer>
        <Searchbar
          icon={isFavouritesToggled ? "heart" : "heart-outline"}
          iconColor={isFavouritesToggled ? "red" : undefined}
          onIconPress={() => {
            requestAnimationFrame(() => {
              onFavouritesToggle();
            });
          }}
          placeholder="Search for a location"
          value={searchKeyword}
          onSubmitEditing={() => search(searchKeyword)}
          onChangeText={setSearchKeyword}
        />
      </SearchContainer>
    );
  }
);
