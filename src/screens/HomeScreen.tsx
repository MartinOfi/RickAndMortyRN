import moment from "moment";
import React, { FC } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const HomeScreen:FC = (props:any) => {
  var date:any =moment().format('Do MMMM YYYY');
  return (
    <View style={styles.screen}>
      <View>
        <Text style={{fontSize:28 }}>REACT NATIVE CHALLENGE</Text>
        <Text style={{ paddingLeft: 75,fontSize:25 }}>Oficialdegui, Martin</Text>
      </View>
      <View>
      <Button
        title="Go to Search!"
        onPress={() => {
          props.navigation.navigate({ routeName: "Characters" });
        }}
      />
      <Text>{date}</Text>
      </View>
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
