import React, { useState, useEffect,FC } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";
import { Text, View, StyleSheet, ScrollView, Button } from "react-native";
import Character from "../../components/character";

interface ICharactersQueryProps {
  text: string;
}
interface ICharacter {
  id: number;
  name: string;
  type: string;
  gender: string;
  species: string;
  image: string;
}

const CharQuery: FC<ICharactersQueryProps> = ({ text }) => {
  if (text.length > 2) {
    const [searchs, setSearchs] = useState<any>([]);
    const [page, setPage] = useState<number>(1);
    const [rightButton, setRB] = useState<boolean>(false);
    const [leftButton, setLB] = useState<boolean>(true);
    const GET_CHARACTERS = gql`
      query GET_CHAR($name: String, $page: Int) {
        characters(page: $page, filter: { name: $name }) {
          info {
            count
            pages
            next
            prev
          }
          results {
            id
            name
            type
            gender
            species
            image
          }
        }
      }
    `;

    const { data, loading, error } = useQuery(GET_CHARACTERS, {
      variables: { name: text, page: page },
    });

    const NextPage=()=> {
      if (data.characters.info.pages != page) {
        setPage(data.characters.info.next);
        setLB(false);
        if (data.characters.info.pages == data.characters.info.next) {
          setRB(true);
        }
      }
    }
    const PrevPage=()=> {
      if (page != 1) {
        setPage(page - 1);
        setRB(false);

        if (data.characters.info.prev == 1) {
          setLB(true);
        }
      }
    }
    useEffect(() => {
      if (data && !loading && !error) {
        setSearchs([...data.characters.results]);
      }
    }, [data, error, loading]);

    if (loading)
      return (
        <View style={styles.emptyErrorLoad}>
          <Text style={{ fontSize: 20 }}>Loading...</Text>
        </View>
      );
    if (error)
      return (
        <View style={styles.emptyErrorLoad}>
          <Text style={{ fontSize: 20 }}>No results found</Text>
        </View>
      );
    return (
      <ScrollView>
        <View style={styles.imaglist}>
          {searchs.map((search: ICharacter) => {
            return (
              <View key={search.id}>
                <Character character={search} />
              </View>
            );
          })}
          <View style={styles.allButtons}>
            {data.characters.info.pages > 1 ? (
              <>
                <Button title="Prev" onPress={PrevPage} disabled={leftButton} />
                <Button
                  title="Next"
                  onPress={NextPage}
                  disabled={rightButton}
                />
              </>
            ) : null}
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View style={styles.emptyErrorLoad}>
        <Text style={{ fontSize: 20 }}>Enter 3 letters to search</Text>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  imaglist: {
    flex: 1,
    backgroundColor: "white",
    marginVertical: 25,
    marginBottom: 120,
  },
  emptyErrorLoad: {
    alignItems: "center",
    height: "100%",
    marginTop: 40,
  },
  allButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});
export default CharQuery;
