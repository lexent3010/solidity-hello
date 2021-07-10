import { parseHex } from './../utils/convert';
import { TonClient } from "@tonclient/core";
import { createClient } from "../utils/client";
import TonContract from "../utils/ton-contract";
import pkgSafeMultisigWallet from "../ton-packages/SafeMultisigWallet.package";
import deployHello from "./deploy-contract";

describe("hello test", () => {
  let client: TonClient;
  let smcSafeMultisigWallet: TonContract;
  let smcHello: TonContract;
  let response: any;

  before(async () => {
    client = createClient();
    smcSafeMultisigWallet = new TonContract({
      client,
      name: "SafeMultisigWallet",
      tonPackage: pkgSafeMultisigWallet,
      address: process.env.MULTISIG_ADDRESS,
      keys: {
        public: process.env.MULTISIG_PUBKEY,
        secret: process.env.MULTISIG_SECRET,
      },
    });
  });

  it("deploy hello", async () => {
    smcHello = await deployHello(client, smcSafeMultisigWallet);
  });

  it("get address", async () => {
    console.log(smcHello.address);
  });

  it("get hello from var", async () => {
    response = await smcHello.run({
      functionName: "_hello"
    })
    console.log(response);
  });

  it("get hello from function", async () => {
    response = await smcHello.run({
      functionName: "getHello"
    })
    console.log(response);
  });

  it("set hello", async () => {
    await smcHello.call({
      functionName: "setHello",
      input: {
        count: 5
      }
    })
    response = await smcHello.run({
      functionName: "getHello"
    })
    console.log(parseHex(response));
  });

});