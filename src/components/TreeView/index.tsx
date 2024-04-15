import React, { FC, useState, memo } from "react";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import {
  CollapseIcon,
  EndIcon,
  ExpandIcon,
  CustomTreeItem,
} from "./components";
import { Box, CircularProgress, Input } from "@mui/material";
import { TreeNode } from "types";
import { filterTreeData } from "../../utils";

interface Props {
  treeData: TreeNode[];
  hideIcon?: boolean;
}
const TreeView: FC<Props> = ({ treeData, hideIcon = false }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //   const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setSearchQuery(e.target.value);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const renderTreeItems = (items: TreeNode[]): React.ReactNode[] => {
    return items.map((item) => (
      <CustomTreeItem key={item.id} itemId={item.id} label={item.label}>
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
      </Box>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <SimpleTreeView
          aria-label="customized"
          defaultExpandedItems={["1", "3"]}
          slots={{
            expandIcon: hideIcon ? NullIcon : ExpandIcon,
            collapseIcon: hideIcon ? NullIcon : CollapseIcon,
            endIcon: hideIcon ? NullIcon : EndIcon,
          }}
          sx={{
            overflowX: "hidden",
            minHeight: 270,
            flexGrow: 1,
            maxWidth: 300,
          }}
        >
          {renderTreeItems(filteredData)}
        </SimpleTreeView>
      )}
    </>
  );
};

export default memo(TreeView);
