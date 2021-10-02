const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandcontroller')

router.post('/', brandController.create)
router.get('/', brandController.getAll)


module.exports = router