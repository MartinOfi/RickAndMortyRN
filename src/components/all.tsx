import React, { FC } from "react";
import { Image, Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { charInterface, epiInterface, locInterface } from "./types";
import useModal from "../hooks/useModal";
import AllModal from "./modal";
interface Props {
  data: charInterface | locInterface | epiInterface | any;
  type: string;
}

const Card: FC<Props> = ({ data, type }) => {
  const { isOpen, handlerOpenModal } = useModal();
  if (data) {
    if (type === "characters") {
      return (
        <View key={data.id}>
          <TouchableOpacity
            style={styles.charactersimaglist}
            onPress={handlerOpenModal}
          >
            <Text style={{ fontSize: 30, marginBottom: 20 }}>{data.name}</Text>
            <Image
              source={{ uri: data.image }}
              style={{ width: 300, height: 300 }}
            />
          </TouchableOpacity>
          <View>
            <AllModal
              isOpen={isOpen}
              data={data}
              handlerOpenModal={handlerOpenModal}
              type="characters"
            />
          </View>
        </View>
      );
    }
    if (type === "locations") {
      return (
        <View key={data.id}>
          <TouchableOpacity
            style={styles.locAndEpisimglist}
            onPress={handlerOpenModal}
          >
            <Text style={{ fontSize: 30, marginBottom: 20 }}>{data.name}</Text>
            <Text style={{ fontSize: 30, marginBottom: 20 }}>
              {data.dimension}
            </Text>
          </TouchableOpacity>
          <View>
            <AllModal
              isOpen={isOpen}
              data={data}
              handlerOpenModal={handlerOpenModal}
              type="locations"
            />
          </View>
        </View>
      );
    }
    if (type === "episodes") {
      return (
        <View key={data.id}>
          <TouchableOpacity
            style={styles.locAndEpisimglist}
            onPress={handlerOpenModal}
          >
            <Text style={{ fontSize: 30, marginBottom: 20 }}>{data.name}</Text>
            <Text style={{ fontSize: 30, marginBottom: 20 }}>
              {data.episode}
            </Text>
          </TouchableOpacity>
          <View>
            <AllModal
              isOpen={isOpen}
              data={data}
              handlerOpenModal={handlerOpenModal}
              type="episodes"
            />
          </View>
        </View>
      );
    }
  }
  return <></>;
};
export default Card;

const styles = StyleSheet.create({
  charactersimaglist: {
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
  locAndEpisimglist: {
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
});
