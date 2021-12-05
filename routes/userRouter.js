const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth',authMiddleware, userController.check)
router.get('/users', checkRole('ADMIN'), userController.getUsers)
router.post('/users', checkRole('ADMIN'), userController.changeRole)


// router.get('/auth', (req, res) => {
//     res.json({message:'all works'})
// })


module.exports = router