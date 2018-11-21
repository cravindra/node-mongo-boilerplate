const express = require('express');
const router = express.Router();

router.use('/api/v1', require('./api'));
router.get('/status', (req, res) => {
    res.ok({ success: true });
});
router.use((req,res)=>{
    res.error(404);
});

module.exports = router;