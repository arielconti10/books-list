import React, { useState, useCallback } from "react";
import {
  Alert,
  NativeSyntheticEvent,
  Text,
  TextInputChangeEventData,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Container } from "./styles";

const Home: React.FC = () => {
  const navigation = useNavigation();

  const [search, setSearchString] = useState<string>("");

  const handleChangeSearch = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
      const value = e.nativeEvent.text;

      setSearchString(value);
    },
    []
  );

  const handleSearch = useCallback(() => {
    if (search === "") {
      Alert.alert("Digite um tema para pesquisar");
      return;
    }

    navigation.navigate("List", { search });
  }, [search]);

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
