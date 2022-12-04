
const { BasketDevice, Device } = require('../models/models');
const ApiError = require('../error/ApiError');

class BasketController {
    async addDevice(req, res, next) {
        try {
            let { userId, deviceId } = req.body;
            const device = await BasketDevice.create({deviceId, basketId: userId});

            return res.json(device)
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    };

    async getAll(req, res) {
        let { userId } = req.query;
        const  devices = await BasketDevice.findAll({
            where: {basketId: userId}
        });
        const data = [];
        for(let i = 0; i < devices.length; i++) {
            const device = await Device.findOne({where: {id: devices[i].deviceId}})
            data.push(device)
        }
        return res.json(data);
    };

    async removeDevice(req, res) {
        const {userId, deviceId} = req.query;
        await BasketDevice.destroy(
            {
                where: {basketId: userId, deviceId},
            }
        );
    }
};

module.exports = new BasketController();
