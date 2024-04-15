import React, { FC, useState, memo } from "react";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import {
  CollapseIcon,
  EndIcon,
  ExpandIcon,
  CustomTreeItem,
} from "./components";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Input,
  Stack,
} from "@mui/material";
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

  const ItemLabel: React.FC<{
    label: string;
    status?: "admin" | "currency";
  }> = ({ label, status = "primary" }) => {
    return (
      <Stack direction={"row"} gap={"6px"} justifyContent={"space-between"}>
        <Stack direction={"row"} gap={"6px"}>
          <Chip
            label={status === "admin" ? "Admin" : "Currency"}
            color={status === "admin" ? "error" : "primary"}
            size="small"
          />
          {label}
        </Stack>

        <Node label="10" value="0" />
      </Stack>
    );
  };

  const renderTreeItems = (items: TreeNode[]): React.ReactNode[] => {
    return items.map((item) => (
      <CustomTreeItem
        key={item.id}
        itemId={item.id}
        label={<ItemLabel label={item.label} status={item.status} />}
        style={{ opacity: item.children ? 1 : 0.6 }}
      >
        {item.children && renderTreeItems(item.children)}
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
