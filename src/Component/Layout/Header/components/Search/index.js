import styles from "./search.module.scss";
import classname from "classnames/bind"; // thay đổi đường import và tên biến
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import Tippy from "@tippyjs/react";

import { Input, Image } from "antd";

import { useNavigate } from "react-router-dom";
import _debounce from "lodash/debounce";
const numeral = require("numeral");
function Search() {
  const cx = classname.bind(styles);
  const [dulieu, setDulieu] = useState([]);
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const restAPI = "https://backoffice.nodemy.vn";
  function handleDebounceFn(inputValue) {
    setValue(inputValue);
  }

  const debounceFn = useCallback(_debounce(handleDebounceFn, 500), []);

  function handleChange(event) {
    const inputValue = event.target?.value;
    debounceFn(inputValue);
  }
  useEffect(() => {
    axios
      .get(
        `https://backoffice.nodemy.vn/api/products?populate=*&filters[name][$contains]=${value}`
      )
      .then((res) => {
        console.log(res.data.data);
        setDulieu(res.data.data);
        //set item chỉ chứa 1 phần tử của mảng dulieu
        setItems(res.data.data.splice(0,2));      
      })
      .catch((err) => {
        console.log(err);
      });
  }, [value]);

  const fetchMoreData = () => {//tải thêm phần tử mới vào danh sách
    console.log(1,items);
    if (items?.length >= 10) { // Nếu đã tải đủ 10 item thì không còn nữa
      setHasMore(false);
      return;
    }
    if(dulieu?.length === 0){
      setHasMore(false);
      return;
    }   
    // Tạo thêm 20 item mới và thêm vào danh sách
    setTimeout(() => {
      if(dulieu?.length > 0) {
        const newItems = dulieu.shift();
      setItems([...items, ...newItems]);
      }
        
    },1500 );
  };
 
  return (
    <>
      <Tippy
        visible={value.length > 0}
        interactive
        onClickOutside={() => {
          setValue("");
        }}
        render={
          value.length > 0
            ? (attrs) => (
               <div className={cx("search-dropdown")}>
                              
                  <InfiniteScroll
                   dataLength={items?.length}//là độ dài hiện tại của danh sách
                   next={fetchMoreData}
                   hasMore={hasMore}
                   loader={<h4>Loading...</h4>}
                   endMessage={<p>No more items to load</p>}
                   //className={cx("infiniteScroll")}
                  >       
                  { items?.map((item, index) => {
                    
                    return (
                      <div key={index} onClick={() => {
                        setValue("");
                        navigate(`/detail/${item.attributes.slug}`)
                        }} className={cx("search-dropdown-item")}>
                        <Image
                          width="40%"
                          style={{
                            objectFit: "cover",
                            borderRadius: "10px",
                            margin: "1.5% 0",
                          }}
                          preview={false}
                          src={
                            restAPI +
                            item.attributes.image?.data[0].attributes.url
                          }
                        />
                        <div className={cx("content")}>
                          <div className={cx("name")}>
                            {item.attributes.name}{" "}
                          </div>
                          <div className={cx("price")}>
                            {numeral(item.attributes.price).format("0,0")}
                            <span>đ</span>
                          </div>
                        </div>
                      </div>
                    )
                    })
                }
                  </InfiniteScroll>               
              </div>

            )
            : null
        }
      >
        <div
          style={{
            width: "40%",
          }}
        >
          <Input
            placeholder="Bạn muốn tìm gì?"
            style={{
              width: "100%",
            }}
            onChange={handleChange}
          />
        </div>
      </Tippy>
    </>
  );
}
export default Search;
