import { Button, Input, VStack, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PublicKey, Connection } from "@solana/web3.js";
import SliderButton from "./SliderButton";

const Faucet = () => {
  const [address, setAddress] = useState("");
  const [isValid, setisValid] = useState(false);
  const [isTestNet, setIsTestNet] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const validateSolanaAddress = (addr) => {
    let publicKey;
    try {
      publicKey = new PublicKey(addr);
      return PublicKey.isOnCurve(publicKey.toBytes());
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    const isValid = validateSolanaAddress(address);
    setisValid(isValid);
  }, [address]);

  const requestAirDrop = async () => {
    try {
      const NODE_RPC = isTestNet
        ? "https://api.testnet.solana.com"
        : "https://api.devnet.solana.com";

      const CONNECTION = new Connection(NODE_RPC);
      setLoading(true);
      const confirmation = await CONNECTION.requestAirdrop(
        new PublicKey(address),
        1000000000
      );
      setLoading(false);
      toast({
        position: "top",
        title: "Airdrop succesful",
        description: `Txn Hash ${confirmation}. Please check your wallet and SolScan`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setAddress("");
    } catch (err) {
      console.log("Error: ", err);
      setLoading(false);
      toast({
        position: "top",
        title: "Airdrop failed",
        description: "Something went wrong.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <VStack>
      <SliderButton isTestNet={isTestNet} setIsTestNet={setIsTestNet} />
      <Input
        placeholder="Enter solana wallet address"
        value={address}
        size="lg"
        width={"lg"}
        textAlign="center"
        onChange={(e) => setAddress(e.target.value)}
        color={"blackAlpha.900"}
        backgroundColor="plum"
        _placeholder={{ color: "blackAlpha.700" }}
      />
      <Button
        mt={20}
        onClick={requestAirDrop}
        disabled={!isValid}
        isLoading={loading}
      >
        Request airdrop
      </Button>
    </VStack>
  );
};

export default Faucet;
