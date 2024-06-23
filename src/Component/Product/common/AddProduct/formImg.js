import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { productServices } from "../../../../services/productService";
import { Form, Upload, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setAvatars } from "../../counterProduct";

const Index = () => {
  const dispatch = useDispatch();
  const avatarMediaIDS = useSelector((state) => state.counterProduct.avatars);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    setFileList(
      avatarMediaIDS.map((item) => ({
        ...item,
        url: item.media_url, // set url for preview
      }))
    );
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
    try {
      const response = await productServices.addImg(data);
      console.log("Upload response:", response);
      if (response) {
        const avatarMediaID = {
          media_url: response?.media_url,
          uid: file?.uid,
          name: file?.name, // add name for preview
        };
        dispatch(setAvatars([...avatarMediaIDS, avatarMediaID]));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
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
    console.log("Preview image URL:", avatarMediaID?.media_url);
    window.open(avatarMediaID?.media_url, "_blank");
  };

  return (
    <Form.Item
      label="Hình ảnh"
      labelAlign="left"
      valuePropName="fileList"
      getValueFromEvent={normFile}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Upload
          listType="picture-card"
          fileList={fileList}
          beforeUpload={(file) => {
            uploadImage(file);
            return false; // Prevent auto upload by Ant Design
          }}
          onRemove={handleRemove}
          onPreview={setPreviewImage}
        >
          {fileList.length >= 8 ? null : (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Tải lên</div>
            </div>
          )}
        </Upload>
      </Space>
    </Form.Item>
  );
};

export default Index;
