const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User')
const fetchuser = require("../middleware/fetchuser")

const jwt_SECRET = "iamaboy";

// Route 1 : Create a user: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail().withMessage('Not a valid e-mail address'),
    body('password').isLength({ min: 5 }),
], async (req, res) => {

    // if errors, send bad request and errors message
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

        // create a token
        const data = {
            id: user.id
        }

        const authToken = jwt.sign(data, jwt_SECRET);
        res.json({ authToken })

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 2: verify user: POST "/api/auth/login". No login required
router.post('/login', [
    body('email').isEmail().withMessage('Not a valid e-mail address'),
    body('password').exists(),
], async (req, res) => {

    // if errors, send bad request and errors message

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        // check if user email exists
        let user = await User.findOne({ email });
        if (!user)
            return res.status(400).send("Please login with correct credentials");

        // check password
        let passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare)
            return res.status(400).send("Please login with correct credentials");

        // create a token
        const data = {
            id: user.id
        }

        const authToken = jwt.sign(data, jwt_SECRET);
        res.json({ authToken })

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }

})

// Route 3: Getting user LoggedIn: POST "/api/auth/getuser". No login required
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.send(user);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }

})

module.exports = router;

