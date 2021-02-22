import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AirbnbRating } from "react-native-ratings";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useNavigation } from "@react-navigation/native";

import genericImage from "../../assets/genericCover.gif";

import {
  AuthorName,
  ActionsContainer,
  ButtonContainer,
  BookInfoContainer,
  BuyButton,
  BuyButtonText,
  Container,
  Description,
  DescriptionContainer,
  HeaderInfo,
  LikeButton,
  PageCount,
  Price,
  Title,
  PriceRatingContainer,
  RatingContainer,
  Header,
} from "./styles";

const Detail: React.FC = ({ route, navigation }) => {
  const { data } = route.params;

  const [like, setlike] = useState(false);
  const [rating, setRating] = useState(0);

  const handleLike = () => {
    setlike(!like);
  };

  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <>
      <Container>
        <Header>
          <TouchableOpacity onPress={handleBack}>
            <Icon name="arrow-left" size={20} color="#000" />
          </TouchableOpacity>

          <Text>Harry Potter</Text>

          <Icon name="magnify" size={20} color="#000" />
        </Header>

        <HeaderInfo>
          {data.volumeInfo.imageLinks ? (
            <View
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 10,
                  height: 12,
                },
                shadowOpacity: 0.36,
                shadowRadius: 6.68,
                elevation: 24,
              }}
            >
              <Image
                source={{ uri: data.volumeInfo.imageLinks.thumbnail }}
                style={{
                  height: 180,
                  width: 120,
                  resizeMode: "cover",
                }}
              />
            </View>
          ) : (
            <Image
              source={genericImage}
              style={{
                height: 180,
                width: 120,
                resizeMode: "cover",
                marginRight: 20,
              }}
            />
          )}
          <BookInfoContainer>
            <Title>{data.volumeInfo.title}</Title>

            {data.volumeInfo.authors && (
              <AuthorName>by {data.volumeInfo.authors[0]}</AuthorName>
            )}

            <PriceRatingContainer>
              {data.saleInfo.saleability === "FOR_SALE" ? (
                <Price>R${data.saleInfo.listPrice.amount}</Price>
              ) : (
                <Price>Indisponível</Price>
              )}
              <RatingContainer>
                <AirbnbRating
                  showRating={false}
                  size={16}
                  selectedColor="#585854"
                  defaultRating={0}
                  starStyle={{ marginTop: 10, marginRight: 1 }}
                  onFinishRating={(rating) => setRating(rating)}
                />
              </RatingContainer>
            </PriceRatingContainer>
          </BookInfoContainer>
        </HeaderInfo>

        <ActionsContainer>
          <PageCount>{data.volumeInfo.pageCount} pages</PageCount>
          <ButtonContainer>
            <BuyButton>
              <BuyButtonText>Comprar</BuyButtonText>
            </BuyButton>

            <LikeButton onPress={handleLike}>
              <Icon
                name={like ? "heart" : "heart-outline"}
                size={20}
                color="#fff"
              />
            </LikeButton>
          </ButtonContainer>
        </ActionsContainer>
      </Container>

      <DescriptionContainer>
        <Description>{data.volumeInfo.description}</Description>
      </DescriptionContainer>
    </>
  );
};

export default Detail;
