import { TreeNode } from "types";

export const treeData: TreeNode[] = [
  {
    id: "1",
    label: "NBA",
    status: "admin",
    children: [
      { id: "2", label: "2023/2024" },
      {
        id: "3",
        label: "MVPs",
        children: [
          { id: "6", label: "Jovic" },
          {
            id: "7",
            label: "Luka",
            children: [
              { id: "9", label: "SGA" },
              { id: "10", label: "Tatum" },
              { id: "11", label: "Gianis" },
            ],
          },
          { id: "8", label: "Point Guard" },
        ],
      },
      { id: "4", label: "Curry" },
      { id: "5", label: "Hali" },
    ],
  },
];
