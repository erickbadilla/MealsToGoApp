import React, {
  useContext,
  useState,
  useEffect,
  FunctionComponent,
} from "react";
import { Searchbar } from "react-native-paper";
import { LocationContext } from "../../../../services/location/location.context";
import { SearchContainer } from "./search.styles";

interface ISearchProps {
  onToggle: () => void;
}

export const Search: FunctionComponent<ISearchProps> = ({ onToggle }) => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  return (
    <SearchContainer>
      <Searchbar
        icon="heart"
        onIconPress={onToggle}
        placeholder="Search for a location"
        value={searchKeyword}
        onSubmitEditing={() => search(searchKeyword)}
        onChangeText={setSearchKeyword}
      />
    </SearchContainer>
  );
};
