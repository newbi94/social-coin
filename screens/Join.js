import React, { useRef, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import styled from "styled-components/native";
import auth from "@react-native-firebase/auth";
import { BLACK_COLOR } from "../colors";

const Container = styled.View`
  background-color: ${BLACK_COLOR};
  flex: 1;
  align-items: center;
  color: white;
  padding: 60px 20px;
`;
const TextInput = styled.TextInput`
  width: 100%;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 10px;
  font-size: 16px;
  color: white;
  background-color: rgba(255, 255, 255, 0.5);
`;
const Btn = styled.TouchableOpacity`
  width: 100%;
  padding: 10px 20px;
  border-width: 1px;
  border-radius: 20px;
  border-color: rgba(255, 255, 255, 0.5);
  justify-content: center;
  align-items: center;
`;
const BtnText = styled.Text`
  color: white;
  font-size: 16px;
`;
const Join = () => {
  passwordInput = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitEmailEditing = () => {
    passwordInput.current.focus();
  };
  const onSubmitPasswordEditing = async () => {
    if (email === "" || password === "") {
      return Alert.alert("Fill in the form.");
    }
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(userCredential);
      setLoading(false);
    } catch (e) {
      switch (e.code) {
        case "auth/weak-password": {
          Alert.alert("Write a stronger password!");
        }
      }
    }
  };
  //createUserWithEmailAndPassword는 userCredential함수를 반환한다.
  //그것들은 에러에 관련한 사항들인데, 지난번의 onSnapshot 함수처럼
  //const userCredential = ~ 을 통해 담아 사용한다.
  //switch~ 부분에서 e.code가 "auth/weak-password"인 경우,
  //"Write a stronger password!"라는 알림으로 대체하는 기능을 구현했다.
  //e.code는 e(에러)의 props중 하나인데, 비밀번호를 두글자만 입력하고 submit했을 때의
  //console.log(e.code)를 찾아내서 case안에 넣어준 것이다.
  //이로 인해 짧은 비밀번호를 입력했을 경우 즉, 보안이 취약한("auth/weak-password"라는 e.code를 가지는 오류 케이스)
  //경우에 알림을 줄 수 있게되었다.
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
        onSubmitEditing={onSubmitEmailEditing}
        placeholderTextColor={"rgba(255,255,255,0.7)"}
      />
      <TextInput
        ref={passwordInput}
        placeholder="Password"
        secureTextEntry
        value={password}
        returnKeyLabel="done"
        onChangeText={(text) => setPassword(text)}
        placeholderTextColor={"rgba(255,255,255,0.7)"}
        onSubmitEditing={onSubmitPasswordEditing}
      />
      <Btn onPress={onSubmitPasswordEditing}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <BtnText>Create Account</BtnText>
        )}
      </Btn>
    </Container>
  );
};

export default Join;
