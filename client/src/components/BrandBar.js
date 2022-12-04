import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Card } from 'react-bootstrap';
import { Context } from '..';

const BrandBar = observer(() => {
    const { device } = useContext(Context);

    return (
        <div className="d-flex flex-wrap">
            {device.brands.map(brand => 
                <Card 
                    key={brand.id}
                    style={{cursor: 'pointer'}}
                    className="p-3"
                    onClick={() => device.setSelectedBrand(brand)}
                    border={brand.id === device.selectedBrand.id ? 'primary' : 'light'}
                >
                    {brand.name}
                </Card>     
            )}
        </div>
    );
});

export default BrandBar;
