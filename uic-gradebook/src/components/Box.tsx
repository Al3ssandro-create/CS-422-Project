import React, { ReactNode } from "react";
import { flexCenter } from '../styles/styles';

interface BoxProps {
  children: ReactNode;
}

// commong style for padding and margins
// every component should start with a box like this

const Box: React.FC<BoxProps> = ({ children }) => {
  return (
    <>
      <div style={flexCenter}>{children}</div>
    </>
  );
};

export default Box;
