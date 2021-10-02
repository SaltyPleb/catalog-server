const ApiError = require('../error/ApiError')

class userController{
    async create(req, res) {

    }

    async get(req, res) {
        
    }

    async check(req, res, next) {
        // res.json('kjgfdnhjgnhdfjug')
        const {id} = req.query

        if(!id) {
            return next(ApiError.badRequest('no ID'))
        }    

        res.json(id)
        // If we type in router http://localhost:5000/api/user/auth?id=5&messege=kdsngjnd (messega after ?) that give us json file in curret page
    }
}

module.exports = new userController()