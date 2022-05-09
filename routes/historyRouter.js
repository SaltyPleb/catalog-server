const Router = require('express')
const router = new Router()
const historyController = require('../controllers/historyController')

router.get('/', historyController.getAll)
router.get('/:id', historyController.getByUserId)

module.exports = router