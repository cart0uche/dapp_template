const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Change the value", function () {
   let simpleStorage;

   beforeEach(async function () {
      let SimpleStorage = await ethers.getContractFactory("SimpleStorage");
      simpleStorage = await SimpleStorage.deploy();
   });

   it("should return the new value once it's changed", async function () {
      expect(await simpleStorage.getNumber()).to.equal(5);
      await simpleStorage.setNumber(7);
      expect(await simpleStorage.getNumber()).to.equal(7);
   });

   it("emit an event when a new value is added", async function () {
      await expect(simpleStorage.setNumber(7))
         .to.emit(simpleStorage, "NewValue")
         .withArgs(7);
   });
});
