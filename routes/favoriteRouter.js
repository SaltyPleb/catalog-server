const Router = require('express')
const router = new Router()
const favoriteController = require('../controllers/favoritecontroller')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', favoriteController.create)
router.get('/', favoriteController.getAll)


module.exports = router