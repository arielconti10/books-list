import React, { useEffect, useState, createRef } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import genericImage from "../../assets/genericCover.gif";

interface Props {
  search: string;
  loading: boolean;
  data: [];
  handleLoadMore: () => void;
}

const BookList: React.FC<Props> = ({
  children,
  search,
  data,
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
            flexWrap: "nowrap",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Details", { data: item });
            }}
          >
            {item.volumeInfo.imageLinks ? (
              <Image
                source={{ uri: item.volumeInfo.imageLinks.thumbnail }}
                style={{
                  width: 110,
                  height: 160,
                  resizeMode: "cover",
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

  const renderFooter = () => {
    return loading ? (
      <View style={{ alignItems: "center", marginTop: 30 }}>
        <ActivityIndicator />
      </View>
    ) : null;
  };

  return (
    <>
      <FlatList
        style={{
          flex: 1,
          marginTop: 20,
          paddingHorizontal: 15,
          paddingBottom: 50,
        }}
        numColumns={3}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0}
        onEndReached={handleLoadMore}
      />
    </>
  );
};

export default BookList;
