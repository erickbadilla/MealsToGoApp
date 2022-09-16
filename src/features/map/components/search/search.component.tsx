import React, { FunctionComponent, useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";

import { useLocation } from "../../../../services/location/location.context";

import { SearchContainer } from "./search.styles";

export const Search: FunctionComponent = () => {
  const { keyword, search } = useLocation();
  const [searchKeyword, setSearchKeyword] = useState<string>(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  return (
    <SearchContainer>
      <Searchbar
        icon="map"
        placeholder="Search for a location"
        value={searchKeyword}
        onSubmitEditing={() => search(searchKeyword)}
        onChangeText={setSearchKeyword}
      />
    </SearchContainer>
  );
};
