import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
  NativeSyntheticEvent,
  Text,
  TextInputChangeEventData,
} from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';

import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

import SearchBar from '../../components/searchBar';
import { Container, Header } from './styles';
import BookList from './list';
import { RouteParams } from '../../routes/index';

const initialState: State = {
  books: [],
  searchString: '',
};

export interface Book {
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

type Props = StackScreenProps<RouteParams, 'List'>;

type Action =
  | { type: 'reset' }
  | { type: 'setSearch'; payload: string }
  | { type: 'getBooks'; payload: Book[] };

const BookReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setSearch':
      return { ...state, searchString: action.payload };
    case 'getBooks':
      return { ...state, books: [...state.books.concat(action.payload)] };
    case 'reset':
      return initialState;
    default:
      return state;
  }
};


const List: React.FC<Props> = ({route, navigation}) => {
  const search = route.params ? route.params.search : '';

  const [pageCurrent, setPageCurrent] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [state, dispatch] = useReducer(BookReducer, initialState);

  const {books, searchString} = state;

  useEffect(() => {
    dispatch({type: 'setSearch', payload: search})
  }, [])

  useEffect(() => {
    console.log('here');
    setLoading(true);
    loadBooks();
    setPageCurrent(pageCurrent + 15);
  }, [])

  const loadBooks = async () => {
    const query = searchString ? searchString : search;
    const apiURL =
      "https://www.googleapis.com/books/v1/volumes?q=" +
      query +
      "&maxResults=15&startIndex=" +
      pageCurrent;

    const res = await fetch(apiURL);
    const jsonData = await res.json();

    dispatch({ type: "getBooks", payload: jsonData.items });

    setLoading(false);
  }

  const handleChangeSearch = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const value = e.nativeEvent.text;
    dispatch({ type: "setSearch", payload: value });

  };

  const handleSearch = () => {
    if (pageCurrent > 0) {
      setPageCurrent(0);
    }
    dispatch({ type: "reset" });

    loadBooks()
  };

  const handleLoadMore = () => {
    if(!loading){
      setLoading(true);
      setPageCurrent(pageCurrent + 15)
      loadBooks();
    }
  }

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
        search={search}
        books={books}
        loading={loading}
        handleLoadMore={handleLoadMore}
      />
    </Container>
  );
};

export default List;
