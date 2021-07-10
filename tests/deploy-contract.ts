import { TonClient } from "@tonclient/core";
import TonContract from "../utils/ton-contract";
import pkgHello from "../ton-packages/Hello.package";

export default async (
  client: TonClient,
  smcSafeMultisigWallet: TonContract,
) => {
  let smcHello;
  const keys = await client.crypto.generate_random_sign_keys();
  smcHello = new TonContract({
    client,
    name: "Hello",
    tonPackage: pkgHello,
    keys,
  });

  await smcHello.calcAddress();

  await smcSafeMultisigWallet.call({
    functionName: "sendTransaction",
    input: {
      dest: smcHello.address,
      value: 1_000_000_000,
      bounce: false,
      flags: 2,
      payload: "",
    },
  });

  await smcHello.deploy({
    input: {
      count: 5
    }
  });

  return smcHello;
};
