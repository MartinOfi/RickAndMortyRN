import React, { useState, useEffect, FC } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";
import { Text, View, StyleSheet, ScrollView, Button } from "react-native";
import Location from "../../components/location";

interface ILocationsQueryProps {
  text: string;

}
interface ILocation {
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
}
const LocQuery: FC<ILocationsQueryProps> = ({ text }) => {
  if (text.length > 2) {
    const [searchs, setSearchs] = useState<any>([]);
    const [page, setPage] = useState<number>(1);
    const [rightButton, setRB] = useState<boolean>(false);
    const [leftButton, setLB] = useState<boolean>(true);
    const GET_LOCATIONS = gql`
      query GET_LOCS($name: String, $page: Int) {
        locations(page: $page, filter: { name: $name }) {
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
            dimension
            residents {
              name
              image
            }
          }
        }
      }
    `;
    const { data, loading, error } = useQuery(GET_LOCATIONS, {
      variables: { name: text, page: page },
    });
    
    


    useEffect(() => {
      if (data && !loading && !error) {
        setSearchs([...data.locations.results]);
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
          <Text style={{ fontSize: 20 }}>No results found</Text>
        </View>
      );
      const NextPage=()=> {
        if (data.locations.info.pages != page) {
          setPage(data.locations.info.next);
          setLB(false);
          if (data.locations.info.pages == data.locations.info.next) {
            setRB(true);
          }
        }
      }
      const PrevPage=()=> {
        if (page != 1) {
          setPage(page - 1);
          setRB(false);
  
          if (data.locations.info.prev == 1) {
            setLB(true);
          }
        }
      }
    return (
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.imaglist}>
          {searchs.map((search:ILocation,index:number) => 
            
              <View key={index}>
                <Location location={search}  key={search.id} />
              </View>
            
          )}
          <View style={styles.allButtons}>
            {data.locations.info.pages > 1  ? (
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
export default LocQuery;
