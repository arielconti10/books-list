import React, { useCallback, useEffect, useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

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
  const [pageCurrent, setPageCurrent] = useState(1);

  useEffect(() => {
    setLoading(true);
    getData();
    return () => {};
  }, [pageCurrent]);

  const getData = useCallback(() => {
    const apiURL =
      "https://www.googleapis.com/books/v1/volumes?q=" +
      searchString +
      "&maxResults=12&startIndex=" +
      pageCurrent;

    fetch(apiURL)
      .then((res) => res.json())
      .then((resJson) => {
        setData(data.concat(resJson.items));
      });
    return () => {};
  }, [searchString]);

  const handleLoadMore = () => {
    setTimeout(() => {
      setPageCurrent(pageCurrent + 12);
      setLoading(true);
    }, 500);
  };

  const handleChangeSearch = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const value = e.nativeEvent.text;
    setSearchString(value);
  };

  const handleSearch = () => {
    setData([]);
    setPageCurrent(1);
    // getData();
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
