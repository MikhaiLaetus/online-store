import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Context } from '..';

const TypeBar = observer(() => {
    const { device } = useContext(Context);
    return (
        <ListGroup>
            {device.types.map((type) => 
                <ListGroupItem 
                    key={type.id}
                    style={{cursor: 'pointer'}}
                    onClick={() => device.setSelectedType(type)}
                    active={type.id === device.selectedType.id}
                >
                    {type.name}
                </ListGroupItem>
            )}
        </ListGroup>
    );
});

export default TypeBar;
