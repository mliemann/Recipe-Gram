const router = require('express').Router();
const userRoutes = require('./userRoutes');
const tableRoutes = require('./tableRoutes');

router.use('/users', userRoutes);
router.use('/projects', tableRoutes);

module.exports = router;
