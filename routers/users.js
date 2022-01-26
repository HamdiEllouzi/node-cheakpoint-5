const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/users')

router.get('/', userControllers.getUsers);

router.post('/', userControllers.creatUsers);

router.put('/:userId', userControllers.updateUsers)

router.delete('/:userId', userControllers.deleteUsers)

module.exports = router;