import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  View,
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";

import SearchBar from "../../components/searchBar";
import { Container, Header } from "./styles";
import BookList from "./list";

const List: React.FC = ({ route }) => {
  const search = route.params ? route.params.search : undefined;

  const [searchString, setSearchString] = useState<string>(search);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(0);

  useEffect(() => {
    getData();
    return () => {};
  }, [pageCurrent]);

  const getData = async () => {
    const query = searchString ? searchString : "Harry Potter";
    console.log(query);

    const apiURL =
      "https://www.googleapis.com/books/v1/volumes?q=" +
      query +
      "&maxResults=12&startIndex=" +
      pageCurrent;

    const res = await fetch(apiURL);
    const jsonData = await res.json();

    setData(data.concat(jsonData.items));
    setLoading(false);
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setPageCurrent(pageCurrent + 12);
    }, 500);
  };

  const handleChangeSearch = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const value = e.nativeEvent.text;
    setSearchString(value);
  };

  const handleSearch = () => {
    if (pageCurrent > 0) {
      setPageCurrent(0);
    }
    setData(data.splice(0, data.length));
    getData();
  };

  return (
    <Container>
      <Header>
        <Icon name="menu" size={20} color="#000" />
        <SearchBar onChange={handleChangeSearch} />
        <TouchableOpacity onPress={handleSearch}>
          <Icon name="search" size={20} color="#000" />
        </TouchableOpacity>
      </Header>

      <BookList
        search={searchString}
        data={data}
        loading={loading}
        handleLoadMore={handleLoadMore}
      />
    </Container>
  );
};

export default List;
