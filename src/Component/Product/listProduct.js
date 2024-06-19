import React from "react";
import Filter from "./common/List/filter";
import ListProduct from "./common/List/listProduct";
import Modal from "./common/List/modal";

const Index = () => {
  return (
    <div className="m-[20px]">
      <Filter />
      <ListProduct />
      <Modal />
    </div>
  );
};

export default Index;
