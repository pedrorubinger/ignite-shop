import { styled } from "..";

export const ProductContainer = styled("main", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "stretch",
  gap: "4rem",

  maxWidth: 1180,
  margin: "0 auto 2rem",
});

export const ImageContainer = styled("div", {
  width: "100%",
  maxWidth: 576,
  height: 656,
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  padding: "0.25rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },
});

export const ProductDetails = styled("div", {
  display: "flex",
  flexDirection: "column",

  h1: {
    fontSize: "2rem",
    color: "$gray300",
  },

  span: {
    marginTop: "1rem",
    display: "block",
    fontSize: "2rem",
    color: "$green300",
  },

  p: {
    marginTop: "2.5rem",
    fontSize: "$md",
    lineHeight: 1.6,
    color: "$gray300",
  },
});

export const CustomButton = styled("button", {
  marginTop: "auto",
  backgroundColor: "$green500",
  border: 0,
  color: "$white",
  borderRadius: 8,
  padding: "1.25rem",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "$md",

  variants: {
    width: {
      full: { width: "100%" },
    },
  },

  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },

  "&:not(:disabled):hover": {
    backgroundColor: "$green300",
  },
});

export const CartDrawerContainer = styled("div", {});

export const CartItemContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "1.25rem",
});

export const CartItemsListContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
});

export const CartItemInfo = styled("div", {
  display: "flex",
  flexDirection: "column",

  h4: {
    color: "$gray300",
    fontSize: "1.125rem",
    fontFamily: "Roboto",
    fontWeight: "400",
    lineHeight: "160%",
    marginBottom: "0.13rem",
  },

  span: {
    color: "$gray100",
    fontSize: "1.125rem",
    fontFamily: "Roboto",
    fontWeight: "700",
    lineHeight: "160%",
  },
});

export const CartRemoveItemButton = styled("button", {
  background: "transparent",
  border: "none",

  width: "fit-content",
  marginTop: "0.5rem",

  color: "$green500",
  fontSize: "1rem",
  fontFamily: "Roboto",
  fontWeight: "700",
  lineHeight: "160%",

  cursor: "pointer",
  transition: "0.25s",

  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },

  "&:not(:disabled):hover": {
    color: "$green300",
  },
});

export const CartItemImageContainer = styled("div", {
  width: 102,
  height: 93,
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  padding: "0.25rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },
});

export const CartReviewAmountContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",

  marginTop: "2.5rem",

  h4: {
    color: "$gray100",
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: "1rem",
    lineHeight: "160%",
  },

  span: {
    color: "$gray300",
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: "1.125rem",
    lineHeight: "160%",
  },
});

export const CartReviewPriceContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",

  h4: {
    color: "$gray100",
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: "1.125rem",
    lineHeight: "160%",
  },

  span: {
    color: "$gray100",
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: "1.5rem",
    lineHeight: "160%",
  },

  marginBottom: "2.5rem",
});
