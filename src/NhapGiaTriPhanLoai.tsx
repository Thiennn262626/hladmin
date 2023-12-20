import { Fragment, useState } from 'react';
import {
    Form,
    Input,
    Select,
    Divider,

} from 'antd';
type SKU = {
  price: number;
  totalStock: number;
  priceBefore: number;
};

type attributes = {
  locAttributeName: string;
  attributesValue: attributeValue[];
};

type attributeValue = {
  locAttributeValueName: string;
  mediaID: string;
};

export default function NhapGiaTriPhanLoai({
  attributes,
  SKUs,
  setSKUs,
}: {
  attributes: attributes[];
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

//   const renderTableRows = () => {
//     const rows = [];

//     {categories1.map((c1, index1) => (
//   <Fragment key={index1}>
//     {categories2.map((c2, index2) => (
//       <tr key={`${index1}${index2}`}>
//         {index2 === 0 ? <td rowSpan={categories2.length}>{c1}</td> : <></>}
//         <td>{c2}</td>
//         <td>
//           <input
//             value={SKUs[index1 * categories2.length + index2]?.price || ''}
//             onChange={(e) => {
//               handleChangeValue(index1 * categories2.length + index2, 'price', e.target.value)
//             }}
//           />
//         </td>
//         <td>
//           <input
//             value={SKUs[index1 * categories2.length + index2]?.totalStock || ''}
//             onChange={(e) => {
//               handleChangeValue(index1 * categories2.length + index2, 'totalStock', e.target.value)
//             }}
//           />
//         </td>
//         <td>
//           <input
//             value={SKUs[index1 * categories2.length + index2]?.priceBefore || ''}
//             onChange={(e) => {
//               handleChangeValue(index1 * categories2.length + index2, 'priceBefore', e.target.value)
//             }}
//           />
//         </td>
//       </tr>
//     ))}
//   </Fragment>
// ))}


//     return rows;
//   };
const renderAttributeInterface = (attribute: attributes, index: number) => {
    return (
      <Fragment key={index}>
        {attribute.attributesValue.map((value, valueIndex) => (
          <tr key={`${index}${valueIndex}`}>
            {valueIndex === 0 && <td rowSpan={attribute.attributesValue.length}>{attribute.locAttributeName}</td>}
            <td>{value.locAttributeValueName}</td>
            <td>
              <input
                value={SKUs[index * attribute.attributesValue.length + valueIndex]?.price || ''}
                onChange={(e) => {
                  handleChangeValue(
                    index * attribute.attributesValue.length + valueIndex,
                    'price',
                    e.target.value
                  );
                }}
              />
            </td>
            <td>
              <input
                value={SKUs[index * attribute.attributesValue.length + valueIndex]?.totalStock || ''}
                onChange={(e) => {
                  handleChangeValue(
                    index * attribute.attributesValue.length + valueIndex,
                    'totalStock',
                    e.target.value
                  );
                }}
              />
            </td>
            <td>
              <input
                value={SKUs[index * attribute.attributesValue.length + valueIndex]?.priceBefore || ''}
                onChange={(e) => {
                  handleChangeValue(
                    index * attribute.attributesValue.length + valueIndex,
                    'priceBefore',
                    e.target.value
                  );
                }}
              />
            </td>
          </tr>
        ))}
      </Fragment>
    );
  };

  return (
    <div>
      {/* Your other JSX code here */}

      {attributes.map((attribute, index) => renderAttributeInterface(attribute, index))}
    </div>
  );
}
//   return (
    
//     <table>
//       <thead>
//        <Form.Item label="Giá">
//                 <Input maxLength={120} />
//             </Form.Item>
//             <Form.Item label="Giá before">
//                 <Input maxLength={120} />
//             </Form.Item>
//             <Form.Item label="Kho hàng"> 
//                 <Input maxLength={120} />
//             </Form.Item>
//       </thead>
//       {/* <tbody> </tbody> */}
//     </table>

//   );

// }
