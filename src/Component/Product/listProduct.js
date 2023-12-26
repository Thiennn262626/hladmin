import React from "react";
import Filter from "./common/filter";
import ListProduct from "./common/listProduct";
import Modal from "./common/modal";

const Index = () => {
    return (
        <div >
            <Filter/>  
            <ListProduct/>
            <Modal/>
        </div>
    );
};

export default Index;
