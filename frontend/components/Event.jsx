import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { Flex, List, ListItem, useToast } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useWatchSimpleStorageNewValueEvent } from "../src/generated.ts";

const APIURL =
  "https://api.thegraph.com/subgraphs/name/cart0uche/simplestorage";

function Event() {
  const toast = useToast();
  const [newValues, setNewValues] = useState([]);
  const client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
  });
  const tokensQuery = `
  query {
    newValues(first: 5) {
      id
      number
      blockNumber
      blockTimestamp
    }
  }
`;

  function refresh() {
    client
      .query({
        query: gql(tokensQuery),
      })
      .then((data) => {
        console.log("Subgraph data: ", data);
        const currentNewValues = data.data.newValues.map((value) => {
          return Number(value.number);
        });
        setNewValues(currentNewValues);
      })
      .catch((err) => {
        console.log("Error fetching data: ", err);
      });
  }

  useWatchSimpleStorageNewValueEvent({
    listener(log) {
      console.log("log ", log);
      toast({
        title: "New value !",
        description: "A new value has been set.",
        status: "success",
        position: "top-middle",
        isClosable: true,
      });
      refresh();
    },
  });

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div>
      <Flex p="2rem">
        <List spacing={3}>
          {newValues.map((value) => {
            return <ListItem key={uuidv4()}>{value}</ListItem>;
          })}
        </List>
      </Flex>
    </div>
  );
}

export default Event;
