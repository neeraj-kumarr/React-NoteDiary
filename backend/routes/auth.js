const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const User = require('../models/User')

router.post('/', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail().withMessage('Not a valid e-mail address'),
    body('password').isLength({ min: 5 }),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.send({ errors: errors.array() });
    }

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(user => res.json(user))
        .catch(err => console.log(err))

    // res.send(req.body)
});

module.exports = router;

