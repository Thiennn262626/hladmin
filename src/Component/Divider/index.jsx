
import { Breadcrumb } from 'antd';
const separatorStyle = {
    fontSize: '14px',
    color: '#288ad6',
  };
const App = ({devider}) => (
    <Breadcrumb separator={<span style={separatorStyle}>/</span>}
      items={[
        {
          href: '/',

          title:(<span style={separatorStyle}>Home</span>) ,
        },
        {  
            href: devider.link,
          title: (
            <>    
              <span style={separatorStyle}>{devider.previousPlace}</span>
            </>
          ),
        },
        {
          title: (
            <span style={separatorStyle}>{devider.currentPlace}</span>
          ),
        },
      ]}
    />
  );
  
export default App;