import React, { useEffect, useState } from "react";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { productServices } from "../../../../services/productService";
import { Form, Upload, Button, Space } from "antd";

const FormEditImg = ({ product }) => {
  const [initialFileList, setInitialFileList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (product?.medias) {
      const initialFileList = product.medias.map((media, index) => ({
        uid: `-1-${index}`,
        url: media.linkString,
        media_url: media.linkString,
        mediaID: media.mediaID,
      }));
      setFileList(initialFileList);
      setInitialFileList(initialFileList);
    }
  }, [product]);

  useEffect(() => {
    const isChanged =
      JSON.stringify(initialFileList) !== JSON.stringify(fileList);
    if (fileList.length === 0) {
      setIsChanged(false);
    } else {
      setIsChanged(isChanged);
    }
  }, [fileList, initialFileList]);

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
          url: response.media_url,
          media_url: response.media_url,
          mediaID: response.mediaID,
        };
        setFileList((prevList) => [...prevList, newFile]);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleRemove = (file) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(newFileList);
  };

  const setPreviewImage = (file) => {
    const media = fileList.find((item) => item.uid === file.uid);
    window.open(media?.media_url, "_blank");
  };

  const handleSave = async () => {
    const updatedMedias = fileList.map((file) => ({
      mediaID: file.mediaID || null,
      linkString: file.media_url,
    }));

    const updatedProduct = {
      productID: product.productID,
      medias: updatedMedias,
    };

    try {
      console.log("Images saving...", updatedProduct);
      await productServices.updateProductImages(updatedProduct);
      setIsChanged(false);
    } catch (error) {
      console.error("Error saving images:", error);
    }
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
          type="text"
          icon={<SaveOutlined />}
          onClick={handleSave}
          disabled={!isChanged}
        >
          Lưu thay đổi
        </Button>
      </Space>
    </Form.Item>
  );
};

export default FormEditImg;
