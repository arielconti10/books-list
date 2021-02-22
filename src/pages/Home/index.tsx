import React, { useState } from "react";
import {
  Alert,
  NativeSyntheticEvent,
  Text,
  TextInputChangeEventData,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Container } from "./styles";
import axios from "axios";

const Home: React.FC = () => {
  const navigation = useNavigation();

  const [search, setSearchString] = useState<string>("");
  const [books, setBooks] = useState();

  const handleChangeSearch = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const value = e.nativeEvent.text;

    setSearchString(value);
  };

  const handleSearch = () => {
    try {
      if (search === "") {
        Alert.alert("Digite um tema para pesquisar");
        return;
      }

      navigation.navigate("List", { search });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Text style={{ fontSize: 22, alignSelf: "center" }}>Seja bem-vindo!</Text>

      <TextInput
        placeholder="Pesquise um tema de livros aqui!"
        style={{
          padding: 20,
          marginBottom: 20,
          flex: 1,
        }}
        onChange={handleChangeSearch}
      />

      <TouchableOpacity style={{ marginVertical: 20 }} onPress={handleSearch}>
        <Text style={{ fontSize: 24 }}>Pesquisar</Text>
      </TouchableOpacity>

      <Text>ou</Text>

      <TouchableOpacity
        style={{ padding: 20 }}
        onPress={() => navigation.navigate("List")}
      >
        <Text>Ir para lista de livros</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default Home;
