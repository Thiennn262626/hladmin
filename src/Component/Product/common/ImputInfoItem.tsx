import { useRef, Fragment, useEffect } from 'react';
import { productServices } from '../../../services/productService'
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { Space, Tag } from 'antd';
import React, { useState } from 'react';
import { notify } from '../../../utils/notify';
import {
  setAttributess,
  setProductSKUs
} from '../../../Component/Product/counterProduct';
import { useDispatch } from 'react-redux';
import {
  Form,
  Input,
  Upload,
  Button,
  Image,
  Divider,
} from 'antd';
type attributes = {
  locAttributeName: string;
  attributeValue: attributeValue[];
};

type attributeValue = {
  locAttributeValueName: string;
  media_url: string;
};

type SKU = {
  price: number;
  totalStock: number;
  priceBefore: number;
};

export default function TestPhanLoai() {
  const dispatch = useDispatch();
  const [attributes, setAttributes] = useState<attributes[]>([]);
  const [SKUs, setSKUs] = useState<{ price: number; totalStock: number; priceBefore: number }[]>([]);
  const initialSKUs = [
    { price: 0, totalStock: 0, priceBefore: 0 },
  ];

  const saveRedux = () => {
    // dispatch(setAttributess(attributes));
    // dispatch(setProductSKUs(SKUs));
  };

  const resetSKUs = () => {
    setSKUs(initialSKUs);
  };

  const handleChangeValue = (index: number, field: keyof SKU, value: string) => {
    console.log(index, field, value);
    setSKUs((prevSKUs) => {
      const newSKUs = [...prevSKUs];
      newSKUs[index] = { ...newSKUs[index], [field]: parseFloat(value) || 0 };
      dispatch(setProductSKUs(newSKUs));
      return newSKUs;
    });
  };

  const handleChangeAttributes = (locAttributeName: string, index: number) => {
    setAttributes((prevAttributes) => {
      let newAttributes = [...prevAttributes];

      if (newAttributes[index]) {
        newAttributes[index].locAttributeName = locAttributeName;
      }
      console.log("handleChangeAttributes", newAttributes);
      return newAttributes;
    });
    // dispatch(setAttributess(attributes));
  };

  const handleChangeAttributeValueMedia = (attributeIndex: number, valueIndex: number, media_url: string) => {
    console.log(attributeIndex, valueIndex, media_url);
    setAttributes((prevAttributes) => {
      const newAttributes = [...prevAttributes];

      if (
        newAttributes[attributeIndex] &&
        newAttributes[attributeIndex].attributeValue &&
        newAttributes[attributeIndex].attributeValue[valueIndex]
      ) {
        newAttributes[attributeIndex].attributeValue[valueIndex] = {
          ...newAttributes[attributeIndex].attributeValue[valueIndex],
          media_url: media_url,
        };
      }
      console.log("handleChangeAttributeValueMedia", newAttributes);
      return newAttributes;
    });
    // dispatch(setAttributess(attributes));
  };


  const handleAddItemToAttributes = () => {
    resetSKUs();
    setAttributes((prevAttributes) => {
      if (prevAttributes.length < 2) {
        return [
          ...prevAttributes,
          {
            locAttributeName: '',
            attributeValue: [
              {
                locAttributeValueName: 'Loại 1',
                media_url: '',
              },
            ]
          },
        ];
      }
      console.log("handleAddItemToAttributes", prevAttributes);
      return prevAttributes;
    });
    // dispatch(setAttributess(attributes));
  };

  const handleDeleteItemInAttributes = (index: number) => {
    resetSKUs();
    setAttributes((prevAttributes) => {
      prevAttributes[index].attributeValue.forEach((value) => {
        handleChangeAttributeValueMedia(index, prevAttributes[index].attributeValue.indexOf(value), "");
      }
      );
      // Use the functional form of setAttributes to ensure the update is based on the latest state
      console.log("handleDeleteItemInAttributes", prevAttributes);
      return prevAttributes.filter((_, i) => i !== index);// hàm filter trả về mảng mới với các phần tử thỏa mãn điều kiện
    });
    // dispatch(setAttributess(attributes));
  };


  const handleChangeAttributeValue = (attributeIndex: number, valueIndex: number, locAttributeValueName: string) => {
    resetSKUs();
    setAttributes((prevAttributes) => {
      const newAttributes = [...prevAttributes];

      if (newAttributes[attributeIndex] && newAttributes[attributeIndex].attributeValue[valueIndex]) {
        newAttributes[attributeIndex].attributeValue[valueIndex].locAttributeValueName = locAttributeValueName;
      }
      console.log("handleChangeAttributeValue", newAttributes);
      // dispatch(setAttributess(newAttributes));
      return newAttributes;
    });
    // dispatch(setAttributess(attributes));
  };

  const handleAddItemToAttributeValue = (attributeIndex: number) => {

    resetSKUs();
    setAttributes((prevAttributes) => {
      // Use the functional form of setAttributes to ensure the update is based on the latest state
      return prevAttributes.map((attribute, index) => {
        if (index === attributeIndex) {
          return {
            ...attribute,
            attributeValue: [
              ...attribute.attributeValue,
              {
                locAttributeValueName: '',
                media_url: '',
              },
            ],
          };
        }
        console.log("handleAddItemToAttributeValue", attribute);
        return attribute;
      });
    });
    // dispatch(setAttributess(attributes));
  };


  const handleDeleteItemInAttributeValue = (attributeIndex: number, valueIndex: number) => {
    //nếu còn 1 phần tử thì không cho xóa
    if (attributes[attributeIndex].attributeValue.length === 1) {
      notify.notify1('Phải có ít nhất 1 loại', 'info');
      return;
    }
    resetSKUs();
    setAttributes((prevAttributes) => {
      // Use the functional form of setAttributes to ensure the update is based on the latest state
      return prevAttributes.map((attribute, index) => {
        if (index === attributeIndex) {
          // Check if there's more than one element before applying the filter
          if (attribute.attributeValue.length > 1) {
            handleChangeAttributeValueMedia(attributeIndex, valueIndex, "");
            return {
              ...attribute,
              attributeValue: attribute.attributeValue.filter((_, i) => i !== valueIndex),
            };
          }
        }
        console.log("handleDeleteItemInAttributeValue", attribute);
        return attribute;
      });
    });
    // dispatch(setAttributess(attributes));
  };
  const uploadImagePL = async (file, attributeIndex, valueIndex) => {
    handleChangeAttributeValueMedia(attributeIndex, valueIndex, "a");
    const data = new FormData();
    data.append("file", file);
    try {
      const response = await productServices.addImg(data);
      if (response) {
        handleChangeAttributeValueMedia(attributeIndex, valueIndex, response?.media_url);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const [name, setName] = useState('');
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const inputRef = useRef(null);

  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const addItem = (e) => {
    if (!name) {
      notify.notify1('Vui lòng nhập tên phân loại', 'info');
      return;
    }
    if (attributes.length >= 2) {
      notify.notify1('Tối đa 2 phân loại', 'info');
      return;
    }
    e.preventDefault();
    handleAddItemToAttributes()
    handleChangeAttributes(name, attributes.length);
    setName('');

  };
  const removeItem = (index) => {
    handleDeleteItemInAttributes(index)
    setName1('');
  };

  return (
    <>
      <div>
        <Divider />
        <b className='!pb-[20px]'>Thông tin bán hàng</b>
        <Button type="text" icon={<SaveOutlined />} onClick={saveRedux}>
          Lưu
        </Button>

        <Divider />
        <div>
          <Form.Item label="Phân loại">
            <Space>
              <Input
                placeholder="Tối đa 2 phân loại"
                ref={inputRef}
                value={name}
                onChange={onNameChange}
                onKeyDown={(e) => e.stopPropagation()}
              />
              <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                Thêm
              </Button>
            </Space>
          </Form.Item>
          {
            attributes.length > 0 &&
            <Form.Item label="Danh sách:">
              <Divider style={{ margin: '8px 0' }} />
              <div>
                {attributes.map((item, index) => (
                  <Tag
                    key={index}
                    closable={attributes.length === 1 || (attributes.length === 2 && index === 1)}
                    onClose={() => {
                      if (attributes.length === 2 && index === 1) {
                        removeItem(index);
                      } else if (attributes.length === 1) {
                        removeItem(index);
                      }
                    }}
                    style={{ marginBottom: 8 }}
                  >
                    {item.locAttributeName}
                  </Tag>
                ))}

              </div>
            </Form.Item>
          }
          <Divider />
        </div>
        {attributes.length > 0 &&
          //<<<SaveOutlined /> /> />
          <div className='!w-full'>
            <b className='!pb-[20px] !pr-[20px]'>Thông tin phân loại</b>
            {/* <Button type="text" icon={<SaveOutlined />} onClick={saveRedux}>
              Lưu
            </Button> */}

            <div className='flex  m-[15px] !w-full'>
              <div className='w-[20%]'>
                {attributes.map((attribute, index) =>
                  <div className='w-[90%] p-[15px] border rounded-[12px] m-[10px] hover:shadow-lg transition-all duration-300' key={index}>
                    <div key={index}>
                      <span>Nhóm phân loại :  <b className='!pb-[20px]'> {attribute.locAttributeName}</b></span>
                      <Input
                        value={attribute.locAttributeName}
                        onChange={(e) => {
                          handleChangeAttributes(e.target.value, index);
                        }}
                      />

                    </div>
                    <div className='!w-[100%]'>
                      <Divider />
                      <Space>
                        <Input
                          placeholder="Loại"
                          value={index === 0 ? name1 : name2}
                          onChange={(e) => {
                            if (index === 0) {
                              setName1(e.target.value);
                            } else {
                              setName2(e.target.value);
                            }
                          }}

                        />
                        <Button type="text" icon={<PlusOutlined />} onClick={(e) => {
                          if (index === 0) {
                            if (!name1) {
                              notify.notify1('Vui lòng nhập tên loại', 'info');
                              return;
                            }
                            handleAddItemToAttributeValue(index)
                            handleChangeAttributeValue(index, attribute.attributeValue.length, name1);
                            setName1('');
                          } else {
                            if (!name2) {
                              notify.notify1('Vui lòng nhập tên loại', 'info');
                              return;
                            }
                            handleAddItemToAttributeValue(index)
                            handleChangeAttributeValue(index, attribute.attributeValue.length, name2);
                            setName2('');
                          }
                        }}>
                          Thêm
                        </Button>
                      </Space>


                      <span className=''>Danh sách loại:  <b className='!pb-[20px]'> {attribute.locAttributeName}</b> </span>
                      {attribute.attributeValue.map((value, valueIndex) => (
                        <div className='mb-[5px] mt-[5px] flex items-center mb-15' key={valueIndex}>
                          <Input
                            value={value.locAttributeValueName}
                            onChange={(e) => {
                              handleChangeAttributeValue(index, valueIndex, e.target.value);
                            }}
                            className='mr-[10px]'
                          />
                          {
                            valueIndex !== 0 &&
                            <Button type="text" icon={<DeleteOutlined />} onClick={() => {
                              handleDeleteItemInAttributeValue(index, valueIndex);
                            }} />
                          }

                        </div>
                        //<DeleteOutlined />

                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className='w-[80%]'>
                <div className='w-[90%] p-[15px] border rounded-[12px] m-[10px] hover:shadow-lg transition-all duration-300'>
                  {attributes.length === 1 && (
                    <table className=" w-full">
                      <tr>
                        <th className="border p-2">{attributes[0].locAttributeName || 'Nhóm phân loại 1'}</th>
                        <th className="border p-2">Giá</th>
                        <th className="border p-2">Giá gốc</th>
                        <th className="border p-2">Kho hàng</th>
                      </tr>
                      {attributes[0].attributeValue.map((c1, index1) => (
                        <Fragment key={index1}>
                          <tr key={`${index1}`} className='h-[135px]'>
                            {/* <td>{c1.locAttributeValueName}</td>  */}
                            <td className='!h-[100%] '>
                              {c1.media_url !== "" && (
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
                                    src={c1.media_url}
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
                                      handleChangeAttributeValueMedia(0, index1, "");
                                    }}
                                  />
                                </div>
                              )}
                              {c1.media_url === "" && (
                                <div className='mt-[15px]'>
                                  <Form.Item name="upload">
                                    <Upload
                                      listType="picture-card"
                                      onRemove={() => {
                                        handleChangeAttributeValueMedia(0, index1, "");
                                      }}
                                      onPreview={() => { console.log("onPreview") }}
                                      beforeUpload={(file) => {
                                        uploadImagePL(file, 0, index1);
                                      }}
                                    >
                                      {c1.media_url === "" && (
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
                    <table className='!w-[100%]'>
                      <tr className="border">
                        <th className="border rounded-tl-md p-2">Ảnh</th>
                        <th className="border p-2">{attributes[0].locAttributeName || 'Nhóm phân loại 1'}</th>
                        <th className="border p-2">{attributes[1].locAttributeName || 'Nhóm phân loại 2'}</th>
                        <th className="border p-2">Giá</th>
                        <th className="border p-2">Giá gốc</th>
                        <th className="border p-2 rounded-br-md">Kho hàng</th>
                      </tr>

                      {attributes[0].attributeValue.map((c1, index1) => (
                        <>
                          <Divider className='!w-full' />
                          <Fragment key={index1}>
                            {attributes[1].attributeValue.map((c2, index2) => (
                              <tr key={`${index1}${index2}`}>
                                {index2 === 0 ?
                                  <td className='!h-full'>
                                    {c1.media_url !== "" && (
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
                                          src={c1.media_url}
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
                                            handleChangeAttributeValueMedia(0, index1, "");
                                          }}
                                        />
                                      </div>
                                    )}
                                    {c1.media_url === "" && (
                                      <div>
                                        <Form.Item name="upload">
                                          <Upload
                                            listType="picture-card"
                                            onRemove={() => {
                                              console.log("onRemove", index1);
                                              handleChangeAttributeValueMedia(0, index1, "");
                                            }}
                                            onPreview={() => { console.log("onPreview") }}
                                            beforeUpload={(file) => {
                                              uploadImagePL(file, 0, index1);
                                            }}
                                          >
                                            {c1.media_url === "" && (
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
                                  : <td className='!mp-[51px]'></td>}
                                <td className='!mp-[51px]'>{c1.locAttributeValueName}</td>
                                <td>{c2.locAttributeValueName}</td>
                                <td>
                                  <Input
                                    value={SKUs[index1 * attributes[1].attributeValue.length + index2]?.price || ''}
                                    onChange={(e) => {
                                      handleChangeValue(
                                        index1 * attributes[1].attributeValue.length + index2,
                                        'price',
                                        e.target.value
                                      );
                                    }}
                                  />
                                </td>
                                <td>
                                  <Input
                                    value={SKUs[index1 * attributes[1].attributeValue.length + index2]?.priceBefore || ''}
                                    onChange={(e) => {
                                      handleChangeValue(
                                        index1 * attributes[1].attributeValue.length + index2,
                                        'priceBefore',
                                        e.target.value
                                      );
                                    }}
                                  />
                                </td>
                                <td>
                                  <Input
                                    value={SKUs[index1 * attributes[1].attributeValue.length + index2]?.totalStock || ''}
                                    onChange={(e) => {
                                      handleChangeValue(
                                        index1 * attributes[1].attributeValue.length + index2,
                                        'totalStock',
                                        e.target.value
                                      );
                                    }}
                                  />
                                </td>
                              </tr>
                            ))}
                          </Fragment>
                        </>

                      ))}
                    </table>
                  )}
                </div>

              </div>


            </div>
          </div>}
      </div>

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
          <Form.Item label="Giá gốc">
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

    </>
  );
}
