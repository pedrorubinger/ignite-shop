import { Drawer } from "antd";

import { styled } from "..";

export const DrawerContainer = styled(Drawer, {
  color: "$white !important",
  background: "$gray800 !important",

  padding: "0 2rem",
});

export const DrawerTitle = styled("h3", {
  margin: 0,
  marginBottom: "2rem",

  color: "$gray100",
  fontFamily: "Roboto",
  lineHeight: "160%",
  fontWeight: "bold",
  fontSize: "1.25rem",
});
