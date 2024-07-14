import React from "react";

import NeedWork from "./common/needWork";
import AnalySale from "./common/analySale";
import ProductListBestSale from "./common/productListBestSale";
import ProductListSale from "./common/productListSale";


const Index = () => {
  return (
    <>
      <div className="flex flex-col h-screen px-10 py-4 overflow-auto">
        <NeedWork />
        <AnalySale />
        <ProductListSale />
        <ProductListBestSale />
      </div>
    </>
  );
};

export default Index;
