import { Fragment, useState } from 'react';

type SKU = {
  price: number;
  totalStock: number;
  priceBefore: number;
};

export default function NhapGiaTriPhanLoai({
  categories1,
  categories2,
  SKUs,
  setSKUs,
}: {
  categories1: string[];
  categories2: string[];
  SKUs: SKU[];
  setSKUs: React.Dispatch<React.SetStateAction<SKU[]>>;
}) {
  const handleChangeValue = (index: number, field: keyof SKU, value: string) => {
    setSKUs((prevSKUs) => {
      const newSKUs = [...prevSKUs];
      newSKUs[index] = { ...newSKUs[index], [field]: parseFloat(value) || 0 };
      return newSKUs;
    });
  };

  const renderTableRows = () => {
    const rows = [];

    {categories1.map((c1, index1) => (
  <Fragment key={index1}>
    {categories2.map((c2, index2) => (
      <tr key={`${index1}${index2}`}>
        {index2 === 0 ? <td rowSpan={categories2.length}>{c1}</td> : <></>}
        <td>{c2}</td>
        <td>
          <input
            value={SKUs[index1 * categories2.length + index2]?.price || ''}
            onChange={(e) => {
              handleChangeValue(index1 * categories2.length + index2, 'price', e.target.value)
            }}
          />
        </td>
        <td>
          <input
            value={SKUs[index1 * categories2.length + index2]?.totalStock || ''}
            onChange={(e) => {
              handleChangeValue(index1 * categories2.length + index2, 'totalStock', e.target.value)
            }}
          />
        </td>
        <td>
          <input
            value={SKUs[index1 * categories2.length + index2]?.priceBefore || ''}
            onChange={(e) => {
              handleChangeValue(index1 * categories2.length + index2, 'priceBefore', e.target.value)
            }}
          />
        </td>
      </tr>
    ))}
  </Fragment>
))}


    return rows;
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Phân loại 1</th>
          <th>Phân loại 2</th>
          <th>Giá</th>
          <th>Kho hàng</th>
          <th>Giá trước giảm giá</th>
        </tr>
      </thead>
      <tbody>{categories1.map((c1, index1) => (
  <Fragment key={index1}>
    {categories2.map((c2, index2) => (
      <tr key={`${index1}${index2}`}>
        {index2 === 0 ? <td rowSpan={categories2.length}>{c1}</td> : <></>}
        <td>{c2}</td>
        <td>
          <input
            value={SKUs[index1 * categories2.length + index2]?.price || ''}
            onChange={(e) => {
              handleChangeValue(index1 * categories2.length + index2, 'price', e.target.value)
            }}
          />
        </td>
        <td>
          <input
            value={SKUs[index1 * categories2.length + index2]?.totalStock || ''}
            onChange={(e) => {
              handleChangeValue(index1 * categories2.length + index2, 'totalStock', e.target.value)
            }}
          />
        </td>
        <td>
          <input
            value={SKUs[index1 * categories2.length + index2]?.priceBefore || ''}
            onChange={(e) => {
              handleChangeValue(index1 * categories2.length + index2, 'priceBefore', e.target.value)
            }}
          />
        </td>
      </tr>
    ))}
  </Fragment>
))}</tbody>
    </table>
  );
}
