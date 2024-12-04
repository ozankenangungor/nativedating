import { ApolloClient, InMemoryCache, ApolloLink, split, createHttpLink } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';  // WebSocketLink ekliyoruz
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = createHttpLink({
  uri: "http://192.168.2.188:3001/graphql",
});

const wsLink = new WebSocketLink({
  uri: "ws://192.168.2.188:3001/graphql",
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    // Tür kontrolü ekliyoruz
    if (definition.kind === 'OperationDefinition') {
      return definition.operation === 'subscription';  // sadece 'subscription' işlemi için WebSocketLink
    }

    return false;  // Diğer operasyonlar için HTTPLink kullanılır
  },
  wsLink,  // Subscription işlemleri için WebSocket
  httpLink  // Diğer işlemler için HTTP
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
