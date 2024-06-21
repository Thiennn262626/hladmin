import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { productServices } from "../../../../services/productService";
import { Form, Upload, Button, Space } from "antd";
import { FolderAddOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setAvatars } from "../../counterProduct";

const FormEditImg = ({ product }) => {
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (product?.medias) {
      const initialFileList = product.medias.map((media, index) => ({
        uid: `-1-${index}`,
        name: `image-${index}.png`,
        status: "done",
        url: media.linkString,
        media_url: media.linkString,
      }));
      setFileList(initialFileList);
    }
  }, [product]);

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
      if (response) {
        const newFile = {
          uid: file.uid,
          name: file.name,
          status: "done",
          url: response.media_url,
          media_url: response.media_url,
        };
        setFileList((prevList) => [...prevList, newFile]);
        dispatch(setAvatars([...fileList, newFile]));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleRemove = (file) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(newFileList);
    dispatch(setAvatars(newFileList));
  };

  const setPreviewImage = (file) => {
    const media = fileList.find((item) => item.uid === file.uid);
    window.open(media?.media_url, "_blank");
  };

  const handleSave = () => {
    // Handle save functionality here
    console.log("Saving images...", fileList);
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
            return false;
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
        <Button
          type="primary"
          icon={<FolderAddOutlined />}
          onClick={() => handleSave}
          className="!bg-blue-500 !text-white"
        >
          Lưu thay đổi
        </Button>
      </Space>
    </Form.Item>
  );
};

export default FormEditImg;
