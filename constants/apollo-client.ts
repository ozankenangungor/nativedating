import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { API_URL } from "./urls";



const client = new ApolloClient({
  link: new HttpLink({
    uri: `http://192.168.2.188:3001/graphql`,
  }),
  cache: new InMemoryCache(),
});

export default client;
