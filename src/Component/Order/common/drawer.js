import React, { useState, useEffect } from 'react';
import { Col, Divider, Drawer, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenDrawerApply } from '../../slice/couterSlice';
import { orderServices } from '../../../services/orderService'

const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label !text-cyan-600">{title}:</p>
        {content}
    </div>
);

const Drawers = () => {
    const dispatch = useDispatch();
    const open = useSelector(state => state.counter.openDrawerApply);
    const idOrder = useSelector(state => state.counter.idOrder);
    const [data, setData] = useState({});
    const onClose = () => {
        dispatch(setOpenDrawerApply(false));
    };
    useEffect(() => {
        setData({});
    }, [open]);
    useEffect(() => {
        async function getData() {
            const res = await orderServices.detailOrder(idOrder);
            setData(res?.receiverAddresse);
        }
        if (idOrder)
            getData();
    }, [open]);

    return (
        <Drawer width={640} placement="right" closable={false} onClose={onClose} open={open}>
            <p
                className="site-description-item-profile-p"
                style={{
                    marginBottom: 24,
                    width: "100%",
                }}
            >
                Information
            </p>

            <p>Receiver Info:</p>
            <Divider />
            <Row>
                <Col span={24}>
                    <DescriptionItem title="AddressID" content={data?.receiverAddressID} />
                </Col>
                <Divider />
                <Col span={24}>
                    <DescriptionItem title="ContactName" content={data?.receiverContactName} />
                </Col>
            </Row>
            <Row>
                <Divider />
                <Col span={24}>
                    <DescriptionItem title="Phone" content={data?.receiverPhone} />
                </Col>


            </Row>
            <Row>
                <Divider />
                <Col span={24}>
                    <DescriptionItem title="Address" content={data?.addressDetail + ", " + data?.wardName + ", " + data?.districtName + ", " + data?.cityName} />
                </Col>
            </Row>

            <Divider />

        </Drawer>

    );
};
export default Drawers;