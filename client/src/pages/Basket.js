import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import { Context } from '..';
import BasketItem from '../components/BasketItem';
import { fetchDevicesFromBasket } from '../http/basketAPI';

const Basket = observer(() => {
    const { basket, user } = useContext(Context);
	console.log('basket.status', basket.status)
    useEffect(() => {
		fetchDevicesFromBasket(user.user.id).then(data => {
            basket.setDevices(data);
		});
	}, [basket.status]);
    
    return (
      	<Stack gap={3}>
			{basket.devices.map(item => 
                <BasketItem key={Math.random() + item.id} device={item} />
            )}
			<hr/>
			{
				<div className="
					mb-4
					fw-bold 
					fs-5 
					m-auto
					d-flex 
					align-items-center 
					justify-content-around"             
				>
					{ basket.devices.length ?`Total ${basket.devices.reduce((total, curr) => total + curr.price, 0)} RUB` : 'Корзина пока пуста'}
				</div>
			}
			
		</Stack>
    );
});

export default Basket;
