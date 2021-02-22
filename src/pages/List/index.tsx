import React, { useEffect, useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";

import SearchBar from "../../components/searchBar";
import { Container, Header } from "./styles";
import BookList from "./list";

const List: React.FC = ({ route }) => {
  const search = route.params ? route.params.search : undefined;

  const [searchString, setSearchString] = useState<string>("");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCurrent, setpageCurrent] = useState(1);

  useEffect(() => {
    if (searchString === "") {
      setSearchString(search);
    }
    return () => {};
  }, []);

  useEffect(() => {
    if (searchString) {
      setLoading(true);
      getData(searchString);
    }
    return () => {};
  }, [pageCurrent, searchString]);

  const getData = async (query: string) => {
    console.log(query);
    const apiURL =
      "https://www.googleapis.com/books/v1/volumes?q=" +
      query +
      "&maxResults=12&startIndex=" +
      pageCurrent;

    fetch(apiURL)
      .then((res) => res.json())
      .then((resJson) => {
        setData(data.concat(resJson.items));
      });
  };

  const handleLoadMore = () => {
    setTimeout(() => {
      setpageCurrent(pageCurrent + 12);
      setLoading(true);
    }, 500);
  };

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
        <TouchableOpacity
          onPress={() => {
            setData([]);
            setpageCurrent(0);
            getData(searchString);
          }}
        >
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
