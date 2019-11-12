const controller = require('../controllers/sadhana');
const express = require('express');
const router = express.Router();

router.get('/', controller.list);
router.post('/getSadhanaById', controller.getSadhanaById);
router.post('/create/', controller.createSadhanaSheet);
router.all('/:id/update', controller.updateSadhanaSheet);
router.post('/:id/remove', controller.deleteSadhanaSheet);
router.post('/checkLanguage', controller.checkLanguageType);

module.exports = router;
