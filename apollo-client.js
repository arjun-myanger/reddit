import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://karnobat.stepzen.net/api/quiet-armadillo/__graphql",
    headers: {
        authorization: 'Apikey ${process.env.NEXT_PUBLIC_STEPZEN_KEY}'
    },
    cache: new InMemoryCache(),
});

export default client;