import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  Pressable,
} from "react-native";

const App: React.FC = () => {
  const [whiteTime, setWhiteTime] = useState(600000);
  const [blackTime, setBlackTime] = useState(600000);
  const [whiteIntervalId, setWhiteIntervalId] = useState<NodeJS.Timeout | null>(
    null
  );
  const [blackIntervalId, setBlackIntervalId] = useState<NodeJS.Timeout | null>(
    null
  );
  const [activePlayer, setActivePlayer] = useState("white");
  useEffect(() => {
    return () => {
      if (whiteIntervalId) {
        clearInterval(whiteIntervalId);
      }
      if (blackIntervalId) {
        clearInterval(blackIntervalId);
      }
    };
  }, [whiteIntervalId, blackIntervalId]);

  const startWhiteClock = () => {
    setActivePlayer("white");
    if (typeof whiteIntervalId === "number") {
      clearInterval(whiteIntervalId);
    }
    setWhiteIntervalId(null);
    if (!whiteIntervalId) {
      const intervalId = setInterval(() => {
        setWhiteTime(whiteTime - 1000);
      }, 1000);
      setWhiteIntervalId(intervalId);
    }
  };

  const whiteTimeInMinutes = Math.floor(whiteTime / 60000);
  const whiteTimeInSeconds = Math.floor((whiteTime % 60000) / 1000);

  const startBlackClock = () => {
    setActivePlayer("black");
    if (typeof blackIntervalId === "number") {
      clearInterval(blackIntervalId);
    }
    setBlackIntervalId(null);
    if (!blackIntervalId) {
      const intervalId = setInterval(() => {
        setBlackTime(blackTime - 1000);
      }, 1000);
      setBlackIntervalId(intervalId);
    }
  };

  const blackTimeInMinutes = Math.floor(blackTime / 60000);
  const blackTimeInSeconds = Math.floor((blackTime % 60000) / 1000);

  return (
    <SafeAreaView>
      <View>
        <Pressable onPress={startBlackClock} style={styles.button2}>
          <Text style={styles.buttontext}>{`${blackTimeInMinutes.toLocaleString(
            undefined,
            {
              minimumIntegerDigits: 2,
            }
          )}:${blackTimeInSeconds.toLocaleString(undefined, {
            minimumIntegerDigits: 2,
          })}`}</Text>
        </Pressable>
        <Text style={styles.currplayer}>Active Player: {activePlayer}</Text>
        <Pressable onPress={startWhiteClock} style={styles.button}>
          <Text style={styles.buttontext}>{`${whiteTimeInMinutes.toLocaleString(
            undefined,
            {
              minimumIntegerDigits: 2,
            }
          )}:${whiteTimeInSeconds.toLocaleString(undefined, {
            minimumIntegerDigits: 2,
          })}`}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  currplayer: {
    justifyContent: "center",
    textAlign: "center",
  },

  button: {
    height: 350,
    backgroundColor: "#C4A484",
    textAlign: "center",
  },

  button2: {
    height: 350,
    backgroundColor: "black",
    textAlign: "center",
  },

  buttontext: {
    paddingTop: 150,
    textAlign: "center",
    color: "white",
    fontSize: 24,
  },
});

export default App;
