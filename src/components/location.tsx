import React, { FC, useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  Modal,
  View,
  ScrollView
} from "react-native";

interface LocationProp {
  location: {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: [
      {
        name: string;
        image: string;
      }
    ];
  };
}
interface Location {
  name: string;
  image: string;
}
const Location: FC<LocationProp> = ({ location }) => {
  const [modal, setModal] = useState<boolean>(false);
  const HideModal = () => {
    setModal(false);
  };
  const ShowModal = () => {
    setModal(true);
  };

  var residents = [];
  if (location.residents.length > 5) {
    for (let i = 0; i < 5; i++) {
      residents.push(location.residents[i]);
    }
  } else {
    for (let i = 0; i < location.residents.length; i++) {
      residents.push(location.residents[i]);
    }
  }

  return (
    <View key={location.id}>
      <TouchableOpacity style={styles.imaglist2} onPress={ShowModal}>
        <Text style={{ fontSize: 30, marginBottom: 20 }}>{location.name}</Text>
        <Text style={{ fontSize: 30, marginBottom: 20 }}>
          {location.dimension}
        </Text>
      </TouchableOpacity>

      <Modal visible={modal}>
        <ScrollView style={styles.modal}>
          <Text style={{ fontSize: 30 ,marginLeft:"25%", fontWeight: 'bold'}}>{location.name}</Text>
          <Text style={{ fontSize: 20 }}>Type: {location.type}</Text>
          <Text style={{ fontSize: 20 }}>Dimension: {location.dimension}</Text>
          <Text style={{ fontSize: 20,marginTop:15 }}>Species: </Text>
          {residents.map((res:Location) => {
            return (
              <View style={styles.conteiner} >
                <Image source={{ uri: res.image }} style={styles.img} />
                <Text style={styles.textName}>{res.name}</Text>
              </View>
            );
          })}
          <Button title="Close" onPress={HideModal} />
        </ScrollView>
      </Modal>
    </View>
  );
};
export default Location;

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
