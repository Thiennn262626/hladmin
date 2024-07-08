import React from "react";

import NeedWork from "./common/needWork";
import AnalySale from "./common/analySale";
const Index = () => {
  return (
    <>
      <div className="flex flex-col h-screen px-10 py-4 ">
        <NeedWork />
        <AnalySale />
      </div>
    </>
  );
};

export default Index;
