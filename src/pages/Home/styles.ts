import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;

  align-items: center;
  padding: 30px;
  padding-top: ${getStatusBarHeight() + 24}px;
`;
