const controller = require('../controllers/userVerify');
const express = require('express');
const router = express.Router();

router.get('/', controller.getUserList);
router.post('/', controller.createUser);
router.patch('/', controller.updateUser);
router.delete('/:id', controller.deleteUser);
router.get('/getUserById/:id', controller.getUserById);

module.exports = router;
