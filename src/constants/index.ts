import { TreeNode } from "types";

export const treeData: TreeNode[] = [
  {
    id: "1",
    label: "Main",
    status: "admin",
    children: [
      { id: "2", label: "Hello" },
      {
        id: "3",
        label: "Subtree with children",
        children: [
          { id: "6", label: "Hello" },
          {
            id: "7",
            label: "Sub-subtree with children",
            children: [
              { id: "9", label: "Child 1" },
              { id: "10", label: "Child 2" },
              { id: "11", label: "Child 3" },
            ],
          },
          { id: "8", label: "Hello" },
        ],
      },
      { id: "4", label: "World" },
      { id: "5", label: "Something something" },
    ],
  },
];
