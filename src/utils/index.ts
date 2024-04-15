import { TreeNode } from "types";

export const filterTreeData = (data: TreeNode[], query: string): TreeNode[] => {
  return data.reduce((acc: TreeNode[], item: TreeNode) => {
    if (item.label.toLowerCase().includes(query.toLowerCase())) {
      acc.push({
        ...item,
        children: item.children
          ? filterTreeData(item.children, query)
          : undefined,
      });
    } else if (item.children) {
      const filteredChildren = filterTreeData(item.children, query);
      if (filteredChildren.length > 0) {
        acc.push({
          ...item,
          children: filteredChildren,
        });
      }
    }
    return acc;
  }, []);
};
 
export const extractIds = (nodes: TreeNode[]): string[] => {
  let ids: string[] = [];
  nodes.forEach((node) => {
    ids.push(node.id);
    if (node.children) {
      ids = ids.concat(extractIds(node.children));
    }
  });
  return ids;
};