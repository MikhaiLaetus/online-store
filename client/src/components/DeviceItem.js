import React, { useContext } from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import star from '../assets/star.png';
import { useNavigate } from "react-router-dom";
import { DEViCE_ROUTE } from '../utils/consts';
import { Context } from '..';

const DeviceItem = ({ device }) => {
    const navigate = useNavigate();
    const { device: { brands } } = useContext(Context);
    const getBrand = () => brands.find((item) => item.id === device.brandId).name;
    
    return (
        <Col md={3} className="mt-3" onClick={() => navigate(DEViCE_ROUTE + '/' + device.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border="light">
                <Image width={150} height={150} src={'http://localhost:5000/' + device.img} />
                <div className="mt-1 d-flex text-black-50 align-items-center justify-content-between">
                    <div>{getBrand()}</div>
                    <div className="d-flex align-items-center justify-content-between">
                        <div>5</div>
                        <Image width={15} height={15} src={star} />
                    </div>
                </div>
                <div>
                    {device.name}        
                </div>
            </Card>
        </Col>
    );
};

export default DeviceItem;
