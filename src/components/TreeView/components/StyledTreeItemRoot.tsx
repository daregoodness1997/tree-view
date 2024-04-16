import { treeItemClasses } from "@mui/x-tree-view/TreeItem";
import { styled } from "@mui/material/styles";
import { TreeItem2Root } from "@mui/x-tree-view";

const StyledTreeItemRoot = styled(TreeItem2Root)(({ theme }) => ({
  color:
    theme.palette.mode === "light"
      ? theme.palette.grey[800]
      : theme.palette.grey[400],
  position: "relative",
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: theme.spacing(3.5),
  },
})) as unknown as typeof TreeItem2Root;

export default StyledTreeItemRoot;
