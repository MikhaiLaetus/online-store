const Router = require('express');
const basketController = require('../controllers/basketController');
const router = new Router();

router.post('/add', basketController.addDevice);
router.get('/', basketController.getAll);
router.delete('/', basketController.removeDevice);

module.exports = router;