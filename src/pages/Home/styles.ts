import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 30px;
  padding-top: ${getStatusBarHeight() + 24}px;
`;

export const WelcomeText = styled.Text`
  font-size: 22px;
  align-self: center;
`
export const SearchInput = styled.TextInput`
  padding: 20px;
  margin-bottom: 20px;
  flex: 1;
`
export const SearchButton = styled.TouchableOpacity`
  margin: 20px 0;
`

export const SearchButtonText = styled.Text`
  font-size: 24px;
`
