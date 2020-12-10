import React, { FC, useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  Modal,
  View,
} from "react-native";

interface CharacterProp{
  character:{
  id:number,
  name:string,
  type:string,
  gender:string,
  species:string,
  image:string
  }
}

const Character:FC<CharacterProp> = ({ character }) => {
  const [modal, setModal] = useState(false);
  const HideModal = () => {
    setModal(false);
  };
  const ShowModal = () => {
    setModal(true);
  };
  return (
    <View key={character.id}>
      <TouchableOpacity style={styles.imaglist2} onPress={ShowModal}>
        <Text style={{ fontSize: 30, marginBottom: 20 }}>{character.name}</Text>
        <Image
          source={{ uri: character.image }}
          style={{ width: 300, height: 300 }}
        />
      </TouchableOpacity>

      <Modal visible={modal}>
        <View style={styles.modal}>
          <Image
            source={{ uri: character.image }}
            style={{ width: 350, height: 350 }}
          />
          <Text
            style={{fontSize: 30,marginLeft:"25%", fontWeight: 'bold' }}
          >
            {character.name}
          </Text>
          <Text style={{fontSize: 20}}>Type: {character.type}</Text>
          <Text style={{fontSize: 20}}>Gender: {character.gender}</Text>
          <Text style={{fontSize:20}}>Species: {character.species} </Text>
          <Button title="Close" onPress={HideModal} />
        </View>
      </Modal>
    </View>
  );
};
export default Character;

const styles = StyleSheet.create({
  imaglist2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 2,
    width: "90%",
    backgroundColor: "#20e3b2",
    marginBottom: 20,
    marginHorizontal: 20,
    elevation: 10,
  },
  modal: {
    marginVertical: 20,
    marginHorizontal: 23,
  },
});
