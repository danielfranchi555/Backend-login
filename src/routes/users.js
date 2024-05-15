const express = require('express');
const controllerUser = require('../controllers/users');

const router = express.Router();

router.get('/', controllerUser.getUsers);
router.post('/', controllerUser.sendUser);
router.delete('/:id', controllerUser.deleteUser);
router.put('/:id', controllerUser.updateUser);

module.exports = router;
