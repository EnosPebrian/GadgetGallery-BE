const router = require('express').Router();
const { userController } = require('../controllers');

router.get('/:id', userController.getById);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.patch('/verify', userController.verify);

module.exports = router;