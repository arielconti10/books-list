import React, { useState } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import genericImage from '../../assets/genericCover.gif';
import { Book } from '.';
import { List, LoadingView } from './styles';

interface Props {
  search: string;
  loading: boolean;
  books: Book[];
  handleLoadMore: () => void;
}


const BookList: React.FC<Props> = ({
  books,
  loading,
  handleLoadMore,
}) => {
  const navigation = useNavigation();

  const renderItem = ({ item }: any) => {
    if (item) {
      return (
        <View
          style={{
            width: 110,
            height: 160,
            flex: 1,
            marginBottom: 20,
            flexWrap: 'nowrap',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details', { data: item });
            }}
          >
            {item.volumeInfo.imageLinks ? (
              <Image
                source={{ uri: item.volumeInfo.imageLinks.thumbnail }}
                style={{
                  width: 110,
                  height: 160,
                  resizeMode: 'cover',
                }}
              />
            ) : (
              <Image
                source={genericImage}
                style={{ width: 110, height: 160 }}
              />
            )}
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  };

  const RenderLoading = () => {
    return loading ? (
      <LoadingView>
        <ActivityIndicator size='large'/>
      </LoadingView>
    ) : null;
  };

  return (
    <>
      <List
        numColumns={3}
        data={books}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={RenderLoading}
        onEndReachedThreshold={0.1}
        onEndReached={handleLoadMore}
      />
    </>
  );
};

export default BookList;
