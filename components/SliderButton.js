import { Button } from "@chakra-ui/react";
const activeBtn = {
  border: "4px solid springgreen",
  backgroundColor: "springgreen",
  borderRadius: "50rem",
};
const inActiveBtn = { border: "4px solid grey", backgroundColor: "grey" };

const SliderButton = ({ isTestNet, setIsTestNet }) => {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: "50px",
        overflow: "hidden",
        backgroundColor: "GrayText",
      }}
    >
      <Button
        onClick={() => setIsTestNet(true)}
        style={isTestNet ? activeBtn : inActiveBtn}
      >
        {isTestNet ? "✅" : ""} Testnet
      </Button>

      <Button
        onClick={() => setIsTestNet(false)}
        style={!isTestNet ? activeBtn : inActiveBtn}
      >
        {!isTestNet ? "✅" : ""} Devnet
      </Button>
    </div>
  );
};

export default SliderButton