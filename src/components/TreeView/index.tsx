import React, { FC, useState, memo } from "react";
import { CustomTreeItem } from "./components";
import {
  Box,
  Button,
  CircularProgress,
  Input,
  Stack,
  Typography,
} from "@mui/material";
import { TreeNode } from "types";
import { filterTreeData, extractIds } from "../../utils";
import { RichTreeView } from "@mui/x-tree-view";
import EmptyIcon from "./components/emty-icon";

interface Props {
  treeData: TreeNode[];
  hideIcon?: boolean;
}

declare module "react" {
  interface CSSProperties {
    "--tree-view-color"?: string;
    "--tree-view-bg-color"?: string;
  }
}
const TreeView: FC<Props> = ({ treeData }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(["1", "3"]);

  const handleExpandedItemsChange = (
    event: React.SyntheticEvent,
    itemIds: string[]
  ) => {
    console.log(event);
    setExpandedItems(itemIds);
  };

  const handleExpandClick = () => {
    setExpandedItems((oldExpanded) =>
      oldExpanded.length === 0 ? extractIds(treeData) : []
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setSearchQuery(e.target.value);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const filteredData = filterTreeData(treeData, searchQuery);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        py={4}
      >
        <Input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Box>
          <Button variant="contained" onClick={handleExpandClick}>
            {expandedItems.length === 0 ? "Unfold" : "Fold"}
          </Button>
        </Box>
      </Box>

      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          py={8}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {filteredData.length > 0 ? (
            <RichTreeView
              items={filteredData}
              aria-label="tree-view"
              defaultExpandedItems={["1", "1.1"]}
              defaultSelectedItems="1.1"
              expandedItems={expandedItems}
              onExpandedItemsChange={handleExpandedItemsChange}
              sx={{
                height: "fit-content",
                flexGrow: 1,
              }}
              slots={{ item: CustomTreeItem }}
            />
          ) : (
            <Stack alignItems={"center"} justifyContent={"center"} p={6}>
              <EmptyIcon />
              <Typography>There are no records to show</Typography>
            </Stack>
          )}
        </>
      )}
    </>
  );
};

export default memo(TreeView);
