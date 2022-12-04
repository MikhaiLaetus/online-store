import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import bigStar from '../assets/bigStar.png';
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from '../http/deviceAPI';
import { Context } from '..';
import { addDeviceToBasket, fetchDevicesFromBasket } from '../http/basketAPI';
import { observer } from 'mobx-react-lite';

const DevicePage = observer(() => {
	const [device, setDevice] = useState({info: []});
	const { id } = useParams();
	const { user, basket } = useContext(Context);
	const [isAdded, setIsAdded] = useState(false);

	const addToBasket = () => {
		addDeviceToBasket(user.user.id, device.id);
		basket.setStatus();
		setIsAdded(true);
	}

	useEffect(() => {
		fetchOneDevice(id).then((data) => setDevice(data));
		fetchDevicesFromBasket(user.user.id).then(data => {
            basket.setDevices(data);
		});
	}, [basket.status]);


    return (
		<Container className='mt-5'>
			<Row>
				<Col md={4}>
					<Image width={300} height={300} src={'http://localhost:5000/' + device.img} />
				</Col>
				<Col md={4}>
					<Row className='d-flex flex-column align-items-center'>
						<h2 className='text-center'>{device.name}</h2>
						<div
							className='d-flex align-items-center justify-content-center'
							style={{background: `url(${bigStar}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 64}}
						>
							{5}
						</div>
					</Row>
				</Col>
				<Col md={4}>
					<Card 
						className='d-flex flex-column align-items-center justify-content-center'
						style={{width: 300, height: 300, fontSize: 32, border: '5ps solid lightgray'}}
					>
						<h3>{device.price} руб.</h3>
						<Button variant='outline-dark' onClick={addToBasket} disabled={isAdded}>Добавить в корзину</Button>
					</Card>
				</Col>
			</Row>
			{!!device.info.length && <Row className='d-flex flex-column m-3'>
				<h1>Характеристики</h1>
				{device.info.map((info, index) => 
					<Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
						{info.title}: {info.description}
					</Row>
				)}
			</Row>}
		</Container>
	);
});

export default DevicePage;
