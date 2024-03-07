import React, { useRef, useState } from "react";
import { TextInput } from "react-native";
import styled from "styled-components/native";

const Container = styled.View``;
const Text = styled.Text``;

const Join = () => {
  passwordInput = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitEditing = () => {
    passwordInput.current.focus();
  };
  //엔터(onSubmit)를 누르면 다음칸인 password칸으로 이동하는 기능 구현.
  //선행 코드로 상단에 passwordInput = useRef()를 써주고, 아래 password 컴포넌트에
  //ref (레퍼런스)로 passwordInput을 줬다.
  return (
    <Container>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        value={email}
        returnKeyLabel="next"
        onChangeText={(text) => setEmail(text)}
        onSubmitEditing={onSubmitEditing}
      />
      <TextInput
        ref={passwordInput}
        placeholder="Password"
        secureTextEntry
        value={password}
        returnKeyLabel="done"
        onChangeText={(text) => setPassword(text)}
      />
    </Container>
  );
};

export default Join;
