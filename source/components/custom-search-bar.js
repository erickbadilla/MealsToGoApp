import React, { useState } from "react";
import { Searchbar } from "react-native-paper";

const CustomSearchBar = () => {
  const [searchQuery, setSeachQuery] = useState("");

  const onChangeSearch = (query) => setSeachQuery(query);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

export default CustomSearchBar;
