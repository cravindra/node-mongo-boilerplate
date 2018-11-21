const express = require('express');
const router = express.Router();
const needsToken = require('../../middleware/policies/needsToken');

router.get('/status', (req, res) => {
    res.ok({ success: 'true' })
});

router.use(require('./crud'));

router.use('/auth', require('./auth'));

router.get('/token-info', needsToken, (req, res) => {
    res.ok(req.decodedToken);
});

module.exports = router;