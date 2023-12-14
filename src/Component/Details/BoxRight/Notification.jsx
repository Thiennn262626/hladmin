import { notification } from 'antd';
import React, { useEffect } from 'react';
const App = ({ onButtonClick }) => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
      message: `Bạn có hài lòng với sản phẩm này?`,
      description: <button
        style={{
          border: "none",
          backgroundColor: "transparent",
          color: "blue",
          fontSize: "16px",
          textDecoration: "underline",
          cursor: "pointer"
        }}
        onClick={onButtonClick}   
      >
        Mua ngay!
      </button>,
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
