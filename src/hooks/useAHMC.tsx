import { useEffect, useState } from "react";
import Web3 from "web3";
import config from "../app/config";
import { useAlert } from "./useAlert";
import { useETH } from "./useETH";
import { Token, usePPL } from "./usePPL";

export const useAHMC = () => {
  const { openAlert } = useAlert();
  const eth = useETH();
  const ppl = usePPL();

  const contract = eth.contracts["ahmc"];

  const [tokens, setTokens] = useState<Token[]>([]);

  const makeMint = async (ammount: number) => {
    await eth.connectWallet();
    if (!eth.hasAccounts()) {
      return openAlert && openAlert("No accounts provided", "error");
    }

    try {
      const price = await contract.methods.price().call();
      const priceBN = Web3.utils.toBN(price);

      const quantityBN = Web3.utils.toBN(ammount);

      const valueBN = quantityBN.mul(priceBN);

      let success = false;
      try {
        const sendArgs = {
          from: eth.account,
          value: valueBN.toString(),
        };
        await contract.methods.mint(quantityBN.toString()).send(sendArgs);
        success = true;
      } catch (err: any) {
        if (err.code && err.code !== -32602) throw err;
      }

      if (!success) {
        const sendArgs = {
          from: eth.account,
          value: valueBN.toString(),
          type: "0x1",
        };
        await contract.methods.mint(quantityBN.toString()).send(sendArgs);
      }
    } catch (error) {
      if (error instanceof Error)
        openAlert && openAlert(error.message, "error");
    }
  };
  const createSign = async (value: string) => {
    const hash = Web3.utils.soliditySha3(
      { type: "address", value: "0x61DB9Dde04F78fD55B0B4331a3d148073A101850" },
      { type: "uint256", value: value },
      { type: "address", value: eth.account }
    );

    //signature = "0xab2d8b24786a2e1aeaf4029b5cb0865eece5c98df037e0ade1723e76ee7a1d575ffacdd077df1b4796b0624d7146146a3636211167ba71dfeddcafb2a1c9acce1b";
    const signature = await eth.provider.eth.personal.sign(hash, eth.account);

    //signer = "0xc7f02456dd3fc26aae2ca1d68528cf9764bf5598";
    const signer = await eth.provider.eth.personal.ecRecover(hash, signature);
    console.log(signature);
    if (eth.account === signer)
        throw Error('Signature validation failed!')
    return signature
  };

  const getTokens = async () => {
    if (!contract) return;
    const tokens = await ppl.getTokens("ahmc");
    setTokens(tokens);
  };

  const claimOne = (tokenId: string) =>
    ppl.claim(config.contract_addresses.ahmc, tokenId);
  const claimAll = () => {
    const tc = claimAllData();
    ppl.claim(config.contract_addresses.ahmc, tc.tokens);
  };

  const claimAllData = () => {
    const ct = tokens.filter((t) => t.accamulated! > 0 || t.claimed! > 0);
    return {
      address: ct.map(() => config.contract_addresses.ahmc),
      tokens: ct.map((t) => t.id),
    };
  };
  const transferOne = (tokenId: string, to: string) =>
    ppl.transfer(to, config.contract_addresses.ahmc, tokenId);
  const transferAll = (to: string) =>
    ppl.transfer(
      to,
      config.contract_addresses.ahmc,
      tokens.map((t) => t.id)
    );
  const transferAllData = () => ({
    address: tokens.map(() => config.contract_addresses.ahmc),
    tokens: tokens.map((t) => t.id),
  });

  useEffect(() => {
    if (contract && contract.methods) getTokens();
  }, [contract]);

  return {
    ...eth,
    makeMint,
    getTokens,
    tokens,
    claimOne,
    claimAll,
    claimAllData,
    transferOne,
    transferAll,
    transferAllData,
    createSign
  };
};
