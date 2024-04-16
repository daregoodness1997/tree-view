import { Stack } from "@mui/material";
import React from "react";

const Node: React.FC<{
  label: string;
  value: string;
}> = ({ label, value = 0 }) => {
  return (
    <Stack direction={"row"} fontSize={"0.8rem"} gap={"2px"}>
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        width={"20px"}
        height={"20px"}
        border={"0.4px solid grey"}
        borderRadius={"4px"}
      >
        {label}
      </Stack>
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        width={"20px"}
        height={"20px"}
        border={"0.4px solid grey"}
        borderRadius={"4px"}
      >
        {value}
      </Stack>
    </Stack>
  );
};

export default Node;
