import React from "react";

const MaxWidthWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-5">{children}</div>;
};

export default MaxWidthWrapper;
