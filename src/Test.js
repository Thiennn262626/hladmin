// import React, { useState } from 'react';
// import InfiniteScroll from 'react-infinite-scroll-component';

// function App() {
//   const [items, setItems] = useState([...Array(20).keys()]); // Danh sách các item ban đầu
//   const [hasMore, setHasMore] = useState(true); // Có thêm dữ liệu để tải không?

//   const fetchMoreData = () => {
//     // Tạo thêm 20 item mới và thêm vào danh sách
//     setTimeout(() => {
//       setItems([...items, ...Array(20).keys()]);
//     }, 1500);
//   };
//   const style = {
//     height: 30,
//     border: "1px solid green",
//     margin: 6,
//     padding: 8
//   };
//   return (
//     <InfiniteScroll
//       dataLength={items.length}
//       next={fetchMoreData}
//       hasMore={hasMore}
//       loader={<h4>Loading...</h4>}
//       endMessage={<p>No more items to load</p>}
//     >
//       {
//       items.map((item, index) => {
//         return (
//           <div style={style} key={index}>
//            div - #{index}
//          </div>
      
//         )})
//       }
//     </InfiniteScroll>
//   );
// }

// export default App;

import { notification } from 'antd';
import React, { useEffect } from 'react';

const App = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
      message: `Bạn có hài lòng với sản phẩm này?`,
      description: <p>Nhấn mua ngay</p>,
      placement,
    });
  };
  useEffect(() => {
    openNotification('bottomRight');
  }, []);

  return (
    <>
      {contextHolder}     
    </>
  );
};

export default App;



