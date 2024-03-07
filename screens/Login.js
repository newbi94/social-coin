import React from "react";
import styled from "styled-components/native";

const Container = styled.View``;
const Text = styled.Text``;
const Btn = styled.TouchableOpacity``;
const BtnTxt = styled.Text``;

const Login = ({ navigation: { navigate } }) => (
  <Container>
    <Text>
      Don't have an account?{" "}
      <Btn onPress={() => navigate("Join")}>
        <BtnTxt>Join</BtnTxt>
      </Btn>
    </Text>
  </Container>
);
//navigate에 존재하는 스크린은 기본적으로 ({navigation:{navigate}}) 즉,
//navigation props와 그 안의 navigate 함수를 사용할 수 있다.

export default Login;
