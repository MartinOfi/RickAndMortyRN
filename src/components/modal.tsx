import React, { FC } from "react";
import {
  Button,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
interface Props {
  isOpen: boolean;
  data: any;
  handlerOpenModal: () => void;
  type: string;
}
interface Character {
  name: string;
  image: string;
}
const AllModal: FC<Props> = ({ isOpen, data, handlerOpenModal, type }) => {
  const chars = [];
  if (data.residents !== undefined) {
    for (let i = 0; i < 5; i++) {
      chars.push(data.residents[i]);
      if (i === data.residents.length - 1) {
        break;
      }
    }
  }
  if (data.characters !== undefined) {
    for (let i = 0; i < 5; i++) {
      chars.push(data.characters[i]);
      if (i === data.characters.length - 1) {
        break;
      }
    }
  }

  return (
    <Modal visible={isOpen}>
      <View style={styles.modal}>
        {type === "characters" ? (
          <View>
            <Image
              source={{ uri: data.image }}
              style={{ width: 350, height: 350 }}
            />
            <Text style={styles.textName}>{data.name}</Text>
            <Text style={styles.text}>Type: {data.type}</Text>
            <Text style={styles.text}>Gender: {data.gender}</Text>
            <Text style={styles.text}>Species: {data.species} </Text>
            <Button title="Close" onPress={handlerOpenModal} />
          </View>
        ) : null}
        {type === "locations" ? (
          <ScrollView style={styles.modal}>
            <Text style={styles.textName}>{data.name}</Text>
            <Text style={styles.text}>Type: {data.type}</Text>
            <Text style={styles.text}>Dimension: {data.dimension}</Text>
            <Text style={{ fontSize: 20, marginTop: 5 }}>Species: </Text>
            
          </ScrollView>
        ) : null}
        {type === "episodes" ? (
          <ScrollView style={styles.modal}>
            <Text style={styles.textName}>{data.name}</Text>
            <Text style={styles.text}>Release date: {data.air_date}</Text>
            <Text style={styles.text}>Episode: {data.episode}</Text>
            <Text style={{ fontSize: 20, marginTop: 15 }}>Characters: </Text>
           
          </ScrollView>
        ) : null}
      </View>
      {type !== "characters" ? 
      <ScrollView>
        {chars.map((char: Character,index) => (
          <View style={styles.conteiner} key={index}>
            <Image source={{ uri: char.image }} style={styles.img} />
            <Text style={styles.charDetail}>{char.name}</Text>
          </View>
        ))} 
         <Button title="Close" onPress={handlerOpenModal} />
      </ScrollView>:null}
    </Modal>
  );
};

export default AllModal;

const styles = StyleSheet.create({
  modal: {
    marginVertical: 10,
    marginHorizontal: 23,
  },
  textName: {
    fontSize: 30,
    marginLeft: "25%",
    fontWeight: "bold",
  },
  conteiner: {
    marginLeft:5,
    marginRight:5,
    flexDirection: "row",
    marginTop:0,
    borderWidth: 1,
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  charDetail:{
      paddingTop: 40,
      paddingLeft: 15,
      fontSize: 20,
    }
});
