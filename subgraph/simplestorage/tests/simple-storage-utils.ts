import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import { NewValue } from "../generated/SimpleStorage/SimpleStorage"

export function createNewValueEvent(number: BigInt): NewValue {
  let newValueEvent = changetype<NewValue>(newMockEvent())

  newValueEvent.parameters = new Array()

  newValueEvent.parameters.push(
    new ethereum.EventParam("number", ethereum.Value.fromUnsignedBigInt(number))
  )

  return newValueEvent
}
