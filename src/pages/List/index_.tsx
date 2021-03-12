import React, { useCallback, useEffect, useReducer, useState } from "react";
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

const initialState: State = {
  books: [],
  searchString: "",
};

interface Book {
  volumeInfo: {
    title: string;
    authors: [];
    imageLinks: {
      thumbnail: string;
    };
    saleInfo: {
      saleability: string;
      listPrice: {
        amount: string;
      };
    };
  };
}

interface State {
  searchString: string;
  books: Book[];
}

type Action =
  | { type: "reset" }
  | { type: "setSearch" | "getBooks"; payload: string };

const BookReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "setSearch":
      return { ...state, searchString: action.payload };
    case "getBooks":
      return { ...state, books: action.payload };
    case "reset":
      return { initialState };
    default:
      return state;
  }
};

const List: React.FC = ({ route }) => {
  const search = route.params ? route.params.search : undefined;
  const [state, dispatch] = useReducer(BookReducer, initialState);
  const { books, searchString } = state;

  // const [searchString, setSearchString] = useState<string>(search);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(0);

  useEffect(() => {
    getData();
    return () => {};
  }, [pageCurrent]);

  const getData = async () => {
    const query = searchString ? searchString : "Harry Potter";

    const apiURL =
      "https://www.googleapis.com/books/v1/volumes?q=" +
      query +
      "&maxResults=12&startIndex=" +
      pageCurrent;

    const res = await fetch(apiURL);
    const jsonData = await res.json();

    // setData(data.concat(jsonData.items));
    dispatch({ type: "getBooks", payload: jsonData.items });

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
    dispatch({ type: "setSearch", payload: value });
    // setSearchString(value);
  };

  const handleSearch = () => {
    if (pageCurrent > 0) {
      setPageCurrent(0);
    }
    dispatch({ type: "reset" });
    // setData(data.splice(0, data.length));
    getData();
  };

  console.log(searchString);

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
