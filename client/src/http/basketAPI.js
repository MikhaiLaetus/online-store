import { $authHost } from "./index";

export const addDeviceToBasket = async (userId, deviceId) => {
    const {data} = await $authHost.post('api/basket/add', {userId, deviceId});
    return data;
};

export const removeDeviceFromBasket = async (userId, deviceId) => {
    const {data} = await $authHost.delete('api/basket', {params: {userId, deviceId}});
    return data;
};

export const fetchDevicesFromBasket = async (userId, page, limit = 5) => {
    const {data} = await $authHost.get('api/basket', {params: {userId, page, limit}});
    return data;
};


