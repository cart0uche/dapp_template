"use client";
import { useAccount } from "wagmi";
import { Flex } from "@chakra-ui/react";
import { useSimpleStorageGetNumber } from "../src/generated.ts";
import { useEffect, useState } from "react";

export default function Read() {
   const [isClient, setIsClient] = useState(false); // https://nextjs.org/docs/messages/react-hydration-error
   const { isConnected } = useAccount();
   const { data, isLoading } = useSimpleStorageGetNumber();

   useEffect(() => {
      setIsClient(true);
   }, []);

   return (
      <div>
         <Flex p="2rem" justifyContent="space-between" alignItems="right">
            <h1>
               Last data stored:{" "}
               {isClient && isConnected && !isLoading
                  ? Number(data)
                  : "loading ..."}
            </h1>
         </Flex>
      </div>
   );
}
