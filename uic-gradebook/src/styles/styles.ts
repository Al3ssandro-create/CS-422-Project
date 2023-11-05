import { CSSProperties } from 'react';

export const flexCenter: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    paddingLeft: "10%",
    paddingRight: "10%",
    flexDirection: "column",
    alignItems: "stretch"
  };

export const flexRow: CSSProperties = {
  display: "flex",
  justifyContent: "space-around",
  alignContent: "center",
  flexWrap: "nowrap",
  flexDirection: "row", 
  alignItems: "center",
  minHeight: "5vh"
};