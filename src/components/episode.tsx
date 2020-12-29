import React, { FC, useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  Modal,
  View,
  ScrollView,
} from "react-native";

interface Props {
  episode: {
    id: string;
    name: string;
    air_date: string;
    episode: string;
    characters: [
      {
        name: string;
        image: string;
      }
    ];
  };
}
interface Character {
  name: string;
  image: string;
}

const Episode: FC<Props> = ({ episode }) => {
  const [modal, setModal] = useState<boolean>(false);
  const HideModal = (): void => {
    setModal(false);
  };
  const ShowModal = (): void => {
    setModal(true);
  };

  const chars = [];
  for (let i = 0; i < 5; i++) {
    chars.push(episode.characters[i]);
    if (i === episode.characters.length - 1) {
      break;
    }
  }

  return (
    <View key={episode.id}>
      <TouchableOpacity style={styles.imaglist2} onPress={ShowModal}>
        <Text style={{ fontSize: 30, marginBottom: 20 }}>{episode.name}</Text>
        <Text style={{ fontSize: 30, marginBottom: 20 }}>
          {episode.episode}
        </Text>
      </TouchableOpacity>

      <Modal visible={modal}>
        <ScrollView style={styles.modal}>
          <Text style={{ fontSize: 30, marginLeft: "25%", fontWeight: "bold" }}>
            {episode.name}
          </Text>
          <Text style={{ fontSize: 20 }}>Release date: {episode.air_date}</Text>
          <Text style={{ fontSize: 20 }}>Episode: {episode.episode}</Text>
          <Text style={{ fontSize: 20, marginTop: 15 }}>Characters: </Text>
          {chars.map((char: Character, index: number) => (
            <View style={styles.conteiner} key={index}>
              <Image source={{ uri: char.image }} style={styles.img} />
              <Text style={styles.textName}>{char.name}</Text>
            </View>
          ))}
          <Button title="Close" onPress={HideModal} />
        </ScrollView>
      </Modal>
    </View>
  );
};
export default Episode;

const styles = StyleSheet.create({
  imaglist2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    width: "85%",
    marginHorizontal: "8%",
    backgroundColor: "#20e3b2",
    elevation: 5,
  },
  modal: {
    marginVertical: 20,
    marginHorizontal: 23,
  },
  textName: {
    paddingTop: 40,
    paddingLeft: 15,
    fontSize: 20,
  },
  conteiner: {
    flexDirection: "row",
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
});
