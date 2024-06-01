import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { productServices } from "../../../services/productService";
import { Form, Upload } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setAvatars } from "../../Product/counterProduct";

const Index = () => {
  const dispatch = useDispatch();
  const avatarMediaIDS = useSelector((state) => state.counterProduct.avatars);
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    setFileList(avatarMediaIDS);
  }, [avatarMediaIDS]);
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    const response = await productServices.addImg(data);
    if (response) {
      const avatarMediaID = {
        mediaID: response?.mediaID,
        uid: file?.uid,
        url: response?.url,
      };
      dispatch(setAvatars([...fileList, avatarMediaID]));
    }
  };
  const handleRemove = (file) => {
    const newAvatarMediaIDS = avatarMediaIDS.filter(
      (item) => item.uid !== file?.uid
    );
    dispatch(setAvatars(newAvatarMediaIDS));
  };
  const setPreviewImage = (file) => {
    const avatarMediaID = avatarMediaIDS.find((item) => item.uid === file?.uid);
    window.open(avatarMediaID?.url, "_blank");
  };
  return (
    <Form.Item
      label="Hình ảnh"
      valuePropName="fileList"
      getValueFromEvent={normFile}
    >
      <Upload
        listType="picture-card"
        beforeUpload={(file) => {
          uploadImage(file);
        }}
        onRemove={(file) => handleRemove(file)}
        onPreview={(file) => setPreviewImage(file)}
      >
        <div>
          <PlusOutlined />
          <div
            style={{
              marginTop: 8,
            }}
          >
            Tải lên
          </div>
        </div>
      </Upload>
    </Form.Item>
  );
};
export default Index;
