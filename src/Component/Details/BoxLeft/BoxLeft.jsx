import './BoxLeft.css'
import { Divider } from 'antd';
import { Col, Row } from 'antd';
import Collapse from './Collapse';
export default function BoxLeft({ data }) {
    return <>
        <div className="boxLeft">
            <div className='policy_intuitive'>
                <div className="policy">
                    <Row>
                        <Col className='col' span={12}><p>
                            Hư gì đổi nấy
                            <span style={{ fontWeight: 'bold' }}> 12 tháng </span>
                            tại 3383 siêu thị toàn quốc (miễn phí tháng đầu)
                            <span style={{ color: '#288ad6' }}> Xem chi tiết</span>
                        </p></Col>
                        <Col className='col' span={12}> <p>
                            Bảo hành <span style={{ fontWeight: 'bold' }}>chính hãng điện thoại 1 năm</span> tại các trung tâm bảo hành hãng <span style={{ color: '#288ad6' }}>Xem địa chỉ bảo hành</span>
                        </p></Col>
                        <Divider className='divider' />
                    </Row>
                    <Row>
                        <Col className='col' span={12}>
                            Bộ sản phẩm gồm: Hộp, Sách hướng dẫn, Cây lấy sim, Cáp Lightning - Type C <span style={{ color: '#288ad6' }}>Xem hình</span>
                        </Col>
                        <Col className='col' span={12}>
                        </Col>
                    </Row>
                </div>
            </div >
            <div className="description">
                <p className="description__title">Thông tin sản phẩm</p>
                <p className="description__content">
                     <Collapse text={data?.description} />                
                </p>
            </div>
        </div>



    </>

}