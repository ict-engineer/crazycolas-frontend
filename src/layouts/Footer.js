import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import minty from "minty-deployment.json";

export default function Footer() {
  return (
    <Box className="text-center pt-6 pb-7" style={{ background: "#CDCED1", width: '100%' }}>
      <Typography className="text-black">
        Etherscan Contract Address: {minty.contract.address}
      </Typography>
    </Box>
  );
}
