import React from "react";
import { DrawerProps } from "antd";
import { X } from "phosphor-react";

import { DrawerContainer, DrawerTitle } from "@/styles/components/drawer";

interface Props extends DrawerProps {
  title: string;
  children: React.ReactNode;
  /** @default false */
  isVisible?: boolean;
  onClose: () => void;
}

export const CustomDrawer: React.FC<Props> = ({
  title,
  isVisible = false,
  children,
  onClose,
  ...rest
}) => {
  const headerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "flex-end",
    flexDirection: "column-reverse",
    margin: 0,
  };

  const bodyStyle: React.CSSProperties = {
    paddingTop: 0,
  };

  return (
    <DrawerContainer
      onClose={onClose}
      open={isVisible}
      closeIcon={<X color="#fff" size={16} />}
      headerStyle={headerStyle}
      bodyStyle={bodyStyle}
      {...rest}
    >
      <DrawerTitle>{title}</DrawerTitle>
      {children}
    </DrawerContainer>
  );
};
