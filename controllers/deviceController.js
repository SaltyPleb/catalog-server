class deviceController{
    async create(req, res) {
        const {name, price, brandId, typeId, info} = res.body
        const {img} = req.files
    }

    async getAll(req, res) {
        
    }

    async getOne(req, res) {

    }

}

module.exports = new deviceController()