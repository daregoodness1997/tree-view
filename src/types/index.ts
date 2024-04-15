export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  status?: "admin" | "currency";
}
