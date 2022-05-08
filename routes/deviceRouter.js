const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const checkRole = require('../middleware/checkRoleMiddleware')
const createHistory = require('../middleware/createHistoryMiddleware')

router.post('/', checkRole('ADMIN'), deviceController.create) // now items can add only admins, if you wont give that opportunity to all, delite chckrole function
router.get('/', deviceController.getAll)
router.get('/:id', createHistory(), deviceController.getOne)


module.exports = router