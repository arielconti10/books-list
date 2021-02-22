import React, { useEffect, useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";

import SearchBar from "../../components/searchBar";
import { Container, Header } from "./styles";
import BookList from "./list";

const List: React.FC = ({ route }) => {
  const [searchString, setSearchString] = useState<string>("");

  const search = route.params ? route.params.search : undefined;

  useEffect(() => {
    // searchBooks(search);
    return () => {};
  }, []);

  const handleChangeSearch = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const value = e.nativeEvent.text;
    setSearchString(value);
  };

  return (
    <Container>
      <Header>
        <Icon name="menu" size={20} color="#000" />
        <SearchBar onChange={handleChangeSearch} />
        <TouchableOpacity onPress={() => {}}>
          <Icon name="search" size={20} color="#000" />
        </TouchableOpacity>
      </Header>

      <BookList search={searchString} />
    </Container>
  );
};

export default List;
