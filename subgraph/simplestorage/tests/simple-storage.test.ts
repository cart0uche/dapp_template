import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt } from "@graphprotocol/graph-ts"
import { NewValue } from "../generated/schema"
import { NewValue as NewValueEvent } from "../generated/SimpleStorage/SimpleStorage"
import { handleNewValue } from "../src/simple-storage"
import { createNewValueEvent } from "./simple-storage-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let number = BigInt.fromI32(234)
    let newNewValueEvent = createNewValueEvent(number)
    handleNewValue(newNewValueEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("NewValue created and stored", () => {
    assert.entityCount("NewValue", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "NewValue",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "number",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
