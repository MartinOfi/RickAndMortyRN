import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "./src/apollo/client";
import HomeNav from "./src/navigation/HomeNav";


export default function App() {
  return (
    <ApolloProvider client={client}>
      <HomeNav />
    </ApolloProvider>
  );
}
