import ReactMarkdown from 'react-markdown';



function Markdown({text}) {
  const transformedText = text?.replace(/\/uploads\//g, 'https://backoffice.nodemy.vn/uploads/');
  //const text1 = "anh 1\n![uploads](https://backoffice.nodemy.vn/uploads/uploads_1d33e58af5.jpg)\n\n![mbp16-silver-gallery2-202110_9b66cc10983c4d9fb860ace11487ec45.webp](https://backoffice.nodemy.vn/uploads/mbp16_silver_gallery2_202110_9b66cc10983c4d9fb860ace11487ec45_d659585dfb.webp)";
  return (
    <ReactMarkdown>{transformedText}</ReactMarkdown>
  );
// console.log(text);
//   const transformedText = text?.replace(/\/uploads\//g, 'https://backoffice.nodemy.vn/uploads/');
//   console.log(transformedText);
//   return (
//     <div className="Markdown">
//       <ReactMarkdown
//         source={transformedText}
//         renderers={{
//           image: Image,
//         }}
//       />
//     </div>
//   );

}

export default Markdown;
// source: là nội dung cần hiển thị dưới dạng Markdown, trong trường hợp này là biến transformedText (được định nghĩa trước đó).
// renderers: là một đối tượng chứa các phương thức được sử dụng để hiển thị các thành phần Markdown khác nhau.
// Trong trường hợp này, chỉ có phương thức image được sử dụng, và nó được định nghĩa bằng component Image.
// Điều này sẽ đảm bảo rằng tất cả các ảnh trong chuỗi Markdown đều được hiển thị bằng component Image.
