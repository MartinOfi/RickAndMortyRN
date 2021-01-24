import React, { useState, useEffect, FC } from "react";
import { useQuery } from "@apollo/client";
import { Text, View, StyleSheet, ScrollView, Button } from "react-native";
import Card from "./card";
import { charInterface } from "./types";
import { characterQuery, locationQuery, episodeQuery } from "../apollo/querys/allQuerys";

interface Props {
  text: string;
  option: string;
}

const CharLocEpi: FC<Props> = ({ text, option }) => {
  if (text.length > 2) {
    const [searchs, setSearchs] = useState<any>([]);
    const [page, setPage] = useState<number>(1);
    const [totalpages, setTotalpages] = useState<number>(1);
    const [rightButton, setRB] = useState<boolean>(false);
    const [leftButton, setLB] = useState<boolean>(true);

    const QueryType = (option: string): any => {
      if (option.startsWith("character")) {
        return characterQuery;
      }
      if (option.startsWith("location")) {
        return locationQuery;
      }
      if (option.startsWith("episode")) {
        return episodeQuery;
      }
    };

    const { data, loading, error } = useQuery(QueryType(option), {
      variables: { name: text, page: page },
    });

    useEffect(() => {
      if (data && !loading && !error) {
        if (option.startsWith("character")) {
          setTotalpages(data.characters.info.pages);
          setSearchs([...data.characters.results]);
        }
        if (option.startsWith("location")) {
          setTotalpages(data.locations.info.pages);
          setSearchs([...data.locations.results]);
        }
        if (option.startsWith("episode")) {
          setTotalpages(data.episodes.info.pages);
          setSearchs([...data.episodes.results]);
        }
      } // eslint-disable-next-line
    }, [data]);

   
    const NextPage = (): void => {
      if (data.characters) {
        if (data.characters.info.pages != page) {
          setPage(data.characters.info.next);
          setLB(false);
          if (data.characters.info.pages == data.characters.info.next) {
            setRB(true);
          }
        }
      }
      if (data.episodes) {
        if (data.episodes.info.pages != page) {
          setPage(data.episodes.info.next);
          setLB(false);
          if (data.episodes.info.pages == data.episodes.info.next) {
            setRB(true);
          }
        }
      }
      if (data.locations) {
        if (data.locations.info.pages != page) {
          setPage(data.locations.info.next);
          setLB(false);
          if (data.locations.info.pages == data.locations.info.next) {
            setRB(true);
          }
        }
      }
    };
    const PrevPage = (): void => {
      if (page != 1) {
        setPage(page - 1);
        setRB(false);
        if (
          data.characters.info.prev == 1 ||
          data.locations.info.prev == 1 ||
          data.episodes.info.prev == 1
        ) {
          setLB(true);
        }
      }
    };
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
          {searchs.map((search: charInterface,index:number) => {
            return (
              <View key={index}>
                <Card data={search} type={option} key={search.id} />
              </View>
            );
          })}
          <View style={styles.allButtons}>
            {totalpages > 1 ? (
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
export default CharLocEpi;
