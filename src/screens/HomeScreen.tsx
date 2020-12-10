import React, { FC } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const HomeScreen:FC = (props:any) => {
  return (
    <View style={styles.screen}>
      <View>
        <Text style={{fontSize:28 }}>REACT NATIVE CHALLENGE</Text>
        <Text style={{ paddingLeft: 75,fontSize:25 }}>Oficialdegui, Martin</Text>
      </View>

      <Button
        title="Go to Search!"
        onPress={() => {
          props.navigation.navigate({ routeName: "Characters" });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    flexDirection: "column",
    paddingVertical: "20%",
  },
});
export default HomeScreen;
