import { useState, Fragment } from 'react';
import { productServices } from './services/productService'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Upload,
  Button,
  Image,
} from 'antd';
type attributes = {
  locAttributeName: string;
  attributesValue: attributeValue[];
};

type attributeValue = {
  locAttributeValueName: string;
  mediaID: string;
  urlMedia: string;
};

type SKU = {
  price: number;
  totalStock: number;
  priceBefore: number;
};

export default function TestPhanLoai() {
  const [attributes, setAttributes] = useState<attributes[]>([]);
  const [SKUs, setSKUs] = useState<{ price: number; totalStock: number; priceBefore: number }[]>([]);
  const initialSKUs = [
    { price: 0, totalStock: 0, priceBefore: 0 },
  ];

  const resetSKUs = () => {
    setSKUs(initialSKUs);
  };

  const handleChangeValue = (index: number, field: keyof SKU, value: string) => {
    console.log(index, field, value);
    setSKUs((prevSKUs) => {
      const newSKUs = [...prevSKUs];
      newSKUs[index] = { ...newSKUs[index], [field]: parseFloat(value) || 0 };
      return newSKUs;
    });
  };

  const handleChangeAttributes = (locAttributeName: string, index: number) => {
    setAttributes((prevAttributes) => {
      const newAttributes = [...prevAttributes];

      if (newAttributes[index]) {
        newAttributes[index].locAttributeName = locAttributeName;
      }

      return newAttributes;
    });
  };

  const handleChangeAttributeValueMedia = (attributeIndex: number, valueIndex: number, mediaID: string, urlMedia: string) => {
    setAttributes((prevAttributes) => {
      const newAttributes = [...prevAttributes];

      if (
        newAttributes[attributeIndex] &&
        newAttributes[attributeIndex].attributesValue &&
        newAttributes[attributeIndex].attributesValue[valueIndex]
      ) {
        newAttributes[attributeIndex].attributesValue[valueIndex] = {
          ...newAttributes[attributeIndex].attributesValue[valueIndex],
          mediaID: mediaID,
          urlMedia: urlMedia,
        };
      }

      return newAttributes;
    });
  };


  const handleAddItemToAttributes = () => {
    resetSKUs();
    setAttributes((prevAttributes) => {
      if (prevAttributes.length < 2) {
        return [
          ...prevAttributes,
          {
            locAttributeName: '', attributesValue: [
              {
                locAttributeValueName: '',
                mediaID: '',
                urlMedia: '',
              },
            ]
          },
        ];
      }

      return prevAttributes;
    });
  };

  const handleDeleteItemInAttributes = (index: number) => {
    resetSKUs();
    setAttributes((prevAttributes) => {
      prevAttributes[index].attributesValue.forEach((value) => {
        handleChangeAttributeValueMedia(index, prevAttributes[index].attributesValue.indexOf(value), "", "");
      }
      );
      // Use the functional form of setAttributes to ensure the update is based on the latest state
      return prevAttributes.filter((_, i) => i !== index);

    });
  };


  const handleChangeAttributeValue = (attributeIndex: number, valueIndex: number, locAttributeValueName: string) => {
    resetSKUs();
    setAttributes((prevAttributes) => {
      const newAttributes = [...prevAttributes];

      if (newAttributes[attributeIndex] && newAttributes[attributeIndex].attributesValue[valueIndex]) {
        newAttributes[attributeIndex].attributesValue[valueIndex].locAttributeValueName = locAttributeValueName;
      }

      return newAttributes;
    });
  };

  const handleAddItemToAttributeValue = (attributeIndex: number) => {
    resetSKUs();
    setAttributes((prevAttributes) => {
      // Use the functional form of setAttributes to ensure the update is based on the latest state
      return prevAttributes.map((attribute, index) => {
        if (index === attributeIndex) {
          return {
            ...attribute,
            attributesValue: [
              ...attribute.attributesValue,
              {
                locAttributeValueName: '',
                mediaID: '',
                urlMedia: '',
              },
            ],
          };
        }
        return attribute;
      });
    });
  };


  const handleDeleteItemInAttributeValue = (attributeIndex: number, valueIndex: number) => {
    resetSKUs();
    setAttributes((prevAttributes) => {
      // Use the functional form of setAttributes to ensure the update is based on the latest state
      return prevAttributes.map((attribute, index) => {
        if (index === attributeIndex) {
          // Check if there's more than one element before applying the filter
          if (attribute.attributesValue.length > 1) {
            handleChangeAttributeValueMedia(attributeIndex, valueIndex, "", "");
            return {
              ...attribute,
              attributesValue: attribute.attributesValue.filter((_, i) => i !== valueIndex),
            };
          }
        }
        return attribute;
      });
    });
  };
  const uploadImagePL = async (file, attributeIndex, valueIndex) => {
    handleChangeAttributeValueMedia(attributeIndex, valueIndex, "a", "");
    const data = new FormData();
    data.append("file", file);
    const response = await productServices.addImg(data);
    if (response) {
      handleChangeAttributeValueMedia(attributeIndex, valueIndex, response?.mediaID, response?.url);
    }
  };


  return (
    <>
      <div>
        <span>Phân loại hàng</span>
        <button onClick={handleAddItemToAttributes}>Thêm Nhóm phân loại</button>
      </div>
      {attributes.map((attribute, index) => (
        <div key={index}>
          <span>Nhóm phân loại {index + 1}</span>
          <Input
            value={attribute.locAttributeName}
            onChange={(e) => {
              handleChangeAttributes(e.target.value, index, '');
            }}
          />
          <p>Phân loại hàng</p>
          {attribute.attributesValue.map((value, valueIndex) => (
            <div key={valueIndex}>
              <Input
                value={value.locAttributeValueName}
                onChange={(e) => {
                  handleChangeAttributeValue(index, valueIndex, e.target.value);
                }}
              />
              <button onClick={() => handleDeleteItemInAttributeValue(index, valueIndex)}>Xóa Phân loại hàng</button>
            </div>
          ))}
          <button onClick={() => handleAddItemToAttributeValue(index)}>Thêm Phân loại hàng</button>
          <button onClick={() => handleDeleteItemInAttributes(index)}>Xóa nhóm phân loại</button>
        </div>
      ))}
      {attributes.length === 0 && (
        <div>
          <Form.Item label="Giá">
            <Input
              value={SKUs[0]?.price || ''}
              onChange={(e) => {
                handleChangeValue(
                  0,
                  'price',
                  e.target.value
                );
              }}
            />
          </Form.Item>
          <Form.Item label="Giá before">
            <Input
              value={SKUs[0]?.priceBefore || ''}
              onChange={(e) => {
                handleChangeValue(
                  0,
                  'priceBefore',
                  e.target.value
                );
              }}
            />
          </Form.Item>
          <Form.Item label="Kho hàng">
            <Input
              value={SKUs[0]?.totalStock || ''}
              onChange={(e) => {
                handleChangeValue(
                  0,
                  'totalStock',
                  e.target.value
                );
              }}
            />
          </Form.Item>
        </div>
      )}
      {attributes.length === 1 && (
        <table>
          <tr>
            <th>{attributes[0].locAttributeName || 'Nhóm phân loại 1'}</th>
            <th>Giá</th>
            <th>Giá before</th>
            <th>Kho hàng</th>
          </tr>
          {attributes[0].attributesValue.map((c1, index1) => (
            <Fragment key={index1}>
              <tr key={`${index1}`}>
                {/* <td>{c1.locAttributeValueName}</td>  */}
                <td>
                  {c1.mediaID !== "" && (
                    <div
                      style={{
                        position: 'relative',
                        width: '102px', // Đặt kích thước vuông ở đây (ví dụ: 100px)
                        height: '102px', // Đặt kích thước vuông ở đây (ví dụ: 100px)
                        overflow: 'hidden',
                        borderRadius: '8px',
                        border: '1px dashed gray',
                      }}
                    >
                      <Image
                        preview={false}
                        width={'100%'}
                        height={'100%'}
                        src={c1.urlMedia}
                        style={{
                          objectFit: 'cover', // Đảm bảo ảnh fit đúng vào kích thước vuông
                        }}
                      />
                      <Button
                        type="text"
                        shape="circle"
                        size='large'
                        icon={<DeleteOutlined />}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          zIndex: 1,
                        }}
                        onClick={() => {
                          handleChangeAttributeValueMedia(0, index1, "", "");
                        }}
                      />
                    </div>
                  )}
                  {c1.mediaID === "" && (
                    <div>
                      <Form.Item name="upload">
                        <Upload
                          listType="picture-card"
                          onRemove={() => {
                            handleChangeAttributeValueMedia(0, index1, "", "");
                          }}
                          onPreview={() => { console.log("onPreview") }}
                          beforeUpload={(file) => {
                            uploadImagePL(file, 0, index1);
                          }}
                        >
                          {c1.mediaID === "" && (
                            <div>
                              <PlusOutlined />
                              <div
                                style={{
                                  marginTop: 8,
                                }}
                              >
                                Upload
                              </div>
                            </div>
                          )}

                        </Upload>
                      </Form.Item>
                    </div>
                  )}
                </td>
                <td>
                  <Input
                    value={SKUs[index1]?.price || ''}
                    onChange={(e) => {
                      handleChangeValue(
                        index1,
                        'price',
                        e.target.value
                      );
                    }}
                  />
                </td>
                <td>
                  <Input
                    value={SKUs[index1]?.priceBefore || ''}
                    onChange={(e) => {
                      handleChangeValue(
                        index1,
                        'priceBefore',
                        e.target.value
                      );
                    }}
                  />
                </td>
                <td>
                  <Input
                    value={SKUs[index1]?.totalStock || ''}
                    onChange={(e) => {
                      handleChangeValue(
                        index1,
                        'totalStock',
                        e.target.value
                      );
                    }}
                  />
                </td>
              </tr>
            </Fragment>
          ))}
        </table>
      )}
      {attributes.length === 2 && (
        <table>
          <tr>
            <th>{attributes[0].locAttributeName || 'Nhóm phân loại 1'}</th>
            <th>{attributes[1].locAttributeName || 'Nhóm phân loại 2'}</th>
            <th>Giá</th>
            <th>Giá before</th>
            <th>Kho hàng</th>
          </tr>
          {attributes[0].attributesValue.map((c1, index1) => (
            <Fragment key={index1}>
              {attributes[1].attributesValue.map((c2, index2) => (
                <tr key={`${index1}${index2}`}>
                  {index2 === 0 ?
                    <td>
                      {c1.mediaID !== "" && (
                        <div
                          style={{
                            position: 'relative',
                            width: '102px', // Đặt kích thước vuông ở đây (ví dụ: 100px)
                            height: '102px', // Đặt kích thước vuông ở đây (ví dụ: 100px)
                            overflow: 'hidden',
                            borderRadius: '8px',
                            border: '1px dashed gray',
                          }}
                        >
                          <Image
                            preview={false}
                            width={'100%'}
                            height={'100%'}
                            src={c1.urlMedia}
                            style={{
                              objectFit: 'cover', // Đảm bảo ảnh fit đúng vào kích thước vuông
                            }}
                          />
                          <Button
                            type="text"
                            shape="circle"
                            size='large'
                            icon={<DeleteOutlined />}
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              zIndex: 1,
                            }}
                            onClick={() => {
                              handleChangeAttributeValueMedia(0, index1, "", "");
                            }}
                          />
                        </div>
                      )}
                      {c1.mediaID === "" && (
                        <div>
                          <Form.Item name="upload">
                            <Upload
                              listType="picture-card"
                              onRemove={() => {
                                handleChangeAttributeValueMedia(0, index1, "", "");
                              }}
                              onPreview={() => { console.log("onPreview") }}
                              beforeUpload={(file) => {
                                uploadImagePL(file, 0, index1);
                              }}
                            >
                              {c1.mediaID === "" && (
                                <div>
                                  <PlusOutlined />
                                  <div
                                    style={{
                                      marginTop: 8,
                                    }}
                                  >
                                    Upload
                                  </div>
                                </div>
                              )}

                            </Upload>
                          </Form.Item>
                        </div>
                      )}
                    </td>
                    : <></>}
                  <td>{c2.locAttributeValueName}</td>
                  <td>
                    <Input
                      value={SKUs[index1 * attributes[1].attributesValue.length + index2]?.price || ''}
                      onChange={(e) => {
                        handleChangeValue(
                          index1 * attributes[1].attributesValue.length + index2,
                          'price',
                          e.target.value
                        );
                      }}
                    />
                  </td>
                  <td>
                    <Input
                      value={SKUs[index1 * attributes[1].attributesValue.length + index2]?.priceBefore || ''}
                      onChange={(e) => {
                        handleChangeValue(
                          index1 * attributes[1].attributesValue.length + index2,
                          'priceBefore',
                          e.target.value
                        );
                      }}
                    />
                  </td>
                  <td>
                    <Input
                      value={SKUs[index1 * attributes[1].attributesValue.length + index2]?.totalStock || ''}
                      onChange={(e) => {
                        handleChangeValue(
                          index1 * attributes[1].attributesValue.length + index2,
                          'totalStock',
                          e.target.value
                        );
                      }}
                    />
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
        </table>
      )}
    </>
  );
}
