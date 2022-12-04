import React, { useContext } from 'react';
import { Button, Image, Stack } from 'react-bootstrap';
import { Context } from '..';
import { removeDeviceFromBasket } from '../http/basketAPI';

const BasketItem = ({ device }) => {
    const { user, basket } = useContext(Context)

    const removeFromBasket = async () => {
        basket.setStatus();
        await removeDeviceFromBasket(user.user.id, device.id)
    }

    return (
        <Stack 
            direction="horizontal" 
            gap={2} 
            className="m-auto d-flex align-items-center justify-content-around"
            style={{minWidth: '500px'}}
        >
            <Image width={150} height={150} src={'http://localhost:5000/' + device.img} />
            <div className="me-auto ms-3">
                <h3>{device.name}</h3>
                <h4 className="text-muted" style={{fontSize:'.75rem'}}>
                {device.price} RUB
            </h4>
            </div>
            <Button 
                variant="outline-danger" 
                size="small" 
                onClick={() => removeFromBasket(device.id)}
            >
                &times;
            </Button>
        </Stack>
    );
};

export default BasketItem;
