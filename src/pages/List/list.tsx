import React, { useEffect, useState, createRef } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import genericImage from "../../assets/genericCover.gif";

interface Props {
  search: string;
}

const List: React.FC<Props> = ({ children, search }) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [searchString, setSearchString] = useState("");

  const [loading, setLoading] = useState(false);
  const [pageCurrent, setpageCurrent] = useState(1);

  useEffect(() => {
    setLoading(true);
    setSearchString(search);
    getData();
    return () => {};
  }, [pageCurrent]);

  const getData = async () => {
    if (searchString === "") {
      setSearchString("Design");
    }
    const apiURL =
      "https://www.googleapis.com/books/v1/volumes?q=Harry+Potter&maxResults=12&startIndex=" +
      pageCurrent;

    fetch(apiURL)
      .then((res) => res.json())
      .then((resJson) => {
        setData(data.concat(resJson.items));
      });
  };

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

  const handleLoadMore = () => {
    setTimeout(() => {
      setpageCurrent(pageCurrent + 12);
      setLoading(true);
    }, 500);
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

export default List;
