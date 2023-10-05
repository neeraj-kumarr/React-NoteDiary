const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    obj = {
        name: 'neeraj',
        id: 'cs191023'
    }
    res.json(obj);
})

module.exports = router;