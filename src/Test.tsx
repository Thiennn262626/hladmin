import { useState } from 'react';
import NhapGiaTriPhanLoai from './NhapGiaTriPhanLoai.tsx';

export default function TestPhanLoai() {
  const [categories1, setCategories1] = useState<string[]>([]);
  const [categories2, setCategories2] = useState<string[]>([]);
  const [SKUs, setSKUs] = useState<{ price: number; totalStock: number; priceBefore: number }[]>([]);

  const handleChangeCategories1 = (index: number, value: string) => {
    setCategories1((prevCategories) => {
      const newCategories = [...prevCategories];
      newCategories[index] = value;
      return newCategories;
    });
  };

  const handleAddItemToCategories1 = () => {
    setCategories1((prevCategories) => [...prevCategories, '']);
  };

  const handleDeleteItemInCategories1 = (index: number) => {
    setCategories1((prevCategories) => {
      const newCategories = [...prevCategories];
      newCategories.splice(index, 1);
      return newCategories;
    });
  };
  const handleChangeCategories2 = (index: number, value: string) => {
    setCategories2((prevCategories) => { 
      const newCategories = [...prevCategories];
      newCategories[index] = value;
      return newCategories;
    });
  };

  const handleAddItemToCategories2 = () => {
    setCategories2((prevCategories) => [...prevCategories, '']);
  };

  const handleDeleteItemInCategories2 = (index: number) => {
    setCategories2((prevCategories) => { 
      const newCategories = [...prevCategories];
      newCategories.splice(index, 1);
      return newCategories;
    });
  };


  return (
    <>
      <div>Phan loai 1</div>
      {categories1.map((category, index) => (
        <div key={index}>
          <input
            value={category}
            onChange={(e) => {
              handleChangeCategories1(index, e.target.value);
            }}
          />
          <button
            onClick={() => {
              handleDeleteItemInCategories1(index);
            }}
          >
            Xóa
          </button>
        </div>
      ))}
      <button
        onClick={() => {
          handleAddItemToCategories1();
        }}
      >
        +
      </button>
      <div>Phan loai 2</div>
      {categories2.map((category, index) => (
        <div key={index}>
          <input
            value={category}
            onChange={(e) => {
              handleChangeCategories2(index, e.target.value);
            }}
          />
          <button
            onClick={() => {
              handleDeleteItemInCategories2(index);
            }}
          >
            Xóa
          </button>
        </div>
      ))}
      <button
        onClick={() => {
          handleAddItemToCategories2();
        }}
      >
        +
      </button>

      <NhapGiaTriPhanLoai
        key={categories1.length + categories2.length}
        categories1={categories1}
        categories2={categories2}
        SKUs={SKUs}
        setSKUs={setSKUs}
      />
    </>
  );
}
