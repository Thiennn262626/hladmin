import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const [items, setItems] = useState([...Array(20).keys()]); // Danh sách các item ban đầu
  const [hasMore, setHasMore] = useState(true); // Có thêm dữ liệu để tải không?, kiểm tra xem còn phần tử nào nữa để tải hay không.
  const fetchMoreData = () => {//tải thêm phần tử mới vào danh sách
    if (items.length >= 60) { // Nếu đã tải đủ 60 item thì không còn nữa
      setHasMore(false);
      return;
    }
    // Tạo thêm 20 item mới và thêm vào danh sách
    setTimeout(() => {
      setItems(prevItems => [...prevItems, ...Array(20).keys()]);
    }, 1500);
  };

  return (
    <InfiniteScroll
      dataLength={items.length}//là độ dài hiện tại của danh sách
      next={fetchMoreData}//hàm được gọi khi người dùng cuộn đến cuối trang để tải thêm phần tử
      hasMore={hasMore}//là biến kiểm tra xem còn phần tử nào nữa để tải hay không
      loader={<h4>Loading...</h4>}//là nội dung được hiển thị khi đang tải dữ liệu và chờ đợi
      endMessage={<p>No more items to load</p>}
    >
      {items.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </InfiniteScroll>
  );
}

export default App;
