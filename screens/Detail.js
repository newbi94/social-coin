import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { history, info } from "../api";
import { Icon } from "../components/Coin";
import { useQuery } from "@tanstack/react-query";
import { BLACK_COLOR } from "../colors";
import { VictoryChart, VictoryLine, VictoryScatter } from "victory-native";

const Container = styled.ScrollView`
  background-color: ${BLACK_COLOR};
`;

const Detail = ({
  navigation,
  route: {
    params: { symbol, id },
  },
}) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Icon
          source={{
            uri: `https://coinicons-api.vercel.app/api/icon/${symbol.toLowerCase()}`,
          }}
        />
      ),
    });
  }, []);
  const { isLoading: infoLoading, data: infoData } = useQuery({
    queryKey: ["coinInfo", id],
    queryFn: info,
  });
  const { isLoading: historyLoading, data: historyData } = useQuery({
    queryKey: ["coinHistory", id],
    queryFn: history,
  });
  const [victoryData, setVictoryData] = useState(null);
  useEffect(() => {
    if (historyData) {
      setVictoryData(
        historyData.map((price) => ({
          x: new Date(price.timestamp).getTime(),
          y: price.price,
        }))
      );
    }
  }, [historyData]);
  return (
    <Container>
      {victoryData ? (
        <VictoryChart height={360}>
          <VictoryLine
            animate
            interpolation="monotoneX"
            data={victoryData}
            style={{ data: { stroke: "#1abc9c" } }}
          />
          <VictoryScatter
            data={victoryData}
            style={{ data: { fill: "#1abc9c" } }}
          />
        </VictoryChart>
      ) : null}
    </Container>
  );
};
export default Detail;
