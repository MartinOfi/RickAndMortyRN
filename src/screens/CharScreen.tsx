import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import CharQuery from "../graphql/querys/charQuery";
import { Entypo } from "@expo/vector-icons";

const CharScreen = (props:any) => {
  var textParam:string = "";

  if (props.navigation.getParam("textId") != undefined) {
    textParam = props.navigation.getParam("textId");
  }
  useEffect(() => {
    if (textParam != "") {
      setSearch(textParam);
    } 
  }, [props.navigation.getParam("textId")]);
  const [search, setSearch] = useState("");
  function ClearInput() {
    setSearch("");
  }

  return (
    <View style={{ backgroundColor: "white" }}>
      <View
        style={{
          backgroundColor: "#7034df",
          borderRadius: 35,
          flexDirection: "row",
        }}
      >
        <TextInput
          style={styles.textinput}
          onChangeText={(text) => setSearch(text)}
          placeholder="Ej:mor"
          value={search}
        />
        {search != "" ? (
          <TouchableOpacity style={styles.cross} onPress={ClearInput}>
            <Entypo name="cross" size={30} color="black" />
          </TouchableOpacity>
        ) : null}
      </View>

      <CharQuery text={search} />

      <View style={styles.allbuttons}>
        <View style={styles.onebutton}>
          <Button title="Characters" onPress={()=>{}}/>
        </View>
        <View style={styles.onebutton}>
          <Button
            title="Location"
            onPress={() => {
              props.navigation.navigate({
                routeName: "Locations",
                params: { textId: search },
              });
            }}
          />
        </View>
        <View style={styles.onebutton}>
          <Button
            title="Episode"
            onPress={() => {
              props.navigation.navigate({
                routeName: "Episodes",
                params: { textId: search },
              });
            }}
          />
        </View>
      </View>
      <View style={{ marginBottom: 200 }}></View>
    </View>
  );
};

export default CharScreen;

const styles = StyleSheet.create({
  textinput: {
    paddingLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: "80%",
    marginHorizontal: "5%",
    marginVertical: "5%",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 25,
  },
  cross: {
    marginTop: 25,
    paddingRight: 20,
  },
  allbuttons: {
    flexDirection: "row",
    width: "100%",
    position: "absolute",
    top: 628,
    backgroundColor: "black",
  },
  onebutton: {
    width: "33.33%",
  },
});
