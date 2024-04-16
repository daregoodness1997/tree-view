import {
  TreeItem2Icon,
  TreeItem2IconContainer,
  TreeItem2Provider,
  UseTreeItem2Parameters,
} from "@mui/x-tree-view";
import FolderRounded from "@mui/icons-material/FolderRounded";
import clsx from "clsx";
import { useTreeItem2 } from "@mui/x-tree-view/useTreeItem2/useTreeItem2";
import React from "react";
import { getIconFromFileType, isExpandable } from "../../../utils";
import StyledTreeItemRoot from "./StyledTreeItemRoot";
import CustomLabel from "./CustomLabel";
import CustomTreeItemContent from "./CustomTreeItemContent";
import TransitionComponent from "./TransitionComponent";

interface CustomTreeItemProps
  extends Omit<UseTreeItem2Parameters, "rootRef">,
    Omit<React.HTMLAttributes<HTMLLIElement>, "onFocus"> {}

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  props: CustomTreeItemProps,
  ref: React.Ref<HTMLLIElement>
) {
  const { id, itemId, label, disabled, children, ...other } = props;

  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getLabelProps,
    getGroupTransitionProps,
    status,
    publicAPI,
  } = useTreeItem2({ id, itemId, children, label, disabled, rootRef: ref });

  const item = publicAPI.getItem(itemId);
  const expandable = isExpandable(children);
  let icon;
  if (expandable) {
    icon = FolderRounded;
  } else if (item.fileType) {
    icon = getIconFromFileType(item.fileType);
  }

  return (
    <TreeItem2Provider itemId={itemId}>
      <StyledTreeItemRoot {...getRootProps(other)}>
        <CustomTreeItemContent
          {...getContentProps({
            className: clsx("content", {
              "Mui-expanded": status.expanded,
              "Mui-selected": status.selected,
              "Mui-focused": status.focused,
              "Mui-disabled": status.disabled,
            }),
          })}
        >
          <TreeItem2IconContainer {...getIconContainerProps()}>
            <TreeItem2Icon status={status} />
          </TreeItem2IconContainer>

          <CustomLabel
            {...getLabelProps({
              icon,
              status: item.status,
              expandable: expandable && status.expanded,
            })}
          />
        </CustomTreeItemContent>
        {children && <TransitionComponent {...getGroupTransitionProps()} />}
      </StyledTreeItemRoot>
    </TreeItem2Provider>
  );
});

export default CustomTreeItem;
