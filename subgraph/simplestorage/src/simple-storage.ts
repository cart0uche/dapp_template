import { NewValue as NewValueEvent } from "../generated/SimpleStorage/SimpleStorage"
import { NewValue } from "../generated/schema"

export function handleNewValue(event: NewValueEvent): void {
  let entity = new NewValue(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.number = event.params.number

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
