import React, { useEffect, useState } from "react";
import {
  Image,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  ListRenderItem,
  ActivityIndicator,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import Icon from "react-native-vector-icons/Feather";

import SearchBar from "../../components/searchBar";
import genericImage from "../../assets/genericCover.gif";
import { Container, Header } from "./styles";
import NewList from "./newlist";

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: [];
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
  };
}

const List: React.FC = ({ route }) => {
  const [bookList, setBookList] = useState<Book[]>([]);
  const [searchString, setSearchString] = useState<string>("");
  const [startIndex, setStartIndex] = useState<number>(0);

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

      <NewList search={searchString} />
    </Container>
  );
};

export default List;
