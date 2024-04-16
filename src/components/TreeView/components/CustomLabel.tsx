import { Box, Chip, Stack } from "@mui/material";
import { TreeItem2Label } from "@mui/x-tree-view";
import StyledTreeItemLabelText from "./StyledTreeItemLabelText";
import DotIcon from "./DotIcon";
import Node from "./Node";

interface CustomLabelProps {
  children: React.ReactNode;
  icon?: React.ElementType;
  expandable?: boolean;
  status?: "admin" | "currency";
}

function CustomLabel({
  icon: Icon,
  expandable,
  status = "currency",
  children,
  ...other
}: CustomLabelProps) {
  return (
    <TreeItem2Label
      {...other}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Stack direction={"row"} alignItems={"center"}>
        {Icon && (
          <Box
            component={Icon}
            className="labelIcon"
            color="inherit"
            sx={{ mr: 1, fontSize: "1.2rem" }}
          />
        )}
        <Box mr={1}>
          <Chip
            label={status === "admin" ? "Admin" : "Currency"}
            color={status === "admin" ? "error" : "primary"}
            size="small"
          />
        </Box>

        <StyledTreeItemLabelText variant="body2">
          {children}
        </StyledTreeItemLabelText>
        {expandable && <DotIcon />}
      </Stack>

      <Node label="10" value="0" />
    </TreeItem2Label>
  );
}

export default CustomLabel;
