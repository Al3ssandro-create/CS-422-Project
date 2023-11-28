import { CSSProperties } from 'react';

export const flexCenter: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    paddingLeft: "10%",
    paddingRight: "10%",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  };

export const flexRow: CSSProperties = {
  display: "flex",
  justifyContent: "space-around",
  alignContent: "center",
  flexWrap: "nowrap",
  flexDirection: "row", 
  alignItems: "center",
  minHeight: "5vh",
  backgroundColor: "#9E2D32",
  zIndex: 100,
};
export const stickyFooter: CSSProperties = {
  position: "fixed",
  bottom: "0",
  width: "100%",
};