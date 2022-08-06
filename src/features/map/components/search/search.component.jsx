import React, { useContext, useState, useEffect } from "react";
import { Searchbar } from "react-native-paper";
import { LocationContext } from "../../../../services/location/location.context";
import { SearchContainer } from "./search.styles";

export const Search = () => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

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