import React from "react";
import Box from "@material-ui/core/Box";

export default function BackgroundImage({
  src = "",
  children = <></>,
  ...props
}) {
  return (
    <Box
      className="flex justify-center items-center w-full bg-cover bg-center main-content"
      style={{ backgroundImage: `url(${src})` }}
    >
      <Box className="flex justify-center">{children}</Box>
    </Box>
  );
}
