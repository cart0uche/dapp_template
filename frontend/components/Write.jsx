"use client";
import { useAccount } from "wagmi";
import { Flex, Input, Button, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
   usePrepareSimpleStorageSetNumber,
   useSimpleStorageSetNumber,
} from "../src/generated.ts";

export default function Write() {
   const [isClient, setIsClient] = useState(false); // https://nextjs.org/docs/messages/react-hydration-error
   const { isConnected } = useAccount();
   const [numberInput, setNumberInput] = useState(0);
   const { config } = usePrepareSimpleStorageSetNumber({
      args: [numberInput],
   });
   const { write, isError, error } = useSimpleStorageSetNumber(config);

   useEffect(() => {
      setIsClient(true);
   }, []);

   const handleInputChange = (event) => {
      setNumberInput(event.target.value);
   };

   const handleValidate = () => {
      console.log(numberInput);

      if (!isClient || !isConnected || isNaN(numberInput)) {
         console.log("not connected");
         return;
      }
      write?.();
   };

   return (
      <div>
         <Flex p="2rem" alignItems="left">
            <Box>
               <Input
                  type="number"
                  placeholder="New number"
                  value={numberInput}
                  onChange={handleInputChange}
                  size="s"
               />
            </Box>
            <Button colorScheme="teal" onClick={handleValidate}>
               Valider
            </Button>
         </Flex>
      </div>
   );
}
