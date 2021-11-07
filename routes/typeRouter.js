const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), typeController.create) // now items can add only admins, if you wont give that opportunity to all, delite chckrole function
router.get('/', typeController.getAll)
router.get('/:id', typeController.getOneType)

module.exports = router