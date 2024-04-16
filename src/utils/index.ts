import ArticleIcon from "@mui/icons-material/Article";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import FolderRounded from "@mui/icons-material/FolderRounded";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import { FileType, TreeNode } from "types";

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

export const isExpandable = (reactChildren: React.ReactNode) => {
  if (Array.isArray(reactChildren)) {
    return reactChildren.length > 0 && reactChildren.some(isExpandable);
  }
  return Boolean(reactChildren);
};

export const getIconFromFileType = (fileType: FileType) => {
  switch (fileType) {
    case "image":
      return ImageIcon;
    case "pdf":
      return PictureAsPdfIcon;
    case "doc":
      return ArticleIcon;
    case "video":
      return VideoCameraBackIcon;
    case "folder":
      return FolderRounded;
    case "pinned":
      return FolderOpenIcon;
    case "trash":
      return DeleteIcon;
    default:
      return ArticleIcon;
  }
};
