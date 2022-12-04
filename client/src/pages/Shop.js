import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Context } from '..'
import BrandBar from '../components/BrandBar'
import DeviceList from '../components/DeviceList'
import Pages from '../components/Pages'
import TypeBar from '../components/TypeBar'
import { fetchDevicesFromBasket } from '../http/basketAPI'
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI'

const Shop = observer(() => {
	const {device, basket, user} = useContext(Context);
	useEffect(() => {
		fetchTypes().then(data => device.setTypes(data));
		fetchBrands().then(data => device.setBrands(data));
		fetchDevices(null, null, 1, 3).then(data => {
			device.setDevices(data.rows);
			device.setTotalCount(data.count)
		});
		fetchDevicesFromBasket(user.user.id).then(data => basket.setDevices(data));
	}, []);

	useEffect(() => {
		fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 3).then(data => {
			device.setDevices(data.rows);
			device.setTotalCount(data.count)
		});
	}, [device.page, device.selectedType, device.selectedBrand])

	return (
		<Container>
			<Row className='mt-3'>
				<Col md={3}>
					<TypeBar />
				</Col>
				<Col md={9}>
					<BrandBar />
					<DeviceList />
					<Pages />
				</Col>
			</Row>
		</Container>
	);
});

export default Shop;
