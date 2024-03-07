import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import InNav from "./navigators/InNav";
import OutNav from "./navigators/OutNav";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);
  return (
    <NavigationContainer>
      {isLoggedIn ? <InNav /> : <OutNav />}
    </NavigationContainer>
  );
}
//firebase에서는 상태가 변경될 때에만 Listener를 넣을 수 있다.
/* onAuthStateChanged의 설명을 보면,
Example
const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // Signed in
  } else {
    // Signed out
  }
});

// Unsubscribe from further state changes
unsubscribe();
이렇게 써있다. 예전에 onSnapShot처럼 이것도 계속 추적관찰하는 기능이
있고, const unsubscribe로 담아서 나중에 호출하면 추적관찰을 끊을 수 있는 것 같다.
*/
