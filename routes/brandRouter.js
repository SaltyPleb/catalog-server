const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandcontroller')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), brandController.create) // now items can add only admins, if you wont give that opportunity to all, delite chckrole function
router.get('/', brandController.getAll)


module.exports = router