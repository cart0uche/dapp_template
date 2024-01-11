import { useSimpleStorageNewValueEvent } from "../src/generated.ts";
import { getPublicClient } from "@wagmi/core";
import { parseAbiItem } from "viem";
import { useToast } from "@chakra-ui/react";
import { Flex, List, ListItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSimpleStorageContext } from "@/context/simpleStorage";  

export default function Event() {
   const { value } = useSimpleStorageContext();
   const [oldValues, setOldValues] = useState([]);
   const toast = useToast();
   useSimpleStorageNewValueEvent({
      listener(log) {
         console.log("log ", log);
         toast({
            title: "New value !",
            description: "A new value has been set.",
            status: "success",
            position: "top-middle",
            isClosable: true,
         });
         fetchValues();
      },
   });

   async function fetchValues() {
      const publicClient = getPublicClient();
      const logs = await publicClient.getLogs({
         event: parseAbiItem("event NewValue(uint256)"),
         fromBlock: 0n,
      });
      const currentOldValues = logs.map((log) => {
         return Number(log.args[0]);
      });
      setOldValues(currentOldValues);
   }

   useEffect(() => {
      fetchValues();
   }, []);

   useEffect(() => {
      console.log("Value  from context", value);
   }, [value]);

   return (
      <div>
         <Flex p="2rem">
            <List spacing={3}>
               {oldValues.map((value) => {
                  return <ListItem key={uuidv4()}>{value}</ListItem>;
               })}
            </List>
         </Flex>
      </div>
   );
}
