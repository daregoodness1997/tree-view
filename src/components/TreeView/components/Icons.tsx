import { Icon } from "@iconify/react";

// Define FileFolder as a functional component
const FileFolder = (props: React.ComponentProps<typeof Icon>) => {
  return <Icon width="24" height="24" {...props} />;
};

function ExpandIcon(props: React.PropsWithoutRef<typeof FileFolder>) {
  return (
    <FileFolder icon="fxemoji:filefolder" {...props} style={{ opacity: 0.8 }} />
  );
}

function CollapseIcon(props: React.PropsWithoutRef<typeof FileFolder>) {
  return (
    <FileFolder {...props} icon="fxemoji:filefolder" style={{ opacity: 0.8 }} />
  );
}

function EndIcon(props: React.PropsWithoutRef<typeof FileFolder>) {
  return (
    <FileFolder {...props} icon="fxemoji:filefolder" style={{ opacity: 0.3 }} />
  );
}

export { ExpandIcon, CollapseIcon, EndIcon };
