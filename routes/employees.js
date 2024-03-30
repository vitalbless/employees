const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { all, add } = require('../controllers/employees');

//* /api/employees
router.get('/', auth, all);
router.get('/:id', auth, () => console.log('get single employees'));
router.post('/add', auth, add);
router.post('/remove', auth, () => console.log('remove employee'));
router.put('/edit', auth, () => console.log('edit employee'));

module.exports = router;
