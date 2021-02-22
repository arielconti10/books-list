import React from 'react';
import { TextInputProps } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';


const SearchBar: React.FC<TextInputProps> = ({...props}) => {
  
  return (
      <TextInput placeholder="Pesquise um tema de livros aqui!" 
        style={{
          paddingTop: 20,
          marginBottom: 20,
          alignSelf: 'center'
        }}
        {...props}
      />
  );
}

export default SearchBar;