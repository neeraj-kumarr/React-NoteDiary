const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = require('../models/User')

const jwt_SECRET = "iamaboy";
// Create a user: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail().withMessage('Not a valid e-mail address'),
    body('password').isLength({ min: 5 }),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // check whether user is already registered
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("User email already registered.");


        var salt = bcrypt.genSaltSync(10);
        secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        // .then(user => res.json(user))
        //     .catch(err => console.log(err))
        const data = {
            id: user.id
        }

        const authToken = jwt.sign(data, jwt_SECRET);
        res.json({ authToken })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occured.");
    }
});

module.exports = router;

