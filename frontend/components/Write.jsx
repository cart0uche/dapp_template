"use client";
import { useAccount } from "wagmi";
import { Flex, Input, Button, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  useSimulateSimpleStorageSetNumber,
  useWriteSimpleStorageSetNumber,
} from "../src/generated.ts";
import { useSimpleStorageContext } from "@/context/simpleStorage";

export default function Write() {
  const [isClient, setIsClient] = useState(false); // https://nextjs.org/docs/messages/react-hydration-error
  const { isConnected } = useAccount();
  const [numberInput, setNumberInput] = useState(0);
  const { config } = useSimulateSimpleStorageSetNumber({
    args: [numberInput],
  });
  const { write } = useWriteSimpleStorageSetNumber(config);
  const { setValue } = useSimpleStorageContext();

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
    // send value in smart contract
    write?.();

    // update value in context
    setValue(numberInput);
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
        <Button colorScheme="teal" onClick={handleValidate} marginLeft={5}>
          Valider
        </Button>
      </Flex>
    </div>
  );
}
