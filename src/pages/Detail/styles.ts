import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const Header = styled.View`
  /* padding: 24px; */
  /* padding-top: ${getStatusBarHeight() + 24}px; */
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Container = styled.View`
  padding: ${getStatusBarHeight() + 24}px 30px 24px;
`;

export const HeaderInfo = styled.View`
  flex-direction: row;
`;

export const Title = styled.Text`
  font-size: 24px;
  flex-wrap: wrap;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const BookInfoContainer = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const AuthorName = styled.Text`
  font-size: 12px;
  color: #9e9e9e;
  margin-bottom: 10px;
`;

export const PriceRatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
  margin-left: 20px;
`;

export const Price = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin-top: 20px;
  color: #000;
`;

export const DescriptionContainer = styled.View`
  flex: 1;
  background: #fff;
  padding: 30px;
`;

export const Description = styled.Text`
  font-size: 14px;
  color: #000;
  line-height: 25px;
  height: 400px;
`;

export const ActionsContainer = styled.View`
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
`;

export const BuyButton = styled.TouchableOpacity`
  border-radius: 20px;
  width: 100px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  background-color: #549be6;
  margin-right: 10px;
  padding: 10px;
`;

export const BuyButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  align-self: center;
`;

export const LikeButton = styled.TouchableOpacity`
  width: 35px;
  height: 35px;
  border-radius: 20px;
  background-color: #e05567;
  align-items: center;
  justify-content: center;
`;

export const PageCount = styled.Text`
  color: #9e9e9e;
  font-size: 12px;
  margin-left: 20px;
  /* margin: 25px 0; */
`;
