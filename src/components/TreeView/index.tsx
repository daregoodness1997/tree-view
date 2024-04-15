import React, { FC, useState, memo } from "react";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import {
  CollapseIcon,
  EndIcon,
  ExpandIcon,
  CustomTreeItem,
} from "./components";
import { Box, Button, Chip, CircularProgress, Input } from "@mui/material";
import { TreeNode } from "types";
import { filterTreeData, extractIds } from "../../utils";

interface Props {
  treeData: TreeNode[];
  hideIcon?: boolean;
}
const TreeView: FC<Props> = ({ treeData, hideIcon = false }) => {
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

  const ItemLabel: React.FC<{
    label: string;
    status?: "admin" | "currency";
  }> = ({ label, status = "primary" }) => {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <Chip
          label={status === "admin" ? "Admin" : "Currency"}
          color={status === "admin" ? "error" : "primary"}
          size="small"
        />
        {label}
      </Box>
    );
  };

  const renderTreeItems = (items: TreeNode[]): React.ReactNode[] => {
    return items.map((item) => (
      <CustomTreeItem
        key={item.id}
        itemId={item.id}
        label={<ItemLabel label={item.label} status={item.status} />}
      >
        {item.children && renderTreeItems(item.children)}{" "}
      </CustomTreeItem>
    ));
  };
  const filteredData = filterTreeData(treeData, searchQuery);

  const NullIcon = () => null;

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
          <Button onClick={handleExpandClick}>
            {expandedItems.length === 0 ? "Expand all" : "Collapse all"}
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
        <SimpleTreeView
          aria-label="customized"
          expandedItems={expandedItems}
          onExpandedItemsChange={handleExpandedItemsChange}
          slots={{
            expandIcon: hideIcon ? NullIcon : ExpandIcon,
            collapseIcon: hideIcon ? NullIcon : CollapseIcon,
            endIcon: hideIcon ? NullIcon : EndIcon,
          }}
          sx={{
            overflowX: "hidden",
            minHeight: 270,
            flexGrow: 1,
            minWidth: 300,
          }}
        >
          {renderTreeItems(filteredData)}
        </SimpleTreeView>
      )}
    </>
  );
};

export default memo(TreeView);
