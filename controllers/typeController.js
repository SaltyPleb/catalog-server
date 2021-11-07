const {Type, DeviceInfo, Device} = require('../models/models')
const ApiError = require('../error/ApiError')

class typeController{
    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

    async getOneType(req, res) {
        const {id} = req.params
        const types = await Type.findOne({ 
            where: {id},
            include: [{model: Device, as: "device"}]
        })
        return res.json(types)
    }

}

module.exports = new typeController()