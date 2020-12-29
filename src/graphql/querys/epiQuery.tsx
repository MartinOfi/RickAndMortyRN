import React, { useState, useEffect, FC } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";
import { Text, View, StyleSheet, ScrollView, Button } from "react-native";
import Episode from "../../components/episode";

interface Props {
  text: string;
}
interface IEpisode {
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
}
const EpiQuery: FC<Props> = ({ text }) => {
  if (text.length > 2) {
    const [searchs, setSearchs] = useState<any>([]);
    const [page, setPage] = useState<number>(1);
    const [rightButton, setRB] = useState<boolean>(false);
    const [leftButton, setLB] = useState<boolean>(true);
    const GET_EPISODES = gql`
      query GET_EPIS($name: String, $page: Int) {
        episodes(page: $page, filter: { name: $name }) {
          info {
            count
            pages
            next
            prev
          }
          results {
            id
            name
            air_date
            episode
            characters {
              name
              image
            }
          }
        }
      }
    `;
    const { data, loading, error } = useQuery(GET_EPISODES, {
      variables: { name: text, page: page },
    });

    const NextPage = () => {
      if (data.episodes.info.pages != page) {
        setPage(data.episodes.info.next);
        setLB(false);
        if (data.episodes.info.pages == data.episodes.info.next) {
          setRB(true);
        }
      }
    };
    const PrevPage = () => {
      if (page != 1) {
        setPage(page - 1);
        setRB(false);

        if (data.episodes.info.prev == 1) {
          setLB(true);
        }
      }
    };
    useEffect(() => {
      if (data && !loading && !error) {
        setSearchs([...data.episodes.results]);
      }
    }, [data, loading, error]);

    if (loading)
      return (
        <View style={styles.emptyErrorLoad}>
          <Text style={{ fontSize: 20 }}>Loading...</Text>
        </View>
      );
    if (error)
      return (
        <View style={styles.emptyErrorLoad}>
          <Text style={{ fontSize: 20 }}>Error...</Text>
        </View>
      );
    return (
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.imaglist}>
          {searchs.map((search: IEpisode, index: number) => (
            <View key={index}>
              <Episode episode={search} />
            </View>
          ))}
          <View style={styles.allButtons}>
            {data.episodes.info.pages > 1 ? (
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
    marginVertical: 10,
    marginBottom: 120,
  },
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
export default EpiQuery;
