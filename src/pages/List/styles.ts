import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const Container = styled.View`
  flex: 1;
  width: 100%;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: #ffe208;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const LoadingView = styled.View`
  align-items: center;
  margin-top: 30px;
`
export const List = styled.FlatList`
  flex: 1;
  margin-top: 20px;
  padding: 0 15px;
`
