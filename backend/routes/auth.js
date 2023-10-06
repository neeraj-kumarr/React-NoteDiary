const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Create a user using end-point: POST "/api/auth". 
router.post('/', [
    body('name', "Enter a valid 6-char name").isLength({ min: 6 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Enter a valid 6-char password").isLength({ min: 6 })
], (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }

    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    }).then(user => res.json(user))
        .catch(err => {
            console.log(err)
            res.json({
                error: "Please enter a unique email", message: err.message
            })
        })
})


module.exports = router;