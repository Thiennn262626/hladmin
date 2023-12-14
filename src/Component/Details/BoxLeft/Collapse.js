import { Collapse } from 'antd';
import React, { useState, } from 'react';
import Markdown from './Markdown';

const { Panel } = Collapse;

const MAX_HEIGHT = 250; // đặt chiều cao tối đa

const App = ({ text }) => {
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    return <>
        <div>
            <Collapse defaultActiveKey={['1']}>
                <Panel key="1">
                    <div
                        className="my-content"
                        style={{
                            maxHeight: showMore ? 'none' : MAX_HEIGHT,
                            height: '100%',
                            overflow: 'auto'//sẽ tự động hiển thị thanh cuộn nếu nội dung vượt quá chiều cao của div.
                        }}
                    >
                        <Markdown text={text} />
                    </div>
                    <button style={{
                        border: "none",
                        backgroundColor: "transparent",
                        color: "blue",
                        fontSize: "16px",                      
                        cursor: "pointer"
                    }} onClick={toggleShowMore}>
                        {showMore ? 'See Less' : 'See More'}
                    </button>

                </Panel>
            </Collapse>
        </div>
    </>
};

export default App;
